import type { NotificationDataType, SirenErrorType } from 'test_notification/dist/types';
import type { CSSProperties } from 'react';

export type SirenInboxProps = {
  theme?: Theme;
  title?: string;
  hideHeader?: boolean;
  darkMode?: boolean; 
  cardProps?: CardProps;
  realTimeNotificationEnabled?: boolean;
  notificationsPerPage?: number;
  listEmptyComponent?: JSX.Element;
  customFooter?: JSX.Element;
  customHeader?: JSX.Element;
  itemsPerPage: number;
  customNotificationCard?: (notification: NotificationDataType) => JSX.Element;
  onNotificationCardClick?: (notification: NotificationDataType) => void;
  onError?: (error: SirenErrorType) => void;
};

export type SirenNotificationIconProps = {
  theme?: Theme;
  badgeType?: BadgeType;
  realTimeUnViewedCountEnabled?: boolean;
  notificationIcon?: JSX.Element;
  onError?: (error: SirenErrorType) => void;
  darkMode?: boolean; 
};

export type SirenProviderConfigProps = {
  userToken: string;
  recipientId: string;
};

export type SirenProps = SirenInboxProps & SirenNotificationIconProps & {
  windowViewOnly?: boolean;
};

export type CardProps = {
  hideAvatar?: boolean;
  showMedia?: boolean;
};

export type NotificationCardProps = {
  notification: NotificationDataType;
  cardProps: SirenInboxProps['cardProps'];
  onNotificationCardClick: SirenInboxProps['onNotificationCardClick'];
  styles: SirenStyleProps;
  deleteNotificationById: (id: string) => void;
};

export type SirenNotificationButtonProps = {
  count: number;
  notificationIcon: SirenNotificationIconProps['notificationIcon'];
  onButtonClick: () => void;
  styles: SirenStyleProps;
  badgeType?: BadgeType;
};

export type NotificationPanelProps = SirenInboxProps & {
  styles: SirenStyleProps;
  isLoading: boolean;
  endReached: boolean;
  notifications: NotificationDataType[];
  deleteNotificationById: (id: string) => void;
  loadMore: () => void;
  handleClearAllNotification: () =>  void;
  renderListEmpty: () => React.ReactNode;
}

export type HeaderProps = {
  title: string;
  styles: SirenStyleProps;
  enableClearAll: boolean;
  handleClearAllNotification: () => void;
}

type BadgeType = 'none' | 'dot' | 'default';


export type Theme = {
  dark: ThemeProps;
  light: ThemeProps;
};


export type ThemeProps = {
  notificationIcon?: {
    size?: number,
  };
  colors?: {
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
    neutralColor?: string;
    borderColor?: string;
    primaryTextColor?: string;
    activeCardColor?: string;
  };
  unreadBadgeCount?: {
    background?: string;
    color?: string;
    borderRadius?: number;
    fontSize?: number;
    inset?: number;
    size?: number;
  };
  badgeStyle?: {
    size?: number;
    color?: string;
    textColor?: string;
    textSize?: number;
  };
  window?: WindowProps;
  windowHeader?: WindowHeaderProps;
  windowContainer?: WindowContainerProps;
  windowFooter?: WindowFooterProps;
  notificationCard?: NotificationCardThemeProps;
};


type WindowProps = {
  width?: DimensionValue;
  height?: DimensionValue;
  borderColor?: string;
  borderRadius?: number;
  shadowDepth?: number;
  shadowColor?: string;
};


type WindowHeaderProps = {
  background?: string;
  height?: DimensionValue;
  titleColor?: string;
  titleFontWeight?: TextStyle['fontWeight'];
  titleSize?: number;
  closeIconColor?: string;
  closeIconSize?: number;
};

type WindowFooterProps = {
  background?: string;
  height?: DimensionValue;
  textColor?: string;
  textFontWeight?: TextStyle['fontWeight'];
  textSize?: number;
  closeIconColor?: string;
  closeIconSize?: number;
};

type WindowContainerProps = {
  background?: string;
  padding?: number;
};

type DimensionValue = number | string;

type TextStyle = {
  fontWeight?: CSSProperties['fontWeight'];
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
  titleFontWeight?: TextStyle['fontWeight'];
  titleSize?: number;
  titlePadding?: number;
  descriptionColor?: string;
  descriptionSize?: number;
  descriptionPadding?: number;
  mediaWidth?: DimensionValue;
  mediaHeight?: DimensionValue;
  mediaObjectFit?: string;
  mediaRadius?: number;
  mediaPlaceholder?: string;
  dateColor?: string;
  dateSize?: number;
};


export type UnviewedType = {
  unviewedCount: number;
};

export type SirenStyleProps = {
  container: CSSProperties;
  contentContainer: CSSProperties;
  headerContainer: CSSProperties;
  headerButton: CSSProperties;
  headerTitle: CSSProperties;
  headerAction: CSSProperties;
  cardContainerButton: CSSProperties;
  cardContainer: CSSProperties;
  cardIconRound: CSSProperties;
  cardContentWrapper: CSSProperties;
  cardTitle: CSSProperties;
  cardDescription: CSSProperties;
  cardImageStyle: CSSProperties | object;
  dateStyle: CSSProperties;
  deleteButton: CSSProperties;
  footerContainer: CSSProperties;
  emptyContainer: CSSProperties;
  emptyText: CSSProperties;
  errorText: CSSProperties;
  errorButton: CSSProperties;
  errorButtonText: CSSProperties;
  notificationBadgeContainer: CSSProperties;
  notificationCount: CSSProperties;
  sirenWindowLoaderContainer: CSSProperties;
  avatarContainer: CSSProperties;
  avatarImageContainer: CSSProperties;
  cardMediaContainer: CSSProperties;
  notificationIconContainer: CSSProperties;
  notificationIcon: CSSProperties;
};