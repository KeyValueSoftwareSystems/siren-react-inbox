import type { RefObject } from "react";

import type {
  ActionResponse,
  NotificationDataType,
  NotificationsApiResponse,
} from "test_notification/dist/esm/types";

import { eventTypes, LogLevel } from "./constants";
import { ThemeMode } from "./constants";
import type { DimensionValue, SirenStyleProps, ThemeProps } from "../types";

import { DefaultTheme } from ".";

type FetchParams = {
  size: number;
  start?: string;
  end?: string;
  sort?: "createdAt" | "updatedAt";
}


export const generateElapsedTimeText = (timeString: string) => {
  const currentTime = Date.now();
  const targetTime = new Date(timeString).getTime();
  const timeDiff = currentTime - targetTime;

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (timeDiff < 60000) return "Just now";
  else if (minutes < 60)
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  else if (hours < 24) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  else if (days < 365) return days === 1 ? "1 day ago" : `${days} days ago`;
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
        isRead: true
      }));
      break;
    case eventTypes.DELETE_ITEM:
      updatedNotifications = notifications.filter((item) => item.id != eventData.id);
      break;
    case eventTypes.DELETE_ALL_ITEM:
      updatedNotifications = [];
      break;
    case eventTypes.NEW_NOTIFICATIONS: {
      const newNotifications: NotificationDataType[] = eventData?.newNotifications || [];

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
  mode: ThemeMode = ThemeMode.DARK
): SirenStyleProps => ({
  container: {
    width: theme.window?.width || DefaultTheme[mode].window.width,
    minHeight: theme.window?.height || DefaultTheme[mode].window.height,
    borderColor:
      theme.window?.borderColor || DefaultTheme[mode].window.borderColor,
    borderRadius:
      theme.window?.borderRadius || DefaultTheme[mode].window.borderRadius,
    maxWidth: theme.window?.width,
    flex: 1,
  },
  contentContainer: {
    backgroundColor:
      theme.windowContainer?.background ||
      theme.colors?.primaryColor ||
      DefaultTheme[mode].windowContainer.background,
    padding:
      theme.windowContainer?.padding ||
      DefaultTheme[mode].windowContainer.padding,
    overflow: "auto",
    maxHeight: "700px",
    minHeight: "700px",
    borderRadius: `0 0 ${theme.window?.borderRadius || DefaultTheme[mode].window.borderRadius} ${theme.window?.borderRadius || DefaultTheme[mode].window.borderRadius}`
  },
  headerContainer: {
    backgroundColor:
      theme.windowHeader?.background ||
      theme.colors?.neutralColor ||
      DefaultTheme[mode].windowHeader.background,

    height:
      theme.windowHeader?.height || DefaultTheme[mode].windowHeader.height,
  },
  headerTitle: {
    alignItems: "center",
    display: "flex",
    margin: 0,
    lineHeight: '28px',
    color:
      theme.windowHeader?.titleColor ||
      theme.colors?.textColor ||
      DefaultTheme[mode].windowHeader.titleColor,
    fontSize:
      theme.windowHeader?.titleSize ||
      DefaultTheme[mode].windowHeader.titleSize,
    fontWeight:
      theme.windowHeader?.titleFontWeight ||
      DefaultTheme[mode].windowHeader.titleFontWeight,
    paddingLeft: theme.windowHeader?.titlePadding || DefaultTheme[mode].windowHeader.titlePadding
  },
  headerAction: {
    color:
    theme.windowHeader?.headerActionColor ||
    theme.colors?.textColor ||
    DefaultTheme[mode].windowHeader.headerActionColor
  },
  defaultCardContainer: {
    display: 'flex',
    backgroundColor:
      theme.notificationCard?.background ||
      theme.colors?.primaryColor ||
      DefaultTheme[mode].notificationCard.background,
    padding:
      theme.notificationCard?.padding ||
      DefaultTheme[mode].notificationCard.padding,
    flexDirection: "row",
    borderBottom: `${
      theme.notificationCard?.borderWidth ||
      DefaultTheme[mode].notificationCard.borderWidth
    }px solid`,
    borderColor:
      theme.notificationCard?.borderColor ||
      theme.colors?.borderColor ||
      DefaultTheme[mode].notificationCard.borderColor,
    justifyContent: 'space-between'
  },
  cardIconRound: {
    width:
      theme.notificationCard?.avatarSize ||
      DefaultTheme[mode].notificationCard.avatarSize,
    height:
      theme.notificationCard?.avatarSize ||
      DefaultTheme[mode].notificationCard.avatarSize,
    borderRadius:
      (theme.notificationCard?.avatarSize ||
        DefaultTheme[mode].notificationCard.avatarSize) / 2,
    overflow: "hidden",
    backgroundColor:
      theme.colors?.borderColor || DefaultTheme[mode].colors.borderColor,
  },
  cardTitle: {
    margin: 0,
    lineHeight: '20px',
    color:
      theme.notificationCard?.titleColor ||
      theme.colors?.textColor ||
      DefaultTheme[mode].notificationCard.titleColor,
    fontSize:
      theme.notificationCard?.titleSize ||
      DefaultTheme[mode].notificationCard.titleSize,
    fontWeight:
      theme.notificationCard?.titleFontWeight ||
      DefaultTheme[mode].notificationCard.titleFontWeight,
    marginBottom: 8,
    paddingRight:
      theme.notificationCard?.padding ||
      DefaultTheme[mode].notificationCard.titlePadding,
    paddingLeft:
      theme.notificationCard?.padding ||
      DefaultTheme[mode].notificationCard.titlePadding,
  },
  activeCardMarker: {
    backgroundColor: theme.colors?.primaryColor || DefaultTheme[mode].colors?.primaryColor
  },
  cardDescription: {
    margin: 0,
    lineHeight: '20px',
    color:
      theme.notificationCard?.descriptionColor ||
      theme.colors?.textColor ||
      DefaultTheme[mode].notificationCard.descriptionColor,
    fontSize:
      theme.notificationCard?.descriptionSize ||
      DefaultTheme[mode].notificationCard.descriptionSize,
    fontWeight: "400",
    marginBottom: 8,
    paddingRight:
      theme.notificationCard?.descriptionPadding ||
      DefaultTheme[mode].notificationCard.descriptionPadding,
    paddingLeft:
      theme.notificationCard?.descriptionPadding ||
      DefaultTheme[mode].notificationCard.descriptionPadding,
  },
  dateStyle: {
    color:
      theme.notificationCard?.dateColor ||
      theme.colors?.borderColor ||
      DefaultTheme[mode].notificationCard.dateColor,
    fontSize:
      theme.notificationCard?.dateSize ||
      DefaultTheme[mode].notificationCard.dateSize,
    opacity: 0.6,
    margin: 0,
    lineHeight: '16px',
    paddingLeft: '4px'
  },
  emptyText: {
    color: theme.colors?.textColor || DefaultTheme[mode].colors.textColor,
  },
  errorText: {
    color: theme.colors?.textColor || DefaultTheme[mode].colors.textColor,
  },
  errorButton: {
    backgroundColor:
      theme.colors?.primaryColor || DefaultTheme[mode].colors.primaryColor,
  },
  errorButtonText: {
    color:
      theme.colors?.textColor ||
      DefaultTheme[mode].colors.textColor,
    fontSize: 16,
    fontWeight: "500",
  },
  clearIcon: {
    color:
      theme.windowHeader?.headerActionColor ||
      theme.colors?.textColor ||
      DefaultTheme[mode].windowHeader.headerActionColor
  },
  timerIcon: {
    color: theme.colors?.textColor || DefaultTheme[mode].colors.textColor
  },
  notificationIcon: {
    width:
      theme?.notificationIcon?.size ||
      DefaultTheme[mode]?.notificationIcon?.size,
    height:
      theme?.notificationIcon?.size ||
      DefaultTheme[mode]?.notificationIcon?.size,
    padding: "4px",
  },
  closeIcon: {
    backgroundColor: theme.colors?.textColor || DefaultTheme[mode].colors.textColor
  },
  loadMoreButton: {
    color:
      theme?.loadMoreButton?.color || DefaultTheme[mode]?.loadMoreButton?.color,
    backgroundColor:
      theme?.loadMoreButton?.background ||
      DefaultTheme[mode]?.loadMoreButton?.background,
    fontSize:
      theme?.loadMoreButton?.fontSize ||
      DefaultTheme[mode]?.loadMoreButton?.fontSize,
  },
  loader: {
    borderColor:
      theme.colors?.primaryColor || DefaultTheme[mode].colors.primaryColor,
    borderBottomColor: "transparent",
  },
});

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
  let params: FetchParams = { size: itemsPerPage, sort: 'createdAt' };

  if (data.length > 0) 
    if (fromStart)
      params = {...params, start: data[0].createdAt}
    else
      params = {...params, end: data[data.length - 1].createdAt}

  return params;
};

export const calculateModalPosition = (iconRef: RefObject<HTMLDivElement>, window: Window, containerWidth: DimensionValue ) => {
  if (iconRef.current) {
    const iconRect = iconRef.current.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const spaceRight = screenWidth - iconRect.x;
    const spaceLeft = iconRect.x;
    let modalWidth = 400;
  
    if (typeof containerWidth === 'string') 
      modalWidth =  parseInt(containerWidth.slice(0, -2)); 
    else if (typeof containerWidth === 'number') 
      modalWidth = containerWidth;

    const topPosition = iconRect.bottom;
    const leftPosition = (screenWidth / 2) - (modalWidth / 2 )

    if(spaceLeft < modalWidth && spaceRight < modalWidth && screenWidth > modalWidth) 
    {return { top: `${topPosition}px`, left: `-${leftPosition}px`};}
    else {
      const rightPosition = spaceRight < modalWidth + 30 ? '0px' : null;

      return { top: `${topPosition}px`, ...(rightPosition && { right: rightPosition }) };
    }
  }

  return { top: '0' };
};
export const hexToRgba = (hex: string, alpha: number) => {
  const [r, g, b] = hex.match(/\w\w/g)?.map((x) => parseInt(x, 16)) ?? [];

  return `rgba(${r},${g},${b},${alpha})`;
};
