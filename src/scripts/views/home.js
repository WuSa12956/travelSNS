var tplHome = require("../templates/home.string");

SPA.defineView('home', {
  html: tplHome,
  
  plugins: ["delegated"],

  bindActions: {
  	"outdoors":function(e,data){
  		SPA.open('outdoors');
  	}
  },

  bindEvents: {
	  show: function () {
	  }
	}
});