import React from "react";

const ResultHeader =(props) => {

    let message = "";

    if (props.search.decade === "" && props.search.nature === "" && props.search.rating === "" && props.search.theme.length <= 0){
        message = "Top rated horror movies on TMDb";
    } else {
        message = "Search results for ";

        if (props.search.nature !== ""){
            message = message + props.search.nature;
        }

        message = message + " horror movie";

        if (props.search.decade !== ""){
            message = message +" from the " + props.search.decade +"'s";
        }

        if (props.search.rating !== ""){
            message = message +" rated " + props.search.rating + " stars";
        }

        if (props.search.theme.length > 0){
            message = message +" with the following themes: \n "+ props.search.theme.join(", ");
        }


    }

    return <h4 style={{margin: '30px 0 0 0'}} >{message} </h4>
};

export default ResultHeader;
