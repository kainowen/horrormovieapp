import React from 'react';
import Tag from "../Tag/Tag";
import classes from "./Tagbar.module.css";

const Tagbar = (props) => {

    let bar = [classes.Bar]
    let inner = ""
    if (props.toggle){
        bar.push(classes.SeeLess)
        inner= "hide tags";
    } else {
        bar.push(classes.SeeMore)
        inner= "show tags";
    }



    bar = bar.join(" ");
    return (
        <div className={bar}>
            <div className={"Container"}>
            <div className={classes.Box}>
                <a href="index.html"><h1> HORR-IFY </h1></a>
                  <Tag
                    name={inner}
                    current={""}
                    clicked={props.clicked}
                  />
            </div>
                <br />
                <div className={"Centered"} style={{marginBottom: "20px"}}>
                    {props.children}
                </div>
            </div>
        </div>
    )
};

export default Tagbar;
