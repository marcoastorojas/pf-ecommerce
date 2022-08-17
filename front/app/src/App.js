// import logo from './logo.svg';
import "./App.css";
import { Route } from "react-router-dom";
import Landing from "./pages/Landing";

function App() {
  return (
    <div className="App">
      <Route path={"/"} exact>
        <Landing />
      </Route>
    </div>
  );
}

export default App;
