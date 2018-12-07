import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import Logo from './bloc_jams_logo.png';
import Background from './blur_bg_3.jpg';
import HeroImage from './artist-band-bass-92080.jpg'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPage:"landing" };
  }

  pageClick(){
    if(this.state.currentPage==="landing"){
      this.setState({currentPage:"library"});
    } else{
      this.setState({currentPage:"landing"});
    }
  }
  changePage()
  {
    if(this.state.currentPage==="library"){
    return <Link className="nav-btn" onClick={()=>this.pageClick()} to='/'>Main Page</Link>
    } else {
     return <Link className="nav-btn" onClick={()=>this.pageClick()} to='/library'>Library</Link>
    }
  }  render() {

    return (
      <div className="App" >


      <body>
        <div className="background">
      <header>
      <h1 className="title"><img src={Logo} alt={"Bloc Jams"}></img></h1>
      <nav>
      {this.changePage()}
      </nav>
      </header>
      <main>
      <Route exact path="/" component={Landing} />

      <Route path="/library" component={Library} />
      <Route path="/album/:slug" component={Album} />

      </main>
</div>
      </body>

      </div>
    );
  }
}

export default App;
