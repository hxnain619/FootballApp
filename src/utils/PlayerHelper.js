import playerLoggedID from "../session/PlayerLogged";
const isPlayerIn = (arrayToCheck, idPlayerToCheck) => {
  let result = false;
  if (Array.isArray(arrayToCheck)) {
    arrayToCheck.filter(item => {
      item.id === idPlayerToCheck ? (result = true) : (result = false);
    });
  }
  return result;
};
// arrayToCheck.filter(item => item.id === idPlayerToCheck) > 0;

const isLoggedPlayer = idPlayerToCheck => idPlayerToCheck === playerLoggedID;

export { isPlayerIn };
export { isLoggedPlayer };

// [].find();
