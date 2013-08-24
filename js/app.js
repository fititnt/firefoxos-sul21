// Abaixo codigo funcional usando jquery/zepto para sul21
var S21 = {};

S21 = {
    /**
     * Get the data
     *
     * @param  Function cb  Callback to run when is ready
     */
    getData: function (cb) {
        $.get('http://www.sul21.com.br/jornal/feed/', function (data) {
            //console.log(data);
            var result = $(data).find("channel").each(function () { // or "item" or whatever suits your feed
                var el = $(this);

                console.log("------------------------");
                console.log("title      : " + el.find("title").text());
                console.log("author     : " + el.find("author").text());
                console.log("description: " + el.find("description").text());
            });
            cb(result);
        });
    }

}
