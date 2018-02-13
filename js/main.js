$(document).ready(function(){
	initAwesomeScroll();
	
});

$(document).scroll(function(){
	initAwesomeScroll();
	
});

function initAwesomeScroll(){
	var doc = $(document),
		scrollTop = doc.scrollTop(),
		container = $('.scroll-holder');

	container.each(function(){
		var el = $(this).find('.block'),
			elHeight = 0,
			containerOffsetTop = $(this).offset().top,
			containerOffsetBottom = 0,
			containerHeight = 0,
			fixedEl = '',
			fixedElWidth = 0,
			fixedElLeft = 0,
			fixedElHeight = 0,
			count = 0,
			fixedElPosition = 0;

		//определение высоты родительского блока
		el.each(function(){
			elHeight = $(this).outerHeight();
			if(elHeight > containerHeight){
				containerHeight = elHeight;
			}
		})

		$(this).height(containerHeight);

		//выбор элемента с меньшей высотой, который будет зафиксирован
		el.each(function(){
			count++;
			elHeight = $(this).outerHeight();
			if(elHeight < containerHeight){
								
				fixedEl = $(this);
				fixedElWidth = $(this).outerWidth();
				fixedElLeft = $(this).offset().left;
				fixedElHeight = $(this).outerHeight();

				//определяем в каком столбце находится фиксированный элемент в левом (тогда fixedElPosition = 1) или в правом (тогда fixedElPosition = 2)
				fixedElPosition = count;

			}
		})

		containerOffsetBottom = (containerOffsetTop + containerHeight) - fixedElHeight;

		//описание состояния, когда блок с меньшей высотой прикрепляется к верхнему краю родительского блока и не скроллится
		if((scrollTop >= containerOffsetTop) && (scrollTop <= containerOffsetBottom)){
			if(fixedElPosition == 1){
				$(this).css({
					paddingLeft:fixedElWidth
				})
				el.addClass('full-width');
			}
			fixedEl.css({
				left:fixedElLeft,
				width:fixedElWidth
			}).removeClass('absolute-section').addClass('fixed-section');
		}
		//описание состояния, когда блок с меньшей высотой прикрепляется к нижнему краю родительского блока и скроллится вместе с ним
		else if((scrollTop >= containerOffsetBottom)){
			fixedEl.css({
				width:fixedElWidth
			}).removeClass('fixed-section').addClass('absolute-section');

			if(fixedElPosition == 1){
				fixedEl.css({
					right:'auto',
					left:0
				})
			}
			else{
				fixedEl.css({
					right:0,
					left:'auto'
				})
			}
		}
		//описание состояния возвращения в исходное положение
		else{
			if(fixedElPosition == 1){
				el.removeClass('full-width');
				$(this).css({paddingLeft:0});
			}
			fixedEl.removeClass('fixed-section').removeClass('absolute-section');
		}
	})
}