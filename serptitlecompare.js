javascript: (function (doc) {
    var changed = 0;

    function checkTitles() {
        console.log('jQuery version ', $.fn.jquery, ' loaded');
        var position = 1;
        var items = [];
        var results = $('#rso .kp-blk .g, #rso .g[class="g"], #rso .srg .g').not('.kno-kp .g').find('div:first').find('a:first');
        $('.title-changed, #CountTitlesChanged').remove();
        results.each(function () {
            if (!$(this).parents('.related-question-pair').length) {
                var parent = $(this).closest('.tF2Cxc').length > 0 ? $(this).closest('.tF2Cxc') : $(this).closest('li');
                items.push([position, $(this).find('h3').text(), encodeURI($(this).attr('href')), parent]);
                position++;
            }
        });
        var numItems = 1;
        cors_proxies = ['https://api.codetabs.com/v1/proxy?quest=', 'https://jsonp.afeld.me/?url=',];
        items.forEach(item => {
            $.ajax({
                url: cors_proxies[Math.floor(Math.random() * cors_proxies.length)] + item[2],
                success: function (data, status, xhr) {
                    title = $(data).filter('title').text();
                    var html = '<div class="title-changed">';
                    if (title != item[1]) {
                        html += '<span style="font-weight: bold;color: #ff6961;">' + title + '</span>';
                        changed++;
                    } else {
                        html += '<span style="font-weight: bold;color: darkgreen;">' + item[1] + '</span>';
                    }
                    html += '</div>';
                    item[3].find('div').first().append(html);
                },
                error: function (xhr, status, error) {
                    var html = '<div class="title-changed">';
                    html += '<span style="font-weight: bold;color: lightslategray;">Error: Request could not be processed</span>';
                    html += '</div>';
                    item[3].find('div').first().append(html);
                },
                complete: function (xhr, status) {
                    if (numItems == items.length) {
                        petitionCompleted();
                    } else {
                        numItems++;
                    }
                }
            });
        });
    }

    function petitionCompleted() {
        $('#result-stats').append('<span id="CountTitlesChanged"> - ' + changed + ' titles have changed on this SERP</span>');
    }

    if (typeof jQuery == 'undefined') {
        var script_jQuery = document.createElement('script');
        script_jQuery.src = 'https://code.jquery.com/jquery-latest.min.js';
        script_jQuery.onload = checkTitles;
        doc.body.appendChild(script_jQuery);
        console.log('script_jQuery appended to body');
    } else {
        console.log('jQuery already included ...');
        checkTitles();
    }
})(document)
