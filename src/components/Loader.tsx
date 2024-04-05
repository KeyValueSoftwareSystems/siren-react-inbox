import React, { type FC } from "react";

import "../styles/loader.css";
import type { LoaderProps } from "../types";

const Loader : FC<LoaderProps> = ({
  hideAvatar,
  styles,

}) =>  {
  return (
    <div className="siren-sdk-skeleton-container">
      <div className="siren-sdk-skeleton-grid">
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
