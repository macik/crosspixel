var Crosspixel={};Crosspixel.Utils={};Crosspixel.Utils={documentBodyElement:null,getDocumentBodyElement:function(){if(this.documentBodyElement==null){this.documentBodyElement=document.getElementsByTagName("body")[0];}return this.documentBodyElement;},createParams:function(c,d){var a={};for(var b in c){a[b]=c[b];}for(var b in d){a[b]=d[b];}return a;},defaultStyleValueParams:{display:"block",width:"100%",height:"100%",opacity:1,background:"transparent","float":"none",visibility:"visible",border:"0"},createStyleValue:function(f,d){var b=d||Crosspixel.Utils.defaultStyleValueParams;var e=Crosspixel.Utils.createParams(b,f);var a="";for(var c in e){if(e[c]||e[c]===0){a+=c+":"+e[c]+";";}if(e[c]=="opacity"){a+="-khtml-opacity:"+e[c]+";-moz-opacity:"+e[c]+";filter:progid:DXImageTransform.Microsoft.Alpha(opacity="+(e[c]*100)+");";}}return a;}};Crosspixel.Utils.EventProvider=function(a,c,b){this.eventName=a;this.prepareParams=c;this.target=b||"document";this.handlers=null;return this;};Crosspixel.Utils.EventProvider.prototype.genericHandler=function(c){var d=(this.prepareParams?this.prepareParams(c):c);for(var a=0,b=this.handlers.length;a<b;a++){this.handlers[a](d);}};Crosspixel.Utils.EventProvider.prototype.initHandlers=function(){this.handlers=[];var code=this.target+".on"+this.eventName.toLowerCase()+"=function(event){self.genericHandler(event);};";var self=this;eval(code);};Crosspixel.Utils.EventProvider.prototype.addHandler=function(a){if(this.handlers==null){this.initHandlers();}this.handlers[this.handlers.length]=a;};Crosspixel.Utils.EventSender=function(){this.handlers={};return this;};Crosspixel.Utils.EventSender.prototype.addHandler=function(a,b){if(!this.handlers[a]){this.handlers[a]=[];}this.handlers[a][this.handlers[a].length]=b;};Crosspixel.Utils.EventSender.prototype.occurEvent=function(a,e){var d=this.handlers[a];if(this.handlers[a]){for(var b=0,c=this.handlers[a].length;b<c;b++){this.handlers[a][b](e);}}};Crosspixel.Utils.CookieStore={setValue:function(a,b){Crosspixel.Utils.CookieStore.setCookie(a,b);},getValue:function(a){return Crosspixel.Utils.CookieStore.getCookie(a);},setCookie:function(c,d){var b=new Date(),a=new Date();a.setTime(b.getTime()+31536000000);document.cookie=c+"="+escape(d)+"; expires="+a;},getCookie:function(b){var d=" "+document.cookie;var c=" "+b+"=";var e=null;var f=0;var a=0;if(d.length>0){f=d.indexOf(c);if(f!=-1){f+=c.length;a=d.indexOf(";",f);if(a==-1){a=d.length;}e=unescape(d.substring(f,a));}}return(e);}};Crosspixel.Utils.StateChanger=function(c,b,a){c.addHandler(function(d){if(b(d)){a();}});return this;};Crosspixel.OpacityChanger={};Crosspixel.OpacityChanger.defaults={shouldStepUpOpacity:function(b){var a=!b.occured_in_form&&(b.ctrlKey&&(b.character=="o"||b.character=="O"||b.character=="щ"||b.character=="Щ"));return a;},shouldStepDownOpacity:function(b){var a=!b.occured_in_form&&(b.ctrlKey&&(b.character=="u"||b.character=="U"||b.character=="г"||b.character=="Г"));return a;},opacity:0.25,opacityStep:0.05};Crosspixel.OpacityChanger={params:null,eventSender:null,init:function(a){this.params=Crosspixel.Utils.createParams(this.defaults,a);this.eventSender=new Crosspixel.Utils.EventSender();},setOpacity:function(a){this.params.opacity=a;this.params.opacity=(this.params.opacity<0?0:this.params.opacity);this.params.opacity=(this.params.opacity>1?1:this.params.opacity);this.updateOpacity(this.params.opacity);return this.params.opacity;},stepDownOpacity:function(){return this.setOpacity(this.params.opacity-this.params.opacityStep);},stepUpOpacity:function(){return this.setOpacity(this.params.opacity+this.params.opacityStep);},updateOpacity:function(a){this.eventSender.occurEvent("opacityChanged",this.params.opacity);},changeElementOpacity:function(a){if(a){a.style.opacity=this.params.opacity;}}};Crosspixel.Image={};Crosspixel.Image.defaults={shouldToggleVisibility:function(b){var a=!b.occured_in_form&&(b.ctrlKey&&(b.character=="i"||b.character=="I"||b.character=="ш"||b.character=="Ш"));return a;},"z-index":255,centered:false,marginTop:0,marginLeft:"0px",marginRight:"0px",src:"",width:100,height:100};Crosspixel.Image={showing:false,parentElement:null,params:null,imgElement:null,eventSender:null,init:function(a){this.params=Crosspixel.Utils.createParams(this.defaults,a);this.eventSender=new Crosspixel.Utils.EventSender();},createParentElement:function(c){var b=document.createElement("div");var a={position:"absolute",left:"0",top:"0",width:"100%",height:c.height+"px",opacity:1,"z-index":c["z-index"]};b.setAttribute("style",Crosspixel.Utils.createStyleValue(a));b.appendChild(this.createImageDOM(c));Crosspixel.Utils.getDocumentBodyElement().appendChild(b);return b;},createImageDOM:function(d){var a={width:"auto",height:"auto",opacity:Crosspixel.OpacityChanger.params.opacity};var c={"padding-top":d.marginTop+"px",width:"auto",height:"auto"};if(d.centered){c["text-align"]="center";a.margin="0 auto";}else{c["padding-left"]=d.marginLeft,c["padding-right"]=d.marginRight;}var b=document.createElement("div");b.setAttribute("style",Crosspixel.Utils.createStyleValue(c));this.imgElement=document.createElement("img");this.imgElement.setAttribute("src",d.src);this.imgElement.setAttribute("width",d.width);this.imgElement.setAttribute("height",d.height);this.imgElement.setAttribute("style",Crosspixel.Utils.createStyleValue(a));b.appendChild(this.imgElement);return b;},opacityHandler:function(){Crosspixel.OpacityChanger.changeElementOpacity(Crosspixel.Image.imgElement);},toggleVisibility:function(){this.showing=!this.showing;this.eventSender.occurEvent("visibilityChanged",this.showing);if(this.showing&&this.parentElement==null){this.parentElement=this.createParentElement(this.params);}if(this.parentElement){this.parentElement.style.display=(this.showing?"block":"none");}}};Crosspixel.Resizer={};Crosspixel.Resizer={params:null,sizes:null,currentSizeIndex:null,title:null,eventSender:null,detectDefaultSize:function(){var a=null;if(typeof(window.innerWidth)=="number"&&typeof(window.innerHeight)=="number"){a={width:window.innerWidth,height:window.innerHeight};}else{if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){a={width:document.documentElement.clientWidth,height:document.documentElement.clientHeight};}else{if(document.body&&(document.body.clientWidth||document.body.clientHeight)){a={width:document.body.clientWidth,height:document.body.clientHeight};}}}return a;},getDefaultSize:function(){return this.sizes[0];},getCurrentSize:function(){return this.sizes[this.currentSizeIndex];},init:function(c){this.params=Crosspixel.Utils.createParams(this.defaults,{});this.eventSender=new Crosspixel.Utils.EventSender();var b=this.detectDefaultSize();if(b){var a=[b];a[a.length]={width:c.width,height:c.height};this.title=document.title;this.sizes=a;this.currentSizeIndex=0;}},sizeTitle:function(d){var b,f=this.sizes[d],c=this.sizes[0];if(f.title){b=f.title;}else{var e=(f.width?f.width:c.width);var a=(f.height?f.height:c.height);b=e+"×"+a;}return b;},selectSize:function(a){this.currentSizeIndex=a;this.applySize();},toggleSize:function(){if(this.currentSizeIndex!=null){this.currentSizeIndex++;this.currentSizeIndex=(this.currentSizeIndex==this.sizes.length?0:this.currentSizeIndex);this.applySize();}},applySize:function(){var c=(this.getCurrentSize().width?this.getCurrentSize().width:this.getDefaultSize().width);var a=(this.getCurrentSize().height?this.getCurrentSize().height:this.getDefaultSize().height);window.resizeTo(c,a);var b=(this.currentSizeIndex?this.title+" ("+c+"×"+a+")":this.title);if(this.getCurrentSize().title){b=this.getCurrentSize().title;}document.title=b;this.eventSender.occurEvent("sizeChanged",this.currentSizeIndex);}};Crosspixel.GUI={params:null,togglerElement:null,paneElement:null,paneShowing:true,checkboxes:{},init:function(a){this.params=Crosspixel.Utils.createParams(this.defaults,a);},create:function(){this.createToggler();this.createPane();},createToggler:function(){var b=this;b.togglerElement=document.createElement("button");b.togglerElement.innerHTML=b.params.toggler.label;var a=Crosspixel.Utils.createStyleValue(b.params.toggler.style,{});b.togglerElement.setAttribute("style",a);Crosspixel.Utils.getDocumentBodyElement().appendChild(b.togglerElement);b.togglerElement.onclick=function(){b.paneShowing=!b.paneShowing;b.paneElement.style.display=(b.paneShowing?"block":"none");};},createPaneCheckboxItemHTML:function(e,b,d){var a=d||"";var c='<div style="width:auto;'+a+'">';c+='<input type="checkbox" id="'+e+'">';c+='<label for="'+e+'">&nbsp;'+b+"</label>";c+="</div>";return c;},createPane:function(){var b=this;b.paneElement=document.createElement("div");var c=b.params.pane.style;var a=Crosspixel.Utils.createStyleValue(c,{});b.paneElement.setAttribute("style",a);var e={},d="";e.image=b.generateId()+"image";d+=b.createPaneCheckboxItemHTML(e.image,b.params.pane.labels.image,"margin:0 0 1em");d+='<div style="width:auto;margin:1em 0 0">';e.opacity_down=b.generateId()+"opacitydown";e.opacity_up=b.generateId()+"opacityup";e.opacity_value=b.generateId()+"opacityvalue";if(b.params.pane.labels.opacity){d+=b.params.pane.labels.opacity.label+"<br>";}d+=b.params.pane.labels.opacity.less;d+='<button id="'+e.opacity_down+'">-</button>&nbsp;';d+='<span id="'+e.opacity_value+'">'+Crosspixel.OpacityChanger.params.opacity.toFixed(2)+"</span>";d+='&nbsp;<button id="'+e.opacity_up+'">+</button>';d+=b.params.pane.labels.opacity.more;d+="</div>";b.paneElement.innerHTML=d;Crosspixel.Utils.getDocumentBodyElement().appendChild(this.paneElement);b.checkboxes.image=document.getElementById(e.image);if(b.checkboxes.image){b.checkboxes.image.onclick=function(){Crosspixel.Image.toggleVisibility();};Crosspixel.Image.eventSender.addHandler("visibilityChanged",function(f){b.checkboxes.image.checked=f;});}b.checkboxes.opacity_value=document.getElementById(e.opacity_value);if(b.checkboxes.opacity_value){Crosspixel.OpacityChanger.eventSender.addHandler("opacityChanged",function(f){b.checkboxes.opacity_value.innerHTML=f.toFixed(2);});}b.checkboxes.opacity_up=document.getElementById(e.opacity_up);if(b.checkboxes.opacity_up){b.checkboxes.opacity_up.onclick=function(){Crosspixel.OpacityChanger.stepUpOpacity();};}b.checkboxes.opacity_down=document.getElementById(e.opacity_down);if(b.checkboxes.opacity_down){b.checkboxes.opacity_down.onclick=function(){Crosspixel.OpacityChanger.stepDownOpacity();};}},generateId:function(){var b="_mdg",a=new Date();a=b+a.getTime();return a;}};Crosspixel.GUI.defaults={toggler:{style:{position:"absolute",right:"10px",top:"10px","z-index":1000},label:"Настройки"},pane:{style:{position:"absolute",right:"10px",top:"35px",width:"auto",height:"auto",margin:"0",padding:"7px 5px",background:"#FFF",border:"2px solid #CCC","z-index":1000},labels:{image:'изображение-макет <span style="color:#555;font-size:80%;margin-left:0.75em">Ctrl i</span>',opacity:{label:'<span style="margin-left:3.7em">прозрачность</span>',less:'<span style="color:#555;font-size:80%;margin:0 0.75em 0 1em">Ctrl u</span> ',more:' <span style="color:#555;font-size:80%;margin-left:0.75em">Ctrl o</span>'}}}};Crosspixel.keyDownEventProvider=null;Crosspixel.resizeEventProvider=null;Crosspixel.getResizeEventProvider=function(){if(this.resizeEventProvider==null){this.resizeEventProvider=new Crosspixel.Utils.EventProvider("resize",function(a){return{event:a};},"window");}return this.resizeEventProvider;};Crosspixel.getKeyDownEventProvider=function(){if(this.keyDownEventProvider==null){this.keyDownEventProvider=new Crosspixel.Utils.EventProvider("keydown",function(c){var b=(c||window.event);var e=(b.keyCode?b.keyCode:(b.which?b.which:b.keyChar));var d=String.fromCharCode(e).toLowerCase();var f={"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","\\":"|"};if(b.shiftKey&&f[d]){d=f[d];}var a=(b.target?b.target:b.srcElement);if(a&&a.nodeType==3){a=a.parentNode;}var g=(a&&(a.tagName=="INPUT"||a.tagName=="TEXTAREA"));return{occured_in_form:g,character:d,keyCode:e,altKey:b.altKey,shiftKey:b.shiftKey,ctrlKey:b.ctrlKey,event:b};});}return this.keyDownEventProvider;};Crosspixel.init=function(g){var b=this;var a=Crosspixel.Utils.CookieStore;this.OpacityChanger.init(g.opacity);var e=new Crosspixel.Utils.StateChanger(this.getKeyDownEventProvider(),this.OpacityChanger.params.shouldStepUpOpacity,function(){b.OpacityChanger.stepUpOpacity();});var d=new Crosspixel.Utils.StateChanger(this.getKeyDownEventProvider(),this.OpacityChanger.params.shouldStepDownOpacity,function(){b.OpacityChanger.stepDownOpacity();});this.OpacityChanger.eventSender.addHandler("opacityChanged",function(h){a.setValue("o",h);});this.Image.init(g.image);this.OpacityChanger.eventSender.addHandler("opacityChanged",this.Image.opacityHandler);var c=new Crosspixel.Utils.StateChanger(this.getKeyDownEventProvider(),this.Image.params.shouldToggleVisibility,function(){b.Image.toggleVisibility();});this.Image.eventSender.addHandler("visibilityChanged",function(i){b.Resizer.toggleSize();var h=(i?"true":"false");a.setValue("i",h);});b.Resizer.init(this.Image.params);b.GUI.init(g.gui);b.GUI.create();if(a.getValue("i")=="true"){b.Image.toggleVisibility();}var f=parseFloat(a.getValue("o"));if(!isNaN(f)){b.OpacityChanger.setOpacity(f);}};/** @include "index.js" */

/**
 * Настройки
 */
Crosspixel.init(
	{

		image: {
			/**
			 * Функция вызывается каждый раз при нажатии клавиш в браузере.
			 * @param {Object} params информация о нажатой комбинации клавиш (params.ctrlKey, params.altKey, params.keyCode)
			 * @return {Boolean} true, если нужно показать/скрыть изображение
			 */
			shouldToggleVisibility:
				function (params) {
					// Ctrl i
					var result = !params.occured_in_form && (params.ctrlKey && (params.character == 'i' || params.character == 'I' || params.character == 'ш' || params.character == 'Ш'));
					return result;
				},
			/**
			 * Значения CSS-свойства z-index HTML-контейнера изображения
			 * @type Number
			 */
			'z-index': 255,

			/**
			 * Центрировать ли изображение относительно ширины рабочей области браузера
			 * @type Boolean
			 */
			centered: true,

			/**
			 * Отступ от верхнего края рабочей области браузера до изображения в пикселах
			 * @type Number
			 */
			marginTop: 100,
			/**
			 * Отступ от левого края рабочей области браузера до изображения.
			 * Возможные значения аналогичны значениям CSS-свойства margin-left
			 * @type Number
			 */
			marginLeft: '0px',
			/**
			 * Отступ от правого края рабочей области браузера до изображения.
			 * Возможные значения аналогичны значениям CSS-свойства margin-left
			 * @type Number
			 */
			marginRight: '0px',

			/**
			 * URL файла изображения
			 * @type String
			 */
			src: 'design.png',

			/**
			 * Ширина изображения в пикселах
			 * @type Number
			 */
			width: 300,
			/**
			 * Высота изображения в пикселах
			 * @type Number
			 */
			height: 356
		},

		opacity: {
			/**
			 * Функция вызывается каждый раз при нажатии клавиш в браузере.
			 * @param {Object} params информация о нажатой комбинации клавиш (params.ctrlKey, params.altKey, params.keyCode)
			 * @return {Boolean} true, если нужно сделать изображение менее прозрачным на opacityStep процентов
			 */
			shouldStepUpOpacity:
				function (params) {
					// Ctrl o
					var result = !params.occured_in_form && (params.ctrlKey && (params.character == 'o' || params.character == 'O' || params.character == 'щ' || params.character == 'Щ'));
					return result;
				},
			/**
			 * Функция вызывается каждый раз при нажатии клавиш в браузере.
			 * @param {Object} params информация о нажатой комбинации клавиш (params.ctrlKey, params.altKey, params.keyCode)
			 * @return {Boolean} true, если нужно сделать изображение более прозрачным на opacityStep процентов
			 */
			shouldStepDownOpacity:
				function (params) {
					// Ctrl u
					var result = !params.occured_in_form && (params.ctrlKey && (params.character == 'u' || params.character == 'U' || params.character == 'г' || params.character == 'Г'));
					return result;
				},


			opacity: 0.25,
			/**
			 * Шаг изменения значения прозрачности для изображения от 0 до 1
			 * @type Number
			 */
			opacityStep: 0.05
		},

		gui: {
			toggler: {
				style: {
					position: "absolute",
					right: '10px',
					top: '10px',
					'z-index': 1000
				},

				label: "Настройки"
			},

			pane: {
				style: {
					position: "absolute",
					right: '10px',
					top: '35px',

					width: 'auto',
					height: 'auto',

					margin: '0',
					padding: '7px 5px',

					background: '#FFF',
					border: '2px solid #CCC',

					'z-index': 1000
				},

				labels: {
					image: 'изображение-макет <span style="color:#555;font-size:80%;margin-left:0.75em">Ctrl i</span>',
					opacity: {
						label: '<span style="margin-left:3.7em">прозрачность</span>',
						less: '<span style="color:#555;font-size:80%;margin:0 0.75em 0 1em">Ctrl u</span> ',
						more: ' <span style="color:#555;font-size:80%;margin-left:0.75em">Ctrl o</span>'
					}
				}
			}
		}

	}
);