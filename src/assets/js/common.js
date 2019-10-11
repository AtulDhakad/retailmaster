var searchShow = false;
$(document).ready(function(){
	
	if($("[aria-expanded='true']").length == 0){
		$(".graph-line").show();
	}
	else{
		$(".graph-line").hide();	
	}

	$('.custom-buttons .btn').click(function(){

		$(this).toggleClass('active');

	});

	$('.main-content').on("click", ".year-selection", function(){
		$('.year-selection').removeClass('active');

		$(this).toggleClass('active');

	});

	$('.main-content').on("click", ".month-selection", function(){

		$('.month-selection').removeClass('active');

		$(this).toggleClass('active');

	});

	$('.custom-table tr').click(function(){
		$('.custom-table tr').css('background-color','');
		$(this).css('background-color','rgba(0,0,0,0.1)');
	});

	$('.ui-slider-handle').click(function(){

		$('.modal-1').modal('show', {backdrop: 'fade'});
	});

	$(".panel-title a").click(function(){
		setTimeout(function(){ 

			if($("[aria-expanded='true']").length == 0){
				$(".graph-line").fadeIn();
			}
			else{
				$(".graph-line").fadeOut();	
			}

		 }, 1);
	});

	// $("body").on("click", ".give-rights", function(){
	// 	$parent = $(this).parent();
	// 	$parent.find('.hidden-permission').removeClass('hidden-permission');
	// 	$(this).addClass('hidden-permission');
	// });

	// $("body").on("click", ".take-rights", function(){
	// 	$(this).prev().removeClass('hidden-permission');
	// 	$(this).nextAll().addClass('hidden-permission');
	// 	$(this).addClass('hidden-permission');
	// });

	// $("body").on("click", ".p-main-menu", function(){
	// 	var exist = false;
	// 	$(this).find('.has-menu').map(function(i, e){ if ($(e).hasClass("collapseActive")) { exist = true; }  });
	// 	$('.p-main-menu td').removeClass('collapseActive');
	// 	if (!exist) {
	// 		$(this).find('.has-menu').addClass('collapseActive');
	// 	}

	// 	$('.p-sub-menu.in').collapse('hide');
	// });

	$('#iconSearch').click(function(e){
    e.preventDefault();
		if (searchShow) {
			$('.txt-search').removeClass('animate-search');
		} else {
      $('.txt-search').addClass('animate-search');
		}
    searchShow = !searchShow;
	});

	$(document).ready(function($){
		$("#s2example-3").select2({
		    placeholder: 'Select payment method...',
		    allowClear: true,
		    minimumResultsForSearch: -1, // Hide the search bar
		    formatResult: function(state)
		    {
		        return '<div class="custom-select2" style="background-image:url(assets/so-images/pm-' + state.id + '.png);"></div>' 
		                + state.text;
		    },
		}).on('change', function(state)
		{

		    $("#" + state.val + " td").removeClass("hide");
		})

		$('.datepicker').datepicker();
		$('.timepicker').timepicker();
	});
});