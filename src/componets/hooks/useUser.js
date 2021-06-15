import { useCallback, useContext } from "react";
import UserContext from "../../context/UserContext/index";

export default function useUser() {
  const { logg, setLogg } = useContext(UserContext);

  const login = useCallback(() => {
    setLogg(1);
  }, [setLogg]);
  return {
    isLogged: Boolean(logg),
    login,
  };
}
