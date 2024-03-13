import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SirenProvider} from '@siren/react-inbox';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <SirenProvider    config={{
        userToken: "1b961622e24c4a118a4108123d645c28",
        recipientId: "6018ebd1-683c-4397-a903-5ce9ea94bcd7",
      }}>
    <App />
    </SirenProvider>
  </React.StrictMode>
);