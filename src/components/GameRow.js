import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import { isPlayerIn } from "../utils/PlayerHelper";

export default class GameRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLaoder: false
    };
    this.openGameDetailModal = this.openGameDetailModal.bind(this);

    this.myMatch = this.myMatch.bind(this);
  }

  /*  playersTeamA = this.props.match.hasOwnProperty("teamA")
    ? this.props.match.teamA.length
    : 0;
  playersTeamB = this.props.match.hasOwnProperty("teamB")
    ? this.props.match.teamB.length
    : 0;
  totatFreeSpots =
    this.props.match.typeGame * 2 - (this.playersTeamA + this.playersTeamB); */

  totFreeSpots() {
    var playersTeamA = this.props.match.hasOwnProperty("teamA")
      ? this.props.match.teamA.length
      : 0;
    var playersTeamB = this.props.match.hasOwnProperty("teamB")
      ? this.props.match.teamB.length
      : 0;
    var totatFreeSpots =
      this.props.match.typeGame * 2 - (playersTeamA + playersTeamB);
    return totatFreeSpots;
  }

  openGameDetailModal(e) {
    //console.log(e.target.closest("a").id);
    // console.log(this.props.match.id);
    e.preventDefault();
    this.setState(() => {
      return { showLaoder: true };
    });

    //simulate db data fetching
    setTimeout(() => {
      this.setState(() => {
        return { showLaoder: false };
      });
      this.props.openGameDetailModal(this.props.match, this.myMatch());
    }, 1500);
  }
  myMatch() {
    // return true if current logged user is in the match
    var emptyPlayers = [];
    var playersTeamA = this.props.match.hasOwnProperty("teamA")
      ? this.props.match.teamA
      : emptyPlayers;
    var playersTeamB = this.props.match.hasOwnProperty("teamB")
      ? this.props.match.teamB
      : emptyPlayers;
    return (
      isPlayerIn(playersTeamA, this.props.playerLoggedIn.id) ||
      isPlayerIn(playersTeamB, this.props.playerLoggedIn.id)
    );
  }

  render() {
    console.log("props in game row ", this.props.match);
    return (
      <React.Fragment>
        {this.state.showLaoder && (
          <LoadingSpinner loaderVisibility={this.state.showLaoder} />
        )}
        <a
          href="#!"
          className="list-group-item text-center"
          data-toggle="modal"
          data-target="#exampleModal"
          id={this.props.match.id}
          onClick={this.openGameDetailModal}
        >
          <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-action ">
            <img
              alt="image"
              className="rounded-circle"
              src={this.props.match.ownerImg}
            />
            <div className="text-center">
              <b>
                {this.props.match.typeGame}-a-side Football •{" "}
                {this.props.match.typePitch}
              </b>
              <br />
              {this.props.match.sportCenter &&
                this.props.match.sportCenter.name}{" "}
              • 3.5£
              <br />
              {this.props.match.matchTime}
            </div>
            <div>
              {this.myMatch() && (
                <span className="badge badge-warning">i'm in</span>
              )}{" "}
              <span className="badge badge-warning badge-pill">
                {this.totFreeSpots()}
              </span>
            </div>
          </li>
        </a>
      </React.Fragment>
    );
  }
}
