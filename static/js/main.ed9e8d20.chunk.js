(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,a){e.exports=a(21)},17:function(e,t,a){},18:function(e,t,a){},21:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(4),r=a.n(l),c=(a(17),a(5)),i=a(6),s=a(9),m=a(7),u=a(1),d=a(10),p=a(2),h=a.n(p),f=a(8),E=(a(18),a(19),a(20),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).state={},a.mapClicked=a.mapClicked.bind(Object(u.a)(a)),a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"mapClicked",value:function(e){var t=this,a=e.latlng;this.map.panTo(a),fetch("https://data.linz.govt.nz/services/query/v1/vector.json?key=2269dc5590604b2c8cedec1fe70a04cb&layer=50295&x=".concat(a.lng,"&y=").concat(a.lat,"&max_results=1&radius=10000")).then(function(e){return e.json()}).then(function(e){return t.setState({topo50:e.vectorQuery.layers[50295].features[0]&&e.vectorQuery.layers[50295].features[0].properties})}),fetch("https://data.linz.govt.nz/services/query/v1/vector.json?key=2269dc5590604b2c8cedec1fe70a04cb&layer=50169&x=".concat(a.lng,"&y=").concat(a.lat,"&max_results=1&radius=10000")).then(function(e){return e.json()}).then(function(e){return t.setState({topo250:e.vectorQuery.layers[50169].features[0]&&e.vectorQuery.layers[50169].features[0].properties})})}},{key:"buildUrl",value:function(e,t,a){var n=/^Edition ([\d.]+) .+/.exec(a.edition),o="Topo250"===e?"250-":"",l="GeoTIFF"===t?"GeoTif":"TIFF";"Topo250"===e&&"GeoTIFF"===t&&(l+="f");var r="v".concat(n[1]).replace(".","-"),c="".concat(o).concat(a.sheet_code,"_").concat(l).concat(r,".tif");return"http://topo.linz.govt.nz/".concat(e,"_raster_images/").concat(t).concat(e,"/").concat(c)}},{key:"componentDidMount",value:function(){var e=document.querySelector("#about");f.a.registerDialog(e),e.showModal();var t=Object(p.tileLayer)("http://tiles-a.data-cdn.linz.govt.nz/services;key=2269dc5590604b2c8cedec1fe70a04cb/tiles/v4/layer=50767/EPSG:3857/{z}/{x}/{y}.png",{attribution:"CC BY 4.0 Land Information New Zealand",maxZoom:16,minZoom:6});this.map=new h.a.Map(this.mapRef,{center:[-42,172],zoom:6,zoomControl:!1,maxBounds:[[-46.641235447,160],[-34.4506617165,178.517093541]],layers:[t]}),this.map.addControl(p.control.zoom({position:"bottomright"})),this.map.on("click",this.mapClicked)}},{key:"render",value:function(){var e=this,t=this.state,a=t.topo50,n=t.topo250,l=null,r=null,c=null,i=o.a.createElement(o.a.Fragment,null,o.a.createElement("p",null,"This is a simple tool to find the appropriate Topo50 and Topo250 map for the area of New Zealand you are interested in."),o.a.createElement("p",null,"Click anywhere in the country to see links to the maps that cover that area."),o.a.createElement("p",null,"Created by ",o.a.createElement("a",{href:"https://joshmcarthur.com"},"Josh McArthur"),", in Wellington, New Zealand. This application uses open data available from the LINZ data service: ",o.a.createElement("a",{href:"https://data.linz.govt.nz"},"https://data.linz.govt.nz"),"."));return a&&(l=o.a.createElement(o.a.Fragment,null,o.a.createElement("h1",null,"Topo50 ",a.sheet_code,o.a.createElement("small",null,a.sheet_name)),o.a.createElement("dl",{className:"formatList"},o.a.createElement("dt",null,"GeoTIFF"),o.a.createElement("dd",null,o.a.createElement("a",{href:this.buildUrl("Topo50","GeoTIFF",a)},"Download in GeoTIFF format")),o.a.createElement("dt",null,"TIFF"),o.a.createElement("dd",null,o.a.createElement("a",{href:this.buildUrl("Topo50","TIFF",a)},"Download in TIFF format")),o.a.createElement("dt",null,"Map Legend"),o.a.createElement("dd",null,o.a.createElement("a",{href:"https://www.linz.govt.nz/topography/topo-maps/topo50/digital-images/topo50-important-info/topo50-legend.tif"},"Download TIFF"),o.a.createElement("br",null),"Map legend common to all Topo50 maps.")))),n&&(r=o.a.createElement(o.a.Fragment,null,o.a.createElement("h1",null,"Topo250 ",n.sheet_code,o.a.createElement("small",null,n.sheet_name)),o.a.createElement("dl",{className:"formatList"},o.a.createElement("dt",null,"GeoTIFF"),o.a.createElement("dd",null,o.a.createElement("a",{href:this.buildUrl("Topo250","GeoTIFF",n)},"Download in GeoTIFF format")),o.a.createElement("dt",null,"TIFF"),o.a.createElement("dd",null,o.a.createElement("a",{href:this.buildUrl("Topo250","TIFF",n)},"Download in TIFF format")),o.a.createElement("dt",null,"Map Legend"),o.a.createElement("dd",null,o.a.createElement("a",{href:"https://www.linz.govt.nz/topography/topo-maps/topo250/digital-images/topo250-important-info/topo250-legend.tif"},"Download TIFF"),o.a.createElement("br",null),"Map legend common to all Topo50 maps.")))),(l||r)&&(c=o.a.createElement("div",{className:"mapData"},o.a.createElement("span",{onClick:function(){return e.setState({topo50:null,topo250:null})},className:"close"},"\xd7"),l,r,o.a.createElement("footer",null,i))),o.a.createElement(o.a.Fragment,null,c,o.a.createElement("dialog",{id:"about"},o.a.createElement("span",{onClick:function(){return document.querySelector("#about").close()},className:"close"},"\xd7"),i),o.a.createElement("div",{id:"map",ref:function(t){return e.mapRef=t}}))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[11,1,2]]]);
//# sourceMappingURL=main.ed9e8d20.chunk.js.map