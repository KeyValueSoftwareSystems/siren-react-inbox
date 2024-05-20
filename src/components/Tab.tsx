import type { FC} from 'react';
import React, { useEffect, useRef, useState } from 'react';

import "../styles/tab.css";
import type { TabProps } from '../types';

/**
 *
 * @component
 * @example
 * <Tab
 *   activeTab={0}
 *   tabs={[{ key: 'All', title: 'All' }, { key: 'Unread', title: 'Unread ' }]}
 * />
 *
 * @param {Object} props - The properties passed to the Tab component.
 * @param {number} props.activeTab - activeTab control the tab selection.
 * @param {Object} props.styles - Custom styles to apply to the header component.
 * @param {Array} props.tabs - List of tab items to be rendered.
 * @param {Function} props.onTabChange - Callback function to be called when a tab is clicked.
 */

const Tab: FC<TabProps> = ({ tabs, activeTab: defaultActiveIndex = 0, styles, onTabChange }) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const tabHeadersRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    if (onTabChange) onTabChange(index);
  };

  useEffect(() => {
    const activeTab = tabHeadersRef.current[activeIndex];

    if (activeTab && indicatorRef.current) {
      const { offsetLeft, offsetWidth } = activeTab;

      indicatorRef.current.style.left = `${offsetLeft}px`;
      indicatorRef.current.style.width = `${offsetWidth}px`;
    }
  }, [activeIndex]);

  return (
    <div className="siren-sdk-tab-container">
      <div className="siren-sdk-tab-header-container" style={styles?.tabsHeaderContainer}>
        {tabs.map((tab, index) => (
          <div
            key={tab.key}
            ref={(el) => (tabHeadersRef.current[index] = el)}
            className={`siren-sdk-tab-header ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
            style={{
              marginRight: index !== tabs.length - 1 ? '22px' : '0',
              ...(activeIndex === index ? styles?.activeTabStyle : styles?.inactiveTabStyle),
            }}
            role="button"
          >
            {tab.title}
          </div>
        ))}
        <div className="siren-sdk-active-tab-indicator" ref={indicatorRef} style={styles?.activeTabIndicator} />
      </div>
    </div>
  );
};

export default Tab;
