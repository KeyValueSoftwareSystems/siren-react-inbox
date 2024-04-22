import React from 'react';

import SirenNotificationIcon from '../src/components/SirenNotificationIcon';
import { applyTheme } from '../src/utils/commonUtils';
import { ThemeMode } from '../src/utils/constants';


export default {
  title: 'SirenNotificationIcon',
  component: SirenNotificationIcon,
};

const Template = (args) => <SirenNotificationIcon {...args} />;

export const DefaultSirenNotificationIcon = Template.bind({});

DefaultSirenNotificationIcon.args = {
  darkMode: false,
  styles: applyTheme({}, ThemeMode.LIGHT, {})
};