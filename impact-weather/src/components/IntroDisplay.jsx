import {useState, useEffect} from "react";
import useLocation from '../hooks/useLocation';
import useWeather from '../hooks/useWeather';
import {matchPlace} from '../services/matchingService'
import '../styles/IntroDisplayStyle.css';

function IntroDisplay(props) {
  //#region Help functions
  const formatTemp = (temp) => (
    temp === undefined || temp === null ? 'N/A' : `${Math.round(temp)}°C`
  );

  // Create the inline style for setting the top, left, bottom and right position variables for the into-text CSS elements
  function createPositionStyle(dialogueLocations, isTopLeftAnchor = true) {
    return isTopLeftAnchor ? 
      { "--top": `${dialogueLocations?.top}%`, "--left": `${dialogueLocations?.left}%` } : 
      { "--bottom": `${dialogueLocations?.bottom}%`, "--right": `${dialogueLocations?.right}%` }
  };

  function showMoreOnClick(){
    props.infoSection.current.scrollIntoView();
  }
  //#endregion


  // Render loading, error, or weather content
  const renderContent = () => {
    // Loading
    if (props.loading && !props.weather) {
      return (
        <></>
      );
    }

    // Error
    if (props.error) {
      return (
        <>
          <div className="text-red-500 font-medium mb-4">{error}</div>
          <div className="flex flex-col space-y-2">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try Again
            </button>
            
            {error.includes("Location access denied") && (
              <button 
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Use Approximate Location
              </button>
            )}
          </div>
        </>
      );
    }

    return(
      <>
        <img className="bg-img" 
          src={props.matchedPlace?.character?.image?.src} 
          alt={props.matchedPlace?.character?.image?.description} 
          style={{ "backgroundColor": props.matchedPlace?.character?.image?.color}}/>

      <div className="intro-text-container">
        <p className="intro-text" style={createPositionStyle(props.currCharacter?.image?.dialogueLocations?.greeting)}>
          {props.currCharacter?.dialogue?.greeting}
        </p>

        <p className="intro-text" style={createPositionStyle(props.currCharacter?.image?.dialogueLocations?.weather)}>
          {`${formatTemp(props.weather?.weatherData?.main?.temp)} ${props.currCharacter?.dialogue?.weather}`}
        </p>

        <div className="intro-title-container">
          <p className="intro-subtitle top-subtitle">{props.currCharacter?.dialogue?.titleBegining}</p>
          <h2 className='intro-title'>{props.matchedPlace?.name}</h2>
          <p className="intro-subtitle bottom-subtitle">{props.currCharacter?.dialogue?.titleEnd}</p>
        </div>

        <p className="intro-text" style={createPositionStyle(props.currCharacter?.image?.dialogueLocations?.quote, false)}>
          "{props.currCharacter?.quotes}"
        </p>

        <div className="show-more-container">
          <button className="nav-text show-more" onClick={showMoreOnClick}>show more</button>
        </div>
      </div>
      </>
    );
  };

  return (
    <div className="intro-container">
      {renderContent()}
    </div>
  );
  //#endregion
}

export default IntroDisplay;