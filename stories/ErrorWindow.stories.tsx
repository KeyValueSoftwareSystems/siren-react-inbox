import React from 'react';

import ErrorWindow from '../src/components/ErrorWindow';
import { applyTheme } from '../src/utils/commonUtils';
import { ThemeMode } from '../src/utils/constants';


export default {
  title: 'ErrorWindow',
  component: ErrorWindow,
};

const Template = (args) => <ErrorWindow {...args} />;

export const DefaultErrorWindow = Template.bind({});

DefaultErrorWindow.args = {
  darkMode: false,
  styles: applyTheme({}, ThemeMode.LIGHT, {})
};

export const WithCustomErrorMessage = Template.bind({});

WithCustomErrorMessage.args = {
  darkMode: false,
  error: 'Internal server error',
  styles: applyTheme({}, ThemeMode.LIGHT, {})
};