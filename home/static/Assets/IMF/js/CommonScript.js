/* Social follow Begin */
var socialFollowLinks = document.querySelectorAll('.at-svc-facebook, .at-svc-twitter, .at-svc-linkedin, .at-svc-google_plusone_share, .at-svc-sinaweibo, .at-svc-compact ');
for (i = 0; i < socialFollowLinks.length; i++) { socialFollowLinks[i].addEventListener("click", socialFollowClick); }
try {

    digitalData;
}
catch (err) { var digitalData = ""; }

function socialFollowClick(e) {
    /*Data Layer code*/
    digitalData = {
        page: {
            social: {
                socialSharePlatform: e.target.innerHTML
            }
        }
    };
    _satellite.track('socialFollow');
    /*Data Layer code*/

}
/* Social follow end */


/*Navigation Begins */
var navigationLinks = document.querySelectorAll('a');
var bottomNavigationLinks = document.querySelectorAll('a.homeBtm, a.whatsNewBtm, a.mapBtm, a.siteIndexBtm, a.aboutBtm,a.resIMFBtm, a.countryInfoBtm, a.newsBtm, a.eventsBtm, a.videosBtm last,a.dataStatsBtm, a.pubsBtm, a.smhBtm,a.crightBtm, a.priBtm, a.contactBtm,a.jobBtm, a.termBtm, a.scamalertBtm last');

for (i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", onNavigationClick);
}
for (i = 0; i < bottomNavigationLinks.length; i++) {
    bottomNavigationLinks[i].addEventListener("click", onBottomNavigationClick);
}
try {

    digitalData;
}
catch (err) { var digitalData = ""; }

function onNavigationClick(e) {
    digitalData = {
        navInfo: {
            linkPage: s && s.pageName || e.target.innerHTML,
            linkName: e.target.innerHTML,
            linkPosition: 'Top Navigation'
        }
    };
    _satellite.track('Navigation');
}

function onBottomNavigationClick(e) {
    digitalData = {
        navInfo: {
            linkPage: s && s.pageName || e.target.innerHTML,
            linkName: e.target.innerHTML,
            linkPosition: 'Bottom Navigation'
        }
    };
    _satellite.track('Navigation');
}
/*Navigation Ends */

/* Internal impression */
window.onload = function () {
    var impressionClickLinks = document.getElementsByClassName('ellipsis');
    for (i = 0; i < impressionClickLinks.length; i++) {
        impressionClickLinks[i].addEventListener("click", ImpressionLinksClick);
    }
    var impressionClickPublication = document.getElementsByClassName('slide-caption')
    for (i = 0; i < impressionClickPublication.length; i++) {
        impressionClickPublication[i].addEventListener("click", ImpressionLinksClick);
    }
    try {

        digitalData;
    }
    catch (err) { var digitalData = ""; }
    digitalData = {
        impression: {
            name: 'campaign',
            event: 'impression'
        }
    };
    _satellite.track('impression');

    /*BEGIN: COVEO-OMNITURE*/
    if ((window.location.href.toLowerCase().indexOf("/search#") > 0) && (window.location.href.toLowerCase().indexOf("/news/search#") < 0) && (window.location.href.toLowerCase().indexOf("/news/searchnews#") < 0)) {
        resultsDiv = document.getElementsByClassName("CoveoResultList");
        for (k = 0; k < resultsDiv.length; k++) {
            resultsDiv[i].addEventListener('DOMSubtreeModified', function () {

                var waitForCoveoResults = function (selector, callback, count) {
                    if (document.getElementsByClassName(selector).length) {
                        callback();
                    } else {
                        setTimeout(function () {
                            if (!count) {
                                count = 0;
                            }
                            count++;
                            if (count < 100) {
                                waitForCoveoResults(selector, callback, count);
                            } else { return; }
                        }, 100);
                    }
                };

                waitForCoveoResults("result-template-header", function () {

                    var resultItems = document.getElementsByClassName("CoveoResultLink");

                    for (i = 0; i < resultItems.length; i++) {
                        resultItems[i].addEventListener("click", searchResultClick, false);
                    }
                });
            }, false);
        }
    }
    /*END: COVEO-OMNITURE*/
}

/*BEGIN: COVEO-OMNITURE*/

window.onhashchange = function () {

    if ((window.location.href.toLowerCase().indexOf("/search#") > 0) && (window.location.href.toLowerCase().indexOf("/news/search#") < 0) && (window.location.href.toLowerCase().indexOf("/news/searchnews#") < 0)) {

        trackSearchTerm();
    }
}

var trackSearchTerm = function () {
    digitalData = "";
    digitalData = {
        page: {
            pageInfo: {
                onsiteSearchTerm: getUrlParameter('q'),
                onsiteSearchResults: document.getElementsByClassName('result-template-header').length
            }
        }
    };
};

var searchResultClick = function (e) {
    digitalData = "";
    digitalData = {
        page: {
            pageInfo: {
                onsiteSearchTerm: getUrlParameter('q'),
                onsiteSearchResults: document.getElementsByClassName('result-template-header').length,
                onsiteSearchResultLinkName: e.target.innerHTML
            }
        }
    };
    _satellite.track("searchResultClick");
};


function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\#&]' + name + '=([^&#]*)');
    var results = regex.exec(location.hash);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
/*END: COVEO-OMNITURE*/


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


try {

    digitalData;
}
catch (err) { var digitalData = ""; }
/*Data Layer code*/
digitalData = {
    page: {
        pageInfo: {
            comCampaign: document.getElementsByTagName('meta')["COMCampaigns"].getAttribute("content")
        }
    }
};
