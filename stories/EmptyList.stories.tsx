import React from 'react';

import EmptyList from '../src/components/EmptyList';
import { applyTheme } from '../src/utils/commonUtils';
import { ThemeMode } from '../src/utils/constants';


export default {
  title: 'EmptyList',
  component: EmptyList,
};

const Template = (args) => <EmptyList {...args} />;

export const DefaultEmptyList = Template.bind({});

DefaultEmptyList.args = {
  darkMode: false,
  styles: applyTheme({}, ThemeMode.LIGHT, {})
};