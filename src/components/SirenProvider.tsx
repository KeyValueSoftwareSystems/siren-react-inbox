import React, { createContext, useContext, useEffect, useState } from "react";

import { Siren } from "@sirenapp/js-sdk";
import type {
  InitConfigType,
  NotificationsApiResponse,
  SirenErrorType,
  UnviewedCountApiResponse,
} from "@sirenapp/js-sdk/dist/esm/types";
import PubSub from "pubsub-js";

import type { SirenProviderConfigProps } from "../types";
import { logger } from "../utils/commonUtils";
import {
  AUTHENTICATION_FAILED,
  events,
  EventType,
  eventTypes,
  IN_APP_RECIPIENT_UNAUTHENTICATED,
  MAXIMUM_RETRY_COUNT,
  VerificationStatus,
} from "../utils/constants";

type SirenContextProp = {
  siren: Siren | null;
  verificationStatus: VerificationStatus;
};

interface SirenProvider {
  config: SirenProviderConfigProps;
  children: React.ReactNode;
}

export const SirenContext = createContext<SirenContextProp>({
  siren: null,
  verificationStatus: VerificationStatus.PENDING,
});

/**
 * Use `useSirenContext` hook to access Siren notifications context within your component.
 *
 * @example
 * const {
 *   siren,
 *   verificationStatus
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
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>(VerificationStatus.PENDING);
  let retryCount = 0;

  useEffect(() => {
    if (config?.recipientId && config?.userToken) {
      stopRealTimeFetch();
      sendResetDataEvents();
      initialize();
    }
    else {
      setVerificationStatus(VerificationStatus.FAILED);
    }
    if (retryCount > MAXIMUM_RETRY_COUNT) stopRealTimeFetch();
  }, [config]);

  const stopRealTimeFetch = (): void => {
    siren?.stopRealTimeFetch(EventType.NOTIFICATION);
    siren?.stopRealTimeFetch(EventType.UNVIEWED_COUNT);
  };

  const sendResetDataEvents = () => {
    const updateCountPayload = {
      action: eventTypes.RESET_NOTIFICATIONS_COUNT,
    };
    const updateNotificationPayload = {
      action: eventTypes.RESET_NOTIFICATIONS,
    };

    PubSub.publish(
      events.NOTIFICATION_COUNT_EVENT,
      JSON.stringify(updateCountPayload)
    );
    PubSub.publish(
      events.NOTIFICATION_LIST_EVENT,
      JSON.stringify(updateNotificationPayload)
    );
  };

  const onEventReceive = (
    response: NotificationsApiResponse | UnviewedCountApiResponse,
    eventType: EventType
  ): void => {
    if (eventType === EventType.NOTIFICATION) {
      const newNotifications =
        (response as NotificationsApiResponse)?.data || [];

      logger.info(`new notifications : ${JSON.stringify(newNotifications)}`);
      PubSub.publish(
        events.NOTIFICATION_LIST_EVENT,
        JSON.stringify({
          newNotifications,
          action: eventTypes.NEW_NOTIFICATIONS,
        })
      );
    }

    if (eventType === EventType.UNVIEWED_COUNT) {
      const totalUnviewed =
        (response as UnviewedCountApiResponse)?.data?.totalUnviewed || 0;

      logger.info(`unviewed notification count : ${totalUnviewed}`);
      PubSub.publish(
        events.NOTIFICATION_COUNT_EVENT,
        JSON.stringify({
          unviewedCount: totalUnviewed,
          action: eventTypes.UPDATE_NOTIFICATIONS_COUNT,
        })
      );
    }
  };

  const onStatusChange = (status: VerificationStatus) => {
    setVerificationStatus(status);
  };

  const actionCallbacks = { onEventReceive, onStatusChange };

  const getDataParams = () => {
    return {
      token: config.userToken,
      recipientId: config.recipientId,
      onError: retryVerification,
      actionCallbacks: actionCallbacks,
    };
  };

  const retryVerification = (error: SirenErrorType) => {
    const shouldRetry = (error.Code === AUTHENTICATION_FAILED || error.Code === IN_APP_RECIPIENT_UNAUTHENTICATED) &&
      retryCount < MAXIMUM_RETRY_COUNT && verificationStatus === VerificationStatus.FAILED

    if (shouldRetry)
      setTimeout(() => {
        initialize();
        retryCount++;
      }, 5000);
  };

  // Function to initialize the Siren SDK and fetch notifications
  const initialize = (): void => {
    const dataParams: InitConfigType = getDataParams();
    const siren = new Siren(dataParams);

    setVerificationStatus(VerificationStatus.PENDING);
    setSiren(siren);
  };

  return (
    <SirenContext.Provider
      value={{
        siren,
        verificationStatus,
      }}
    >
      {children}
    </SirenContext.Provider>
  );
};

export default SirenProvider;
