import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Tab from '../../src/components/Tab';
import type { TabComponentProps } from '../../src/types';
import { applyTheme } from '../../src/utils/commonUtils';
import { Tabs } from '../../src/utils/constants';


// Mock CSS
jest.mock('../../src/styles/tab.css', () => ({}));

const tabs = [
  { key: Tabs.ALL, title: 'All' },
  { key: Tabs.UNREAD, title: 'Unread' },
];

const styles = applyTheme();

const defaultProps: TabComponentProps = {
  tabs,
  activeTab: 0,
  styles,
  onTabChange: jest.fn(),
};

describe('Tab Component', () => {
  test('renders correctly and matches snapshot', () => {
    const { asFragment } = render(<Tab {...defaultProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders the correct number of tabs', () => {
    const { getAllByRole } = render(<Tab {...defaultProps} />);
    const tabElements = getAllByRole('button');

    expect(tabElements.length).toBe(tabs.length);
  });

  test('calls onTabChange when a tab is clicked', () => {
    const { getAllByRole } = render(<Tab {...defaultProps} />);
    const tabElements = getAllByRole('button');
    
    fireEvent.click(tabElements[1]);
    expect(defaultProps.onTabChange).toHaveBeenCalledWith(1);
  });

});
