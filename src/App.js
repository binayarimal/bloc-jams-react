import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import Logo from './bloc_jams_logo.png';
class App extends Component {

    render() {

    return (



      <body className="background App">
        <div>
      <header>
      <h1 className="title"><img src={Logo} alt={"Bloc Jams"}></img></h1>
      <nav>
    <Link className="nav-btn" onClick={()=>this.pageClick()} to='/'>Main Page</Link>
    <Link className="nav-btn" onClick={()=>this.pageClick()} to='/library'>Library</Link>

      </nav>
      </header>
      <main>
      <Route exact path="/" component={Landing} />

      <Route path="/library" component={Library} />
      <Route path="/album/:slug" component={Album} />

      </main>
</div>
      </body>


    );
  }
}

export default App;
