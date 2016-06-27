var tplIndex = require("../templates/index.string");

SPA.defineView('index', {
  html: tplIndex,
  
  plugins: ["delegated"],

	modules: [{
    name: 'content',
    views: ['home', 'eat'],
    defaultTag: 'home', 
    container: '.content-index' 
  }],
  
  bindActions: {
  	"switch.tabs":function(e,data){
  		$(e.el).find("img").attr("src","/travelSNS/images/drawable-xhdpi-v4/at_food7.png");
  		this.modules.content.launch(data.tag);
  	},
  	"click.tabs":function(e){
  		$("footer ul li").eq(1).find("img").attr("src","/travelSNS/images/drawable-hdpi-v4/menu_back.png");
			$(".m-content").addClass("show").removeClass("hide");
  	},
  	"login":function(e,data){
  		SPA.open("login");
  	},
  	"click.tab":function(e){
  		$("footer ul li").eq(1).find("img").attr("src","/travelSNS/images/drawable-xhdpi-v4/menu9.png");
			$(".m-content").addClass("hide").removeClass("show");
  	}
  	
  },

  bindEvents: {
	  show: function () {
	  }
	}
});