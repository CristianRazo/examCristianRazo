import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "../views/Home";
import Upload from "../views/Upload";
import Employees from "../views/Employees";
import Login from "../views/Login";
import ScrollToTop from "../componets/ScrollToTop";
import useUser from "../componets/hooks/useUser";
let isLogg;

const isAuth = (isLogged) => {
  return isLogged;
};
const MyRoute = (props) =>
  isAuth(isLogg) ? <Route {...props} /> : <Redirect to="/login" />;

export default function Routes() {
  const { isLogged, login } = useUser();
  isLogg = isLogged;

  return (
    <Router>
      <ScrollToTop />
      <Route>
        <Switch>
          <Route exact path="/">
            {isLogged ? <Redirect to="/login" /> : <Login />}
          </Route>
          <MyRoute path="/upload" exact component={Upload} />
          <MyRoute path="/home" exact component={Home} />
          <MyRoute path="/employees" exact component={Employees} />
          <Route exact path="/login">
            {isLogged ? <Redirect to="/home" /> : <Login />}
          </Route>

          <Route>
            <Home />
          </Route>
        </Switch>
      </Route>
    </Router>
  );
}
