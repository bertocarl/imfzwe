$(function () {
            var $oe_menu = $('#oe_menu');
            var $oe_menu_items = $oe_menu.children('li.tr');
            var docHeight = $(document).height();
            var docWidth = $(document).width();


            $oe_menu_items.bind('mouseenter', function () {
                var $this = $(this);
                $this.addClass('slided selected');
                $this.children('div').stop(true, true).slideDown(200, function () {
                    $oe_menu_items.not('.slided').children('div').hide();
                    $this.removeClass('slided');
                });
            }).bind('mouseleave', function () {
                var $this = $(this);
                $this.removeClass('selected').children('div');
                $oe_menu_items.children('div').hide();
            });

            $oe_menu.bind('mouseenter', function () {
                var $this = $(this);
                $this.addClass('hovered');
            }).bind('mouseleave', function () {
                var $this = $(this);
                $this.removeClass('hovered');
                $oe_menu_items.children('div').hide();
            })


            $('#overlay').css({ "visibility": "hidden", "height": "0",
                "width": "0"
            });

            $('ul.oe_menu li.tr').hover(function () {
                $('#overlay').css({ "visibility": "visible", "height": docHeight,
                    "width": docWidth
                }).stop().fadeTo(300, 1);
            }, function () {
                $('#overlay').stop().fadeTo(300, 0).css({ "visibility": "hidden", "height": "0",
                    "width": "0"
                });
            });
        });// JavaScript Document