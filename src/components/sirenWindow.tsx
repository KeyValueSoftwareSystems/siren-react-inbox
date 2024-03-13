import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
} from "react";
  
import { Siren } from "test_notification";
import type { NotificationDataType } from "test_notification/dist/types";
import type { SirenProps } from "../types";
import { useSiren } from "../utils";
import { applyTheme } from "../utils/commonUtils";
import { ThemeMode, sirenReducerTypes } from "../utils/constants";
import EmptyList from "./emptyList";
import ErrorWindow from "./errorWindow";
import NotificationButton from "./sirenNotificationIcon";
import { useSirenContext } from "./sirenProvider";
import SirenPanel from "./sirenPanel";
  
/**
   * SirenWindow Component
   * @param {SirenProps} props - Props for the SirenWindow component
   * @returns {JSX.Element} - SirenWindow component JSX
   */
  
const SirenWindow: FC<SirenProps> = ({
  theme,
  title,
  windowViewOnly = false,
  hideHeader,
  darkMode,
  cardProps,
  itemsPerPage = 10,
  notificationIcon,
  listEmptyComponent,
  customFooter,
  customHeader,
  realTimeNotificationEnabled = false,
  realTimeUnViewedCountEnabled = true,
  badgeType,
  customNotificationCard,
  onNotificationCardClick,
  onError,
}) => {
  const { sirenCore, unviewedCount, notifications, dispatch } =
      useSirenContext();
  
  const {
    deleteNotification,
    markNotificationsAsViewed,
    clearAllNotification,
  } = useSiren();
  const styles = useMemo(
    () =>
      applyTheme(
        darkMode ? theme?.dark : theme?.light,
        darkMode ? ThemeMode.DARK : ThemeMode.LIGHT
      ),
    [theme, darkMode]
  );
  
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [endReached, setEndReached] = useState(false);
  
  // Determine if real-time notification and unviewed count fetching is enabled
  const allowRealTimeNotificationFetch =
      realTimeNotificationEnabled &&
      ((isModalOpen && !windowViewOnly) || windowViewOnly);
  const allowRealTimeUnViewedCount =
      realTimeUnViewedCountEnabled && !isModalOpen && !windowViewOnly;
  
  /**
     * Handler to mark notifications as viewed
     * @returns {Promise<void>}
     */
  
  const handleMarkNotificationsAsViewed = async (): Promise<void> => {
    dispatch({
      type: sirenReducerTypes.SET_UN_VIEWED_NOTIFICATION_COUNT,
      payload: 0,
    });
    if (notifications?.length > 0) {
      const response = await markNotificationsAsViewed(notifications[0].createdAt);
    
      if (response?.error && onError) onError(response.error);
    }
  };
    
    
  // Effect to manage real-time updates for unviewed count and notifications
  useEffect(() => {
    if (isModalOpen) {
      if(!isLoading)
        handleMarkNotificationsAsViewed();    
      if (realTimeUnViewedCountEnabled)
        sirenCore?.stopRealTimeUnviewedCountFetch();
    } else if (realTimeUnViewedCountEnabled) {
      sirenCore?.startRealTimeUnviewedCountFetch();
      sirenCore?.stopRealTimeNotificationFetch();
    }
  }, [realTimeUnViewedCountEnabled, isModalOpen, isLoading]);
  
  
  // Effect to fetch notifications based on conditions
  useEffect(() => {
    if (!isLoading && sirenCore) {
      if(isModalOpen) 
        fetchNotifications(sirenCore, false);
        
      const notificationParams: { size: number; start?: string } = {
        size: itemsPerPage,
      };
  
      if (notifications.length)
        notificationParams.start = notifications[0].createdAt;
  
      if (allowRealTimeNotificationFetch)
        sirenCore?.startRealTimeNotificationFetch(notificationParams);
      else sirenCore?.stopRealTimeNotificationFetch();
    }
  }, [allowRealTimeNotificationFetch]);
  
  
  // Effect to fetch unviewed notification count
  useEffect(() => {
    if (sirenCore && !windowViewOnly) getUnViewedNotificationCount(sirenCore);
  }, [sirenCore, windowViewOnly]);
  
  
  useEffect(() => {
    // Initialize Siren SDK and start polling notifications
    initialize();
      
    // Clean up - stop polling when component unmounts
    return () => {
      sirenCore?.stopRealTimeNotificationFetch();
      sirenCore?.stopRealTimeUnviewedCountFetch();
    };
  }, [sirenCore]);
  
  /**
     * Set notifications in the context
     * @param {NotificationDataType
    * updatedNotifications - Updated notifications array
    */
  
  const setNotifications = (updatedNotifications: NotificationDataType[]): void => {
    dispatch({
      type: sirenReducerTypes.SET_NOTIFICATIONS,
      payload: updatedNotifications,
    });
  };
  
  /**
   * Initializes the Siren component.
   * fetches notifications if windowViewOnly is enabled.
   * If real-time notification fetch is enabled, starts real-time notification fetch.
   * If real-time unviewed count fetch is enabled, starts real-time unviewed count fetch.
   */
  const initialize = async (): Promise<void> => {
    setIsError(false);
    if (Siren && sirenCore && !isError) {
      if(windowViewOnly) {
        const allNotifications = await fetchNotifications(sirenCore, true);
  
        if (realTimeNotificationEnabled) {
          const notificationParams: { size: number; start?: string } = {
            size: itemsPerPage
          };
  
          if (allNotifications.length) notificationParams.start = allNotifications[0].createdAt;
          sirenCore?.startRealTimeNotificationFetch(notificationParams);
        }
      }
      if (allowRealTimeUnViewedCount)
        sirenCore?.startRealTimeUnviewedCountFetch();
    }
  };
  
  // Fetch notifications
  const fetchNotifications = async (
    sirenObject: Siren,
    isResetList = false
  ): Promise<NotificationDataType[]> => {
    setIsError(false);
    setIsLoading(true);
    let updatedNotifications = isResetList ? [] : [...notifications];
  
    if (sirenObject)
      try {
        const isNonEmptyList = updatedNotifications?.length > 0;
        const notificationParams: { size: number; end?: string } = {
          size: itemsPerPage,
        };
  
        if (isNonEmptyList)
          notificationParams.end =
             updatedNotifications[updatedNotifications.length - 1].createdAt;
  
        const res = await sirenObject.fetchAllNotifications(notificationParams);
  
        setIsLoading(false);
        if (res?.data && res?.data?.length > 0)
          updatedNotifications = !isNonEmptyList
            ? res.data
            : [...notifications, ...res.data];
        else setEndReached(true);
        if (res?.data && res?.data?.length < itemsPerPage) setEndReached(true);
        setNotifications(updatedNotifications);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
  
    return updatedNotifications;
  };
  
  // Load more notifications on clicking Load more
  const onEndReached = (): void => {
    if (sirenCore && !isLoading && !endReached && notifications?.length > 0)
      fetchNotifications(sirenCore, false);
  };
  
  /**
    * Get unviewed notification count
    * @param {Siren} sirenCore - Siren SDK instance
    */
  const getUnViewedNotificationCount = async (sirenCore: Siren): Promise<void> => {
    try {
      const count = await sirenCore.fetchUnviewedNotificationsCount();
  
      dispatch({
        type: sirenReducerTypes.SET_UN_VIEWED_NOTIFICATION_COUNT,
        payload: count?.data?.unviewedCount || 0,
      });
    } catch (error) {
      setIsError(true);
    }
  };
  
  const deleteNotificationById = useCallback(
    async (id: string) => {
      const response = await deleteNotification(id);
  
      if (response?.error && onError) 
        onError(response.error);
       
    },
    [deleteNotification, notifications]
  );
  
  const handleClearAllNotification = async (): Promise<void> => {
    if (notifications.length > 0) {
      const response = await clearAllNotification(notifications[0].createdAt);
  
      if (response?.error && onError) {
        onError(response.error);
      } else {
        setIsLoading(false);
        setNotifications([]);
        setEndReached(false);
      }
    }
  };
  
  // Refresh notifications
  const onRefresh = async (): Promise<void> => {
    if (sirenCore) {
      setEndReached(false);
      setIsError(false);
      setIsLoading(true);
      setNotifications([]);
      realTimeNotificationEnabled && sirenCore?.stopRealTimeNotificationFetch();
      const allNotifications =
         (await fetchNotifications(sirenCore, true)) || [];
      const notificationParams: { size: number; start?: string } = {
        size: itemsPerPage,
      };
  
      if (allNotifications?.length > 0)
        notificationParams.start = allNotifications[0].createdAt;
  
      realTimeNotificationEnabled &&
         sirenCore?.startRealTimeNotificationFetch(notificationParams);
    }
  };
  
  // Render error window or list empty component
  const renderListEmpty = () => {
    if (!isLoading) {
      if (isError) return <ErrorWindow onRefresh={onRefresh} styles={styles} />;
  
      return listEmptyComponent || <EmptyList styles={styles} />;
    }
  };
  
  return (
    <div style={{ position: "relative" }}>
      {!windowViewOnly && (
        <NotificationButton
          count={unviewedCount}
          notificationIcon={notificationIcon}
          styles={styles}
          badgeType={badgeType}
          onButtonClick={() => setIsModalOpen((prevState: boolean) => !prevState)}
        />
      )}
  
      {(isModalOpen || windowViewOnly) && (
        <div
          className="siren-sdk-notificationsWrapper-modalContainer"
          style={{
            ...styles.container,
            width: windowViewOnly ? "100%" : styles.container.width,
            position: "absolute",
            top: "50px",
          }}
        >
          <SirenPanel
            title={title}
            styles={styles}
            isLoading={isLoading}
            hideHeader={hideHeader}
            cardProps={cardProps}
            notifications={notifications}
            itemsPerPage={itemsPerPage}
            renderListEmpty={renderListEmpty}
            customFooter={customFooter}
            customHeader={customHeader}
            loadMore={onEndReached}
            customNotificationCard={customNotificationCard}
            onNotificationCardClick={onNotificationCardClick}
            deleteNotificationById={deleteNotificationById}
            handleClearAllNotification={handleClearAllNotification}
            onError={onError}
            endReached={endReached}
          />
        </div>
      )}
    </div>
  );
};
  
export default SirenWindow;