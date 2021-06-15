import { useState, useEffect } from "react";
import useUser from "../../componets/hooks/useUser";

const user = {
  username: "cristian",
  password: "123456",
};
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLogged, login } = useUser();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === user.username && password === user.password) {
      login();
    }
  };

  useEffect(() => {
    if (isLogged) {
    }
  }, [isLogged]);

  return (
    <div className="container-fluid d-flex flex-row justify-content-center align-items-center vh-100 bg-dark m-0 ">
      <div>
        <form
          className="col-sm-12 m-0 d-flex flex-row justify-content-center flex-column align-items-center"
          onSubmit={handleSubmit}
        >
          <div className="d-flex flex-column justyfy-content-center align-items-center">
            {/* input de usuario */}
            <div className="col-4 input-group mb-3">
              <input
                name="usuario"
                className="form-control"
                id="usuario"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onPaste={(e) => {
                  e.preventDefault();
                  alert("Accion prohibida");
                }}
              ></input>
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">
                  Username
                </span>
              </div>
            </div>
            {/* input de contraseña */}
            <div className="col-4 input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Password
                </span>
              </div>
              <input
                name="contraseña"
                id="contraseña"
                type="password"
                value={password}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                onPaste={(e) => {
                  e.preventDefault();
                  alert("Accion prohibida");
                }}
              ></input>
            </div>
          </div>
          <button className="col-6 btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
