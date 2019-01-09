import React from "react";
import PlayerTeam from "./PlayerTeam";
import FreeSpotPlayer from "./FreeSpotPlayer";
import uuid from "uuid";

export default class TeamsModal extends React.Component {
  constructor(props) {
    super(props);

    /*  if (!Array.isArray(teamAPlayersObj)) {
      teamAPlayersObj = Object.keys(teamAPlayersObj).map(function(key) {
        return teamAPlayersObj[key];
      });
    }

    if (!Array.isArray(teamBPlayersObj)) {
      teamBPlayersObj = Object.keys(teamBPlayersObj).map(function(key) {
        return teamBPlayersObj[key];
      });
    } */

    this.modalVisibility = {
      display: this.props.modalVisibility ? "block" : "none",
      paddingRight: "17px",
      backgroundColor: "rgba(0,0,0,0.4)"
    };
  }

  teamAPlayers() {
    var emptyPlayers = [];
    var teamAPlayersObj = this.props.matchToShow.hasOwnProperty("teamA")
      ? this.props.matchToShow.teamA
      : emptyPlayers;
    return teamAPlayersObj;
  }

  teamBPlayers() {
    var emptyPlayers = [];
    var teamBPlayersObj = this.props.matchToShow.hasOwnProperty("teamB")
      ? this.props.matchToShow.teamB
      : emptyPlayers;
    return teamBPlayersObj;
  }
  freeSpotsTeamA() {
    return this.props.matchToShow.typeGame - this.teamAPlayers().length;
  }
  freeSpotsTeamB() {
    return this.props.matchToShow.typeGame - this.teamBPlayers().length;
  }

  randomKey() {
    return uuid();
  }

  render() {
    return (
      <div
        className="modal show"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        style={this.modalVisibility}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Game's detail </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span onClick={this.props.toggleOpenModal} aria-hidden="true">
                  ×
                </span>
              </button>
            </div>
            <div
              className="modal-body"
              style={{ height: "60%", overflowX: "hidden" }}
            >
              <div className="row">
                <div className="col-lg-8">
                  <b>Sport Center : </b>
                  {this.props.matchToShow.sportCenter.name}
                  <br />
                  <b>Location : </b>{" "}
                  {this.props.matchToShow.sportCenter.address}
                </div>
                <div className="col-lg-4">
                  <span className="badge badge-light pull-right">
                    Thursday, 06 December
                  </span>{" "}
                  <br />
                  <span className="badge badge-light pull-right">18:30</span>
                </div>
              </div>
              {/* content goes here */}
              <div className="row">
                <div className="col-md-6">
                  <div className="ibox-content text-center">
                    <div className="m-b-sm">
                      <img
                        alt="image"
                        className="img-circle"
                        src="img/teams/team-1.png"
                      />
                    </div>
                    <br />
                    <span className="badge badge-light ">Team A</span>
                    <br />
                    <div>
                      <div>
                        <br />
                        <span>Level</span>
                        <small className="pull-right">65/100</small>
                      </div>
                      <div className="progress progress-small">
                        <div
                          style={{ width: "65%" }}
                          className="progress-bar"
                        />
                      </div>
                      <br />
                      <div>
                        <table className="table">
                          <tbody>
                            {/* render players team A*/}
                            {this.teamAPlayers().map(player => (
                              <PlayerTeam player={player} key={player.userId} />
                            ))}
                            {/* render free spots team A*/}
                            {this.freeSpotsTeamA() > 0 &&
                              [...Array(this.freeSpotsTeamA())].map((e, i) => (
                                <FreeSpotPlayer
                                  imInMatch={this.props.imInMatch}
                                  key={"freeSpot" + i}
                                  team={"A"}
                                  joinTeam={e => {
                                    this.props.onClick(
                                      e,
                                      "A",
                                      this.props.matchToShow
                                    );
                                  }}
                                />
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="ibox-content text-center">
                    <div className="m-b-sm">
                      <img
                        alt="image"
                        className="img-circle"
                        src="img/teams/team-2.png"
                      />
                    </div>
                    <br />
                    <span className="badge badge-dark ">Team B</span>
                    <br />
                    <div>
                      <div>
                        <br />
                        <span>Level</span>
                        <small className="pull-right">74/100</small>
                      </div>
                      <div className="progress progress-small">
                        <div
                          style={{ width: "74%" }}
                          className="progress-bar"
                        />
                      </div>
                      <br />
                      <div>
                        <table className="table">
                          <tbody>
                            {/* render players team B */}
                            {this.teamBPlayers().map(player => (
                              <PlayerTeam
                                player={player}
                                key={player.id}
                                imInMatch={this.props.imInMatch}
                              />
                            ))}
                            {/* render free spots team B*/}
                            {this.freeSpotsTeamB() > 0 &&
                              [...Array(this.freeSpotsTeamB())].map((e, i) => (
                                <FreeSpotPlayer
                                  imInMatch={this.props.imInMatch}
                                  key={"freeSpot" + i}
                                  team={"B"}
                                  joinTeam={e => {
                                    this.props.onClick(
                                      e,
                                      "B",
                                      this.props.matchToShow
                                    );
                                  }}
                                />
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* content goes here end */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
