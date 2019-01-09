import React from "react";
import { connect } from "react-redux";
import { isDescendant } from "./../utils/formValidation";

class GameDetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateMatch: "",
      timeMatch: "",
      costMatch: 6,
      typeOfGame: 5,
      buttonDisabled: false
    };
    this.createNewMatch = this.createNewMatch.bind(this);
    this.onInputFieldChange = this.onInputFieldChange.bind(this);
    this.onInputFieldBlur = this.onInputFieldBlur.bind(this);
  }

  onInputFieldChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  onInputFieldBlur(e) {
    e.preventDefault();
    console.log("blur");
    const { costMatch, dateMatch, timeMatch, typeOfGame } = this.state;

    if (!timeMatch) {
      let errorSpan = document.createElement("span");
      errorSpan.innerHTML = "This field is required";
      errorSpan.style.color = "red";
      console.log("empty");

      const timeMatch = document.getElementById("timeMatch");
      const timeMatchParent = timeMatch.parentElement;
      if (!isDescendant(timeMatchParent, errorSpan)) {
        console.log("yes");
        return;
      }
      timeMatchParent.append(errorSpan);
    }
  }

  createNewMatch(e) {
    e.preventDefault();

    const { selectedSportCenter } = this.props;
    const dateMatch = document.getElementById("dateMatch").value;
    const timeMatch = document.getElementById("timeMatch").value;
    const costMatch = document.getElementById("costMatch").value;
    const typeOfGame = document.getElementById("typeOfGame").value;

    const newMatch = {
      matchDate: dateMatch,
      matchTime: timeMatch,
      ownerImg: this.props.playerLoggedIn.playerImg,
      sportCenter: {
        address: selectedSportCenter.location,
        city: selectedSportCenter.city,
        name: selectedSportCenter.name
      },
      typeGame: typeOfGame,
      typePitch: selectedSportCenter.typePitchStructure[0]
    };

    this.props.onClick(newMatch);
  }

  render() {
    const { typeOfGame, costMatch, timeMatch, dateMatch } = this.state;
    return (
      <center>
        <form>
          <div className="container" style={{ margin: "30px 0px" }}>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <input
                    type="hidden"
                    id="sportCenterId"
                    name="sportCenterId"
                    value={
                      this.props.selectedSportCenter &&
                      this.props.selectedSportCenter.id
                    }
                  />
                  <label>Sport Center</label>
                  <input
                    id="selectedCenter"
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={
                      this.props.selectedSportCenter &&
                      this.props.selectedSportCenter.name
                    }
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Sport</label>
                  <select
                    id="typeOfGame"
                    name="typeOfGame"
                    onChange={this.onInputFieldChange}
                    value={typeOfGame}
                    onBlur={this.onInputFieldBlur}
                    className="form-control"
                  >
                    <option value={5}>5 a side</option>
                    <option value={7}>7 a side</option>
                    <option value={11}>11 a side</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Cell Phone"
                    name="dateMatch"
                    onChange={this.onInputFieldChange}
                    onBlur={this.onInputFieldBlur}
                    value={this.state.dateMatch}
                    id="dateMatch"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    className="form-control"
                    min="9:00"
                    max="24:00"
                    id="timeMatch"
                    name="timeMatch"
                    value={this.state.timeMatch}
                    onChange={this.onInputFieldChange}
                    onBlur={this.onInputFieldBlur}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Cost per person</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder={6}
                    value={this.state.costMatch}
                    id="costMatch"
                    name="costMatch"
                    onChange={this.onInputFieldChange}
                    onBlur={this.onInputFieldBlur}
                  />
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="row d-flex justify-content-center">
              {!typeOfGame || !dateMatch || !timeMatch || !costMatch ? (
                <button
                  className="btn btn-primary btn-rounded btn-block"
                  onClick={this.createNewMatch}
                  id="createGame-btn"
                  disabled
                >
                  <i className="fa fa-check" /> Create Game
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-rounded btn-block"
                  onClick={this.createNewMatch}
                  id="createGame-btn"
                >
                  <i className="fa fa-check" /> Create Game
                </button>
              )}
            </div>
          </div>
        </form>
      </center>
    );
  }
}

const mapStateToProps = state => {
  return {
    playerLoggedIn: state.player
  };
};

/* const mapDispatchToProps = dispatch => {
  return {
    addPlayer: (team, match) => dispatch(addPlayer(team, match))
  };
}; */

export default connect(mapStateToProps)(GameDetailsForm);
