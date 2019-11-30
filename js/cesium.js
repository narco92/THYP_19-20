var tab = ["Algeria", "France", "Spain", "Tunisia", "Portugal", "South Africa"];

function startup(Cesium) {
    'use strict';

    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZDM0MjJjOC0zMDEwLTQ4YWUtYmUxOS1hYWUxYzAyOWE2NmEiLCJpZCI6MTc3NjUsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NzI3Nzk3OTl9.Vcyq9iUrthFYxXHalnPv95IHSBJVxh2B5MifX5BfrtY';

    var viewer = new Cesium.Viewer('cesiumContainer');
    tab.forEach(element => {
        var color = Cesium.Color.fromRandom().withAlpha(0.4);
        viewer.dataSources.add(Cesium.GeoJsonDataSource.load('js/countries/' + element + '.topojson', {
            stroke: Cesium.Color.HOTPINK,
            fill: color,
            strokeWidth: 3
        }));
    });


    var imageryLayer = viewer.imageryLayers.addImageryProvider(
        new Cesium.IonImageryProvider({
            assetId: 3
        })
    );
    viewer.zoomTo(imageryLayer)
        .otherwise(function(error) {
            console.log(error);
        });


    Sandcastle.finishedLoading();
}
if (typeof Cesium !== 'undefined') {
    window.startupCalled = true;
    startup(Cesium);
}