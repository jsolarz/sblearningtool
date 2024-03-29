// Popup Open
function popupOpen(videoId) {
    var category = _.filter(videos, function(category) {
        return _.some(category.videos, { id: +videoId });
    });

    if (category.length) {
        var video = _.findWhere(category[0].videos, { id: +videoId });
        console.log(video);
        if (video) {
            console.log(video);
            $('#helpVideo')
                .get(0)
                .pause();

            $('#helpVideo').attr('title', video.name);

            $('#helpVideo').attr('src', video.source);

            $('#popup .video-title').text(video.name);

            $('#helpVideo')
                .get(0)
                .load();

            $('#helpVideo')
                .get(0)
                .play();
        }

        document.getElementById('popup').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    }
}

// Popup Close
function popupClose() {
    $('#helpVideo')
        .get(0)
        .pause();

    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function loadVideos(categories) {
    var renderSub = _.template(
            $('#categoryItemTpl')
                .remove()
                .text()
        ),
        renderMain = _.template(
            $('#categoryTpl')
                .remove()
                .text()
        ),
        renderMenuCatSub = _.template(
            $('#menuCategoryItemTpl')
                .remove()
                .text()
        ),
        renderMenu = _.template(
            $('#menuCategoryTpl')
                .remove()
                .text()
        );

    var videosTpl = _.map(categories, function(category) {
        return renderMain({
            id: category.id,
            category: category.category,
            videos: category.videos,
            renderSub: renderSub
        });
    });

    var videosMenuTpl = _.map(categories, function(category) {
        return renderMenu({
            id: category.id,
            category: category.category,
            videos: category.videos,
            renderSub: renderMenuCatSub
        });
    });

    console.log(videosMenuTpl);
    $('.content').html(videosTpl);
    $('.Accordion').html(videosMenuTpl);
}

var videos;

$(function() {
    $.getJSON('videos.json', function(response) {
        videos = response;
        loadVideos(response);
    });
});
