import React from "react";

import "../styles/showMore.css";
import type { LoadMoreProps } from "../types";

/**
 * ShowMoreButton component represents the button to load more items in the notification panel.
 *
 * @component
 * @example
 * <ShowMoreButton
 *   styles={customStyles}
 *   customComponent={<button>Load More</button>}
 *   onClick={() => console.log('Load more clicked')}
 *   loadMoreLabel="Load More"
 * />
 *
 * @param {LoadMoreProps} props - The properties passed to the ShowMoreButton component.
 * @param {Object} props.styles - The styles object to customize the appearance of the button.
 * @param {ReactElement} props.customComponent - Custom component to be rendered as the load more button.
 * @param {Function} props.onClick - Callback function executed when the button is clicked.
 * @param {string} props.loadMoreLabel - The label to be displayed on the button.
 * @returns {ReactElement} The rendered ShowMoreButton component.
 */

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
      {loadMoreLabel ?? "Load More"}
    </button>
  );
};

export default ShowMoreButton;
