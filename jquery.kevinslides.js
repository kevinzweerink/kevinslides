//Dinky slideshow plugin by Kevin Zweerink

$.fn.kevinSlides = function(config) {
	var settings = $.extend({
		prev : "#prev",
		next : "#next",
		width: 700,
		height: 350,
	}, config);

	return this.each(function(index) {

		var _this = $(this);

		var positionEls = function(pos) {
			_this.children(".slide").each(function() {

				var __this = $(this);

				var currentIndex = parseInt(__this.data("index"));

				if (currentIndex === pos) {

					__this.css({
						top : 0,
						left : 0,
					})

					__this.addClass("current");

				} else if (currentIndex < pos) {
					__this.css({
						top : 0,
						left : settings.width*-1,
					});

					__this.removeClass("current");
				} else if (currentIndex > pos) {
					__this.css({
						top: 0,
						left: settings.width,
					});

					__this.removeClass("current");
				}
			});

			var newHeight = _this.children(".current").children("img").outerHeight();
			_this.css({
				height:(newHeight === 0) ? settings.height : newHeight;
			})
		}

		//Position stuff
		var applyStyles = function() {

			_this.css({
				position : "relative",
				overflow : "hidden",
				width: settings.width,
				height: settings.height
			});

			_this.children(".slide").css({
				position : "absolute",
				top : "0",
				left : "0",
				width: settings.width,
			});

			positionEls(0);
		}

		//Set up indices for slides
		var initialize = function() {
			_this.children(".slide").each(function(index) {
				$(this).attr("data-index",index);
			});
			applyStyles();
		}

		var advance = function() {
			var curpos = _this.children(".slide.current").data("index");
			var maxpos = _this.children(".slide").length - 1;
			
			if((curpos+1) <= maxpos) {
				positionEls(curpos+1);
			} else {
				positionEls(0);
			}
		}

		var retreat = function() {
			var curpos = _this.children(".slide.current").data("index");
			var maxpos = _this.children(".slide").length - 1;
			
			if((curpos-1) >= 0) {
				positionEls(curpos-1);
			} else {
				positionEls(maxpos);
			}
		}

		var listen = function() {
			$(settings.prev).on("click", function(e) {
				e.preventDefault();
				retreat();
			});

			$(settings.next).on("click", function(e) {
				e.preventDefault();
				advance();
			});

			_this.on("click", function(e) {
				e.preventDefault();
				advance();
			});

			$(window).on("keyup", function(e) {
				if(e.keyCode === 37) {
					e.preventDefault();
					retreat();
				} else if (e.keyCode === 39) {
					e.preventDefault();
					advance();
				}
			});
		}

		initialize();
		listen();
	});
}