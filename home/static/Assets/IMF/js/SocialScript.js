try {

    digitalData;
}
catch (err) { var digitalData = ""; }

function shareEventHandler(evt) {
    if (evt.type == 'addthis.menu.share') {
        /*Data Layer code*/

        digitalData = {
            page: {
                social: {
                    socialSharePlatform: evt.data.service,
                    socialPage: s.pageName
                }
            }
        }
        _satellite.track('socialShare'); //console.log(evt.data.service);
        /*Data Layer code*/
    }
}

//addthis initialization for socialShare.
addthis.init()
 // Add Social share event listener 
addthis.addEventListener('addthis.menu.share', shareEventHandler);

