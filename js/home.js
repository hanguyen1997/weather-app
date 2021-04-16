$(document).ready(function(){

	var options = {year: 'numeric', day: 'numeric', month: 'long'};
	var today  = new Date();
	document.getElementById("time").innerHTML = today.toLocaleDateString("en-US", options);

	/*get name city*/
	$.ajax({
	  url: "https://geolocation-db.com/jsonp",
	  jsonpCallback: "callback",
	  dataType: "jsonp",
	  success: function(location) {
	   var name_city = location.city;
	   call_api(name_city)
	  }
	});
})

function call_api(name_city){
	var api_key = "8a6782a545b721813285b2fb2f7fc8a2";
	var kelvin = 273;
	var api_weather = "http://api.openweathermap.org/data/2.5/weather?q="+name_city+"&appid="+api_key+"&lang=vi";
	fetch(api_weather)
		.then(response => {
			return response.json();
		})
		.then(data => {
			console.log(data.weather[0].icon);
			
			// /*not found city*/
			// if(data.cod == "404"){
			// 	document.getElementById("notify-projcet").innerHTML = "<p>City not found</p>";
			// 	return;
			// }
			// else document.getElementById("notify-projcet").innerHTML = "";
			// /*end: if(data.code == "404")*/

			// var icon = "<img src='http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png'>";
			
			// // var icon = "<img src='icons/black/png/256x256/"+data.weather[0].icon+".png'>";
			// document.getElementById("icons_weather").innerHTML = icon;

			var add = "<i class='fas fa-map-marker-alt'></i> "+name_city+". <span style='color: #b0b0b1;font-size: 10px;'>"+data.sys.country+"</span>";
			document.getElementById("add").innerHTML = add;

			var icons_weather = "<img src='img/animated/"+data.weather[0].icon+".svg'>";
			document.getElementById("icons_weather").innerHTML = icons_weather;

			var weather = "<p>"+Math.floor(data.main.temp - kelvin)+"<span style='color: #f9d65d;font-weight: 50'>°</span></p>";
			document.getElementById("content_weather").innerHTML = weather;
			
			
			
			// var info_location = data.name+", "+data.sys.country;
			// document.getElementById("info_location").innerHTML = info_location;
		})
}