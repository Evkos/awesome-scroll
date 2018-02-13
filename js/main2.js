//Самовызывающаяся функция, удобно что бы ограничить область видимости переменных
(function(){
	this.config = {
		scrollSelector: '.scroll-holder',
		blockSelector: '.block'
	};
	//Дефолтные значения
	this.windowOffsetY = 0;
	this.blocks = [];
	
	....

	//Переменные что не меняються 
	this.init = function(){

		//инициализация динамических переменных
		this.blocks = $(this.config.scrollSelector).find(this.config.blockSelector);

		this.windowOffsetY = $(window).scrollTop();

		//Установка наблюдателя за скролингом
		$(document).scroll(this.scrollHandler);
	}

	//Метод что будет выполнятся при скролинге
	this.scrollHandler = function(){

		//Перебор наблюдаемых блоков
		for(var i in this.blocks){
			var el = this.blocks[i];
			if (el.offset().top .... ){
				//Добавление класса
				...
			} else {
				//Удаление класса
				...
			}
		}
		
	}

	$(document).ready(function(){
		this.init();
	});
	
}());