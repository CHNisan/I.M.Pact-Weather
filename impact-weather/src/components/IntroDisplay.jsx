import '../styles/IntroDisplayStyle.css';

function IntroDisplay(props) {
  //#region Help functions
  const formatTemp = (temp, isMetric = true) => (
    temp === undefined || temp === null ? 'N/A' : `${Math.round(temp)}${isMetric ? "°C" : "°F"}`
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



  return(
    <div className="intro-container">
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
    </div>
  );
};

export default IntroDisplay;