import React from "react";
import { CognitoUserExt } from "../utils/types";
import useAuth from "../utils/useAuth";

const AuthContext = React.createContext<{
  loading: boolean;
  data: CognitoUserExt | null;
}>({ loading: false, data: null });
export const useAuthCtx = () => React.useContext(AuthContext);
export const AmplifyAuthProvider: React.FC = ({ children }) => {
  const { data, loading } = useAuth();
  return <AuthContext.Provider value={{ data, loading }}>{children}</AuthContext.Provider>;
};
