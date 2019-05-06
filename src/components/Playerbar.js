import React, { Component } from 'react';

 class PlayerBar extends Component {
   render() {
     return (
       <section className="player-bar">
       <div className="current-time">{this.props.currentTimeConverter}</div>
       <div className="total-time">{this.props.durationConvrter}</div>
          <div className="seekbar-container"> <input
             type="range"
             className="seek-bar"
             value={(this.props.currentTime / this.props.duration) || 0}
             max="1"
             min="0"
             step="0.01"
              onChange={this.props.handleTimeChange}
           />
           </div>

       <section id="buttons">
          <button id="previous" onClick={this.props.handlePrevClick}>
           <span className="ion-chevron-left"></span>
         </button>
          <button id="play-pause" onClick={this.props.handleSongClick} >
           <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>
         </button>
         <button id="next" onClick={this.props.handleNextClick}>
           <span className="ion-chevron-right" ></span>
         </button>
       </section>
       <section id="time-control">



       </section>
       <section id="volume-control">

          <div className="volume-container">

         <input
            type="range"
            className="volume-bar"
            value={this.props.currentVolume}
            max="1"
            min="0"
            step="0.01"
             onChange={this.props.handleVoumeChange }
         />

          <div className="icon ion-volume-low"></div>
         <div className="icon ion-volume-high"></div>
         </div>

       </section>
       </section>
     );
   }
 }

 export default PlayerBar;
