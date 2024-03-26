import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SirenProvider } from "@sirenapp/react-inbox";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <SirenProvider
    config={{
      userToken: "YOUR_USER_TOKEN_HERE",
      recipientId: "YOUR_RECIPIENT_ID",
    }}
  >
    <App />
  </SirenProvider>
);