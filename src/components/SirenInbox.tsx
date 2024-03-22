import React, { type FC, useEffect, useMemo, useRef, useState } from "react";

import NotificationButton from "./SirenNotificationIcon";
import SirenPanel from "./SirenPanel";
import { useSirenContext } from "./SirenProvider";
import type { SirenProps } from "../types";
import { Constants } from "../utils";
import { applyTheme, calculateModalPosition } from "../utils/commonUtils";
import { BadgeType, MAXIMUM_ITEMS_PER_FETCH, ThemeMode } from "../utils/constants";
import "../styles/sirenInbox.css";

const { DEFAULT_WINDOW_TITLE } = Constants;
/**
 * SirenInbox Component
 * @param {Object} props - Props for the SirenInbox component
 * @param {Theme} props.theme - The theme for the SirenInbox component
 * @param {string} props.title - The title of the notification panel.
 * @param {string} [props.title] - The title for the SirenInbox component
 * @param {boolean} [props.windowViewOnly=false] - Flag indicating if the window is view-only
 * @param {boolean} [props.hideHeader] - Flag indicating if the header should be hidden
 * @param {boolean} [props.hideClearAll] - Flag indicating if the clear all button should be hidden
 * @param {boolean} [props.hideBadge] - Flag indicating if the badge should be hidden
 * @param {boolean} [props.darkMode] - Flag indicating if the component is in dark mode
 * @param {CardProps} [props.cardProps] - Additional props for the card component
 * @param {ReactNode} [props.notificationIcon] - The notification icon for the window
 * @param {JSX.Element} [props.listEmptyComponent] - JSX element for rendering when the list is empty
 * @param {JSX.Element} [props.customFooter] - Custom footer JSX element for the window
 * @param {JSX.Element} [props.customHeader] - Custom header JSX element for the window
 * @param {Function} [props.customNotificationCard] - Function to render custom notification card
 * @param {Function} [props.onNotificationCardClick] - Handler for notification card click event
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
  title = DEFAULT_WINDOW_TITLE,
  windowViewOnly = false,
  hideHeader,
  hideBadge = true,
  hideClearAll = false,
  darkMode = false,
  cardProps,
  notificationIcon,
  listEmptyComponent,
  customFooter,
  customHeader,
  customLoader,
  customErrorWindow,
  loadMoreComponent,
  customNotificationCard,
  onNotificationCardClick,
  onError,
  itemsPerFetch = 20,
}) => {
  const notificationsPerPage =
  itemsPerFetch > MAXIMUM_ITEMS_PER_FETCH ? MAXIMUM_ITEMS_PER_FETCH : itemsPerFetch;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { siren } = useSirenContext();
  const iconRef = useRef<HTMLDivElement>(null);
  //ref for the modal
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalPosition, setModalPosition] = useState<{
    top: string;
    right?: string;
  }>({ top: "0" });

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
      siren?.stopRealTimeNotificationFetch();
      siren?.stopRealTimeUnviewedCountFetch();
    };
  }, []);

  useEffect(() => {
    const updateModalPosition = () => {
      const containerWidth = styles.container.width || 400;

      setModalPosition(calculateModalPosition(iconRef, window, containerWidth));
    };

    updateModalPosition(); // Initial calculation
    window.addEventListener("resize", updateModalPosition); // Event listener for window resize

    return () => {
      window.removeEventListener("resize", updateModalPosition);
    };
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

  return (
    <div
      ref={modalRef}
      className={`${!windowViewOnly && "siren-sdk-inbox-container"}`}
    >
      {!windowViewOnly && (
        <div ref={iconRef}>
          <NotificationButton
            notificationIcon={notificationIcon}
            styles={styles}
            onIconClick={onIconClick}
            badgeType={isModalOpen ? BadgeType.NONE : BadgeType.DEFAULT}
            darkMode={darkMode}
            hideBadge={hideBadge}
          />
        </div>
      )}

      {(isModalOpen || windowViewOnly) && (
        <div
          style={{
            ...styles.container,
            ...(!windowViewOnly && styles.windowShadow),
            width:
              windowViewOnly || window.innerWidth < 500
                ? "100%"
                : styles.container.width,
            position:
              windowViewOnly || window.innerWidth < 500
                ? "initial"
                : "absolute",
            ...modalPosition,
          }}
          data-testid="siren-panel"
        >
          <SirenPanel
            title={title}
            styles={styles}
            noOfNotificationsPerFetch={notificationsPerPage}
            hideHeader={hideHeader}
            hideBadge={hideBadge}
            cardProps={cardProps}
            customFooter={customFooter}
            customHeader={customHeader}
            customNotificationCard={customNotificationCard}
            onNotificationCardClick={onNotificationCardClick}
            onError={onError}
            listEmptyComponent={listEmptyComponent}
            fullScreen={windowViewOnly}
            hideClearAll={hideClearAll}
            customLoader={customLoader}
            loadMoreComponent={loadMoreComponent}
            darkMode={darkMode}
            customErrorWindow={customErrorWindow}
          />
        </div>
      )}
    </div>
  );
};

export default SirenInbox;
