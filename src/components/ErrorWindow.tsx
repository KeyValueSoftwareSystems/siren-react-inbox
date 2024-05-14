import type { FC } from "react";
import React from "react";

import errorIcon from "../assets/errorIcon.svg";
import type { ErrorWindowProps } from "../types";
import { Constants } from "../utils";
import { ERROR_SUB_TEXT, ERROR_TEXT } from "../utils/constants";
import "../styles/errorWindow.css";

/**
 * ErrorWindow component represents a window displayed when an error occurs.
 *
 * @component
 * @example
 * <ErrorWindow
 *   styles={customStyles}
 *   onRefresh={() => console.log('Refresh button clicked')}
 * />
 *
 * @param {ErrorWindowProps} props - The properties passed to the ErrorWindow component.
 * @param {Object} props.styles - The styles object to customize the appearance of the error window.
 * @param {Object} props.error - The error message to display in the window.
 * @param {boolean} props.darkMode - Flag for whether the selected theme is dark mode
 * @returns {ReactElement} The rendered ErrorWindow component.
 */
const ErrorWindow: FC<ErrorWindowProps> = ({
  styles,
  error,
  darkMode
}) => {
  const containerStyle = {
    backgroundColor: darkMode
      ? Constants.COLORS.dark.iconColor
      : Constants.COLORS.light.iconColor,
  };
  const iconOpacity = { opacity: darkMode ? 0.2 : 1 };

  return (
    <div
      className="siren-sdk-error-window-container"
      data-testid="error-window"
    >
      <div className="siren-sdk-error-icon-container" style={containerStyle}>
        <img
          src={errorIcon}
          alt="error-icon"
          className="siren-sdk-error-icon"
          style={iconOpacity}
        />
      </div>
      <div style={styles.errorText} className="siren-sdk-error-text">
        {error || ERROR_TEXT}
      </div>
      <div style={styles.errorText} className="siren-sdk-error-sub-text">
        {ERROR_SUB_TEXT}
      </div>
    </div>
  );
};

export default ErrorWindow;
