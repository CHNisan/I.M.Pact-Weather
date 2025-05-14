import '../styles/InfoCardStyle.css';

function InfoCard() {
    return(
        <div className="info-card-container">
            <img className="info-card-bg-img" src="../../public/images/Pride Ring/Pride Ring extreme wide shot.png"/>
            <div className="info-card-text-container">
                <p className="info-card-info">
                    {"The Pride Ring is one of the seven Rings of Hell and is the first and topmost ring within Hell.\n\nSinners are confined to and can only exist in this ring, however, like the other rings in Hell, the Pride Ring is accessible and traversable by Hellborn species."}
                </p>
                <p className="info-card-quote">
                    {'“Keep your hell hounds hydrate out there!\n(that means you Loona)”'}
                </p>
            </div>
            <button className="info-card-scroll-button right">
                <svg version="1.1" id="svg2" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" sodipodi:docname="play-alt.svg" inkscape:version="0.48.4 r9939" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 1200" enable-background="new 0 0 1200 1200" xml:space="preserve" fill="#D9D9D9"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="path16995" inkscape:connector-curvature="0" d="M600,1200C268.65,1200,0,931.35,0,600C0,268.65,268.65,0,600,0 c331.35,0,600,268.65,600,600C1200,931.35,931.35,1200,600,1200z M450,300.45v599.1L900,600L450,300.45z"></path> </g></svg>
            </button>
            <button className="info-card-scroll-button left">
                <svg version="1.1" id="svg2" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" sodipodi:docname="play-alt.svg" inkscape:version="0.48.4 r9939" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 1200" enable-background="new 0 0 1200 1200" xml:space="preserve" fill="#D9D9D9"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="path16995" inkscape:connector-curvature="0" d="M600,1200C268.65,1200,0,931.35,0,600C0,268.65,268.65,0,600,0 c331.35,0,600,268.65,600,600C1200,931.35,931.35,1200,600,1200z M450,300.45v599.1L900,600L450,300.45z"></path> </g></svg>
            </button>
        </div>
    );
}

export default InfoCard;