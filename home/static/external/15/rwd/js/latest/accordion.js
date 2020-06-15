;(function($) { 
// JavaScript Document

$(function() {
    $( ".accordion" ).accordion({
      heightStyle: "content",
	  collapsible: true
    });
  });

// Hover states on the static widgets
$( "#dialog-link, #icons li" ).hover(
	function() {
		$( this ).addClass( "ui-state-hover" );
	},
	function() {
		$( this ).removeClass( "ui-state-hover" );
	}
);
 $('.accordion h3').bind('click',function(){
            var self = this;
            setTimeout(function() {
                theOffset = $(self).offset();
                $('body,html').animate({ scrollTop: theOffset.top - 280 });
            }, 310); // ensure the collapse animation is done
        });
})(jQuery);