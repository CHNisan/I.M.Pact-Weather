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

            <div className="info-card-scroll-button-container">
                <button className="info-card-scroll-button right">
                    <svg version="1.1" id="svg2" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" sodipodi:docname="play-alt.svg" inkscape:version="0.48.4 r9939" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 1200" enable-background="new 0 0 1200 1200" xml:space="preserve" fill="#D9D9D9"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="path16995" inkscape:connector-curvature="0" d="M600,1200C268.65,1200,0,931.35,0,600C0,268.65,268.65,0,600,0 c331.35,0,600,268.65,600,600C1200,931.35,931.35,1200,600,1200z M450,300.45v599.1L900,600L450,300.45z"></path> </g></svg>
                </button>
                <button className="info-card-scroll-button left">
                    <svg version="1.1" id="svg2" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" sodipodi:docname="play-alt.svg" inkscape:version="0.48.4 r9939" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 1200" enable-background="new 0 0 1200 1200" xml:space="preserve" fill="#D9D9D9"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="path16995" inkscape:connector-curvature="0" d="M600,1200C268.65,1200,0,931.35,0,600C0,268.65,268.65,0,600,0 c331.35,0,600,268.65,600,600C1200,931.35,931.35,1200,600,1200z M450,300.45v599.1L900,600L450,300.45z"></path> </g></svg>
                </button>
            </div>

            <div className="info-card-img-indicator-container">
                <button className="info-card-img-indicator"></button>
                <button className="info-card-img-indicator fill"></button>
                <button className="info-card-img-indicator"></button>
            </div>
            
            <button className="info-card-share-button">
                <svg className='info-card-share-svg' fill="#aaaaaa" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 458.624 458.624" xml:space="preserve" stroke="#aaaaaa"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M339.588,314.529c-14.215,0-27.456,4.133-38.621,11.239l-112.682-78.67c1.809-6.315,2.798-12.976,2.798-19.871 c0-6.896-0.989-13.557-2.798-19.871l109.64-76.547c11.764,8.356,26.133,13.286,41.662,13.286c39.79,0,72.047-32.257,72.047-72.047 C411.634,32.258,379.378,0,339.588,0c-39.79,0-72.047,32.257-72.047,72.047c0,5.255,0.578,10.373,1.646,15.308l-112.424,78.491 c-10.974-6.759-23.892-10.666-37.727-10.666c-39.79,0-72.047,32.257-72.047,72.047s32.256,72.047,72.047,72.047 c13.834,0,26.753-3.907,37.727-10.666l113.292,79.097c-1.629,6.017-2.514,12.34-2.514,18.872c0,39.79,32.257,72.047,72.047,72.047 c39.79,0,72.047-32.257,72.047-72.047C411.635,346.787,379.378,314.529,339.588,314.529z"></path> </g> </g> </g></svg>
            </button>
        </div>
    );
}

export default InfoCard;