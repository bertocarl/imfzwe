// Begin Pushing PDF Info to Google Analytics

  document.onclick = function(e){
  e = e || event;
  var from = findParent('a',e.target || e.srcElement);
  if (from){
     if (e.target.href.toLowerCase().indexOf('.pdf') !== -1){
     _gaq.push(['_trackEvent', 'PDFs', 'Downloaded', e.target.href.toLowerCase()]);
   }
  }
}

function findParent(tagname,el){
  if ((el.nodeName || el.tagName).toLowerCase()===tagname.toLowerCase()){
    return el;
  }
  while (el = el.parentNode){
    if ((el.nodeName || el.tagName).toLowerCase()===tagname.toLowerCase()){
      return el;
    }
  }
  return null;
}

// End Pushing PDF Info to Google Analytics