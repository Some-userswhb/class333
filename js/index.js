//取消浏览器默认样式 
document.addEventListener('touchstart',function(event){
	event.preventDefault();
})
//处理点透
!function(){
	var aNode = document.querySelectorAll('a')
	for(var i=0;i<aNode.length;i++){
		aNode[i].addEventListener('touchstart',function(event){
			window.location.href = this.href;
		})
	}
}();
//rem适配
!function(){
	var width = document.documentElement.clientWidth;
	var styleNode = document.createElement('style')
	styleNode.innerHTML = 'html{font-size: '+ width/16 + 'px !important;}';
	document.head.appendChild(styleNode);
}();

window.onload = function(){
	//获取头部元素
	//获取内容区元素 
	var contentbanlist = document.querySelector('#content .contentbanner .contentbanlist')
	var contentlis = document.querySelectorAll('#content .contentbanner .contentbanlist li')
	//设置ul的动态宽度
	contentbanlist.style.width = contentlis[0].offsetWidth * contentlis.length +'px';
	
	//页面拖拽
	documentmove()
	function documentmove(){
		document.addEventListener('touchstart',function(){
			
			
			document.addEventListener('touchmove',function(){
				
			})
			
			
		})
	}
	
	//导航拖拽逻辑 
	navMove();
	function navMove(){
	//获取ul父元素导航区
	var navWrap = document.querySelector('#header .headernav')
	//获取ul
	var navList = document.querySelector('#header .headernav .headerlist')
	//定义元素 与手指的初始位置 
	var eleX = 0;
	var startX = 0;
	
		//定义速度需要的变量
		var s1 = 0;//元素初始位置 
		var t1 = 0;//元素初始时间
		var s2 = 0;//元素结束位置
		var t2 = 0;//元素结束时间
		var disValue = 0;//元素的距离差 
		var disTime = 1;//元素的时间差 
		
	//为导航区绑定手指按下事件
	navWrap.addEventListener('touchstart',function(event){
		var touch = event.changedTouches[0];//手指列表
		//清除过渡
		navList.style.transition = 'none';
		//获取元素与手指的位置
		eleX = transformCss(navList,'translateX');
		startX = touch.clientX;
		
		//获取加速元素
		s1 = eleX;//初始位置 
		t1 = new Date().getTime(); //getTime 获取当前时间的毫秒值；
		//清除上一次 disValue 
		disValue = 0;
	});
	//为导航区绑定手指移动事件
	navWrap.addEventListener('touchmove',function(event){
		var touch = event.changedTouches[0];//手指列表
		//手指结束位置 
		var endX = touch.clientX;
		//手指距离差
		var disX = endX - startX;
		
		//范围限定   (橡皮筋拖拽 --- 越来越难拉)
		var translateX = disX+eleX;
		//判断左边拖拽值小于0 让他的值=0
		if(translateX > 0){
			//定义一个比例  左边区域的留白/整个屏幕的宽度
			var scale = 0.6 - translateX/(document.documentElement.clientWidth*3);
			//新的translateX = translateX 乘以 比例 
			translateX = 0 + translateX * scale;
			//临界值 = ul的宽度-屏幕的宽度
		//右边拖拽的值 小于 ul的宽度减去屏幕宽 的值时 等于临界值	
		}else if(translateX < document.documentElement.clientWidth - navList.offsetWidth){
			//比例 = 1 - 右边区域的留白/屏幕的宽度
			//右边区域的留白 = translateX - 临界值(正直)
			var over = Math.abs(translateX)-Math.abs(document.documentElement.clientWidth-navList.offsetWidth)
			var scale = 0.6-over/(document.documentElement.clientWidth*3);
			//新的右边区域的留白 = 旧的留白over * 比例scale
//						over = over * scale; 
			//新的 translateX = 临界值 + 新的over
			translateX = document.documentElement.clientWidth - navList.offsetWidth - over * scale;
		}
		//确定元素的最终位置 
		transformCss(navList,'translateX',translateX);
		//加速时 元素结束位置 与结束时间
		s2 = translateX;
		t2 = new Date().getTime();
		//元素距离差 
		disValue = s2 - s1;
		//元素时间差
		disTime = t2 - t1;
	});
	//绑定手指离开事件
	navWrap.addEventListener('touchend',function(){
		//回弹效果 
		
		//速度 = 距离差/时间差 
		var speed = disValue/disTime;
//		console.log(speed)
		//确定元素的最终位置 (加速产生的位置)
		//最终位置 =  位移值 + speed 
		var target = transformCss(navList,'translateX') + speed*100;
		
		//回弹效果 
		 var bezier = '';
		 if(target > 0){
			target = 0;
			bezier = 'cubic-bezier(.14,1.72,.87,1.46) ';
		 }else if(target < document.documentElement.clientWidth - navList.offsetWidth){
		 	target = document.documentElement.clientWidth - navList.offsetWidth;
			bezier = 'cubic-bezier(.14,1.72,.87,1.46) ';
		 };
		//拖拽过度效果 
		navList.style.transition = '0.5s '+bezier;
		 //元素位置确定 
		 transformCss(navList,'translateX',target)
	})
};
	//轮播图逻辑
	var index  = 0;
	var listNode = document.querySelector('#content .contentbanner .contentbanlist');
	//获取元素
	var carousel = document.querySelector('#content .contentbanner');
	//屏幕宽度 
	var docwid = document.documentElement.clientWidth;
	//获取小圆点
	var spanNodes= document.querySelectorAll('#content .contentbanner .smalldian > span')
	listmove();
	function listmove(){
	//添加一个相同的li
	listNode.innerHTML  += listNode.innerHTML;
	var liNodes = document.querySelectorAll('#content .contentbanner .contentbanlist li');
	var smallDot = document.querySelector('#content .contentbanner .smalldian')
	//动态设置元素的样式 
	var styleNode = document.createElement('style');
	//设置carousel的高度
	styleNode.innerHTML = '#warp #content .carousel{height:'+liNodes[0].offsetHeight+'px;}';
	//设置ul的长度   500%
	styleNode.innerHTML += '#warp #content .carousel .carousellist{width:'+liNodes.length+'00%;}';
	//设置li的宽度 
	styleNode.innerHTML += '#warp #content .carousel .carousellist li{width:'+ 100/liNodes.length +'%;}';   
	//设置小圆点居中 
	var juzhong = (docwid - smallDot.offsetWidth)/2;
	styleNode.innerHTML += '#warp #content .carousel .smallDot{left:'+juzhong+'px;}';
	document.head.appendChild(styleNode);
	//拖拽逻辑
	var eleX = 0;
	var startX = 0;
	//防抖动所需的变量
	var startY = 0;//定义手指初始位置
	//是否是第一次 touchmove
	var isFirst = true;
	//非第一次 touchmove	是否执行
	var isX = true;
	//绑定手指按下事件
	var timer = null;
	carousel.addEventListener('touchstart',function(event){
		//清除过度 
		listNode.style.transition = 'none';
		//手指按下时清除定时器
		clearInterval(timer);
		//无缝连接
		if(index == 0){
			//索引等于8
			index = 8;
		//索引 等于15	
		}else if(index == 8){
			//让索引等于回来7
			index = 0;
		}
		//确定最终位置
		listNode.style.left = -index*docwid+ 'px';
		var touch = event.changedTouches[0];
		//获取元素的初始位置
		eleX = listNode.offsetLeft;
		//手指的初始位置
		startX = touch.clientX;
		startY = touch.clientY;
		
		//重置 清除上一次的影响
		isFirst = true;
		isX = true;
	})
	//手指移动事件
	carousel.addEventListener('touchmove',function(event){
		//获取手指列表
		var touch = event.changedTouches[0];
		//禁止非第一次 touchmove的逻辑执行
		if(!isX){
			return;
		}
		//获取手指的结束位置 
		var endY = touch.clientY;
		var endX = touch.clientX;
		//获取手指距离差  = 手指结束位置-手指初始位置
		var disX = endX - startX;
		var disY = endY - startY;
		//防抖动
		//如果是第一次 touchmove 检测 disY > disX  则禁止水平方向的逻辑
		if(isFirst){
			//进入判断就不是第一次了
			isFirst = false;
				if(Math.abs(disY) > Math.abs(disX)){
					isX = false;
				//禁止水平方向逻辑 抖动
				return;
			};
		};
		//确定元素的最终位置
		listNode.style.left = disX + eleX + 'px';
	})
	//跳转逻辑 
	carousel.addEventListener('touchend',function(){
		//过渡效果
		listNode.style.transition = '2s'
		//定义一个变量保存 list的偏移量
		var left  = listNode.offsetLeft;
		//索引值 = 四舍五入 当屏幕left小于一半则返回来 超出一半则翻到下一张
		index = Math.round(-left/docwid);
		if(index < 0){
			index = 0
		}else if(index > listNode.length-1){
			index = listNode.length-1
		}
		listNode.style.left = -index*docwid + 'px';
		
		//小圆点跟跟随图片变色 
		for(var i=0;i<spanNodes.length;i++){
			//先把所有的span都变成空的
			spanNodes[i].className = ''
		}
			//点击到谁谁就变颜色 添加一个类
			spanNodes[index%spanNodes.length].className = 'spanRed'	
			//开启定时器
			auto();
	});
	//自动
	auto();
	function auto(){
		timer = setInterval(function(){
			//无缝
			if(index == 8){
				index = 0;
				//清除过渡
				listNode.style.transition = 'none';
				//真正的跳转动作
				listNode.style.left = -index*docwid+ 'px';
			}
			
			setTimeout(function(){
				index+=1;
				//过渡
				listNode.style.transition = '2s';
				//写入
				listNode.style.left = -index*docwid+ 'px';
				//小圆点  				
				//1.统一给所有span元素添加 class = ''
				for (var i=0;i<spanNodes.length;i++) {
					spanNodes[i].className = ''
				};	
				console.log(index)
				//2.切换到谁，谁对应的class = 'active'
				spanNodes[index%spanNodes.length].className = 'spanRed';
			},20)
		},2000)
	}
	}
//window	
}




