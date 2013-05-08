// Gridset Overlay JS

gs = {

	init: function () {
		
		if (window.location.href.match('gridset=show')) gs.show();
	
		gs.bind(document, 'keydown', function (e) { 
		
			if (!e) var e = window.event;
		
			if(e.metaKey || e.ctrlKey) {
				
				switch (e.which || e.keyCode) {
					case 71:
					
						var gw = document.getElementById('gridsetoverlaywrap');
					
						if (!gw) gs.show();
						else gs.remove(gw);
						
						gs.prevent(e);
						break;
						
				}
				
			}
		
		
		});
	
	},
	
	remove: function (gw) {
	
		document.body.removeChild(gw);
		
		if(window.detachEvent) window.detachEvent('onresize', gs.width);
		else window.removeEventListener('resize', gs.width, false);
	
	},
	
	width: function () {
		
		var swv = document.getElementById('gridscreenwidthval');
		if (swv) swv.innerHTML = window.innerWidth + 'px';
		
	},

	show: function () {
	
		var p = ['fd','ft','fm'],
			c = [12,8,4],
			w = [960,600,320],
			b = document.getElementsByTagName('body')[0],
			gw = '<div id="gridwrap"><div id="gridscreenwidthwrap"><p id="gridscreenwidth">Screen width: <strong id="gridscreenwidthval"></strong></p></div><div id="gridoverlay">',
		
			k = 0, breaks = '',
			
			styles = '<style id="gridsetoverlaystyles" type="text/css">#gridsetoverlaywrap{position:static;}#gridwrap{display:block;position:fixed;top:0;left:0;width:100%;height:100%;z-index:1000;pointer-events:none;font-family:Helvetica, Arial, sans-serif !important;}#gridoverlay{position:relative;height:100%;overflow:hidden !important;background:none !important;}#gridoverlay div{display:block;position:static;height:100%;color:#bcbcff;}#gridoverlay .gridset{position:absolute;width:100%;height:100%;top:0;left:0;opacity:0.7;}#gridoverlay .gridset div{text-align:left;font-size:10px !important;border-right:1px solid #bcbcff;border-left:1px solid #bcbcff;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}#gridoverlay div small{width:100%;display:block;text-align:center;color:#7D80DB;font-weight:700 !important;border-bottom:1px solid #bcbcff;border-top:1px solid #bcbcff;padding-top:0 !important;background-color:rgb(240,240,255) !important;text-transform:none !important;height:22px !important;line-height:22px !important;text-style:normal !important;}#gridoverlay .gridset:nth-child(2) div{border-style:dashed;padding-top:23px;}#gridoverlay .gridset:nth-child(2) small{border-style:dashed;}#gridoverlay .gridset:nth-child(3) div{border-style:dotted;padding-top:45px;}#gridoverlay .gridset:nth-child(3) small{border-style:dotted;}#gridsetoverlaywrap .noshow{display:none;}#gridscreenwidthwrap{display:block !important;width:100% !important;position:absolute !important;bottom:0 !important;left:0 !important;height:30px !important;border-top:1px solid #7D80DB !important;opacity:0.7 !important;background-color:rgb(240,240,255) !important;}#gridscreenwidth{display:block !important;width:100% !important;text-align:center !important;font-size:12px !important;line-height:1 !important;padding-top:8px !important;font-family:Helvetica, Arial, sans-serif !important; margin: 0 !important;color:#7D80DB !important;}@media only screen and (max-width:599px) {#gridsetoverlaywrap [class*=fm1],#gridsetoverlaywrap [class*=fm2],#gridsetoverlaywrap [class*=fm3],#gridsetoverlaywrap [class*=fm4],#gridsetoverlaywrap .fm-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=fm1]{width:25%;margin-left:0%;}#gridsetoverlaywrap [class*=fm2]{width:25%;margin-left:25%;}#gridsetoverlaywrap [class*=fm3]{width:25%;margin-left:50%;}#gridsetoverlaywrap [class*=fm4]{width:25%;margin-left:75%;}#gridsetoverlaywrap .fm-hide{display:none !important;}}@media only screen and (min-width:600px) and (max-width:959px) {#gridsetoverlaywrap [class*=ft1],#gridsetoverlaywrap [class*=ft2],#gridsetoverlaywrap [class*=ft3],#gridsetoverlaywrap [class*=ft4],#gridsetoverlaywrap [class*=ft5],#gridsetoverlaywrap [class*=ft6],#gridsetoverlaywrap [class*=ft7],#gridsetoverlaywrap [class*=ft8],#gridsetoverlaywrap .ft-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=ft1]{width:12.489583333333336%;margin-left:0%;}#gridsetoverlaywrap [class*=ft2]{width:12.489583333333336%;margin-left:12.489583333333%;}#gridsetoverlaywrap [class*=ft3]{width:12.489583333333336%;margin-left:24.979166666667%;}#gridsetoverlaywrap [class*=ft4]{width:12.489583333333336%;margin-left:37.46875%;}#gridsetoverlaywrap [class*=ft5]{width:12.489583333333336%;margin-left:49.958333333333%;}#gridsetoverlaywrap [class*=ft6]{width:12.489583333333336%;margin-left:62.447916666667%;}#gridsetoverlaywrap [class*=ft7]{width:12.489583333333336%;margin-left:74.9375%;}#gridsetoverlaywrap [class*=ft8]{width:12.489583333333336%;margin-left:87.427083333333%;}#gridsetoverlaywrap .ft-hide{display:none !important;}}@media only screen and (min-width:960px) {#gridsetoverlaywrap [class*=fd1],#gridsetoverlaywrap [class*=fd2],#gridsetoverlaywrap [class*=fd3],#gridsetoverlaywrap [class*=fd4],#gridsetoverlaywrap [class*=fd5],#gridsetoverlaywrap [class*=fd6],#gridsetoverlaywrap [class*=fd7],#gridsetoverlaywrap [class*=fd8],#gridsetoverlaywrap [class*=fd9],#gridsetoverlaywrap [class*=fd10],#gridsetoverlaywrap [class*=fd11],#gridsetoverlaywrap [class*=fd12],#gridsetoverlaywrap .fd-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=fd1]{width:8.33333333%;margin-left:0%;}#gridsetoverlaywrap [class*=fd2]{width:8.33333333%;margin-left:8.33333333%;}#gridsetoverlaywrap [class*=fd3]{width:8.33333333%;margin-left:16.66666666%;}#gridsetoverlaywrap [class*=fd4]{width:8.33333333%;margin-left:24.99999999%;}#gridsetoverlaywrap [class*=fd5]{width:8.33333333%;margin-left:33.33333332%;}#gridsetoverlaywrap [class*=fd6]{width:8.33333333%;margin-left:41.66666665%;}#gridsetoverlaywrap [class*=fd7]{width:8.33333333%;margin-left:49.99999998%;}#gridsetoverlaywrap [class*=fd8]{width:8.33333333%;margin-left:58.33333331%;}#gridsetoverlaywrap [class*=fd9]{width:8.33333333%;margin-left:66.66666664%;}#gridsetoverlaywrap [class*=fd10]{width:8.33333333%;margin-left:74.99999997%;}#gridsetoverlaywrap [class*=fd11]{width:8.33333333%;margin-left:83.3333333%;}#gridsetoverlaywrap [class*=fd12]{width:8.33333333%;margin-left:91.66666663%;}#gridsetoverlaywrap .fd-hide{display:none !important;}}</style>';
						
		while (p[k]) {
		
			var hides = '', 
				l = 0;
		
			if (w[k] != breaks && k == 0) gw += '<div>';
			else if (w[k] != breaks) gw += '</div><div>';
		
			while (p[l]) {
		
				if (l != k && w[l] != w[k]) hides += p[l] + '-hide ';
				l++;			
		
			}
		
			gw += '<div class="gridset ' + hides + '"><div class="'+p[k]+'1"><small>'+p[k]+'1</small></div>';
		
			var i = 1;
		
			while (i++ < c[k]) gw += '<div class="'+p[k]+i+'"><small>'+p[k]+i+'</small></div>';
		
			gw += '</div>';
		
			if (k == w.length - 1) gw += '</div>';
		
			breaks = w[k];
		
			k++;
		
		}
		
		gw += '</div></div>';
		
		var newgw = document.createElement('div');
		
		newgw.id = 'gridsetoverlaywrap';
		
		newgw.innerHTML = gw + styles;
		
		b.appendChild(newgw);
		
		gs.width();
		gs.bind(window, 'resize', gs.width);
	
	},
	
	bind : function (t, e, f) {
		
		if (t.attachEvent) t.attachEvent('on' + e, f);
		else t.addEventListener(e, f, false);
	
	},
	
	prevent : function (e) {
	
		if (e.preventDefault) e.preventDefault();
		else event.returnValue = false;
	
	}


};

gs.init();