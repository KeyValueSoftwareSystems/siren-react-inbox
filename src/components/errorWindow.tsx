import React from "react";

import { ERROR_TEXT, RETRY_BUTTON_LABEL } from "../utils/constants";
import type { SirenStyleProps } from "../types";

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
}) => {
  const { styles, onRefresh } = props;

  return (
    <div style={styles.emptyContainer} data-testid="error-window">
      <p style={styles.errorText}>{ERROR_TEXT}</p>
      <div
        onClick={onRefresh}
        style={styles.errorButton}
        data-testid="refresh-button"
      >
        <p style={styles.errorButtonText}>{RETRY_BUTTON_LABEL}</p>
      </div>
    </div>
  );
};

export default ErrorWindow;