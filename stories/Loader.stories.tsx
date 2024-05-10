import React from 'react';

import Loader from '../src/components/Loader';
import { applyTheme } from '../src/utils/commonUtils';
import { ThemeMode } from '../src/utils/constants';


export default {
  title: 'Loader',
  component: Loader,
};

const Template = (args) => <Loader {...args} />;

export const DefaultLoader = Template.bind({});

DefaultLoader.args = {
  styles: applyTheme({}, ThemeMode.LIGHT, {})
};

export const WithoutAvatarLoader = Template.bind({});

WithoutAvatarLoader.args = {
  hideAvatar:  true,
  styles: applyTheme({}, ThemeMode.LIGHT, {})
};