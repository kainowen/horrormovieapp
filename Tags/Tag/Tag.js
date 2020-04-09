import React from 'react';
import classes from "./Tag.module.css"

const Tag = (props) => {

    let tagClasses = [classes.Tag];


        if (props.name === props.current){
            tagClasses.push(classes.TagActive);
        }

        if(props.name !== props.current && props.current !== ""){
            tagClasses.push(classes.TagDisable);
        }

        tagClasses = tagClasses.join(" ");

    return (
        <button className={tagClasses} onClick={props.clicked}>
            {props.name}
        </button>
    )
};

export default Tag;