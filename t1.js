//http://nongnghiep.girs.vn/qa_services/t1.html
function runScript(e) {
	if (e.keyCode == 13) {
		get_qa()
	}
}

function get_qa(){
    var q=document.getElementById('q').value;
    $.ajax({
        url : "http://api.girs.vn/",
        type : "POST",
        dateType:"json",
        data : {
		eat:3,
		target:{
			schema : "congtrinh",
			table	 : "cong_hientrang_point",
			fields : {
				field1:"ghichu_ten"
				},
			where : {
				maso_cong:q
				}
			}
		},
        success : function (result){
            //var getData = $.parseJSON(result);
			$('#kq').html(result);
            /* var i=0;
            var maxqa=getData.hits.hits.length;
            var answer='';
            var question='';
            var kq='';
            for(i;i<maxqa;i++){
                question=getData.hits.hits[i]._source.question;
                answer=getData.hits.hits[i]._source.answer;
                kq+='<b>Hỏi: '+question+'</b><br><br>';
                kq+='Đáp: '+answer+'<br>--<br><br>';
            }
            //var answer=getData.hits.hits[0]._source.answer;
            var kq_title='Có <u>'+maxqa+'</u> kết quả liên quan cho <u>'+q+'</u>:';
            $('#kq_title').html(kq_title);
            $('#kq').html(kq); */
        }
    });
}