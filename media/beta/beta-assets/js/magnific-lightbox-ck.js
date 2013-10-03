// Magnific Popup v0.8.1 by Dmitry Semenov
// http://bit.ly/magnific-popup#build=inline+image+ajax+iframe+gallery+retina+fastclick
(function(e){var t="Close",n="BeforeAppend",r="MarkupParse",i="Open",s="Change",o="mfp",u="."+o,a="mfp-ready",f="mfp-removing",l="mfp-prevent-close",c,h=function(){},p,d=e(window),v,m,g,y,b=function(e,t){c.ev.on(o+e+u,t)},w=function(t,n,r,i){var s=document.createElement("div");return s.className="mfp-"+t,r&&(s.innerHTML=r),i?n&&n.appendChild(s):(s=e(s),n&&s.appendTo(n)),s},E=function(t,n){c.ev.triggerHandler(o+t,n),c.st.callbacks&&(t=t.charAt(0).toLowerCase()+t.slice(1),c.st.callbacks[t]&&c.st.callbacks[t].apply(c,e.isArray(n)?n:[n]))},S=function(){(c.st.focus?c.content.find(c.st.focus).eq(0):c.wrap).focus()},x,T=function(t){if(t!==x||!c.currTemplate.closeBtn)c.currTemplate.closeBtn=e(c.st.closeMarkup.replace("%title%",c.st.tClose)),x=t;return c.currTemplate.closeBtn};h.prototype={constructor:h,init:function(){var t=navigator.appVersion;c.isIE7=t.indexOf("MSIE 7.")!==-1,c.isAndroid=/android/gi.test(t),c.isIOS=/iphone|ipad|ipod/gi.test(t),c.probablyMobile=c.isAndroid||c.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),v=e(document.body),m=e(document),c.popupsCache={}},open:function(t){if(c.isOpen)return;var n;c.types=[],y="",c.ev=t.el||m;if(t.isObj)c.index=t.index||0;else{c.index=0;var s=t.items,o;for(n=0;n<s.length;n++){o=s[n],o.parsed&&(o=o.el[0]);if(o===t.el[0]){c.index=n;break}}}t.key?(c.popupsCache[t.key]||(c.popupsCache[t.key]={}),c.currTemplate=c.popupsCache[t.key]):c.currTemplate={},c.st=e.extend(!0,{},e.magnificPopup.defaults,t),c.fixedContentPos=c.st.fixedContentPos==="auto"?!c.probablyMobile:c.st.fixedContentPos,c.items=t.items.length?t.items:[t.items],c.bgOverlay||(c.bgOverlay=w("bg").on("click"+u,function(){c.close()}),c.wrap=w("wrap").attr("tabindex",-1).on("click"+u,function(t){var n=t.target;if(e(n).hasClass(l))return;c.st.closeOnContentClick?c.close():(!c.content||e(n).hasClass("mfp-close")||c.preloader&&t.target===c.preloader[0]||n!==c.content[0]&&!e.contains(c.content[0],n))&&c.close()}),c.container=w("container",c.wrap)),c.st.preloader&&(c.preloader=w("preloader",c.container,c.st.tLoading)),c.contentContainer=w("content",c.container);var f=e.magnificPopup.modules;for(n=0;n<f.length;n++){var h=f[n];h=h.charAt(0).toUpperCase()+h.slice(1),c["init"+h].call(c)}E("BeforeOpen"),c.st.closeBtnInside?(b(r,function(e,t,n,r){n.close_replaceWith=T(r.type)}),y+=" mfp-close-btn-in"):c.wrap.append(T()),c.st.alignTop&&(y+=" mfp-align-top"),c.fixedContentPos?c.wrap.css({overflow:c.st.overflowY,overflowX:"hidden",overflowY:c.st.overflowY}):c.wrap.css({top:d.scrollTop(),position:"absolute"}),(c.st.fixedBgPos===!1||c.st.fixedBgPos==="auto"&&!c.fixedContentPos)&&c.bgOverlay.css({height:m.height(),position:"absolute"}),m.on("keyup"+u,function(e){e.keyCode===27&&c.close()}),d.on("resize"+u,function(){c.updateSize()}),c.st.closeOnContentClick||(y+=" mfp-auto-cursor"),y&&c.wrap.addClass(y);var p=c.wH=d.height(),g={};if(c.fixedContentPos){var x=c._getScrollbarSize();x&&(g.paddingRight=x)}c.fixedContentPos&&(c.isIE7?e("body, html").css("overflow","hidden"):g.overflow="hidden");var N=c.st.mainClass;c.isIE7&&(N+=" mfp-ie7"),N&&c._addClassToMFP(N),c.updateItemHTML(),v.css(g),c.bgOverlay.add(c.wrap).prependTo(document.body),c._lastFocusedEl=document.activeElement,setTimeout(function(){c.content?(c._addClassToMFP(a),S()):c.bgOverlay.addClass(a),m.on("focusin"+u,function(t){if(t.target!==c.wrap[0]&&!e.contains(c.wrap[0],t.target))return S(),!1})},16),c.isOpen=!0,c.updateSize(p),E(i)},close:function(){if(!c.isOpen)return;c.isOpen=!1,c.st.removalDelay?(c._addClassToMFP(f),setTimeout(function(){c._close()},c.st.removalDelay)):c._close()},_close:function(){E(t);var n=f+" "+a+" ";c.bgOverlay.detach(),c.wrap.detach(),c.container.empty(),c.st.mainClass&&(n+=c.st.mainClass+" "),c._removeClassFromMFP(n);if(c.fixedContentPos){var r={paddingRight:0};c.isIE7?e("body, html").css("overflow","auto"):r.overflow="visible",v.css(r)}m.off("keyup"+u+" focusin"+u),c.ev.off(u),c.wrap.attr("class","mfp-wrap").removeAttr("style"),c.bgOverlay.attr("class","mfp-bg"),c.container.attr("class","mfp-container"),(!c.st.closeBtnInside||c.currTemplate[c.currItem.type]===!0)&&c.currTemplate.closeBtn&&c.currTemplate.closeBtn.detach(),c._lastFocusedEl&&e(c._lastFocusedEl).focus(),c.currTemplate=null,c.prevHeight=0},updateSize:function(e){if(c.isIOS){var t=document.documentElement.clientWidth/window.innerWidth,n=window.innerHeight*t;c.wrap.css("height",n),c.wH=n}else c.wH=e||d.height();E("Resize")},updateItemHTML:function(){var t=c.items[c.index];t.parsed||(t=c.parseEl(c.index)),c.currItem=t;var n=t.type;if(!c.currTemplate[n]){var r=c.st[n]?c.st[n].markup:!1;r?(E("FirstMarkupParse",r),c.currTemplate[n]=e(r)):c.currTemplate[n]=!0}g&&g!==t.type&&c.container.removeClass("mfp-"+g+"-holder");var i=c["get"+n.charAt(0).toUpperCase()+n.slice(1)](t,c.currTemplate[n]);c.appendContent(i,n),t.preloaded=!0,E(s,t),g=t.type},appendContent:function(e,t){c.content=e,e?c.st.closeBtnInside&&c.currTemplate[t]===!0?c.content.find(".mfp-close").length||c.content.append(T()):c.content=e:c.content="",E(n),c.container.addClass("mfp-"+t+"-holder"),c.contentContainer.html(c.content)},parseEl:function(t){var n=c.items[t],r=n.type;n.tagName?n={el:e(n)}:n={data:n,src:n.src};if(n.el){var i=c.types;for(var s=0;s<i.length;s++)if(n.el.hasClass("mfp-"+i[s])){r=i[s];break}n.src=n.el.attr("data-mfp-src"),n.src||(n.src=n.el.attr("href"))}return n.type=r||c.st.type,n.index=t,n.parsed=!0,c.items[t]=n,E("ElementParse",n),c.items[t]},addGroup:function(t,n){var r=function(t){var r=n.midClick!==undefined?n.midClick:e.magnificPopup.defaults.midClick;if(r||t.which!==2){var i=n.disableOn!==undefined?n.disableOn:e.magnificPopup.defaults.disableOn;if(i)if(e.isFunction(i)){if(!i.call(c))return!0}else if(e(window).width()<i)return!0;t.preventDefault(),n.el=e(this),c.open(n)}};n||(n={});var i="click.magnificPopup";n.items?(n.isObj=!0,t.off(i).on(i,r)):(n.isObj=!1,n.delegate?(n.items=t.find(n.delegate),t.off(i).on(i,n.delegate,r)):(n.items=t,t.off(i).on(i,r)))},updateStatus:function(e,t){if(c.preloader){p!==e&&c.container.removeClass("mfp-s-"+p),!t&&e==="loading"&&(t=c.st.tLoading);var n={status:e,text:t};E("UpdateStatus",n),e=n.status,t=n.text,c.preloader.html(t),c.preloader.find("a").click(function(e){e.stopImmediatePropagation()}),c.container.addClass("mfp-s-"+e),p=e}},_addClassToMFP:function(e){c.bgOverlay.addClass(e),c.wrap.addClass(e)},_removeClassFromMFP:function(e){this.bgOverlay.removeClass(e),c.wrap.removeClass(e)},_hasScrollBar:function(e){return document.body.clientHeight>(e||d.height())?!0:!1},_parseMarkup:function(t,n,i){var s;i.data&&(n=e.extend(i.data,n)),E(r,[t,n,i]),e.each(n,function(e,n){if(n===undefined||n===!1)return!0;s=e.split("_");if(s.length>1){var r=t.find(u+"-"+s[0]);if(r.length>0){var i=s[1];i==="replaceWith"?r[0]!==n[0]&&r.replaceWith(n):i==="img"?r.is("img")?r.attr("src",n):r.replaceWith('<img src="'+n+'" class="'+r.attr("class")+'" />'):r.attr(s[1],n)}}else t.find(u+"-"+e).html(n)})},_getScrollbarSize:function(){if(c.scrollbarSize===undefined){var e=document.createElement("div");e.id="mfp-sbm",e.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(e),c.scrollbarSize=e.offsetWidth-e.clientWidth,document.body.removeChild(e)}return c.scrollbarSize}},e.magnificPopup={instance:null,proto:h.prototype,modules:[],open:function(t,n){return e.magnificPopup.instance||(c=new h,c.init(),e.magnificPopup.instance=c),t||(t={}),t.isObj=!0,t.index=n===undefined?0:n,this.instance.open(t)},close:function(){return e.magnificPopup.instance.close()},registerModule:function(t,n){n.options&&(e.magnificPopup.defaults[t]=n.options),e.extend(this.proto,n.proto),this.modules.push(t)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeBtnInside:!0,alignTop:!1,removalDelay:0,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">×</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},e.fn.magnificPopup=function(t){return e.magnificPopup.instance||(c=new h,c.init(),e.magnificPopup.instance=c),c.addGroup(e(this),t),e(this)};var N="inline",C;e.magnificPopup.registerModule(N,{options:{hiddenClass:o+"-hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){c.types.push(N),C=!1,b(t+"."+N,function(){var e=c.currItem;if(e.type===N){if(C)for(var t=0;t<c.items.length;t++)e=c.items[t],e&&e.inlinePlaceholder&&e.inlinePlaceholder.after(e.inlineElement.addClass(c.st.inline.hiddenClass)).detach();e.inlinePlaceholder=e.inlineElement=null}})},getInline:function(t,n){c.updateStatus("ready");if(t.src){var r=c.st.inline;return typeof t.src!="string"&&(t.isElement=!0),!t.isElement&&!t.inlinePlaceholder&&(t.inlinePlaceholder=w(r.hiddenClass)),t.isElement?t.inlineElement=t.src:t.inlineElement||(t.inlineElement=e(t.src),t.inlineElement.length||(c.updateStatus("error",r.tNotFound),t.inlineElement=e("<div>"))),t.inlinePlaceholder&&(C=!0),t.inlineElement.after(t.inlinePlaceholder).detach().removeClass(r.hiddenClass),t.inlineElement}return c._parseMarkup(n,{},t),n}}});var k="ajax",L,A=function(){L&&v.removeClass(L)};e.magnificPopup.registerModule(k,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){c.types.push(k),L=c.st.ajax.cursor,b(t+"."+k,function(){A(),c.req&&c.req.abort()})},getAjax:function(t){L&&v.addClass(L),c.updateStatus("loading");var n=e.extend({url:t.src,success:function(n,r,i){E("ParseAjax",i),c.appendContent(e(i.responseText),k),t.finished=!0,A(),S(),setTimeout(function(){c.wrap.addClass(a)},16),c.updateStatus("ready")},error:function(){A(),t.finished=t.loadError=!0,c.updateStatus("error",c.st.ajax.tError.replace("%url%",t.src))}},c.st.ajax.settings);return c.req=e.ajax(n),""}}});var O,M=function(t){if(t.data&&t.data.title!==undefined)return t.data.title;var n=c.st.image.titleSrc;if(n){if(e.isFunction(n))return n.call(c,t);if(t.el)return t.el.attr(n)||""}return""};e.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><div class="mfp-img"></div><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var e=c.st.image,n=".image";c.types.push("image"),b(i+n,function(){c.currItem.type==="image"&&e.cursor&&v.addClass(e.cursor)}),b(t+n,function(){e.cursor&&v.removeClass(e.cursor),d.off("resize"+u)}),b("Resize"+n,function(){c.resizeImage()})},resizeImage:function(){var e=c.currItem;if(!e.img)return;c.st.image.verticalFit&&e.img.css("max-height",c.wH+"px")},_onImageHasSize:function(e){e.img&&(e.hasSize=!0,O&&clearInterval(O),e.isCheckingImgSize=!1,E("ImageHasSize",e),e.imgHidden&&(c.content.removeClass("mfp-loading"),e.imgHidden=!1))},findImageSize:function(e){var t=0,n=e.img[0],r=function(i){O&&clearInterval(O),O=setInterval(function(){if(n.naturalWidth>0){c._onImageHasSize(e);return}t>200&&clearInterval(O),t++,t===3?r(10):t===40?r(50):t===100&&r(500)},i)};r(1)},getImage:function(t,n){var r=0,i=function(){t&&(t.img[0].complete?(t.img.off(".mfploader"),t===c.currItem&&(c._onImageHasSize(t),c.updateStatus("ready")),t.hasSize=!0,t.loaded=!0):(r++,r<200?setTimeout(i,100):s()))},s=function(){t&&(t.img.off(".mfploader"),t===c.currItem&&(c._onImageHasSize(t),c.updateStatus("error",o.tError.replace("%url%",t.src))),t.hasSize=!0,t.loaded=!0,t.loadError=!0)},o=c.st.image,u=n.find(".mfp-img");if(u.length){var a=new Image;a.className="mfp-img",t.img=e(a).on("load.mfploader",i).on("error.mfploader",s),a.src=t.src,u.is("img")&&(t.img=t.img.clone())}return c._parseMarkup(n,{title:M(t),img_replaceWith:t.img},t),c.resizeImage(),t.hasSize?(O&&clearInterval(O),t.loadError?(n.addClass("mfp-loading"),c.updateStatus("error",o.tError.replace("%url%",t.src))):(n.removeClass("mfp-loading"),c.updateStatus("ready")),n):(c.updateStatus("loading"),t.loading=!0,t.hasSize||(t.imgHidden=!0,n.addClass("mfp-loading"),c.findImageSize(t)),n)}}});var _="iframe",D=function(e){if(c.isIE7&&c.currItem&&c.currItem.type===_){var t=c.content.find("iframe");t.length&&t.css("display",e?"block":"none")}};e.magnificPopup.registerModule(_,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){c.types.push(_),D(!0),b(t+"."+_,function(){D()})},getIframe:function(t,n){var r=t.src,i=c.st.iframe;e.each(i.patterns,function(){if(r.indexOf(this.index)>-1)return this.id&&(typeof this.id=="string"?r=r.substr(r.lastIndexOf(this.id)+this.id.length,r.length):r=this.id.call(this,r)),r=this.src.replace("%id%",r),!1});var s={};return i.srcAction&&(s[i.srcAction]=r),c._parseMarkup(n,s,t),c.updateStatus("ready"),n}}});var P=function(e){var t=c.items.length;return e>t-1?e-t:e<0?t+e:e},H=function(e,t,n){return e.replace("%curr%",t+1).replace("%total%",n)};e.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var n=c.st.gallery,o=".mfp-gallery",u=Boolean(e.fn.mfpFastClick);c.direction=!0;if(!n||!n.enabled)return!1;y+=" mfp-gallery",b(i+o,function(){n.navigateByImgClick&&c.wrap.on("click"+o,".mfp-img",function(){return c.next(),!1}),m.on("keydown"+o,function(e){e.keyCode===37?c.prev():e.keyCode===39&&c.next()})}),b("UpdateStatus"+o,function(e,t){t.text&&(t.text=H(t.text,c.currItem.index,c.items.length))}),b(r+o,function(e,t,r,i){var s=c.items.length;r.counter=s?H(n.tCounter,i.index,s):""}),b(s+o,function(){c._preloadTimeout&&clearTimeout(c._preloadTimeout),c._preloadTimeout=setTimeout(function(){c.preloadNearbyImages(),c._preloadTimeout=null},16);if(n.arrows&&!c.arrowLeft){var t=n.arrowMarkup,r=c.arrowLeft=e(t.replace("%title%",n.tPrev).replace("%dir%","left")).addClass(l),i=c.arrowRight=e(t.replace("%title%",n.tNext).replace("%dir%","right")).addClass(l),s=u?"mfpFastClick":"click";r[s](function(){c.prev()}),i[s](function(){c.next()}),c.isIE7&&(w("b",r[0],!1,!0),w("a",r[0],!1,!0),w("b",i[0],!1,!0),w("a",i[0],!1,!0)),c.container.append(r.add(i))}}),b(t+o,function(){m.off(o),c.wrap.off("click"+o),u&&c.arrowLeft.add(c.arrowRight).destroyMfpFastClick(),c.arrowRight=c.arrowLeft=null})},next:function(){c.direction=!0,c.index=P(c.index+1),c.updateItemHTML()},prev:function(){c.direction=!1,c.index=P(c.index-1),c.updateItemHTML()},preloadNearbyImages:function(){var e=c.st.gallery.preload,t=Math.min(e[0],c.items.length),n=Math.min(e[1],c.items.length),r;for(r=1;r<=(c.direction?n:t);r++)c._preloadItem(c.index+r);for(r=1;r<=(c.direction?t:n);r++)c._preloadItem(c.index-r)},_preloadItem:function(t){t=P(t);if(c.items[t].preloaded)return;var n=c.items[t];n.parsed||(n=c.parseEl(t)),E("LazyLoad",n),n.type==="image"&&(n.img=e('<img class="mfp-img" />').on("load.mfploader",function(){n.hasSize=!0}).on("error.mfploader",function(){n.hasSize=!0,n.loadError=!0}).attr("src",n.src)),n.preloaded=!0}}});var B="retina";e.magnificPopup.registerModule(B,{options:{replaceSrc:function(e){return e.src.replace(/\.\w+$/,function(e){return"@2x"+e})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var e=c.st.retina,t=e.ratio;t=isNaN(t)?t():t,t>1&&(b("ImageHasSize."+B,function(e,n){n.img.css({"max-width":n.img[0].naturalWidth/t,width:"100%"})}),b("ElementParse."+B,function(n,r){r.src=e.replaceSrc(r,t)}))}}}}),function(){var t=1e3,n="ontouchstart"in window,r=function(){d.off("touchmove"+s+" touchend"+s)},i="mfpFastClick",s="."+i;e.fn.mfpFastClick=function(i){return e(this).each(function(){var o=e(this),u;if(n){var a,f,l,c,h,p;o.on("touchstart"+s,function(e){c=!1,p=1,h=e.originalEvent?e.originalEvent.touches[0]:e.touches[0],f=h.clientX,l=h.clientY,d.on("touchmove"+s,function(e){h=e.originalEvent?e.originalEvent.touches:e.touches,p=h.length,h=h[0];if(Math.abs(h.clientX-f)>10||Math.abs(h.clientY-l)>10)c=!0,r()}).on("touchend"+s,function(e){r();if(c||p>1)return;u=!0,e.preventDefault(),clearTimeout(a),a=setTimeout(function(){u=!1},t),i()})})}o.on("click"+s,function(){u||i()})})},e.fn.destroyMfpFastClick=function(){e(this).off("touchstart"+s+" click"+s),n&&d.off("touchmove"+s+" touchend"+s)}}()})(window.jQuery||window.Zepto);