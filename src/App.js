import {Component} from 'react';
import './App.css';
import axios from 'axios';
import Game from './component/Game';
import Start from './component/Start';

class App extends Component {
  state={
    data: [],
    audiofile:null
}

componentDidMount(){
  axios.get('http://madlibz.herokuapp.com/api/random?maxlength=25')
      .then(item => {
        
        this.setState({data:item.data})
        console.log(this.state.data)
      })

  this.getExamples("verb");
  
}

/*********Patti ************** */

getExamples=(type)=>{
  axios.get(`http://localhost:8080/words/${type}`)
  .then(res=>{
    console.log(res.data);
  })
}

readStory=(fullStory)=>{
  axios.get(`http://api.voicerss.org/?key=57c9f15bc1da49efba258269609e6a3e&hl=en-us&src=${fullStory}`)
  .then(res=>{
    this.setState({audioFile:res.config.url})
  })
}

/*********Patti ************** */
render(){
  return (
    <>
      <Start />
      <Game 
      sentence={this.state.data.title}
      word={this.state.data.blanks}
      readStory={this.readStory}
      audioFile={this.state.audioFile}
      />
    </>
  );
}
}




// function App() {
//   const [sentence, setSentence] = useState([])
//   const [word, setWord] = useState([])

//   useEffect(() => {
//     axios.get('http://madlibz.herokuapp.com/api/random?maxlength=10')
//       .then(item => {
//         console.log(item);
//         setSentence(item.data.title);
//         setWord(item.data.blanks)
//       })
//   })

//   return (
//     <div>
//       <Start />
//       <Game 
//       sentence={sentence}
//       word={word}/>
//     </div>
//   )
// }


export default App;
