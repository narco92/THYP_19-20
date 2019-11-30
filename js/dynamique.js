var urlData = "formulaire.csv";
//var urlData = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRPYNknmIr5_bU7GfiJtuS_b9fGae7HZwcjAiMoAC24fLzIfxRtXQySMu3E95D3M595D3DYT7NUtvzt/pub?gid=760811187&single=true&output=csv";
//récupération des documents
//merci à  https://stackoverflow.com/questions/49599691/how-to-load-data-from-a-csv-file-in-d3-v5
var map = L.map('mapid').setView([0, 0], 1);
d3.csv(urlData)
    .then(function(data) {
        //selectioner etudiant 
        data.forEach(element => {
            let ligne = element;
            let nom = ligne["Votre nom"];
            let prenom = ligne["Votre prénom"];
            $("#listeEtu").append("<option>" + nom + " " + prenom + "</option>");
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
})


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

    function style(feature) {
        //fillColor: colorScale(feature.properties.density),


        if (tableau.includes(feature.properties.name)) {
            return {
                fillColor: getColor(6),
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

    //////////////////////////////////////////////////////////////////////////////
    //Image///////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    let url = new URL(dataEtu['Votre photo']);
    let urlParam = new URLSearchParams(url.search);
    let id = urlParam.get('id');
    //merci à https://stackoverflow.com/questions/50664868/get-pictures-from-google-drive-folder-with-javascript-to-my-website
    let urlTof = "https://drive.google.com/uc?id=" + id + "&export=download";
    $('#img').attr('src', urlTof);
    ///////////////////////////////////////////////////////////////////////////////
    //Nom et prenom////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    let etu = d3.select('#etuNom');
    etu.selectAll(".row").remove();
    d3.select('#etuNom').html(dataEtu["Votre prénom"] + " " + dataEtu["Votre nom"]);
    ///////////////////////////////////////////////////////////////////////////////
    //spécialité///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    let specialiteEtu = d3.select('#specialiteEtu');
    specialiteEtu.selectAll(".row").remove();
    d3.select('#specialiteEtu').html(dataEtu["Vos spécialités"]);
    ///////////////////////////////////////////////////////////////////////////////
    //email////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    let mailEtu = d3.select('#mail');
    mailEtu.selectAll(".row").remove();
    d3.select('#mail').html(dataEtu["Votre mail"]);
    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    let formsexiste = dataEtu["Votre formation précédente"];
    d3.select("#formation").selectAll(".row").remove();
    if (formsexiste.length !== 0) {
        $("#formation").append("<div class=\"content row\"><h3>Sep 2018 - Jun 2019</h3><p>" + dataEtu["Votre formation précédente"] + "</p></div>");
    }

    //change les information basic
    var tableau = d3.select('#etuBasicInfo');
    tableau.selectAll(".row").remove();
    var arrBasicInfo = [],
        arrInfoValide = ['Votre mail', 'N° étudiant', 'Votre compte GitHub'];
    for (var p in dataEtu) {
        if (arrInfoValide.indexOf(p) > -1)
            arrBasicInfo.push({ 'p': p, 'v': dataEtu[p] });
    }
    var lignes = tableau.selectAll(".row").data(arrBasicInfo).enter()
        .append("div")
        .attr("class", "row");
    lignes.append('div').attr("class", "col-sm-4")
        .append("strong").attr("class", "text-uppercase")
        .text(function(d) {
            return d.p;
        })
    lignes.append('div').attr("class", "col-sm-8")
        .text(function(d) {
            return d.v;
        })
        .on("click", function(d) {
            console.log(d);
        })
        /*
<div class="row">
        <div class="col-sm-4"><strong class="text-uppercase">Age:</strong></div>
        <div class="col-sm-8">26</div>
      </div>
    */
        //console.log(lignes);
}