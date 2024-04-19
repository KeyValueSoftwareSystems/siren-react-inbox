import type { CSSProperties } from "react";

import type {
  NotificationDataType,
  SirenErrorType,
} from "@sirenapp/js-sdk/dist/esm/types";

export type SirenInboxProps = {
  theme?: Theme;
  customStyles?: CustomStyle,
  loadMoreLabel?: string,
  headerProps?: {
    title?: string;
    hideHeader?: boolean;
    hideClearAll?: boolean;
    customHeader?: JSX.Element;
  }
  hideBadge?: boolean;
  darkMode?: boolean;
  itemsPerFetch?: number;
  cardProps?: CardProps;
  listEmptyComponent?: JSX.Element;
  loadMoreComponent?:JSX.Element;
  customFooter?: JSX.Element;
  customLoader?: JSX.Element;
  customErrorWindow?: JSX.Element;
  notificationCard?: (notification: NotificationDataType) => JSX.Element;
  onCardClick?: (notification: NotificationDataType) => void;
  onError?: (error: SirenErrorType) => void;
};

export type SirenNotificationIconProps = {
  theme?: Theme;
  realTimeUnViewedCountEnabled?: boolean;
  notificationIcon?: JSX.Element;
  onError?: (error: SirenErrorType) => void;
  darkMode?: boolean;
};

export type SirenProviderConfigProps = {
  userToken: string;
  recipientId: string;
};

export type SirenProps = SirenInboxProps &
  SirenNotificationIconProps & {
    windowViewOnly?: boolean;
  };

export type CardProps = {
  hideAvatar?: boolean;
  showMedia?: boolean;
  hideDelete?: boolean;
  disableAutoMarkAsRead?: boolean;
  onAvatarClick?: (notification: NotificationDataType) => void;
};

export type NotificationCardProps = {
  notification: NotificationDataType;
  cardProps: SirenInboxProps["cardProps"];
  onCardClick: SirenInboxProps["onCardClick"];
  styles: SirenStyleProps;
  deleteById: (id: string) => void;
  darkMode: boolean;
};

export type SirenNotificationButtonProps = {
  styles: SirenStyleProps;
  badgeType: BadgeType;
  darkMode: boolean;
  hideBadge: boolean;
  notificationIcon?: JSX.Element;
  onIconClick: () => void;
};
export type SirenPanelProps = Pick<
  SirenInboxProps,
  | "hideBadge"
  | "cardProps"
  | "customFooter"
  | "notificationCard"
  | "onCardClick"
  | "headerProps"
  | "customLoader"
  | "loadMoreComponent"
  | "loadMoreLabel"
  | "customErrorWindow"
> & {
  styles: SirenStyleProps;
  onError?: (error: SirenErrorType) => void;
  listEmptyComponent?: JSX.Element;
  noOfNotificationsPerFetch: number;
  fullScreen: boolean;
  darkMode: boolean;
  modalWidth: DimensionValue;
};

export type HeaderProps = {
  title: string;
  styles: SirenStyleProps;
  enableClearAll: boolean;
  hideClearAll: boolean;
  fullScreen: boolean;
  handleClearAllNotification: () => void;
};

export type LoaderProps = {
  styles: SirenStyleProps;
  hideAvatar: boolean;
}

type BadgeType = "none" | "dot" | "default";

export type Theme = {
  dark: ThemeProps;
  light: ThemeProps;
};

export type ThemeProps = {
  colors?: {
    primaryColor?: string;
    textColor?: string;
    neutralColor?: string;
    borderColor?: string;
    highlightedCardColor?: string;
    dateColor?: string;
    deleteIcon?: string;
    timerIcon?: string;
    clearAllIcon?: string;
    infiniteLoader?: string;
    windowShadowColor?: string;
  };
  window?: WindowProps;
  windowHeader?: WindowHeaderProps;
  windowContainer?: WindowContainerProps;
  notificationCard?: NotificationCardThemeProps;
  loadMoreButton?: LoadMoreButtonProps;
  badgeStyle?: {
    color?: string;
    textColor?: string;
  };
};

export type CustomStyle = {
  notificationIcon?: {
    size?: number;
  };
  window?: {
    width?: DimensionValue;
    borderRadius?: number;
  };
  windowHeader?: {
    height?: DimensionValue;
    titleFontWeight?:TextStyle["fontWeight"];
    titleSize?: number;
    titlePadding?: number;
  };
  windowContainer?: {
    padding?: number;
    contentHeight?: DimensionValue;
  };
  notificationCard?: {
    padding?: number;
    borderWidth?: number;
    avatarSize?: number;
    titleFontWeight?: TextStyle["fontWeight"];
    titleSize?: number;
    descriptionSize?: number;
    dateSize?: number;
  };
  loadMoreButton?: {
    fontSize?: number;
    fontWeight?: TextStyle["fontWeight"]
  };
  badgeStyle?: {
    size?: number;
    textSize?: number;
    top?: number;
    left?: number;
  };
  deleteIcon?:{
    size?: number
  }
  timerIcon?:{
    size?: number
  }
  clearAllIcon?:{
    size?: number
  }
}

type WindowProps = {
  borderColor?: string;
};

type WindowHeaderProps = {
  background?: string;
  titleColor?: string;
  headerActionColor?: string;
  borderColor?: string;
};

type WindowContainerProps = {
  background?: string;
};

export type DimensionValue = number | string;

type TextStyle = {
  fontWeight?: CSSProperties["fontWeight"];
};

type NotificationCardThemeProps = {
  borderColor?: string;
  background?: string;
  titleColor?: string;
  descriptionColor?: string;
};
type LoadMoreButtonProps = {
  color?: string;
  background?: string;
};

export type UnviewedType = {
  unviewedCount: number;
};

export type SirenStyleProps = {
  container: CSSProperties;
  contentContainer: CSSProperties;
  headerContainer: CSSProperties;
  headerTitle: CSSProperties;
  headerAction: CSSProperties;
  defaultCardContainer: CSSProperties;
  cardIconRound: CSSProperties;
  cardTitle: CSSProperties;
  activeCardMarker: CSSProperties;
  cardDescription: CSSProperties;
  dateStyle: CSSProperties;
  emptyText: CSSProperties;
  errorText: CSSProperties;
  clearIcon: { size?: number; color?: string; };
  timerIcon: { size?: number; color?: string; };
  notificationIcon: { size?: number; };
  loadMoreButton: CSSProperties;
  loader: CSSProperties;
  body: CSSProperties;
  deleteIcon: { size?: number; color?: string; };
  badgeStyle: CSSProperties;
  badgeTextStyle: CSSProperties;
  windowTopBorder: CSSProperties;
  windowBottomBorder: CSSProperties;
  infiniteLoader: CSSProperties;
  windowShadow: CSSProperties;
};
export type LoadMoreProps = {
  loadMoreLabel?: string;
  styles: SirenStyleProps;
  customComponent?: JSX.Element;
  onClick: (event: React.MouseEvent)=> void;
}