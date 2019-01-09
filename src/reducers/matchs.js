export default (state = {}, action) => {
  switch (action.type) {
    case "SET_MATCHS":
      var formattedMatchs = action.matchs.map(match => {
        // formatting needed because firebase returns collection of objects and if players is empty even teama or b will be empty
        var teamA = [];
        var teamB = [];
        if (match.hasOwnProperty("teamA")) {
          teamA = Object.values(match.teamA);
        }
        if (match.hasOwnProperty("teamB")) {
          teamB = Object.values(match.teamB);
        }
        return { ...match, teamA, teamB };
      });
      console.log("formattedMatchs" + JSON.stringify(formattedMatchs));
      return formattedMatchs;
    case "SET_PLAYER_MATCH":
      let result = state.map(match => {
        if (match.id === action.idMatch) {
          if (action.team === "A")
            return {
              ...match,
              teamA: match.teamA.concat(action.player)
            };
          else
            return {
              ...match,
              teamB: match.teamB.concat(action.player)
            };
        } else {
          return match;
        }
      });

      console.log("result" + JSON.stringify(result));
      return result;
    default:
      return state;
  }
};
