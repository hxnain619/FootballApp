import React from "react";
import { connect } from "react-redux";

class PlayerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.playerLevel = { width: `${this.props.player.level}%` };
  }

  componentDidMount() {
    console.log("player logged in :" + JSON.stringify(this.props.player));
  }

  render() {
    return (
      <div className="ibox float-e-margins">
        <div className="ibox-content text-center">
          <h1>{this.props.player.name}</h1>
          <br />
          <div className="m-b-sm">
            <img
              alt="image"
              className="img-circle"
              src={this.props.player.imgSrc}
            />
          </div>
          <br />
          <p className="font-bold">{this.props.player.position}</p>
          <br />
          <div className="text-center">
            <a className="btn btn-xs btn-white">
              <i className="fa fa-thumbs-up" /> Follow{" "}
            </a>
          </div>
          <div>
            <div>
              <br />
              <span>Level</span>
              <small className="pull-right">
                {this.props.player.level}/100
              </small>
            </div>
            <div className="progress progress-small">
              <div style={this.playerLevel} className="progress-bar" />
            </div>
            <br />
            <div>
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <span className="badge badge-secondary">
                        Total games: 65
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="badge badge-secondary">
                        Total MVPs: 12
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="badge badge-warning">Scheduled: 03</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    player: state.player
  };
};

export default connect(mapStateToProps)(PlayerProfile);
