    //<![CDATA[	
	if (GBrowserIsCompatible()) {
	// without categories -- var side_bar_html = "";
      //categorized version
	  var side_bar_html = [];
	  	side_bar_html["hq"] = "";
		side_bar_html["metro"] = "";
  		side_bar_html["air"] = ""; 
  
      var gmarkers = [];
      var htmls = [];
      var i = 0;
	  
	  // Highlight
	  var lastlinkid;

	  // arrays to hold variants of the info window html with get direction forms open
      var to_htmls = [];
      var from_htmls = [];

	// Create some custom icons
	
		// This icon is a different shape, so we need our own settings       
      var imfIcon = new GIcon();
      imfIcon.image = "/external/images/icons/gmaps/orangemarker.png";
      imfIcon.shadow = "/external/images/icons/gmaps/markershadow.png";
      imfIcon.iconSize = new GSize(32, 32);
      imfIcon.shadowSize = new GSize(59, 32);
      imfIcon.iconAnchor = new GPoint(16, 32);
      imfIcon.infoWindowAnchor = new GPoint(16, 10);
      imfIcon.infoShadowAnchor = new GPoint(18, 31);
      imfIcon.printImage = "/external/images/icons/gmaps/orangemarkerie.gif";
      imfIcon.mozPrintImage = "/external/images/icons/gmaps/orangemarkerff.gif";   
      // This icon is a different shape, so we need our own settings       
      var railIcon = new GIcon();
      railIcon.image = "/external/images/icons/gmaps/rail.png";
      railIcon.shadow = "/external/images/icons/gmaps/railshadow.png";
      railIcon.iconSize = new GSize(32, 32);
      railIcon.shadowSize = new GSize(59, 32);
      railIcon.iconAnchor = new GPoint(17, 32);
      railIcon.infoWindowAnchor = new GPoint(17, 1);
      railIcon.infoShadowAnchor = new GPoint(28, 30);
      railIcon.printImage = "/external/images/icons/gmaps/railie.gif";
      railIcon.mozPrintImage = "/external/images/icons/gmaps/railff.gif";
	  
	  // This icon is a different shape, so we need our own settings       
      var planeIcon = new GIcon();
      planeIcon.image = "/external/images/icons/gmaps/plane.png";
      planeIcon.shadow = "/external/images/icons/gmaps/planeshadow.png";
      planeIcon.iconSize = new GSize(32, 32);
      planeIcon.shadowSize = new GSize(59, 32);
      planeIcon.iconAnchor = new GPoint(17, 32);
      planeIcon.infoWindowAnchor = new GPoint(17, 1);
      planeIcon.infoShadowAnchor = new GPoint(28, 30);
      planeIcon.printImage = "/external/images/icons/gmaps/planeie.gif";
      planeIcon.mozPrintImage = "/external/images/icons/gmaps/planeff.gif";

	  // An array of GIcons, to make the selection easier
      var icons = [];
      icons[0] = imfIcon;
      icons[1] = railIcon;
	  icons[2] = planeIcon;

	  
	 // the icon information is passed to this function
      function createMarker(point,name,html,icontype,category) {
        var marker = new GMarker(point,icons[icontype]);
		// add linkid
		var linkid = "link"+i;
        GEvent.addListener(marker, "click", function() {
			marker.openInfoWindowHtml(html);
			document.getElementById(linkid).style.background = "#e5e5e5 url('/external/07/images/arrow.gif') no-repeat left .4em";
			lastlinkid=linkid;
        });
		
	   // The info window version with the "To here" form open
        to_htmls[i] = html + '<div class="iwstyle"><p class="gmdescribe"><strong>Directions<\/strong> (opens in a new window):<br />To here - <a href="javascript:fromhere('+i+')">From here<\/a><\/p>' +
           '<p class="gmdescribe gmstart">Start address:<\/p>' +
		   '<form action="http://maps.google.com/maps" method="get" target="_blank">' +
           '<input type="text" size="40" name="saddr" id="saddr" value="" />' +
           '&#160;<input value="Go" type="submit"><br />' +
           '<input type="hidden" name="daddr" value="' +name+"@" + point.lat() + ',' + point.lng() + 
                  // "(" + name + ")" + 
           '"/></form>' +
		   '<a href="javascript:myclick('+i+')">&#171; Back<\/a></div>';
        // The info window version with the "From here" form open
        from_htmls[i] = html + '<div class="iwstyle"><p class="gmdescribe"><strong>Directions<\/strong> (opens in a new window):<br /><a href="javascript:tohere('+i+')">To here<\/a> - From here<\/p>' +
           '<p class="gmdescribe gmend">End address:<\/p>' +
		   '<form action="http://maps.google.com/maps" method="get" target="_blank">' +
           '<input type="text" size="40" name="daddr" id="daddr" value="" />' +
           '&#160;<input value="Go" type="submit" /><br />' +
           '<input type="hidden" name="saddr" value="' +name+"@" + point.lat() + ',' + point.lng() +
                  // "(" + name + ")" + 
           '"/></form>' +		   
		   '<a href="javascript:myclick('+i+')">&#171; Back<\/a></div>';
		   
		   
        // The inactive version of the direction info
        html = html + '<div class="iwstyle"><p class="gmdescribe">Directions (opens in a new window):<br /> <a href="javascript:tohere('+i+')">To here<\/a> - <a href="javascript:fromhere('+i+')">From here<\/a><\/p></div>';
		
        // save the info we need to use later for the side_bar
        gmarkers[i] = marker;
        htmls[i] = html;
        //add a line to the side_bar html
		// without categories  side_bar_html += '<div id="'+linkid+'"><a href="javascript:myclick(' + i + ')">' + name + '</a></div>';
        side_bar_html[category] += '<li id="'+linkid+'"><a href="javascript:myclick(' + i + ')">' + name + '<\/a><\/li>';
        i++ ;
       	return marker;
      } 		  

		
	// This function picks up the click and opens the corresponding info window
      function myclick(i) {
        //gmarkers[i].openInfoWindowHtml(htmls[i]);		
		//trigger for linkid
		GEvent.trigger(gmarkers[i], "click");
      }

		// functions that open the directions forms
      function tohere(i) {
        gmarkers[i].openInfoWindowHtml(to_htmls[i]);
      }
      function fromhere(i) {
        gmarkers[i].openInfoWindowHtml(from_htmls[i]);
      }
	  
	 
	
   // create search form for infowindow
	// searchControl = new google.maps.LocalSearch(false, document.getElementById("searchform");
	 // create the map
      var map = new GMap2(document.getElementById("map"));
	  var mapt = map.getMapTypes();
      for (var indx=0; indx<mapt.length; indx++) {
        mapt[indx].getMinimumResolution = function() {return 10;}
        mapt[indx].getMaximumResolution = function() {return 17;}
      }
	  //var lsc = new google.maps.LocalSearch();'
	  // request that tabular search results be displayed in an external container
	   //var options = { resultList : document.getElementById("mapresults") };
		//map.addControl(new google.maps.LocalSearch(options));
		map.addControl(new GLargeMapControl(), new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(7,32)));
		map.addControl(new GMapTypeControl());
		//map.addControl(new GScaleControl());
		//map.addControl(new GOverviewMapControl());
		
		// overview map is closed by default
		var mini=new GOverviewMapControl();
		map.addControl(mini); 
		mini.hide(); 
		
		// add zoom control
            var boxStyleOpts = { opacity: .2, border: "2px solid yellow" };
            var otherOpts = {
              buttonHTML: "<img src='/external/images/icons/gmaps/zoom-control-inactive.png' alt='Zoom Control' title='Zoom Control' class='gmimgfix' />",
              buttonZoomingHTML: "<img src='/external/images/icons/gmaps/zoom-control-active.png' alt='Zoom Control' title='Zoom Control' class='gmimgfix' />",
              buttonStartingStyle: {width: '17px', height: '17px'},
              overlayRemoveTime: 0 };
            map.addControl(new DragZoomControl(boxStyleOpts, otherOpts, {}), new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(27,7)));
		// end add zoom control
		map.setCenter(new GLatLng(38.902272,-77.041283), 15);
		map.addControl (new google.maps.LocalSearch  ( {resultList : document.getElementById("results"), searchFormHint : "Search the local map. For example, try: Hotel"} ), 
		new GControlPosition(G_ANCHOR_BOTTOM_LEFT, new GSize(0,-30)) );	
				
      // Read the data from imfmarkers.xml
      var request = GXmlHttp.create();
      request.open("GET", "/external/07/js/imfmarkers.xml", true);
      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          var xmlDoc = GXml.parse(request.responseText);  
          // obtain the array of markers and loop through it
          var markers = xmlDoc.documentElement.getElementsByTagName("marker");  
		  
          for (var i = 0; i < markers.length; i++) {
            // obtain the attribues of each marker
            var lat = parseFloat(markers[i].getAttribute("lat"));
            var lng = parseFloat(markers[i].getAttribute("lng"));
            var point = new GLatLng(lat,lng);
            //var html = markers[i].getAttribute("html");	
			var html = GXml.value(markers[i].getElementsByTagName("infowindow")[0]);
            var label = markers[i].getAttribute("label");
            var icontype = parseInt(markers[i].getAttribute("icontype"));
			var category = markers[i].getAttribute("category");
            // create the marker
	        var marker = createMarker(point,label,html,icontype,category);
            map.addOverlay(marker);	
			
			//  begin last part of the active state =====
			GEvent.addListener(marker,"infowindowclose", function() {
			document.getElementById(lastlinkid).style.background="#ffffff url('/external/07/images/arrow.gif') no-repeat left .4em";});	
			// ===== end last part of the active state =====		
          }
          // put the assembled side_bar_html contents into the side_bar div
			//without categories -- document.getElementById("side_bar").innerHTML = side_bar_html;	
			//in categories
			document.getElementById("side_bar_hq").innerHTML = side_bar_html["hq"];
			document.getElementById("side_bar_metro").innerHTML = side_bar_html["metro"];
			document.getElementById("side_bar_air").innerHTML = side_bar_html["air"]; 
		  
		  
        }	 	 
      }
      request.send(null);
    }
	
    else {
      alert("Sorry, the Google Maps API is not compatible with this browser");
    }
    // This Javascript is based on code provided by  
    // http://econym.org.uk/gmap/index.htm

    //]]>