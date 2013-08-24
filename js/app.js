// Abaixo codigo funcional usando jquery/zepto para sul21
var S21 = {};

S21 = {
    opt: {
        debugEl: $('#debug')
    },
    /**
     * Get the data
     *
     * @param  Function cb  Callback to run when is ready
     */
    getData: function (cb) {
        //$.get('http://www.sul21.com.br/jornal/feed/', function (data) {
        $.get('http://www.fititnt.org/p.php?url=http://www.sul21.com.br/jornal/feed/', function (data) {
            var finalResult = {}, i = 0;
            //console.log(data);
            //console.log($(data).find("channel"));
            //data.replace('', '');
            var result = $(data).find("item").each(function () { // or "item" or whatever suits your feed
                var el = $(this);
                finalResult[i] = {
                    title: el.find("title").text(),
                    text: el.find("description").text(),
                    link: el.find("link").text(),
                    date: el.find("pubDate").text()
                };

                i = i + 1;
            });
            //cb($(data));
            cb(finalResult);
        });
    },
    renderData: function(data) {
        var html = '';
        $.each(data, function(item, value) {
            html += '<article>';
            html += '<h1>' + value.title + '</h1>';
            html += '<ul><li>';
            html += '<p>' + value.text + '</p>';
            html += '<p><a href="' + value.link + ' target="_blank">Ver no site<a></p>';
            html += '</li></ul>';
            html += '</article>';
        });
        console.log(html);
        S21.opt.debugEl[0].innerHTML = html; //JSON.stringify(data);
    }

}
S21.getData(S21.renderData);
