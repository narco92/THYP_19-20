var urlData = "formulaire.csv";
var map = L.map('mapid').setView([0, 0], 1);
d3.csv(urlData)
    .then(function(data) {
        //selectioner etudiant 
        data.forEach(ligne => {
            let prenom = ligne["Votre prénom"];
            if ((nom == 'Aghilas') && (prenom == 'NAIT MESSAOUD')) {
                console.log("dd")
                $("#listeEtu").append("<option selected>" + nom + " " + prenom + "</option>");
            } else {
                $("#listeEtu").append("<option>" + nom + " " + prenom + "</option>");
            }
        });


        var index = document.getElementById('listeEtu').selectedIndex;
        showDataEtu(data[index]);
        document.getElementById('listeEtu').addEventListener('change', function() {
            var index = document.getElementById('listeEtu').selectedIndex;
            showDataEtu(data[index]);
        });



    })
    .catch(function(error) {
        console.log(error);
    });

function showDataEtu(dataEtu) {
    map.eachLayer(function(layer) {
        map.removeLayer(layer);
    });
    var cartodbAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>';
    var positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: cartodbAttribution
    }).addTo(map);
    let visitedCountry = dataEtu["Pays Visités"];
    var reg = new RegExp("[,;]+", "g");
    var tableau = visitedCountry.split(reg);

    function getColor(d) {
        return d > 7 ? '#800026' :
            d > 6 ? '#BD0026' :
            d > 5 ? '#E31A1C' :
            d > 4 ? '#FC4E2A' :
            d > 3 ? '#FD8D3C' :
            d > 2 ? '#FEB24C' :
            d > 1 ? '#FED976' :
            '#FFEDA0';
    }
    var colorScale = d3.scaleSequential()
        .domain([0, 100])
        .interpolator(d3['interpolatePlasma']);
    var nbAlea = d3.randomUniform(0, 100);

    function style(feature) {
        //fillColor: colorScale(feature.properties.density),


        if (tableau.includes(feature.properties.name)) {
            return {
                //fillColor: getColor(6),
                fillColor: colorScale(nbAlea()),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        } else {
            return {
                color: "rgba(0, 0, 0, 0)"
            };
        }

    }
    L.geoJson(statesData, { style: style }).addTo(map);
}