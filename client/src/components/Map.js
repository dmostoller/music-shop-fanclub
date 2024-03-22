import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import {setKey, setDefaults, setLanguage, setRegion, fromAddress, fromLatLng, fromPlaceId, setLocationType, geocode, RequestType,} from "react-geocode";


    const libraries = ['places'];
    const mapContainerStyle = {
      width: '100%',
      height: '338px',
    };
    const center = {
      lat: 39.952583, // default latitude
      lng: -75.165222, // default longitude
    };
    
    const Map = ({ users }) => {
    const [userMarker, setUserMarker] = useState();
      const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: `${process.env.REACT_APP_YOUTUBE_API_KEY}`,
        libraries,
      });
    
      if (loadError) {
        return <div>Error loading maps</div>;
      }
    
      if (!isLoaded) {
        return <div>Loading maps</div>;
      }
    
      // Set default response language and region (optional).
      // This sets default values for language and region for geocoding requests.
      setDefaults({
        key: `${process.env.REACT_APP_MAP_API_KEY}`, // Your API key here.
        language: "en", // Default language for responses.
        region: "es", // Default region for responses.
      });


    console.log(users)
    //   const markers = users.map((user) => {
    //     fromAddress(`${user.city}, ${user.country}`)
    //     .then(({ results }) => {
    //         setUserMarker(results[0].geometry.location);
    //     //   console.log(lat, lng);
    //     })
    //     return <Marker 
    //     position={userMarker}
    //     />
    //   })

      
      return (
        <div>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
            options={{
                styles:  [
                    { elementType: "geometry", stylers: [{ color: "#212121" }] },
                    { elementType: "labels.icon", stylers: [{ visibility: "#off" }] },
                    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
                    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },

                    // { elementType: "labels.text.fill", stylers: [{ color: "#8F00FF" }] },
                    {
                        featureType: "administrative",
                        elementType: "geometry",
                        stylers: [
                          {
                            color: "#757575"
                          }
                        ]
                      },
                    {
                      featureType: "administrative.locality",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#bdbdbd" }]
                    },
                    {
                        featureType: "administrative.neighborhood",
                        stylers: [
                          {
                            visibility: "off"
                          }
                        ]
                      },
                    {
                        featureType: "administrative.land_parcel",
                        stylers: [
                          {
                            visibility: "off"
                          }
                        ]
                      },
                      {
                        featureType: "poi",
                        elementType: "labels.text",
                        stylers: [
                          {
                            visibility: "off"
                          }
                        ]
                      },
                      {
                        featureType: "poi.business",
                        stylers: [
                          {
                            visibility: "off"
                          }
                        ]
                      },
                    {
                      featureType: "poi",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#d59563" }]
                    },
                    {
                      featureType: "poi.park",
                      elementType: "geometry",
                      stylers: [{ color: "#263c3f" }]
                    },
                    {
                      featureType: "poi.park",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#6b9a76" }]
                    },
                    {
                        featureType: "road",
                        elementType: "labels",
                        stylers: [
                          {
                            visibility: "off"
                          }
                        ]
                      },
                    {
                      featureType: "road",
                      elementType: "geometry",
                      stylers: [{ color: "#808080" }]
                    },
                    {
                      featureType: "road",
                      elementType: "geometry.stroke",
                      stylers: [{ color: "#212a37" }]
                    },
                    {
                      featureType: "road",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#9ca5b3" }]
                    },
                    {
                        featureType: "road.arterial",
                        elementType: "labels",
                        stylers: [
                          {
                            visibility: "off"
                          }
                        ]
                      },
                      {
                        featureType: "road.highway",
                        elementType: "labels",
                        stylers: [
                          {
                            visibility: "off"
                          }
                        ]
                      },
                    {
                      featureType: "road.highway",
                      elementType: "geometry",
                      stylers: [{ color: "#808080" }]
                    },
                    {
                      featureType: "road.highway",
                      elementType: "geometry.stroke",
                      stylers: [{ color: "#1f2835" }]
                    },
                    {
                      featureType: "road.highway",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#f3d19c" }]
                    },
                    {
                      featureType: "transit",
                      elementType: "geometry",
                      stylers: [{ color: "#2f3948" }]
                    },
                    {
                      featureType: "transit.station",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#d59563" }]
                    },
                    {
                      featureType: "water",
                      elementType: "geometry",
                      stylers: [{ color: "#17263c" }]
                    },
                    {
                      featureType: "water",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#515c6d" }]
                    },
                    {
                      featureType: "water",
                      elementType: "labels.text.stroke",
                      stylers: [{ color: "#17263c" }]
                    }
                  ]
            }}
          >
            {/* <Marker position={center} /> */}
            {/* {markers} */}
          </GoogleMap>
        </div>
      );
    };

    export default Map