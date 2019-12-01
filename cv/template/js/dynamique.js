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
    var colorScale = d3.scaleSequential()
        .domain([0, 100])
        .interpolator(d3['interpolatePlasma']);
    var nbAlea = d3.randomUniform(0, 100);

    function style(feature) {
        if (tableau.includes(feature.properties.name)) {
            return {
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
    //Langage///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    let tabnomlanguage = ['Android', 'C#', 'C++', 'C', 'Java', 'Objectif C', 'PHP', 'cobol', 'javascript', 'python'];
    let tablanguage = [];
    tabnomlanguage.forEach(element => {
        tablanguage.push(dataEtu['Quelles langages utilisez vous ? [' + element + ']']);
    });
    var ull = document.getElementById('CreateLangage');
    while (ull.firstChild) {
        ull.removeChild(ull.firstChild);
    }
    for (var i = 0; i < tablanguage.length; i++) {

        var newLi = document.createElement('li');

        var paragraphText = document.createTextNode(tabnomlanguage[i]);
        var elementSpan = document.createElement('span');
        switch (tablanguage[i]) {
            case 'je connais un peu':
                newLi.appendChild(paragraphText);
                ull.appendChild(newLi);
                newLi.appendChild(elementSpan);
                break;

            case 'je connais bien':
                newLi.appendChild(paragraphText);
                ull.appendChild(newLi);
                newLi.appendChild(elementSpan);
                break;
            case 'je suis expert(e)':
                newLi.appendChild(paragraphText);
                ull.appendChild(newLi);
                newLi.appendChild(elementSpan);

                break;
            default:
        }
    }
    ///////////////////////////////////////////////////////////////////////////////
    ///outils//////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    let tabnomframework = ['Jenkins', 'Hibernate', 'Bootstrap', 'laravel', 'Zend', 'Angular', 'Flesk', 'React', 'Vue', 'Symphony', 'Django', '.Net'];
    let tabframework = [];
    tabnomframework.forEach(element => {
        tabframework.push(dataEtu['Quelles framework utilisez vous ? [' + element + ']']);
    });
    var ull = document.getElementById('CreateFramework');
    while (ull.firstChild) {
        ull.removeChild(ull.firstChild);
    }
    for (var i = 0; i < tabframework.length; i++) {

        var newLi = document.createElement('li');

        var paragraphText = document.createTextNode(tabnomframework[i]);
        var elementSpan = document.createElement('span');
        switch (tabframework[i]) {
            case 'je connais un peu':
                newLi.appendChild(paragraphText);
                ull.appendChild(newLi);
                newLi.appendChild(elementSpan);
                break;

            case 'je connais bien':
                newLi.appendChild(paragraphText);
                ull.appendChild(newLi);
                newLi.appendChild(elementSpan);
                break;
            case 'je suis expert(e)':
                newLi.appendChild(paragraphText);
                ull.appendChild(newLi);
                newLi.appendChild(elementSpan);

                break;
            default:
        }
    }
    ///////////////////////////////////////////////////////////////////////////////
    ////langues////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    let tabnomlangue = ['franÃ§ais', 'anglais', 'espagnol', 'arabe', 'tamazirth', 'chinois', 'russe'];
    let tablangue = [];
    tabnomlangue.forEach(element => {
        tablangue.push(dataEtu['Quelles langues parlez vous ? [' + element + ']']);
    });
    var ull = document.getElementById('Createlangue');
    while (ull.firstChild) {
        ull.removeChild(ull.firstChild);
    }
    for (var i = 0; i < tabnomlangue.length; i++) {

        var newLi = document.createElement('li');

        var paragraphText = document.createTextNode(tabnomlangue[i]);
        var elementSpan = document.createElement('span');
        switch (tablangue[i]) {
            case 'je connais un peu':
                newLi.appendChild(paragraphText);
                ull.appendChild(newLi);
                newLi.appendChild(elementSpan);
                break;

            case 'je connais bien':
                newLi.appendChild(paragraphText);
                ull.appendChild(newLi);
                newLi.appendChild(elementSpan);
                break;
            case 'je suis expert(e)':
                newLi.appendChild(paragraphText);
                ull.appendChild(newLi);
                newLi.appendChild(elementSpan);

                break;
            default:
        }
    }
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
}