// Inicializacion de map
///var map = L.map('map').setView([19.54126, -96.92720], 18);
var map = L.map('map', {
    maxZoom: 19,
    minZoom: 18,
    maxBounds: [
        //sur oeste
        [19.54068, -96.92768],
        //north east
        [19.54180, -96.92665]
        ], 
}).setView([19.54126, -96.2720], 19);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}) .addTo(map);

L.marker([40.743, -74.176]) .addTo(map);


var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    center: [19.54126, -96.92720],
    minZoom: 19,
    maxZoom: 30,
    attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);

// proveedores de capas
    //osm_mapnik
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
   minZoom: 19,
    maxZoom: 30,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
    //osm_de
var OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',{    minZoom: 19,
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


//+++++++ niveles capas

nivel1 = L.geoJSON(hqData)
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
    "OSM_Mapnik" : OpenStreetMap_Mapnik,
    "OSM_DE" : OpenStreetMap_DE,
    "Google Street" : googleStreets,
    "Google Hybrid" : googleHybrid,
    //"wms" : geo,

};

var niveles = {
    "Nivel 1" : nivel1,
    "Nivel 2" : nivel2,
}

var overlayMaps = {
    "Marker" : marca,
};


L.control.layers(baseMaps,niveles, overlayMaps).addTo(map);


/* ++++++ eventos de leaflet +++
 */
// e
map.on('mouseover',  function (){
    console.log('el mouse esta en el mapa')
});
map.on('mousemove', function(e){
    document.getElementsByClassName('coordinate')[0].innerHTML = 'lat: ' + e.latlng.lat + ' lng: ' + e.latlng.lng;
    console.log('lat: ' + e.latlng.lat, 'lng: ' + e.latlng.lng)
})

//leaflet search
L.Control.geocoder().addTo(map);



function buildOverpassApiUrl(map, overpassQuery) {
    var bounds = map.getBounds().getSouth() + ',' + map.getBounds().getWest() + ',' + map.getBounds().getNorth() + ',' + map.getBounds().getEast();
  //  var nodeQuery = 'node[' + overpassQuery + '](' + bounds + ');';
    var wayQuery = 'way[' + overpassQuery + '](' + bounds + ');';
    var relationQuery = 'relation[' + overpassQuery + '](' + bounds + ');';
    var query = '?data=[out:json][timeout:15];(' + wayQuery + relationQuery + ');out body geom;';
    var baseUrl = 'http://overpass-api.de/api/interpreter';
    var resultUrl = baseUrl + query;
    return resultUrl;
}







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
