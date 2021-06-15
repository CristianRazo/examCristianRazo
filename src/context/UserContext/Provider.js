import UserContext from "./index";
import { useState } from "react";

export default function UserContextProvider({ children }) {
  const [logg, setLogg] = useState(null);

  return (
    <UserContext.Provider value={{ logg, setLogg }}>
      {children}
    </UserContext.Provider>
  );
}
