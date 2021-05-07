var currentSection = 0;

$('[data-name]').each(function(i){

	$('.navbar').append('<li data-number="'+(i+1)+'">'+$(this).data('name')+'</li>');

})

$(document).scroll(function(){
	
	var windowTop = $(window).scrollTop();
	var windowBot = windowTop + window.innerHeight;

	var fullMove = window.innerHeight*0.93 - $('.navbar').height();

	$('[data-number]').removeClass('middle');
	$('[data-name]').each(function(i){
		var thisTop = $(this).offset().top;
		var thisBot = thisTop + $(this).height();

		var totallyAbove = thisTop > windowBot;
		var totallyBelow = windowTop > thisBot; 

		var partMove = (thisTop - windowBot)/(window.innerHeight+$(this).height())*fullMove ;

		$nav = $('[data-number='+(i+1)+']');

		if (!totallyAbove && !totallyBelow){
			$nav.css('transform', 'translateY('+(partMove)+'px)');
      if (-partMove > fullMove*0.25 && -partMove < fullMove*0.75){
			  $nav.addClass('middle');
      }
		} else if (totallyAbove) {
			$nav.css('transform', 'translateY(0px)');
		} else if (totallyBelow) {
			$nav.css('transform', 'translateY('+(-fullMove)+'px)');
		}

	})
})

$('[data-number]').on('click touchstart', function(e){
  e.preventDefault();
  e.stopPropagation();
  
  var number = $(this).data('number');
  var offset = 0;
  
  $('[data-name]').each(function(i){
     if (i+1 == number){
       offset = $(this).offset().top;
     }
  })
  
  $('html, body').animate({
      scrollTop: offset
  }, 1000);
  
})

//NEWONES
let speed = 300;
let amount = 30;

let scroll = 0;
let smooth = 0;
let diff = 0;

$(document).on('scroll', event => {
  scroll = $(window).scrollTop();
});

let oldTime = null;
let delta = 0;

const animate = t => {
  if (oldTime)
  delta = t - oldTime;
  smooth += (scroll - smooth) * delta / speed;
  diff = scroll - smooth;

  let translateCenter = diff * -3 / amount;
  let translateRed = diff * -13 / amount;
  let translateGreen = diff * -10 / amount;
  let translateBlue = diff * -9 / amount;

  $('.normal').css('transform', 'translateY(' + translateCenter + 'px)');
  $('.half').css('transform', 'translateY(' + translateCenter + 'px)');
  $('.header').css('transform', 'translateY(' + translateCenter + 'px)');
  $('.r').css('transform', 'translateY(' + translateRed + 'px)');
  $('.g').css('transform', 'translateY(' + translateGreen + 'px)');
  $('.b').css('transform', 'translateY(' + translateBlue + 'px)');
  oldTime = t;
  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);



