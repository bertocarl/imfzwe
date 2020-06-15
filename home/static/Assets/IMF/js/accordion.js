;(function($) { 
// JavaScript Document

$(function() {
    $( ".accordion" ).accordion({
      heightStyle: "content",
	  collapsible: true
    });
    $( "#accordion" ).accordion({
      heightStyle: "content",
	  collapsible: true
    });
    // ICD accordion, added icons to match mock-ups
    $( ".cc-accordion").accordion({
      heightStyle: "content",
      collapsible: true,
      icons: {'header': 'ui-icon-plusthick', 'headerSelected': 'ui-icon-minusthick' },
      active: false
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
})(jQuery);