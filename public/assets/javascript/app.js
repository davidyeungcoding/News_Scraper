$(document).ready(function(){

    // =================
    // || MATERIALIZE ||
    // =================

    $('.parallax').parallax();

    // =============
    // || SCRAPER ||
    // =============

    $('#scraper').on('click', function(event) {
        event.preventDefault();
        $.get('/scrape');
    });

});