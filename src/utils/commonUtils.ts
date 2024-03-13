
import { DefaultTheme } from ".";
import type { SirenStyleProps, ThemeProps } from "../types";
import { LogLevel} from "./constants";
import { ThemeMode } from "./constants";

export const getTimeAgo = (timeString: string) => {
  const currentTime = Date.now();
  const targetTime = new Date(timeString).getTime();
  const timeDiff = currentTime - targetTime;

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (timeDiff < 60000) 
    return 'Just now';
  else if (minutes < 60) 
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  else if (hours < 24) 
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  else if (days < 365) 
    return days === 1 ? '1 day ago' : `${days} days ago`;
  else 
    return years === 1 ? '1 year ago' : `${years} years ago`;
};



export const renderAsImage = (icon: JSX.Element | string): boolean =>
  typeof icon === 'undefined' || typeof icon === 'string';

export const logger = {
  log: async (level:LogLevel.INFO | LogLevel.ERROR, message: string) => {
    const timestamp = new Date().toISOString();
    const levelString = LogLevel[level].toUpperCase();

    console.log(`[${timestamp}] [${levelString}] ${message}`);
  },
  error: function (error: string) {
    this.log(LogLevel.ERROR, error);
  },
  info: function (message: string) {
    this.log(LogLevel.INFO, message);
  }
};
   


export const applyTheme = (
  theme: ThemeProps = {},
  mode: ThemeMode = ThemeMode.DARK,
): SirenStyleProps =>
  ({
    container: {
      width: theme.window?.width || DefaultTheme[mode].window.width,
      minHeight: theme.window?.height || DefaultTheme[mode].window.height,
      borderColor:
          theme.window?.borderColor || DefaultTheme[mode].window.borderColor,
      borderRadius:
          theme.window?.borderRadius || DefaultTheme[mode].window.borderRadius,
      maxWidth: theme.window?.width,
      flex: 1,
      overflow: 'hidden'
    },
    contentContainer: {
      backgroundColor:
          theme.windowContainer?.background ||
          theme.colors?.neutralColor ||
          DefaultTheme[mode].windowContainer.background,
      padding:
          theme.windowContainer?.padding ||
          DefaultTheme[mode].windowContainer.padding,
      overflow: 'auto',
      maxHeight: '700px',
    },
    headerContainer: {
      backgroundColor:
          theme.windowHeader?.background ||
          theme.colors?.primaryColor ||
          DefaultTheme[mode].windowHeader.background,

      height:
          theme.windowHeader?.height || DefaultTheme[mode].windowHeader.height,
      justifyContent: 'space-between',
      padding:'10px 15px 10px 15px',
      borderBottom:' 1px solid #dbdae2',
      display: 'flex',
      flexDirection: 'row'
    },
    headerTitle: {
      alignItems: 'center',
      display: 'flex',
      margin: 0,
      color:
          theme.windowHeader?.titleColor ||
          theme.colors?.neutralColor ||
          DefaultTheme[mode].windowHeader.titleColor,
      fontSize:
          theme.windowHeader?.titleSize ||
          DefaultTheme[mode].windowHeader.titleSize,
      fontWeight:
          theme.windowHeader?.titleFontWeight ||
          DefaultTheme[mode].windowHeader.titleFontWeight,
    },
    headerButton:{
      outline: 'none',
      border: 'none',
      fontWeight: 700,
      cursor: 'pointer',
      alignItems: 'center',
      display: 'flex'
    },
    headerAction: {
      color:
        theme.windowHeader?.titleColor ||
        theme.colors?.neutralColor ||
        DefaultTheme[mode].windowHeader.titleColor,
    },
    cardContainerButton: {
      backgroundColor:
          theme.notificationCard?.background ||
          theme.colors?.neutralColor ||
          DefaultTheme[mode].notificationCard.background,
      padding:
          theme.notificationCard?.padding ||
          DefaultTheme[mode].notificationCard.padding,
      flexDirection: 'row',
      borderBottom: `${theme.notificationCard?.borderWidth || DefaultTheme[mode].notificationCard.borderWidth}px solid`,
      borderColor:
      theme.notificationCard?.borderColor ||
      theme.colors?.borderColor ||
      DefaultTheme[mode].notificationCard.borderColor,
    },
    cardContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
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
      overflow: 'hidden',
      backgroundColor:
          theme.colors?.borderColor || DefaultTheme[mode].colors.borderColor,
    },
    cardTitle: {
      margin: 0,
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
      paddingBottom: 4,
      paddingRight:
          theme.notificationCard?.padding ||
          DefaultTheme[mode].notificationCard.titlePadding,
      paddingLeft:  theme.notificationCard?.padding ||
      DefaultTheme[mode].notificationCard.titlePadding,
    },
    cardContentWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
    cardDescription: {
      margin: 0,
      color:
          theme.notificationCard?.descriptionColor ||
          theme.colors?.textColor ||
          DefaultTheme[mode].notificationCard.descriptionColor,
      fontSize:
          theme.notificationCard?.descriptionSize ||
          DefaultTheme[mode].notificationCard.descriptionSize,
      fontWeight: '400',
      paddingBottom: 10,
      paddingRight:
          theme.notificationCard?.descriptionPadding ||
          DefaultTheme[mode].notificationCard.descriptionPadding,
      paddingLeft: theme.notificationCard?.descriptionPadding ||
      DefaultTheme[mode].notificationCard.descriptionPadding,
    },
    cardImageStyle: {
      objectFit: 'cover',
      width:
          theme.notificationCard?.mediaWidth ||
          DefaultTheme[mode].notificationCard.mediaWidth,
      height:
          theme.notificationCard?.mediaHeight ||
          DefaultTheme[mode].notificationCard.mediaHeight,
      borderRadius:
          theme.notificationCard?.mediaRadius ||
          DefaultTheme[mode].notificationCard.mediaRadius,
      overflow: 'hidden',
      marginBottom: 10,
      backgroundColor:
          theme.notificationCard?.mediaPlaceholder ||
          DefaultTheme[mode].notificationCard.mediaPlaceholder,
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
    },
    deleteButton: {
      width: '20px',
      height: '20px',
      padding: '4px',
      cursor: 'pointer'
    },
    footerContainer: {
      backgroundColor:
      theme.windowFooter?.background ||
      theme.colors?.primaryColor ||
      DefaultTheme[mode].windowFooter.background,

      height:
      theme.windowFooter?.height || DefaultTheme[mode].windowFooter.height,
      color:
          theme.windowFooter?.textColor ||
          theme.colors?.neutralColor ||
          DefaultTheme[mode].windowFooter.textColor,
      fontSize:
          theme.windowFooter?.textSize ||
          DefaultTheme[mode].windowFooter.textSize,
      fontWeight:
          theme.windowFooter?.textFontWeight ||
          DefaultTheme[mode].windowFooter.textFontWeight,
      borderColor:
          theme.window?.borderColor || DefaultTheme[mode].window.borderColor,
      width: '100%',
      position: 'relative',
      cursor: 'pointer',
      border: 'none',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
    notificationBadgeContainer:{
      backgroundColor: theme?.unreadBadgeCount?.background || 
                          DefaultTheme[mode].unreadBadgeCount.background,
      borderRadius: theme?.unreadBadgeCount?.borderRadius ||
                       DefaultTheme[mode].unreadBadgeCount.borderRadius , 
      height: theme?.unreadBadgeCount?.size ||
      DefaultTheme[mode].unreadBadgeCount.size,
      minWidth:  theme?.unreadBadgeCount?.size ||
      DefaultTheme[mode].unreadBadgeCount.size,
      position: 'absolute',
      top: 0,
      right: '6px',
      display: 'flex',
      justifyContent: 'center'
    },
    notificationCount: {
      color: theme?.unreadBadgeCount?.color || 
      DefaultTheme[mode].unreadBadgeCount.color,
      fontSize: theme?.unreadBadgeCount?.fontSize || 
      DefaultTheme[mode].unreadBadgeCount.fontSize,
    },
    emptyContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      minHeight: 100,
      width: '100%',
    },
    emptyText: {
      color: theme.colors?.textColor || DefaultTheme[mode].colors.textColor,
      fontSize: 18,
      fontWeight: '400',
      padding: 20,
    },
    errorText: {
      color: theme.colors?.primaryColor || DefaultTheme[mode].colors.primaryColor,
      fontSize: 18,
      fontWeight: '400',
      padding: 20,
    },
    errorButton:{
      padding: '6px 20px 6px 20px',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: theme.colors?.primaryColor || DefaultTheme[mode].colors.primaryColor,
    },
    errorButtonText:{
      color: theme.colors?.primaryTextColor || DefaultTheme[mode].colors.primaryTextColor,
      fontSize: 16,
      fontWeight: '500',
    },
    sirenWindowLoaderContainer :{
      border: '8px solid #f3f3f3',
      borderTop: '8px solid #3498db',
      borderRadius: '50%',
      width: '10px',
      height: '10px',
      animation: 'spin 1s linear infinite',
      margin: 0 ,
    },
    // sirenWindowLoader:{
    //   width: '100%',
    //   position: 'relative ',
    //   cursor: 'pointer',
    //   border: 'none'
    // }
    avatarContainer: {
      display: 'flex',
      width:  '100%'
    },
    avatarImageContainer: {
      display: 'flex',
      justifyContent: 'center',
      paddingRight: '16px'
    },
    cardMediaContainer: {
      display: 'flex',
      justifyContent: 'center'
    },
    notificationIconContainer: {
      border: 'none',
      backgroundColor: 'initial',
      position: 'relative'
    },
    notificationIcon:{
      width: theme?.notificationIcon?.size || DefaultTheme[mode]?.notificationIcon?.size,
      height: theme?.notificationIcon?.size || DefaultTheme[mode]?.notificationIcon?.size,
      padding: '4px'
    }
  });