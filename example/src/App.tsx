import React, { useState } from "react";
import { SirenInbox, useSiren } from "@sirenapp/react-inbox";

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
  const [showTestingWindow, setShowTestingWindow] = useState(true);
  const [showCustomNotification, setShowCustomNotification] = useState(false);
  const [sdkDarkModeEnabled, setSdkDarkModeEnabled] = useState(false);
  const [showCustomHeader, setShowCustomHeader] = useState(false);
  const [showCustomFooter, setShowCustomFooter] = useState(true);
  const [hideHeader, setHideHeader] = useState(false);
  const [hideAvatar, setHideAvatar] = useState(false);
  const [windowThemeIndex, setWindowThemeIndex] = useState(0);
  const [showCustomEmptyComponent, setShowCustomEmptyComponent] =
    useState(false);
  const [showCustomNotificationCard, setShowCustomNotificationCard] =
    useState(false);

    const { markNotificationsAsReadByDate } = useSiren();

  const renderListEmpty = () => {
    return (
      <div style={{color: 'red'}}>
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
          display: "flex"
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
          display: "flex",
        }}
      >
        <div>
          <div style={{ color: "#fff", fontWeight: "600" }}>Siren</div>
        </div>
        <div>
          <div style={{ color: "#fff", fontWeight: "600" }} onClick={() => markNotificationsAsReadByDate(String(new Date().getTime()))}>Mark allAsRead</div>
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
          backgroundColor: "#36454f",
          padding: 10,
          marginLeft: 500,
          height: 300,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
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
              {renderButton("Theme-Mode", () =>
                setSdkDarkModeEnabled(
                  (sdkDarkModeEnabled) => !sdkDarkModeEnabled
                )
              )}
              {renderButton(
                `${hideHeader ? "Show" : "Hide"}-Header`,
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
                `${showCustomNotification ? "Default" : "Custom"}-N-Icon`,
                () =>
                  setShowCustomNotification(
                    (showCustomNotification) => !showCustomNotification
                  )
              )}
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
      <SirenInbox       
        inboxHeaderProps={{
          title:"Siren Notifications",
          hideHeader: hideHeader,
          customHeader: showCustomHeader ? renderCustomHeader() : undefined
        }}
        darkMode={sdkDarkModeEnabled}
        cardProps={{ hideAvatar: hideAvatar, showMedia: true }}
        theme={windowThemes[windowThemeIndex]}
        customFooter={showCustomFooter ? renderCustomFooter() : undefined}
        listEmptyComponent={
          showCustomEmptyComponent ? renderListEmpty() : undefined
        }
        customNotificationCard={
          showCustomNotificationCard
            ? (notification: any) => renderCustomNotificationCard(notification)
            : undefined
        }
        onNotificationCardClick={() => {
          console.log("click on notification");
        }}
        onError={(error: any) => {
          console.log(`error: ${error}`);
        }}
        windowViewOnly={false}
        notificationIcon={
          showCustomNotification ? renderNotificationIcon() : undefined
        }
      />
      {testingWindow()}
    </div>
  );
};

export default App;