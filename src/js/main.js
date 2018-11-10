
//product cards view switcher (columns/rows)
$("#to-rows").click(function(){
	$("#products-list")
	.addClass("products__list_column");
});

$("#to-columns").click(function(){
	$("#products-list")
	.removeClass("products__list_column")
});

//hide nav-bar toggler when click outside
$(document).mouseup(function(e){

	if ($(".dropoff-menu").hasClass("show")){
	var container = $(".dropoff-menu");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
	    {
	        $(".navbar-toggler").trigger("click");
	    }
	}
});

/* SEARCH FORM */

var searchPopUp = $('.search__popup_invisible');
var inputBox = $('.search__input');
var isOpen = false;

//input toggler
searchPopUp.click(function(){
	if(isOpen == false){
		inputBox.addClass('search__input_opened');
		inputBox.focus();
		isOpen = true;
	} else {
		inputBox.removeClass('search__input_opened');
		inputBox.focusout();
		isOpen = false;
	}
});

searchPopUp.mouseup(function(){
		return false;
	});
inputBox.mouseup(function(){
		return false;
	});

$(document).mouseup(function(){
		if(isOpen == true){
			$('.search__popup_invisible').css('display','block');
			inputBox.removeClass('search__input_opened');
			inputBox.focusout();
			isOpen = false;
		}
	});

//when input has value, change toggler to a submit btn
$('.search__input').keyup(function(){
	var inputVal = $('.search__input').val();
	inputVal = $.trim(inputVal).length;
	if(inputVal !== 0){
		$('.search__popup_invisible').css('display','none');
	} else {
		$('.search__popup_invisible').css('display','block');
	};
});

//search input autocomplete
$('.search__input').autocomplete({
	source: function(request, response) {
		var subs = request.term.toLowerCase();
		var result = $.ajax({
			url: '../data/autocomplete_data.json',
			method: 'GET',
			dataType: 'json',
			success: function(data) {
				var array = [];
				$.each( data, function(item, value) {
					if (value.indexOf(subs) == 0){
						array.push(value);
					}					
					return array;
				});
				response(array);
			}
		});
	},
	select: function( event, ui ){
		$(this).val(ui.item.value);
		$('.search__form').submit();
	}
});

/* BLOG NEWS FEED */

$(function(){
	timer = setInterval(function(){
		$.ajax({
			url:'../data/blog_news.json',
			type:'GET',
			dataType:'json',
			success:function(data){
				var rand = Math.floor(Math.random() * data.length);
				var rand2 = Math.floor(Math.random() * data.length);
				var day = data[rand]["day"];
				var month = data[rand]["month"];
				var title = data[rand]["title"];
				var excerpt = data[rand]["excerpt"];

				$('.blog__post_first').fadeOut("slow", function(){
					$('.blog__post_first .post__date')
						.html(month + "<br>" + day);
					$('.blog__post_first .post__title')
						.html(title);
					$('.blog__post_first p')
						.html(excerpt);

					day = data[rand2]["day"];
					month = data[rand2]["month"];
					title = data[rand2]["title"];
					excerpt = data[rand2]["excerpt"];

				});
				$('.blog__post_first').fadeIn();				

				$('.blog__post_second').fadeOut("slow", function(){
					$('.blog__post_second .post__date')
						.html(month + "<br>" + day);
					$('.blog__post_second .post__title')
						.html(title);
					$('.blog__post_second p')
						.html(excerpt);
				});
				$('.blog__post_second').fadeIn();
			}
		});
	}, 5000);
});
