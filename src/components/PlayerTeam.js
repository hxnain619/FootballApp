import React from "react";
import { connect } from "react-redux";

class PlayerTeam extends React.Component {
  render() {
    return (
      <tr>
        <td className="teamPlayers">
          <div className="row">
            <div className="col-md-4">
              <img
                alt="image"
                className="rounded-circle"
                src={this.props.player.playerImg}
              />
            </div>
            <div className="col-md-8">
              <div className="text-center">
                <b>{this.props.player.name}</b>
                <br />
                {this.props.player.position}
              </div>
              {this.props.player.id !== this.props.playerLoggedId && (
                <span className="badge badge-warning ">remove</span>
              )}
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => {
  return {
    playerLoggedId: state.auth.id
  };
};

export default connect(mapStateToProps)(PlayerTeam);
