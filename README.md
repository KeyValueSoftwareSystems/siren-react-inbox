
<H1>Siren React Inbox</H1>

## Overview

The `@siren/react-inbox` sdk is a comprehensive and customizable React UI kit for displaying and managing notifications. This documentation provides comprehensive information on how to install, configure, and use the sdk effectively.

### 1. Installation

You can install the react sdk from npm 

```bash
npm @siren/react-inbox
```
or from yarn

```bash
yarn @siren/react-inbox
```

#### Prerequisites

- React v16.8+

### 2. Configuration
#### 2.1 Initialization
Initialize the sdk with user token and recipient id. Wrap the provider around your App's root.

```js
import { SirenProvider } from "@siren/react-inbox";

const config = {
  userToken: "your_user_token",
  recipientId: "your_recipient_id",
};

<SirenProvider config={config}>{/* Your app components */}</SirenProvider>;
```

#### 2.2 Configure notification inbox
Once the provider is configured, next step is to configure the notification inbox

Inbox is a paginated list view for displaying notifications.

```js
import { SirenInbox } from '@siren/react-inbox';

<SirenInbox />

```

#### Props for the notification inbox

Below are optional props available for the inbox component:

Prop | Description | Type | Default value |
--- | --- | --- | --- |
theme | Object for custom themes |  Theme | {} |
title |  Title of the notification inbox |  string | "Notifications" |
loadMoreLabel | Text shown on the load more component | string | "Load More"
hideHeader | Toggle to hide or show the header section |  boolean | false |
hideClearAll | Toggle to hide or show the clear all button | boolean | false |
hideBadge | Toggle to hide or show the badge       |   boolean  |   false  |
darkMode | Toggle to enable dark mode |  boolean | false |
itemsPerFetch | Number of notifications fetch per api request (have a max cap of 50) | number | 20 |
windowViewOnly | Toggle to enable fit-to-screen window or modal view |  boolean | false |
notificationIcon | Option to use custom notification Icon |  JSX Element | null |
cardProps | Props for customizing the notification cards | { hideAvatar: boolean } | { hideAvatar: false } |
customNotificationCard | Function for rendering custom notification cards | (notification)=> JSX Element | null |
onNotificationCardClick | Custom click handler for notification cards | (notification)=> void | ()=>null |
listEmptyComponent | Custom component for empty notification list | JSX Element | null |
customHeader | Custom header component | JSX Element | null |
customFooter | Custom footer component | JSX Element | null |
customLoader | Custom loader component | JSX Element | null |
loadMoreComponent | Custom load more component | JSX Element | null |
customErrorWindow | Custom error window | JSX Element | null |
onError | Callback for handling errors | (error:  SirenErrorType)=> void | null |

### 3. Customization
#### 3.1 Themes

Here are the available theme options:

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
    dateColor?: string,
    deleteIcon?: string,
    timerIcon?: string,
    clearAllIcon?: string,
    infiniteLoader?: string,
    windowShadowColor?: string
  },
  badgeStyle?: {
    color?: string,
    textColor?: string,
  },
  window?: {
    borderColor?: string,
  },
  windowHeader?: {
    background?: string,
    titleColor?: string,
    headerActionColor?: string,
    borderColor?: string,
  },
  windowContainer?: {
    background?: string,
  },
  notificationCard?: {
    borderColor?: string,
    background?: string,
    titleColor?: string,
    descriptionColor?: string,
  },
  loadMoreButton: {
    color?: string,
    background?: string,
  }
};
```
#### 3.2 Style options

Here are the custom style options for the notification inbox

Please note that the badgeStyle, window shadow and border props are only applicable for modal view

```js
 type CustomStyle = {
  notificationIcon?: {
    size?: number,
  },
  window?: {
    width?: DimensionValue,
    borderRadius?: number,
  },
  windowHeader?: {
    height?: DimensionValue,
    titleFontWeight?:TextStyle["fontWeight"],
    titleSize?: number,
    titlePadding?: number,
  },
  windowContainer?: {
    padding?: number,
    contentHeight?: DimensionValue,
  },
  notificationCard?: {
    padding?: number,
    borderWidth?: number,
    avatarSize?: number,
    titleFontWeight?: TextStyle["fontWeight"],
    titleSize?: number,
    descriptionSize?: number,
    dateSize?: number,
  },
  loadMoreButton?: {
    fontSize?: number,
    fontWeight?: TextStyle["fontWeight"]
  },
  badgeStyle?: {
    size?: number,
    textSize?: number,
    top?: number;
    left?: number
  },
  deleteIcon?:{
    size?: number
  }
  dateIcon?:{
    size?: number
  }
  clearAllIcon?:{
    size?: number
  }
}
```

### 4. Hooks

useSiren is a hook that provides utility functions for modifying notifications.

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

| Functions                 | Parameters    | Type  | Description                                                 |
| ----------------------------- | ----------------- |---------| ----------------------------------------------------------- |
| markNotificationsAsReadByDate | startDate | ISO date string | Sets the read status of notifications to true until the given date.   |
| markAsRead                    | id  | string        | Set read status of a notification to true          |
| deleteNotification            | id  | string        | Delete a notification by id                        |
| deleteNotificationsByDate     | startDate | ISO date string| Delete all notifications until given date                   |
| markNotificationsAsViewed     | startDate | ISO date string | Sets the viewed status  of notifications to true until the given date |

### 5. Error codes

Given below are all possible error codes thrown by sdk.

| Error code                | Message                               | Description                                                       |
| ------------------------- | ------------------------------------- | ------------------------------------------------------------------|
| INVALID_TOKEN             | Invalid token                         | The token passed in the provider is invalid                       |
| INVALID_RECIPIENT_ID      | Invalid recipient id                  | The recipient id passed in the provider is invalid                |
| TOKEN_VERIFICATION_FAILED | This operation requires a valid token | Verification of the given tokens has failed                                 |
| GENERIC_API_ERROR         | Api error                             | Occurrence of an unexpected api error                             |
| OUTSIDE_SIREN_CONTEXT     | Trying to invoke function outside the siren context          | Attempting to invoke the functions outside the siren inbox context|
| MISSING_PARAMETER         | Missing Parameter                     | The required parameter is missing                |

### Example

Here's a basic example to help you get started.

```js

import React from 'react';
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

export function MyContainer(): React.JSX.Element {

  return (
    <div>
      <SirenInbox
        title="Notifications"
        hideHeader={false}
        darkMode={false}
        cardProps={{hideAvatar: false}}
      />
    </div>
  );
}