$(function () {
    $("#get-battery").click(function () {
        $("#battery-pct").text(Math.round(navigator.battery.level * 100) + "%");
    });
});

//$(function () {
    //$("#teste").click(function () {

        //https://developer.mozilla.org/en-US/docs/Feed_content_access_API
        // fetch('http://www.sul21.com.br/jornal/feed/')
        function fetch (feedUrl)
        {
            var httpRequest = null;

            function infoReceived () {
                var data = httpRequest.responseText;
                console.log(data)

                var ioService = Components.classes['@mozilla.org/network/io-service;1']
                        .getService(Components.interfaces.nsIIOService);
                var uri = ioService.newURI(feedUrl, null, null);

                if (data.length) {
                    var parser = Components.classes["@mozilla.org/feed-processor;1"]
                            .createInstance(Components.interfaces.nsIFeedProcessor);
                    var listener = new FeedTestResultListener();
                    try {
                        parser.listener = listener;
                        parser.parseFromString(data, uri);
                    }
                    catch (e) {
                        alert("Error parsing feed.");
                    }
                }
            }

            httpRequest = new XMLHttpRequest();

            httpRequest.open("GET", feedUrl, true);
            try {
                httpRequest.onload = infoReceived;
                httpRequest.send(null);
            }
            catch (e) {
                console.log(e);
                alert(e);
            }
        }


    FeedTestResultListener.prototype = {
      handleResult: function(result) {
        var feed = result.doc;

        feed.QueryInterface(Components.interfaces.nsIFeed);

        // Open a new window

        var win = window.open("", "FeedTest_Window");
        var doc = win.document.wrappedJSObject;

        doc.open();

        // Write the HTML header and page title

        doc.write("<html><head><title>Feed: " + feed.title.text + "</title></head><body>");
        doc.write("<h1>" + feed.title.text + "</h1><p>");

        var itemArray = feed.items;
        var numItems = itemArray.length;

        // Write the article information

        if (!numItems) {
          doc.write("<i>No news is good news!</i>");
        }
        else {
          var i;
          var theEntry;
          var theUrl;
          var info;

          for (i=0; i<numItems; i++) {
            theEntry = itemArray.queryElementAt(i, Components.interfaces.nsIFeedEntry);

            if (theEntry) {
              theUrl =
              doc.write('<b><a href="' + theEntry.link.resolve("") + '">' + theEntry.title.text + '</a></b><br>');
              if (theEntry.summary) {
                info = theEntry.summary.text + "<p><hr><p>";
              }
              else {
                info = theEntry.content.text + "<p><hr><p>";
              }
              doc.write("<blockquote>" + info);
              doc.write("</blockquote><p>");
            }
          }
        }

        // Close the document; we're done!

        doc.write("</body></html>");
        doc.close();
      }
    }

    //});
//});

//http://stackoverflow.com/questions/10943544/how-to-parse-a-rss-feed-using-javascript
// Abaixo codigo funcional usando jquery/zepto
$.get('http://stackoverflow.com/feeds/question/10943544', function (data) {
console.log(data);
    $(data).find("entry").each(function () { // or "item" or whatever suits your feed
        var el = $(this);

        console.log("------------------------");
        console.log("title      : " + el.find("title").text());
        console.log("author     : " + el.find("author").text());
        console.log("description: " + el.find("description").text());
    });
});

//
// Abaixo codigo funcional usando jquery/zepto para sul21
$.get('http://www.sul21.com.br/jornal/feed/', function (data) {
    //console.log(data);
    $(data).find("channel").each(function () { // or "item" or whatever suits your feed
        var el = $(this);

        console.log("------------------------");
        console.log("title      : " + el.find("title").text());
        console.log("author     : " + el.find("author").text());
        console.log("description: " + el.find("description").text());
    });
});