var map = L.map('map').setView([19.54126, -96.92720], 19); //Se le asiganan las coordenadas de la facultad 
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 19,
        maxZoom: 30,
        attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      function buildOverpassApiUrl(map, overpassQuery) {
        var bounds = map.getBounds().getSouth() + ',' + map.getBounds().getWest() + ',' + map.getBounds().getNorth() + ',' + map.getBounds().getEast();
        var nodeQuery = 'node[' + overpassQuery + '](' + bounds + ');';
        var wayQuery = 'way[' + overpassQuery + '](' + bounds + ');';
        var relationQuery = 'relation[' + overpassQuery + '](' + bounds + ');';
        var query = '?data=[out:json][timeout:15];(' + nodeQuery + wayQuery + relationQuery + ');out body geom;';
       var baseUrl = 'http://overpass-api.de/api/interpreter';
        var resultUrl = baseUrl + query;
        return resultUrl;
      }

$("#uno").click(function(){
    
    alert("holamunod");
    var level1 =  buildOverpassApiUrl(map, 'level=1');
    
}); 




// Hacer la consulta por medio de una busqueda 
$("#query-button").click(function () {
	 // var queryTextfieldValue = 'level=1';


          var queryTextfieldValue = $("#query-textfield").val()
          var overpassApiUrl = buildOverpassApiUrl(map, queryTextfieldValue);
        
        $.get(overpassApiUrl, function (osmDataAsJson) {
          var resultAsGeojson = osmtogeojson(osmDataAsJson);
          var resultLayer = L.geoJson(resultAsGeojson, {
            style: function (feature) {
              return {color: "#333c87"};
            },
            filter: function (feature, layer) {
              var isPolygon = (feature.geometry) && (feature.geometry.type !== undefined) && (feature.geometry.type === "Polygon");
            //  if (isPolygon) {
              //  feature.geometry.type = "Point";
               // var polygonCenter = L.latLngBounds(feature.geometry.coordinates[0]).getCenter();
               // feature.geometry.coordinates = [ polygonCenter.lat, polygonCenter.lng ];
             // }
              return true;
            },
            onEachFeature: function (feature, layer) {
              var popupContent = "";
              popupContent = popupContent + "<dt>@id</dt><dd>" + feature.properties.type + "/" + feature.properties.id + "</dd>";
              var keys = Object.keys(feature.properties.tags);
              keys.forEach(function (key) {
                popupContent = popupContent + "<dt>" + key + "</dt><dd>" + feature.properties.tags[key] + "</dd>";
              });
              
            }
          }).addTo(map);
            
        });
      });



    
