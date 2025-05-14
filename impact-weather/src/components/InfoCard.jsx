import '../styles/InfoCardStyle.css';

function InfoCard() {
    return(
        <div className="info-card-container">
            <img className="info-card-bg-img" />
            <p className="info-card-info">
                The Pride Ring is one of the seven Rings of Hell and is the first and topmost ring within Hell.

                Sinners are confined to and can only exist in this ring, however, like the other rings in Hell, the Pride Ring is accessible and traversable by Hellborn species.
            </p>
            <p className="info-card-quote">
                “Keep your hell hounds hydrate out there! (that means you Loona)”
            </p>
        </div>
    );
}

export default InfoCard;