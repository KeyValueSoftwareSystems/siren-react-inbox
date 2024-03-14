import React from "react";

import "../styles/loader.css";

const Loader = () => {
  return (
    <div className="siren-sdk-skeleton-container">
      <div className="siren-sdk-skeleton-grid">
        <div className="siren-sdk-skeleton-avatar siren-sdk-skeleton" />
        <div className="siren-sdk-skeleton-head siren-sdk-skeleton" />
        <div className="siren-sdk-skeleton-subtitle siren-sdk-skeleton" />
        <div className="siren-sdk-skeleton-body siren-sdk-skeleton" />
        <div className="siren-sdk-skeleton-icon  siren-sdk-skeleton" />
        <div className="siren-sdk-skeleton-footer  siren-sdk-skeleton" />
      </div>
    </div>
  );
};

export default Loader;
