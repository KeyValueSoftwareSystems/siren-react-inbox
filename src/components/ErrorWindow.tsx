import React from "react";

import errorIcon from "../assets/errorIcon.svg";
import type { SirenStyleProps } from "../types";
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
 * @param {Object} props - The properties passed to the ErrorWindow component.
 * @param {Object} props.styles - The styles object to customize the appearance of the error window.
 * @param {Function} props.onRefresh - Callback function executed when the refresh button is clicked.
 * @returns {ReactElement} The rendered ErrorWindow component.
 */
const ErrorWindow = (props: {
  styles: SirenStyleProps;
  onRefresh: () => void;
  error: string;
}) => {
  const { styles, error } = props;

  return (
    <div
      className="siren-sdk-error-window-container"
      data-testid="error-window"
    >
      <img
        src={errorIcon}
        alt="error-icon"
        className="siren-sdk-error-icon"
      />
      <p style={styles.errorText} className="siren-sdk-error-text">
        {error || ERROR_TEXT}
      </p>
      <p className='siren-sdk-error-sub-text'>{ERROR_SUB_TEXT}</p>
      {/* <div
        onClick={onRefresh}
        style={styles.errorButton}
        className="siren-sdk-error-button"
        data-testid="refresh-button"
      >
        <p style={styles.errorButtonText}>{RETRY_BUTTON_LABEL}</p>
      </div> */}
    </div>
  );
};

export default ErrorWindow;
