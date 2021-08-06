import { useState, useEffect, useCallback } from "react";
import { Auth, Hub } from "aws-amplify";
import { CognitoUserExt } from "./auth";

export default function useAuth() {
  const [user, setUser] = useState<CognitoUserExt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn": {
          setUser(data);
          break;
        }
        case "signOut": {
          setUser(null);
          // router.push(signinPath())
          break;
        }
        default:
          break;
      }
    });
  }, []);

  const checkUserAuth = useCallback(async () => {
    try {
      const cognitoUser = (await Auth.currentAuthenticatedUser()) as CognitoUserExt;
      setUser(cognitoUser);
    } catch (err) {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkUserAuth();
    const unsubscribe = Hub.listen("auth", () => checkUserAuth());
    return () => unsubscribe();
  }, [checkUserAuth]);

  return { user, loading };
}
