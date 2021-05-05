$(document).ready(function(){
	var options = {year: 'numeric', day: 'numeric', month: 'long'};
	var today  = new Date();
	document.getElementById("time").innerHTML = today.toLocaleDateString("en-US", options);

	/*get name city*/
	var ip = "";
	fetch("https://api.ipify.org/?format=json")
		.then(response => {
			return response.json();
		})
		.then(data => {
			ip = data.ip;
			fetch("http://ipinfo.io/"+ip+"?token=4bc04fcc59b844")
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data);
				name_city = data.city
				call_api(name_city);

				let trani = function() {
					document.getElementById("loading").style.display = "none"
					document.getElementById("container-view").style.display = "block"
				}
				call_api(trani);
				
				//document.getElementById("loading").style.display = "none";
				//setTimeout (document.getElementById("loading").style.display = "none", 3);
				//setTimeout (document.getElementById("container-view").style.display = "block", 3);
			});
		});
});

function call_api(name_city){
	var api_key = "8a6782a545b721813285b2fb2f7fc8a2";
	var kelvin = 273;
	var api_weather = "http://api.openweathermap.org/data/2.5/weather?q="+name_city+"&appid="+api_key;
	fetch(api_weather)
		.then(response => {
			return response.json();
		})
		.then(data => {
			var add = "<i class='fas fa-map-marker-alt'></i> "+name_city+". <span style='color: #b0b0b1;font-size: 10px;'>"+data.sys.country+"</span>";
			document.getElementById("add").innerHTML = add;

			var icons_weather = "<img style='margin-top: -30px;' src='img/animated/"+data.weather[0].icon+".svg'>";
			document.getElementById("icons_weather").innerHTML = icons_weather;

			var weather = "<p>"+ Math.floor(data.main.temp - kelvin) +"<span class='unit-dot'>°C</span></p>";
			document.getElementById("content_weather").innerHTML = weather;

			document.getElementById("description").innerHTML = data.weather[0].description;
			var options = {  
			   hour: "2-digit", minute: "2-digit"  
			};
			var sunrise = new Date(data.sys.sunrise*1000).toLocaleTimeString("en-US", options);
			document.getElementById("sunrise").innerHTML = sunrise;

			var sunset = new Date(data.sys.sunset*1000).toLocaleTimeString("en-US", options);
			document.getElementById("sunset").innerHTML = sunset;
		});

    var url = "https://api.openweathermap.org/data/2.5/forecast";
    $.ajax({
        url: url, //API Call
        dataType: "json",
        type: "GET",
        data: {
            q: name_city,
            appid: api_key,
            units: "metric",
            cnt: "17"
        },
        success: function(data) {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const timesToDisplay = [0, 8, 16];
            let d;
            let dayName;
            var wf = "";
            $.each(data.list, function(index, val) {
              if(timesToDisplay.includes(index)){
                d = new Date(data.list[index].dt * 1000);
                dayName = days[d.getDay()];
                wf +=   "<div class='description-box'>"
				wf +=   "<div class='description-box_img'>"
				wf +=	"<img src='img/animated/"+ val.weather[0].icon+".svg'>"
				wf +=		"</div>"
				wf +=		"<div class='description-box_time'>"
				wf +=			"<p>"+ dayName +"</p>"
				wf +=		"</div>"
				wf +=		"<div class='description-box_temperature'>"
				wf +=			"<h2>"+ Math.floor(val.main.temp) +"°</h2>"
				wf +=		"</div>"
				wf +=	"</div>"
              }
            });
            document.getElementById("next-day").innerHTML = wf;
        }
    });
    return true;
}

