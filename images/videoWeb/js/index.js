$(function(){
	//banner
	(function(){
		var $tabLi = $('#nav .nav_banner .slide .tab>a');
		var $picLi = $('#nav .nav_banner .slide .slide_wrap>ul>li');
		var $btnDiv = $('#nav .nav_banner .slide .btn');
		var $b_main = $('#nav .nav_banner .slide');
		var index = 0;
		var timer;
		var length = $tabLi.length;
		$tabLi.hover(function(){
			$(this).addClass('active');
		},function(){
			$(this).removeClass('active');
		}).hover(function(){
			index = $(this).index();
			banner();
		});
		$btnDiv.hover(function(){
			$(this).addClass('active');
		},function(){
			$(this).removeClass('active');
		}).click(function(){
			var i = $(this).index();
			if ( i )
			{
				index ++;
				index %= length;
			}
			else
			{
				index --;
				if(index<0)index=length-1;
			}
			banner();
		});
		auto();
		$b_main.hover(function(){
			clearInterval( timer )
		},function(){
			auto();
		});

		function auto(){
			timer = setInterval(function(){
				index ++;
				index %= length;
				banner();
			},4000);
		}

		function banner(){
			$tabLi.eq(index).addClass('click').siblings().removeClass('click');
			$picLi.eq(index).stop(true).fadeIn().siblings().stop(true).fadeOut();
		}

	})();

	//search
	(function(){
		var searchInput = $('#nav .nav_search .nav_search_mid>input');
		var searchSpan = $('#nav .nav_search .nav_search_mid>span');
		searchInput.focus(function(){
			searchSpan.fadeOut(200);
		}).blur(function(){
			searchSpan.fadeIn(200);
		});
	})();
	
	//search_right
	(function(){
		var nav_search_rightLi = $('#nav .nav_search .nav_search_right>ul>li');
		nav_search_rightLi.hover(function(){
			$(this).find('.nav_search_right_content').stop().show();
		},function(){
			$(this).find('.nav_search_right_content').stop().hide();
		});
	})();
	
	//menu
	(function(){
		var menuLi = $('#nav .nav_search .menu>ul>li');
		menuLi.hover(function(){
			$(this).find('.menu_content').stop().show();
		},function(){
			$(this).find('.menu_content').stop().hide();
		});
	})();
	
	//left
	(function(){
		var left = $('.bottom_left');
		left.hover(function(){
			$(this).find('.bottom_left_content').stop().show();
		},function(){
			$(this).find('.bottom_left_content').stop().hide();
		});
	})();
	
	//right
	(function(){
		var right = $('.bottom_right>ul>li');
		right.hover(function(){
			$(this).find('.bottom_right_content').stop().show();
		},function(){
			$(this).find('.bottom_right_content').stop().hide();
		});
	})();
	
	//movie
	(function(){
		var movie = $('.movie_bottom>ul>li');
		movie.hover(function(){
			$(this).find('.movie_content').stop().show();
		},function(){
			$(this).find('.movie_content').stop().hide();
		});
	})();
	
	//VIP
	(function(){
		var VIP = $('.VIP_bottom>ul>li');
		VIP.hover(function(){
			$(this).find('.movie_content').stop().show();
		},function(){
			$(this).find('.movie_content').stop().hide();
		});
	})();
	
	//documentary
	(function(){
		var documentary = $('.documentary_bottom>ul>li');
		documentary.hover(function(){
			$(this).find('.movie_content').stop().show();
		},function(){
			$(this).find('.movie_content').stop().hide();
		});
	})();
	
	//advert
	(function(){
		var advert_list1 = $('.advert>ul>li:nth-child(1)');
		var advert_list2 = $('.advert>ul>li:nth-child(2)');
		var advert_list3 = $('.advert>ul>li:nth-child(3)');
		var advert_list4 = $('.advert>ul>li:nth-child(4)');
		var advert_list5 = $('.advert>ul>li:nth-child(5)');
		advert_list1.hover(function(){
			advert_list4.css('display','none');
		},function(){
			advert_list4.css('display','block');
		});
	})();
});
