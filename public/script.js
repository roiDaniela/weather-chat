
String.myFormat = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
    });
};

var _getDate = function(unixtimestamp){
    // Months array
    var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    // Convert timestamp to milliseconds
    var date = new Date(unixtimestamp*1000);

    // Year
    var year = date.getFullYear();

    // Month
    var month = months_arr[date.getMonth()];

    // Day
    var day = date.getDate();

    // Hours
    var hours = date.getHours();

    // Minutes
    var minutes = "0" + date.getMinutes();

    // Seconds
    var seconds = "0" + date.getSeconds();

    // Display date time in MM-dd-yyyy h:m:s format
    var convdataTime = "on " + day+'/'+month+'/'+year+' '+ "at " +hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return convdataTime;
}

var _getTime = function(unix_timestamp){
    var date = new Date(unix_timestamp*1000);
// Hours part from the timestamp
    var hours = date.getHours();
// Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;
}

var htmlBlock = '<div class="shadow-lg p-3 mb-5 bg-white rounded">'+
    '<button class="btn btn-danger float-right my-class" type="button">' +
    '<i class="fa fa-trash" aria-hidden="true"></i>' +
    '</button>' +
    '<h1>{0}</h1>' +
    '<p>{1} &deg;C {2}</p>'+
    '<p style="font-family:"' + '"cursive">{3}</p>'+
    '<ul class="comments-list">'+
    '<div class="input-group my-comments" style="padding-top: 30px">' +
    '<input type="text" placeholder="comment about the weather in {0}" class="form-control">' +
    '<span class="input-group-btn">' +
    '<button class="btn btn-success add-post my-add-comment" type="button">Comment</button>' +
    '</span>' +
    '</ul>'+
    '</div>'+
    '</div>';

var commentTag = '<div class="input-group my-comments" style="padding-top: 30px">' +
    '<input type="text" placeholder="comment about the weather in {0}" class="form-control">' +
    '<span class="input-group-btn">' +
    '<button class="btn btn-success add-post my-add-comment" type="button">Comment</button>' +
    '</span>';

var getWeather = function(city){
    $.get({
            url:"http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=d703871f861842b79c60988ccf3b17ec",
            success: function(data){
                var temp = data.main.temp;
                var description = data.weather[0].description;
                var time = _getDate(data.dt);

                $("#box-container").append(String.myFormat(htmlBlock, city, temp, time,description));

                $( ".my-class" ).bind( "click", function(event) {
                    $(this).closest( "div" ).remove();
                });

                // $( ".my-add-comment" ).bind( "click", function(event) {
                //     $(".comments-list").append(String.myFormat(commentTag, city))
                //     $(this).closest("div").find('input').prop("disabled",true);
                //     $(this).prop("disabled",true);
                // });
            }
        }
    );
};

$("#get-temp").click(function(){
    city = $("#enter-city").val();
    getWeather(city);
});

$( "#box-container" ).on( "click", ".my-add-comment", function(event) {
    // var city = $(this).closest("h1").text();
    $(".comments-list").append(String.myFormat(commentTag, city))
    $(this).closest("div").find('input').prop("disabled",true);
    $(this).prop("disabled",true);
});