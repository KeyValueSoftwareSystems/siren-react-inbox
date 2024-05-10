import React from 'react';

import ShowMore from '../src/components/ShowMore';
import { applyTheme } from '../src/utils/commonUtils';
import { ThemeMode } from '../src/utils/constants';


export default {
  title: 'ShowMore',
  component: ShowMore,
};

const CustomComponent = 
    <div style={{
      color: 'purple',
      fontWeight: '600', 
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#D8BFD8',
      padding: '12px'}}>
      Custom Component
    </div> 

const Template = (args) => <ShowMore {...args} />;

export const DefaultShowMore = Template.bind({});

DefaultShowMore.args = {
  styles: applyTheme({}, ThemeMode.LIGHT, {}),
  onClick: () => null
};

export const WithCustomLabel = Template.bind({});

WithCustomLabel.args = {
  styles: applyTheme({}, ThemeMode.LIGHT, {}),
  loadMoreLabel: 'Custom label'
};

export const WithCustomComponent = Template.bind({});

WithCustomComponent.args = {
  styles: applyTheme({}, ThemeMode.LIGHT, {}),
  onClick: () => null,
  customComponent: CustomComponent
};
