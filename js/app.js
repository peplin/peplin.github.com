$(document).ready(function() {
    loadPhotoGrid();
    loadAudioPlayers();
});

function loadPhotoGrid() {
    if($("#photo-grid").length > 0) {
        $.ajax({url: "https://api.flickr.com/services/rest",
            data: {
                method: "flickr.people.getPublicPhotos",
                user_id: "52818162@N00",
                per_page: 12,
                format: "json",
                api_key: "55115d73f4005b232247ecef716803f6"
            },
            dataType: "jsonp",
            jsonp: "jsoncallback",
            success: function(data) {
                var grid = $("#photo-grid");
                $(data.photos.photo).each(function(i, photo) {
                    var element = "";
                    photo.thumbnail = "https://live.staticflickr.com/" +
                        photo.server + "/" +
                        photo.id + "_" + photo.secret + "_" + "c.jpg";
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
