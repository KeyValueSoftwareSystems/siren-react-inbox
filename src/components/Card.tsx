import type { CSSProperties } from "react";
import React, { type FC, useState } from "react";

import CloseIcon from "./CloseIcon";
import { useSirenContext } from "./SirenProvider";
import TimerIcon from "./TimerIcon";
import defaultAvatarDark from "../assets/dark/defaultAvatarDark.png";
import failedImageDark from "../assets/dark/failedImageDark.svg";
import defaultAvatarLight from "../assets/light/defaultAvatarLight.png";
import failedImageLight from "../assets/light/failedImageLight.svg";
import type { NotificationCardProps } from "../types";
import { generateElapsedTimeText } from "../utils/commonUtils";
import "../styles/card.css";
import { events, eventTypes } from "../utils/constants";
import useSiren from "../utils/sirenHook";

/**
 * Card component represents an individual notification card in the notification list.
 *
 * @component
 * @example
 * const notification = {
 *   id: "1",
 *   message: {
 *     header: "New Message",
 *     body: "You have a new message.",
 *     avatar: { imageUrl: "https://example.com/avatar.png" }
 *   },
 *   createdAt: "2024-02-24T12:00:00Z"
 * };
 *
 * <Card
 *   notification={notification}
 *   cardProps={{ hideAvatar: false }}
 *   styles={customStyles}
 *   onCardClick={(notification) => console.log('Notification clicked', notification)}
 *   deleteById={(id) => console.log('Notification deleted', id)}
 * />
 *
 * @param {NotificationCardProps} props - The properties passed to the Card component.
 * @param {Object} props.notification - The notification data to display in the card.
 * @param {Object} [props.cardProps] - Optional properties to customize the appearance of the card.
 * @param {Object} props.styles - Custom styles applied to the card and its elements.
 * @param {Function} [props.onCardClick] - Callback function executed when the card is clicked.
 * @param {Function} [props.deleteById] - Callback function executed when the delete action is triggered.
 * @returns {ReactElement} The rendered Card component.
 */

const Card: FC<NotificationCardProps> = ({
  notification,
  cardProps,
  styles,
  darkMode,
  onCardClick,
  deleteNotificationById,
}) => {
  const { createdAt, message, isRead } = notification;
  const { avatar, header, subHeader, body, thumbnailUrl } = message;
  const { hideAvatar, hideDelete, hideMediaThumbnail, disableAutoMarkAsRead, deleteIcon = null, onAvatarClick, onMediaThumbnailClick } =  cardProps ?? {};
  const {
    markAsReadById
  } = useSiren();
  const { id } = useSirenContext();

  const [deleteAnimationStyle, setDeleteAnimationStyle] = useState('');
  
  const defaultAvatar = darkMode ? defaultAvatarDark : defaultAvatarLight;
  const failedImage = darkMode ? failedImageDark: failedImageLight;


  const onDelete = async (event: React.MouseEvent): Promise<void> => {
    
    event.stopPropagation();
    
    const isSuccess = await deleteNotificationById(notification.id, false);

    if (isSuccess) {

      setDeleteAnimationStyle("siren-sdk-delete-animation");

      const payload = { id: notification.id, action: eventTypes.DELETE_ITEM };

      setTimeout(() => {
        PubSub.publish(`${events.NOTIFICATION_LIST_EVENT}${id}`, JSON.stringify(payload));
      }, 200)

    }
  };

  const cardContainerStyle: CSSProperties = isRead
    ? {
      ...styles.defaultCardContainer,
      borderLeft: "4px transparent solid",
    }
    : {
      ...styles.defaultCardContainer,
      borderLeft: `4px ${styles.activeCardMarker.border} solid`,
      backgroundColor: styles.activeCardMarker.backgroundColor,
    };

  const handleNotificationCardClick = () => {
    onCardClick && onCardClick(notification);
    !disableAutoMarkAsRead && markAsReadById(notification.id);
  };

  const handleAvatarClick = (event: React.MouseEvent) => {
    onAvatarClick && onAvatarClick(notification);
    event.stopPropagation();
  };

  const handleMediaClick = (event: React.MouseEvent) => {
    onMediaThumbnailClick && onMediaThumbnailClick(notification);
    event.stopPropagation();
  };

  const [imageLoaded, setImageLoaded] = useState(true); // Initially assume image is loaded

  const [imageSource, setImageSource] = useState(thumbnailUrl ? thumbnailUrl : '');

  const onErrorMedia = (): void => {
    setImageLoaded(false);
    setImageSource(failedImage);
  };

  return (
    <div
      style={cardContainerStyle}
      className={`${
        hideAvatar
          ? "siren-sdk-hide-avatar-card-container"
          : "siren-sdk-card-container"
      } siren-sdk-card-common-container ${deleteAnimationStyle}`}
      onClick={handleNotificationCardClick}
      aria-label={`siren-notification-card-${notification.id}`}
      data-testid={`card-${notification.id}`}
    >
      {!hideAvatar && (
        <div
          style={{
            ...styles.cardIconRound,
            backgroundImage: `url(${avatar?.imageUrl || defaultAvatar})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            ...(onAvatarClick && { cursor: "pointer" }),
          }}
          aria-label={`siren-notification-avatar-${notification.id}`}
          onClick={handleAvatarClick}
        />
      )}
      <div className="siren-sdk-card-content-wrapper">
        <div style={styles.cardTitle} className="siren-sdk-card-text-break siren-sdk-card-title">
          {header}
        </div>
        <div
          style={styles.cardSubTitle}
          className="siren-sdk-card-text-break siren-sdk-card-subtitle"
        >
          {subHeader}
        </div>
        <div
          style={styles.cardDescription}
          className="siren-sdk-card-text-break siren-sdk-card-msg-body"
        >
          {body}
        </div>
        {!hideMediaThumbnail && thumbnailUrl &&(
          <div 
            className="siren-sdk-card-thumbnail-container" 
            style={{...(onMediaThumbnailClick && { cursor: "pointer" }),
              backgroundColor: darkMode ? '#4C4C4C' : '#F0F2F5'}}
            onClick={handleMediaClick}>
            <img
              className={`siren-sdk-card-thumbnail-image ${thumbnailUrl && imageLoaded ? 'siren-sdk-card-thumbnail-with-image' : ''}`}
              src={imageSource}
              onError={onErrorMedia}
            />
          </div>
        )}
        <div className="siren-sdk-card-date-container">
          <TimerIcon
            color={styles.timerIcon.color}
            size={styles.timerIcon.size}
          />
          <div style={styles.dateStyle} className="siren-sdk-card-date-label">
            {generateElapsedTimeText(createdAt)}
          </div>
        </div>
      </div>
      {!hideDelete && (deleteIcon || (
        <div
          data-testid={`delete-${notification.id}`}
          className="siren-sdk-delete-button"
          onClick={onDelete}
          aria-label={`siren-notification-delete-${notification.id}`}
        >
          <CloseIcon
            color={styles?.deleteIcon.color}
            size={styles.deleteIcon.size}
          />
        </div>
      ))}
    </div>
  );
};

export default Card;