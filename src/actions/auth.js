import { firebase } from "../firebase/config";

export const login = uid => ({
  type: "LOGIN",
  uid
});

export const logout = () => ({
  type: "LOGOUT"
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
