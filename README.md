<div>
    <img width="50px" style="float:left;padding-right:12px;" src="https://app.dev.sirenapp.io/assets/Siren-b2f89b52.svg" >
    <H1>Siren React Inbox</H1>
</div>

## Table of Contents

<!-- MarkdownTOC -->

- [Overview](#overview)
- [Quick Start Guide](#quick-start-guide)
  - [Install SDK](#1-install-sdk)
  - [Siren Provider](#2-siren-provider)
  - [Siren Inbox](#3-siren-inbox)
  - [useSiren](#4-usesiren)
  - [Error Codes](#5-error-codes)
  - [Complete Code Example](#complete-code-example)
- [I want to know more!](#i-want-to-know-more)

<!-- /MarkdownTOC -->

<a name="introduction"></a>

## Overview

The @siren/react-inbox sdk is a comprehensive and customizable React UI kit for displaying and managing notifications. This documentation provides comprehensive information on how to install, configure, and use the sdk effectively.

## Quick Start Guide

### 1. Install SDK

To install the @siren/react-inbox sdk, you can use npm or yarn.

#### Prerequisites

- React v16.8+

#### Steps

1. Under your app's root directory, install @siren/react-inbox.

```
npm install @siren/react-inbox
```

### 2. Siren Provider

The SirenProvider initializes the Siren sdk with the specified configuration, which contains important parameters like the user token and recipient ID. Wrap the SirenProvider around your App's root.

```js
import { SirenProvider } from "@siren/react-inbox";

const config = {
  userToken: "your_user_token",
  recipientId: "your_recipient_id",
};

<SirenProvider config={config}>{/* Your app components */}</SirenProvider>;
```

The config is a prop for the SirenProvider component is authenticate and initialize sdk.

```js
type config = {
  userToken: string,
  recipientId: string,
};
```

### 3. Siren Inbox

SirenInbox is a paginated list view with notification Icon for displaying notifications.

```js
import { SirenInbox } from '@siren/react-inbox';

<SirenInbox
    theme={customTheme}
    title="Notifications"
    windowViewOnly={false}
    hideHeader={false}
    darkMode={true}
    noOfNotificationsPerFetch={10}
    cardProps={hideAvatar: false}
    onError={(error) => console.log(error)}
/>

```

#### Siren Inbox Props

Given below are all props of inbox component.

Prop | Description | Type | Default value |
--- | --- | --- | --- |
theme | Theme object for custom styling |  Theme | {} |
title |  Title of the notification inbox |  string | "Notifications" |
hideHeader | Flag to hide or show the header |  boolean | false |
hideClearAll | Flag to hide or show the clear all button | boolean | false |
darkMode | Flag to enable dark mode |  boolean | false |
windowViewOnly | Flag to enable window view |  boolean | false |
notificationIcon | Option to use custom notification Icon |  JSX Element | null |
noOfNotificationsPerFetch | Number of notifications to fetch per page | number | 10 |
cardProps | Props for customizing the notification cards | CardProps | null |
customNotificationCard | Custom function for rendering notification cards | (notification)=> JSX Element | null |
onNotificationCardClick | Props for customizing the notification cards | (notification)=> void | ()=>null |
listEmptyComponent | Custom component to display when the notification list is empty | JSX Element | null |
customHeader | Custom header component | JSX Element | null |
customFooter | Custom footer component | JSX Element | null |
onError | Callback for handling errors | (error:  SirenErrorType)=> void | null |

#### Theming options

Customizable UI option for notification inbox, with dark and light theme options.

```js
type Theme = {
  dark: ThemeProps,
  light: ThemeProps,
};

type ThemeProps = {
  notificationIcon?: {
    size?: number,
  },
  colors?: {
    primaryColor?: string,
    textColor?: string,
    neutralColor?: string,
    borderColor?: string,
    highlightedCardColor?: string,
  },
  window?: {
    width?: DimensionValue,
    height?: DimensionValue,
    borderColor?: string,
    borderRadius?: number,
  },
  windowHeader?: {
    background?: string,
    height?: DimensionValue,
    titleColor?: string,
    titleFontWeight?: TextStyle["fontWeight"],
    titleSize?: number,
    headerActionColor?: string,
    closeIconSize?: number,
    titlePadding?: number,
    borderColor?: string,
  },
  windowContainer?: {
    background?: string,
    padding?: number,
  },
  notificationCard?: {
    height?: DimensionValue,
    padding?: number,
    borderWidth?: number,
    borderColor?: string,
    background?: string,
    hoverBackground?: string,
    avatarSize?: number,
    titleColor?: string,
    titleFontWeight?: TextStyle["fontWeight"],
    titleSize?: number,
    titlePadding?: number,
    descriptionColor?: string,
    descriptionSize?: number,
    descriptionPadding?: number,
    dateColor?: string,
    dateSize?: number,
  },
  loadMoreButton: {
    color?: string,
    fontSize?: number,
    background?: string,
  },
};
```

### 4. useSiren

This is a hook that provides utility functions for modifying notifications.

```js
import { useSiren } from "@siren/react-inbox";

function MyComponent() {
  const {
    markAsRead,
    deleteNotification,
    markAllNotificationsAsReadByDate,
    clearAllNotificationByDate,
    markNotificationsAsViewed,
  } = useSiren();

  function handleMarkAsRead(id) {
    markAsRead(id);
  }

  function handleDeleteNotification(id) {
    deleteNotification(id);
  }

  function handleMarkAllNotificationsAsReadByDate(untilDate) {
    markNotificationsAsReadByDate(untilDate);
  }

  function handleClearAllNotificationByDate(untilDate) {
    deleteNotificationsByDate(untilDate);
  }

  function handleMarkNotificationsAsViewed(untilDate) {
    markNotificationsAsViewed(untilDate);
  }

  return {
    /* Your component logic */
  };
}
```

#### useSiren functions

| Function name                 | Parameters type   | Description                                                 |
| ----------------------------- | ----------------- | ----------------------------------------------------------- |
| markNotificationsAsReadByDate | startDate: string | Set all notification read status to true until given date   |
| markAsRead                    | id: string        | Set read status of a specific notification to true          |
| deleteNotification            | id: string        | Delete a specific notification by id                        |
| deleteNotificationsByDate     | startDate: string | Delete all notifications until given date                   |
| markNotificationsAsViewed     | startDate: string | Set all notification viewed status to true until given date |

### 5. Error codes

Given below are all possible error codes thrown by sdk.

| Error code                | Message                               | Description                                            |
| ------------------------- | ------------------------------------- | ------------------------------------------------------ |
| INVALID_TOKEN             | Invalid token                         | Token passed in provider is invalid                    |
| INVALID_RECIPIENT_ID      | Invalid recipient id                  | Recipient id in provider is invalid                    |
| TOKEN_VERIFICATION_FAILED | This operation requires a valid token | Failed to verify token and initialize sdk              |
| INVALID_ERROR_FUNCTION    | Invalid error function                | Error function is invalid                              |
| GENERIC_API_ERROR         | Api error                             | Failed to call a internal api                          |
| SIREN_OBJECT_NOT_FOUND    | Siren Object Not found                | Was failed to initialize sdk, Siren object not created |
| MISSING_PARAMETER         | Missing Parameter                     | A parameter is missing in function call                |

### Complete Code Example

Here's a runnable code example that covers everything in this quick start guide.

```js

import React from 'react';
import {SafeAreaView} from 'react';
import {SirenInbox,SirenProvider} from '@siren/react-inbox';

function App(): React.JSX.Element {

  const config = {
    userToken: 'your_user_token',
    recipientId: 'your_recipient_id',
  };

  return (
    <SirenProvider config={config}>
      <MyContainer />
    </SirenProvider>
  );
}

export default App;

function MyContainer(): React.JSX.Element {

  return (
    <SafeAreaView style={{flex: 1}}>
      <SirenInbox
        title="Notifications"
        hideHeader={false}
        darkMode={false}
        cardProps={{hideAvatar: false}}
      />
    </SafeAreaView>
  );
}

export default MyContainer;

```

### I want to know more!

No worries, here are some links that you will find useful:

- **[Advanced React Guide](https://react.dev/learn/installation)**
