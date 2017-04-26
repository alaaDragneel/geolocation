var locateMe = {

    geo: null,
    locationLink  : document.querySelector('a.locate'),
    locationMap   : document.querySelector('div.map'),
    locationLongitude: null,
    locationLatitude: null,
    myCenter: null,
    mapCanvas: null,
    mapOptions: null,
    map: null,
    marker: null,
    locationLongitudeInput: document.querySelector('input[name=longitude]'),
    locationLatitudeInput: document.querySelector('input[name=latitude]'),

    init: function ()
    {
        if(locateMe.isGeoLocationSupported() === false) { // check if the Browser Support window.navigator.geolocation
          locateMe.locationMap.innerHTML = '<p>Sorry your browser desn\'t support geolocation</p>';
          return;
        }

        locateMe.geo = window.navigator.geolocation; // assign these value
        locateMe.locationLink.addEventListener('click', locateMe.getCurrentPosition); // add event listner
    },
    isGeoLocationSupported: function ()
    {
        return ('geolocation' in navigator) ? true : false; // check if the Browser Support window.navigator.geolocation
    },
    getCurrentPosition: function (e)
    {
        e.preventDefault();

        locateMe.geo.getCurrentPosition(locateMe.onSuccess, locateMe.OnFailure); // get the getCurrentPosition function that found in the locateMe.geo to get the postiotion

        locateMe.locationMap.innerHTML = 'Detecting Your Location...';
    },
    onSuccess: function (Position)
    {
        // NOTE Position argument is provided by the success state
        locateMe.locationMap.innerHTML = '';
        if(locateMe.setCoordinatesData(Position.coords)) {
          locateMe.drawMap();
        }
    },
    OnFailure: function (PositionError)
    {
      // NOTE PositionError argument is provided by the success state
      locateMe.locationMap.innerHTML = PositionError.code;
    },
    setCoordinatesData: function (coords)
    {
        if (typeof coords !== 'object') return false;
        locateMe.locationLatitude = locateMe.locationLatitudeInput.value = coords.latitude;
        locateMe.locationLongitude = locateMe.locationLongitudeInput.value = coords.longitude;
        return true;
    },
    drawMap: function ()
    {
      // NOTE Dynamic Map
      locateMe.myCenter = new google.maps.LatLng(locateMe.locationLatitude, locateMe.locationLongitude);
      locateMe.mapCanvas = locateMe.locationMap;
      locateMe.mapOptions = {center: locateMe.myCenter, zoom: 12};
      locateMe.map = new google.maps.Map(locateMe.mapCanvas, locateMe.mapOptions);
      locateMe.marker = new google.maps.Marker({
        position: locateMe.myCenter,
        animation: google.maps.Animation.BOUNCE
      });
      locateMe.marker.setMap(locateMe.map);

      // NOTE Static Map
      // var img = new Image();
      // img.src = 'https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyBJwSCFAczC3ucxhw_OvVz05LuB0XtRY8Q&' +
      //            'center=' + locateMe.locationLatitude + ',' + locateMe.locationLongitude + '&zoom=16&size=460x220&scale=1'+
      //            '&markers=color:blue%7Clabel:S%7C' + locateMe.locationLatitude + ',' + locateMe.locationLongitude + 'sensor=false';
      // locateMe.locationMap.appendChild(img);
    },
};

/*the locate me is already trigger in the html page in the src of the script tag do'nt un comment the next line*/
// locateMe.init();
