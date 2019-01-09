import React from "react";

export default class LoadingSpinner extends React.Component {
  constructor(props) {
    super(props);
    this.loaderVisibility = {
      display: this.props.loaderVisibility ? "block" : "none"
    };
  }

  render() {
    return (
      <div className="loading" style={this.loaderVisibility}>
        Loading&#8230;
      </div>
    );
  }
}
