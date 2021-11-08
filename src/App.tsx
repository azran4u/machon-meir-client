import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { TopNavBar } from "./components/navbar";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { LessonViewerComponentV2 } from "./features/rabbifireman/lessonsViewerV2";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <TopNavBar />
          <Switch>
            <Route
              path="/rabbifireman"
              component={LessonViewerComponentV2}
              exact
            />
            <Route
              exact
              path="/"
              render={() => <Redirect to="/rabbifireman" />}
            />
            {/* <Route component={Error} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
