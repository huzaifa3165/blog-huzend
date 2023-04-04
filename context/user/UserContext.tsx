import { createContext, useReducer, useContext, ContextType } from "react";
import userReducer, { UserState, initialState } from "./userReducer";
interface UserContextProps {
  user: any;
  login: (userData: any) => void;
  logout: () => void;
}
const UserContext = createContext(initialState);
export const UserProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const login = (userData: UserState) => {
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };
  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
  };
  const value = {
    user: state.user,
    login,
    logout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within UserContext");
  }

  return context;
};

export default useUser;
