import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { TopNavBar } from "./components/navbar";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UsersComponent } from "./features/users/UsersComponent";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <TopNavBar />
          <Switch>
            <Route path="/" component={UsersComponent} exact />
            <Route path="/users" component={UsersComponent} />
            {/* <Route component={Error} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
