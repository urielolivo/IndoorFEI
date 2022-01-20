var map = L.map('map', {
    maxZoom: 21,
    minZoom: 18,
    maxBounds: [
        //sur oeste
        [19.54068, -96.92768],
        //north east
        [19.54230, -96.92665]
        ], 
}).setView([19.54126, -96.2720], 20);

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
let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    minZoom: 19,
    maxZoom: 30,
    subdomains:['mt0','mt1','mt2','mt3']
});

// google hybrid

let googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    minZoom:19,
    maxZoom: 30,
    subdomains:['mt0','mt1','mt2','mt3']
});


var nivel3 = L.geoJSON(hqData, {
      style: function () {
                return {color: "#154F72"};
              },
   onEachFeature: function (feature, layer) {


    layer.bindPopup('<h3>'+feature.properties.name+'</h3><p>Nivel: '+feature.properties.level+'</p><p>Personal: '+feature.properties.personal+'</p>' + feature.properties.tags + "</dd>");
 }
})



//var marker = L.markerClusterGroup();
var nivel22 = L.geoJSON(hqData2, {
    style: function (feature) {
              return {color: "#16B1C7"};
            },

  onEachFeature: function (feature, layer) {



      layer.bindPopup('<h3>'+feature.properties.name+'</h3><p>Nivelo: '+feature.properties.level+'</p><p>Personal: '+feature.properties.personal+'</p><p>Página:  '+feature.properties.pagina+'</p>' + feature.properties.tags + "</dd>");
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
var popup = marca.bindPopup('ubicacion poerson'+ marca.getLatLng()).openPopup()

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
/*map.on('mousemove', function(e){
   document.getElementsByClassName('coordinate')[0].innerHTML = 'lat: ' + e.latlng.lat + ' lng: ' + e.latlng.lng;
  //  console.log('lat: ' + e.latlng.lat, 'lng: ' + e.latlng.lng)
}) */ 




/* +++++ AGREGAR CAPAS DE RUTEO +++++ 
var  nmarker = 0;
var layerGroup = L.layerGroup().addTo(map);
var markerArray = [];
map.on('dblclick', function(e) {
   var popup3 = e.latlng;
   if (nmarker< 2) {
       var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
       marker.addTo(layerGroup);
       var coordinates = [marker.getLatLng().lat, marker.getLatLng().lng];
       markerArray.push(coordinates);
       drawLine(markerArray);
       nmarker= nmarker+1
   }else{
	   swal.fire( 'Seleccione el boton de Limpiar selección','')
	   console.info("son mas de dos"+ nmarker)
   }


});


 /*  ++++ Creacion de linea de separacion de puntos */
/*function drawLine(marray) {
    var polyline = L.polyline(marray,{color: 'red'}).addTo(map);
    polyline.addTo(layerGroup);
}*/ 


$("#ruta").click(function (){
		nmarker = 0;
		map.removeLayer(layerGroup);
	})


/*
map.on('click', function (e){
    popupdata= [];
    document.getElementsByClassName('coordinate')[0].innerHTML = 'lat: ' + e.latlng.lat + ' lng: ' + e.latlng.lng;
    if(popupc){
        console.info("ya hay un marcadorc")
        map.removerLayer(popupc)
    }else
   // popupdata.push('prueba lat: ' + e.latlng.lat, 'lng: ' + e.ltlng.lng)
    console.log(popupdata)
    //popupdata.addTo(map);
    var marcac = L.marker([e.latlng.lat, e.latlng.lng], {draggable: true})
    var popupc = marcac.bindPopup('ubicacion'+ marcac.getLatLng()).openPopup()
    popupc.addTo(map);

})

*/


function mostrar() {
    document.getElementById("sidebar").style.width = "300px";
    document.getElementById("contenido").style.marginLeft = "300px";
    document.getElementById("abrir").style.display = "none";
    document.getElementById("cerrar").style.display = "inline";
}




	 var salamancaMonumental = L.layerGroup().addTo(map);

	 			function colorPuntos(d) { 
					return d == "aula102" ? '#FF0000' : 
						'#FF0000'; 
				};

				function estilo_monumentos (feature) {
					return{
						radius: 7,
						fillColor: colorPuntos(feature.properties.name), 
			    		color: colorPuntos(feature.properties.name), 
						weight: 1,
						opacity : 1,
						fillOpacity : 0.5
					};
				};
				function popup_monumentos (feature, layer) {
            document.getElementById("menu-bar").checked = true;				    

        document.getElementById('bt21').innerHTML = "<div style=text-align:center><h2>"+feature.properties.name+
			"<h2></div>" + "<hr><table><tr><td> Referencia: "+feature.properties.ref+
			"</td></tr><tr><td>Personal: "+feature.properties.personal+
			"</td></tr><tr><td>Nivel: "+feature.properties.level+
			"</td></tr><tr><td>Página: "+feature.properties.pagina+
			"</td></tr><tr><td>Puntos Cercanos: "+feature.properties.pref+
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
			 	var monumentos = L.geoJSON(hqDat, {
							pointToLayer: function (feature, latlng) {
									return L.circleMarker(latlng, MarkerOptions);
								},	
							style:estilo_monumentos,
							onEachFeature: popup_monumentos	
					});		

			 	//salamancaMonumental.addLayer(monumentos);	
	
	}


	$("#buscar").click(function(){
		var miSelect = document.getElementById("nombres").value;
		if (miSelect == ""){
			swal.fire( 'El contenido no puede ir vacio')

		}
		var monumentos = L.geoJSON(hqDat, {
			pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, MarkerOptions);
				},
			filter: function(feature, layer) {
				if(miSelect != "TODOS"){
					var x = feature.properties.name == miSelect;
					console.log(x);
					return (feature.properties.centro == miSelect || feature.properties.name == miSelect || feature.properties.pe == miSelect || feature.properties.ref == miSelect || feature.properties.servicio == miSelect  || feature.properties.personal == miSelect || feature.properties.servicio1 == miSelect || feature.properties.servicio2 == miSelect);
					//alert("hola");
					}	else
						return true;
				},
			style:estilo_monumentos,
			onEachFeature: popup_monumentos
		});
		salamancaMonumental.clearLayers();
		salamancaMonumental.addLayer(monumentos);
	});


