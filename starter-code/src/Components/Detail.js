import React, { Component } from "react";
import UserContext, { UserProvider } from "./UserContext";
import "../App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

class Detail extends Component {
  static contextType = UserContext;

  state = {
    detail: {},
  };

  componentDidMount() {
    const { setLoad } = this.context;
    setLoad(true);
    axios
      .get(`https://ih-beers-api2.herokuapp.com/beers/5daf440ccbc5d2fd7d19ebdd`)
      .then((res) => {
        this.setState({
          detail: res.data,
        });
        console.log();
        setLoad(false);
      });
  }

  render() {
    const { loadStatus } = this.context;
    let content = "";
    const item = this.state.detail;
    if ((loadStatus === false)) {
      content = (
        <div className="beer-container">
          <div className="beer-detail">
            <img alt={item.name} src={item.image_url} />
            <div>{item.name}</div>
            <div>{item.tagline}</div>
            <div>{item.first_brewed}</div>
            <div>{item.attenuation_level}</div>
            <div>{item.description}</div>
          </div>
        </div>
      );
    } else {
      content = (
        <div className="Loading">
          <img alt="loading" src="./images/load.gif" />
          Loading
        </div>
      );
    }

    return <div>{content} </div>;
  }
}

export default Detail;
