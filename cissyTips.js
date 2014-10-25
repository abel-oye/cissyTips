/*
 *
 *
 */
(function($) {
	var CissyTips = function(element, options) {
		this.$el = $(element);
		this.opts = options;
		this._init(options)
	}
	CissyTips.VERSION = "0.0.1";

	CissyTips.prototype = {
		_init: function() {
			var opts = this.opts;			
		
			this.$tipsBox = $("<div class='cy-tips-box'></div>");

			this.$tipsBox.css({
				"position":"fixed",
				"display":"none",
				"top":this.$el.offset().top + this.$el.height(),
				"left":this.$el.offset().left
			})

			this.$tipsBox.appendTo("body");

			this.render()

			this.bindEvent()
		},
		render: function(options) {
			var tipsContent,
			opts = (options || this.opts) || {} ;

			opts.cls && $tipsBox.addClass(opts.cls)

			opts.style && $tipsBox.css(opts.style)

			if (opts.html) {
				tipsContent = opts.html;
			} else { //如果用户没有设置需要提示的内容则按属性提示
				opts.tipsAttr = opts.tipsAttr || "title";
				tipsContent = this.$el.attr(opts.tipsAttr);
			}

			this.$tipsBox.html(tipsContent)
		},
		bindEvent:function(){

			var that = this;
			$(document).on("mouseover",function(e){
				if(e.target == that.$el[0] || e.target == that.$tipsBox[0]){
					that.$tipsBox.show()
				}
			}).on("mouseout",function(e){
				if(e.target == that.$el[0] || e.target == that.$tipsBox[0]){
					that.$tipsBox.hide()
				}
			})
		}
	}

	$.fn.cissyTips = function() {
		if (arguments.length === 0 || typeof arguments[0] === "object") {
			var option = arguments[0],
				options = $.extend({}, $.fn.cissyTips.defaults, option),
				data = this.data("cy-toosTips");
				if(data){
					data.render(options);
					return this;
				}

				data = new CissyTips(this[0], options)
				this.data("cy-toosTips",data)
			return data;
		}
	}
	$.fn.cissyTips.defaults = {
		//html: "",
		//cls: "",
		//style: "",
		//tipsAttr: "" //提示内容来自属性，默认是title
	}
	$.fn.cissyTips.Constructor = CissyTips;

})(jQuery)