import React, {Component}from 'react'
import albumData from './../data/albums';
 import PlayerBar from './Playerbar';

class Album extends Component{

  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: null,
      currentTime: null,
      duration: 0,
      isPlaying: false,
      hoveredSong: null,
      volume:0.5,


    }

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
}
  play(){
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }
  pause(){
   this.audioElement.pause();
   this.setState({ isPlaying: false });
}

setSong(song) {
 this.audioElement.src = song.audioSrc;
 this.setState({ currentSong: song });
}


handleSongClick(song) {
   const isSameSong = this.state.currentSong === song;
   if (this.state.isPlaying && isSameSong) {
     this.pause();
   } else {
        if (!isSameSong) { this.setSong(song); }
     this.play();
   }
 }

 handlePrevClick() {
   const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
    }
    handleNextClick(song) {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.min(this.state.album.songs.length-1, currentIndex + 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
    }
    componentDidMount() {
      this.eventListeners = {
         timeupdate: e => {
           this.setState({ currentTime: this.audioElement.currentTime });
         },
         durationchange: e => {
           this.setState({ duration: this.audioElement.duration });
         },

       };
       this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
       this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);

  }
  componentWillUnmount() {
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);

   }
   handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }
  handleVolumeChange(e) {
 this.setState({volume:e.target.value});
 this.audioElement.volume=e.target.value
 }
 currentTimeConverter(){
  const minutes = Math.floor(this.state.currentTime/60);
  const seconds = Math.floor(this.state.currentTime)-(60*minutes);
if (seconds.toString().length <2)
{return minutes +":0"+seconds} else
 {return minutes +":"+ seconds }

 }
durationConverter(song){
  const minutes = Math.floor(this.state.duration/60);
  const seconds = Math.floor(this.state.duration)-(60*minutes);
return minutes +":"+ seconds
}

hover(song){
 this.setState({hoveredSong:song});


}

hoverOut(){
 this.setState({hoveredSong:null});

 }

 currentSongIcon(song,index){

   if (this.state.currentSong === song){
     if (this.state.isPlaying === true )
       {return <span className="ion-pause"></span>}
     else
         {return <span className="ion-play"></span> }
  }
           else{if (song === this.state.hoveredSong)
              {return <span className="ion-play"></span>} else {return index+1}
   }
}
render(){

  return(
       <section className='album'>

         <section id="album-info">
                <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
                <div className="album-details">
                  <h1 id="album-title">{this.state.album.title}</h1>
                  <h2 className="artist">{this.state.album.artist}</h2>
                  <div id="release-info">{this.state.album.releaseInfo}</div>
                </div>
          </section>


          <table id="song-list" >

          <colgroup>
 <col id="song-number-column" />
 <col id="song-title-column" />
 <col id="song-duration-column" />
          </colgroup>

          <tbody>
          {this.state.album.songs.map((song, index)=>
            <tr key ={index} onClick = {()=> this.handleSongClick(song)} >
                <td onMouseEnter = {() => this.hover(song)}
                   onMouseLeave ={() => this.hoverOut(song)}>
                  {this.currentSongIcon(song, index)} </td>
                <td>{song.title}</td>
                <td>{song.duration}</td>
            </tr>
          )}
            </tbody>

          </table>

   <PlayerBar
   isPlaying={this.state.isPlaying}
   currentSong={this.state.currentSong}
   handleSongClick={() => this.handleSongClick(this.state.currentSong)}
   handlePrevClick={()=>this.handlePrevClick()}
   handleNextClick={()=>this.handleNextClick()}
   currentTime={this.audioElement.currentTime}
   currentVolume = {this.state.volume}
   duration={this.audioElement.duration}
   handleTimeChange={(e) => this.handleTimeChange(e)}
   handleVoumeChange={(e) => this.handleVolumeChange(e)}
   currentTimeConverter={this.currentTimeConverter()}
   durationConverter={this.durationConverter()}/>
         </section>
     );
  }
}
export default Album
