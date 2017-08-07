//english literal translation is good ^^
$.fn.gllSilder = function(option){
	//set control object
	var container = $(this);
	//set current function object
	var FS = $.fn.gllSilder;
	//set contain parent
	var containParent = container.parent();
	//start postion for customer to set
	//start page of the clone is not included
	//end page of the clone is not included
	//all pages of the clone is not included
	//all pages
	//every page width
	//page father width
	var sIndex, startPage, endPage, page, allPage, pgWidth, ctWidth, Interval, maxPage, minPage, clrTime, randomColor, beforeTime=0;
	var fs = $.extend({
		//running time
		runSpeed : 600,
		//scrolling time
		scrollSpeed : 6000,
		//set bgColor(when section don't have any full screen)
		color : ['#333', '#666', '#999', '#ccc']
	}, option);

	//external methods
	FS.setStartPosition = function(num){
		sIndex = num || 1;
		if(num)clearScroll();
	}

	if(container.length){
		page = container.find('section');
		randomColor = fs.color[parseInt(Math.random()*fs.color.length)];

		startPage = page.eq(0), endPage = page.eq(page.length-1);
		var createSPage = endPage.clone(),
			createEPage = startPage.clone();
		createEPage.appendTo(container), createSPage.prependTo(container);

		for (var i = 0; i < page.length; i++) {
				page.eq(i).addClass('page'+i);
		}

		init();
	}

	function init(){
		FS.setStartPosition();
		allPage = container.find('section');

		pgWidth = allPage.width()+17, ctWidth = pgWidth*allPage.length;

		allPage.css('width', pgWidth), container.css('width', ctWidth);
		allPage.css('background', randomColor);

		container.css('left', -pgWidth*sIndex);

		$(document).on('resize',function(){init()});

		var arrowLst = createScrollArrow();
		maxPage = allPage.length-1, minPage = 0;
		sizeEvent(arrowLst[0], arrowLst[1]);
		scrollAnimate();
	}
	function createScrollArrow(){
		var arrowWarp = $('<div></div>').addClass('arrow');
		var arrowLeft = $('<div></div>').addClass('arrowL').appendTo(arrowWarp);
		var arrowRight = $('<div></div>').addClass('arrowR').appendTo(arrowWarp);
		arrowWarp.css({'width': pgWidth, 'margin-top': container.innerHeight()/2});
		containParent.append(arrowWarp);
		return [arrowLeft, arrowRight]
	}
	function clearScroll(){
		clearInterval(Interval);
		scrollFunc();
		setTimeout(function(){scrollAnimate();}, fs.runSpeed);
	}
	function scrollAnimate(){
		Interval = setInterval(function(){sIndex+=1;scrollFunc();}, fs.scrollSpeed + fs.runSpeed);
	}
	function scrollFunc(){
		if(sIndex>maxPage-1){
			sIndex = minPage;
			container.css('left', -pgWidth*sIndex);
			sIndex += 1;
		}else if(sIndex<minPage+1) {
			sIndex = maxPage;
			container.css('left', -pgWidth*sIndex);
			sIndex -= 1;
		}
		container.animate({'left': (-pgWidth*sIndex)}, fs.runSpeed);
	}
	function sizeEvent(arrowlf, arrowrt){
		arrowlf.on('click', function(){
			if(getTimes()){
				sIndex-=1;
				clearScroll();
			}
		});
		arrowrt.on('click', function(){
			if(getTimes()){
				sIndex+=1;
				clearScroll();
			}
		});
	}

	function getTimes(){
		var date = (new Date()).getTime();
		clrTime = date - beforeTime;
		if(clrTime > fs.runSpeed){
			beforeTime = date;
			return true;
		}
		return false;
	}
}
