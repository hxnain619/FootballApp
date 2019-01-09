import React from "react";
import CreateAgame from "./CreateAgame";
import PlayerProfile from "./PlayerProfile";
import { startLogout } from "../actions/auth";
import { connect } from "react-redux";
const { Consumer } = React.createContext({});

class DashboardJoinGame extends React.Component {
  constructor(props) {
    super(props);
    this.goToCreateGame = this.goToCreateGame.bind(this);
  }
  goToCreateGame() {
    this.props.history.push("/dashboard");
  }

  render() {
    return (
      <React.Fragment>
        <div className="row border-bottom">
          <nav
            className="navbar navbar-static-top"
            role="navigation"
            style={{ marginBottom: 0 }}
          >
            <div className="navbar-header">
              <a
                className="navbar-minimalize minimalize-styl-2 btn btn-primary "
                href="#"
              >
                <i className="fa fa-bars" />
              </a>
              <form
                role="search"
                className="navbar-form-custom"
                action="search_results.html"
              >
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Search for something..."
                    className="form-control"
                    name="top-search"
                    id="top-search"
                  />
                </div>
              </form>
            </div>
            <ul className="nav navbar-top-links navbar-right">
              <li>
                <a onClick={this.props.startLogout}>
                  <i className="fa fa-sign-out" /> Log out
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="wrapper wrapper-content">
              <div className="row">
                <div className="col-lg-8">
                  <div className="ibox-title">
                    <button onClick={this.goToCreateGame}>
                      <span className="badge badge-light pull-left">
                        Join a Game
                      </span>
                    </button>
                  </div>
                  <div id="games-list" />
                  {/* list Games or create a game */}

                  <CreateAgame />
                </div>
                <div className="col-lg-4">
                  <div
                    className="ibox-content text-center"
                    id="player-profile"
                  />

                  {/* player profile */}

                  <PlayerProfile />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(
  undefined,
  mapDispatchToProps
)(DashboardJoinGame);
