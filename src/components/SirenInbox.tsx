import React, { type FC, useEffect, useMemo, useRef, useState } from "react";

import "../styles/sirenInbox.css";
import NotificationButton from "./SirenNotificationIcon";
import SirenPanel from "./SirenPanel";
import { useSirenContext } from "./SirenProvider";
import type { SirenProps } from "../types";
import { DefaultStyle } from "../utils";
import {
  applyTheme,
  calculateModalPosition,
  calculateModalWidth,
  debounce,
} from "../utils/commonUtils";
import {
  EventType,
  MAXIMUM_ITEMS_PER_FETCH,
  ThemeMode,
} from "../utils/constants";


/**
 * SirenInbox Component
 * @param {Object} props - Props for the SirenInbox component
 * @param {Theme} props.theme - The theme for the SirenInbox component
 * @param {string} [props.title] - The title for the SirenInbox component
 * @param {boolean} [props.windowViewOnly=false] - Flag indicating if the window is view-only
 * @param {boolean} [props.hideBadge] - Flag indicating if the badge should be hidden
 * @param {CardProps} [props.headerProps] - Object containing props related to the inbox header
 * @param {boolean} [props.darkMode] - Flag indicating if the component is in dark mode
 * @param {CardProps} [props.cardProps] - Additional props for the card component
 * @param {ReactNode} [props.notificationIcon] - The notification icon for the window
 * @param {JSX.Element} [props.listEmptyComponent] - JSX element for rendering when the list is empty
 * @param {JSX.Element} [props.customFooter] - Custom footer JSX element for the window
 * @param {Function} [props.customCard] - Function to render custom notification card
 * @param {Function} [props.onCardClick] - Handler for notification card click event
 * @param {Function} [props.onError] - Handler for error events
 * @param {number} [props.noOfNotificationsPerFetch] - The number of notifications to fetch per request
 * @param {ReactNode} [pros.customLoader] - Custom Loader component to be rendered while fetching notification list for the first time
 * @param {ReactNode} [pros.loadMoreComponent] -Custom load more component to be rendered 
 * @param {ReactNode} [props.customErrorWindow] -Custom error window component to be rendered when there is an error
 
 * @returns {JSX.Element} - SirenInbox component JSX
 */

const SirenInbox: FC<SirenProps> = ({
  theme,
  customStyles,
  windowViewOnly = false,
  hideBadge = false,
  darkMode = false,
  headerProps,
  cardProps,
  notificationIcon,
  listEmptyComponent,
  customFooter,
  customLoader,
  customErrorWindow,
  loadMoreComponent,
  customCard,
  onCardClick,
  onError,
  itemsPerFetch = 20,
}) => {
  const notificationsPerPage = useMemo(
    () =>
      Math.max(
        0,
        itemsPerFetch > MAXIMUM_ITEMS_PER_FETCH
          ? MAXIMUM_ITEMS_PER_FETCH
          : itemsPerFetch
      ),
    [itemsPerFetch]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { siren } = useSirenContext();
  const iconRef = useRef<HTMLDivElement>(null);
  //ref for the modal
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalPosition, setModalPosition] = useState<{
    right?: string;
    left?: string;
  }>();
  const initialModalWidth =
    customStyles?.window?.width || DefaultStyle.window.width;
  const [updatedModalWidth, setUpdatedModalWidth] = useState(initialModalWidth);
  const styles = useMemo(
    () =>
      applyTheme(
        darkMode ? theme?.dark : theme?.light,
        darkMode ? ThemeMode.DARK : ThemeMode.LIGHT,
        customStyles
      ),
    [theme, darkMode, customStyles]
  );

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("mouseup", onMouseUp);

      return () => document.removeEventListener("mouseup", onMouseUp);
    }

    return () => {
      siren?.stopRealTimeFetch(EventType.NOTIFICATION);
      siren?.stopRealTimeFetch(EventType.UNVIEWED_COUNT);
    };
  }, []);

  useEffect(() => {
    const modalWidth = calculateModalWidth(initialModalWidth);

    if (window.innerWidth <= modalWidth)
    // Subtract 40 pixels to account for padding within the window container
      setUpdatedModalWidth(window.innerWidth - 40);
    else setUpdatedModalWidth(initialModalWidth);
  }, [window.innerWidth, initialModalWidth]);

  useEffect(() => {
    const containerWidth = styles.container.width || DefaultStyle.window.width;
    const updateWindowViewMode = () => {
      setModalPosition(calculateModalPosition(iconRef, window, containerWidth));
    };

    const debouncedUpdate = debounce(updateWindowViewMode, 200);

    updateWindowViewMode();
    window.addEventListener("resize", debouncedUpdate);

    return () => window.removeEventListener("resize", debouncedUpdate);
  }, [styles.container.width]);

  const onMouseUp = (event: Event): void => {
    if (
      event.target instanceof Node &&
      !modalRef?.current?.contains(event.target)
    )
      // to close the modal on clicking outside the modal
      setIsModalOpen(false);
  };

  const onIconClick = () => {
    setIsModalOpen((prevState: boolean) => !prevState);
  };

  const modalStyle = useMemo(() => {
    if (windowViewOnly) 
      return {
        width: "100%",
        height: "100%",
      };
    else 
      return {
        ...styles.windowShadow,
        ...modalPosition,
        width: updatedModalWidth,
      };
    
  }, [windowViewOnly, updatedModalWidth, styles.windowShadow]);
  

  return (
    <div
      ref={modalRef}
      className={`${!windowViewOnly ? "siren-sdk-inbox-container" : "siren-sdk-inbox-window-container"}`}
    >
      {!windowViewOnly && (
        <div ref={iconRef}>
          <NotificationButton
            notificationIcon={notificationIcon}
            styles={styles}
            onIconClick={onIconClick}
            darkMode={darkMode}
            hideBadge={hideBadge}
            isModalOpen={isModalOpen}
          />
        </div>
      )}

      {(isModalOpen || windowViewOnly) && (
        <div
          style={{
            position: windowViewOnly ? "initial" : "absolute",
            ...styles.container,
            ...modalStyle,
          }}
          data-testid="siren-panel"
        >
          <SirenPanel
            styles={styles}
            noOfNotificationsPerFetch={notificationsPerPage}
            hideBadge={hideBadge}
            headerProps={headerProps}
            cardProps={cardProps}
            customFooter={customFooter}
            customCard={customCard}
            onCardClick={onCardClick}
            onError={onError}
            listEmptyComponent={listEmptyComponent}
            fullScreen={windowViewOnly}
            customLoader={customLoader}
            loadMoreComponent={loadMoreComponent}
            darkMode={darkMode}
            customErrorWindow={customErrorWindow}
            modalWidth={updatedModalWidth}
          />
        </div>
      )}
    </div>
  );
};

export default SirenInbox;
