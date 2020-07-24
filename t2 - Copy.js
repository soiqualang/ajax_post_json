//http://nongnghiep.girs.vn/qa_services/t1.html
function runScript(e) {
	if (e.keyCode == 13) {
		get_qa()
	}
}

function get_qa(){
    var q=document.getElementById('q').value;
	var qobj={
			"eat":3,
			"target":{
				"schema" : "congtrinh",
				"table"	 : "cong_hientrang_point",
				"fields" : {
					"field1":"ghichu_ten",
					"field2":"geom"
					},
				"where" : {
					"maso_cong":q
					}
				}
			};
	//console.log(qobj);
	var myJSON = JSON.stringify(qobj);
	//console.log(myJSON);
    var settings = {
		async: true,
		crossDomain: true,
		url: "http://api.girs.vn/select/json",
		method: "POST",
		headers: {
			"content-type": "application/json",
			"cache-control": "no-cache"
		},
		processData: false,
		data: myJSON
	}

	$.ajax(settings).done(function (response) {
		//console.log(response);
		var getData = $.parseJSON(response);
		console.log(getData);
		$('#kq').html(response);
	});
}