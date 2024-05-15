import React, { type FC } from "react";

import "../styles/loader.css";
import type { LoaderProps } from "../types";

/**
 * Loader component represents a skeleton loader for the notification card.
 *
 * @component
 * @example
 * <Loader
 *   hideAvatar={false}
 *   styles={customStyles}
 * />
 *
 * @param {LoaderProps} props - The properties passed to the Loader component.
 * @param {boolean} props.hideAvatar - Flag to determine if the avatar should be hidden.
 * @param {Object} props.styles - Custom styles applied to the loader.
 * @returns {ReactElement} The rendered Loader component.
 */

const Loader : FC<LoaderProps> = ({
  hideAvatar,
  styles,

}) =>  {
  return (
    <div className="siren-sdk-skeleton-container">
      <div className={`${!hideAvatar ? 'siren-sdk-skeleton-grid-with-avatar' : 'siren-sdk-skeleton-grid-without-avatar' }`}>
        {!hideAvatar && (<div className="siren-sdk-skeleton-avatar siren-sdk-skeleton" style={styles.loader} />)}
        <div className="siren-sdk-skeleton-head siren-sdk-skeleton" style={styles.loader} />
        <div className="siren-sdk-skeleton-subtitle siren-sdk-skeleton" style={styles.loader} />
        <div className="siren-sdk-skeleton-body siren-sdk-skeleton" style={styles.loader}/>
        <div className="siren-sdk-skeleton-icon  siren-sdk-skeleton" style={styles.loader}/>
        <div className="siren-sdk-skeleton-footer  siren-sdk-skeleton" style={styles.loader} />
        <div className="siren-sdk-skeleton-close  siren-sdk-skeleton" style={styles.loader} />
      </div>
    </div>
  );
};

export default Loader;
