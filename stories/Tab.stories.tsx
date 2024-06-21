import React from 'react';

import Tab from '../src/components/Tab';
import { applyTheme } from '../src/utils/commonUtils';
import { Tabs, ThemeMode } from '../src/utils/constants';


export default {
  title: 'Tab',
  component: Tab,
  argTypes: {
    activeTab: { control: 'number' },
    styles: { control: 'object' },
    onTabChange: { action: 'tabChanged' },
  },
};

const Template = (args) => <Tab {...args} />;

export const DefaultTab = Template.bind({});
DefaultTab.args = {
  activeTab: 0,
  tabs: [
    { key: Tabs.ALL, title: 'All' },
    { key: Tabs.UNREAD, title: 'Unread' },
  ],
  styles: applyTheme({}, ThemeMode.LIGHT, {})
};

export const CustomStyledTab = Template.bind({});
CustomStyledTab.args = {
  activeTab: 1,
  tabs: [
    { key: 'tab1', title: 'Tab 1' },
    { key: 'tab2', title: 'Tab 2' },
    { key: 'tab3', title: 'Tab 3' },
  ],
  styles: {
    tabsHeaderContainer: { display: 'flex', backgroundColor: 'lightgrey' },
    activeTabStyle: { fontWeight: 'bold', color: 'green' },
    inactiveTabStyle: { fontWeight: 'normal', color: 'black' },
    activeTabIndicator: { backgroundColor: 'green', height:
    '3px' },
  },
};
