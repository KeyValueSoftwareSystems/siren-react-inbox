import React from 'react';

import emptyIcon from "../assets/emptyIcon.svg";
import type { SirenStyleProps } from '../types';
import { LIST_EMPTY_SUB_TEXT, LIST_EMPTY_TEXT } from '../utils/constants';
import '../styles/emptyList.css';



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
    <div className='siren-sdk-empty-container'>
      <img
        src={emptyIcon}
        alt="empty-icon"
        className="siren-sdk-empty-icon"
      />
      <p style={styles.emptyText} className='siren-sdk-empty-text'>{LIST_EMPTY_TEXT}</p>
      <p className='siren-sdk-empty-sub-text'>{LIST_EMPTY_SUB_TEXT}</p>
    </div>
  );
};

export default EmptyList;
