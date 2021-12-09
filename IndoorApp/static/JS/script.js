// Inicializacion de map
///var map = L.map('map').setView([19.54126, -96.92720], 18);
var map = L.map('map', {
    maxZoom: 21,
    minZoom: 18,
    maxBounds: [
        //sur oeste
        [19.54068, -96.92768],
        //north east
        [19.54230, -96.92665]
        ], 
}).setView([19.54126, -96.2720], 19);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}) .addTo(map);

L.marker([40.743, -74.176]) .addTo(map);

var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    center: [19.54126, -96.92720],
    maxNativeZoom: 19,
    minZoom: 19,
    maxZoom: 30,
    attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// proveedores de capas
    //osm_mapnik
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxNativeZoom: 19,
    minZoom: 19,
    maxZoom: 30,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


OpenStreetMap_Mapnik.addTo(map);

    //osm_de
var OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',{    
    maxNativeZoom: 19,
    minZoom: 19,
    bbox: [19.54126, -19.54126],
    maxZoom: 30,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

    //google street
googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    minZoom: 19,
    maxZoom: 30,
    subdomains:['mt0','mt1','mt2','mt3']
});

// google hybrid

googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    minZoom:19,
    maxZoom: 30,
    subdomains:['mt0','mt1','mt2','mt3']
});


var nivel3 = L.geoJSON(hqData, {
      style: function (feature) {
                return {color: "#154F72"};
              },
   onEachFeature: function (feature, layer) {
    layer.bindPopup('<h3>'+feature.properties.name+'</h3><p>Nivel: '+feature.properties.level+'</p>' + feature.properties.tags + "</dd>");
 }
})











//var marker = L.markerClusterGroup();
var nivel22 = L.geoJSON(hqData2, {
    style: function (feature) {
              return {color: "#16B1C7"};
            },

  onEachFeature: function (feature, layer) {
    layer.bindPopup('<h3>'+feature.properties.name+'</h3><h3>Nivel: '+feature.properties.level+'</h3>' + feature.properties.id + "</dd>");
  }
})


//+++++++ niveles capas

nivel1 =L.geoJSON(hqData)
nivel2 = L.geoJSON(hqData2)

/*
  //geoserver
varÑ geo = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/feindoor2/wms", {
    layers: 'feindoor2:osm_line',
    format: 'image/png',
    transparent: true,
    attribution: "wms test",
});
*/

//marcador
var marca = L.marker([19.5412371, -96.9271773], {draggable: true})
var popup = marca.bindPopup('ubicacion'+ marca.getLatLng()).openPopup()

//console.log(marca.getLatLng());
    //marca.addTo(map);
popup.addTo(map);



/* +++++++ layer controlador +++++++
 */

var baseMaps ={
    "Google Street" : googleStreets,
    "OSM_Mapnik" : OpenStreetMap_Mapnik,
    "OSM_DE" : OpenStreetMap_DE,
    "Google Hybrid" : googleHybrid,
    //"wms" : geo,

};

var niveles = {
    "Nivel 1" : nivel3,
    "Nivel 2": nivel22,
}

//var overlayMaps = {
  //  "Marker" : marca,  //
//
//
//};


L.control.layers(baseMaps, niveles).addTo(map);



/* ++++++ eventos de leaflet +++
 */
// e
map.on('mouseover',  function (){
    console.log('el mouse esta en el mapa')
});
map.on('mousemove', function(e){
   document.getElementsByClassName('coordinate')[0].innerHTML = 'lat: ' + e.latlng.lat + ' lng: ' + e.latlng.lng;
  //  console.log('lat: ' + e.latlng.lat, 'lng: ' + e.latlng.lng)
})

map.on('click', function (e){
    popupdata= [];
    document.getElementsByClassName('coordinate')[0].innerHTML = 'lat: ' + e.latlng.lat + ' lng: ' + e.latlng.lng;
    if(popupc){
        console.info("ya hay un marcadorc")
        map.removerLayer(popupc)
    }else
    popupdata.push('prueba lat: ' + e.latlng.lat, 'lng: ' + e.latlng.lng)
    console.log(popupdata)
    //popupdata.addTo(map);
    var marcac = L.marker([e.latlng.lat, e.latlng.lng], {draggable: true})
    var popupc = marcac.bindPopup('ubicacion'+ marcac.getLatLng()).openPopup()
    popupc.addTo(map);

})





var geocoder = L.Control.geocoder({
    defaultMarkGeocode: true,
    showResultIcons : true,
    errorMessage: "No se encontró el aula o Laboratorio :(",
    geocodingQueryParams: "Mexico",
    geocoder: L.Control.Geocoder.photon({
		showResultIcons: true,
		geocodingQueryParams: {
		limit: 8,
		osm_tag: '!shop'
		},

    htmlTemplate: function(nivel1) {
			// find out which fields are available
			console.log(nivel1);

			var a = L.extend({
				'type'         : '',
				'level'       : '',
				'name'       : '',
        'nivel' : '',
        'room'       :'',

			},
		nivel1.properties
			),


			string = '<br><small>{osm_value}';

	//		string += '<br><small>{osm_value}';

			if (a.type || a.level|| a.name || a.room ) {

          string += '<h4> {name}{type}  {osm_value} </h4>';
			}




			string += '</small>';

			return L.Util.template(string, a, true);
		}

})
})
  .on('markgeocode', function(e) {
    var bbox = e.geocode.bbox;
    console.info(bbox);
      var poly = L.polygon([
      bbox.getSouthEast(),
      bbox.getNorthEast(),
      bbox.getNorthWest(),
      bbox.getSouthWest(),
     ]).addTo(map);
      map.fitBounds(poly.getBounds('<h3>hola </h3>'));
      }).addTo(map);





//leaflet search
//L.Control.geocoder().addTo(map);
  









/*function buildOverpassApiUrl(map, overpassQuery) {
    var bounds = map.getBounds().getSouth() + ',' + map.getBounds().getWest() + ',' + map.getBounds().getNorth() + ',' + map.getBounds().getEast();
  //  var nodeQuery = 'node[' + overpassQuery + '](' + bounds + ');';
    var wayQuery = 'way[' + overpassQuery + '](' + bounds + ');';
    var relationQuery = 'relation[' + overpassQuery + '](' + bounds + ');';
    var query = '?data=[out:json][timeout:15];(' + wayQuery + relationQuery + ');out body geom;';
    var baseUrl = 'http://overpass-api.de/api/interpreter';
    var resultUrl = baseUrl + query;
    return resultUrl;
} */


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

       $("#query-button").click(function () {
         var nom = 'name='
         var queryTextfieldValue = $("#query-textfield").val();
         var consultafin = nom.concat(queryTextfieldValue);
         console.log(nom.concat(queryTextfieldValue));
         var overpassApiUrl = buildOverpassApiUrl(map, consultafin);

         $.get(overpassApiUrl, function (osmDataAsJson) {
          var resultAsGeojson = osmtogeojson(osmDataAsJson);
           var resultLayer = L.geoJson(resultAsGeojson, {
             style: function (feature) {
               return {color: "#ff0000"};
             },
             filter: function (feature, layer) {
               var isPolygon = (feature.geometry) && (feature.geometry.type !== undefined) && (feature.geometry.type === "Polygon");
               if (isPolygon) {
                 feature.geometry.type = "Point";
                 var polygonCenter = L.latLngBounds(feature.geometry.coordinates[0]).getCenter();
                 feature.geometry.coordinates = [ polygonCenter.lat, polygonCenter.lng ];
               }
               return true;
             },
             onEachFeature: function (feature, layer) {
               var popupContent = "";
               popupContent = popupContent + "<dt>@id</dt><dd>" + feature.properties.type + "/" + feature.properties.id + "</dd>";
               var keys = Object.keys(feature.properties.tags);
               keys.forEach(function (key) {
                 popupContent = popupContent + "<dt>" + key + "</dt><dd>" + feature.properties.tags[key] + "</dd>";
               });
               popupContent = popupContent + "</dl>"
               layer.bindPopup(popupContent);
             }
           }).addTo(map);
         });
       });







$("#uno").click(function () {
    var Nivel = 'level=1'
    var overpassApiUrl = buildOverpassApiUrl(map, Nivel);
        
    $.get(overpassApiUrl, function (osmDataAsJson) {
        var resultAsGeojson = osmtogeojson(osmDataAsJson);
        var resultLayer1 = L.geoJson(resultAsGeojson, {
            style: function (feature) {
		return {color: "#182876"};
            },
            filter: function (feature, layer) {

		return true;
            },
           
        });
        resultLayer1.addTo(map);

    });
});



$("#dos").click(function () {
    var Nivel = 'level=2'
    var overpassApiUrl = buildOverpassApiUrl(map, Nivel);
        
    $.get(overpassApiUrl, function (osmDataAsJson) {
        var resultAsGeojson = osmtogeojson(osmDataAsJson);
        var resultLayer = L.geoJson(resultAsGeojson, {
            style: function (feature) {
		return {color: "#182876"};
            },
            filter: function (feature, layer) {
                return true;
            },
           
        });
        resultLayer.addTo(map);
        map.removeLayer();
    });
});
