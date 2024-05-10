import React from 'react';

import Card from '../src/components/Card';
import { applyTheme } from '../src/utils/commonUtils';
import { ThemeMode } from '../src/utils/constants';


export default {
  title: 'Card',
  component: Card,
};

const dummyNotification = {
  id: '1',
  createdAt: '2024-04-16T08:16:04.852+00:00',
  message: {
    channel: 'sampleChannel',
    header: 'We have few candles to blow out',
    subHeader: 'Its an exciting news',
    body: 'Ready for a challenge? Join our fitness challenge and win exciting prizes!',
    actionUrl: 'sample action',
    avatar: {
      imageUrl: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
      actionUrl: 'sample action'
    },
    additionalData: 'data'
  },
  requestId: 'string',
  isRead: true
}

const Template = (args) => <Card {...args} />;

export const DefaultCard = Template.bind({});

DefaultCard.args = {
  notification: dummyNotification,
  darkMode: false,
  styles: applyTheme({}, ThemeMode.LIGHT, {})
};

export const CardWithoutAvatar = Template.bind({});

CardWithoutAvatar.args = {
  notification: dummyNotification,
  darkMode: false,
  cardProps: {
    hideAvatar: true,
  },
  styles: applyTheme({}, ThemeMode.LIGHT, {})
};

export const CardWithoutDelete = Template.bind({});

CardWithoutDelete.args = {
  notification: dummyNotification,
  darkMode: false,
  cardProps: {
    hideDelete: true,
  },
  styles: applyTheme({}, ThemeMode.LIGHT, {})
};