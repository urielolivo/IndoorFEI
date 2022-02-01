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


var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxNativeZoom: 19,
    minZoom: 19,
    maxZoom: 30,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


OpenStreetMap_Mapnik.addTo(map);


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
					layer.bindPopup("<div style=text-align:center><h3>"+feature.properties.name+
			        "<h3></div><hr><table><tr><td> Tipo: "+feature.properties.id+
			        "</td></tr><tr><td>Nivel: "+feature.properties.level+
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
			swal.fire( 'el contendi no puede ir vacio','You clicked the button!')	

		}
		var monumentos = L.geoJSON(hqDat, {
							pointToLayer: function (feature, latlng) {
									return L.circleMarker(latlng, MarkerOptions);
								},
							filter: function(feature, layer) {								
								if(miSelect != "TODOS"){
								var x = feature.properties.name == miSelect;
									console.log(x);
									return (feature.properties.name == miSelect );
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


