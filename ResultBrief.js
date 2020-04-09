import React, {Component} from 'react';
import classes from "./Results.module.css"
import axios from "axios"

class Results extends Component {

        state = ({
            synopsis: {
                year:"",
                plot: "",
                rated: "",
                rating: "",
                poster: "",
                director: ""
            }
        });

        componentDidMount() {
            let queryString = this.props.title.replace(/\s/g, '+');

                if(this.props.title.includes("(")){
                    const queryStringAppend = queryString.split("").slice(-5, -1).join("");
                    const queryTitle = queryString.split("").slice(0, -7).join("");
                    queryString = queryTitle + "&y=" + queryStringAppend;
                }

            const query = "http://www.omdbapi.com/?apikey=532f8f90&t=" + queryString;
            axios.get(query)
                .then(response => {
                    const details  = response.data;
                    this.setState({
                        synopsis: {
                            year: details.Year,
                            plot: details.Plot,
                            rated: details.Rated,
                            rating: details.imdbRating,
                            poster: details.Poster,
                            director: details.Director
                        }
                    });
                })
                .catch((error => {
                console.log(error)
            }));

        }

    render() {
            return (
                <div className={classes.Container}>
                    <hr/>
                    <h2> {this.props.title}</h2>
                    <div className={classes.Row}>
                            <p> Year: {this.state.synopsis.year}</p>
                            <p> Nature: {this.props.nature}</p>
                            <p> IMDb rating: {this.state.synopsis.rating}</p>
                            <p> Themes: {this.props.themes}</p>
                            <p> Rated: {this.state.synopsis.rated}</p>
                    </div>
                    <div className={classes.Row}>
                        <img src={this.state.synopsis.poster} alt="/" />
                        <div>
                            <p> {this.state.synopsis.plot}</p>
                            <p> Directed By: {this.state.synopsis.director}</p>
                        </div>
                    </div>


                </div>)
        }
}

export default Results;