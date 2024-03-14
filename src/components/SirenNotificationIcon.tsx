import React, { type FC, useCallback, useEffect, useState } from "react";

import { useSirenContext } from "./SirenProvider";
import bellIcon from "../assets/bellIcon.svg";
import "../styles/sirenNotificationIcon.css";
import type { SirenNotificationButtonProps } from "../types";
import { Constants } from '../utils';
import { BadgeType } from "../utils/constants";

const { defaultBadgeStyle, eventTypes, events } = Constants;

/**
 * SirenNotificationIcon Component
 * @component
 * @param {Object} props - Props for the SirenNotificationIcon component
 * @param {ReactNode} [props.notificationIcon] - The icon for the notification
 * @param {BadgeType} [props.badgeType=DEFAULT] - The type of badge to display
 * @param {Object} [props.styles] - Custom styles for the component
 * @param {Function} props.onIconClick - Click event handler for the icon
 * @returns {JSX.Element} - SirenNotificationIcon component JSX
 */

const SirenNotificationIcon: FC<SirenNotificationButtonProps> = ({
  notificationIcon,
  badgeType,
  styles,
  onIconClick,
}) => {
  const { siren } = useSirenContext();

  const [unviewedCount, seUnviewedCount] = useState<number>(0);

  const notificationCountSubscriber = async (type: string, dataString: string) => {
    const data = await JSON.parse(dataString);

    if (data.action === eventTypes.UPDATE_NOTIFICATIONS_COUNT) seUnviewedCount(data.unviewedCount);
  };

  useEffect(() => {
    PubSub.subscribe(events.NOTIFICATION_COUNT_EVENT, notificationCountSubscriber);

    return () => {
      cleanUp();
    };
  }, []);

  useEffect(() => {
    getUnViewedCount();
  }, [siren]);

  useEffect(() => {
    startRealTimeDataFetch();
  }, []);

  const cleanUp = () => {
    siren?.stopRealTimeUnviewedCountFetch();
  };

  const startRealTimeDataFetch = (): void => {
    cleanUp();
    siren?.startRealTimeUnviewedCountFetch();
  };

  const getUnViewedCount = async (): Promise<void> => {
    if (!siren) return;
    try {
      const response = await siren.fetchUnviewedNotificationsCount();

      startRealTimeDataFetch();
      if (response.error) return;
      if (response?.data) seUnviewedCount(response?.data?.unviewedCount || 0);
    } catch (er) {
      //  handle error if needed
    }
  };

  const renderCount = useCallback(
    () => (unviewedCount > 99 ? "99+" : unviewedCount),
    [unviewedCount]
  );

  const badge = { ...defaultBadgeStyle };

  const renderBadge = () => {
    switch (badgeType) {
      case BadgeType.DEFAULT:{
        const defaultBadgeStyle = {
          minWidth: badge.size,
          height: badge.size,
          borderRadius: badge.size * 0.5,
          backgroundColor: badge.color
        };
        const defaultBadgeText = {
          color: badge.textColor,
          fontSize: badge.textSize,
          lineHeight: badge.linHeight,
        };
    
        return (
          unviewedCount > 0 && (
            <div
              style={defaultBadgeStyle}
              className="siren-sdk-notificationIcon-badge-container"
            >
              <div
                style={defaultBadgeText}
                data-testid="notification-default-badge"
                className="siren-sdk-notificationIcon-text"
              >
                {renderCount()}
              </div>
            </div>
          )
        );
      }
      case BadgeType.DOT:
        return (
          <span
            className="siren-sdk-notificationIcon-badge-container"
            data-testid="notification-dot-badge"
          />
        );

      default:
        return null;
    }
  };

  return (
    <button
      onClick={onIconClick}
      className="siren-sdk-notificationIcon-container"
      data-testid="notification-icon"
    >
      {notificationIcon || (
        <img src={bellIcon} alt="bell-icon" style={styles.notificationIcon} />
      )}
      {renderBadge()}
    </button>
  );
};

export default SirenNotificationIcon;
