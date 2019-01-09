import database from "../firebase/config";

export const setPlayer = player => ({
  type: "SET_PLAYER",
  player
});

export const setLoggedPlayer = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    let player;
    return database
      .ref()
      .child("players")
      .once("value", snap => {
        player = snap.val().filter(player => player.userId === uid)[0];

        dispatch(setPlayer({ id: snap.key, ...player }));
      });
  };
};
