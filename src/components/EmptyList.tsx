import React from "react";

import darkModeIcon from "../assets/dark/emptyIconDark.svg";
import lightModeIcon from "../assets/light/emptyIconLight.svg";
import type { SirenStyleProps } from "../types";
import { Constants } from "../utils";
import { LIST_EMPTY_SUB_TEXT, LIST_EMPTY_TEXT } from "../utils/constants";
import "../styles/emptyList.css";

/**
 * EmptyList component represents a placeholder displayed when the notification list is empty.
 *
 * @component
 * @example
 * <EmptyList
 *   styles={customStyles}
 * />
 *
 * @param {Object} props - The properties passed to the EmptyList component.
 * @param {Object} props.styles - The styles object to customize the appearance of the empty list.
 * @returns {ReactElement} The rendered EmptyList component.
 */
const EmptyList = (props: { styles: SirenStyleProps, darkMode: boolean }) => {
  const { styles, darkMode } = props;

  const containerStyle = { backgroundColor: darkMode ? Constants.COLORS.dark.iconColor : Constants.COLORS.light.iconColor };

  return (
    <div className="siren-sdk-empty-container">
      <div className="siren-sdk-empty-icon-container" style={containerStyle}>
        {darkMode ? <img src={darkModeIcon} alt="empty-icon" className="siren-sdk-empty-icon" />
          :
          <img src={lightModeIcon} alt="empty-icon" className="siren-sdk-empty-icon" />}
      </div>
      <div style={styles.emptyText} className="siren-sdk-empty-text">
        {LIST_EMPTY_TEXT}
      </div>
      <div style={styles.emptyText} className="siren-sdk-empty-sub-text">
        {LIST_EMPTY_SUB_TEXT}
      </div>
    </div>
  );
};

export default EmptyList;
