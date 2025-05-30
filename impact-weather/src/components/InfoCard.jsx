import ShareButton from '../components/ShareButton'
import '../styles/InfoCardStyle.css';

function InfoCard({info, quips, images}) {
    return(
        <article className="info-card-container">
            <div className="info-card-slider-wrapper">
                <div className="info-card-slider">
                    <div id="slide-0" className="info-card-slide">
                        <img className="info-card-bg-img" src={images[0].src} alt={images[0].alt}/>
                        <div className="info-card-text-container">
                            <p className="info-card-info">
                                {info[0]}
                            </p>
                            <p className="info-card-quip">
                                {quips[0]}
                            </p>
                        </div>
                    </div>

                    <div id="slide-1" className="info-card-slide">
                        <img className="info-card-bg-img" src={images[1].src} alt={images[1].alt}/>
                        <div className="info-card-text-container">
                            <p className="info-card-info">
                                {info[1]}
                            </p>
                            <p className="info-card-quip">
                                {quips[1]}
                            </p>
                        </div>
                    </div>

                    <div id="slide-2" className="info-card-slide">
                        <img className="info-card-bg-img" src={images[2].src} alt={images[2].alt}/>
                        <div className="info-card-text-container">
                            <p className="info-card-info">
                                {info[2]}
                            </p>
                            <p className="info-card-quip">
                                {quips[2]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Anchors to scroll to the correct slide when (the dots are) clicked */}
            <div className="info-card-slider-nav">
                <a href="#slide-0"></a>
                <a href="#slide-1"></a>
                <a href="#slide-2"></a>
            </div>
            
            <div className="info-card-share-button">
                <ShareButton />
            </div>
        </article>
    );
}

export default InfoCard;