import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

    const libraries = ['places'];
    const center = {
      lat: 35.703806, // default latitude
      lng: 19.350360, // default longitude
    };
        
    const Map = ({ users }) => {
 

    const mapContainerStyle = {
      width: '100%',
      height: '338px',
      disableDefaultUI: true,
    };

      const markers = users.map((user) => {
        return <Marker position={{
            lat: user.latitude,
            lng: user.longitude,
        }} />
    })

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
          
      return (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={0.8}
            center={center}
            options={{
                disableDefaultUI: true,
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
            {markers}
          </GoogleMap>
      );
    };

    export default Map