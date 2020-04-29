import React, {Component} from 'react';
import Result from "./Result/Result";

class Results extends Component {

        state = ({
            synopsis: {
                year:"",
                plot: "",
                rating: "",
                poster: ""
            },
            seeMore: false
        });

        seeMoreHandler = () => {
          const seeMore = this.state.seeMore;
            this.setState({
              seeMore: !seeMore
            });
        }

        componentDidMount() {
            let tmdbID = this.props.tmdbID
            const tmdbURL = "https://api.themoviedb.org/3/movie/"+tmdbID+"?api_key=" + //<Your API Key>;
            fetch(tmdbURL).then(async response => {
                const details = await response.json();
                const imgURL = "http://image.tmdb.org/t/p/w185/" + details.poster_path;
                const year = details.release_date.split("").splice(0,4).join('')
                this.setState({
                    synopsis: {
                        title: details.title,
                        year: year,
                        plot: details.overview,
                        rating: details.vote_average,
                        poster: imgURL,
                    }
                });
            })
            .catch((error => {
                console.log(error)
            }));
        }

    render() {
            let themes = Object.keys(this.props.themes);
            if(themes.length > 0){
              themes = themes.join(", ");
            return (<Result
                    title={this.state.synopsis.title}
                    year={this.state.synopsis.year}
                    nature={this.props.nature}
                    iMDBrating={this.state.synopsis.rating}
                    themes={themes}
                    rated={this.state.synopsis.rated}
                    poster={this.state.synopsis.poster}
                    plot={this.state.synopsis.plot}
                    director={this.state.synopsis.director}
                    seeMore={this.state.seeMore}
                    clicked={this.seeMoreHandler}
                />)
              } else {
                return null;
              }
        }
}

export default Results;
