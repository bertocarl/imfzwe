var vid_data = '<object type="application/x-shockwave-flash" id="myExperiencevideo_id" width="560" height="315" class="BrightcoveExperience BrightcoveExperienceID_278" seamlesstabbing="undefined" data="https://secure.brightcove.com/services/viewer/federated_f9?&amp;width=560&amp;height=315&amp;flashID=myExperiencevideo_id&amp;identifierClassName=BrightcoveExperienceID_278&amp;bgcolor=%23FFFFFF&amp;autoStart=true&amp;playerID=1445496942001&amp;playerKey=AQ~~%2CAAAACofWkTk~%2Cd-cWVfCeeBFVD7lje_EYNNETs7C4UhqI&amp;isVid=true&amp;dynamicStreaming=true&amp;%40videoPlayer=video_id&amp;play=true&amp;includeAPI=true&amp;templateLoadHandler=onTemplateLoad&amp;templateReadyHandler=brightcove%5B%22templateReadyHandlermyExperiencevideo_id%22%5D&amp;secureConnections=true&amp;secureHTMLConnections=true&amp;debuggerID=&amp;originalTemplateReadyHandler=onTemplateReady&amp;startTime=1491386181493"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="seamlessTabbing" value="false"><param name="swliveconnect" value="true"><param name="wmode" value="window"><param name="quality" value="high"><param name="bgcolor" value="#FFFFFF"></object>'

jQuery(function () {
    jQuery(".video_tabs").find("object").each(function (index) {
        var div_id = jQuery(this).parent("div").attr('id');
        if (index > 0) jQuery('#' + div_id).empty();
        console.log(div_id);
    });

    jQuery(".video_tabs").tabs({
        beforeActivate: function (event, ui) {
            if (jQuery(".video_tabs").find('object').length > 0) {
                if (ui.oldPanel.find("object").length > 0) {
                    ui.oldPanel.empty();
                }
                if (ui.newPanel.find("object").length == 0) {
                    vid_data_new = vid_data.replace(/video_id/g, ui.newPanel[0].id.substring(9));
                    jQuery("#" + ui.newPanel[0].id).append(vid_data_new);
                }
            }

            if (jQuery(".video_tabs").find('video').length > 0) {
                jQuery('.video_tabs .ui-tabs-panel video').each(function () {
                    jQuery(this)[0].pause();
                });
            }
        },
        activate: function (event, ui) {
            if (jQuery(".video_tabs").find('video').length > 0) {
                jQuery('.video_tabs .ui-tabs-panel:visible video')[0].play();
            }
        }
    });
});
jQuery(window).load(function () {
    if (jQuery('.video_tabs .ui-tabs-panel:visible video').length > 0) {
        jQuery('.video_tabs .ui-tabs-panel:visible video')[0].play();
    }
});
jQuery(document).ready(function () {
    if (jQuery(".video-tab-accordion").find('video:visible').length > 0) {
        //updated for fixing the issue "Aside Video" impacts Live Webcast player                         
        // jQuery('.video_tabs > ul').css('width', jQuery('.video-js').outerWidth()+2);
        jQuery('.video_tabs > ul').css('width', jQuery('.video-js'));

        //Pause  or Play all Video on Accordion closed
        jQuery(".video-tab-accordion").accordion({
            collapsible: true,
            beforeActivate: function (event, ui) {
                if (!ui.newPanel.length) {
                    jQuery('.video_tabs video:visible')[0].pause();
                }
            },
            activate: function (event, ui) {
                if (ui.newPanel.length) {
                    jQuery('.video_tabs video:visible')[0].play();
                }
            }
        });
        if ((jQuery('.video-js').outerWidth() > jQuery(window).width()) && jQuery('.video-tab-accordion h4').hasClass('mobile')) {
            jQuery('.video-js').css('width', (jQuery(window).width() - 20));

        }

    }

    if (jQuery(".video_tabs").find('video').length == 0 && jQuery('.video-tab-accordion h4').hasClass('mobile')) {
        jQuery('.accordion-toggle').css('background', '#dce5eb');
        jQuery('h4.mobile').text(' Video Player :Video stream available in desktop version');
    }
});