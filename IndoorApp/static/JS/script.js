var map = L.map('map', {

    maxZoom: 20,
    minZoom: 18,
    maxBounds: [
        //sur oeste
        [19.54068, -96.92768],
        //north east
        [19.54230, -96.92665]
        ], 
}).setView([19.54126, -96.2720], 19);
map.doubleClickZoom.disable(); 


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

//
OpenStreetMap_Mapnik.addTo(map);






var OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',{    
    maxNativeZoom: 19,
    minZoom: 19,
    //bbox: [19.54126, -19.54126],
    maxZoom: 30,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

    //google street
let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxNativeZoom: 19,
	minZoom: 19,
    maxZoom: 30,
    subdomains:['mt0','mt1','mt2','mt3']
});

// google hybrid

let googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxNativeZoom: 19,
	minZoom:19,
    maxZoom: 30,
    subdomains:['mt0','mt1','mt2','mt3']
});


var nivel1 = L.geoJSON(hqData, {
      style: function () {
                return {color: "#154F72"};
              },
   onEachFeature: function (feature, layer) {

       layer.bindPopup('<h3>'+feature.properties.name+'</h3><p>Nivel: '+feature.properties.level+'</p><p>'+feature.properties.Descripcion+'</p>' + '</p><p> Punto Cercanos : '+ feature.properties.pref  + "</dd>");
 }
})


//var marker = L.markerClusterGroup();
var nivel22 = L.geoJSON(hqData2, {
    style: function (feature) {
              return {color: "#16B1C7"};
            },
  onEachFeature: function (feature, layer) {

      layer.bindPopup('<h3>'+feature.properties.name+'</h3><p>Nivel: '+feature.properties.level+'</p><p></p> '+feature.properties.Descripcion+'</p><p> Punto Cercanos : '+ feature.properties.pref + "</dd>");
 }
})

var nivel00 = L.geoJSON(hqdatab, {
    style: function (feature) {
              return {color: "#16B1C7"};
            },
  onEachFeature: function (feature, layer) {

        layer.bindPopup('<h3>'+feature.properties.name+'</h3><p>Nivel: '+feature.properties.level+'</p><p></p> '+feature.properties.Descripcion+'</p><p> Punto Cercanos : '+ feature.properties.pref + "</dd>");
 }
})
nivel00.addTo(map);


//marcador
/*var marca = L.marker([19.5412371, -96.9271773], {draggable: true})
*/
//console.log(marca.getLatLng());
    //marca.addTo(map);



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
    "Nivel 0": nivel00,
	"Nivel 1" : nivel1,
    "Nivel 2": nivel22,

}

/// control de capas
L.control.layers(baseMaps, niveles).addTo(map);



/* ++++++ eventos de leaflet +++
 */
map.on('mouseover',  function (){
    console.log('el mouse esta en el mapa')
});

/*$("#ruta").click(function (){
		nmarker = 0;
		map.removeLayer(layerGroup);
	})
*/


function mostrar() {
    document.getElementById("sidebar").style.width = "300px";
    document.getElementById("contenido").style.marginLeft = "300px";
    document.getElementById("abrir").style.display = "none";
    document.getElementById("cerrar").style.display = "inline";
}


var IndoorFei = L.layerGroup().addTo(map);

function colorPuntos(d) {
	return d == "aula102" ? '#FF0000' :
		'#FF0000';
};


function estilo_puntos (feature) {
	return{
		radius: 7,
		fillColor: colorPuntos(feature.properties.name),
		color: colorPuntos(feature.properties.name),
		weight: 1,
		opacity : 1,
		fillOpacity : 0.5
	};
};


function popup_puntos (feature, layer) {
    ///activa la ventanda de informacion
    document.getElementById("menu-bar").checked = true;
	document.getElementById('bt21').innerHTML = "<div style=text-align:center><h2>"+feature.properties.name+
		"<h2></div>" + "<hr><table><tr><td> <b> Referencia: </b> "+feature.properties.ref+
		"</td></tr><tr><td> <b> Nivel <b/>: "+feature.properties.level+
		"</td></tr><tr><td>"+feature.properties.Descripcion+
		"</td></tr><tr><td> <b>Puntos Cercanos</b>: "+feature.properties.pref+
		"</td></tr></table>";

	layer.bindPopup ("<div style=text-align:center><h3>"+feature.properties.name+
		"</td></tr></table>",
		{minWidth: 150, maxWidth: 200});
};

var MarkerOptions = {
	radius: 8,
	fillColor: "#ff7800",
	color: "#000",
	weight: 1,
	opacity: 1,
	fillOpacity: 0.8
};


function myFunction() {
    var puntos = L.geoJSON(hqDat, {
		pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, MarkerOptions);
		},
		style:estilo_puntos,
		onEachFeature: popup_puntos
	});
}



$("#nombres").keypress(function(event) {
    if (event.keyCode === 13) {
            $("#buscar").click();
        }
});
   

///cerrar ventana de información de busqueda
$("#close").click(function(){
     document.getElementById("menu-bar").checked = false;
	      
})


$("#buscar").click(function(){
  
	var miSelect = document.getElementById("nombres").value;
	if (miSelect == ""){
      swal.fire({
      title: 'Error!',
          text: 'El contenido no puede ir vacío.',
          imageWidth: 200,
          imageHeight: 200,
      })

	}

	var puntos = L.geoJSON(hqDat, {
		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, MarkerOptions);
			},
		filter: function(feature, layer) {
			if(miSelect != "TODOS"){
				var x = feature.properties.name == miSelect;
         let result = miSelect.toString().toLowerCase();;
				return (feature.properties.namesn == result || feature.properties.area == result ||feature.properties.serviciosn == result || feature.properties.serviciosn1 == result || feature.properties.name == result || feature.properties.pe == result || feature.properties.ref == result || feature.properties.servicio == result  || feature.properties.personal == result || feature.properties.servicio1 == result || feature.properties.servicio2 == result);
				//
			}	else
				return true;
			},
		style:estilo_puntos,
		onEachFeature: popup_puntos
	});
	IndoorFei.clearLayers();
	IndoorFei.addLayer(puntos);

});





