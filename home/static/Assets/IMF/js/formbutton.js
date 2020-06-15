; (function ($) {
    $(document).ready(function () {
    });

    function replaceQueryParam(param, newval, search) {
        var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
        var query = search.replace(regex, "$1").replace(/&$/, '');
        return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
    }

    $("#btnGO").click(function (e) {
        e.preventDefault();
        var endDate = $("#ddlYearTo").val() + $("#ddlMonthTo").val() + $("#ddlDayTo").val();
        var startDate = $("#ddlYearFrom").val() + $("#ddlMonthFrom").val() + $("#ddlDayFrom").val();
        var str = window.location.search;
        str = replaceQueryParam('startdate', startDate, str);
        str = replaceQueryParam('enddate', endDate, str);
        str = replaceQueryParam('page', '1', str);
        window.location.href = window.location.pathname + str;
        return false;
    });

    $("#PodcastCategories").change(function (e) {
        e.preventDefault();
        var searchText = $("#txtQuery").val();
        var selectedCategory = $('#PodcastCategories').val();

        var str = window.location.search;
        str = replaceQueryParam('searchtext', searchText, str);
        str = replaceQueryParam('category', selectedCategory, str);
        str = replaceQueryParam('page', '1', str);
        window.location.href = window.location.pathname + str;
        return false;
    });

    $("#btnSearch").click(function (e) {
        e.preventDefault();
        var searchText = $("#txtQuery").val();
        var selectedCategory = $('#PodcastCategories').val();

        var str = window.location.search;
        str = replaceQueryParam('searchtext', searchText, str);
        str = replaceQueryParam('category', selectedCategory, str);
        str = replaceQueryParam('page', '1', str);
        window.location.href = window.location.pathname + str;
        return false;
    });

})(jQuery);

