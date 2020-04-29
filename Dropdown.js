import React from 'react';
import classes from "../Results.module.css"

const Dropdown = (props) => {

    let footer =["Container", classes.Footer];
    footer = footer.join(" ")

    let returnText = props.children
    let clicked = props.clicked

    return (
      <div className={footer} onClick={clicked}> {returnText} </div>
    )
};

export default Dropdown;
