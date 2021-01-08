import React from 'react';
import './Start.scss';
import './Game.scss';

export default function Game(props) {
    // let wordlist = props.word.map(item => {
    //     <div>
    //         {item}
    //     </div>
    // })
    return (
        <>
            <h1>{props.sentence}</h1>

            <section>
                {/* need to map the provided api data here for words */}
                {/* {wordlist} */}
                <div>
                    {props.word}
                </div>
                <div className="game__submit">
                    {/* produces an audio file  to be played when the button is clicked */}
                        {props.audioFile && 
                        <video autoPlay name="media">
                            <source src={props.audioFile} type="audio/wav"></source>
                        </video>    
                    }
                    <button className='start__button' onClick={()=>props.readStory(props.sentence)}>Read Me a Story!</button>

                </div>
            </section>
        </>
    )
}
