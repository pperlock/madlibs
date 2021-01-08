import React from "react";
import "./Start.scss";
import "./Game.scss";

export default function Game({ story, readStory, audioFile, fullStory }) {
  // let wordlist = props.word.map(item => {
  //     <div>
  //         {item}
  //     </div>
  // })
  return (
      <>
    <h1 className="story__title">{story.title}</h1>
    <div className="story">
      

      {story.blanks &&<form className="story__form" onSubmit={(event) => readStory(event, story.blanks.length)}>
        
            {story.blanks.map((blank,i) => (
              <div className="story__input">
                <label>Place a {blank} Here:</label>
                <input type="text" name={`word${i}`} placeholder={blank}></input>
              </div>
            ))}

          <div className="story__submit">

            <button type="submit"
              className="start__button story__button"
            >
              Read Me a Story!
            </button>
          </div>
        </form>
      }
        <div className="story__output">
            {audioFile && (
              <video controls autoPlay name="media">
                <source src={audioFile} type="audio/wav"></source>
              </video>
            )}
            <p className="story__full">{fullStory}</p>
      </div>
    </div>
    </>
  );
}
