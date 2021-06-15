import { useContext, useEffect, useState } from "react";
import EmployeeContext from "../../context/employees";
import icon from "../../resource/icons/user-plus-solid.svg";
import "./index.css";

export default function Employees() {
  const { getEmployeeds, employeed, postData } = useContext(EmployeeContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name: name,
      last_name: lastName,
      birthday: birthday,
    };
    // Funcionalidad para hacer POST
    postData(user).catch(null);
  };
  // Se cargar los empleados al iniciar la aplicacaion
  useEffect(() => {
    //Funcionalidad para hacer GET
    getEmployeeds().catch(null);
  }, []);

  //  Paginacion de 10 en 10
  const filteredEmployee = () => {
    return employeed.slice(currentPage, currentPage + 10);
  };
  const nextPage = () => {
    if (filteredEmployee().length > 0) {
      setCurrentPage(currentPage + 10);
    }
  };
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 10);
    }
  };
  return (
    <div className="container-fluid  d-flex justify-content-center align-items-center vh-100 row ">
      {/* tabla de empleados */}
      <div className="mt-4 ">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Birthday</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployee().map((emp) => {
              return (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.last_name}</td>
                  <td>{emp.birthday}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Butones Anterior y Siguiente */}
        <div className="d-flex justify-content-end">
          <button
            className="btn btn btn-outline-primary me-3 btn-sm"
            onClick={prevPage}
          >
            Anterior
          </button>
          <button
            className="btn btn btn-outline-primary btn-sm"
            onClick={nextPage}
          >
            Siguiente
          </button>
        </div>
      </div>

      <div className="container-fluid ">
        {/* Formulario */}
        <p className="h2 mt-3">Registration</p>
        <form
          className=" d-flex flex-column "
          onSubmit={handleSubmit}
          onReset={(e) => {
            setName("");
            setLastName("");
            setBirthday("");
          }}
        >
          <div className=" form-floating mt-3 mb-2">
            <input
              placeholder="Name"
              className="form-control "
              name="name"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <label htmlFor="name" className="floatingInput">
              Name
            </label>
          </div>

          <div className=" form-floating mb-2">
            <input
              placeholder="Last Name"
              className="form-control "
              name="last_name"
              id="last_name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
            <label htmlFor="last_name" className="floatingInput">
              Last Name
            </label>
          </div>

          <div className="form-floating mb-2 ">
            <input
              className="form-control "
              name="birthday"
              id="birthday"
              type="date"
              min="1921-01-01"
              max="2012-01-01"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            ></input>
            <label htmlFor="birthday" className="floatingInput">
              Birthday
            </label>
          </div>
          <div className="d-flex justify-content-end mb-3">
            <button type="submit" className="btn btn btn-success me-3 btn-md">
              Submit
            </button>
            <button type="reset" className="btn btn btn-warning  btn-md">
              Clean
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
