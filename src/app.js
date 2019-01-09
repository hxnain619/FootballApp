import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import "normalize.css/normalize.css";
import { firebase, database } from "./firebase/config";
import { login, logout } from "./actions/auth";
import { startSetMatchs } from "./actions/matchsAction";
import { setLoggedPlayer } from "./actions/player";
import configureStore from "./store/configureStore";
import uuid from "uuid";
import {
  dummyMatch,
  dummyMatchEmptyTeams,
  dummyPlayer,
  dummyPlayer2,
  dummyPlayer3,
  dummyPlayer4,
  dummyPlayer5,
  dummyPlayer6,
  dummyPlayer7,
  dummyPlayer8,
  dummyPlayer9,
  dummyPlayer10,
  dummyPlayer11
} from "./data/listMatchs";
import LoadingSpinner from "./components/LoadingSpinner";

const store = configureStore();

/* firebase
  .database()
  .ref(`matchs/-LVcwtFZNXQJoExq2Alz/teamB/`)
  .push()
  .set(dummyPlayer10);

firebase
  .database()
  .ref(`matchs/-LVcwtFZNXQJoExq2Alz/teamA/`)
  .push()
  .set(dummyPlayer6);

firebase
  .database()
  .ref(`matchs/-LVcwtFZNXQJoExq2Alz/teamA/`)
  .push()
  .set(dummyPlayer7);

firebase
  .database()
  .ref(`matchs/-LVcwtFZNXQJoExq2Alz/teamB/`)
  .push()
  .set(dummyPlayer4);

firebase
  .database()
  .ref(`matchs/0029010f-a38a-4aab-97a1-f74af4339f5d/teamB/`)
  .push()
  .set(dummyPlayer11);

firebase
  .database()
  .ref(`matchs/0029010f-a38a-4aab-97a1-f74af4339f5d/teamA/`)
  .push()
  .set(dummyPlayer8);

firebase
  .database()
  .ref(`matchs/0029010f-a38a-4aab-97a1-f74af4339f5d/teamA/`)
  .push()
  .set(dummyPlayer);

firebase
  .database()
  .ref(`matchs/0029010f-a38a-4aab-97a1-f74af4339f5d/teamB/`)
  .push()
  .set(dummyPlayer3); */

// const keyPlayer3 = uuid();
/* const key = uuid();
const keyPlayer = uuid();
const keyPlayer2 = uuid();

const idMatch = firebase
  .database()
  .ref(`matchs/${key}`)
  .set(dummyMatchEmptyTeams);

firebase
  .database()
  .ref(`matchs/${key}/teamA/players/${keyPlayer}`)
  .set(dummyPlayer);

firebase
  .database()
  .ref(`matchs/${key}/teamB/players/${keyPlayer2}`)
  .set(dummyPlayer2); */

/* firebase
  .database()
  .ref(`matchs/-LVcwtFZNXQJoExq2Alz/teamA/`)
  .push()
  .set(dummyPlayer3);

firebase
  .database()
  .ref(`matchs/0029010f-a38a-4aab-97a1-f74af4339f5d/teamA/players/`)
  .push()
  .set(dummyPlayer3); */

/* firebase
  .database()
  .ref(`matchs/0029010f-a38a-4aab-97a1-f74af4339f5d/teamA/players/`)
  .push()
  .set(dummyPlayer3);  */

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
const jsxx = (
  <div>
    <LoadingSpinner loaderVisibility={true} />
    {jsx}
  </div>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("appBodyContainer"));
    hasRendered = true;
  }
};

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(setLoggedPlayer());
    console.log(store.getState());
    store.dispatch(startSetMatchs()).then(() => {
      console.log(store.getState());
      renderApp();
      if (history.location.pathname === "/") {
        history.push("/dashboard");
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});

function newFunction() {
  console.log("idMatch" + idMatch);
}
//ReactDOM.render(<AppRouter />, document.getElementById("appBodyContainer"));
