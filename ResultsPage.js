import React from 'react';
import ResultsBrief from "../ResultBrief"
import classes from "../Results.module.css"

const ResultsPage = (props) => {

  let movieResultsList = null;
  movieResultsList = props.list.map((movie) => {
      return <ResultsBrief
          key={movie.tmdbID}
          title={movie.title}
          nature={movie.nature}
          themes={movie.themes}
          tmdbID={movie.tmdbID} />;
  })

  let prevClass = [classes.Nav, classes.Prev]
  if(props.pageNo === 1){
    prevClass.push(classes.Hide);
  }
  prevClass = prevClass.join(" ")
    return (
        <div>
          <div className="Container">
              <p className={prevClass} onClick={props.clickedDown}>previous</p>
              <p className={[classes.Nav, classes.Next].join(" ")} onClick={props.clickedUp}>next</p>
          </div>
          {movieResultsList}
          <div className="Container">
              <p className={prevClass} onClick={props.clickedDown} style={{marginRight: "0"}}>previous</p>
              <p className={[classes.Nav, classes.Next].join(" ")} onClick={props.clickedUp}>next</p>
          </div>
        </div>
    )
};

export default ResultsPage;
