import React from "react";
const { Consumer } = React.createContext({});
import { connect } from "react-redux";
import { startSetMatchs } from "../actions/matchsAction";
import SportCentersList from "../data/SportCentersList";
import SportCenter from "./SportCenter";
import LoadingSpinner from "./LoadingSpinner";
import GameDetailsForm from "./GameDetailsForm";
import database from "../firebase/config";
import { Redirect } from "react-router-dom";
import uuid from "uuid";

class CreateAgame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listSportCenters: {},
      selectedSportCenter: {},
      active: [true, false, false],
      showLaoder: false,
      redirectToDashboard: false
    };
    this.setActive = this.setActive.bind(this);
    this.setSelectedSportCenter = this.setSelectedSportCenter.bind(this);
    this.setSportCentersListState = this.setSportCentersListState.bind(this);
    this.createNewMatch = this.createNewMatch.bind(this);
  }

  setSportCentersListState(newList) {
    this.setState(() => {
      return { listSportCenters: newList };
    });
  }

  // fetch SportCenterList from db
  componentDidMount() {
    database.ref("SportCenters").on("value", snapshot => {
      this.setSportCentersListState(snapshot.val());
    });
  }

  setActive(e) {
    e.preventDefault();
    const clickedTab = parseInt(
      e.target.closest("a").getAttribute("data-indextab")
    );

    this.setState(prevState => {
      return {
        active: prevState.active.map((ele, index) => index === clickedTab)
      };
    });
  }

  setSelectedSportCenter(selectedSportCenter) {
    this.setState(prevState => {
      return {
        selectedSportCenter,
        active: [false, true, false]
      };
    });
  }

  createNewMatch(newMatch) {
    //loader
    // this.setState(() => {
    //   return { showLaoder: true };
    // });

    console.log("newMatch " + JSON.stringify(newMatch));
    console.log("this state " + JSON.stringify(this.state));

    var addNewMatchRef = database.ref(`matchs/`).push();

    addNewMatchRef.set(newMatch);

    this.props.startSetMatchs();
    this.setState({
      redirectToDashboard: true
    });

    // setTimeout(() => {
    //   firebaseDb
    //     .ref("matchs/")
    //     .child(1)
    //     .child("matchsOfDay")
    //     .child(uuid())
    //     .set(newMatch)
    //     .then(() => {
    //       this.setState(() => {
    //         return { showLaoder: false, active: [false, false, true] };
    //       });
    //     });
    // }, 1500);

    // insert new match in db
  }

  render() {
    return (
      <React.Fragment>
        {this.state.showLaoder && (
          <LoadingSpinner loaderVisibility={this.state.showLaoder} />
        )}
        {this.state.redirectToDashboard && <Redirect to="/dashboard" />}
        <div className="ibox float-e-margins">
          {/* tab forms */}
          <div className="ibox-content container">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-9 bhoechie-tab-container">
                  <div className="row">
                    <div className="col-lg-3 bhoechie-tab-menu">
                      <div className="list-group createGame">
                        <a
                          onClick={this.setActive}
                          data-indextab={0}
                          className={`list-group-item ${
                            this.state.active[0] ? " active " : " "
                          } text-center`}
                        >
                          <img
                            alt="image"
                            className="rounded-circle-create-game"
                            src="icons/boots.jpg"
                          />
                          <br />
                          Sport Centers
                        </a>
                        <a
                          onClick={this.setActive}
                          data-indextab={1}
                          className={`list-group-item ${
                            this.state.active[1] ? " active " : " "
                          } text-center`}
                        >
                          <img
                            alt="image"
                            className="rounded-circle-create-game"
                            src="icons/clock.jpg"
                          />
                          <br />
                          Game Details
                        </a>
                        <a
                          onClick={this.setActive}
                          data-indextab={2}
                          className={`list-group-item ${
                            this.state.active[2] ? " active " : " "
                          } text-center`}
                        >
                          <i className="fa fa-share-square-o" />
                          <br />
                          Invite / Share
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-9 bhoechie-tab">
                      {/* list of sport centers */}
                      <div
                        className={`createGameTab ${
                          this.state.active[0] ? " active " : " "
                        }`}
                        id="listSportCentersTab"
                      >
                        <div className="bhoechie-tab-content">
                          <center>
                            <ul className="list-group ">
                              {this.state.listSportCenters.length > 0 &&
                                this.state.listSportCenters.map(elem => (
                                  <SportCenter
                                    key={elem.id}
                                    sportCenter={elem}
                                    onclick={this.setSelectedSportCenter}
                                  />
                                ))}
                            </ul>
                          </center>
                        </div>
                      </div>
                      {/* first tab end */}
                      {/* second tab start */}
                      <div
                        className={`createGameTab ${
                          this.state.active[1] ? " active " : " "
                        }`}
                      >
                        <div className="bhoechie-tab-content">
                          <GameDetailsForm
                            onClick={this.createNewMatch}
                            selectedSportCenter={this.state.selectedSportCenter}
                          />
                        </div>
                      </div>
                      {/* end second tab */}
                      <div
                        className={`createGameTab ${
                          this.state.active[2] ? " active " : " "
                        }`}
                      >
                        <div className="bhoechie-tab-content">
                          <center>
                            <div className="ibox-title">
                              <h5> </h5>
                              <span className="badge badge-light pull-left">
                                Invite players
                              </span>
                              <a className="invite-all-players" href="#!">
                                <span className="badge badge-warning badge-pill pull-right">
                                  invite all followers
                                </span>
                              </a>
                            </div>
                            <div className="ibox-content">
                              <div className="sk-spinner sk-spinner-wave">
                                <div className="sk-rect1" />
                                <div className="sk-rect2" />
                                <div className="sk-rect3" />
                                <div className="sk-rect4" />
                                <div className="sk-rect5" />
                              </div>
                              <ul className="list-group ">
                                <li
                                  className="list-group-item d-flex justify-content-between align-items-center list-group-item-action "
                                  id={12}
                                >
                                  <img
                                    alt="image"
                                    className="rounded-circle"
                                    src="img/Mbappe.jpg"
                                  />
                                  <div className="text-center">
                                    Kylian Mbappe'
                                    <br />
                                  </div>
                                  <a className="invite-player" href="#!">
                                    <span className="badge badge-warning badge-pill">
                                      invite
                                    </span>
                                  </a>
                                </li>
                                <li
                                  className="list-group-item d-flex justify-content-between align-items-center list-group-item-action "
                                  id={13}
                                >
                                  <img
                                    alt="image"
                                    className="rounded-circle"
                                    src="img/Ronaldo.jpg"
                                  />
                                  <div className="text-center">
                                    Cristiano Ronaldo
                                    <br />
                                  </div>
                                  <a className="invite-player" href="#!">
                                    <span className="badge badge-warning badge-pill">
                                      invite
                                    </span>
                                  </a>
                                </li>
                                <li
                                  className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                                  id={16}
                                >
                                  <img
                                    alt="image"
                                    className="rounded-circle"
                                    src="img/pogba.jpg"
                                  />
                                  <div className="text-center">
                                    Paul Pogba'
                                    <br />
                                  </div>
                                  <a className="invite-player" href="#!">
                                    <span className="badge badge-warning badge-pill">
                                      invite
                                    </span>
                                  </a>
                                </li>
                                <li
                                  className="list-group-item d-flex justify-content-between align-items-center list-group-item-action "
                                  id={10}
                                >
                                  <img
                                    alt="image"
                                    className="rounded-circle"
                                    src="img/Beckham.jpg"
                                  />
                                  <div className="text-center">
                                    David Beckham
                                    <br />
                                  </div>
                                  <a className="invite-player" href="#!">
                                    <span className="badge badge-warning badge-pill">
                                      invite
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </center>
                        </div>
                      </div>
                      {/* end list of sport centers */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startSetMatchs: () => dispatch(startSetMatchs())
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(CreateAgame);
