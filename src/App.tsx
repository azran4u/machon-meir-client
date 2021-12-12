import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { TopNavBar } from "./components/navbar";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { LessonComponent } from "./components/lessonsComponent";
import { MediaPlayerComponent } from "./components/mediaPlayer";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <TopNavBar />
          <Switch>
            <Route path="/media" component={MediaPlayerComponent} exact />
            <Route path="/rabbifireman" component={LessonComponent} exact />
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
