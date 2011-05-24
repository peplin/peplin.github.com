$(document).ready(function() {
    $.ajax({url: "http://api.flickr.com/services/rest",
        data: {
            method: "flickr.people.getPublicPhotos",
            user_id: "52818162@N00",
            per_page: 6,
            format: "json",
            api_key: "55115d73f4005b232247ecef716803f6"
        },
        dataType: "jsonp",
        jsonp: "jsoncallback",
        success: function(data) {
            var grid = $("#photo-grid");
            $(data.photos.photo).each(function(i, photo) {
                var element = "";
                photo.thumbnail = "http://farm" + photo.farm +
                    ".static.flickr.com/" + photo.server + "/" +
                    photo.id + "_" + photo.secret + "_" + "s.jpg";
                photo.url = "http://www.flickr.com/photos/" +
                    photo.owner + "/" + photo.id;

                grid.append('<a target="_blank" href="' + photo.url + '">' +
                        '<img alt="'+ photo.title + '"src="' + photo.thumbnail +
                        '"/></a>');
            });
        }});
});
