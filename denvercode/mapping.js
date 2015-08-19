var subNavZ, headerZ, divHeader, divSubNav,
	NPMap = {
		div: 'main-map',
		baseLayers: [
			'mapbox-terrain',
			'nps-parkTiles',
			'esri-topographic',
			'esri-imagery'
		],
		overlays: [{
			name: 'Trails',
			url: 'http://services1.arcgis.com/fBc8EJBxQRMcHlei/arcgis/rest/services/GRSM_TRAILS/FeatureServer/0/query?f=geojson&outSR=4326&where=OBJECTID%20IS%20NOT%20NULL&outFields=NAME',
			type: 'geojson',
			popup: {
				title: '<center>{{TRAILNAME}}</center>'
			},
			styles: {
				line: {
					'stroke': '#cb9733',
					'stroke-opacity': 0.75
				}
			}
		}, {
			name: 'Visitor Centers',
			url: 'http://services1.arcgis.com/fBc8EJBxQRMcHlei/ArcGIS/rest/services/GRSM_VISITOR_CENTERS/FeatureServer/0/query?f=geojson&outSR=4326&where=OBJECTID%20IS%20NOT%20NULL&outFields=*',
			type: 'geojson',
			popup: {
				title: '<center>{{LOC_NAME}}</center>'
			},
			styles: {
				point: {
					'marker-color': '#663300',
					'marker-size': 'small',
					'marker-symbol': 'building'
				}
			}
		}, {
			name: 'Shelters',
			url: 'http://services1.arcgis.com/fBc8EJBxQRMcHlei/ArcGIS/rest/services/GRSM_BACKCOUNTRY_SHELTERS/FeatureServer/0/query?f=geojson&outSR=4326&where=OBJECTID%20IS%20NOT%20NULL&outFields=*',
			type: 'geojson',
			popup: {
				title: '<center>{{TEXT_NAME}}</center>'
			},
			styles: {
				point: {
					'marker-color': '#cb9733',
					'marker-size': 'small',
					'marker-symbol': 'building'
				}
			}
		}, {
			name: 'Roads',
			url: 'http://services1.arcgis.com/fBc8EJBxQRMcHlei/arcgis/rest/services/GRSM_ROAD_CENTERLINES/FeatureServer/0/query?f=geojson&outSR=4326&where=OBJECTID%20IS%20NOT%20NULL&outFields=*',
			type: 'geojson',
			popup: {
				title: '<center>{{FULLNAME}}</center>'
			},
			styles: {
				line: {
					'stroke': '#222222',
					'stroke-opacity': 0.75
				}
			}
		}, {
			name: 'Campsites',
			url: 'http://services1.arcgis.com/fBc8EJBxQRMcHlei/ArcGIS/rest/services/GRSM_BACKCOUNTRY_CAMPSITES/FeatureServer/0/query?f=geojson&outSR=4326&where=OBJECTID%20IS%20NOT%20NULL&outFields=*',
			type: 'geojson',
			popup: {
				title: '<center>{{TEXT_NAME}}</center>'
			},
			styles: {
				point: {
					'marker-color': '#cb9733',
					'marker-size': 'small',
					'marker-symbol': 'campsite'
				}
			}
		}, {
			name: 'Park Boundary',
			url: 'http://services1.arcgis.com/fBc8EJBxQRMcHlei/arcgis/rest/services/Great_Smoky_Mountains_National_Park_Boundary/FeatureServer/0/query?f=geojson&outSR=4326&where=OBJECTID%20IS%20NOT%20NULL&outFields=*',
			type: 'geojson',
			popup: {
				title: '<center>Great Smoky Mountains National Park</center>'
			},
			styles: {
				line: {
					'stroke': '#996515',
					'stroke-opacity': 1.0
				}
			}
		}],
		zoom: 10,
		center: { lat: 35.6, lng: -83.52 },
		minZoom: 10,
		maxZoom: 16,
		maxBounds: [
			{ lat: 35.25, lng: -84.25 },
			{ lat: 35.9, lng: -82.75 }
		],
		//downloadControl: true, //TODO: this would be useful (once implemented, we could link to the relevant data store page)
		fullscreenControl: true,
		//zoomdisplayControl: true,
		//shareControl: true, //TODO: this would be useful once implemented
		//legendControl: {
		//	html: setLegend
		//},
		//locateControl: true, //TODO: Check if Tom wants this
		measureControl: true,
		editControl: true,
		//scaleControl: true,
		events: [{
			fn: function() {
				setDivs();
				control._container.style.width = window.getComputedStyle(document.getElementsByClassName('npmap-map-wrapper')[0]).getPropertyValue('width');
				control._optionsDiv.style.left = parseInt((parseInt(window.getComputedStyle(document.getElementsByClassName('npmap-map-wrapper')[0]).getPropertyValue('width')) - 684 + 40) / 2) + 'px';
				if(parseInt(window.getComputedStyle(document.getElementsByClassName('npmap-map-wrapper')[0]).getPropertyValue('width')) > 1366) {
					control._searchDiv.style.left = parseInt((parseInt(window.getComputedStyle(document.getElementsByClassName('npmap-map-wrapper')[0]).getPropertyValue('width')) - 1366 + 40) / 2) + 'px';
				} else {
					control._searchDiv.style.left = '20px';
				}
				control._fullscreen = true;
				document.getElementById('home').style.top = '400px';
				document.getElementById('zoom').style.top = '400px';
				document.getElementById('measure').style.top = '400px';
				enterfullscreen();
			},
			type: 'enterfullscreen'
		}, {
			fn: function() {
				setDivs();
				control._container.style.width = window.getComputedStyle(document.getElementsByClassName('npmap-map-wrapper')[0]).getPropertyValue('width');

				control._optionsDiv.style.left = parseInt((parseInt(window.getComputedStyle(document.getElementsByClassName('npmap-map-wrapper')[0]).getPropertyValue('width')) - 684 + 40) / 2) + 'px';
				if(parseInt(window.getComputedStyle(document.getElementsByClassName('npmap-map-wrapper')[0]).getPropertyValue('width')) > 1366) {
					control._searchDiv.style.left = parseInt((parseInt(window.getComputedStyle(document.getElementsByClassName('npmap-map-wrapper')[0]).getPropertyValue('width')) - 1366 + 40) / 2) + 'px';
				} else {
					control._searchDiv.style.left = '20px';
				}
				control._fullscreen = false;
				document.getElementById('home').style.top = '225px';
				document.getElementById('zoom').style.top = '225px';
				document.getElementById('measure').style.top = '225px';
				exitfullscreen();
			},
			type: 'exitfullscreen'
		}, {
			fn: function() {
				var currentZoom = NPMap.config.L._zoom;
				var currentCenter = NPMap.config.L.getCenter();
				var firstPoint = NPMap.config.L.latLngToContainerPoint(currentCenter);
				var firstLatLng = NPMap.config.L.containerPointToLatLng(firstPoint);
				var secondPoint = [firstPoint.x + 1, firstPoint.y];
				var secondLatLng = NPMap.config.L.containerPointToLatLng(secondPoint);
				var dist = firstLatLng.distanceTo(secondLatLng);

				control._levelView.innerHTML = '<i>level ' + currentZoom + ': ' + dist.toFixed(1) + 'm per pixel</i>'; //todo: add data resolution
			},
			type: 'zoomend'
		}, {
			fn: function(evt) {
				if(control && control._currentBaseLayer && evt.layer._leaflet_id === control._currentBaseLayer._leaflet_id) {
					for(var i = 0; i < control._selectedSpecies.length; i++) {
						NPMap.config.L.removeLayer(control._selectedSpecies[i]);

						var color;
						if(i === 0) {
							color = 'blue';
						} else if(i === 1) {
							color = 'pink';
						} else {
							color = 'orange';
						}

						var latin = control._selectedSpecies[i]._latin;
						var idNumber = control._selectedSpecies[i]._idNumber;
						control._selectedSpecies[i] = L.npmap.layer.mapbox({
							name: latin,
							opacity: .5,
							id: 'nps.GRSM_' + idNumber + '_' + color
						}).addTo(NPMap.config.L);
						control._selectedSpecies[i]._latin = latin;
						control._selectedSpecies[i]._idNumber = idNumber;
					}
				}
			},
			type: 'layeradd'
		}]
	};
