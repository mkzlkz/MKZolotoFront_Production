$( document ).ready(function() {
	$('.closes').click(function() {
		$('.fade.in').removeClass('active');
	});
	$('.closes').click(function() {
		$('.video').removeClass('dnone');
	});
	$('.closes').click(function() {
		$('.nav-pills li').removeClass('active');
	});
	$('.vnone').click( function() {
		$('.video').addClass('dnone');
	});
	$('.vnone').click( function() {
		$('.menu').removeClass('active-menu');
	});
	$('.icon-menu').click(function() {
		$(this).toggleClass('active');
	});
	$( ".icon-menu" ).click(function(){
		$( ".menu" ).toggleClass("active-menu");
	});
	$( ".logo" ).click(function(){
		$('.fade.in').removeClass('active');
	});
	$('.logo').click(function() {
		$('.video').removeClass('dnone');
	});
	$('.logo').click(function() {
		$('.menu').removeClass('active-menu');
	});
	$('.vnone').click( function() {
		$('.icon-menu').removeClass('active');
	});
});

(function($){
	$(window).on("load",function(){
		$(".block3-2").mCustomScrollbar({
			autoHideScrollbar:true,
			theme:"rounded"
		});

	});
})(jQuery);