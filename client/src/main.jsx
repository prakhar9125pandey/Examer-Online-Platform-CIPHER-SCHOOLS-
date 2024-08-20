import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import { ActiveAuthCompProvider } from "./providers/activeAuthComp";

const theme = createTheme({
  fontFamily: "Roboto, sans-serif",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ActiveAuthCompProvider>
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
        <Toaster position="top-right" reverseOrder={false} />
      </ActiveAuthCompProvider>
    </PersistGate>
  </Provider>
);
