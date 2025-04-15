export function getLocation(){
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

        // Success Callback
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        
        // Error Callback
        (error) => {
            switch(error.code) {
            case error.PERMISSION_DENIED:
                console.error("User denied the request for geolocation");
                break;
            case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable");
                break;
            case error.TIMEOUT:
                console.error("The request to get user location timed out");
                break;
            case error.UNKNOWN_ERROR:
                console.error("An unknown error occurred");
                break;
            }
        },
        
        // Options Object
        {
            enableHighAccuracy: true, 
            timeout: 5000,           
            maximumAge: 0            
        }
        );
    } 

    else {
        console.error("Geolocation is not supported by this browser");
    }
}
