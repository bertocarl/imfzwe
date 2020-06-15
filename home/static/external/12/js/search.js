// JavaScript Document
/* <![CDATA[ */	
		$(document).ready(function() {
		$('#NewQuery').val('Search IMF');
		
		
		$('#NewQuery').focus(function clearContent() 
		{
			if ($('#NewQuery').val().toLowerCase() == 'search imf' ) 
			{
				$('#NewQuery').val('');
			}
		});
		$('#NewQuery').blur(function blur() {
			if ($('#NewQuery').val().length == 0 ) 
			{
				$('#NewQuery').val('Search IMF');
			}
		});
		$('#mag').click(function() 
		{
			if ($('#NewQuery').val().toLowerCase() == 'search imf' ) 
			{
				$('#NewQuery').val('');
			}
		});
		
		
		});	
	/* ]]> */