angular.module('starter.controllers', [])
  .controller('MapCtrl', function ($scope, $ionicLoading, $http) {
    var directionsService;
    var directionsDisplay;

    $scope.mapCreated = function (map) {
      $scope.map = map;
    };

    $scope.centerOnMe = function () {
      console.log("Centering");
      if (!$scope.map) {
        return;
      }

      directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer();

      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(function (pos) {
        console.log('Got pos', pos);
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        markPosition(pos.coords.latitude, pos.coords.longitude, 'Me');
        getNeabyHospitals(pos.coords.latitude, pos.coords.longitude);

        var nearbyHospitals = getNeabyHospitals().results;

        nearbyHospitals.forEach(function (value) {
          markPosition(value.geometry.location.lat, value.geometry.location.lng, value.name);
        });

          generateRoute(pos.coords.latitude, pos.coords.longitude, nearbyHospitals[0].geometry.location.lat, nearbyHospitals[0].geometry.location.lng);
        $scope.loading.hide();

      }, function (error) {
        alert('Unable to get location: ' + error.message);
      });
    };

    function markPosition(lat, lng, title = '') {
      var marker = {};
      marker.map = $scope.map;
      marker.position = { lat: lat, lng: lng };
      if (title) marker.title = title;

      new google.maps.Marker(marker);
    }

    function getNeabyHospitals() {
      return {
        "html_attributions": [],
        "results": [
          {
            "geometry": {
              "location": {
                "lat": -26.9092454,
                "lng": -49.06750659999999
              },
              "viewport": {
                "northeast": {
                  "lat": -26.9079407197085,
                  "lng": -49.06599826970849
                },
                "southwest": {
                  "lat": -26.9106386802915,
                  "lng": -49.06869623029149
                }
              }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
            "id": "bded0d7be816233dd8ae5c1243ac3d8442adbda2",
            "name": "Unimed Blumenau",
            "opening_hours": {
              "open_now": false,
              "weekday_text": []
            },
            "photos": [
              {
                "height": 4128,
                "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/115600260761318260978/photos\">Ingo Henning</a>"
                ],
                "photo_reference": "CmRaAAAAWyyI-le4Nb5YcKHnLxzy6Nh1fzvZF1fEOeDh_mmkCuwrgohjMPu_cCtKi6pHLJskGxmRfOdDzkRl8emTADpg530UZnIKWv9bo5NaURr33qULfg9jxz0chUInJJ3nYFrCEhAnZ-AE-AOUAYvEAd8pSDOqGhTQBsLvLdgxTURzgifve8xJYYuhcg",
                "width": 3096
              }
            ],
            "place_id": "ChIJDSrSyM4Y35QRR9jR-mPPeXk",
            "rating": 3.7,
            "reference": "CmRRAAAA5ii103z0f4eacl_4hirQhZO8XG_2L2_kBxkn1SItMHCfe4Kn_UMwALNa7o3Ko_1FIP_VTDpAw30GL_JICQaAFcog2SVYCbW6m4pblqYoYyNpr-OdBbRen2Q2nB8IKrMvEhC_LdN2oQH_sDfmjlS_lFrCGhRqxDMjUKYiOcQqd836nYIGcVLzrw",
            "scope": "GOOGLE",
            "types": [
              "store",
              "hospital",
              "insurance_agency",
              "health",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "Rua das Missões, 455 - Ponta Aguda, Blumenau"
          },
          {
            "geometry": {
              "location": {
                "lat": -26.906151,
                "lng": -49.075268
              },
              "viewport": {
                "northeast": {
                  "lat": -26.9048654697085,
                  "lng": -49.0739773197085
                },
                "southwest": {
                  "lat": -26.90756343029151,
                  "lng": -49.0766752802915
                }
              }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png",
            "id": "cd98b479e8e5a0011888b9164da0f0dcd793b92c",
            "name": "Missner Hospitalar",
            "opening_hours": {
              "open_now": false,
              "weekday_text": []
            },
            "place_id": "ChIJyeWaSdMY35QRHvZxbU_D1-A",
            "rating": 4.8,
            "reference": "CmRSAAAAB81ZaLyfjzWl6a3DdqXkHg-rz4m0_wlotqvU4WyOUeyOvrXhXkZZj4RH1LtVsxWcrOlErZVKEXaLGhiHvvosiUNGKbgfRWp5quZYrlktiIaRYSGJ6cA07UbYVkz1NGNBEhCsIusQJK8IC-ijQCHPOXL3GhQ1JLrWAwa7xSOAHix98t4vKF7H5A",
            "scope": "GOOGLE",
            "types": [
              "hospital",
              "health",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "Rua São Paulo, 1166 - Victor Konder, Blumenau"
          }
        ],
        "status": "OK"
      };
    }

    function generateRoute(latOrigin, lngOrigin, latDest, lngDest) {
      var directionsRequest = {};
      directionsRequest.origin = new google.maps.LatLng(latOrigin, lngOrigin);
      directionsRequest.destination = new google.maps.LatLng(latDest, lngDest);
      directionsRequest.travelMode = google.maps.TravelMode.DRIVING;
      directionsRequest.unitSystem = google.maps.UnitSystem.METRIC;
      directionsRequest.provideRouteAlternatives = true;

      directionsDisplay.setMap($scope.map);
      return directionsService.route(directionsRequest, function (result, status) {
        if (status == 'OK') directionsDisplay.setDirections(result);
      });
    }
  });
