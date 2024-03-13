import React from 'react';

import { LIST_EMPTY_TEXT } from '../utils/constants';
import type { SirenStyleProps } from '../types';

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
const EmptyList = (props: { styles: SirenStyleProps }) => {
  const { styles } = props;

  return (
    <div style={styles.emptyContainer}>
      <p style={styles.emptyText}>{LIST_EMPTY_TEXT}</p>
    </div>
  );
};

export default EmptyList;