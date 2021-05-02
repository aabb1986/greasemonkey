// ==UserScript== 
// @name          View on Flickriver
// @description	  Adds links connecting various Flickr photo pages to corresponding Flickriver.com views
// @author        Alex Sirota (http://iosart.com/)
// @namespace     https://www.flickriver.com/tools/gm/
// @include       http://*flickr.com/*
// ==/UserScript==

//
// Copyright Alex Sirota (c) 2007-2010 All Rights Reserved
// 


(function() {

var s = document.createElement("script");
s.setAttribute("type", "text/javascript");
s.setAttribute("src", 'https://cdn.flickriver.com/jsdyn/flickriver.js');
document.getElementsByTagName("head")[0].appendChild(s); 

})();
