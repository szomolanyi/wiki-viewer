var mock=[
    {
        "title": "Robot",
        "summary": "Robot je velke zviera, ktore zije v lese a zbiera hriby. Robot je velke zviera, ktore zije v lese a zbiera hriby. Robot je velke zviera, ktore zije v lese a zbiera hriby. Robot je velke zviera, ktore zije v lese a zbiera hriby. Robot je velke zviera, ktore zije v lese a zbiera hriby."
    },
    {
        "title": "Medved",
        "summary": "Medved zije v meste a zerie ludi. Medved zije v meste a zerie ludi. Medved zije v meste a zerie ludi. Medved zije v meste a zerie ludi. Medved zije v meste a zerie ludi. Medved zije v meste a zerie ludi. "
    },
    {
        "title": "Clovek",
        "summary": "Clovek je zvlastny tvor."
    },
];


function raise() {
    $(this).removeClass('mdl-shadow--4dp');
    $(this).addClass('mdl-shadow--8dp');
}

function showResults(res) {
    d = $('<div>')
        .addClass("mdl-grid");
    d1=$('<div>')
        .addClass("mdl-cell mdl-cell--4-col-phone mdl-cell--8-col-desktop mdl-cell--2-offset-desktop mdl-cell--6-col-tablet mdl-cell--1-offset-tablet")
        .css('padding-bottom', '20px');
    a = $('<a>').attr('href','https://en.wikipedia.org/wiki/'+res.title)
        .attr('target', '_blank')
        .addClass('mdl-card')
        .addClass('mdl-shadow--4dp')
        .addClass('card-wide');
    a.append($("<div>").addClass('mdl-card__title').addClass('mdl-color--indigo').addClass('mdl-color-text--white').html(res.title));
    a.append($("<div>").addClass('mdl-card__supporting-text').html(res.snippet));
    d1.append(a);
    d.append(d1);
    $("#results").append(d);
    a.hover(function() {
        $(this).removeClass('mdl-shadow--4dp');
        $(this).addClass('mdl-shadow--16dp');
    }, function() {
        $(this).removeClass('mdl-shadow--16dp');
        $(this).addClass('mdl-shadow--4dp');
    });
};

function clearResults() {
    $("#results").empty();
}

function runsearch(s) {
    if (!s) return;
    $.ajax({
        dataType: "jsonp",
        url: "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&utf8=1&srsearch="+s,
        headers: { 'Api-User-Agent': 'Wiview/1.0 (Wikipedia viewer, FreecodeCamp project by Szomolanyi' }
    })
        .done(function (data) {
            if (data.hasOwnProperty('error')) {
                alert("Error: "+data.error.info);
            }
            else {
                for (i=0; i<data.query.search.length; i++) {
                    showResults(data.query.search[i]);    
                }
            }
        })
        .fail(function(jqXHR, status, err) {
            alert("Wikipedia search failed, msg: "+ status+", err: "+err);
        });
}

$(document).ready(function() {
    $("#searchbox1").on("keypress", function(e) {
        if (e.which == 13) {
            clearResults();
            runsearch($("#searchbox1").val());
        }
    });
    $("#b-search").on('click', function() {
        clearResults();
        runsearch($("#searchbox1").val());
    });
});
