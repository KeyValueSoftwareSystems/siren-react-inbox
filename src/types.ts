import type { CSSProperties } from "react";

import type {
  NotificationDataType,
  SirenErrorType,
} from "test_notification/dist/esm/types";

export type SirenInboxProps = {
  theme?: Theme;
  title?: string;
  hideHeader?: boolean;
  hideClearAll?: boolean;
  darkMode?: boolean;
  cardProps?: CardProps;
  listEmptyComponent?: JSX.Element;
  customFooter?: JSX.Element;
  customHeader?: JSX.Element;
  noOfNotificationsPerFetch?: number;
  customNotificationCard?: (notification: NotificationDataType) => JSX.Element;
  onNotificationCardClick?: (notification: NotificationDataType) => void;
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
};

export type NotificationCardProps = {
  notification: NotificationDataType;
  cardProps: SirenInboxProps["cardProps"];
  onNotificationCardClick: SirenInboxProps["onNotificationCardClick"];
  styles: SirenStyleProps;
  deleteNotificationById: (id: string) => void;
};

export type SirenNotificationButtonProps = {
  styles: SirenStyleProps;
  badgeType: BadgeType;
  notificationIcon?: JSX.Element;
  onIconClick: () => void;
};
export type NotificationPanelProps = Pick<
  SirenInboxProps,
  | "hideHeader"
  | "cardProps"
  | "customFooter"
  | "customHeader"
  | "customNotificationCard"
  | "onNotificationCardClick"
  | "hideClearAll"
> & {
  styles: SirenStyleProps;
  onError?: (error: SirenErrorType) => void;
  listEmptyComponent?: JSX.Element;
  title: string;
  noOfNotificationsPerFetch: number;
  fullScreen: boolean;
};

export type HeaderProps = {
  title: string;
  styles: SirenStyleProps;
  enableClearAll: boolean;
  hideClearAll: boolean;
  handleClearAllNotification: () => void;
};

type BadgeType = "none" | "dot" | "default";

export type Theme = {
  dark: ThemeProps;
  light: ThemeProps;
};

export type ThemeProps = {
  notificationIcon?: {
    size?: number;
  };
  colors?: {
    primaryColor?: string;
    textColor?: string;
    neutralColor?: string;
    borderColor?: string;
    highlightedCardColor?: string;
  };
  window?: WindowProps;
  windowHeader?: WindowHeaderProps;
  windowContainer?: WindowContainerProps;
  notificationCard?: NotificationCardThemeProps;
  loadMoreButton?: LoadMoreButtonProps;
};

type WindowProps = {
  width?: DimensionValue;
  height?: DimensionValue;
  borderColor?: string;
  borderRadius?: number;
};

type WindowHeaderProps = {
  background?: string;
  height?: DimensionValue;
  titleColor?: string;
  titleFontWeight?: TextStyle['fontWeight'];
  titleSize?: number;
  headerActionColor?: string;
  closeIconSize?: number;
  titlePadding?: number;
  borderColor?: string;
};

type WindowContainerProps = {
  background?: string;
  padding?: number;
};

export type DimensionValue = number | string;

type TextStyle = {
  fontWeight?: CSSProperties["fontWeight"];
};

type NotificationCardThemeProps = {
  height?: DimensionValue;
  padding?: number;
  borderWidth?: number;
  borderColor?: string;
  background?: string;
  hoverBackground?: string;
  avatarSize?: number;
  titleColor?: string;
  titleFontWeight?: TextStyle["fontWeight"];
  titleSize?: number;
  titlePadding?: number;
  descriptionColor?: string;
  descriptionSize?: number;
  descriptionPadding?: number;
  dateColor?: string;
  dateSize?: number;
};
type LoadMoreButtonProps = {
  color?: string;
  fontSize?: number;
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
  errorButton: CSSProperties;
  errorButtonText: CSSProperties;
  clearIcon: CSSProperties;
  timerIcon: CSSProperties;
  closeIcon: CSSProperties;
  notificationIcon: CSSProperties;
  loadMoreButton: CSSProperties;
  loader: CSSProperties;
};
