import React, { type FC } from "react";

import type { HeaderProps } from "../types";
import { Constants } from "../utils";
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
 *   handleClearAllNotification={() => console.log('Clear all notifications')}
 * />
 *
 * @param {HeaderProps} props - The properties passed to the Header component.
 * @param {string} props.title - The title to be displayed in the header.
 * @param {Object} props.styles - The styles object to customize the appearance of the header.
 * @param {boolean} props.enableClearAll - Whether to enable the "Clear All" action in the header.
 * @param {Function} props.handleClearAllNotification - Callback function executed when the "Clear All" action is clicked.
 * @returns {ReactElement} The rendered Header component.
 */
const Header: FC<HeaderProps> = ({
  title,
  styles,
  enableClearAll,
  handleClearAllNotification,
}) => (
  <div style={styles.headerContainer} data-testid="header">
    <p style={styles.headerTitle}>{title}</p>
    {enableClearAll && (
      <div
        onClick={() => {
          handleClearAllNotification();
        }}
        data-testid="clear-all"
      >
        <p style={styles.headerAction}>{CLEAR_ALL_LABEL}</p>
      </div>
    )}
  </div>
);

export default Header;