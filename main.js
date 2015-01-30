 $(function() {
    Highcharts.setOptions({
        chart: {
            backgroundColor:'rgba(255, 255, 255, 0)',
            margin: 10
        },
        title: {
            text: null
        },
        tooltip: {
            hideDelay:0,
            valuePrefix: '£',
            valueDecimals: 2,
            formatter: function() {
                return this.key + '<br><b>£' + this.y + ' </b>';
            }
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            pie: {
                size:'100%',
                innerSize:'80%',
                borderColor:'#FAFAFA',
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                animation: {
					duration: 2000,
					easing: 'easeOutExpo'
				},
            }
        }
    });
});

 var chartData = {

	chart1: {
		chart: {
			type: 'pie',
			renderTo: 'chart1'
		},
		series: [{
			
			data: [{
				name: 'Net',
				y: 558.25,
				color: '#9cbf2b'
			}, {
				name: 'Income Tax',
				y: 238.18,
				color: '#d2234f'
			}, {
				name: 'National Insurance',
				y: 86.54,
				color: '#d2234f'
			}]
		}]
	},

	chart2: {
		chart: {
			type: 'pie',
			renderTo: 'chart2'
		},
		series: [{
			data: [{
				name: 'Net',
				y: 425.25,
				color: '#9cbf2b'
			}, {
				name: 'Income Tax',
				y: 101.21,
				color: '#d2234f'
			}, {
				name: 'National Insurance',
				y: 55.67,
				color: '#d2234f'
			}]
		}]
	},

	chart3: {
		chart: {
			type: 'pie',
			renderTo: 'chart3'
		},
		series: [{
			data: [{
				name: 'Net',
				y: 425.25,
				color: '#9cbf2b'
			}, {
				name: 'Income Tax',
				y: 50.18,
				color: '#d2234f'
			}, {
				name: 'National Insurance',
				y: 80.54,
				color: '#d2234f'
			}]
		}]
	}

};

 $(function() {

	var currentChart;
	var position = 1;
	var spanleft;
	var spanwidth = $('.nav a.active').outerWidth();

	$('.nav span').css('width',spanwidth)
	$('.nav span').css('left',$('.nav a.active').offset().left + $('.nav').scrollLeft())

	function injectChart(position) {
		charticide();
		currentChart = new Highcharts.Chart(chartData['chart' + position]);
		return currentChart;
	}

	function charticide() {
		return (currentChart) ? currentChart.destroy() : null;
	}

	function viewportWidth() {
		return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}

	injectChart(position);

	$('.charts').hammer().on("swiperight", function(ev) {
		//if(position<2) return;
		position += 1;
		injectChart(position);
	    $( ".charts ul" ).css('left','+='+viewportWidth()+'');
	    $('.nav a.active').removeClass('active').prev().addClass('active');
	    spanleft = $('.nav a.active').offset().left;
	    $('.nav span').css('left',spanleft);
	});

	 $('.charts').hammer().on("swipeleft", function(e) {
	 	if(position<2) return;
		position -= 1;
		injectChart(position);
	    $( ".charts ul" ).css('left','-='+viewportWidth()+'');
	    $('.nav a.active').removeClass().next().addClass('active');
	    spanleft = $('.nav a.active').offset().left + $('.nav').scrollLeft();
	    $('.nav span').css('left',spanleft)
	});

	$('.tabletoggle').hammer().on("tap", function(e) {
	 	$(this).next().toggle();
	});

});