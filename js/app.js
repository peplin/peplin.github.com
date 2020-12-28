$(document).ready(function() {
    loadPhotoGrid();
    loadGithubDetails();
    loadAudioPlayers();
});

function loadPhotoGrid() {
    if($("#photo-grid").length > 0) {
        $.ajax({url: "https://api.flickr.com/services/rest",
            data: {
                method: "flickr.people.getPublicPhotos",
                user_id: "52818162@N00",
                per_page: 15,
                format: "json",
                api_key: "55115d73f4005b232247ecef716803f6"
            },
            dataType: "jsonp",
            jsonp: "jsoncallback",
            success: function(data) {
                var grid = $("#photo-grid");
                $(data.photos.photo).each(function(i, photo) {
                    var element = "";
                    photo.thumbnail = "https://farm" + photo.farm +
                        ".static.flickr.com/" + photo.server + "/" +
                        photo.id + "_" + photo.secret + "_" + "s.jpg";
                    photo.url = "https://www.flickr.com/photos/" +
                        photo.owner + "/" + photo.id;

                    grid.append('<a target="_blank" href="' + photo.url + '">' +
                            '<img alt="'+ photo.title + '"src="' + photo.thumbnail +
                            '"/></a>');
                });
            }
        });
    }
}

function loadGithubDetails() {
    $(".github a").each(function(i, item) {
        var listItem = $(item).parents("li");
        var url = $(item).attr("href");
        var segments = url.split("/");
        var repo = segments.pop();
        var username = segments.pop();

        $.ajax({url: "https://api.github.com/repos/" + username + "/" + repo,
            dataType: "jsonp",
            success: function(data) {
                var repoData = data.data;
                if(repoData) {
                    var meta = $("<div>").addClass("meta");
                    var watchers_link = $("<a>").addClass("watchers").attr(
                            "href", url + "/watchers").text(repoData.watchers);
                    var forks_link = $("<a>").addClass("forks").attr(
                            "href", url + "/network").text(repoData.forks);
                    var header = listItem.find("h3");
                    meta.append(watchers_link);
                    meta.append(forks_link);
                    header.after(meta);
                }
            }
        });
    });
}

function loadAudioPlayers() {
    $("ul.audio-playlist").each(function(i, playlist) {
        $(playlist).hide();
        var entries = [];
        $(playlist).find("li a").each(function(i, entry) {
            entries.push({
                title: $(entry).text(),
                mp3: $(entry).attr("href"),
                free: true
            });
        });
        var player = new jPlayerPlaylist({
                jPlayer: "#jquery_jplayer_" + $(playlist).data("id"),
                cssSelectorAncestor: "#jp_container_" + $(playlist).data("id")
            },
            entries,
            {swfPath: "/js/vendor/jPlayer",
                // errorAlerts: true,
                solution: "html",
                supplied: "mp3",
                ended: function() {
                    player.playlistNext();
                },
                play: function() {
                    $(this).jPlayer("pauseOthers");
                }
        });
    });
}
