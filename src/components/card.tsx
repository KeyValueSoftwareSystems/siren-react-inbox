import React, { useEffect, useRef, useState, type FC } from 'react';

import deleteIcon from '../assets/deleteIcon.svg';
import { getTimeAgo } from '../utils/commonUtils';
import type { NotificationCardProps } from '../types';

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
  deleteNotificationById
}) => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const [avatarElementWidth, setAvatarElementWidth] = useState(0);
  const { id, createdAt, message } = notification;
  const { avatar, header, subHeader, body } = message;
  
  useEffect(() => {
    if (avatarRef.current?.offsetWidth) setAvatarElementWidth(avatarRef.current?.offsetWidth);
  }, []);

  return (
    <div
      style={styles.cardContainerButton}
      onClick={() => onNotificationCardClick && onNotificationCardClick(notification)}
      data-testid={`card-${notification.id}`}
    >
      <div style={styles.cardContainer}>
        <div style={styles.avatarContainer}>
          {!cardProps?.hideAvatar && (
            <div style={styles.avatarImageContainer} ref={avatarRef}>
              <img src={avatar?.imageUrl} alt='' style={styles.cardIconRound}/>
            </div>
          )}
          <div style={styles.cardContentWrapper}>
            <div>
              <p style={styles.cardTitle}>
                {header}
              </p>
              <p style={styles.cardDescription}>
                {subHeader}
              </p>
              <p style={styles.cardDescription}>
                {body}
              </p>
            </div>
            <div data-testid={`delete-${notification.id}`} onClick={() => deleteNotificationById(id)}>
              <img src={deleteIcon} alt='delete-icon' style={styles.deleteButton} />
            </div>
          </div>
        </div>
        <div
          style={{
            // need to have left padding, only if avatar-image is present
            ...(avatarElementWidth && !cardProps?.hideAvatar && { paddingLeft: `${avatarElementWidth}px` })
          }}
        >
          {/* {cardProps?.showMedia && (
            <div style={styles.cardMediaContainer}>
              <img
                src={media?.thumbnail}
                alt=''
                style={styles.cardImageStyle}
              />
            </div>
          )} */}
          <p style={styles.dateStyle}>
            {getTimeAgo(createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;