import { Link } from "react-router-dom";
import "./index.css";
export default function Home() {
  return (
    <div className="container-fluid bg-dark d-flex justify-content-center align-items-center vh-100">
      <div className="container-fluid nav ">
        <ul className="d-flex container-fluid justify-content-center align-items-center flex-column ">
          <li className="m-2 h4 ">
            <Link style={{ textdecoration: "none" }} to="/Employees">
              Employees
            </Link>
          </li>
          <li className="m-2 h4 ">
            <Link style={{ textDecoration: "none" }} to="/upload">
              Upload
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
