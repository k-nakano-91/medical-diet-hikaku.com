jQuery(document).ready(function($){
	//auto target
	$("a[href^='http']").not('[href*="'+location.hostname+'"]').attr("target","_blank");

	//selectのおまじない
	$('select').each(function(){
		$(this).wrap('<div class="c-field-select"></div>');
	});

	$('.js-movetop').on('click',function(){
		movetop();
	});

	$( '.js-tab-toggle' ).on('click',function(){
		$( '.js-tab-toggle' ).removeClass( 'is-active' );
		$( '.js-tab-panel' ).removeClass( 'is-active' ).hide();

		//var parent = $( this ).closest( '.js-tab' );
		var elm = $( this ).attr( 'data-panel' );

		$( this ).addClass( 'is-active' );
		$( elm ).addClass( 'is-active' ).slideToggle();
	});

	$('.js-ac-toggle').on('click',function(){
		var elm = $( this ).closest( '.js-ac' ).find( '.js-ac-panel' );
		$( this ).toggleClass( 'is-active' );
		$( elm ).toggleClass( 'is-active' ).slideToggle();
	});

	$('#js-nav-toggle, .js-offcanvas a').on('click',function(){
		if (window.matchMedia("(min-width: 769px)").matches) {
			return false;
		}
		$('#js-nav-toggle').toggleClass('is-open');
		$('body').toggleClass('-drawer');
		$('.js-offcanvas').toggleClass('is-active');
	});
	
	$('.js-step:nth-child(n+2').hide();
	$('.js-step-toggle').on('click',function(){
		var hide_panel = $(this).closest('.js-step');
		var disp_panel = hide_panel.next('.js-step');
		hide_panel.hide();
		disp_panel.fadeIn();
		return false;
	});

	//ページ内リンクを回避
	$('a[href^="#"]').on("click", function (e) {
		e.preventDefault();
		let offset = 0;
		const speed = 400;
		const href= $(this).attr("href");
		const target = $(href == "#" || href == "" ? 'html' : href);

		const position = target.offset().top - offset;

		$('body,html').animate(
			{ scrollTop:position },
			speed,
			'swing'
		);
		return false;
	});

	//dot
	if (navigator.userAgent.indexOf("iPhone") > 0){
		$('.is-dot').each(function(){
			var content = $(this).text();
			var trimText = $.trim(content);
			var newText = "";
			trimText.split("").forEach(function(e) {
				if(e == ' '){
					newText += '<span> </span>';
				} else {
					newText += '<span>' + e + '</span>';
				}
			});
			$(this).html(newText);
			$(this).removeClass('is-dot');
		});
	
	}


});

$(window).on('load resize',function () {
	check_safari();
	if (window.matchMedia("(max-width: 768px)").matches) {
        $(".swap-img").each(function () {
            $(this).attr("src", $(this).attr("src").replace("_md", "_lg"));
        });
        $("html").removeClass("un-mobile");
        $("html").addClass("is-mobile");

    } else {
        $(".swap-img").each(function () {
            $(this).attr("src", $(this).attr("src").replace("_md", "_lg"));
        });
        $("html").removeClass("is-mobile");
        $("html").addClass("un-mobile");
		
    }

});


let scroll = 0;
$(window).on('scroll',function () {
	//スクロール方向
	if($(this).scrollTop() < scroll ){
		$('html').removeClass('-down');
		$('html').addClass('-up');
	}else{
		$('html').removeClass('-up');
		$('html').addClass('-down');
	}
	scroll = $(this).scrollTop();
	windowHeight = $(window).height();


});

function movetop(){
	const myPos = $("html").offset().top;
	$("html,body").animate(
		{
			scrollTop: myPos,
		},
		500,
		"swing"
	);
	return false;
}

//サファリ判定
function check_safari(){
	const ua = navigator.userAgent;
	if (ua.indexOf("iPhone") > 0 || ua.indexOf("iPad") > 0 || ua.indexOf('macintosh') > 0 && 'ontouchend' in document ) {
		$('html').addClass('is-safari');
	}

}

// スクロール禁止
function no_scroll() {
    // PCでのスクロール禁止
    document.addEventListener("mousewheel", scroll_control, { passive: false });
    // スマホでのタッチ操作でのスクロール禁止
    document.addEventListener("touchmove", scroll_control, { passive: false });
}
// スクロール禁止解除
function return_scroll() {
    // PCでのスクロール禁止解除
    document.removeEventListener("mousewheel", scroll_control, { passive: false });
    // スマホでのタッチ操作でのスクロール禁止解除
    document.removeEventListener('touchmove', scroll_control, { passive: false });
}

// スクロール関連メソッド
function scroll_control(event) {
    event.preventDefault();
}
