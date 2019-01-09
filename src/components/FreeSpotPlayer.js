import React from "react";

export default class FreeSpotPlayer extends React.Component {
  render() {
    return (
      <tr>
        <td className="teamPlayers">
          <div className="row">
            <div className="col-md-4">
              <img
                alt="image"
                className="rounded-circle"
                src="img/default-player.png"
              />
            </div>
            <div className="col-md-8">
              <div className="row d-flex justify-content-center">
                {!this.props.imInMatch && (
                  <a
                    className={`btn btn-primary-team${
                      this.props.team
                    } btn-rounded btn-block`}
                    href="#!"
                    id="createGame-btn"
                    onClick={e => this.props.joinTeam(e, this.props.team)}
                  >
                    <i className="fa fa-check" /> Join Team {this.props.team}
                  </a>
                )}
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}
