var hist_poids = [];
var hist_imc = [];

function calculer() {
    var sexe = document.getElementById("id_sexe").value;
    var poids = document.getElementById("id_poids").value;
    var taille = document.getElementById("id_taille").value;

    if (!verification(poids, taille)) return;

    var imc = parseFloat((poids / (taille * taille)).toFixed(2));
    var reponse = `Votre imc est de ${imc}.`;

    if ((sexe == "femme" && imc < 19.1) || (sexe == "homme" && imc < 20.7)){
        reponse += " Vous êtes en état de maigreur (insuffisance pondérale).";
    } else if ((sexe == "femme" && imc < 25.8) || (sexe == "homme" && imc < 26.4)){
        reponse += " Votre poids est idéal.";
    } else if ((sexe == "femme" && imc < 27.3) || (sexe == "homme" && imc < 27.8)){
        reponse += " Vous êtes à la limite du surpoids.";
    } else if ((sexe == "femme" && imc < 32.3) || (sexe == "homme" && imc < 31.1)){
        reponse += " Vous êtes en surpoids.";
    } else if ((sexe == "femme" && imc > 32.3) || (sexe == "homme" && imc > 31.1)){
        reponse += " Vous êtes en état d'obésité.";
    }

    document.getElementById("id_imc").innerHTML = reponse;

    hist_poids.push(parseFloat(poids));
    hist_imc.push(imc);

    make_graph();
}

function verification(poids, taille) {
    var boolean = true;
    document.getElementById("id_erreur_poids").innerHTML = "";
    document.getElementById("id_erreur_taille").innerHTML = "";

    if(poids === "" || poids < 0 || poids > 500) {
        document.getElementById("id_erreur_poids").innerHTML = "Poids invalide ❌";
        boolean = false;
    }

    if(taille === "" || taille < 0 || taille > 5.00) {
        document.getElementById("id_erreur_taille").innerHTML = "Taille invalide ❌";
        boolean = false;
    }

    return boolean;
}

function make_graph() {
    var semaines = [];
    for (let i = 1; i <= 52; i += 1) semaines.push(i);

    Highcharts.chart('id_graph', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Suivi de mon imc'
        },
        xAxis: {
            title: {
                text: 'Semaines'
            },
            categories: semaines,
        },
        yAxis: {
            title: {
                text: 'Valeur'
            },
            labels: {
                format: '{value}'
            }
        },
        tooltip: {
            shared: true
        },
        series: [{
            name: 'imc',
            marker: {
                symbol: 'square'
            },
            data: hist_imc
        },{
            name: 'Poids',
            marker: {
                symbol: 'diamond'
            },
            data: hist_poids
        }]
    });
}

function reset () {
    window.location.reload(true);
}

function imprimer() {
    window.print();
}
