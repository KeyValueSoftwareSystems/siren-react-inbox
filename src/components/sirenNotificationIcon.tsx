import React, { type FC } from 'react';

import bellIcon from '../assets/bellIcon.svg';
import { BadgeType } from '../utils/constants';
import type { SirenNotificationButtonProps } from '../types';


/**
 * SirenNotificationIcon component represents an icon used for notifications, with an optional badge indicating the notification count.
 *
 * @component
 * @example
 * <SirenNotificationIcon
 *   count={5}
 *   notificationIcon={<CustomNotificationIcon />}
 *   styles={customStyles}
 *   badgeType={BadgeType.DEFAULT}
 *   onButtonClick={() => console.log('Notification icon clicked')}
 * />
 *
 * @param {SirenNotificationButtonProps} props - The properties passed to the SirenNotificationIcon component.
 * @param {number} props.count - The count of notifications to be displayed in the badge.
 * @param {ReactNode} [props.notificationIcon] - The custom notification icon to be displayed. If not provided, a default bell icon will be used.
 * @param {Object} props.styles - Custom styles applied to the notification icon and its elements.
 * @param {string} props.badgeType - The type of badge to be displayed. Possible values: 'DEFAULT', 'NONE', 'DOT'.
 * @param {Function} props.onButtonClick - Callback function executed when the notification icon is clicked.
 * @returns {ReactElement} The rendered SirenNotificationIcon component.
 */
const SirenNotificationIcon: FC<SirenNotificationButtonProps> = ({
  count,
  notificationIcon,
  styles,
  badgeType,
  onButtonClick
}) => {

  /**
   * Renders the badge based on the badgeType and notification count.
   * @returns {ReactNode} The rendered badge element.
   */
  const renderBadge = () => {
    const defaultBadge = (
      count > 0 && ( 
        <div style={styles.notificationBadgeContainer}>
          <div style={styles.notificationCount}>{count > 99 ? '99+' : count}</div>
        </div>)
    );

    const dot = <span className='siren-sdk-notificationButton-dot' style={styles.notificationBadgeContainer} />;

    switch (badgeType) {
      case BadgeType.DEFAULT:
        return defaultBadge;
      case BadgeType.NONE:
        return null;
      case BadgeType.DOT:
        return dot;
      default:
        return defaultBadge;
    }
  };

  return (
    <button onClick={onButtonClick} style={styles.notificationIconContainer}>
      {notificationIcon || (<img src={bellIcon} alt='bell-icon' style={styles.notificationIcon} />)}
      {renderBadge()}
    </button>
  );
};

export default SirenNotificationIcon;