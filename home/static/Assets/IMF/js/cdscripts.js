(function ($) {
    $(document).ready(function (e) {
        //hide empty sections
        $('section').each(function () {
            var showSection = false;

            if ($(this).clone().find(':header:first,style').remove().end().text().trim() != '') {
                showSection = true;
            }

            if ($(this).find('iframe').length > 0) {
                showSection = true;
            }

            if ($(this).find('*[href]:not(*[href=""]),*[value]:not(*[value=""]),*[src]:not(*[src=""],script[src]),*[code]:not(*[code=""]),*[data]:not(*[data=""])').length > 0) {
                showSection = true;
            }

            if (showSection) {
                $(this).closest('section').show();
            }

            else {
                $(this).closest('section').hide();
                var anchrName = $(this).closest('section').find('a:first').attr('name');
                $('.anchors').find('a[href=#' + anchrName + ']').parent().hide();
            }
        });

        //show/hide figure tables
        $('.icon-table').click(function () {
            var sibling = $(this).siblings('div[data-type="dynamic"]');
            if ($(sibling).css("display") == "none")
                $(sibling).css("display", "block");
           else if ($(sibling).css("display") == "block")
                $(sibling).css("display", "none");
        });
    });
})
    (jQuery);