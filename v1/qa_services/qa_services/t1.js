//http://nongnghiep.girs.vn/qa_services/t1.html
function runScript(e) {
	if (e.keyCode == 13) {
		get_qa()
	}
}

function get_qa(){
    var q=document.getElementById('q').value;;
    var data = {"query": {
                "multi_match" : {
                    "query": q,
                    "fields": ["title"],
                    "analyzer": "mard_analyzer"
                }
            }};
    $.ajax({
        url : "http://nerd.vn:9200/mard/faq/_search",
        type : "POST",
        dateType:"json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data),
        success : function (result){
            //var getData = $.parseJSON(result);
            var getData = result;
            var i=0;
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
            $('#kq').html(kq);
        }
    });
}