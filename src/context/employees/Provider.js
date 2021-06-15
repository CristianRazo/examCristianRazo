import EmployeeContext from "./index";
import apiCall from "../../api";
import { useState } from "react";

export default function Employeeprovider({ children }) {
  const [employeed, setEmployeed] = useState([]);
  const getEmployeeds = async () => {
    try {
      const employeesResult = await apiCall({
        url: "https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/Cristian",
      });

      setEmployeed(employeesResult.data.employees);
    } catch (error) {
      setEmployeed([]);
    }
  };

  const postData = async (user) => {
    try {
      const response = await apiCall({
        url: "https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/Cristian_Razo",
        method: "POST",
        body: JSON.stringify(user),
      });
      console.log(response);
    } catch (error) {
      console.dir(error);
    }
  };

  return (
    <EmployeeContext.Provider value={{ getEmployeeds, employeed, postData }}>
      {children}
    </EmployeeContext.Provider>
  );
}
