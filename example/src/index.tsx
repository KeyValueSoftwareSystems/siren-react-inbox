import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SirenProvider } from "@siren/react-inbox";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <SirenProvider
    config={{
      userToken: 'fb928b226c5b47b7810171acbe2dbad2',
      recipientId: '6b6027be-7882-4eca-9cc7-080a06798c71'
    }}
  >
    <App />
  </SirenProvider>
);