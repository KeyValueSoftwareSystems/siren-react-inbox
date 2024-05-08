import React, { type FC, useCallback, useEffect, useMemo, useState } from "react";

import type {
  ActionResponse,
  MarkAsViewedResponse,
  NotificationDataType,
  NotificationsApiResponse,
  SirenErrorType,
} from "test_notification/dist/esm/types";

import "../styles/sirenPanel.css";
import NotificationCard from "./Card";
import EmptyList from "./EmptyList";
import ErrorWindow from "./ErrorWindow";
import Header from "./Header";
import AnimatedLoader from "./Loader";
import ShowMoreButton from "./ShowMore";
import { useSirenContext } from "./SirenProvider";
import type { SirenPanelProps } from "../types";
import {
  filterDataProperty,
  generateFilterParams,
  isEmptyArray,
  isValidResponse,
  mergeArrays,
  updateNotifications,
} from "../utils/commonUtils";
import { DEFAULT_WINDOW_TITLE, ERROR_TEXT, errorMap, events, EventType, eventTypes, VerificationStatus } from "../utils/constants";
import useSiren from "../utils/sirenHook";

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
 *   renderListEmpty={() => <div>No notifications</div>}
 *   customFooter={<FooterComponent />}
 *   customHeader={<CustomHeader />}
 *   customCard={(dataItem) => <CustomNotificationCard data={dataItem} />}
 *   onCardClick={(notification) => console.log('Notification clicked', notification)}
 * />
 *
 * @param {SirenPanelProps} props - The properties passed to the SirenWindow component.
 * @param {Object} props.styles - Custom styles applied to the notification panel and its elements.
 * @param {boolean} [props.hideBadge] - Flag indicating if the badge should be hidden
 * @param {string} props.loadMoreLabel - Label for load more button  
 * @param {Object} props.headerProps - Object containing props related to the inbox header.
 * @param {Object} props.cardProps - Optional properties to customize the appearance of notification cards.
 * @param {Function} props.renderListEmpty - Function to render content when the notification list is empty.
 * @param {ReactNode} props.customFooter - Custom footer component to be rendered below the notification list.
 * @param {ReactNode} pros.customLoader - Custom Loader component to be rendered while fetching notification list for the first time
 * @param {ReactNode} pros.loadMoreComponent -Custom load more component to be rendered
 * @param {ReactNode} props.customErrorWindow -Custom error window component to be rendered when there is an error
 * @param {Function} props.customCard - Function to render custom notification cards.
 * @param {Function} props.onCardClick - Callback function executed when a notification card is clicked.
 * @param {DimensionValue} props.modalWidth - The width of the notification panel.
 * @returns {ReactElement} The rendered SirenInbox component.
 */

type EventListenerDataType = {
  id?: string;
  action: string;
  newNotifications?: NotificationDataType[];
  unreadCount?: number;
};

const SirenPanel: FC<SirenPanelProps> = ({
  styles,
  loadMoreLabel,
  hideBadge,
  darkMode,
  headerProps,
  cardProps,
  customFooter,
  loadMoreComponent,
  fullScreen,
  customLoader,
  listEmptyComponent,
  customErrorWindow,
  noOfNotificationsPerFetch,
  customCard,
  onCardClick,
  onError,
  modalWidth,
}) => {
  const {
    markAllAsViewed,
    deleteByDate,
    deleteById,
  } = useSiren();
  const { siren, verificationStatus } = useSirenContext();
  const {hideHeader = false, hideClearAll = false, customHeader, title = DEFAULT_WINDOW_TITLE} = headerProps ?? {};
  const [notifications, setNotifications] = useState<NotificationDataType[]>(
    []
  );

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [endReached, setEndReached] = useState(false);
  const [eventListenerData, setEventListenerData] =
    useState<EventListenerDataType | null>(null);

  const notificationSubscriber = async (type: string, dataString: string) => {
    const data = await JSON.parse(dataString);

    setEventListenerData(data);
  };

  useEffect(() => {
    PubSub.subscribe(events.NOTIFICATION_LIST_EVENT, notificationSubscriber);

    return () => {
      cleanUp();
      setNotifications([]);
      handleMarkNotificationsAsViewed(new Date().toISOString());
    };
  }, []);

  useEffect(() => {
    return(() => {
      !hideBadge && restartNotificationCountFetch();
    })
  }, [hideBadge])

  useEffect(() => {
    if (eventListenerData) {
      const updatedNotifications: NotificationDataType[] = updateNotifications(
        eventListenerData,
        notifications
      );

      if(!isEmptyArray(eventListenerData?.newNotifications)) handleMarkNotificationsAsViewed(updatedNotifications[0]?.createdAt);
      setNotifications(updatedNotifications);
      setEventListenerData(null);
    }
  }, [eventListenerData]);

  useEffect(() => {
    if (siren && verificationStatus !== VerificationStatus.PENDING) {
      !hideBadge && siren.stopRealTimeFetch(EventType.UNVIEWED_COUNT);
      fetchNotifications(true);
    }
    if(!siren && isLoading) {
      setIsLoading(false);
      onError && onError(errorMap?.INVALID_CREDENTIALS);
      setError(ERROR_TEXT);
    }
  }, [siren, verificationStatus, hideBadge]);

  const restartNotificationCountFetch = () => {
    try {
      siren?.startRealTimeFetch({eventType: EventType.UNVIEWED_COUNT});
    } catch (er) {
      //  handle error if needed
    }
  };

  const cleanUp = () => {
    siren?.stopRealTimeFetch(EventType.NOTIFICATION);
  };

  const triggerOnError = useCallback(
    (
      response: NotificationsApiResponse | ActionResponse | MarkAsViewedResponse
    ) => {
      if (response?.error && onError) onError(response.error);
    },
    [onError]
  );

  const resetValues = () => {
    setNotifications([]);
    setEndReached(false);
    setError("");
  };

  const handleClearAllNotification = async (): Promise<void> => {
    try {
      if (!isEmptyArray(notifications)) {
        const response = await deleteByDate(
          notifications[0].createdAt
        );

        response && triggerOnError(response);

        if (response && isValidResponse(response)) {
          resetValues();
          setEndReached(true);
          setIsLoading(false);
        }
      }
    } catch (er) {
      //  handle error if needed
    }
  };

  const updateNotificationList = (
    newNotifications: NotificationDataType[],
    isRefresh: boolean
  ) => {
    const updatedNotifications = !isRefresh
      ? mergeArrays(notifications, newNotifications)
      : newNotifications;

    setNotifications(updatedNotifications);

    if (isRefresh)
      handleMarkNotificationsAsViewed(updatedNotifications[0].createdAt);
  };

  const fetchNotifications = async (isRefresh = false) => {
    setError("");
    setIsLoading(true);

    if (!siren) return [];

    try {
      const response = await siren.fetchAllNotifications(
        generateFilterParams(
          isRefresh ? [] : notifications,
          false,
          noOfNotificationsPerFetch
        )
      );

      if (response && isValidResponse(response)) {
        let data: NotificationDataType[] | null = null;

        if (!isEmptyArray(response.data ?? [])) {
          data = filterDataProperty(response);
          if (!data) return [];
          if (response?.meta) {
            const isLastPage = response?.meta?.last === "true";

            if (isLastPage) setEndReached(true);
            else setEndReached(false);
          }
          updateNotificationList(data, isRefresh);
        }
        if (!data) setEndReached(true);
        resetRealTimeFetch(isRefresh, data);
      } else {
        setEndReached(true);
        setError(ERROR_TEXT);
      }
    }  catch (error) {
      setIsLoading(false);
      if (typeof error === 'object' && error !== null && 'Message' in error) 
        setError((error as SirenErrorType).Message);
      else 
        setError(ERROR_TEXT);     
    }

    setIsLoading(false);
  };

  const resetRealTimeFetch = (
    refresh: boolean,
    newList: NotificationDataType[] | null
  ) => {
    if (!refresh) return;

    try {
      siren?.startRealTimeFetch(
        {eventType: EventType.NOTIFICATION, params:   generateFilterParams(newList ?? [], true, noOfNotificationsPerFetch)}   
      );
    } catch (er) {
      //  handle error if needed
    }
  };

  const deleteNotificationById = useCallback(
    async (id: string, shouldUpdateList: boolean) => {
      let isSuccess = false;

      try {
        const response = await deleteById(id, shouldUpdateList);

        if (response?.data) isSuccess = true;
        response && triggerOnError(response);
      } catch (er) {
        isSuccess = false;
        //  handle error if needed
      }

      return isSuccess;
    },
    [deleteById, triggerOnError]
  );

  const onEndReached = (): void => {
    if (!isLoading && !endReached && notifications?.length > 0)
      fetchNotifications(false);
  };

  const handleMarkNotificationsAsViewed = async (
    createdAt: string
  ): Promise<void> => {
    try {
      const payload = {
        unviewedCount: 0,
        action: eventTypes.UPDATE_NOTIFICATIONS_COUNT,
      };

      PubSub.publish(events.NOTIFICATION_COUNT_EVENT, JSON.stringify(payload));
      if (createdAt) {
        const response = await markAllAsViewed(createdAt);

        response && triggerOnError(response);
      }
    } catch (er) {
      //  handle error if needed
    }
  };

  const handleLoadMore = (event: React.MouseEvent) => {
    event.preventDefault();
    onEndReached();
  };

  const renderFooter = () => {
    if (isEmptyArray(notifications) && isLoading) return <div />;

    return (
      <div className="siren-sdk-panel-footer" data-testid="custom-footer">
        {customFooter}
      </div>
    );
  };

  const renderedListItems = useMemo(() => {
    return notifications.map((item) => (
      <NotificationCard
        notification={item}
        cardProps={cardProps}
        onCardClick={onCardClick}
        deleteNotificationById={deleteNotificationById}
        styles={styles}
        key={item.id}
        darkMode={darkMode}
        data-testid="notification-card"
      />
    ));
  }, [notifications, cardProps, onCardClick, deleteNotificationById, styles, darkMode]);


  const renderList = () => {
    if (isLoading && isEmptyArray(notifications)) {
      const hideAvatar = cardProps?.hideAvatar || false;
      
      return (
        <div className="siren-sdk-list-loader-container">
          {customLoader || 
          <>
            <AnimatedLoader styles={styles} hideAvatar={hideAvatar}/>
            <AnimatedLoader styles={styles} hideAvatar={hideAvatar}/>
            <AnimatedLoader styles={styles} hideAvatar={hideAvatar}/>
            <AnimatedLoader styles={styles} hideAvatar={hideAvatar}/>
            <AnimatedLoader styles={styles} hideAvatar={hideAvatar}/>
          </>}
        </div>
      );
    }

    if (error && !isLoading)
      return (
        <div aria-label="siren-error-state">
          { customErrorWindow || (
            <ErrorWindow styles={styles} error={error} darkMode={darkMode} />
          )}
        </div>
      );

    if (isEmptyArray(notifications) && !error && !isLoading)
      return (
        <div aria-label="siren-empty-state">
          {listEmptyComponent || (
            <EmptyList
              data-testid="empty-list"
              styles={styles}
              darkMode={darkMode}
            />)
          }
        </div>     
      );

    if (customCard)
      return notifications.map((item) => customCard(item));

    return renderedListItems;
  };

  const renderListBottomComponent = useMemo(() => {
    if (isEmptyArray(notifications)) return null;
    if (isLoading && !endReached)
      return (
        <div className="siren-sdk-panel-infinite-loader-container">
          <div
            className="siren-sdk-panel-infinite-loader"
            style={styles.infiniteLoader}
          />
        </div>
      );
    if (!isLoading && !endReached)
      return (
        <ShowMoreButton
          styles={styles}
          customComponent={loadMoreComponent}
          onClick={handleLoadMore}
          loadMoreLabel={loadMoreLabel}
        />
      );

    return null;
  }, [notifications, isLoading, endReached, styles, loadMoreComponent, handleLoadMore, loadMoreLabel]);


  const containerClassNames = useMemo(() => {
    return `${
      (!notifications?.length || error) &&
      !isLoading &&
      "siren-sdk-content-container"
    } ${customFooter ? "siren-sdk-panel-no-border" : ""}`;
  }, [notifications, error, isLoading, customFooter]);

  const panelStyle = useMemo(() => {
    return {
      ...(!fullScreen && styles.windowTopBorder),
      ...(!fullScreen && { width: `${modalWidth}px` }),
      ...(!fullScreen && styles.windowBottomBorder),
      ...styles.container,
    };
  }, [fullScreen, styles, modalWidth]);

  return (
    <div
      className={
        !fullScreen ? "siren-sdk-panel-modal" : "siren-sdk-panel-container"
      }
      style={panelStyle}
      data-testid="siren-panel"
    >
      <div>
        {!hideHeader &&
          (customHeader || (
            <Header
              title={title}
              styles={styles}
              hideClearAll={hideClearAll}
              fullScreen={fullScreen}
              enableClearAll={!isEmptyArray(notifications)}
              handleClearAllNotification={handleClearAllNotification}
            />
          ))}
        <div
          style={{
            ...(!fullScreen && styles.windowBottomBorder),
            ...styles.contentContainer,
          }}
        >
          <div
            id="contentContainer"
            style={{
              ...(!fullScreen && styles.windowBottomBorder),
              ...styles.body,
            }}
            className={containerClassNames}
            aria-label="siren-notification-list"
          >
            {renderList()}
            {renderListBottomComponent}
          </div>
          {renderFooter()}
        </div>
      </div>
    </div>
  );
};

export default SirenPanel;
