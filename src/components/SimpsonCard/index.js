import React, { Component } from "react";
import "./style.css";

class SimponsCard extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleClick = props.handleClick.bind(this);

    this.state = {
      bgColor: "",
      wrong: false,
      newgame: false,
      clicked: false
    }
  }

  clickAnimation(id) {
    console.log(this.state.bgColor);

    if (!this.state.wrong) {
      this.setState({
        bgColor: "#FFD90F",
        clicked: true
      })
      setTimeout(function () {
        this.setState({
          bgColor: "#6CADDC"
        })
        this.handleClick(id)
      }.bind(this), 300);
    } else {
      this.handleClick(id)
    }
  }

  overColor() {
    if (!this.state.wrong) {
      this.setState({
        bgColor: "green"
      })
    }
  }

  leaveColor() {
    if (!this.state.wrong) {
      this.setState({
        bgColor: ""
      })
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    // this.fetchData(this.props.userID);
    if (((prevProps.bgColor === "red") || (prevProps.bgColor === "yellow")) && (this.state.wrong) && (this.props.bgColor === "")) {
      this.setState({
        bgColor: "",
        wrong: false
      })
    }

    if ((this.props.bgColor === "yellow") && (!this.state.wrong)) {
      this.setState({
        bgColor: this.props.bgColor,
        wrong: true,
        clicked: false
      })
    }

    if ((this.props.bgColor === "red") && (!this.state.wrong)) {
      if (this.state.clicked) {
        this.setState({
          bgColor: this.props.bgColor,
          wrong: true,
          clicked: false
        })
      } else {
        this.setState({
          wrong: true
        })
      }
    }
  }


  render() {
    return (
      <div className="card" onClick={() => this.clickAnimation(this.props.id)} onMouseOver={() => this.overColor()} onMouseLeave={() => this.leaveColor()}>
        <div style={{ backgroundColor: this.state.bgColor }} className="img-container">
          <img alt={this.props.name} src={this.props.image} />
        </div>
      </div>
    );
  }

}


export default SimponsCard;
