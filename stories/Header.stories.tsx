import React from 'react';

import Header from '../src/components/Header';
import { applyTheme } from '../src/utils/commonUtils';
import { ThemeMode } from '../src/utils/constants';


export default {
  title: 'Header',
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const HeaderWithTitle = Template.bind({});

HeaderWithTitle.args = {
  styles: applyTheme({}, ThemeMode.LIGHT, {}),
  title: 'Sample Header',
  enableClearAll: true,
  handleClearAllNotification: () => null
};

export const HeaderWithoutClearAll = Template.bind({});

HeaderWithoutClearAll.args = {
  styles: applyTheme({}, ThemeMode.LIGHT, {}),
  title: 'Title',
  hideClearAll: true,
};


export const HeaderWithDisabledClearAll = Template.bind({});

HeaderWithDisabledClearAll.args = {
  styles: applyTheme({}, ThemeMode.LIGHT, {}),
  title: 'Title',
  enableClearAll: false,
};
