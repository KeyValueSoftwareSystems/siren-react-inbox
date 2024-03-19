import React from "react";

import "../styles/showMore.css";
import type { LoadMoreProps } from "../types";

const ShowMoreButton = (props: LoadMoreProps) => {
  const {styles, customComponent, onClick, loadMoreLabel } = props;

  if(customComponent) 
    return (
      <button
        className="siren-sdk-panel-load-more-custom"
        onClick={onClick}
        data-testid="load-more"
      >
        {customComponent}
      </button>
    )

  return (
    <button
      className="siren-sdk-panel-load-more"
      onClick={onClick}
      data-testid="load-more"
      style={styles.loadMoreButton}
    >
      {loadMoreLabel || 'Load More'}
    </button>
  );
};

export default ShowMoreButton;
