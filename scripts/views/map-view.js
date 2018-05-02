

// var locationForm = document.getElementById('location-form');
// locationForm.addEventListener('submit', geoCode);

// function geoCode(e){
//   var location = document.getElementById('location-input').value;
//   e.preventDefault();
//   axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
//     params:{
//       address:location,
//       key: 'AIzaSyAVGGzvV04jCERkeyLvyAfLhyw_blWCzZU'
//     }
//   })
//   .then(function(response){
//     console.log(response);
    
//     // address info
//     // var formattedAddress = response.data.results[0].formatted_address;
//     // var formattedAddressOutput = `<ul><li>${formattedAddress}</li></ul>`;
//     // var addressComponents = response.data.results[0].address_components;
//     // var addressComponentsOutput = '<ul>';
//     //   for(var i = 0; i < addressComponents.length; i++){
//     //     addressComponentsOutput +=`
//     //     '<li><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>`
//     //   }
//     //   addressComponentsOutput += '</ul>';
    
//       //lng lat info
//     var lat = response.data.results[0].geometry.location.lat;
//     var lng = response.data.results[0].geometry.location.lng;
//     console.log(lat, lng)
    
//     var geometryOutput = `
//     <ul>
//     <li><strong>Latitude</strong>: ${lat}</li>
//     <li><strong>Longitude</strong>: ${lng}</li>    
//     </ul>
//     `;

//     // document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
//     // document.getElementById('address-components').innerHTML = addressComponentsOutput;  
//     document.getElementById('geometry').innerHTML = geometryOutput;    
//     initMap(lat, lng)
    
//   })
//   initMap(47.6179985, -122.3516122);
//   // meetup.fetchMeetups - check db if its old data then hit server to hit api and get new data
//   // server side function with conditional value
//   // save data in meetups.All[]
//   // for loop to loop over array with 
//   // get lng lat for all meetups 
//   // add markers of meets to map
// }

// function initMap(lat, lng){
//   // console.log('initmap')
// var uluru = {lat: lat, lng: lng};
// var location = uluru;
// var map = new google.maps.Map(document.getElementById('map'), {
//   zoom: 13,
//   center: uluru
// });
// var marker = new google.maps.Marker({
//   position: uluru,
//   map: map
// });
// }
