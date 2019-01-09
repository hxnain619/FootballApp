import React from "react";
import GameRow from "./GameRow";
import TeamsModal from "./TeamsModal";
import database from "../firebase/config";
import { isPlayerIn } from "./../utils/PlayerHelper";
import { connect } from "react-redux";
import { addPlayer } from "../actions/matchsAction";


class GamesListOfDay extends React.Component {
  constructor(props) {
    super(props);
    this.showGameDetailModal = this.showGameDetailModal.bind(this);
    this.toggleOpenModal = this.toggleOpenModal.bind(this);
    this.addPlayerToTeam = this.addPlayerToTeam.bind(this);
    this.state = {
      showLaoder: false,
      modal: { openState: false, selectedMatch: {}, loggedPlayerInMatch: false }
    };
  }

  showGameDetailModal(matchSelected, PlayerIsInMatch) {
    console.log("im here " + matchSelected.id);
    let modal = Object.assign({}, this.state.modal);
    modal.openState = true;
    modal.selectedMatch = matchSelected;
    modal.loggedPlayerInMatch = PlayerIsInMatch;
    this.setState(() => {
      return { modal };
    });
  }

  toggleOpenModal() {
    let modal = Object.assign({}, this.state.modal);
    modal.openState = !this.state.modal.openState;
    this.setState(() => {
      return { modal };
    });
    //console.log(this.state);
  }

  addPlayerToTeam(e, teamAorB, matchToAdd) {
    e.preventDefault();
    this.props.addPlayer(teamAorB, matchToAdd.id);
    this.toggleOpenModal();

    //  this.showGameDetailModal(this.props.findMatch(matchToAdd.id), true);
  }

  
  componentWillMount() {
   
  }
  componentDidMount() {}

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        
        <div className="ibox-title">
          <h5 />

          <span className="badge badge-light pull-right">
            {this.props.dayMatchs.dateMatchs}
          </span>
        </div>
        <div className="ibox-content">
          <ul className="list-group ">
            {this.props.dayMatchs.matchs.map((match, index) => (
              <GameRow
                key={match.id}
                match={match}
                openGameDetailModal={this.showGameDetailModal}
                playerLoggedIn={this.props.playerLoggedIn}
              />
            ))}
          </ul>
        </div>
        {this.state.modal.openState && (
          <TeamsModal
            modalVisibility={this.state.modal.openState}
            matchToShow={this.state.modal.selectedMatch}
            toggleOpenModal={this.toggleOpenModal}
            imInMatch={this.state.modal.loggedPlayerInMatch}
            onClick={this.addPlayerToTeam}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    playerLoggedIn: state.player,
    findMatch: id => state.matchs.filter(match => match.id === id)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPlayer: (team, match) => dispatch(addPlayer(team, match))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamesListOfDay);
