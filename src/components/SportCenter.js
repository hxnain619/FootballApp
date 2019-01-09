import React from "react";

export default class SportCenter extends React.Component {
  constructor(props) {
    super(props);
    this.goToGameDetailsTab = this.goToGameDetailsTab.bind(this);
  }

  goToGameDetailsTab(e) {
    e.preventDefault();
    this.props.onclick(this.props.sportCenter);
  }

  render() {
    return (
      <a
        href="#"
        className="list-group-item text-center"
        onClick={this.goToGameDetailsTab}
      >
        <li
          className="list-group-item d-flex justify-content-between align-items-center list-group-item-action "
          data-namecenter={`${this.props.sportCenter.name}--ID--${
            this.props.sportCenter.id
          }`}
        >
          <div className="text-center">
            <br />
            <b>Sport Center : </b>
            {this.props.sportCenter.name}
            <br />
            <b>Location : </b>
            {this.props.sportCenter.location}
          </div>
          <div className="text-center">
            <br />
            <b> Pitches :</b>
            {this.props.sportCenter.typePitch.map((el, ind) => (
              <span className="badge badge-lgreen badge-pill" key={ind}>
                {" " + el + " "}{" "}
              </span>
            ))}
            <br />
            <b> Type :</b>
            {this.props.sportCenter.typePitchStructure.map((el, ind) => {
              let result = " ";
              result += el;
              if (!ind === this.props.sportCenter.typePitchStructure.length - 1)
                result += " •";
              return result;
            })}
          </div>
        </li>
      </a>
    );
  }
}
