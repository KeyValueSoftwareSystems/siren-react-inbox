import { COLORS, ThemeMode } from "./constants";

const defaultTheme = {
  light: {
    colors: {
      primaryColor: COLORS[ThemeMode.LIGHT].primaryColor,
      textColor: COLORS[ThemeMode.LIGHT].textColor,
      neutralColor: COLORS[ThemeMode.LIGHT].neutralColor,
      borderColor: COLORS[ThemeMode.LIGHT].borderColor,
      highlightedCardColor: COLORS[ThemeMode.LIGHT].highlightedCardColor,

      dateColor: COLORS[ThemeMode.LIGHT].dateColor,
      deleteIcon: COLORS[ThemeMode.LIGHT].deleteIcon,
      timerIcon: COLORS[ThemeMode.LIGHT].timerIcon,
      clearAllIcon: COLORS[ThemeMode.LIGHT].clearAllIcon,
    },
    window: {
      borderColor: COLORS[ThemeMode.LIGHT].borderColor,
      shadowColor: COLORS[ThemeMode.DARK].windowShadowColor,
    },
    windowHeader: {
      background: COLORS[ThemeMode.LIGHT].neutralColor,
      titleColor: COLORS[ThemeMode.LIGHT].textColor,
      headerActionColor: COLORS[ThemeMode.LIGHT].textColor,
      borderColor: COLORS[ThemeMode.LIGHT].borderColor,
    },
    windowContainer: {
      background: COLORS[ThemeMode.LIGHT].neutralColor,
    },
    customCard: {
      borderColor: COLORS[ThemeMode.LIGHT].borderColor,
      titleColor: COLORS[ThemeMode.LIGHT].textColor,
      background: "transparent",
      subtitleColor: COLORS[ThemeMode.LIGHT].textColor,
      descriptionColor: COLORS[ThemeMode.LIGHT].textColor,
    },
    loadMoreButton: {
      color: COLORS[ThemeMode.LIGHT].primaryColor,
      background: COLORS[ThemeMode.LIGHT].neutralColor,
    },
    deleteIcon: {
      color: COLORS[ThemeMode.LIGHT].deleteIcon,
    },
    clearIcon: {
      color: COLORS[ThemeMode.LIGHT].clearAllIcon,
    },
    timerIcon : {
      color: COLORS[ThemeMode.LIGHT].timerIcon,
    },
    loader:{
      backgroundImage: 'linear-gradient(to right, #F0f0f0 0%, #E0E0E0 50%, #F0F0F0 100%)',
    },
    tabs: {
      containerBackgroundColor: COLORS[ThemeMode.LIGHT].neutralColor,
      activeTabBackgroundColor: COLORS[ThemeMode.LIGHT].neutralColor,
      inactiveTabBackgroundColor: COLORS[ThemeMode.LIGHT].neutralColor,
      activeTabTextColor: COLORS[ThemeMode.LIGHT].primaryColor,
      inactiveTabTextColor: COLORS[ThemeMode.LIGHT].textColor,
      indicatorColor: COLORS[ThemeMode.LIGHT].primaryColor,
      borderColor: COLORS[ThemeMode.LIGHT].neutralColor
    }
  },
  dark: {
    colors: {
      primaryColor: COLORS[ThemeMode.DARK].primaryColor,
      textColor: COLORS[ThemeMode.DARK].textColor,
      neutralColor: COLORS[ThemeMode.DARK].neutralColor,
      borderColor: COLORS[ThemeMode.DARK].borderColor,
      highlightedCardColor: COLORS[ThemeMode.DARK].highlightedCardColor,
      dateColor: COLORS[ThemeMode.DARK].dateColor,
      deleteIcon: COLORS[ThemeMode.DARK].deleteIcon,
      timerIcon: COLORS[ThemeMode.DARK].timerIcon,
      clearAllIcon: COLORS[ThemeMode.DARK].clearAllIcon,
    },
    window: {
      borderColor: COLORS[ThemeMode.DARK].borderColor,
      shadowColor: COLORS[ThemeMode.DARK].windowShadowColor,
    },
    windowHeader: {
      background: COLORS[ThemeMode.DARK].neutralColor,
      titleColor: COLORS[ThemeMode.DARK].textColor,
      headerActionColor: COLORS[ThemeMode.DARK].textColor,
      borderColor: COLORS[ThemeMode.DARK].borderColor,
    },
    windowContainer: {
      background: COLORS[ThemeMode.DARK].neutralColor,
    },
    customCard: {
      borderColor: COLORS[ThemeMode.DARK].borderColor,
      background: "transparent",
      titleColor: COLORS[ThemeMode.DARK].textColor,
      subtitleColor: COLORS[ThemeMode.DARK].textColor,
      descriptionColor: COLORS[ThemeMode.DARK].textColor,
    },
    loadMoreButton: {
      color: COLORS[ThemeMode.LIGHT].primaryColor,
      background: COLORS[ThemeMode.DARK].neutralColor,
    },
    deleteIcon: {
      color: COLORS[ThemeMode.DARK].deleteIcon,
    },
    clearIcon: {
      color: COLORS[ThemeMode.DARK].clearAllIcon,
    },
    timerIcon : {
      color: COLORS[ThemeMode.DARK].timerIcon,
    },
    loader:{
      backgroundImage: 'linear-gradient(to right, #49494A 0%, #535354 50%, #49494A 100%)',
    },
    tabs: {
      containerBackgroundColor: COLORS[ThemeMode.DARK].neutralColor,
      activeTabBackgroundColor: COLORS[ThemeMode.DARK].neutralColor,
      inactiveTabBackgroundColor: COLORS[ThemeMode.DARK].neutralColor,
      activeTabTextColor: COLORS[ThemeMode.DARK].primaryColor,
      inactiveTabTextColor: COLORS[ThemeMode.DARK].textColor,
      indicatorColor: COLORS[ThemeMode.DARK].primaryColor,
      borderColor: COLORS[ThemeMode.DARK].neutralColor
    }
  },
};

export default defaultTheme;
