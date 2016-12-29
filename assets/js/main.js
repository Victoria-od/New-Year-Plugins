$(document).ready(function(){
	


	$('.image-slider').slick({
		//'autoplay': true, 
		'autoplaySpeed': 4000, 
		'slidesToShow': 3, 
		'centerMode': true,
		'dots': true
	});
	
	$('.image-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('.image-slider .image-slide').addClass('slide-changing');
	});
	
	$('.image-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
		$('.image-slider .image-slide').removeClass('slide-changing');
	});
	
	populateCountries('map-country');

	$('#map-country').simpleselect();
	
	$(document).on('click', '.tabs-navigation li a', function(e){
		
		e.preventDefault();
		var tab_id = $(this).parent().attr('data-tab');
		$('.active[data-tab]').removeClass('active');
		$('[data-tab="' + tab_id + '"]').addClass('active');
		
	});
	
	$(document).on('click', '.tabs-next', function(e){
		e.preventDefault();
		var tab_id = $('.active[data-tab]').attr('data-tab');
		tab_id++;
		
		if ( $('[data-tab=' + tab_id + ']').length == 0 ){
			tab_id = $('[data-tab]:first-child').attr('data-tab');
		}
		
		$('.active[data-tab]').removeClass('active');
		$('[data-tab="' + tab_id + '"]').addClass('active');
		
	});
	
	$(document).on('click', '.tabs-prev', function(e){
		e.preventDefault();
		var tab_id = $('.active[data-tab]').attr('data-tab');
		tab_id--;
		
		if ( $('[data-tab=' + tab_id + ']').length == 0 ){
			tab_id = $('[data-tab]:last-child').attr('data-tab');
		}
		
		$('.active[data-tab]').removeClass('active');
		$('[data-tab="' + tab_id + '"]').addClass('active');		
	});
	
	setInterval(function(){
		
		if ( $('.tabs-block:hover').length == 0 ){
			
			var tab_id = $('.active[data-tab]').attr('data-tab');
			tab_id++;
			
			if ( $('[data-tab=' + tab_id + ']').length == 0 ){
				tab_id = $('[data-tab]:first-child').attr('data-tab');
			}
			
			$('.active[data-tab]').removeClass('active');
			$('[data-tab="' + tab_id + '"]').addClass('active');
			
		}
		
	}, 3000);
	
	$(document).on('click', '.map-title', function(){
		$('.location-form').slideToggle();
	});
	
	$(document).on('click', '.show-my-pos', function(e){
		e.preventDefault();
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function(position){						
				coordinates = {
					lat: position.coords.latitude, 
					lng: position.coords.longitude
				};
				map.setCenter(coordinates);
				marker.setPosition(coordinates);
				infowindow.setContent('<p>Current Location</p>');
				$('.location-form').slideUp();
			});
		}
	});
	
	$(document).on('submit', '.location-form form', function(e){
		e.preventDefault(); //isEmpty()
		var country = $('#map-country').val();
		var city = $('#map-city').val();
		var address = $('#map-address').val();
		var zip = $('#map-zip').val();
		var validated = true;
		
		if (isEmpty(country) || country == '-1'){
			$('#map-country').closest('.map-form-field').addClass('error');
			validated = false;
		} else {
			$('#map-country').closest('.map-form-field').removeClass('error');
		}
		
		if (isEmpty(city)){
			$('#map-city').closest('.map-form-field').addClass('error');
			validated = false;
		} else {
			$('#map-city').closest('.map-form-field').removeClass('error');
		}
		
		if (isEmpty(address)){
			$('#map-address').closest('.map-form-field').addClass('error');
			validated = false;
		} else {
			$('#map-address').closest('.map-form-field').removeClass('error');
		}
		
		if (isEmpty(zip) || zip.length != 5){
			$('#map-zip').closest('.map-form-field').addClass('error');
			validated = false;
		} else {
			$('#map-zip').closest('.map-form-field').removeClass('error');
		}
		
		if (validated){
			
			saveAddressToCookies(zip, country, city, address);
			var request_address = getFormattedAddress(zip, country, city, address);
			var request_link = 'https://maps.google.com/maps/api/geocode/json?address=' + request_address;
			
			$.post(
				request_link, 
				{}, 
				function(response){
					if (typeof response.results != 'undefined' && response.status == 'OK'){
						coordinates = response.results[0].geometry.location;
						map.setZoom(18);					
						map.setCenter(coordinates);
						marker.setPosition(coordinates);
						infowindow.setContent('<p>' + response.results[0].formatted_address + '</p>');
						$('.location-form').slideUp();
					} else {
						alert('Address not found!');
					}
				}
			);
			
		}
		
	});
	
	$(document).on('click', '[data-toggle="modal"]', function(e){
		
		e.preventDefault();
		var el_selector = $(this).attr('data-target');
		$(el_selector).fadeIn();
		
	});
	
	$(document).on('click', '.modal .close-modal', function(e){
		
		e.preventDefault();
		$(this).closest('.modal').fadeOut();
		
	});
	
	$.mask.definitions['d'] = '[0-9]';
	delete $.mask.definitions['9'];
	$('.phone-input').mask('+99(ddd)ddd-dd-dd');
	
	$('.date-input').datetimepicker();
	
	fixed_head_pos = $('.head-row-second').offset().top;
	fixed_head_height = $('.head-row-second').outerHeight();
		if($('.location-form').length > 0 &&  $())


if($('.location-form').length > 0 &&  $('.locationform').is('.form-result')){
	var zip = getCookie('zipcode');
	var country = getCookie('country');
	var city = getCookie('city');
	var address = getCookie('address');

	if (typeof zip != 'undefined'){
		$('#map').val(zip);
	}
	if (typeof country != 'undefined'){
		$('#map').val(country);
	}
	if (typeof city != 'undefined'){
		$('#map').val(city);
	}
	if (typeof address != 'undefined'){
		$('#map').val(address);
	}
}

});

var fixed_head_pos, fixed_head_height;

$(document).scroll(function(){
	
	var scroll_top = $(window).scrollTop();
	if (scroll_top >= fixed_head_pos){
		$('.head-row-second').addClass('fixed');
		$('body').css('padding-top', fixed_head_height + 'px');
	} else {
		$('.head-row-second').removeClass('fixed');
		$('body').css('padding-top', '0');
	}
	
});

$(window).load(function(){
	
	$('.masonry-content').masonry({
		'itemSelector': '.masonry', 
		'gutter': '.masonry-gutter',
		'columnWidth': '.masonry-sizer',
		'percentPosition': true
	});
		
	var tabs_max_height = 0;
	$('.tabs-content .tab-content').css('display', 'block');

	$('.tabs-content .tab-content').each(function(){
		var height = $(this).outerHeight(true);
		if (height > tabs_max_height){
			tabs_max_height = height;
		}
	});
	
	$('.tabs-content').css('height', tabs_max_height + 'px');	
	$('.tabs-content .tab-content').css('display', '');	
	
});

function isEmpty(str){
	return (str.length == 0);
}

function getFormattedAddress(m_zip, m_country, m_city, m_address){
	var formatted_address = m_address + ', ' + m_city + ', ' + m_zip + ', ' + m_country;
	return encodeURI(formatted_address);
}

function getCoordinates(m_zip, m_country, m_city, m_address){
	var formatted_address = m_address + ', ' + m_city + ', ' + m_zip + ', ' + m_country;
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({
		'address': formatted_address
	}, function(result){
		console.log(result[0].geometry.location);
	});
}
function saveAddressToCookies(m_zip, m_city, m_address){
var date = new Date(new Date().getTime() + 60 * 5000);
document.cookie = 'zipcode=' +m_zip + '; psth=/; expires=' + date.toUTCString();
document.cookie = 'country=' +m_zip + '; psth=/; expires=' + date.toUTCString();
document.cookie = 'city=' +m_zip + '; psth=/; expires=' + date.toUTCString();
document.cookie = 'address=' +m_zip + '; psth=/; expires=' + date.toUTCString();
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36251023-1']);
  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();


