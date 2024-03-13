import React, { type FC } from 'react';

import Header from './header';
import NotificationCard from './card';
import { Constants } from '../utils';
import type { NotificationPanelProps } from '../types';

const { DEFAULT_WINDOW_TITLE } = Constants;

/**
 * SirenPanel component renders a notification panel with a header, notification cards, and optional custom footer.
 *
 * @component
 * @example
 * <SirenPanel
 *   styles={customStyles}
 *   title="Notifications"
 *   hideHeader={false}
 *   cardProps={{ hideAvatar: false, showMedia: true }}
 *   notifications={notificationData}
 *   isLoading={false}
 *   renderListEmpty={() => <div>No notifications</div>}
 *   customFooter={<FooterComponent />}
 *   customHeader={<CustomHeader />}
 *   loadMore={() => console.log('Load more notifications')}
 *   customNotificationCard={(dataItem) => <CustomNotificationCard data={dataItem} />}
 *   onNotificationCardClick={(notification) => console.log('Notification clicked', notification)}
 *   deleteNotificationById={(id) => console.log('Delete notification with id:', id)}
 *   handleClearAllNotification={() => console.log('Clear all notifications')}
 *   endReached={false}
 * />
 *
 * @param {NotificationPanelProps} props - The properties passed to the SirenWindow component.
 * @param {Object} props.styles - Custom styles applied to the notification panel and its elements.
 * @param {string} [props.title="Notifications"] - The title of the notification panel.
 * @param {boolean} [props.hideHeader=false] - Whether to hide the header of the notification panel.
 * @param {Object} props.cardProps - Optional properties to customize the appearance of notification cards.
 * @param {Array<Object>} props.notifications - An array of notification data to display in the panel.
 * @param {boolean} props.isLoading - Whether notifications are currently being loaded.
 * @param {Function} props.renderListEmpty - Function to render content when the notification list is empty.
 * @param {ReactNode} props.customFooter - Custom footer component to be rendered below the notification list.
 * @param {ReactNode} props.customHeader - Custom header component to be rendered above the notification list.
 * @param {Function} props.loadMore - Function to handle loading more notifications.
 * @param {Function} props.customNotificationCard - Function to render custom notification cards.
 * @param {Function} props.onNotificationCardClick - Callback function executed when a notification card is clicked.
 * @param {Function} props.deleteNotificationById - Function to delete a notification by its ID.
 * @param {Function} props.handleClearAllNotification - Function to handle clearing all notifications.
 * @param {boolean} props.endReached - Whether the end of the notification list has been reached.
 * @returns {ReactElement} The rendered SirenWindow component.
 */
const SirenPanel: FC<NotificationPanelProps> = ({
  styles,
  title = DEFAULT_WINDOW_TITLE,
  hideHeader,
  cardProps,
  notifications,
  isLoading,
  customFooter,
  customHeader,
  endReached,
  renderListEmpty,
  loadMore,
  customNotificationCard,
  onNotificationCardClick,
  deleteNotificationById,
  handleClearAllNotification,
}) => {
  // Function to handle Load More button click
  const handleLoadMore = (event: React.MouseEvent) => {
    event.preventDefault();
    loadMore();
  };


  return (
    <div>
      {!hideHeader &&
        (customHeader || (
          <Header
            title={title}
            styles={styles}
            enableClearAll={notifications.length > 0}
            handleClearAllNotification={handleClearAllNotification}
          />
        ))}
      <div id="contentContainer" style={styles.contentContainer}>
        {notifications.length === 0
          ? renderListEmpty && renderListEmpty()
          : notifications.map((dataItem, index) =>
            customNotificationCard ? (
              customNotificationCard(dataItem)
            ) : (
              <div key={`${dataItem.id}${index}`}>
                <NotificationCard
                  notification={dataItem}
                  cardProps={cardProps}
                  onNotificationCardClick={onNotificationCardClick}
                  deleteNotificationById={deleteNotificationById}
                  styles={styles}
                />
                {(index === notifications.length - 1  && !endReached && (
                  <div>
                    {isLoading ? (
                      <div style={styles.sirenWindowLoaderContainer}></div>
                    ) : (
                      <button style={styles.footerContainer} onClick={handleLoadMore}>Load More</button>
                    )}
                  </div>
                ))}
              </div>
            )
          )}
      </div>
      {customFooter}
    </div>
  );
};

export default SirenPanel;