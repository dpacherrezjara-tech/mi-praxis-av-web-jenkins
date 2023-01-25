var PraxisUI = PraxisUI || {};

PraxisUI = jQuery.extend(PraxisUI, {
	ProgressBar : {
		_pbar : '',
		value : 0.0,
		enabled : false,
		show : function(){
			PraxisUI.ProgressBar._pbar = $('.page-progressbar');
			if(! PraxisUI.ProgressBar._pbar) return false;
			PraxisUI.ProgressBar._pbar.show();
			PraxisUI.ProgressBar.enabled = true;
			PraxisUI.ProgressBar.reportProgress();
		},
		hide : function(){
			PraxisUI.ProgressBar.enabled = false;
			if(! PraxisUI.ProgressBar._pbar) return false;
			PraxisUI.ProgressBar._pbar.hide();
                        PraxisUI.ProgressBar.value = 0.0;
		},
		reportProgress : function(){
			 setTimeout(function(){
				var value = PraxisUI.ProgressBar.value;
				value = Math.round(value * 100) / 100;
				
				barValue = (parseInt(($('.page-progressvalue').css('width') || '0px').replace('px','')) + 1 ) % 190;
				barValue = barValue + 10;
				
				PraxisUI.ProgressBar._pbar.html('<div class="page-progressvalue" style="width:' + (barValue) + 'px"></div><div>Response time ' + value + ' sec</div>');
				PraxisUI.ProgressBar.value = PraxisUI.ProgressBar.value + 0.01;
				
				if(PraxisUI.ProgressBar.enabled) PraxisUI.ProgressBar.reportProgress();
			}, 9);
		}
	}
});

