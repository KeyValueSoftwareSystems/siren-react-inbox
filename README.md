# Siren React Inbox

## Overview

The `@sirenapp/react-inbox` sdk is a comprehensive and customizable React UI kit for displaying and managing notifications. This documentation provides comprehensive information on how to install, configure, and use the sdk effectively.

## 1. Installation

You can install the react sdk from npm

```bash
npm install @sirenapp/react-inbox
```

or from yarn

```bash
yarn add @sirenapp/react-inbox
```

#### Prerequisites

- React v16.8+

## 2. Configuration

### 2.1 Initialization

Initialize the sdk with user token and recipient id. Wrap the provider around your App's root.

```js
import { SirenProvider } from "@sirenapp/react-inbox";

const config = {
  userToken: "your_user_token",
  recipientId: "your_recipient_id",
};

<SirenProvider config={config}>{/* Your app components */}</SirenProvider>;
```

### 2.2 Configure notification inbox

Once the provider is configured, next step is to configure the notification inbox

Inbox is a paginated list view for displaying notifications.

```js
import { SirenInbox } from "@sirenapp/react-inbox";

<SirenInbox />
```

#### Props for the notification inbox

Below are optional props available for the inbox component:

Prop | Description | Type | Default value |
--- | --- | --- | --- |
theme | Object for custom themes |  Theme | {} |
customStyles | Object for custom styling | CustomStyle | {} |
loadMoreLabel | Text shown on the load more component | string | "Load More" |
hideBadge | Toggle to hide or show the badge       |   boolean  |   false  |
darkMode | Toggle to enable dark mode |  boolean | false |
itemsPerFetch | Number of notifications fetch per api request (have a max cap of 50) | number | 20 |
windowViewOnly | Toggle to enable fit-to-screen window or modal view |  boolean | false |
notificationIcon | Option to use custom notification Icon |  JSX Element | null |
headerProps | Props for customizing the header.<br> title - Title of the notification inbox<br> hideHeader - Toggle to hide or show the header section.<br> hideClearAll - Toggle to hide or show the clear all button.<br> customHeader - Custom header component. | HeaderProps| { title: 'Notifications', <br>hideHeader: false,<br> hideClearAll: false, <br>customHeader: null } |
cardProps | Props for customizing the notification cards. <br>hideDelete - Toggle to hide or show delete icon<br> hideAvatar - Toggle to hide or show the avatar.<br> hideMediaThumbnail - Toggle to hide or show thumbnail image<br> disableAutoMarkAsRead - Toggle to disable or enable the markAsReadById functionality on card click.<br> deleteIcon - Custom delete icon <br> onAvatarClick - Custom click handler for avatar <br> onMediaThumbnailClick - Custom click handler for media thumbnail | CardProps | { hideDelete: false,<br> hideAvatar: false,<br> disableAutoMarkAsRead: false, <br> hideMediaThumbnail: false, <br>deleteIcon: null, <br> onAvatarClick: ()=>null,<br> onMediaThumbnailClick: () => null } |
customCard | Function for rendering custom notification cards | (notification)=> JSX Element | null |
onCardClick | Custom click handler for notification cards | (notification)=> void | ()=>null |
listEmptyComponent | Custom component for empty notification list | JSX Element | null |
customFooter | Custom footer component | JSX Element | null |
customLoader | Custom loader component | JSX Element | null |
loadMoreComponent | Custom load more component | JSX Element | null |
customErrorWindow | Custom error window | JSX Element | null |
onError | Callback for handling errors | (error:  SirenErrorType)=> void | null |

## 3. Customization

### 3.1 Themes

Here are the available theme options:

```js
type Theme = {
  dark: ThemeProps,
  light: ThemeProps,
};

type ThemeProps = {
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
    windowShadowColor?: string,
  },
  badgeStyle?: {
    color?: string,
    textColor?: string,
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
  customCard?: {
    borderColor?: string,
    background?: string,
    titleColor?: string,
    subtitleColor?: string,
    descriptionColor?: string,
  },
  loadMoreButton?: {
    color?: string,
    background?: string,
  },
};
```

### 3.2 Style options

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
    borderWidth?: string;
  },
  windowContainer?: {
    padding?: number,
    contentHeight?: DimensionValue,
  },
  customCard?: {
    padding?: number,
    borderWidth?: number,
    avatarSize?: number,
    titleFontWeight?: TextStyle["fontWeight"],
    titleSize?: number,
    subtitleFontWeight?: TextStyle['fontWeight'],
    subtitleSize?: number,
    descriptionFontWeight?: TextStyle['fontWeight'],
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
    right?: number
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

#### CardProps

```js
    type CardProps = {
      hideDelete?: boolean,
      hideAvatar?: boolean,
      hideMediaThumbnail?: boolean,
      disableAutoMarkAsRead?: boolean,
      deleteIcon?: JSX.Element,
      onAvatarClick?: () => void,
      onMediaThumbnailClick?: () => void,
    };
```

#### InboxHeaderProps

```js
    type InboxHeaderProps = {
      title?: string,
      hideHeader?: boolean,
      hideClearAll?: boolean,
      customHeader?: JSX.Element | null,
    };
```

## 4. Hooks

`useSiren` is a hook that provides utility functions for modifying notifications.

```js
import { useSiren } from "@sirenapp/react-inbox";

function MyComponent() {
  const {
    markAsReadById,
  } = useSiren();

  function handleMarkAsRead(id) {
    markAsReadById(id);
  }

  return {
    /* Your component logic */
  };
}
```

### useSiren functions

Functions | Parameters | Type | Description |
----------|------------|-------|------------|
markAsReadByDate | startDate | ISO date string | Sets the read status of notifications to true until the given date |
markAsReadById | id | string | Set read status of a notification to true          |
deleteById |  id | string  | Delete a notification by id |
deleteByDate | startDate | ISO date string | Delete all notifications until given date |
markAllAsViewed | startDate | ISO date string |Sets the viewed status of notifications to true until the given date |


## Example

Here's a basic example to help you get started

```js
import React from "react";
import { SirenInbox, SirenProvider } from "@sirenapp/react-inbox";

function App(): React.JSX.Element {
  const config = {
    userToken: "your_user_token",
    recipientId: "your_recipient_id",
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
        headerProps={
          title: "Notifications",
          hideHeader: false
        }
        darkMode={false}
        cardProps={{
          hideDelete: false,
          hideAvatar: false,
          disableAutoMarkAsRead: false,
          deleteIcon: null,
          onAvatarClick: () => null,
        }}
      />
    </div>
  );
}
```
