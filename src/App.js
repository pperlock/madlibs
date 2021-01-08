import {Component} from 'react';
import './App.css';
import axios from 'axios';
import Game from './component/Game';
import Start from './component/Start';

class App extends Component {
  state={
    data: [],
    audiofile:null,
    answers:[],
    fullStory:""
}

componentDidMount(){
  axios.get('http://madlibz.herokuapp.com/api/random?maxlength=15')
      .then(item => {
        
        this.setState({data:item.data})
        console.log(this.state.data)
      })

  this.getExamples("adjective");
  
}

getExamples=(type)=>{
  axios.get(`http://localhost:8080/words/${type}`)
  .then(res=>{
    console.log(res.data);
  })
}

composeStory=(answers, sentences)=>{
  let fullStory = this.state.data.title + " ";
  for (let i=0; i<answers.length; i++){
    fullStory = fullStory + sentences[i] + answers[i]
    if (i===answers.length-1){
      fullStory = fullStory + sentences[i+1];
    }
  }
  console.log(fullStory);

  this.setState({fullStory:fullStory})
  console.log(this.state.fullStory);
  return fullStory
}

readStory=(event,numInputs)=>{
  event.preventDefault();
  let answers=[];
  for(let i=0; i<numInputs; i++){
      let inputName=`word${i}`;
      let input = event.target[inputName].value
      answers.push(input);
  }
  
  let fullStory=this.composeStory(answers, this.state.data.value);
 
  axios.get(`http://api.voicerss.org/?key=57c9f15bc1da49efba258269609e6a3e&hl=en-us&src=${fullStory}`)
  // axios.get(`http://api.voicerss.org/?key=57c9f15bc1da49efba258269609e6a3e&hl=en-us&src="Hello World"`)
  .then(res=>{
    this.setState({audioFile:res.config.url})
  })


}

render(){
  console.log(`render ${this.state.fullStory}`)
  return (
    <>
      <Start />
      <Game 
      readStory={this.readStory}
      audioFile={this.state.audioFile}
      story={this.state.data}
      fullStory={this.state.fullStory}
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
