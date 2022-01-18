import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { TopNavBar } from "./components/navbar";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { MediaPlayerComponent } from "./components/mediaPlayer";
import { useAppDispatch } from "./store/hooks";
import { fetchLessonsAsync } from "./lessons/lessonsSlice";
import { useEffect } from "react";
import { LessonComponentWraper } from "./components/lessonsComponentWraper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import lime from "@mui/material/colors/lime";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: lime,
  },
});
function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLessonsAsync());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <TopNavBar />
            <Switch>
              <Route
                path="/media/:lesson_id"
                component={MediaPlayerComponent}
              />
              <Route
                path="/rabbifireman"
                component={LessonComponentWraper}
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
    </ThemeProvider>
  );
}

export default App;
