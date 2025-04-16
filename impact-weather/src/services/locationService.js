export function getUserCoordinates() {
    return new Promise((resolve, reject) => {

        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by this browser");
            reject(new Error("Geolocation is not supported by this browser"));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            // Success Callback
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                resolve({latitude, longitude});
            },
            
            // Error Callback
            (error) => {
                let errorMessage;
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                    errorMessage = "User denied the request for geolocation";
                    break;
                    case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location information is unavailable";
                    break;
                    case error.TIMEOUT:
                    errorMessage = "The request to get user location timed out";
                    break;
                    case error.UNKNOWN_ERROR:
                    errorMessage = "An unknown error occurred";
                    break;
                }
                console.error(errorMessage);
                reject(new Error(errorMessage));
            },
            
            // Options Object
            {
            timeout: 5000,           
            maximumAge: 0            
            }
        );
    });
}




// function getgetCoordinates(fallbackCoordinates = { latitude: null, longitude: null }) {
//     return new Promise((resolve, reject) => {
//         if (!navigator.geolocation) {
//             console.error("Geolocation is not supported by this browser");
//             resolve(fallbackCoordinates);
//             return;
//         }
        
//         navigator.geolocation.getCurrentPosition(
//             // Success Callback
//             (position) => {
//             const latitude = position.coords.latitude;
//             const longitude = position.coords.longitude;
//             console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
//             resolve({latitude, longitude});
//             },
            
//             // Error Callback
//             (error) => {
//             let errorMessage;
//             switch(error.code) {
//                 case error.PERMISSION_DENIED:
//                 errorMessage = "User denied the request for geolocation";
//                 break;
//                 case error.POSITION_UNAVAILABLE:
//                 errorMessage = "Location information is unavailable";
//                 break;
//                 case error.TIMEOUT:
//                 errorMessage = "The request to get user location timed out";
//                 break;
//                 case error.UNKNOWN_ERROR:
//                 errorMessage = "An unknown error occurred";
//                 break;
//             }
//             console.error(errorMessage);
//             resolve(fallbackCoordinates); // Use fallback instead of rejecting
//             },
            
//             // Options Object
//             {
//             enableHighAccuracy: true, 
//             timeout: 5000,           
//             maximumAge: 0            
//             }
//         );
//     });
// }