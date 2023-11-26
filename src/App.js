import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RouteContainer from "./RouteContainer";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/es/integration/react";
import { persistStore } from "redux-persist";
import { Toaster } from 'react-hot-toast';
const persistor = persistStore(store);
function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RouteContainer />
            <Toaster />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
