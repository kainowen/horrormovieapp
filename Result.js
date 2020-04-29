import React from 'react';
import Dropdown from "./Dropdown"
import classes from "../Results.module.css"

const Result = (props) => {

    const seeMore = props.seeMore;
    let container = ["Container", classes.Transition];
    let text = "";
    if (seeMore){
        container = ["Container", classes.Transition, classes.SeeMore];
          text = "see less";
    }else{
        container = ["Container", classes.Transition, classes.SeeLess];
          text = "see more";
    }

    container = container.join(" ");
    return (
      <div>
        <div className={container}>
          <hr/>
          <div>
              <img className={classes.ResultImg} src={props.poster} alt="/" />
              <h2> {props.title}</h2>
              <div className="Row">
                  <p style={{marginBottom: "0"}}> Year: <br className={classes.HideOnLarge} />{props.year}</p>
                  <p style={{marginBottom: "0"}}> Nature: <br className={classes.HideOnLarge} />{props.nature}</p>
                  <p style={{marginBottom: "0"}}> Rating: <br className={classes.HideOnLarge} />{props.iMDBrating}</p>
              </div>
              <p> Themes: {props.themes}</p>
          </div>
          <p>{props.plot}</p>
      </div>
        <Dropdown clicked={props.clicked}> {text} </Dropdown>
    </div>)

};

export default Result;
