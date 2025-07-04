import { useState } from 'react';
import '../styles/ShareButtonStyle.css';

function ShareButton() {
    const [isCopied, setIsCopied] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSharing, setIsSharing] = useState(false);

    const shareData = {
        url: "http://localhost:5173/"
    };

    const isMobile = () => {
        // Use CSS media query to detect devices that can't hover (typically mobile)
        return !window.matchMedia("(hover: hover)").matches;
    };

    const handleShare = async () => {
        // Use Web Share API only on mobile devices
        if (isMobile() && navigator.share && navigator.canShare && navigator.canShare(shareData)){
            try {
                setIsSharing(true);
                await navigator.share(shareData);
            }
            catch(err) {
                if (err.name !== "AbortError"){
                    // Fallback to clipboard if share fails
                    await copyToClipboard();
                }
            }
            finally {
                setIsSharing(false);
            }
        }
        else {
            // Use clipboard copy on desktop
            await copyToClipboard();
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareData.url);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
        catch(err) {
            console.error("Failed to copy to clipboard:", err)
            setIsError(true);
            setTimeout(() => setIsError(false), 3000);
        }
    };

    return(
        <div className="share-container">
            <button className="share-button" onClick={handleShare} disabled={isSharing}>
                <svg className='share-svg' fill="#aaaaaa" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 458.624 458.624" xml:space="preserve" stroke="#aaaaaa"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M339.588,314.529c-14.215,0-27.456,4.133-38.621,11.239l-112.682-78.67c1.809-6.315,2.798-12.976,2.798-19.871 c0-6.896-0.989-13.557-2.798-19.871l109.64-76.547c11.764,8.356,26.133,13.286,41.662,13.286c39.79,0,72.047-32.257,72.047-72.047 C411.634,32.258,379.378,0,339.588,0c-39.79,0-72.047,32.257-72.047,72.047c0,5.255,0.578,10.373,1.646,15.308l-112.424,78.491 c-10.974-6.759-23.892-10.666-37.727-10.666c-39.79,0-72.047,32.257-72.047,72.047s32.256,72.047,72.047,72.047 c13.834,0,26.753-3.907,37.727-10.666l113.292,79.097c-1.629,6.017-2.514,12.34-2.514,18.872c0,39.79,32.257,72.047,72.047,72.047 c39.79,0,72.047-32.257,72.047-72.047C411.635,346.787,379.378,314.529,339.588,314.529z"></path> </g> </g> </g></svg>
            </button>

            {isCopied ? <p className="share-popup">Link Copied</p> : null}
            {isError ? <p className="share-popup">Copy Failed</p> : null}
        </div>
    );
}

export default ShareButton;