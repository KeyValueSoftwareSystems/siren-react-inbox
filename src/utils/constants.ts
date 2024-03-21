export const COLORS = {
  light: {
    primaryColor: "#F56630",
    highlightedCardColor: "#FFECE5",
    textColor: "#344054",
    neutralColor: "#FFFFFF",
    borderColor: "#D0D5DD",
    dateColor: "#34405499",
    deleteIcon: "#34405499",
    timerIcon: "#667185",
    clearAllIcon: "#667185",
    windowShadowColor: "#D0D5DD",
    iconColor: "#F7F9FC",
    notificationIcon: "#232326",
  },
  dark: {
    primaryColor: "#F56630",
    highlightedCardColor: "#2E2D30",
    textColor: "#FFFFFF",
    neutralColor: "#232326",
    borderColor: "#344054",
    dateColor: "#98A2B3",
    deleteIcon: "#D0D5DD",
    timerIcon: "#98A2B3",
    clearAllIcon: "#D0D5DD",
    windowShadowColor: "#232326",
    iconColor: "#38383D",
    notificationIcon: "#FFFFFF",
  },
};

export enum ThemeMode {
  DARK = "dark",
  LIGHT = "light",
}

export enum LogLevel {
  INFO,
  ERROR,
}

export enum BadgeType {
  NONE = "none",
  DOT = "dot",
  DEFAULT = "default",
}

export const levelLogFns = {
  [LogLevel.INFO]: console.log,
  [LogLevel.ERROR]: console.error,
};

export const defaultBadgeStyle = {
  size: 15,
  color: "#FF0000",
  textColor: "#FFFFFF",
  textSize: 10,
  linHeight: "14px",
  top: "inherit",
  left: "inherit",
};

export enum eventTypes {
  MARK_ITEM_AS_VIEWED = "MARK_ITEM_AS_VIEWED",
  MARK_ITEM_AS_READ = "MARK_ITEM_AS_READ",
  MARK_ALL_AS_READ = "MARK_ALL_AS_READ",
  DELETE_ITEM = "DELETE_ITEM",
  DELETE_ALL_ITEM = "DELETE_ALL_ITEM",
  NEW_NOTIFICATIONS = "NEW_NOTIFICATIONS",
  UPDATE_NOTIFICATIONS_COUNT = "UPDATE_NOTIFICATIONS_COUNT",
  RESET_NOTIFICATIONS = "RESET_NOTIFICATIONS",
  RESET_NOTIFICATIONS_COUNT = "RESET_NOTIFICATIONS_COUNT",
}

export enum events {
  NOTIFICATION_LIST_EVENT = "NOTIFICATION_LIST_EVENT",
  NOTIFICATION_COUNT_EVENT = "NOTIFICATION_COUNT_EVENT",
}

export enum updateNotificationsTypes {
  MARK_ITEM_AS_VIEWED = "MARK_ITEM_AS_VIEWED",
  MARK_ITEM_AS_READ = "MARK_ITEM_AS_READ",
  MARK_ALL_AS_READ = "MARK_ALL_AS_READ",
  DELETE_ITEM = "DELETE_ITEM",
  DELETE_ALL_ITEM = "DELETE_ALL_ITEM",
}

export enum sirenReducerTypes {
  SET_NOTIFICATIONS = "SET_NOTIFICATIONS",
  NEW_NOTIFICATIONS = "NEW_NOTIFICATIONS",
  SET_UN_VIEWED_NOTIFICATION_COUNT = "SET_UN_VIEWED_NOTIFICATION_COUNT",
  SET_SIREN_CORE = "SET_SIREN_CORE",
}

export const LIST_EMPTY_TEXT = "No new notifications";
export const LIST_EMPTY_SUB_TEXT = "Check back later for updates and alerts.";
export const ERROR_TEXT = "Oops! Something went wrong";
export const ERROR_SUB_TEXT =
  "Could not load the notifications. Please refresh the page.";
export const DEFAULT_WINDOW_TITLE = "Notifications";
export const RETRY_BUTTON_LABEL = "Retry";
export const CLEAR_ALL_LABEL = "Clear All";
export const IN_APP_RECIPIENT_UNAUTHENTICATED = 'IN_APP_RECIPIENT_UNAUTHENTICATED';
export const TOKEN_VERIFICATION_PENDING ='TOKEN_VERIFICATION_PENDING';
export const MAXIMUM_RETRY_COUNT = 3;

export const errorMap = {
  SIREN_OBJECT_NOT_FOUND: {
    Type: "ERROR",
    Code: "SIREN_OBJECT_NOT_FOUND",
    Message: "Siren Object Not found",
  },
  MISSING_PARAMETER: {
    Type: "ERROR",
    Code: "MISSING_PARAMETER",
    Message: "Missing Parameter",
  },
};

export enum VerificationStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED"
}