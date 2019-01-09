import database from "../firebase/config";

export const setMatchs = matchs => ({
  type: "SET_MATCHS",
  matchs
});

export const setPlayerMatch = (idMatch, team, player) => ({
  type: "SET_PLAYER_MATCH",
  idMatch,
  team,
  player
});

export const addPlayer = (team, matchId) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    let player;
    return database
      .ref()
      .child("players")
      .once("value", snap => {
        player = snap.val().filter(player => player.userId === uid)[0];
        dispatch(setPlayerToMatch(player, team, matchId));
      });
  };
};

export const setPlayerToMatch = (player, team, matchId) => {
  return dispatch => {
    database
      .ref(`matchs/${matchId}/team${team}/`)
      .push()
      .set(player)
      .then(() => dispatch(setPlayerMatch(matchId, team, player)));
  };
};

export const startSetMatchs = () => {
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
    return database
      .ref("matchs")
      .once("value")
      .then(snapshot => {
        const matchs = [];

        snapshot.forEach(childSnapshot => {
          matchs.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setMatchs(matchs));
      });
  };
};
