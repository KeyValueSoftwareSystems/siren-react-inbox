import React, { type FC, useMemo } from "react";

import ClearAllIcon from "./ClearAllIcon";
import type { HeaderProps } from "../types";
import { Constants } from "../utils";
import "../styles/header.css";

const { CLEAR_ALL_LABEL } = Constants;

/**
 * Header component represents the header section of the notification panel.
 *
 * @component
 * @example
 * <Header
 *   title="Notifications"
 *   styles={customStyles}
 *   enableClearAll={true}
 *   hideClearAll={false}
 *   handleClearAllNotification={() => console.log('Clear all notifications')}
 *   fullScreen={false}
 * />
 *
 * @param {HeaderProps} props - The properties passed to the Header component.
 * @param {string} props.title - The title to be displayed in the header.
 * @param {Object} props.styles - The styles object to customize the appearance of the header.
 * @param {boolean} props.enableClearAll - Whether to enable the "Clear All" action in the header.
 * @param {boolean} props.hideClearAll - Flag indicating if the "Clear All" action should be hidden.
 * @param {Function} props.handleClearAllNotification - Callback function executed when the "Clear All" action is clicked.
 * @param {boolean} props.fullScreen - Flag indicating if the component is in full screen mode.
 * @returns {ReactElement} The rendered Header component.
 */
const Header: FC<HeaderProps> = ({
  title,
  styles,
  enableClearAll,
  hideClearAll,
  handleClearAllNotification,
  fullScreen
}) => {

  const headerRightContainerStyle = useMemo(() => ({
    ...(!enableClearAll && {
      opacity: 0.5,
      cursor: 'default'
    })
  }), [enableClearAll]);
  
  return (  
    <div
      style={{...(!fullScreen && styles.windowTopBorder),...styles.headerContainer}}
      className="siren-sdk-header-container"
      data-testid="header"
    >
      <p style={styles.headerTitle} className="siren-sdk-text-break">{title}</p>
      {!hideClearAll && (
        <div
          className="siren-sdk-header-right-container"
          style={headerRightContainerStyle}
          onClick={handleClearAllNotification}
          data-testid="clear-all"
          aria-disabled={!enableClearAll}
          aria-label="siren-header-clear-all"
          role="button"
        >
          <ClearAllIcon color={styles.clearIcon.color} size={styles.clearIcon.size}/>
          <p
            className="siren-sdk-header-clear-all-text"
            style={styles.headerAction}
          >
            {CLEAR_ALL_LABEL}
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
