import type { CSSProperties } from "react";
import React, { type FC } from "react";

import CloseIcon from "./CloseIcon";
import TimerIcon from "./TimerIcon";
import DefaultAvatar from "../assets/defaultAvatar.svg";
import type { NotificationCardProps } from "../types";
import { generateElapsedTimeText } from "../utils/commonUtils";
import "../styles/card.css";

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
 *   onNotificationCardClick={(notification) => console.log('Notification clicked', notification)}
 *   deleteNotificationById={(id) => console.log('Notification deleted', id)}
 * />
 *
 * @param {NotificationCardProps} props - The properties passed to the Card component.
 * @param {Object} props.notification - The notification data to display in the card.
 * @param {Object} [props.cardProps] - Optional properties to customize the appearance of the card.
 * @param {Object} props.styles - Custom styles applied to the card and its elements.
 * @param {Function} [props.onNotificationCardClick] - Callback function executed when the card is clicked.
 * @param {Function} [props.deleteNotificationById] - Callback function executed when the delete action is triggered.
 * @returns {ReactElement} The rendered Card component.
 */

const Card: FC<NotificationCardProps> = ({
  notification,
  cardProps,
  styles,
  onNotificationCardClick,
  deleteNotificationById,
}) => {
  const { id, createdAt, message, isRead } = notification;
  const { avatar, header, subHeader, body } = message;

  const onDelete = (event: React.MouseEvent) => {
    deleteNotificationById(id);
    event.stopPropagation();
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

  return (
    <div
      style={cardContainerStyle}
      className={`${
        cardProps?.hideAvatar
          ? "siren-sdk-hide-avatar-card-container"
          : "siren-sdk-card-container"
      }`}
      onClick={() =>
        onNotificationCardClick && onNotificationCardClick(notification)
      }
      data-testid={`card-${notification.id}`}
    >
      {!cardProps?.hideAvatar && (
        <img
          src={avatar?.imageUrl || DefaultAvatar}
          alt=""
          style={styles.cardIconRound}
        />
      )}
      <div className="siren-sdk-card-content-wrapper">
        <div style={styles.cardTitle} className="siren-sdk-card-text-break">
          {header}
        </div>
        <div
          style={styles.cardDescription}
          className="siren-sdk-card-text-break"
        >
          {subHeader}
        </div>
        <div
          style={styles.cardDescription}
          className="siren-sdk-card-text-break siren-sdk-card-msg-body"
        >
          {body}
        </div>
        <div className="siren-sdk-card-date-container">
          <TimerIcon
            color={styles.timerIcon.color}
            size={styles.timerIcon.size}
          />
          <div style={styles.dateStyle}>
            {generateElapsedTimeText(createdAt)}
          </div>
        </div>
      </div>
      <div
        data-testid={`delete-${notification.id}`}
        className="siren-sdk-delete-button"
        onClick={onDelete}
      >
        <CloseIcon
          color={styles?.deleteIcon.color}
          size={styles.deleteIcon.size}
        />
      </div>
    </div>
  );
};

export default Card;
