$(document).ready(function() {
    loadPhotoGrid();
    loadGithubDetails();
});

function loadPhotoGrid() {
    $.ajax({url: "http://api.flickr.com/services/rest",
        data: {
            method: "flickr.people.getPublicPhotos",
            user_id: "52818162@N00",
            per_page: 9,
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
        }
    });
}

function loadGithubDetails() {
    $(".github a").each(function(i, item) {
        var listItem = $(item).parents("li");
        var url = $(item).attr("href");
        var segments = url.split('/');
        var repo = segments.pop();
        var username = segments.pop();

        $.ajax({url: "http://github.com/api/v2/json/repos/show/" + username +
                "/" + repo,
            dataType: "jsonp",
            success: function(data) {
                var repoData = data.repository;
                if(repoData) {
                    var watchers_link = $('<a>').addClass('watchers').attr('href', url+'/watchers').text(repoData.watchers);
                    var forks_link = $('<a>').addClass('forks').attr('href', url+'/network').text(repoData.forks);
                    var header = listItem.find("h3");
                    var description = $('<p>').text(repoData.description);
                    header.after(description);
                    header.after(forks_link);
                    header.after(watchers_link);
                }
            }
        });
    });
}
