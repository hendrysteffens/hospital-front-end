angular.module('starter.controllers', [])
  .controller('MapCtrl', function ($scope, $ionicLoading) {
    $scope.infoBoxs = [];
    var directionsService;
    var directionsDisplay;
    var hospitalImg = 'http://maps.google.com/mapfiles/kml/pal4/icon55.png';

    $scope.mapCreated = function (map) {
      $scope.map = map;

      google.maps.event.addListenerOnce($scope.map, 'tilesloaded', function () {
        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function (pos) {
          $scope.currentPosition = pos.coords;
          markPosition($scope.currentPosition.latitude, $scope.currentPosition.longitude);
          $scope.loading.hide();
        }, function (error) {
          alert('Unable to get location: ' + error.message);
        });
      });
    };

    $scope.centerOnMe = function () {
      if (!$scope.map) {
        return;
      }

      directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer();

      getNeabyHospitals($scope.currentPosition.latitude, $scope.currentPositionlongitude);

      var nearbyHospitals = getNeabyHospitals().results;

      nearbyHospitals.forEach(value => {
        var infoBox = setInfoBox(getClickedHospitalsDataFormatted(value.name, Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 50) + 1)));
        var marker = markPosition(value.geometry.location.lat, value.geometry.location.lng, true);
        $scope.infoBoxs.push(infoBox);

        marker.addListener('click', function () {
          if ($scope.infoBoxs) $scope.infoBoxs.forEach(box => box.close());
          $scope.map.setCenter(this.position);
          infoBox.open($scope.map, marker);
        });

        marker.addListener('dblclick', function () {
          $scope.map.setCenter(this.position);
          generateRoute($scope.currentPosition.latitude, $scope.currentPosition.longitude, this.position.lat(), this.position.lng());
        });
      });

      generateRoute($scope.currentPosition.latitude, $scope.currentPosition.longitude, nearbyHospitals[0].geometry.location.lat, nearbyHospitals[0].geometry.location.lng);

    };

    function markPosition(lat, lng, image = false) {
      var marker = {
        map: $scope.map,
        position: setPosition(lat, lng),
      };
      if (image) marker.icon = hospitalImg;
      $scope.map.setCenter(setPosition(lat, lng));
      return new google.maps.Marker(marker);
    }

    function getNeabyHospitals() {
      return {
        "html_attributions": [],
        "next_page_token": "CpQCAwEAAKocQ_yT3SX9V-rZKi4cehGeuHnIPT9Cmg2FbARxJB9Q6BXV5eEAGrErXIR72YKKwqmG9o-b1FZwoi4M6VaJ6vlgMWdBI8aWTRKYONM9f1RtuoMUqIQWOICL8b7EqiRM7rbu1fUmVVs_-cQbjAvTXMQxN0-thev9DDpmiQLH5vBi4b3PFWY-oiP4OzDBDI_C0Vi8AnYXuogtY2ia7zSxySIHXhqy4qUAgiuOpgSwoHmZazci7010E5lhD93m7N_HBnb_M6bxSeooBpu_cc-pe6rdLO6bNMGB3KgfKmvRS6ohNhIBhWAu3cXhWaaER43kEDga4lla8gbAc_1e9stAMfH04wAAZy12b2ZGpL-5vhOFEhDE9v4xRRHrR9pEAZ23lBzEGhS40J3eF-EtKK4_cTicDVmNJkQjgQ",
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
                "photo_reference": "CmRaAAAAB-y6w7I7odRcHp8A3VNYVzDvqkdZWFCRctnjN4Nz9c33-Q-fX7X7tE1PdwSExmnSUY-0WFCESt3PQt1DzkNRQA6aKMKG9W9pceuC5UtQi-qG5OgGUXxgQRcOyYORMcFcEhBA5sDLeYtf1C_RJprKu4B9GhRGNdyHviOy0JF7rPcekVw6sMUmyA",
                "width": 3096
              }
            ],
            "place_id": "ChIJDSrSyM4Y35QRR9jR-mPPeXk",
            "rating": 3.7,
            "reference": "CmRRAAAAhlgv-JvVbRqb_BJa9M3y53MOfTsS2WtymF4g5FpyS_l42QvD4QR2-lsKA3B9YiTjC_kgTv2ICDghbpyrTp9QZFRdVNTHghp8JvmeYN5oWMA45wXQ6WP7Xg4DOTQrdBEZEhBoom9IYjghMil64guwyJnWGhTId2j-FLnGqKulTHUA65J_ilf4LA",
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
                "lat": -26.9165899,
                "lng": -49.0580548
              },
              "viewport": {
                "northeast": {
                  "lat": -26.91522106970849,
                  "lng": -49.0566297197085
                },
                "southwest": {
                  "lat": -26.9179190302915,
                  "lng": -49.0593276802915
                }
              }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png",
            "id": "27329e3807adc57dbfba7b25f3d30a4cb7f9ead0",
            "name": "Hospital Santo Antônio",
            "opening_hours": {
              "open_now": true,
              "weekday_text": []
            },
            "photos": [
              {
                "height": 2992,
                "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/103682266339903762021/photos\">Emerson Verissimo</a>"
                ],
                "photo_reference": "CmRaAAAAiEBtAI53tyQI0pcyLkoqJ-dLr8jDFaSS0CKho-_Or3Wzd1AuPY4rfCG-WL_bSYtTwfS96f4CHTSpIgQ4LFXoaVviD7lZYBceGdh6Oalh6E1DMQaU0CCj4b1tFryB_QkGEhCKc2lbfWUV5vZZAj7xc_Q8GhQhNBSUX2kqbekW6-FhrPYIdgUj1g",
                "width": 4000
              }
            ],
            "place_id": "ChIJpXUu874Y35QR4Z9aH2TMEQw",
            "rating": 3.8,
            "reference": "CmRRAAAAOrHqt0RIYd-4wBdKXihw1G8S-kGlouO4DvsMWeTnwFzoryFNcyf3Azvt7CXj5bmeatLFyq8bmGqVF7zt7dYcdy9geHOaT1QN0-NkCilbv7KC5ZGWN5_tGZZhmCleAXJjEhA0x9vkl4EhZuHXmbGX-vTKGhSZ5gIBypMVWI4SmE0Q3h2r8eovCA",
            "scope": "GOOGLE",
            "types": [
              "hospital",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "Rua Itajaí, 545 - Vorstadt, Blumenau"
          },
          {
            "geometry": {
              "location": {
                "lat": -26.9267303,
                "lng": -49.05587670000001
              },
              "viewport": {
                "northeast": {
                  "lat": -26.9252853697085,
                  "lng": -49.0546376697085
                },
                "southwest": {
                  "lat": -26.9279833302915,
                  "lng": -49.0573356302915
                }
              }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png",
            "id": "42479097a9a8201b5ec76f0934ad1beff5559eac",
            "name": "Hospital Santa Catarina",
            "opening_hours": {
              "open_now": true,
              "weekday_text": []
            },
            "photos": [
              {
                "height": 800,
                "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/116952344265412670845/photos\">HSC Blumenau</a>"
                ],
                "photo_reference": "CmRaAAAAOwu3z2TXQnNIJxFSzzy-4STxKiFuB6cCg9XH6fF0-uRi3HW4WOm6gKinAcTnxLYLWFUo9NFM5ML4Y960tm25aECHpiWrVQ9034PyAaGaCTBx-8Dsf_oYPxX655QNPtFREhBUT5oBIMOpfMT2bziQ6cGuGhTTgMURrUKgPmZmpitq0ro9h7UKIg",
                "width": 1200
              }
            ],
            "place_id": "ChIJXamvg5EY35QRYx7hiSWv53Q",
            "rating": 4.1,
            "reference": "CmRRAAAAfquGA1u20S3yu_SVRtDrZ5s_xNsUt7ACQVym_pmJIoVCyrnkjt0HJ_e9H2F2ryiVWjQ6Nh3lwfybG-URO0Fm-JgWPqPWxa-xQ-l9bjeJfpPCIxI1MFehmy7Hfe3Um2ObEhDE54F4qe4xViCGVPgZC6jvGhSuAu51lmACuB4u8n4WztcpeKQPjw",
            "scope": "GOOGLE",
            "types": [
              "hospital",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "Rua Amazonas, 301 - Garcia, Blumenau"
          },
          {
            "geometry": {
              "location": {
                "lat": -26.9238192,
                "lng": -49.0647751
              },
              "viewport": {
                "northeast": {
                  "lat": -26.9226741197085,
                  "lng": -49.06361931970849
                },
                "southwest": {
                  "lat": -26.9253720802915,
                  "lng": -49.06631728029149
                }
              }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png",
            "id": "a5bc63f385219133607d0f37a171e86a996dd6fa",
            "name": "Hospital Santa Isabel",
            "opening_hours": {
              "open_now": true,
              "weekday_text": []
            },
            "photos": [
              {
                "height": 1152,
                "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/118409520442825043521/photos\">Adrian Marchi</a>"
                ],
                "photo_reference": "CmRaAAAAjakd2ya-UhXAwQebBrABsVOMXVIH992mVuHx87_iJSC-Uwkpxz0v-1Lf9q4XmhvWpIBp-hWgckjagGUArm_TolRYQv1sU0SOSwf9QQQ-ACV_W8UQebC7FB9hzwT5XVOxEhDIKbNY1d1J-__EmlZihME3GhR1EwNaTFoo7WgBSI5rnPFNoeKKmA",
                "width": 2048
              }
            ],
            "place_id": "ChIJXbZq9-oY35QRa_id_oAPcPo",
            "rating": 3.9,
            "reference": "CmRSAAAAzCJhFYr7HOVZwX5mOevhcfLv-gsRVrBEMbng7JRdZHF2ohR7VFaN1jlkwhYfhpGxhZYj_E_W7nE44rGpAOW92EhMWH0ycwOnUuKbnEeTtyxf0v6JROdXcw9159img0w8EhAByT2YSTLEHqznBp_gsrQvGhQmDJm3gL_gLZ0ov0yNeZR3emUQ1A",
            "scope": "GOOGLE",
            "types": [
              "hospital",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "Rua Marechal Floriano Peixoto, 300 - Centro, Blumenau"
          },
          {
            "geometry": {
              "location": {
                "lat": -26.918071,
                "lng": -49.07050599999999
              },
              "viewport": {
                "northeast": {
                  "lat": -26.9166876197085,
                  "lng": -49.0691119697085
                },
                "southwest": {
                  "lat": -26.9193855802915,
                  "lng": -49.0718099302915
                }
              }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png",
            "id": "db4399b2d6d6e47d4bb9e2bcf3f57beac9461602",
            "name": "InterBlu Centro Clínico",
            "opening_hours": {
              "open_now": false,
              "weekday_text": []
            },
            "photos": [
              {
                "height": 2362,
                "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/112478087406844742865/photos\">InterBlu Centro Clínico</a>"
                ],
                "photo_reference": "CmRaAAAAo8ZJAvQVJizCraI4ILRVyWcvS0EOezIVdE9RB9udFNti3QyiAsfynlwhVDe3XDPIBiWbanlIiIpLgjtGKxKw7Kc1UNc4fZuSXIre2JpD_n75tRPoFcCa8H4KZ8wfGkB2EhCX1xk1zrmMJFMrLNytLcxQGhRL-faShPJ-tvRcZbkjcxtEAGHaPg",
                "width": 3543
              }
            ],
            "place_id": "ChIJDRi2oMQY35QR1HGnoJLcMOc",
            "rating": 4.1,
            "reference": "CmRSAAAAemm-_SeGQDKxX0ZSBA154Yvsn4-SJuu7aC3dnxI7TUyrh36ozMGAFZddOued8Qjiqhij__cIG9Vx98KiP0--yhyvPAhVR_qwT5Xn_GgvkB1QnIrpe-I7_KA1QhrlIf_jEhAWmGTstj86aERROPLA-Z1FGhQX8GfZrmkW4C0dq79ccBDUXiAv9w",
            "scope": "GOOGLE",
            "types": [
              "hospital",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "Rua Sete de Setembro, 1535 - Centro, Blumenau"
          },
          {
            "geometry": {
              "location": {
                "lat": -26.9030545,
                "lng": -49.0895663
              },
              "viewport": {
                "northeast": {
                  "lat": -26.9016543697085,
                  "lng": -49.08825211970851
                },
                "southwest": {
                  "lat": -26.9043523302915,
                  "lng": -49.09095008029151
                }
              }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png",
            "id": "2804736e3f00d1c64b0c86ae6066f17708878641",
            "name": "Unimed Blumenau - Pronto Atendimento",
            "opening_hours": {
              "open_now": true,
              "weekday_text": []
            },
            "photos": [
              {
                "height": 2448,
                "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/109859196930044267975/photos\">Adriano Monteiro</a>"
                ],
                "photo_reference": "CmRaAAAAEz5wascz-mRsVrn7xjGQ4la5VKv-AbD_Q64znFJXJBcVT4-FJCmUU0vnmLo8VII7R8D9BYcY3D22L9iyBg0UVJToZk_5MJy0Cb8XlT66EQRVD_2AGCpAl3MQ1Dp31iTJEhBrAZLu6XkKLvLX7oWcRiD3GhQ3QRnlcP1hE3JiILjDCM95U7K0bA",
                "width": 3264
              }
            ],
            "place_id": "ChIJjyLJVtAe35QRyL76Izp0x28",
            "rating": 3.2,
            "reference": "CmRRAAAAyshwWf8JaDZUE507rcLwgs1CWtkeMGpJVbriGvsbhmLWDwLq9yxDLm5yQCroSapiildyzdNElWAHytCNPHXNUBD5Dh2Vp6dyB4Mrg-LxHEuT30PK3f5WO4o_AerffgsCEhC-Axe2LS86qwQAwAMKJzNmGhRlmo33voT14tpGEUb1BYgx0kvxTg",
            "scope": "GOOGLE",
            "types": [
              "hospital",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "Rua Almirante Barroso, 1159 - Vila Nova, Blumenau"
          },
          {
            "geometry": {
              "location": {
                "lat": -26.9292552,
                "lng": -49.0556679
              },
              "viewport": {
                "northeast": {
                  "lat": -26.92797576970849,
                  "lng": -49.0544423197085
                },
                "southwest": {
                  "lat": -26.9306737302915,
                  "lng": -49.0571402802915
                }
              }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png",
            "id": "6df303351e2d9009c0700fd8115935337e164ae3",
            "name": "Vacinas Santa Catarina",
            "opening_hours": {
              "open_now": false,
              "weekday_text": []
            },
            "place_id": "ChIJ6VqYDo4Y35QRJkwZI31A7f4",
            "rating": 2,
            "reference": "CmRSAAAAu5xeCtpbcGuPqxviMY9JnkxjgY7PYpFt0WqvCLudLuy1rmDWOR3vrzdT1lHAmv82zysq_ZVIvJftOtEk60-AZiW19mLDEFhIk6SF0Og7DJ6tbLQaQlh4PIc8XeD-lAmzEhDAb8VOHT4mhZA_rcgKfthqGhQYx2PKwYe8oda8qTUrBklk4HIsTw",
            "scope": "GOOGLE",
            "types": [
              "hospital",
              "health",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "Rua Prefeito Frederico Busch Júnior, 255 - Garcia, Blumenau"
          },
          {
            "geometry": {
              "location": {
                "lat": -26.9292491,
                "lng": -49.0563601
              },
              "viewport": {
                "northeast": {
                  "lat": -26.9278727197085,
                  "lng": -49.0548607197085
                },
                "southwest": {
                  "lat": -26.9305706802915,
                  "lng": -49.0575586802915
                }
              }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png",
            "id": "9229bc86fc915ebb6ba9d681551fbf6d179df6ad",
            "name": "Angioklinik - Unidade 2",
            "opening_hours": {
              "open_now": false,
              "weekday_text": []
            },
            "place_id": "ChIJWfwgDI4Y35QREMzSprdnkYY",
            "reference": "CmRSAAAAQR1SxwlA4FRa2aSgGAWA5GwS6MSjxlLPZsd6xT49fLw5YKd_RmBx_uvPAzxcBwRds_m15foh3Yo1jIvC-C81vPfy3tVkHIdejk6Xq8JWqcd9PeQ4wyhcOY758vsOp9E7EhCq6LXWfP__OP7ckvwNV9bKGhSAHDysJqP9TjbeJhPAAQTEs-ckoA",
            "scope": "GOOGLE",
            "types": [
              "hospital",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "Rua Prefeito Frederico Busch Júnior, 220 - Sala 601 - Garcia, Blumenau"
          },
          {
            "geometry": {
              "location": {
                "lat": -26.9279961,
                "lng": -49.0561319
              },
              "viewport": {
                "northeast": {
                  "lat": -26.9266515697085,
                  "lng": -49.05475681970849
                },
                "southwest": {
                  "lat": -26.9293495302915,
                  "lng": -49.05745478029149
                }
              }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
            "id": "fe688bd5692eb60e7e70a9b2ef4f1f3ed6b8cae9",
            "name": "Clínica Otomedic Otorrinolaringologia",
            "opening_hours": {
              "open_now": false,
              "weekday_text": []
            },
            "photos": [
              {
                "height": 1375,
                "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/116682455567000944816/photos\">Clínica Otomedic Otorrinolaringologia</a>"
                ],
                "photo_reference": "CmRaAAAAJrISvn4rWQPu1mjRMDQOCutQF0fsh3TaBOUgJy9tgiWs2Q_Psiv1b2Jl7rHMDk2xfwoZAQ1qqZQxc4db-78lr_9Vv3Vo0WMdw51One6hhe99AYFA4EvGL5yOLE2131nrEhASMgyYknze8snOC9V9ms_mGhSfcbWVnRWKduullrvLyMoOgW-ayw",
                "width": 1372
              }
            ],
            "place_id": "ChIJM6APAo4Y35QRqG-EBSCQdF4",
            "reference": "CmRRAAAAAnHsgb21mxYtuQ8nsroZ7UEr7quaiPu04sClRE3diAiCeEoRCfsKDfJn_8yVcGFlT9e2SR3BJPxo8ARjl7z4RNemJgI0RirpxwaCIP3O9yutnf3yVsRuLQnX-h65XOhWEhCBPL5dHHXVhGjIVz8D33a8GhRP9KqB_S3-XUOBruI5l03j4Suuvw",
            "scope": "GOOGLE",
            "types": [
              "hospital",
              "doctor",
              "health",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "Rua Armando Odebrecht, 70 - 510 - Garcia, Blumenau"
          },
          {
            "geometry": {
              "location": {
                "lat": -26.9264488,
                "lng": -49.062622
              },
              "viewport": {
                "northeast": {
                  "lat": -26.92515491970849,
                  "lng": -49.06128906970849
                },
                "southwest": {
                  "lat": -26.9278528802915,
                  "lng": -49.06398703029149
                }
              }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png",
            "id": "ef30a1d4161baf7eecb67a94e62f15ec0b96aadb",
            "name": "Clínica de Oncologia Reichow",
            "opening_hours": {
              "open_now": false,
              "weekday_text": []
            },
            "place_id": "ChIJcQpy7MPh3pQRQ9DJ2ZAWh2w",
            "rating": 5,
            "reference": "CmRRAAAAUc54RmrRInuc-q9Fr9HevNZmX-nQNqd2P0ucIEZlDJpV1oXwSiOm1oRvPGKOkh_P42ZYPxUgj1QkzAZkkMLnDYRETYnxDWaPw7aUHXoZ9BJTBdI9PqpJTa7x-S8dkLRSEhCWq7VVFldnGYih5YpxFmb-GhR7QqUdtGRD-_6b1iDHhi96_9hVJw",
            "scope": "GOOGLE",
            "types": [
              "hospital",
              "health",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "Rua Sebastião Cruz, 90, Blumenau"
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
            "reference": "CmRSAAAAx4YRBJmKV5JwxF-TeohJIxBDf0EK6tAP7UV-DL-7F-_UXIu4BnsSjk8oL50GQWN3bXEc2XOWDKRpqH6xWdgzAWLhs9RcFMXWOYg1DFEUa2VHRawxXmq8thLClsaYR0uYEhBgCPzFPKriHxB6A8I3OWOoGhTslHz9UUiZTcaFkElNAZXMIA2kKQ",
            "scope": "GOOGLE",
            "types": [
              "hospital",
              "health",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "Rua São Paulo, 1166 - Victor Konder, Blumenau"
          },
          {
            "geometry": {
              "location": {
                "lat": -26.9335486,
                "lng": -49.0558541
              },
              "viewport": {
                "northeast": {
                  "lat": -26.9322742697085,
                  "lng": -49.0542901197085
                },
                "southwest": {
                  "lat": -26.9349722302915,
                  "lng": -49.0569880802915
                }
              }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png",
            "id": "8a76bcdfcfe6b6707a89ef19e3bad0498fa2c6d3",
            "name": "União Saúde",
            "opening_hours": {
              "open_now": false,
              "weekday_text": []
            },
            "photos": [
              {
                "height": 701,
                "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/110065846554283439863/photos\">União Saúde</a>"
                ],
                "photo_reference": "CmRaAAAAinK1cM7sofvU9VY-GpmQ8kAiDJeMp0m8d24xu84OWSSmI_Bpd4siMqaG71P1GtJw5SxL73XGd6WzDxxIkZbNuzhL7JvlACtYJPak-2kk4-d8xB0U05mcZwFFvHbfeZS7EhD0Gsl-sDHE86jWCKiDhiwDGhQqT6t0eg8jIehsdurgAfaU8AREvg",
                "width": 702
              }
            ],
            "place_id": "ChIJAdaBrXbl3pQRt0zs2k84Knk",
            "rating": 2.3,
            "reference": "CmRRAAAAfIdX8U9owiYE5ct00FRdOvQgoT0PowLV-uC2lTGr6qPP3BRL0dyzA0BgH2BdzdfefEeVFzKPS-OBivxaQO3TKNCAzVS0V6qIWW2WiYedhO0lGMDm7PZw1lgbyLAhsqBdEhBF1i9zBKvAbJT5PPeQIsa-GhQRxI2TVyd6_qfjvKnvyOUnrTZ0Ww",
            "scope": "GOOGLE",
            "types": [
              "hospital",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "Rua Prefeito Frederico Busch Júnior, 124 - Sala 505 - Garcia, Blumenau"
          },
          {
            "geometry": {
              "location": {
                "lat": -26.9288099,
                "lng": -48.948008
              },
              "viewport": {
                "northeast": {
                  "lat": -26.9274708197085,
                  "lng": -48.9467081697085
                },
                "southwest": {
                  "lat": -26.93016878029151,
                  "lng": -48.9494061302915
                }
              }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png",
            "id": "80a66c1249bb42c18b458ad8a443cee13be2fe96",
            "name": "Gene Clínica Materno Infantil",
            "opening_hours": {
              "open_now": false,
              "weekday_text": []
            },
            "place_id": "ChIJ-WtugLok35QRtjPCAbBpLXY",
            "rating": 5,
            "reference": "CmRRAAAAT6XbR8vwbCUSKl-FgykRDL8PJe2BESSjmV9SPSSY3trfCk0Xku6FzE7maOKuBT_WiADntbZPQNfbUCitGsYZ6MXEsgW5Rx0uCe0uc07swLZt4Saa_c-VgBCrQgMdCt8REhAxRqYowYeLCRE3DSdPVR48GhR9ulp6eJdMXiUiq9gFNzyt4RU2Aw",
            "scope": "GOOGLE",
            "types": [
              "hospital",
              "health",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "Rua José Krauss, 60 - Sete de Setembro, Gaspar"
          },
          {
            "geometry": {
              "location": {
                "lat": -26.9184427,
                "lng": -49.0708043
              },
              "viewport": {
                "northeast": {
                  "lat": -26.9169245697085,
                  "lng": -49.0692274197085
                },
                "southwest": {
                  "lat": -26.9196225302915,
                  "lng": -49.0719253802915
                }
              }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png",
            "id": "1cef07a51e7dcae4413d0de037c210f5b4e04da3",
            "name": "Interblu - Centro Clínico",
            "opening_hours": {
              "open_now": false,
              "weekday_text": []
            },
            "photos": [
              {
                "height": 1728,
                "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/104599955404014871500/photos\">Flavio da Silva</a>"
                ],
                "photo_reference": "CmRaAAAAXb-tPz3dAN9Q7raaeoXF3VUd3AMZgki_ooADT_UuxWTSLeHZ3tt2syrXkJ047uB6ccHQYGTjEbLjGeTIDS2X2W0yKYiuQ9vO_yi-_BxeGbITRUBAdCE-ZMF4Gx38Pe3cEhBH9bWnVBuIFoTX9CsE1WyVGhSzl62KCx99HMpKV5fWl6i20Byl7Q",
                "width": 2592
              }
            ],
            "place_id": "ChIJF4Fq4f212JQRM546puKanAE",
            "rating": 3.3,
            "reference": "CmRRAAAAIhoXuKUxGgZDD0BAU_99_b2c-SmthHbB4BTlM4sQsIjzTD3FbgiqOPMzjJ4h55zDlUBLaOV9hjx_HIUbCa2AP7Qv20pCZ0WRv_qNI-FrSlSQAKOCkl98QK8JWHZwO6ZfEhALIGXOdKaYO5H8R3okBlrKGhQL8gfUDhp016eJp6dk90n5QWJrEg",
            "scope": "GOOGLE",
            "types": [
              "hospital",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "Rua Sete de Setembro, 1535 - Centro, Blumenau"
          },
          {
            "geometry": {
              "location": {
                "lat": -26.9264391,
                "lng": -49.0558218
              },
              "viewport": {
                "northeast": {
                  "lat": -26.9250901197085,
                  "lng": -49.05447281970851
                },
                "southwest": {
                  "lat": -26.9277880802915,
                  "lng": -49.05717078029151
                }
              }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
            "id": "691c49c99ee108e2fdf812a1494ab627fe4dcc12",
            "name": "Ortopedia COB",
            "opening_hours": {
              "open_now": false,
              "weekday_text": []
            },
            "place_id": "ChIJXamvg5EY35QRoejXWvm_Iyk",
            "reference": "CmRRAAAAyZIA8cVaIJkj_HeK85A0Js_VYHa41gAj9rDjdo-RFqIVQNW3dJ5Dsx6p32gWsMWDANBYW-jXFsUL3b1URGGZ_vb2YwNUD_ChS4GS9KllZd2f6asu8f-lnPXD7aDbamJOEhCVXJvaG0BqQFUpSB6oFScNGhSdLDsdovCqlpBdhFB-ma1qwlWvew",
            "scope": "GOOGLE",
            "types": [
              "hospital",
              "health",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "Rua Amazonas, 301 - Garcia, Blumenau"
          },
          {
            "geometry": {
              "location": {
                "lat": -26.920958,
                "lng": -49.064334
              },
              "viewport": {
                "northeast": {
                  "lat": -26.9194762697085,
                  "lng": -49.06294491970851
                },
                "southwest": {
                  "lat": -26.9221742302915,
                  "lng": -49.06564288029151
                }
              }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
            "id": "5819bbfa2fcc004c0665d040ece9f9bd911425d3",
            "name": "Coisas Brancas, Aventais, Dolmas, Jalecos, Calça, Personalizado, Acinturado, Bordado Logo",
            "opening_hours": {
              "open_now": false,
              "weekday_text": []
            },
            "photos": [
              {
                "height": 1284,
                "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/115037338403589938245/photos\">Coisas Brancas, Aventais, Dolmas, Jalecos, Calça, Personalizado, Acinturado, Bordado Logo</a>"
                ],
                "photo_reference": "CmRaAAAABpnn1XP2itBns9WLXvsy8QT4tRYpUQqqulLYaPnGU5BVLiMQG10IFTXo2ez8QXyeHgr5IcNiP4_0FDreot2aIgzAQXHqnxkoiV0GdRtzc0El_8J0fTrmqIEvntWu7Rq8EhAtv44ZmYM06wwmMjFKLyPYGhQEpaajdbphLdmY0bgJXN1A9UMlYQ",
                "width": 1600
              }
            ],
            "place_id": "ChIJ40f6KcAY35QRNOXOWUj53_U",
            "rating": 4.9,
            "reference": "CmRSAAAAlxkF4OJdl3xn38UavstjFG42yX1xvz79Uk_j0eLaSwoJamXYM93RnOi0eUrVVMRDjMMs-qAcOdJ2vAtUL7ZxdwaSLO6SLH1F1CC1Gh3gh1FkvRN5y85QUlFqKV2N1q9GEhDzae1cp372ieMciPgjvB7pGhSfcizSsHDw4pUhQEvt4qWWxBvUEw",
            "scope": "GOOGLE",
            "types": [
              "dentist",
              "hospital",
              "doctor",
              "health",
              "clothing_store",
              "store",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "Edifício Hering - Rua Quinze de Novembro, 759 - 2° Piso - Centro"
          },
          {
            "geometry": {
              "location": {
                "lat": -26.9279106,
                "lng": -49.0560643
              },
              "viewport": {
                "northeast": {
                  "lat": -26.9266515697085,
                  "lng": -49.0547320697085
                },
                "southwest": {
                  "lat": -26.9293495302915,
                  "lng": -49.0574300302915
                }
              }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png",
            "id": "20a0586b3634eefb57cf0fd5a1ca2b7394c668f7",
            "name": "Centro Médico Dr. Martins -Cirurgia Maxilofacial/ Cirurgia Plástica",
            "opening_hours": {
              "open_now": false,
              "weekday_text": []
            },
            "photos": [
              {
                "height": 1170,
                "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/110024797585016823317/photos\">Centro Médico Dr. Martins -Cirurgia Maxilofacial/ Cirurgia Plástica</a>"
                ],
                "photo_reference": "CmRaAAAA8bqDOkFl3eHk10gRzhuaga0-3YX9IcVKRlaBfg9J-AcFUxdj7Z3LXcr_Nnq43JmKfmUvvn-P4AzPDpkiPa07L1c-BpZ4gXyAtGkJVT-mSr8dPUlSZsi5nX3v4vEdks2eEhAla4blgzK4dY-WDEtwd6p9GhQiNF7oqF3vsoFqvWo-DDgtqT3KEg",
                "width": 1170
              }
            ],
            "place_id": "ChIJ3egIAo4Y35QRovAtX7o3_cs",
            "rating": 4,
            "reference": "CmRSAAAAUEB3q81Yj2XTFTGaiHPSnzytxl-c8KWSrVCFQkIT-oRY1dftNoHvEQ69-4pXRZDqmgustT1Win-6MQ7u-duN96cAodRosMtynvh17IGi6i4DpaOkXfYZ6Cjw-lwrJ6nGEhB2_Mi2NynuZSGyGwDUMKwrGhT1G3xHB0_6x9o_gTjKswSHBecBEA",
            "scope": "GOOGLE",
            "types": [
              "hospital",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "Rua Armando Odebrecht, 70 - Garcia, Blumenau"
          },
          {
            "geometry": {
              "location": {
                "lat": -26.8838574,
                "lng": -49.0638956
              },
              "viewport": {
                "northeast": {
                  "lat": -26.8825410197085,
                  "lng": -49.0626348197085
                },
                "southwest": {
                  "lat": -26.8852389802915,
                  "lng": -49.06533278029149
                }
              }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png",
            "id": "9f6027fe8cfd1999613cd16b6cfcaabaa52c136b",
            "name": "Sonomax",
            "opening_hours": {
              "open_now": false,
              "weekday_text": []
            },
            "place_id": "ChIJm8iNGJQY35QR7SZzMOaLoh0",
            "rating": 5,
            "reference": "CmRRAAAAQXjaMyip7NZPPkoTo2aigQC8tyPNMdInK_o1eAHaGQth4Y5ThMDqAaI_9JAN23MSYheOIyoeiHp4hyLk3O7yEFGWdReApqK1JTJseQVI7LBIt9HJGQflhBJcIEVWqbzAEhB0Ss-lW3uE1PkCb97Qe32wGhT6ZDKmKawHF1lVFAbdkCE88NS1-g",
            "scope": "GOOGLE",
            "types": [
              "hospital",
              "doctor",
              "insurance_agency",
              "health",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "89.055-, Rua José Steil, 70 - Fortaleza, Blumenau"
          },
          {
            "geometry": {
              "location": {
                "lat": -26.9308223,
                "lng": -48.9538068
              },
              "viewport": {
                "northeast": {
                  "lat": -26.9294915697085,
                  "lng": -48.9524333697085
                },
                "southwest": {
                  "lat": -26.93218953029151,
                  "lng": -48.9551313302915
                }
              }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png",
            "id": "9ff4b74a5ad7c6d41ad2104a6f24815534da209e",
            "name": "Secretaria Municipal de Saúde e Assistência Social de Gaspar",
            "place_id": "ChIJA9NciKUk35QR4Gwt9y7K2OY",
            "rating": 2.5,
            "reference": "CmRSAAAAuY1XcvuFpg-5gXafNg_uD_yGC2BGV_QM8ADkfTNtSWP5gETLWgpAlYA7PU265EXaHIo2NdxUp1FGYxn48tTliC3AlhtXxaPM61zBA07TtVSps5HpMKq8a35rUWr5Yk8sEhCwryTB8L6XhRvaxQZ6riPoGhSI5899MvQdsAS3yG-OUnv4mvH4KA",
            "scope": "GOOGLE",
            "types": [
              "hospital",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "Gaspar"
          },
          {
            "geometry": {
              "location": {
                "lat": -26.8653344,
                "lng": -49.1225166
              },
              "viewport": {
                "northeast": {
                  "lat": -26.8640262697085,
                  "lng": -49.1211694197085
                },
                "southwest": {
                  "lat": -26.8667242302915,
                  "lng": -49.12386738029149
                }
              }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png",
            "id": "3d15c1baf9a58fea901dad74c300d05b50d604b6",
            "name": "Metalúrgica Hospitalar Coninck Ltda",
            "place_id": "ChIJZU1xj98d35QR5za7lC7MJ-I",
            "rating": 5,
            "reference": "CmRSAAAA0MgzsoxcNdq5Kj_FZLVk4aRDHVdpiTeN3NpAf0bwvQX3YyvneIX9ruGe8FfKB3pCQir9ak0-o8GyjSnkFdkeH7ifVS3VCajRXBxgRucXJ-RSB9SdY7MDwRjG7qzc1bgMEhAZsaZ0WDUMeFe83RLwi09tGhRTsusMW8uD9P0sO5Usk8pyZ6JlBQ",
            "scope": "GOOGLE",
            "types": [
              "hospital",
              "point_of_interest",
              "establishment"
            ],
            "vicinity": "Rua Johann Sachse, 2377 - Salto Norte, Blumenau"
          }
        ],
        "status": "OK"
      };
    }

    function generateRoute(latOrigin, lngOrigin, latDest, lngDest) {
      var directionsRequest = {};
      directionsRequest.origin = setPosition(latOrigin, lngOrigin);
      directionsRequest.destination = setPosition(latDest, lngDest);
      directionsRequest.travelMode = google.maps.TravelMode.DRIVING;
      directionsRequest.unitSystem = google.maps.UnitSystem.METRIC;
      directionsRequest.provideRouteAlternatives = true;

      directionsDisplay.setMap($scope.map);
      return directionsService.route(directionsRequest, function (result, status) {
        if (status == 'OK') directionsDisplay.setDirections(result);
      });
    }

    function setPosition(lat, lng) {
      return new google.maps.LatLng(lat, lng);
    }

    function setInfoBox(contentString) {
      return new google.maps.InfoWindow({
        content: contentString
      });
    }

    function getClickedHospitalsDataFormatted(name, patient, waiting) {
      var html = '<b>' + name + '</b></br>';
      html += '<b>Total de Pacientes:</b>'+patient+'</br>';
      html += '<b>Tempo de Espera Médio:</b>'+waiting+'min';
      return html;
    }
  });
