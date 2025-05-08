const placeData = [
    {
        name: "Pride Ring",

        minTemp: 10, // Degress Celsius 
        maxTemp: 20, // Degress Celsius

        characters: [
            {
                name: "Alastor",
                conditionCodes: [
                    200, 201, 202, 210, 211, 212, 221, 230, 231, 232, // Thunderstom
                    600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622, // Snow
                    701, 711, 721, 731, 741, 751, 761, 762, 771, 781, // Atmosphere
                    803, 804, // Heavy Clouds
                    801, 802, // Light Clouds
                    800 // Clear
                ],
                dialogue: {
                    greeting: "Salutations Sinner!",
                    weather: "and roaring",
                    titleBegining: "it's the",
                    titleEnd: "out there"
                },
                quotes: "This face was made for radio",
                image: {
                    src: "../../public/images/Pride Ring/Pride Ring extreme wide shot.png",
                    description: "Outside of the Hazbin Hotel, looking over the Pride Ring",
                    dialogueLocations: { // Locations the text should be placed on the screen for the main section
                        greeting: {top: 0, left: 0}, // Percent from the corners of the screen the text should be placed
                        weather: {top: 0, left: 0},
                        quote: {bottom: 0, right: 0}
                    }
                }
            },
            {
                name: "Angel Dust",
                conditionCodes: [
                    300, 301, 302, 310, 311, 312, 313, 314, 321, // Drizzle
                    500, 501, 502, 503, 504, 511, 520, 521, 522, 531, // Rain
                ],
                dialogue: {
                    greeting: "Hiya baby!",
                    weather: "and wet...",
                    titleBegining: "it's the",
                    titleEnd: "toots"
                },
                quotes: "Popsicles, ya sicko!",
                image: {
                    src: "../../public/images/Pride Ring/Pride Ring extreme wide shot.png",
                    description: "Extreme wide shot of the Pride Ring, looking down",
                    dialogueLocations: { // Locations the text should be placed on the screen for the main section
                        greeting: {top: 0, left: 0}, // Percent from the corners of the screen the text should be placed
                        weather: {top: 0, left: 0},
                        quote: {bottom: 0, right: 0}
                    }
                }
            },
        ],

        

        info:[
            "The Pride Ring is one of the seven Rings of Hell and is the first and topmost ring within Hell.\nSinners are confined to and can only exist in this ring, however, like the other rings in Hell, the Pride Ring is accessible and traversable by Hellborn species.",
            "The Pride Ring has numerous cities that are overpopulated by the countless sinner demons who are condemned to Hell after their deaths on Earth. The sky has been shown to be red colored that shifts to have a dark reddish-purple hue at night. Also from this ring, the pentagram moon and Heaven are visible in the sky. Its full moon is a glowing orb with light swirling around it.",
            "This ring experiences yearly attacks by the Exorcists in order to quell the overpopulation crisis and prevent an uprising from Hell's Sinner population. As per Lucifer's pardon from Heaven, the Hellborn of the Pride Ring, and by extension the rest of Hell, are to be spared from the Extermination."
        ]
    },
    {
        name: "Default", // Must stay as the last location in the list

        minTemp: null, // Degress Celsius 
        maxTemp: null, // Degress Celsius

        characters: [
            {
                name: "Default",
                conditionCodes: [],
                dialogue: {
                    greeting: "No match",
                    weather: "Weather matches no place in database",
                    titleBegining: "Default",
                    titleEnd: "Default"
                },
                quotes: "Try again later",
                image: {
                    src: "",
                    description: "",
                    dialogueLocations: { // Locations the text should be placed on the screen for the main section
                        greeting: {top: 0, left: 0}, // Percent from the corners of the screen the text should be placed
                        weather: {top: 0, left: 0},
                        quote: {bottom: 0, right: 0}
                    }
                }
            }
        ],

        info:[]
    }
]

export default placeData