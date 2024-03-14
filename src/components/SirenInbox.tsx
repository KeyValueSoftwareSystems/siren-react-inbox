import React, { type FC, useEffect, useMemo, useRef, useState } from "react";

import NotificationButton from "./SirenNotificationIcon";
import SirenPanel from "./SirenPanel";
import { useSirenContext } from "./SirenProvider";
import type { SirenProps } from "../types";
import { Constants } from "../utils";
import { applyTheme, calculateModalPosition } from "../utils/commonUtils";
import { BadgeType, ThemeMode } from "../utils/constants";
import "../styles/sirenInbox.css";

const { DEFAULT_WINDOW_TITLE } = Constants;
/**
 * SirenInbox Component
 * @param {Object} props - Props for the SirenInbox component
 * @param {Theme} props.theme - The theme for the SirenInbox component
 * @param {string} [props.title] - The title for the SirenInbox component
 * @param {boolean} [props.windowViewOnly=false] - Flag indicating if the window is view-only
 * @param {boolean} [props.hideHeader] - Flag indicating if the header should be hidden
 * @param {boolean} [props.hideClearAll] - Flag indicating if the clear all button should be hidden
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
 * @returns {JSX.Element} - SirenInbox component JSX
 */

const SirenInbox: FC<SirenProps> = ({
  theme,
  title = DEFAULT_WINDOW_TITLE,
  windowViewOnly = false,
  hideHeader,
  hideClearAll = false,
  darkMode,
  cardProps,
  notificationIcon,
  listEmptyComponent,
  customFooter,
  customHeader,
  customNotificationCard,
  onNotificationCardClick,
  onError,
  noOfNotificationsPerFetch = 10,
}) => {
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
        darkMode ? ThemeMode.DARK : ThemeMode.LIGHT
      ),
    [theme, darkMode]
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
    <div ref={modalRef} className={`${!windowViewOnly ? "siren-sdk-inbox-container" : '' }`}>
      {!windowViewOnly && (
        <div ref={iconRef}>
          <NotificationButton
            notificationIcon={notificationIcon}
            styles={styles}
            onIconClick={onIconClick}
            badgeType={isModalOpen ? BadgeType.NONE : BadgeType.DEFAULT}
          />
        </div>
      )}

      {(isModalOpen || windowViewOnly) && (
        <div
          style={{
            ...styles.container,
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
            noOfNotificationsPerFetch={noOfNotificationsPerFetch}
            hideHeader={hideHeader}
            cardProps={cardProps}
            customFooter={customFooter}
            customHeader={customHeader}
            customNotificationCard={customNotificationCard}
            onNotificationCardClick={onNotificationCardClick}
            onError={onError}
            listEmptyComponent={listEmptyComponent}
            fullScreen={windowViewOnly}
            hideClearAll={hideClearAll}
          />
        </div>
      )}
    </div>
  );
};

export default SirenInbox;
