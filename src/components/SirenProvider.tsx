import React, { createContext, useContext, useEffect, useState } from 'react';

import { Siren } from '@sirenapp/js-sdk';
import type {
  InitConfigType,
  NotificationsApiResponse,
  SirenErrorType,
  UnviewedCountApiResponse,
} from '@sirenapp/js-sdk/dist/esm/types';
import PubSub from 'pubsub-js';

import type { SirenProviderConfigProps } from '../types';
import { logger } from '../utils/commonUtils';
import {
  events, eventTypes,
  IN_APP_RECIPIENT_UNAUTHENTICATED,
  MAXIMUM_RETRY_COUNT,
  VerificationStatus
} from '../utils/constants';


type SirenContextProp = {
  siren: Siren | null;
  verificationStatus: VerificationStatus;
  id: string;
};

interface SirenProvider {
  config: SirenProviderConfigProps;
  children: React.ReactNode;
}

export const SirenContext = createContext<SirenContextProp>({
  siren: null,
  verificationStatus: VerificationStatus.PENDING,
  id: ''
});

/**
 * Use `useSirenContext` hook to access Siren notifications context within your component.
 *
 * @example
 * const {
 *   siren,
 *   verificationStatus,
 *   id
 * } = useSirenContext();
 *
 * @returns {SirenContextProp} The Siren notifications context.
 */
export const useSirenContext = (): SirenContextProp => useContext(SirenContext);

/**
 * Provides a React context for Siren notifications, making Siren SDK functionality
 * available throughout your React application.
 *
* `SirenProvider` initializes the Siren SDK with given configuration and manages the state for siren and verificationStatus.
 *
 * @component
 * @example
 * const config = {
 *   userToken: "user_token_here",
 *   recipientId: "recipient_id_here"
 * };
 *
 * <SirenProvider config={config}>
 *   <YourComponent />
 * </SirenProvider>
 *
 * @param {Object} props - Props for configuring the SirenProvider.
 * @param {SirenProviderConfig} props.config - Configuration for initializing the Siren SDK.
 * @param {React.ReactNode} props.children - Child components that will have access to the Siren context.
 */
const SirenProvider: React.FC<SirenProvider> = ({ config, children }) => {
  const [siren, setSiren] = useState<Siren | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(VerificationStatus.PENDING);
  let retryCount = 0;
  const generateUniqueId = (): string => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const [id] = useState(generateUniqueId());

  useEffect(() => {
    if (config?.recipientId && config?.userToken) {
      stopRealTimeFetch();
      sendResetDataEvents();
      initialize();
    }
    if(retryCount > MAXIMUM_RETRY_COUNT) 
      stopRealTimeFetch();
    
  }, [config]);

  const stopRealTimeFetch = (): void => {
    siren?.stopRealTimeNotificationFetch();
    siren?.stopRealTimeUnviewedCountFetch();
  };

  const sendResetDataEvents = () => {
    const updateCountPayload = {
      action: eventTypes.RESET_NOTIFICATIONS_COUNT
    };
    const updateNotificationPayload = {
      action: eventTypes.RESET_NOTIFICATIONS
    };

    PubSub.publish(`${events.NOTIFICATION_COUNT_EVENT}${id}`, JSON.stringify(updateCountPayload));
    PubSub.publish(`${events.NOTIFICATION_LIST_EVENT}${id}`, JSON.stringify(updateNotificationPayload));
  };

  const onUnViewedCountReceived = (response: UnviewedCountApiResponse): void => {
    const totalUnviewed = response?.data?.totalUnviewed;

    logger.info(`unviewed notification count : ${totalUnviewed}`);
    const payload = {
      unviewedCount: totalUnviewed,
      action: `${eventTypes.UPDATE_NOTIFICATIONS_COUNT}${id}`
    };

    PubSub.publish(`${events.NOTIFICATION_COUNT_EVENT}${id}`, JSON.stringify(payload));
  };

  const onNotificationReceived = (response: NotificationsApiResponse): void => {
  
    if (response?.data?.length) {
      logger.info(`new notifications : ${JSON.stringify(response?.data)}`);
      const payload = { newNotifications: response?.data, action: eventTypes.NEW_NOTIFICATIONS };
     
      PubSub.publish(`${events.NOTIFICATION_LIST_EVENT}${id}`, JSON.stringify(payload));
    }
  };

  const onStatusChange = (status: VerificationStatus) => {
    setVerificationStatus(status);
  };

  const actionCallbacks = { onUnViewedCountReceived, onNotificationReceived, onStatusChange };

  const getDataParams = () => {
    return {
      token: config.userToken,
      recipientId: config.recipientId,
      onError: retryVerification,
      actionCallbacks: actionCallbacks
    };
  };

  const retryVerification = (error: SirenErrorType) => {
    if (error.Code === IN_APP_RECIPIENT_UNAUTHENTICATED && retryCount < MAXIMUM_RETRY_COUNT)
      setTimeout(() => {
        initialize();
        retryCount++;
      }, 5000);
  };

  // Function to initialize the Siren SDK and fetch notifications
  const initialize = (): void => {
    const dataParams: InitConfigType = getDataParams();
    const siren = new Siren(dataParams);

    setSiren(siren);
  };

  return (
    <SirenContext.Provider
      value={{
        id,
        siren,
        verificationStatus
      }}
    >
      {children}
    </SirenContext.Provider>
  );
};

export default SirenProvider;
