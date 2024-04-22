import type { RefObject } from "react";

import type {
  ActionResponse,
  NotificationDataType,
  NotificationsApiResponse,
} from "@sirenapp/js-sdk/dist/esm/types";

import {
  defaultBadgeStyle,
  eventTypes,
  LogLevel,
  ThemeMode,
} from "./constants";
import { default as DefaultStyle } from "./defaultStyles";
import { default as DefaultTheme } from "./defaultTheme";
import type {
  CustomStyle,
  DimensionValue,
  SirenStyleProps,
  ThemeProps,
} from "../types";

type FetchParams = {
  size: number;
  start?: string;
  end?: string;
  sort?: "createdAt" | "updatedAt";
};

export const generateElapsedTimeText = (timeString: string) => {
  const currentTime = new Date().getTime();
  const targetTime = new Date(timeString).getTime();
  const millisecondsDiff = currentTime - targetTime;

  const seconds = Math.floor(millisecondsDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (millisecondsDiff < 60000) return "Just now";
  else if (minutes < 60)
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  else if (hours < 24) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  else if (days < 30) return days === 1 ? "1 day ago" : `${days} days ago`;
  else if (months < 12)
    return months === 1 ? "1 month ago" : `${months} months ago`;
  else return years === 1 ? "1 year ago" : `${years} years ago`;
};

export const updateNotifications = (
  eventData: {
    id?: string;
    action: string;
    newNotifications?: NotificationDataType[];
    unreadCount?: number;
  },
  notifications: NotificationDataType[]
): NotificationDataType[] => {
  let updatedNotifications: NotificationDataType[] = [];

  switch (eventData.action) {
    case eventTypes.MARK_ITEM_AS_READ:
      updatedNotifications = notifications.map((item) =>
        item.id === eventData.id ? { ...item, isRead: true } : item
      );
      break;
    case eventTypes.MARK_ALL_AS_READ:
      updatedNotifications = notifications.map((item) => ({
        ...item,
        isRead: true,
      }));
      break;
    case eventTypes.DELETE_ITEM:
      updatedNotifications = notifications.filter(
        (item) => item.id !== eventData.id
      );
      break;
    case eventTypes.DELETE_ALL_ITEM:
      updatedNotifications = [];
      break;
    case eventTypes.NEW_NOTIFICATIONS: {
      const newNotifications: NotificationDataType[] =
        eventData?.newNotifications || [];

      updatedNotifications = [...newNotifications, ...notifications];
      break;
    }
    case eventTypes.RESET_NOTIFICATIONS: {
      updatedNotifications = [];
      break;
    }
    default:
      break;
  }

  return updatedNotifications;
};

export const renderAsImage = (icon: JSX.Element | string): boolean =>
  typeof icon === "undefined" || typeof icon === "string";

export const logger = {
  log: async (level: LogLevel.INFO | LogLevel.ERROR, message: string) => {
    const timestamp = new Date().toISOString();
    const levelString = LogLevel[level].toUpperCase();

    console.log(`[${timestamp}] [${levelString}] ${message}`);
  },
  error: function (error: string) {
    this.log(LogLevel.ERROR, error);
  },
  info: function (message: string) {
    this.log(LogLevel.INFO, message);
  },
};

export const applyTheme = (
  theme: ThemeProps = {},
  mode: ThemeMode = ThemeMode.DARK,
  customStyle: CustomStyle = {}
): SirenStyleProps => {
  const windowBorderRadius =
    customStyle.window?.borderRadius || DefaultStyle.window.borderRadius;

  return {
    container: {
      maxWidth: customStyle.window?.width || "100",
    },
    windowShadow: {
      boxShadow: `${
        theme.colors?.windowShadowColor || DefaultTheme[mode].window.shadowColor
      } 0px 8px 24px`,
    },
    windowTopBorder: {
      borderTopLeftRadius: windowBorderRadius,
      borderTopRightRadius: windowBorderRadius,
    },
    windowBottomBorder: {
      borderBottomLeftRadius: windowBorderRadius,
      borderBottomRightRadius: windowBorderRadius,
    },
    contentContainer: {
      backgroundColor:
        theme.windowContainer?.background ||
        theme.colors?.neutralColor ||
        DefaultTheme[mode].windowContainer.background,
      padding:
        customStyle.windowContainer?.padding ||
        DefaultStyle.windowContainer.padding,
      borderRadius: `0 0 ${
        customStyle.window?.borderRadius || DefaultStyle.window.borderRadius
      } ${
        customStyle.window?.borderRadius || DefaultStyle.window.borderRadius
      }`,
    },
    body: {
      overflow: "auto",
      height: customStyle.windowContainer?.contentHeight || "700px",
    },
    headerContainer: {
      alignItems: "center",
      display: "flex",
      margin: 0,
      lineHeight: "28px",
      backgroundColor:
        theme.windowHeader?.background ||
        theme.colors?.neutralColor ||
        DefaultTheme[mode].windowHeader.background,
      borderBottom: `${customStyle.windowHeader?.borderWidth || DefaultStyle.windowHeader.borderWidth} solid`,
      borderColor: theme.colors?.borderColor || DefaultTheme[mode].colors.borderColor,
      height:
        customStyle.windowHeader?.height || DefaultStyle.windowHeader.height,
    },
    headerTitle: {
      color:
        theme.windowHeader?.titleColor ||
        theme.colors?.textColor ||
        DefaultTheme[mode].windowHeader.titleColor,
      fontSize:
        customStyle.windowHeader?.titleSize ||
        DefaultStyle.windowHeader.titleSize,
      fontWeight:
        customStyle.windowHeader?.titleFontWeight ||
        DefaultStyle.windowHeader.titleFontWeight,
      paddingLeft:
        customStyle.windowHeader?.titlePadding ||
        DefaultStyle.windowHeader.titlePadding,
    },
    headerAction: {
      color:
        theme.windowHeader?.headerActionColor ||
        theme.colors?.textColor ||
        DefaultTheme[mode].windowHeader.headerActionColor,
    },
    defaultCardContainer: {
      backgroundColor:
        theme.notificationCard?.background ||
        DefaultTheme[mode].notificationCard.background,
      padding:
        customStyle.notificationCard?.padding ||
        DefaultStyle.notificationCard.padding,
      borderBottom: `${
        customStyle.notificationCard?.borderWidth ||
        DefaultStyle.notificationCard.borderWidth
      }px solid`,
      borderColor:
        theme.notificationCard?.borderColor ||
        theme.colors?.borderColor ||
        DefaultTheme[mode].notificationCard.borderColor,
    },
    cardIconRound: {
      width:
        customStyle.notificationCard?.avatarSize ||
        DefaultStyle.notificationCard.avatarSize,
      height:
        customStyle.notificationCard?.avatarSize ||
        DefaultStyle.notificationCard.avatarSize,
      borderRadius:
        (customStyle.notificationCard?.avatarSize ||
          DefaultStyle.notificationCard.avatarSize) / 2,
      overflow: "hidden",
      backgroundColor:
        theme.colors?.borderColor || DefaultTheme[mode].colors.borderColor,
    },
    cardTitle: {
      color:
        theme.notificationCard?.titleColor ||
        theme.colors?.textColor ||
        DefaultTheme[mode].notificationCard.titleColor,
      fontSize:
        customStyle.notificationCard?.titleSize ||
        DefaultStyle.notificationCard.titleSize,
      fontWeight:
        customStyle.notificationCard?.titleFontWeight ||
        DefaultStyle.notificationCard.titleFontWeight,
    },
    cardSubTitle: {
      color:
        theme.notificationCard?.subTitleColor ||
        theme.colors?.textColor ||
        DefaultTheme[mode].notificationCard.subTitleColor,
      fontSize:
        customStyle.notificationCard?.subTitleSize || DefaultStyle.notificationCard.subTitleSize,
      fontWeight:
        customStyle.notificationCard?.subTitleFontWeight ||
        DefaultStyle.notificationCard.subTitleFontWeight,
    },
    activeCardMarker: {
      backgroundColor:
        theme.colors?.highlightedCardColor ||
        DefaultTheme[mode].colors?.highlightedCardColor,
      border:
        theme.colors?.primaryColor || DefaultTheme[mode].colors?.primaryColor,
    },
    cardDescription: {
      color:
        theme.notificationCard?.descriptionColor ||
        theme.colors?.textColor ||
        DefaultTheme[mode].notificationCard.descriptionColor,
      fontSize:
        customStyle.notificationCard?.descriptionSize ||
        DefaultStyle.notificationCard.descriptionSize,
      fontWeight:
      customStyle.notificationCard?.descriptionFontWeight ||
      DefaultStyle.notificationCard.descriptionFontWeight,
    },
    dateStyle: {
      color: theme.colors?.dateColor || DefaultTheme[mode].colors.dateColor,
      fontSize:
        customStyle.notificationCard?.dateSize ||
        DefaultStyle.notificationCard.dateSize,
      lineHeight: "16px",
    },
    emptyText: {
      color: theme.colors?.textColor || DefaultTheme[mode].colors.textColor,
    },
    errorText: {
      color: theme.colors?.textColor || DefaultTheme[mode].colors.textColor,
    },
    clearIcon: {
      color: theme.colors?.clearAllIcon || DefaultTheme[mode].clearIcon.color,
      size: customStyle.clearAllIcon?.size || DefaultStyle.clearAllIcon.size,
    },
    timerIcon: {
      color: theme.colors?.timerIcon || DefaultTheme[mode].timerIcon.color,
      size: customStyle.timerIcon?.size || DefaultStyle.timerIcon.size,
    },
    notificationIcon: {
      size:
        customStyle?.notificationIcon?.size ||
        DefaultStyle?.notificationIcon?.size,
    },
    deleteIcon: {
      color: theme.colors?.deleteIcon || DefaultTheme[mode].colors.deleteIcon,
      size: customStyle.deleteIcon?.size || DefaultStyle.deleteIcon.size,
    },
    loadMoreButton: {
      color:
        theme?.loadMoreButton?.color ||
        theme.colors?.primaryColor ||
        DefaultTheme[mode]?.loadMoreButton?.color,
      backgroundColor:
        theme?.loadMoreButton?.background ||
        DefaultTheme[mode]?.loadMoreButton?.background,
      fontSize:
        customStyle?.loadMoreButton?.fontSize ||
        DefaultStyle?.loadMoreButton?.fontSize,
      fontWeight:
        customStyle.loadMoreButton?.fontWeight ||
        DefaultStyle.loadMoreButton.fontWeight,
    },
    loader: {
      backgroundImage: DefaultTheme[mode].loader.backgroundImage,
      borderColor:
        theme.colors?.primaryColor || DefaultTheme[mode].colors.primaryColor,
    },
    badgeStyle: {
      borderRadius: customStyle.badgeStyle?.size || defaultBadgeStyle.size,
      minWidth: customStyle.badgeStyle?.size || defaultBadgeStyle.size,
      height: customStyle.badgeStyle?.size || defaultBadgeStyle.size,
      backgroundColor: theme.badgeStyle?.color || defaultBadgeStyle.color,
      top:  customStyle?.badgeStyle?.top ? `${customStyle.badgeStyle.top}px` : defaultBadgeStyle.top,
      right:  customStyle?.badgeStyle?.right ? `${customStyle.badgeStyle.right}px` : defaultBadgeStyle.right,    
    },
    badgeTextStyle: {
      color: theme.badgeStyle?.textColor || defaultBadgeStyle.textColor,
      fontSize: customStyle.badgeStyle?.textSize || defaultBadgeStyle.textSize,
    },
    infiniteLoader: {
      border: `3px solid ${
        theme.colors?.infiniteLoader ||
        theme.colors?.primaryColor ||
        DefaultTheme[mode].colors.primaryColor
      }`,
    },
  };
};

export const isEmptyArray = (array: Array<NotificationDataType> = []) => {
  return array && array?.length === 0;
};
export const mergeArrays = (
  array1: Array<NotificationDataType> = [],
  array2: Array<NotificationDataType> = []
) => {
  if (array1 && array2) return [...array1, ...array2];
  if (array1) return array1;

  return array2;
};

export const isValidResponse = (
  response: NotificationsApiResponse | ActionResponse
): boolean => !!response?.data;

export const filterDataProperty = (
  response: NotificationsApiResponse
): NotificationDataType[] | null => {
  if (!response.data) return null;

  return response.data;
};

export const generateFilterParams = (
  data: NotificationDataType[],
  fromStart: boolean,
  itemsPerPage: number
): FetchParams => {
  let params: FetchParams = { size: itemsPerPage, sort: "createdAt" };

  if (data.length > 0)
    if (fromStart) params = { ...params, start: data[0].createdAt };
    else params = { ...params, end: data[data.length - 1].createdAt };

  return params;
};

export const calculateModalPosition = (
  iconRef: RefObject<HTMLDivElement>,
  window: Window,
  containerWidth: DimensionValue
) => {
  if (iconRef.current) {
    const iconRect = iconRef.current.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const spaceRight = screenWidth - iconRect.x;
    const spaceLeft = iconRect.x;
    let modalWidth = calculateModalWidth(containerWidth);

    const centerPosition =
      Math.min(spaceLeft, spaceRight) + Math.abs(spaceLeft - spaceRight) / 2;

    if (window.innerWidth <= modalWidth) modalWidth = window.innerWidth - 40;

    if (spaceRight > modalWidth) {
      return {
        left: `0px`,
      };
    } else if (spaceLeft > modalWidth) {
      const rightPosition = spaceRight < modalWidth ? "30px" : null;

      return {
        ...(rightPosition && { right: rightPosition }),
      };
    } else if (
      spaceLeft < modalWidth &&
      spaceRight < modalWidth &&
      spaceLeft > spaceRight
    ) {
      return { right: "30px" };
    } else {
      return { left: `-${centerPosition - 40}px` };
    }
  }
};

export const calculateModalWidth = (containerWidth: DimensionValue): number => {
  let modalWidth = 500;

  if (typeof containerWidth === "string")
    modalWidth = parseInt(containerWidth.slice(0, -2)) + 40;
  else if (typeof containerWidth === "number") modalWidth = containerWidth + 40;

  return modalWidth;
};

export const hexToRgba = (hex: string, alpha: number) => {
  const [r, g, b] = hex.match(/\w\w/g)?.map((x) => parseInt(x, 16)) ?? [];

  return `rgba(${r},${g},${b},${alpha})`;
};

export const debounce = <F extends (...args: unknown[]) => void>(
  func: F,
  delay: number
) => {
  let timerId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<F>): void => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
