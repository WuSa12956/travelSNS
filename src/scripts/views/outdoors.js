var tplOutdoors = require("../templates/outdoors.string");

SPA.defineView('outdoors', {
  html: tplOutdoors,
  
  plugins: ["delegated",{
  	name:"avalon",
  	options:function(vm){
  		vm.livelist = [];
  	}
  }],
  
  init: {
    vm: null,
    livelistArray: [],
    formatData: function (arr) {
      var tempArr = [];
      for (var i = 0; i < arr.length; i++) {
        tempArr[i] = [];
        tempArr[i].push(arr[i]);
      }
      return tempArr;
    }
  },

  bindActions: {
  	"backhome":function(e,data){
  		this.hide();
  	},
  	"detail":function(e,data){
  		SPA.open('detail');
  	}
  },
  
  bindEvents: {
  	'beforeShow' : function(){
  		var that = this;
			// 获得vm对象
      that.vm = that.getVM();

      $.ajax({
        url: '/api/getLivelist.php',
        type: 'get',
        data:{
          rtype: 'origin'
        },
        success: function (rs) {
          that.livelistArray = rs.data;
          //console.log(that.formatData(rs.data));
          that.vm.livelist = that.formatData(rs.data);
        }
      });
  	},
  	
  	'show': function(){
  		var that = this;
  		//console.log(this);
      // 下拉刷新，上拉加载更多
      var scrollSize = 30;
      var myScroll = this.widgets.outdoorsScroll;
      myScroll.scrollBy(0, -scrollSize);

      var head = $('.head img'),
          topImgHasClass = head.hasClass('up');
      var foot = $('.foot img'),
          bottomImgHasClass = head.hasClass('down');
      myScroll.on('scroll', function () {
          var y = this.y,
              maxY = this.maxScrollY - y;
          if (y >= 0) {
              !topImgHasClass && head.addClass('up');
              return '';
          }
          if (maxY >= 0) {
              !bottomImgHasClass && foot.addClass('down');
              return '';
          }
      });

      myScroll.on('scrollEnd', function () {
          if (this.y >= -scrollSize && this.y < 0) {
              myScroll.scrollTo(0, -scrollSize);
              head.removeClass('up');
          } else if (this.y >= 0) {
              head.attr('src', '/travelSNS/images/ajax-loader.gif');
              // ajax下拉刷新数据

              $.ajax({
                url: '/api/getLivelist.php',
                data: {
                  rtype: 'refresh'
                },
                success: function (rs) {
                  var newArray = rs.data.concat(that.livelistArray);
                  that.vm.livelist = that.formatData(newArray);
                  that.livelistArray = newArray;

                  myScroll.scrollTo(0, -scrollSize);
                  head.removeClass('up');
                  head.attr('src', '/travelSNS/images/arrow.png');
                }
              });
          }

          var maxY = this.maxScrollY - this.y;
          var self = this;
          if (maxY > -scrollSize && maxY < 0) {
              myScroll.scrollTo(0, self.maxScrollY + scrollSize);
              foot.removeClass('down')
          } else if (maxY >= 0) {
              foot.attr('src', '/travelSNS/images/ajax-loader.gif');
              // ajax上拉加载数据

              $.ajax({
                url: '/api/getLivelist.php',
                data: {
                  rtype: 'more'
                },
                success: function (rs) {
                  var newArray = that.livelistArray.concat(rs.data);
                  that.vm.livelist = that.formatData(newArray);
                  //console.log(rs);
                  that.livelistArray = newArray;
                }
              });
          }
      })
  	}
  }

});