myMoro = {
  iphoneUrl: 'https://itunes.apple.com/us/app/imf-news-and-data-for-the-ipad/id414587764?mt=8',
  ipadUrl: 'https://itunes.apple.com/us/app/imf-news-and-data-for-the-ipad/id414587764?mt=8',
  androidUrl: 'https://play.google.com/store/apps/details?id=org.imf.newsanddataapp&referrer=utm_source%3Dimf',
  appName: 'IMF ARC',
  appIcon: '/external/12/images/imfapp.png',
  appId: '70492',
  platform: '',
  run: function(type) {
    var platform = false;
    if (navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) {
      myMoro.platform = platform = navigator.userAgent.match(/iPhone|iPad|iPod|Android/i).toString();
    }
    if (platform && platform.match(/iPhone|iPod/i) && this.iphoneUrl) {
      landingUrl = this.iphoneUrl;
    } else if (platform && platform.match(/iPad/i) && this.ipadUrl) {
      landingUrl = this.ipadUrl;
    } else if (platform && platform.match(/Android/i) && this.androidUrl) {
      landingUrl = this.androidUrl;
    } else {
      return;
    }
        if (this.cookie.get('lockMoWebRedirect') == 'viewed'){
      document.location = 'http://mobileroadie.com/m/imfarc';
    }
        if (this.cookie.get(platform) == 'viewed') {
      return;
    }
    this.cookie.set(platform);
    eval('this.display.' + type + '(landingUrl, platform)');
  },
  display: {
    confirmPopup: function(landingUrl, platform) {
      var confirmed = confirm("Download " + platform + " app?");
      if (confirmed) {
        // setTimeout is used so that back button will be available.
        setTimeout(function(){
          window.location = landingUrl;
        },1000);
      }
    },
    modalPopup: function(landingUrl, platform) {
      var newMeta = document.createElement('meta');
      newMeta.setAttribute("name","viewport");
      newMeta.setAttribute("content","width=device-width, height=device-height, initial-scale = 1.0");
      document.head.insertBefore(newMeta, document.head.childNodes[0]);

      var newStylesheet = document.createElement('link');
      newStylesheet.setAttribute("href","/external/12/css/client-modal.css");
      newStylesheet.setAttribute("type","text/css");
      newStylesheet.setAttribute("rel","stylesheet");
      document.body.appendChild(newStylesheet);
      
      var modalHtml = escape("<div id='moroOverlay' style='z-index: 9999998'></div><div id='moroAppModal' style='z-index: 9999999'><div tabindex='-1' id='moroAppInner' style='display: block; outline: 0px none; height: auto; width: 300px; margin: 10px auto;'><a role='moroButton' href='#' onclick='myMoro.display.modalToggle(); return false'><span class='moroClose'>close</span></a><div scrollleft='0' scrolltop='0' style='width: auto; min-height: 49px; height: auto;' id='moroDialog'><p id='moroWeNoticed'>We noticed you're on your <span id='moroPhoneType'></span></p><h2 style='width:100%;'>Would you like to download the<br><span id='moroAppName'></span></h2><div><div id='moroAppIcon'></div><a id='moroLandingUrl' class='moroButton' href='' onclick='myMoro.display.modalToggle(); return true'>Download the App</a><a class='moroButton' href='#' onclick='myMoro.display.modalToggle(); return false'>Cancel</a></div></div></div></div>");
      var newElement = document.createElement('div');
      newElement.id = 'moroAppModalWrap';
      document.body.appendChild(newElement);
      document.getElementById('moroAppModalWrap').innerHTML = unescape(modalHtml);
      if(landingUrl.indexOf('bit.ly') > 0){
        document.getElementById('moroLandingUrl').setAttribute("href", landingUrl);
      }else{
        document.getElementById('moroLandingUrl').setAttribute("href", landingUrl + ',,js');
      }
      document.getElementById('moroAppName').innerHTML = 'New IMF App?';
      iconImg = new Image();
      iconImg.src = myMoro.appIcon;
      document.getElementById('moroAppIcon').style.backgroundImage = 'url(' + myMoro.appIcon + ')';
      document.getElementById('moroPhoneType').textContent = myMoro.platform;

      this.modalToggle();
    },
    visitMoWeb: function(cookieContainer) {
      var mowebCount = cookieContainer.cookie.get('moWebClickCount');
      if(mowebCount){
        cookieContainer.cookie.set('lockMoWebRedirect');
      }else{
        this.cookie.unset(platform)
        cookieContainer.cookie.set('moWebClickCount');
      }
    },
    modalToggle: function() {
      var el = document.getElementById("moroAppModalWrap");
      el.style.display = (el.style.display == "block") ? "none" : "block";
    }
  },
  cookie: {
    get: function(platform) {
      var cookieName = 'moroAppDetect' + platform + myMoro.appId + '=';
      var ca = document.cookie.split(';');
      for (var i=0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(cookieName) == 0) {
          return c.substring(cookieName.length, c.length);
        }
      }
      return null;
    },
    set: function(platform) {
      var date = new Date();
      date.setTime(date.getTime() + (5*365*24*60*60*1000));

      document.cookie = "moroAppDetect" + platform + myMoro.appId + "=viewed; expires=" + date.toGMTString() + "; path=/";
    },
    unset: function(platform) {
      var date = new Date();
      date.setTime(date.getTime() - (122323604800));
      document.cookie = "moroAppDetect" + platform + myMoro.appId + "=; expires=" + date.toGMTString() + "; path=/";
    }
  }
};

// checking DOM readiness (http://www.javascriptkit.com/dhtmltutors/domready.shtml)
var alreadyrunflag = 0 //flag to indicate whether target function has already been run
if (document.addEventListener) {
  document.addEventListener("DOMContentLoaded", function(){
    alreadyrunflag = 1;
    moroLaunch();
  }, false);
} else if (document.all && !window.opera) {
  document.write('<script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"><\/script>');
  var contentloadtag=document.getElementById("contentloadtag");
  contentloadtag.onreadystatechange = function(){
    if (this.readyState == "complete") {
      alreadyrunflag = 1
      moroLaunch();
    }
  }
}
window.onload=function(){
  setTimeout("if (!alreadyrunflag) moroLaunch()", 0);
}

function moroLaunch() {
  myMoro.run('modalPopup');
}
