import React from "react";

import "../styles/showMore.css";
import type { LoadMoreProps } from "../types";

const ShowMoreButton = (props: LoadMoreProps) => {
  const { styles, customComponent, onClick, loadMoreLabel } = props;

  if (customComponent) {
    const CustomComponentWithClick = React.cloneElement(customComponent, {
      onClick: onClick,
      "data-testid": "load-more",
    });

    return CustomComponentWithClick;
  }

  return (
    <button
      className="siren-sdk-panel-load-more"
      onClick={onClick}
      data-testid="load-more"
      style={styles.loadMoreButton}
      aria-label="siren-load-more"
    >
      {loadMoreLabel || "Load More"}
    </button>
  );
};

export default ShowMoreButton;
