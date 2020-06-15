var vid_data = "<video id=\"videojs\" width=\"566\" height=\"367\" data-account=\"45228659001\" data-video-id=\"videoId\" data-player=\"ryS2wqJM\" data-embed=\"default\" class=\"video-js\" controls></video>";
var videoIds = [];
var playerIds = [];



jQuery(function () {

    var playerData = {
        "accountID": "45228659001",
        "playerID": "ryS2wqJM"
    };
    function addPlayer(index) {
        var account_ID = jQuery('.HTML_video_tabs').attr('accountid');
        var Player_ID = jQuery('.HTML_video_tabs').attr('player_id');
        var Pwidth = jQuery('.HTML_video_tabs').attr('PWidth');
        var Pheight = jQuery('.HTML_video_tabs').attr('PHeight');
        // dynamically build the player video element
        playerHTML = "<video id=\"" + playerIds[index] + "\" width=\"" + Pwidth + "\" height=\"" + Pheight + "\" data-account=\"" + account_ID + "\" playsinline autoplay data-video-id=\"" + videoIds[index] + "\" data-player=\"" + Player_ID + "\" data-embed=\"default\" class=\"video-js\" controls></video>";

        // inject the player code into the DOM
        document.getElementById("fragment-" + videoIds[index]).innerHTML = playerHTML;

        var s = document.createElement('script');
        s.src = "//players.brightcove.net/" + account_ID + "/" + Player_ID + "_default/index.min.js";
        document.body.appendChild(s);
    }

    function destroyPlayer(index) {

        videojs(playerIds[index]).dispose();

        jQuery("fragment-" + videoIds[index]).empty();
    }

    function togglePause(index, previousVideoIndex) {

        destroyPlayer(previousVideoIndex);

        addPlayer(index);
    }

    var tab_select_function = function (event, ui) {
        togglePause(ui.newTab.index(), ui.oldTab.index());
    };

    jQuery(".HTML_video_tabs").find("video").each(function (index) {
        var div_id = jQuery(this).parent("div").attr('data-video-id');
        var player_id = jQuery(this).parent("div").attr('id');

        //added the below fix for html multiplayer and aside video bug fix -start 

        jQuery(this).parent("div").attr("id", "htmlid" + index);
        var player_id = jQuery(this).parent("div").attr('id');
        //end

        if (index > 0) jQuery('#' + div_id).empty();
        window.videoIds.push(div_id);
        window.playerIds.push(player_id);
    });
    jQuery(".HTML_video_tabs").find("object").each(function (index) {
        var div_id = jQuery(this).parent("div").attr('data-video-id');
        var player_id = jQuery(this).parent("div").attr('id');
        if (index > 0) jQuery('#' + div_id).empty();
        window.videoIds.push(div_id);
        window.playerIds.push(player_id);
    });

    console.log(videoIds);
    console.log(playerIds);
    //Register Select function so that 'tab_select_function' will get fired when tabs are pressed
    jQuery('.HTML_video_tabs').tabs({
        beforeActivate: tab_select_function
    });

    /*
                jQuery(".HTML_video_tabs").tabs({
                    beforeActivate: function( event, ui ) {
                        if(jQuery(".HTML_video_tabs").find('video').length > 0)
                        {
                            if(ui.oldPanel.find("video").length > 0)
                            {
                                var oldHTML = jQuery(ui.oldPanel).html();
                    jQuery(ui.oldPanel).data('bcove', oldHTML);
                    ui.oldPanel.empty();
                            }
                            if(ui.newPanel.find("video").length == 0)
                            {
                                 vid_data_new=vid_data.replace(/videoId/g,ui.newPanel[0].id.substring(9));
                                 jQuery("#"+ui.newPanel[0].id).append(vid_data_new);
                                // var newHTML = jQuery(ui.newPanel).data('bcove');
                   //  jQuery(ui.newPanel).html(newHTML);
            
                var s = document.createElement('script');
                s.src = "//players.brightcove.net/" + playerData.accountID + "/" + playerData.playerID + "_default/index.min.js";
                document.body.appendChild(s);
                            }    
                        }
    
                        
                   
    
            },
            activate: function (event, ui) {
                if (jQuery(".HTML_video_tabs").find('video').length > 0) {
                    var Player = jQuery('.HTML_video_tabs .ui-tabs-panel:visible video')[0];
                    Player.play();
                    try {
                        Player.currentTime(myPlayer.seekable().end(0));
                    } catch (err) {
                    }
    
                }
                if (jQuery(".HTML_video_tabs").find('object').length > 0) {
                    var IE_Player = videojs(jQuery('.HTML_video_tabs .ui-tabs-panel:visible div').attr('id'));
                    IE_Player.play();
                    try {
                        IE_Player.currentTime(myPlayer.seekable().end(0));
                    } catch (err) {
                    }
                }
            }
        });
    */
});
jQuery(window).load(function () {
    if (jQuery('.HTML_video_tabs .ui-tabs-panel:visible video').length > 0) {
        try {
            videojs(jQuery('.HTML_video_tabs .ui-tabs-panel:visible div').attr('id')).play();
        } catch (err) {
        }
    }
    if (jQuery('.HTML_video_tabs .ui-tabs-panel:visible object').length > 0) {
        videojs(jQuery('.HTML_video_tabs .ui-tabs-panel:visible div').attr('id')).play();
    }
});
jQuery(document).ready(function () {
    if (jQuery(".video-tab-accordion").find('video:visible').length > 0) {
        //updated for fixing the issue "Aside Video" impacts Live Webcast player
        // jQuery('.HTML_video_tabs > ul').css('width', jQuery('.video-js').outerWidth() + 2);
        jQuery('.HTML_video_tabs > ul').css('width', jQuery('.video-js'));

        //Pause  or Play all Video on Accordion closed
        jQuery(".video-tab-accordion").accordion({
            collapsible: true,
            beforeActivate: function (event, ui) {
                if (!ui.newPanel.length) {
                    jQuery('.HTML_video_tabs video:visible')[0].pause();
                }
            },
            activate: function (event, ui) {
                if (ui.newPanel.length) {
                    jQuery('.HTML_video_tabs video:visible')[0].play();
                }
            }
        });
        if ((jQuery('.video-js').outerWidth() > jQuery(window).width()) && jQuery('.video-tab-accordion h4').hasClass('mobile_new')) {
            jQuery('.video-js').css('width', (jQuery(window).width() - 50));

        }

    }

    if (jQuery('.HTML_video_tabs').outerHeight() > jQuery('.video-js').outerHeight()) {
        //updated for fixing the issue "Aside Video" impacts Live Webcast player
        //jQuery('.HTML_video_tabs').css('height', jQuery('.video-js').outerHeight() + 50);
        jQuery('.HTML_video_tabs').css('height', parseInt(jQuery('.HTML_video_tabs').attr('PHeight')) + 50);
        jQuery('.HTML_video_tabs').css('overflow', 'inherit')
    }
});
