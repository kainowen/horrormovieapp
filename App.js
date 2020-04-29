import React, {Component} from 'react';
import './App.css';
import Tag from "./components/Tags/Tag/Tag";
import ResultsPage from "./components/ResultBrief/ResultsPage/ResultsPage";
import ResultHeader from "./components/ResultHeader/ResultHeader";
import Contribute from "./components/Contribute/Contribute";
import Tagbar from "./components/Tags/TagBar/Tagbar";
import firebase from "./firebase";
import Footer from "./components/Footer/Footer"

class App extends Component {

    state = ({
            search: {
                decade: "",
                nature: "",
                theme: []
            },
            movieList: [],
            oldMovieList: [],
            searchError: false,
            heightToggle: false,
            pageNo: 1

    });

    componentDidMount() {
        const rootRef = firebase.database().ref('movies').orderByChild("orderRating");
        rootRef.on("value", snapshot => {
            if (snapshot.val() !== undefined && snapshot.val() !== null) {
                const movies = snapshot.val();
                const titles = Object.keys(movies);
                let movList = [];
                titles.forEach(function (title) {
                    const movie = movies[title];
                    const mov = {
                        decade: movie.decade,
                        nature: movie.nature,
                        rating: movie.rating,
                        themes: movie.themes,
                        orderRating: movie.orderRating,
                        tmdbID: movie.tmdbID
                    };
                    movList.push(mov);
                });

                movList.sort(function (a, b) {
                    return a.orderRating - b.orderRating
                });
                movList.reverse();
                this.setState({
                    movieList: movList,
                    oldMovieList: movList
                });
            }
        })
    }

    heightTiggleHandler = () => {
      const heightToggle = this.state.heightToggle;
        this.setState({
          heightToggle: !heightToggle
        });
    }

    TagSelectHandler = (tag, tagKey) => {
        let updatedState = {...this.state.search};
       if(tagKey !== "theme" && tag !== updatedState[tagKey]) {
          updatedState[tagKey] = tag;
      } else if (tagKey !== "theme" && tag === updatedState[tagKey]) {
          updatedState[tagKey] = "";
      } else if (tagKey === "theme" && !this.state.search.theme.includes(tag)) {
           updatedState.theme.push(tag);
           updatedState.theme = [...updatedState.theme];
      } else if (tagKey === "theme" && this.state.search.theme.includes(tag)) {
          updatedState.theme = updatedState.theme.filter(function(value ){
              return value !== tag;
          });
      }
        this.setState({
            search: updatedState });
    };

    tagsArray = () => {
        const tags = {
            decade: ["1920", "1930", "1940", "1950", "1960", "1970", "1980", "1990", "2000", "2010", "2020"],
            nature: ["natural", "supernatural", "ambiguous"],
            theme: ["slasher", "zombie", "haunting", "possession", "demon", "occult", "mystery", "sci-fi", "psychological", "vampire", "comedy", "mad scientist", "redneck",
            "monster", "fantasy", "home invasion", "historic", "animated", "crime", "torture porn", "campy", "holiday", "invasion", "isolation", "body horror", "sexual",
            "pandemic", "psycho-biddy", "werewolf", "hostage", "gothic", "japanese", "kaiju", "giallo", "italian", "spanish", "time travel", "obsession", "religion", "splatter",
          "disaster", "cannibal", "french", "musical", "shark", "ballet", "catholicism", "german", "apocalypse", "short", "surreal", "revenge", "identity", "hitchcock", "stephen king",
          "folk", "teen", "cabin in the woods", "conspracy", "devil", "hp lovecraft", "poltergeist", "anthology", "mockumentary", "korean", "ultraviolence", "creepy kids", "artsy", "clown",
          "paranoia", "vacation", "psychic", "punk", "female lead", "low budget", "serial killer"]};
        tags.theme.sort();
        const element = [];
        for (let tagsNames in tags){
             element.push(tags[tagsNames].map((tagName) => {
                return (
                    <Tag
                        key={tagName}
                        name={tagName}
                        clicked={this.TagSelectHandler.bind(this, tagName, tagsNames)}
                        current={this.state.search[tagsNames]}
                    />
                )
            }));
        }
        return element;
    };

    pageHandler = (change) => {
        let page = this.state.pageNo;
        page = page + change;
            this.setState({
                pageNo:page
            })
      }

    componentDidUpdate(prevProps, prevState, SS) {
         if (prevState.search !== this.state.search) {

             this.setState({
                 searchError: false
             });

             let rootRef = firebase.database().ref('movies').orderByChild("orderRating");
             if (this.state.search.decade !== "" && this.state.search.nature === "") {
                 rootRef = firebase.database().ref(this.state.search.decade);
             } else  if (this.state.search.decade !== "" && this.state.search.nature !== "") {
                 rootRef = firebase.database().ref(this.state.search.decade).orderByChild("nature").equalTo(this.state.search.nature);
             } else  if (this.state.search.decade === "" && this.state.search.nature !== "") {
                 rootRef = firebase.database().ref('movies').orderByChild("nature").equalTo(this.state.search.nature);
             }

             rootRef.on("value", snapshot => {
                 if (snapshot.val() !== undefined && snapshot.val() !== null) {
                     const movies = snapshot.val();
                     const titles = Object.keys(movies);
                     let movList = [];
                     titles.forEach(function (title) {
                         const movie = movies[title];
                         const mov = {
                             nature: movie.nature,
                             themes: movie.themes,
                             orderRating: movie.orderRating,
                             tmdbID: movie.tmdbID
                         };
                         movList.push(mov);
                     });

                     movList.sort(function (a, b) {
                         return a.orderRating - b.orderRating
                     });
                     movList.reverse();
                     this.setState({
                         movieList: movList,
                         oldMovieList: movList
                     });
                 } else {
                     this.setState({
                         searchError: true
                     })
                 }
             })
         }

        if(prevState.search.theme !== this.state.search.theme) {
           if (this.state.search.theme.length > 0) {
             const filterList = [...this.state.oldMovieList];
             const targetLength = this.state.search.theme.length;
             const filteredList = filterList.filter((movie) => {
               const themes = Object.keys(movie.themes);
                let matches = 0;
                let val = false;
                this.state.search.theme.forEach(theme => {
                  if(themes.includes(theme)){
                    matches = matches + 1;
                  }
                })
                if(matches === targetLength){
                   val = true;
                }
                return val;
             })
           this.setState({
               movieList: filteredList
           });
       } else {
           this.setState({
               movieList: this.state.oldMovieList
           });
       }
     }
   }


    render() {
        let pageContent = [...this.state.movieList];
        pageContent = pageContent.slice(0 + (25 * (this.state.pageNo -1)) , 25 + (25 * (this.state.pageNo -1)));
        let movieResultsList;
        if(!this.state.searchError) {
            movieResultsList = <ResultsPage
                                          list={pageContent}
                                          clickedUp={() => this.pageHandler(+1)}
                                          clickedDown={() => this.pageHandler(-1)}
                                          pageNo={this.state.pageNo}
                                          />;
        } else{
            movieResultsList = <p className="Container"> A movie matching these tags does not exist... It is now your responsibility to make it.</p>
        }
        return (
        <div>
          <Tagbar
              toggle={this.state.heightToggle}
              clicked={this.heightTiggleHandler}
            > {this.tagsArray()}
            </Tagbar>
            <div className="Container Centered">
                <ResultHeader search={this.state.search} />
            </div>
            {movieResultsList}
            <div className="Container Centered">
                <hr />
                <p>Know of any movies we don't have listed?</p>
                <Contribute />
            </div>
            <Footer />
        </div>
    );
  }
}

export default App;
