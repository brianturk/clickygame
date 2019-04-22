import React, { Component } from "react";
import "./style.css";

class ProgressBar extends Component {


render() {
    return (
        <div className="progress-bar">
          <Filler percentage={this.props.percentage} />
        </div>
      )
}

}

const Filler = (props) => {
    return <div className="filler" style={{ width: `${props.percentage}%` }} />
  }


export default ProgressBar;