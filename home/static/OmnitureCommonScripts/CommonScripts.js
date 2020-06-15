

    jQuery(document).ready(function ($) {
	var whatsNewNavigationLinks = document.querySelectorAll('.whatsnew .ng-scope a'); 
for (i = 0; i < whatsNewNavigationLinks.length; i++) {
        whatsNewNavigationLinks[i].addEventListener("click", onwhatsNewNavigationClick);
    } 
    });


    /* Social follow Begin */
    var socialFollowLinks = document.querySelectorAll('a.icon-facebook, a.icon-twitter, a.icon-podcast, a.icon-linkedin, a.icon-feed4, a.icon-youtube, a.icon-flickr2, a.icon-mail, a.icon-share2, a.icon-apple, a.icon-android');
    for (i = 0; i < socialFollowLinks.length; i++) {
        socialFollowLinks[i].addEventListener("click", socialFollowClick);
    }
    try {

        digitalData;
    } catch (err) {
        var digitalData = "";
    }

    function socialFollowClick(e) {
        /*Data Layer code*/
        digitalData = {
            page: {
                social: {
                    socialSharePlatform: e.target.innerHTML,
					socialPage:s.pageName
                }
            }
        };
        _satellite.track('socialFollow');
        /*Data Layer code*/

    }

    /* Social follow end */

    /*Navigation Begins */
    var navigationLinks = document.querySelectorAll('a.home, a.about, a.resIMF, a.countryinfo, a.capacity, a.news, a.video, a.datastats, a.pubs,a.social');
	
	/*selecting the bottom links*/
	var bottomNavigationLinks = document.querySelectorAll('a.homeBtm, a.whatsNewBtm, a.mapBtm, a.siteIndexBtm, a.aboutBtm,a.resIMFBtm, a.countryInfoBtm, a.newsBtm, a.eventsBtm, a.videosBtm last,a.dataStatsBtm, a.pubsBtm, a.smhBtm,a.crightBtm, a.priBtm, a.contactBtm,a.jobBtm, a.termBtm, a.scamalertBtm last');
	
	
	/*selecting the Whatsnew links*/
	var whatsNewNavigationLinks = document.querySelectorAll('.whatsnew .ng-scope a');
	var highLightsNavigationLinks =document.querySelectorAll('ul.highlt a');
	var sliderNavigationLinks =document.querySelectorAll('div.slide-caption h3 a');	
    var beltBannerNavigationLinks =document.querySelectorAll('div.homebelt a');	
    for (i = 0; i < navigationLinks.length; i++) {
        navigationLinks[i].addEventListener("click", onNavigationClick);
    }
	for (i = 0; i < bottomNavigationLinks.length; i++) {
        bottomNavigationLinks[i].addEventListener("click", onBottomNavigationClick);
    }
	for (i = 0; i < whatsNewNavigationLinks.length; i++) {
        whatsNewNavigationLinks[i].addEventListener("click", onwhatsNewNavigationClick);
    }
	for (i = 0; i < highLightsNavigationLinks.length; i++) {
        highLightsNavigationLinks[i].addEventListener("click", highLightsNavigationClick);
    }
	for (i = 0; i < sliderNavigationLinks.length; i++) {
        sliderNavigationLinks[i].addEventListener("click", onsliderNavigationClick);
    }
	for (i = 0; i < beltBannerNavigationLinks.length; i++) {
        beltBannerNavigationLinks[i].addEventListener("click", onbeltBannerNavigationClick);
    }
    try {

        digitalData;
    } catch (err) {
        var digitalData = "";
    }

    function onNavigationClick(e) {
        digitalData = {
            navInfo: {
                linkPage: s && s.pageName ||  e.target.innerHTML,
                linkName: e.target.innerHTML,
                linkPosition: 'Top Navigation'
            }
        };
        _satellite.track('Navigation');
    }
	
	function onBottomNavigationClick(e)
	{
		digitalData = {
            navInfo: {
                linkPage: s && s.pageName ||  e.target.innerHTML,
                linkName: e.target.innerHTML,
                linkPosition: 'Bottom Navigation'
            }
        };
        _satellite.track('Navigation');
	}
	
	function onwhatsNewNavigationClick(e)
	{
		digitalData = {
            navInfo: {
                linkPage: s && s.pageName ||  e.target.innerHTML,
                linkName: e.target.innerHTML,
                linkPosition: 'Whats New Navigation'
            }
        };
        _satellite.track('Navigation');
	}
	function highLightsNavigationClick(e)
	{
		digitalData = {
            navInfo: {
                linkPage: s && s.pageName ||  e.target.innerHTML,
                linkName: e.target.innerHTML,
                linkPosition: 'Highlights Navigation'
            }
        };
        _satellite.track('Navigation');
	}
	function onsliderNavigationClick(e)
	{
		digitalData = {
            navInfo: {
                linkPage: s && s.pageName ||  e.target.innerHTML,
                linkName: e.target.innerHTML,
                linkPosition: 'Rotator Navigation'
            }
        };
        _satellite.track('Navigation');
	}
	
	function onbeltBannerNavigationClick(e)
	{
		digitalData = {
            navInfo: {
                linkPage: s && s.pageName ||  e.target.innerHTML,
                linkName: e.target.innerHTML,
                linkPosition: 'Belt Banner Navigation'
            }
        };
        _satellite.track('Navigation');
	}
    /*Navigation Ends */

    /* Internal impression */

    function ImpressionLinksClick(e) {
		var text = "";
		if (e.target.nodeName.toLowerCase() == "a") {
			text = e.target.innerHTML;
			
		}
        digitalData = {
            impression: {
                name: text,
                event: 'click'
            }
		
        };
	
        _satellite.track('internalCampClick');
    }
    /* Internal impression end*/