import React from "react";

import "../styles/loader.css";
import type { SirenStyleProps } from "../types";

const Loader = ({styles}: {styles: SirenStyleProps}) => {
  return (
    <div className="siren-sdk-skeleton-container">
      <div className="siren-sdk-skeleton-grid">
        <div className="siren-sdk-skeleton-avatar siren-sdk-skeleton" style={styles.loader} />
        <div className="siren-sdk-skeleton-head siren-sdk-skeleton" style={styles.loader} />
        <div className="siren-sdk-skeleton-subtitle siren-sdk-skeleton" style={styles.loader} />
        <div className="siren-sdk-skeleton-body siren-sdk-skeleton" style={styles.loader}/>
        <div className="siren-sdk-skeleton-icon  siren-sdk-skeleton" style={styles.loader}/>
        <div className="siren-sdk-skeleton-footer  siren-sdk-skeleton" style={styles.loader} />
      </div>
    </div>
  );
};

export default Loader;
