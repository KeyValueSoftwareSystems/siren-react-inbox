import React, { type FC, useCallback, useEffect, useState } from "react";

import BellIcon from "./BellIcon";
import { useSirenContext } from "./SirenProvider";
import "../styles/sirenNotificationIcon.css";
import type { SirenNotificationButtonProps } from "../types";
import { Constants } from "../utils";
import { BadgeType, EventType, MAX_UNVIEWED_COUNT_SHOWN } from "../utils/constants";

const { eventTypes, events } = Constants;

/**
 * SirenNotificationIcon Component
 * @component
 * @param {Object} props - Props for the SirenNotificationIcon component
 * @param {ReactNode} [props.notificationIcon] - The icon for the notification
 * @param {BadgeType} [props.badgeType=DEFAULT] - The type of badge to display
 * @param {Object} [props.styles] - Custom styles for the component
 * @param {Function} props.onIconClick - Click event handler for the icon
 * @param {boolean} [props.hideBadge] - Flag indicating if the badge should be hidden
 * @returns {JSX.Element} - SirenNotificationIcon component JSX
 */

const SirenNotificationIcon: FC<SirenNotificationButtonProps> = ({
  notificationIcon,
  styles,
  onIconClick,
  darkMode,
  hideBadge,
  isModalOpen,
}) => {
  const { siren } = useSirenContext();

  const [unviewedCount, seUnviewedCount] = useState<number>(0);
  const badgeType:BadgeType = isModalOpen ? BadgeType.NONE : BadgeType.DEFAULT;
  
  const notificationCountSubscriber = async (
    type: string,
    dataString: string
  ) => {
    const data = await JSON.parse(dataString);

    if (data.action === eventTypes.UPDATE_NOTIFICATIONS_COUNT)
      seUnviewedCount(data.unviewedCount);
  };

  useEffect(() => {
    if(!hideBadge) {
      PubSub.subscribe(
        events.NOTIFICATION_COUNT_EVENT,
        notificationCountSubscriber
      );

      return () => {
        cleanUp();
      };
    }
  }, []);

  useEffect(() => {
    // Check to avoid calling getUnViewedCount when the badge is hidden and the modal is open, and when either the siren object or hideBadge state changes.
    if(!hideBadge && !isModalOpen) 
      getUnViewedCount();
    
  }, [siren, hideBadge]);

  useEffect(() => {
    if(!hideBadge)
      startRealTimeDataFetch();
  }, [hideBadge]);

  const cleanUp = () => {
    siren?.stopRealTimeFetch(EventType.UNVIEWED_COUNT);
  };

  const startRealTimeDataFetch = (): void => {
    cleanUp();
    siren?.startRealTimeFetch({eventType: EventType.UNVIEWED_COUNT});
  };

  const getUnViewedCount = async (): Promise<void> => {
    if (!siren) return;
    try {
      const response = await siren.fetchUnviewedNotificationsCount();

      startRealTimeDataFetch();
      if (response && response.error) return;
      if (response?.data) seUnviewedCount(response?.data?.unviewedCount || 0);
    } catch (er) {
      //  handle error if needed
    }
  };

  const renderCount = useCallback(
    () => (unviewedCount > MAX_UNVIEWED_COUNT_SHOWN ? `${MAX_UNVIEWED_COUNT_SHOWN}+` : unviewedCount),
    [unviewedCount]
  );

  const renderBadge = () => {
    switch (badgeType) {
      case BadgeType.DEFAULT: {
        return (
          unviewedCount > 0 && (
            <div
              style={styles.badgeStyle}
              className="siren-sdk-notificationIcon-badge-container"
            >
              <div
                style={styles.badgeTextStyle}
                data-testid="notification-default-badge"
              >
                {renderCount()}
              </div>
            </div>
          )
        );
      }

      default:
        return null;
    }
  };

  return (
    <button
      onClick={onIconClick}
      className="siren-sdk-notificationIcon-container"
      data-testid="notification-icon"
      aria-label="siren-notification-icon"
    >
      {notificationIcon || (
        <BellIcon
          size={styles.notificationIcon.size}
          color={
            darkMode
              ? Constants.COLORS.dark.notificationIcon
              : Constants.COLORS.light.notificationIcon
          }
        />
      )}
      {!hideBadge && renderBadge()}
    </button>
  );
};

export default SirenNotificationIcon;
