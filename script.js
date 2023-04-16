var map;
var markers = [];
var infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.422, lng: -122.084},
    zoom: 16
  });
  infoWindow = new google.maps.InfoWindow();
  addMarkersToMap();
}

function addMarkersToMap() {
  var buildings = [
    {name: "Smith Hall", type: "academic", accessibility: "accessible", location: {lat: 37.422, lng: -122.084}},
    {name: "Jones Hall", type: "academic", accessibility: "partially-accessible", location: {lat: 37.422, lng: -122.086}},
    {name: "Brown Hall", type: "administrative", accessibility: "not-accessible", location: {lat: 37.422, lng: -122.088}}
  ];
  
  for (var i = 0; i < buildings.length; i++) {
    var marker = new google.maps.Marker({
      position: buildings[i].location,
      title: buildings[i].name,
      type: buildings[i].type,
      accessibility: buildings[i].accessibility
    });
    markers.push(marker);
    marker.addListener('click', function() {
      var content = "<h3>" + this.title + "</h3><p>Type: " + this.type + "</p><p>Accessibility: " + this.accessibility + "</p>";
      infoWindow.setContent(content);
      infoWindow.open(map, this);
    });
  }
  showMarkers();
}

function showMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function hideMarkers() {
for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
    }
}
        
function filterMarkers() {
var buildingType = document.getElementById("building-type").value;
var accessibilityType = document.getElementById("accessibility-type").value;
for (var i = 0; i < markers.length; i++) {
    var marker = markers[i];
    if ((buildingType == "all" || marker.type == buildingType) && (accessibilityType == "all" || marker.accessibility == accessibilityType)) {
        marker.setVisible(true);
    } 
    else {
        marker.setVisible(false);
    }
    }
}