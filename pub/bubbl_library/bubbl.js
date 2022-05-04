"use strict";

const log = console.log;

(function(global, document, $) {

    // OBJECT: VideoCanvas
    function VideoCanvas(divIdName, width, height, color, isFilter) {
        this.divId = (divIdName === undefined) ? 'body' : '#' + divIdName;
        this.width = (width === undefined) ? '100%' : width;
        this.height = (height === undefined) ? '100%' : height;
        this.color = (color === undefined) ? 'transparent' : color;
        this.isFilter = (isFilter === undefined) ? true : isFilter;

        this.videos = [];
        log('Video Canvas created')

        const body = $(this.divId);

        // Create div videoCanvas and add it to the main page
        const videoCanvas = $("<div/>");
        videoCanvas.addClass('video-canvas');
        // set up css for videoCanvas
        videoCanvas.css({
            'width': this.width,
            'height': this.height,
            'background-color': this.color
        })
        
        body.append(videoCanvas);
    }

    // function for video attributes when user hovers over it
    function _videoOnHover() {
        const videoContainer = $(this);
        const video = $(this).children('video');

        // Restore bubble bounce
        videoContainer.removeClass('bubble-bounce');

        // Functionality changes
        video.get(0).play();

        // CSS changes
        videoContainer.css({
            'width': video.width() + 20,
            'height': video.height() + 20
        });
        videoContainer.find('img').css('visibility', 'visible');
    }

    function _videoOffHover() {
        const videoContainer = $(this);
        const video = $(this).children('video');
        
        // Restore bubble bounce
        videoContainer.addClass('bubble-bounce');
        
        // Functionality changes
        video.get(0).pause();

        // CSS changes
        videoContainer.css({
            'width': video.width() - 20,
            'height': video.height() - 20
        });
        videoContainer.find('img').css('visibility', 'hidden');
    }

    // function for mute attributes when user hovers over/clicks it
    function _buttonOnHover() {
        const button = $(this);

        button.css({
            'width': button.width() + 5,
            'height': button.height() + 5,
            'cursor': 'pointer',
            'opacity': '100%'
        })
    }

    function _buttonOffHover() {
        const button = $(this);

        button.css({
            'width': button.width() - 5,
            'height': button.height() - 5,
            'cursor': 'default',
            'opacity': '75%'
        });
    }

    function _muteOnClick() {
        const videoContainer = $(this).parent();
        const video = videoContainer.children('video');
        const mute = videoContainer.children('#mute');
        const unmute = videoContainer.children('#unmute');

        const isMuted = video.prop('muted');

        if(isMuted) {
            video.prop('muted', false);
            mute.hide();
            unmute.show();
        }
        else {
            video.prop('muted', true);
            mute.show();
            unmute.hide();
        }
    }

    function _playOnClick() {
        const videoContainer = $(this).parent();
        const video = videoContainer.children('video').get(0);
        const play = videoContainer.children('#play');
        const pause = videoContainer.children('#pause');

        const isPaused = video.paused;

        if(isPaused) {
            video.play();
            play.hide();
            pause.show();
        }
        else {
            video.pause();
            play.show();
            pause.hide();
        }
    }

    function _restartOnClick() {
        const videoContainer = $(this).parent();
        const video = videoContainer.children('video').get(0);

        video.pause();
        video.currentTime = 0;
        video.play();
    }

    function _enterFullView(vid, vidContainer, fore, isFilter, filterId) {
        const video = vid;
        const videoContainer = vidContainer;
        const foreground = fore;
        const screen = $('body');

        // Create a blurred background screen
        const blurBackground = $('<div/>');
        blurBackground.addClass('blur-background');
        blurBackground.appendTo(screen);
        blurBackground.hover(() => blurBackground.css({
            'background-color': 'rgba(0, 0, 0, 0.1)'}) 
            , () => blurBackground.css({
                'background-color': 'transparent'}));
        blurBackground.click(() => _exitFullView(video, videoContainer, blurBackground, isFilter, filterId));

        // Stop background scrolling
        screen.css({ 'overflow': 'hidden' });

        // Expand CSS of videoContainer
        videoContainer.removeClass('video-container');
        videoContainer.addClass('video-container-full');
        video.css('border-radius', '5%');

        // Add action buttons for Full View
        const pauseButton = $('<img>');
            pauseButton.attr('src', 'bubbl_library/assets/pause.svg');
            pauseButton.attr('id', 'pause');
            pauseButton.addClass('general-button play-button');
            pauseButton.hover(_buttonOnHover, _buttonOffHover);
            pauseButton.click(_playOnClick);
            pauseButton.css('visibility', 'visible');
        const playButton = $('<img>');
            playButton.attr('src', 'bubbl_library/assets/play.svg');
            playButton.attr('id', 'play');
            playButton.addClass('general-button play-button');
            playButton.hover(_buttonOnHover, _buttonOffHover);
            playButton.click(_playOnClick);
            playButton.css('visibility', 'visible');
            playButton.hide();
        const restartButton = $('<img>');
            restartButton.attr('src', 'bubbl_library/assets/restart.svg');
            restartButton.addClass('general-button restart-button');
            restartButton.hover(_buttonOnHover, _buttonOffHover);
            restartButton.click(_restartOnClick);
            restartButton.css('visibility', 'visible');

        pauseButton.appendTo(videoContainer);
        playButton.appendTo(videoContainer);
        restartButton.appendTo(videoContainer);

        // Remove hover, click functionalities for Full View
        videoContainer.off("mouseenter mouseleave");
        video.off('click');

        // Remove foreground
        foreground.remove();
    }

    function _exitFullView(vid, vidContainer, blurBack, isFilter, filterId) {
        const videoContainer = vidContainer;
        const video = vid;
        const blurBackground = blurBack;
        const screen = $('body');
        
        // Remove blur background
        blurBackground.remove();

        // Enable background scrolling
        screen.css({ 'overflow': 'scroll' });

        // Remove expanded CSS of videoContainer
        videoContainer.removeClass('video-container-full');
        videoContainer.addClass('video-container');
        video.css('border-radius', '50%');

        // Remove action buttons
        videoContainer.children('.play-button').remove();
        videoContainer.children('.restart-button').remove();

        // Start the video bubble in its resting state
        video.get(0).pause();
        videoContainer.css({
            'width': video.width() - 20,
            'height': video.height() - 20
        });
        videoContainer.find('img').css('visibility', 'hidden');

        // Add foreground back
        const foreground = $('<div>', {
            id: filterId
        });
            foreground.addClass('bubble-foreground');
            if(!isFilter) {
                foreground.css({ 'background': 'transparent'});
            }
        foreground.appendTo(videoContainer);

        // Add hover, click functionalities back
        videoContainer.hover(_videoOnHover, _videoOffHover);
        foreground.click(() => _enterFullView(video, videoContainer, foreground, isFilter, filterId));

        // Restore bubble bounce
        videoContainer.addClass('bubble-bounce');
    }

    VideoCanvas.prototype = {
        addVideo: function(videoId, src, videoSize, videoVolume) {
            log("addVideo: " + this.videoId);
            const body = $(this.divId);
            // Preliminary work with parameters

            const sizeTranslate = {
                'small': '150px',
                'medium': '200px',
                'large': '250px'
            }

            const size = (videoSize in sizeTranslate) ? sizeTranslate[videoSize] : sizeTranslate['medium'];
            const volume = (videoVolume) ? videoVolume : 1;   

            // Acess videoCanvas and create videoContainer div
            const videoCanvas = body.children('.video-canvas').get(0);

            const videoContainer = $('<div/>');
                videoContainer.addClass('video-container bubble-bounce');
                videoContainer.css('width', size);
                videoContainer.css('height', size);
            
            // Create circular video element
            const video = $('<video/>', {
                id: videoId,
                src: src,
                type: 'video/mp4',
                controls: false
            });
            video.prop('muted', true);
            video.prop('loop', 'loop');
            video.prop('volume', volume);

            video.addClass('video');

            // Create bubble foreground
            const foreground = $('<div>', {
                id: videoId + "-foreground"
            });
                foreground.addClass('bubble-foreground');
                if(!this.isFilter) {
                    foreground.css({ 'background': 'transparent'});
                }
            
            // Create elements inside of video
            const muteButton = $('<img>');
                muteButton.attr('src', 'bubbl_library/assets/volume_off.svg');
                muteButton.attr('id', 'mute');
                muteButton.addClass('general-button mute-button');
                muteButton.hover(_buttonOnHover, _buttonOffHover);
                muteButton.click(_muteOnClick);
            const unMuteButton = $('<img>');
                unMuteButton.attr('src', 'bubbl_library/assets/volume_on.svg');
                unMuteButton.attr('id', 'unmute');
                unMuteButton.addClass('general-button mute-button');
                unMuteButton.hover(_buttonOnHover, _buttonOffHover);
                unMuteButton.click(_muteOnClick);
                unMuteButton.hide();

            // Append all the created elements
            muteButton.appendTo(videoContainer);
            unMuteButton.appendTo(videoContainer);
            video.appendTo(videoContainer);
            foreground.appendTo(videoContainer);

            videoContainer.appendTo(videoCanvas);
            
            // Click, hover functions
            foreground.click(() => _enterFullView(video, videoContainer, foreground, this.isFilter, this.divId + '-foreground'));
            videoContainer.hover(_videoOnHover, _videoOffHover);

            // Update this.videos
            this.videos.push(videoId);
        },

        removeVideo: function(videoId) {
            // Check if video is in this.videos - if so, remove 
            const i = this.videos.indexOf(videoId);
            if (i > -1) {
                this.videos.splice(i, 1);
                log("removeVideo: " + videoId);
            }
            else {
                log("error: videoId is not valid");
                return;
            }

            // Remove video element from DOM
            $('#' + videoId).remove();
            $('#' + videoId + '-foreground').remove();
        },

        videoLink: function(videoId, url) {
            // Check if videoId is not in this.videos then log error and return
            if (!(this.videos.includes(videoId))) {
                log("error: videoId is not valid in videoCanvas.videoLink(videoId, url)");
                return;
            }

            log("videoLink: " + videoId);
            // Create videoLink element
            const video = $('#' + videoId);
            const videoContainer = video.parent();

            const linkButton = $('<img>');
                linkButton.attr('src', 'bubbl_library/assets/link.svg');
                linkButton.attr('id', 'link');
                linkButton.addClass('general-button link-button');
                linkButton.hover(_buttonOnHover, _buttonOffHover);
                linkButton.click(function() {window.open(url)});
                linkButton.appendTo(videoContainer);
        }
    }

    global.VideoCanvas = global.VideoCanvas || VideoCanvas;

})(window, window.document, $);