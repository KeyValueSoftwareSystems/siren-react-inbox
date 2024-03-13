import React, { useState } from "react";
import { SirenWindow, useSiren } from '@siren/react-inbox';

const badgeTypes: Array<"default" | "dot" | "none"> = [
  "default",
  "dot",
  "none",
];

const badgeThemes = [
  undefined,
  {
    light: {
      badgeStyle: {
        color: "black",
        size: 24,
        divSize: 12,
      },
    },
    dark: {
      badgeStyle: {
        color: "green",
        size: 24,
        divSize: 12,
      },
    },
  },
  {
    light: {
      badgeStyle: {
        color: "blue",
        size: 22,
        divSize: 11,
      },
    },
    dark: {
      badgeStyle: {
        color: "pink",
        size: 22,
        divSize: 11,
      },
    },
  },
];

const windowThemes = [
  undefined,
  {
    dark: {
      colors: {
        primaryColor: "blue",
      },
    },
    light: {
      colors: {
        primaryColor: "#800000",
        activeCardColor: "#FFDADA",
        primarydivColor: "#FFFFFF",
        secondaryColor: "#3D89DF",
        divColor: "#000000",
        neutralColor: "#FFFFFF",
        borderColor: "#560000",
      },
    },
  },
];

const App: React.FC = () => {
  const isDarkMode = false;
  const [showTestingWindow, setShowTestingWindow] = useState(true);
  const [showCustomNotification, setShowCustomNotification] = useState(false);
  const [badgeTypeIndex, setBadgeTypeIndex] = useState(0);
  const [badgeThemeIndex, setBadgeThemeIndex] = useState(0);
  const [countPollingEnabled, setCountPollingEnabled] = useState(true);
  const [sdkDarkModeEnabled, setSdkDarkModeEnabled] = useState(false);
  const [showCustomHeader, setShowCustomHeader] = useState(false);
  const [showCustomFooter, setShowCustomFooter] = useState(true);
  const [hideHeader, setHideHeader] = useState(false);
  const [hideAvatar, setHideAvatar] = useState(false);
  const [notificationPollingEnabled, setNotificationPollingEnabled] =
    useState(true);
  const [windowThemeIndex, setWindowThemeIndex] = useState(0);
  const [showCustomEmptyComponent, setShowCustomEmptyComponent] =
    useState(false);
  const [showCustomNotificationCard, setShowCustomNotificationCard] =
    useState(false);

  const { markNotificationsAllAsRead, markAsRead } = useSiren();

  const renderListEmpty = () => {
    return (
      <div>
        <div>Notification list is empty</div>
      </div>
    );
  };

  const renderCustomHeader = () => {
    return (
      <div
        style={{
          height: 50,
          backgroundColor: "#5dbea3",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ color: "#FFF", fontSize: 18, fontWeight: "600" }}>
          Custom Header
        </div>
      </div>
    );
  };

  const renderCustomFooter = () => {
    return (
      <div
        style={{
          height: 40,
          backgroundColor: "#5dbea3",
          padding: 6,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          display: 'flex'
        }}
      >
        <div>
          <div style={{ color: "#fff", fontWeight: "600" }}>Siren</div>
        </div>
        <div>
          <div style={{ color: "#fff", fontWeight: "600" }}>Mark allAsRead</div>
        </div>
      </div>
    );
  };

  const renderButton = (label: string, onClick: () => void, color?: string) => {
    return (
      <div
        style={{
          padding: 4,
          backgroundColor: color || "#5783db",
          maxWidth: 150,
          minWidth: "28%",
          alignItems: "center",
          justifyContent: "center",
          margin: 6,
          borderRadius: 4,
        }}
        onClick={onClick}
      >
        <div style={{ color: "#fff", fontWeight: "600" }}>{label}</div>
      </div>
    );
  };

  const testingWindow = () => {
    return (
      <div
        style={{
          // width: 500,
          backgroundColor: "#36454f",
          padding: 10,
          marginLeft: 500,
          height: 300,
        }}
      >
        <div style={{display:'flex', flexDirection: "row", justifyContent: "space-between" }}>
          <div
            style={{
              color: "#FFF",
              marginBottom: 6,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Testing Window
          </div>
          <div
            style={{ color: "#FFF", marginBottom: 6 }}
            onClick={() =>
              setShowTestingWindow((showTestingWindow) => !showTestingWindow)
            }
          >
            {showTestingWindow ? "Close" : "Open"}
          </div>
        </div>
        {showTestingWindow && (
          <>
            <div style={{ color: "#FFF" }}> Notification Window</div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                height: 125,
              }}
            >
              {renderButton(
                `N-Fetch-${notificationPollingEnabled ? "E" : "D"}`,
                () => {
                  setNotificationPollingEnabled(
                    (notificationPollingEnabled) => !notificationPollingEnabled
                  );
                },
                notificationPollingEnabled ? "green" : "red"
              )}
              {renderButton("Theme-Mode", () =>
                setSdkDarkModeEnabled(
                  (sdkDarkModeEnabled) => !sdkDarkModeEnabled
                )
              )}
              {renderButton(
                `${showCustomHeader ? "Hide" : "Show"}-Header`,
                () => setHideHeader((hideHeader) => !hideHeader)
              )}
              {renderButton(
                `${showCustomHeader ? "Default" : "Custom"}-Header`,
                () =>
                  setShowCustomHeader((showCustomHeader) => !showCustomHeader)
              )}
              {renderButton(
                `${showCustomFooter ? "Hide" : "Show"}-Footer`,
                () =>
                  setShowCustomFooter((showCustomFooter) => !showCustomFooter)
              )}
              {renderButton(`${hideAvatar ? "Show" : "Hide"}-Avatar`, () =>
                setHideAvatar((hideAvatar) => !hideAvatar)
              )}
              {renderButton(
                `${showCustomEmptyComponent ? "Default" : "Custom"}-Empty`,
                () =>
                  setShowCustomEmptyComponent(
                    (showCustomEmptyComponent) => !showCustomEmptyComponent
                  )
              )}
              {renderButton(
                `${showCustomNotificationCard ? "Default" : "Custom"}-N-Card`,
                () =>
                  setShowCustomNotificationCard(
                    (showCustomNotificationCard) => !showCustomNotificationCard
                  )
              )}
              {renderButton("N-W-Theme", () => {
                setWindowThemeIndex((windowThemeIndex) =>
                  windowThemeIndex < windowThemes?.length - 1
                    ? windowThemeIndex + 1
                    : 0
                );
              })}
            </div>
            <div style={{ color: "#FFF" }}>Notification Icon</div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                height: 15,
              }}
            >
              {renderButton(
                `N-Ct-Fetch-${countPollingEnabled ? "E" : "D"}`,
                () => {
                  setCountPollingEnabled(
                    (countPollingEnabled) => !countPollingEnabled
                  );
                },
                countPollingEnabled ? "green" : "red"
              )}
              {renderButton(
                `${showCustomNotification ? "Default" : "Custom"}-N-Icon`,
                () =>
                  setShowCustomNotification(
                    (showCustomNotification) => !showCustomNotification
                  )
              )}
              {renderButton("N-Badges", () => {
                setBadgeTypeIndex((badgeTypeIndex) =>
                  badgeTypeIndex < 2 ? badgeTypeIndex + 1 : 0
                );
              })}
              {renderButton("N-Badge-Themes", () => {
                setBadgeThemeIndex((badgeThemeIndex) =>
                  badgeThemeIndex < badgeThemes?.length - 1
                    ? badgeThemeIndex + 1
                    : 0
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  };

  const renderNotificationIcon = () => {
    return (
      <div>
        <img
          src={
            "https://png.pngtree.com/png-vector/20190321/ourmid/pngtree-vector-notification-icon-png-image_855007.jpg"
          }
          alt="icon"
          style={{ width: 50, height: 50 }}
        />
      </div>
    );
  };

  const renderCustomNotificationCard = (notification: any) => (
    <div style={{ height: 100, width: "100%", padding: 14 }}>
      <div
        style={{ color: "#000" }}
      >{`Notification card id: ${notification.id}`}</div>
    </div>
  );

  return (
    <div>
      <SirenWindow
        title="Siren Notifications"
        hideHeader={hideHeader}
        darkMode={sdkDarkModeEnabled}
        cardProps={{ hideAvatar: hideAvatar, showMedia: true }}
        realTimeNotificationEnabled={notificationPollingEnabled}
        itemsPerPage={8}
        theme={windowThemes[windowThemeIndex]}
        customFooter={showCustomFooter ? renderCustomFooter() : undefined}
        listEmptyComponent={
          showCustomEmptyComponent ? renderListEmpty() : undefined
        }
        customHeader={showCustomHeader ? renderCustomHeader() : undefined}
        customNotificationCard={
          showCustomNotificationCard
            ? (notification) => renderCustomNotificationCard(notification)
            : undefined
        }
        onNotificationCardClick={(notification) => {
          console.log("click on notification");
          markAsRead(notification.id);
        }}
        onError={(error) => {
          console.log(`error: ${error}`);
        }}
        windowViewOnly={false}
        badgeType={badgeTypes[badgeTypeIndex]}
        realTimeUnViewedCountEnabled={countPollingEnabled}
        notificationIcon={showCustomNotificationCard? renderNotificationIcon(): undefined}
      />
      {testingWindow()}
    </div>
  );
};

export default App;