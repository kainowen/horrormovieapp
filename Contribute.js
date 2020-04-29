import React, {Component} from "react";
import classes from "./Contribute.module.css"
import firebase from "./../../firebase";
import Alerts from "./Alerts/Alerts"

class Contribute extends Component {

    state = {
        movieAdd: {
            movieYear: "",
            movieThemes: "",
            movieNature: "",
            movieID: 0,
            movieRemake: false
        },
        year: "",
        submit: false,
        entry: {},
        linkAdded: false,
        alerts: ""
    };

    changeEventHandler = (event) =>{
        const updatedState = {...this.state.movieAdd};
        if (event.target.id === "movieID"){
          let tmdbID = event.target.value;
          tmdbID = tmdbID.split("/movie/").pop().split("-").shift();
          tmdbID = parseInt(tmdbID);
          updatedState[event.target.id] = tmdbID;
          this.setState({
            movieAdd: updatedState,
            submit: false});
          if(event.target.value === ""){
            this.setState({
              linkAdded: false});
          }
        }

        if(event.target.id === "movieRemake"){
            const checked = event.target.checked;
            updatedState[event.target.id] = checked;
            this.setState({movieAdd: updatedState});
        }
        if(event.target.id === "movieNature" || event.target.id === "movieThemes") {
            updatedState[event.target.id] = event.target.value.toLowerCase();
            this.setState({movieAdd: updatedState});
        }
    };

    submitEventHandler = (event) => {
        event.preventDefault();
        if(this.state.movieAdd.movieNature === "" || this.state.movieAdd.movieThemes === "" ){
          this.setState({
            alerts: 'Please fill all the fields to submit'
          })
        } else {
          const entryState = {...this.state.entry};
          const title = Object.keys(entryState);
          const nature = this.state.movieAdd.movieNature;
          let themes = this.state.movieAdd.movieThemes.split(", ");
          let themesObj = {};
          themes.forEach((item) => {
              themesObj = {...themesObj, [item]: true};
          });
          entryState[title].nature = nature;
          entryState[title].themes = themesObj;

          this.setState({
            entry: entryState,
            submit: true
          })
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.movieAdd.movieID !== this.state.movieAdd.movieID){
            let movID = this.state.movieAdd.movieID;
            const tmdbURL = "https://api.themoviedb.org/3/movie/"+movID+"?api_key=" + //<Your API Key>;
            fetch(tmdbURL).then(async response => {
                if(response.status === 200){
                    let movState = {...this.state.movieAdd};
                    const data = await response.json();
                    let title = data.title.replace(/[^\w\s]/gi, '');
                    const rating = data.vote_average;
                    let decade = null;
                    if(data.release_date !== undefined){
                        decade = data.release_date.split("-").shift().split("");
                        decade[3] = "0";
                        decade = decade.join("");
                    }
                    let entry = {
                            [title]:{
                            orderRating: rating,
                            tmdbID: this.state.movieAdd.movieID,
                            nature: "",
                            themes:{}
                            }
                    };
                    movState.movieYear = decade;

                    this.setState({
                        year: data.release_date.split("-").shift(),
                        movieAdd: movState,
                        entry: entry,
                        linkAdded: true
                    });
                  } else {

                  }
            })
        }
        if(prevState.movieAdd.movieRemake !== this.state.movieAdd.movieRemake){
            if(this.state.movieAdd.movieRemake){
                const title = Object.keys(this.state.entry)[0];
                const year = this.state.year;
                const newTitle = title + " ("+year+")";
                let entryUpdate = {...this.state.entry};
                let newEntry ={
                      [newTitle]:entryUpdate[title]
                }
                this.setState({
                    entry: newEntry
                });
            } else {
                const title = Object.keys(this.state.entry)[0];
                const newTitle = title.split(" (").shift();
                let entryUpdate = {...this.state.entry};
                let newEntry ={
                      [newTitle]:entryUpdate[title]
                }
                this.setState({
                    entry: newEntry
                });
            }
        }
        if(prevState.submit !== this.state.submit){
          if(this.state.submit){
            let movTitle = Object.keys(this.state.entry)[0];
            if(this.state.entry[movTitle].nature !== "" && Object.keys(this.state.entry[movTitle].themes).length > 0){
                let rootRef = firebase.database().ref(this.state.movieAdd.movieYear).child(movTitle);
                let movieRef = firebase.database().ref("movies").child(movTitle);
                rootRef.on("value", snapshot =>{
                  if (snapshot.val() === null){
                    rootRef.set(this.state.entry[movTitle]);
                    movieRef.set(this.state.entry[movTitle]);
                    this.setState({
                      submit: false,
                      alerts: 'Thanks for adding '+ movTitle +' to our database'
                    })
                  } else {
                    this.setState({
                      submit: false,
                      alerts: 'Thanks, but we already have '+ movTitle +' in our database'
                    })
                  }
                })
            }
          }
        }
    }

    render() {
      let form2 = null;
      let movTitle = Object.keys(this.state.entry);
      if(this.state.linkAdded){
        form2 =
              <div style={{width: "100%"}}>
                <h4> {movTitle}</h4>
                    <p>Decade: {this.state.movieAdd.movieYear}'s</p>
                    <p>Rating: {this.state.entry[movTitle].orderRating}</p>
                <label> is this movie a remake?
                    <input id="movieRemake" name="movieRemake" type="checkbox" onChange={this.changeEventHandler} />
                </label>
                <label className={classes.InputShell}> nature:
                    <input id="movieNature" name="movieNature" type="text" placeholder="supernatural" className={classes.InputStyle} onChange={this.changeEventHandler} />
                </label>
                <label className={classes.InputShell}> themes:
                    <input id="movieThemes" name="movieThemes" type="text" placeholder="zombie, isolation" className={classes.InputStyle} onChange={this.changeEventHandler} />
                </label>
                <label className={classes.InputShell}> TMDb link:
                    <input id="submit" name="submit" type="submit" className={classes.InputStyle} onClick={this.submitEventHandler} />
                </label>
              </div>;
      }
      let alerts = null;
      if(this.state.alerts !== ""){
        alerts = <Alerts alerts={this.state.alerts} />
      }
        return (
        <div>
            <h4> Fill in the details below to add a movie</h4>
            <form className={classes.FormShell} id="myForm">
                {alerts}
                <label className={classes.InputShell}> TMDb link:
                    <input id="movieID" name="movieID" type="url" placeholder="eg. https://www.themoviedb.org/movie/10331-night-of-the-living-dead?language=en-US" className={classes.InputStyle} onChange={this.changeEventHandler} />
                </label>
                {form2}
            </form>
        </div>
        )}

}

export default Contribute;
