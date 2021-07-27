import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { TopNavBar } from "./components/navbar";
import { UsersTable } from "./features/users/UsersTable";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TopNavBar />
        <UsersTable />
      </div>
    </Provider>
  );
}

export default App;
