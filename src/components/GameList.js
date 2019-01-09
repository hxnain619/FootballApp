import React from "react";
import GamesListOfDay from "./GameListOfDay.js";
import { groupListByDate } from "../utils/MatchFilters";
import { connect } from "react-redux";
//import playerLoggedID from "../session/PlayerLogged";

/* after Loggin the logged user will have a player id associated to that user
with that id, api returns playerById */

class GameList extends React.Component {
  constructor(props) {
    super(props);
    this.setMatchsListState = this.setMatchsListState.bind(this);
    this.state = {
      // for now data  is hardcoded but we'll need ajax call
      matchs: []
    };
  }

  setMatchsListState(newList) {
    this.setState(() => {
      return { matchs: groupListByDate(newList, "matchDate") };
    });
  }

  // fetch MatchsList from db
  componentDidMount() {
   // this.setMatchsListState(this.props.matchs);
  }

  render() {
    return (
      <div className="ibox float-e-margins">
        {this.props.matchs.map((matchs, index) => (
          <GamesListOfDay key={index} dayMatchs={matchs} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    matchs: groupListByDate(state.matchs,"matchDate")
  };
};

export default connect(mapStateToProps)(GameList);
