$(document).ready(function() {
    loadAudioPlayers();
});

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
