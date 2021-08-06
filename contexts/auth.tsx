import React from "react";
import { CognitoUserExt } from "../utils/auth";
import useAuth from "../utils/useAuth";

const AuthContext = React.createContext<{
  loading: boolean;
  user: CognitoUserExt | null;
}>({ loading: false, user: null });

export const useAuthCtx = () => React.useContext(AuthContext);

export const AmplifyAuthProvider: React.FC = ({ children }) => {
  const { user, loading } = useAuth();
  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};
