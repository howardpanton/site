/*!Updated: 12-11-2013, 1:28:02 PM */
!function($,window,document){var isTouch="ontouchstart"in window,eStart=isTouch?"touchstart":"mousedown",eMove=isTouch?"touchmove":"mousemove",eCancel=isTouch?"touchcancel":"mouseup",secondsToTime=function(secs){var hours=Math.floor(secs/3600),minutes=Math.floor(secs%3600/60),seconds=Math.ceil(secs%3600%60);return(0==hours?"":hours>0&&hours.toString().length<2?"0"+hours+":":hours+":")+(minutes.toString().length<2?"0"+minutes:minutes)+":"+(seconds.toString().length<2?"0"+seconds:seconds)},canPlayType=function(file){var audioElement=document.createElement("audio");return!(!audioElement.canPlayType||!audioElement.canPlayType("audio/"+file.split(".").pop().toLowerCase()+";").replace(/no/,""))};$.fn.audioPlayer=function(params){var params=$.extend({classPrefix:"audioplayer",strPlay:"Play",strPause:"Pause",strVolume:"Volume"},params),cssClass={},cssClassSub={playPause:"playpause",playing:"playing",time:"time",timeCurrent:"time-current",timeDuration:"time-duration",bar:"bar",barLoaded:"bar-loaded",barPlayed:"bar-played",volume:"volume",volumeButton:"volume-button",volumeAdjust:"volume-adjust",noVolume:"novolume",mute:"mute",mini:"mini"};for(var subName in cssClassSub)cssClass[subName]=params.classPrefix+"-"+cssClassSub[subName];return this.each(function(){if("audio"!=$(this).prop("tagName").toLowerCase())return!1;var $this=$(this),audioFile=$this.attr("src"),isAutoPlay=$this.get(0).getAttribute("autoplay"),isAutoPlay=""===isAutoPlay||"autoplay"===isAutoPlay?!0:!1,isLoop=$this.get(0).getAttribute("loop"),isLoop=""===isLoop||"loop"===isLoop?!0:!1,isSupport=!1;"undefined"==typeof audioFile?$this.find("source").each(function(){return audioFile=$(this).attr("src"),"undefined"!=typeof audioFile&&canPlayType(audioFile)?(isSupport=!0,!1):void 0}):canPlayType(audioFile)&&(isSupport=!0);var thePlayer=$('<div class="'+params.classPrefix+'">'+(isSupport?$("<div>").append($this.eq(0).clone()).html():'<embed src="'+audioFile+'" width="0" height="0" volume="100" autostart="'+isAutoPlay.toString()+'" loop="'+isLoop.toString()+'" />')+'<div class="'+cssClass.playPause+'" title="'+params.strPlay+'"><a href="#">'+params.strPlay+"</a></div></div>"),theAudio=isSupport?thePlayer.find("audio"):thePlayer.find("embed"),theAudio=theAudio.get(0),playPause=thePlayer.find("."+cssClass.playPause);if(isSupport){thePlayer.find("audio").css({width:0,height:0,visibility:"hidden"}),thePlayer.append('<div class="'+cssClass.time+" "+cssClass.timeCurrent+'"></div><div class="'+cssClass.bar+'"><div class="'+cssClass.barLoaded+'"></div><div class="'+cssClass.barPlayed+'"></div></div><div class="'+cssClass.time+" "+cssClass.timeDuration+'"></div><div class="'+cssClass.volume+'"><div class="'+cssClass.volumeButton+'" title="'+params.strVolume+'"><a href="#">'+params.strVolume+'</a></div><div class="'+cssClass.volumeAdjust+'"><div><div></div></div></div></div>');var theBar=thePlayer.find("."+cssClass.bar),barPlayed=thePlayer.find("."+cssClass.barPlayed),barLoaded=thePlayer.find("."+cssClass.barLoaded),timeCurrent=thePlayer.find("."+cssClass.timeCurrent),timeDuration=thePlayer.find("."+cssClass.timeDuration),volumeButton=thePlayer.find("."+cssClass.volumeButton),volumeAdjuster=thePlayer.find("."+cssClass.volumeAdjust+" > div"),volumeDefault=0,adjustCurrentTime=function(e){theRealEvent=isTouch?e.originalEvent.touches[0]:e,theAudio.currentTime=Math.round(theAudio.duration*(theRealEvent.pageX-theBar.offset().left)/theBar.width())},adjustVolume=function(e){theRealEvent=isTouch?e.originalEvent.touches[0]:e,theAudio.volume=Math.abs((theRealEvent.pageY-(volumeAdjuster.offset().top+volumeAdjuster.height()))/volumeAdjuster.height())},updateLoadBar=function(){setTimeout(function(){barLoaded.width(theAudio.buffered.end(0)/theAudio.duration*100+"%"),theAudio.buffered.end(0)<theAudio.duration&&updateLoadBar(updateLoadBar)},100)},volumeTestDefault=theAudio.volume,volumeTestValue=theAudio.volume=.111;Math.round(1e3*theAudio.volume)/1e3==volumeTestValue?theAudio.volume=volumeTestDefault:thePlayer.addClass(cssClass.noVolume),timeDuration.html("&hellip;"),timeCurrent.text(secondsToTime(0)),theAudio.addEventListener("loadedmetadata",function(){updateLoadBar()}),theAudio.addEventListener("loadeddata",function(){timeDuration.text(secondsToTime(theAudio.duration)),volumeAdjuster.find("div").height(100*theAudio.volume+"%"),volumeDefault=theAudio.volume}),theAudio.addEventListener("timeupdate",function(){timeCurrent.text(secondsToTime(theAudio.currentTime)),barPlayed.width(theAudio.currentTime/theAudio.duration*100+"%")}),theAudio.addEventListener("volumechange",function(){volumeAdjuster.find("div").height(100*theAudio.volume+"%"),theAudio.volume>0&&thePlayer.hasClass(cssClass.mute)&&thePlayer.removeClass(cssClass.mute),theAudio.volume<=0&&!thePlayer.hasClass(cssClass.mute)&&thePlayer.addClass(cssClass.mute)}),theAudio.addEventListener("ended",function(){thePlayer.removeClass(cssClass.playing)}),theBar.on(eStart,function(e){adjustCurrentTime(e),theBar.on(eMove,function(e){adjustCurrentTime(e)})}).on(eCancel,function(){theBar.unbind(eMove)}),volumeButton.on("click",function(){return thePlayer.hasClass(cssClass.mute)?(thePlayer.removeClass(cssClass.mute),theAudio.volume=volumeDefault):(thePlayer.addClass(cssClass.mute),volumeDefault=theAudio.volume,theAudio.volume=0),!1}),volumeAdjuster.on(eStart,function(e){adjustVolume(e),volumeAdjuster.on(eMove,function(e){adjustVolume(e)})}).on(eCancel,function(){volumeAdjuster.unbind(eMove)})}else thePlayer.addClass(cssClass.mini);isAutoPlay&&thePlayer.addClass(cssClass.playing),theAudio.addEventListener("play",function(){$("audio[data-playing=true]").each(function(){this.pause()}),$(theAudio).attr("data-playing","true"),playPause.attr("title",params.strPause).find("a").html(params.strPause),thePlayer.addClass(cssClass.playing)}),theAudio.addEventListener("pause",function(){$(theAudio).removeAttr("data-playing"),playPause.attr("title",params.strPlay).find("a").html(params.strPlay),thePlayer.removeClass(cssClass.playing)}),thePlayer.find("."+cssClass.playPause).on("click",function(){return theAudio.paused?theAudio.play():theAudio.pause(),!1}),$this.replaceWith(thePlayer)}),this}}(jQuery,window,document);