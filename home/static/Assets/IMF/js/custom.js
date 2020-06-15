; (function ($) {
    /* snippet for the bios in the event page  - ENHC0019293- */
    $(document).ready(function () {
        if ($('.bios dd').is(":visible")) {
            $('.bios dd').hide();
        }
    });

    //Set up Slider
    $(".royalSlider").royalSlider({
        // options go here
        // as an example, enable keyboard arrows nav
        imageScaleMode: 'fill',
        keyboardNavEnabled: true,
        autoScaleSlider: true,
        autoScaleSliderWidth: 1099,
        autoScaleSliderHeight: 312,
        arrowsNav: true,
        usePreloader: true,
        numImagesToPreload: 4,
        delay: 8000,
        pauseOnHover: true,
        transitionSpeed: 600,
        controlsInside: true,
        sliderTouch: true,
        loop: true,
        navigateByClick: false,

        imgWidth: 1099,
        imgHeight: 312,

        sliderDrag: false,
        controlNavigation: 'bullets',
        autoPlay: {
            // autoplay options go gere
            enabled: true,
            pauseOnHover: true
        }
    });


    /* Begin Omniture 2017 */
    /* Internal campaign impressions Omniture implementation */
    //var impressionClickPublication = document.getElementsByClassName('slide-caption')
    //for (i = 0; i < impressionClickPublication.length; i++) {
    //    impressionClickPublication[i].addEventListener("click", ImpressionLinksClick);
    //}
    //try {
    //    digitalData;
    //}
    //catch (err) {
    //    var digitalData = "";
    //}
    //digitalData = {
    //    impression: {
    //        name: s && s.pageName,
    //        event: 'impression'
    //    }
    //};
    //_satellite.track('impression');
    /* End Omniture 2017 */

    //add feather light box to images in mobile first template with colored background
    jQuery('.color-mod').find('img').each(function () {
        jQuery(this).attr("data-featherlight", jQuery(this).attr('src'));
    });

    /* Image Enlarge code - ENHC0018175- */
    jQuery('img.Image-enlarge').each(function () {
        var str_length = jQuery(this).prop('src').indexOf('://');
        var s = jQuery(this).prop('src').substring(str_length + 3, jQuery(this).prop('src').indexOf('?')).replace(window.location.host, '');
        jQuery(this).attr('data-featherlight', s);
    });

    // BEGIN - COVEO BEST BETS
    jQuery(function () {
        if (jQuery("#suggestedLinks").length > 0) {
            getBestBets();
        }
    });

    jQuery(window).on("hashchange", function () {
        if (jQuery("#suggestedLinks").length > 0) {
            getBestBets();
        }
    });

    function getBestBets() {
        var url = window.location.href;
        var searchTerm = "";
        var langVal = "en";

        var hash = url.substring(url.indexOf("#"));
        var reg = new RegExp('[#&]' + 'q' + '=([^&]*)', 'i');
        var keyVal = reg.exec(hash);

        if (keyVal && keyVal[1])
            searchTerm = decodeURIComponent(keyVal[1]);

        if (searchTerm != "") {
            var valRegx = new RegExp('^[0-9A-Za-z =%*-/:]+$');//This checks for alphabets, number, and white space
            var isValid = false;
            isValid = valRegx.test(searchTerm);
            //replace the invalid characters with white space
            if (!isValid)
                searchTerm = searchTerm.replace(new RegExp("[^0-9A-Za-z =%*-/:]", "g"), " ");
        }


        var regLang = new RegExp('[?&]' + 'sc_lang' + '=([^&]*)', 'i');
        langVal = regLang.exec(url);

        var lang = "en";
        if ((url.toLowerCase().indexOf("/fr/") > 0) || (langVal && langVal[1].toLowerCase() == "fr"))
            lang = "fr";
        else if ((url.toLowerCase().indexOf("/es/") > 0) || (langVal && langVal[1].toLowerCase() == "es"))
            lang = "es";


        $.ajax({
            url: "/api/imf/bestbets/getbestbets",
            type: "GET",
            dataType: "json",
            contentType: "application/json",
            data: { "searchTerm": searchTerm, "language": lang },
            cache: false,
            success: function (data) {
                if (data.length > 0) {
                    var html = "<h4>Suggested Links</h4>";
                    if (lang == "fr")
                        html = "<h4>Suggestion</h4>";
                    else if (lang == "es")
                        html = "<h4>Le sugerimos</h4>";
                    $.each(data,
                        function (index, value) {

                            html += "<p><span class='smainlink'>";
                            if (value.Url)
                                html += "<a href='" + value.Url + "'>" + value.Title + "</a></span>";
                            else
                                html += value.Title;
                            html += value.Description + "</p>";
                        });
                    jQuery("#suggestedLinks").empty();
                    jQuery("#suggestedLinks").append(html);
                    jQuery("#suggestedLinks").show();
                } else {
                    jQuery("#suggestedLinks").hide();
                }

            },
            error: function (xhr, status, error) {
                jQuery("#suggestedLinks").empty();
                jQuery("#suggestedLinks").hide();
            }
        });
    }
    // END - COVEO BEST BETS

    // BEGIN - Header Search Submit
    jQuery("button.mag").on("click", function () {
        var searchForm = jQuery(this).closest("form");
        jQuery(searchForm).trigger("submit");
        return false;
    });

    jQuery("#searchform, #searchform2").on("submit", function () {
        var searchForm = jQuery(this).closest("form");
        var submissionTarget = jQuery(searchForm).attr("action");
        var term = jQuery(searchForm).find("input[name='NewQuery']:visible").val();
        if (term === "Search IMF") { term = ""; }
        submissionTarget = submissionTarget + "#q=" + encodeURIComponent(term);
        document.location.href = submissionTarget;
        return false;
    });
    // END - Header Search Submit
})(jQuery);