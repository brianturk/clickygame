import React, { Component } from 'react';
import SimpsonsCard from './components/SimpsonCard';
import simpsons from "./simpsons.json";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      topScore: 0,
      simpsons: [],
      selected: [],
      bgColor: "",
      newGame: false
    };

    this.playHaha = () => {
      this.haha.play();
    }

    this.playSimpsonsIntro = () => {
      this.simpsonsIntro.play();
    }
  }

  componentDidMount() {
    this.setState({
      simpsons: this.shuffleArray(simpsons)
    });

    this.playSimpsonsIntro()
  }


  handleClick = (id) => {

    if (this.state.newGame) {
      this.playSimpsonsIntro()

      if (this.state.score > this.state.topScore) {
        this.setState({
          topScore: this.state.score
        });
      }

      this.setState({
        bgColor: "",
        newGame: false,
        selected: [],
        simpsons: this.shuffleArray(simpsons),
        score: 0
      });
    } else {
      const newSelected = this.state.selected.filter(value => value !== id);

      if (this.state.selected.length === newSelected.length) {
        this.state.selected.push(id)
        this.setState({
          score: this.state.score + 1
        });

        this.setState({
          simpsons: this.shuffleArray(simpsons)
        });
      } else {
        //they messed up
        this.setState({
          bgColor: "red",
          newGame: true
        });

        this.playHaha()

      }
    }
  }

  shuffleArray(arra1) {
    var ctr = arra1.length, temp, index;

    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
  }




  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navSimpson mb-3">
          <div className="container">
            <span className="navbar-brand navSimpsonBrand" href="#">Simpson's Clicky Game</span>

            <ul className="navbar-nav">
              <li className="nav-item">
                <span className="scoreSimpsons">
                  Score <span className="scoreBlack">{this.state.score}</span>Top Score<span className="scoreBlack">{this.state.topScore}</span>
                </span>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {this.state.simpsons.map(simpson => (
                <SimpsonsCard
                  handleClick={this.handleClick}
                  image={simpson.image}
                  id={simpson.id}
                  key={simpson.id}
                  name={simpson.name}
                  bgColor={this.state.bgColor}
                  newgame={this.state.newGame}
                />
              ))}
            </div>
          </div>
        </div>

        <audio ref={(haha) => { this.haha = haha; }}>
          <source src="./assets/sound/haha.wav" type="audio/mpeg" >
          </source>
        </audio>
        <audio ref={(simpsonsIntro) => { this.simpsonsIntro = simpsonsIntro; }}>
          <source src="./assets/sound/theSimpsonsIntro.wav" type="audio/mpeg" >
          </source>
        </audio>
      </div>
    );
  }
}

export default App;
