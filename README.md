**RESTful API của Công cụ tìm kiếm Các câu hỏi thường gặp về nông nghiệp**
================

Công cụ được phát triển bởi NERD.vn dựa trên tập dữ liệu được lấy từ trang web: https://www.mard.gov.vn/pages/hoi-dap.aspx

Dữ liệu gồm có 646 câu hỏi kèm trả lời và thông tin người hỏi. Các trường thông tin gồm có: "name", "address", "email", "question", "answer".

Công cụ được xây dựng sử dụng Elasticsearch (https://www.elastic.co/products/elasticsearch) và được cài đặt trên server có địa chỉ: nerd.vn, cổng 9200.


Yêu cầu cài đặt 
---------------

Không có.
Client có thể giao tiếp với server Elasticsearch thông qua RESTful API.

Ca sử dụng cơ bản
----------------

####Tìm kiếm đơn giản

Truy cập: http://nerd.vn:9200/mard/faq/_search

Phương thức: POST

Body:

    {"query": {
        "multi_match" : {
            "query": <câu hỏi>,
            "fields": [ "title" ],
            "analyzer": "mard_analyzer"
        }
    }}

Trong đó, <câu hỏi> được thay thế bằng câu hỏi của người dùng. Trường "fields" chứa danh sách các trường được sử dụng để tìm kiếm
theo quan hệ "và".
Các trường này có thể là: "title" (tiêu đề), "question" (câu hỏi), "answer" (trả lời). Do tiêu đề thể hiện ý nghĩa cô
đọng nhất của câu hỏi nên trường "title" được ưu tiên sử dụng.

Phản hồi của server sẽ có dạng JSON như sau:

    {
        ...
        "hits": {
            "total": <tổng số kết quả>,
            "max_score": <điểm liên quan cao nhất>,
            "hits": [..., {
                "_index": "mard",
                "_type": "faq",
                "_id": "mw-N3mcBqyi1QB87oYmL",
                "_score": <điểm liên quan>,
                "_source": {
                    "name": <tên>,
                    "address": <địa chỉ>,
                    "email": <email>,
                    "title": <tiêu đề>,
                    "question": <câu hỏi>,
                    "answer": <trả lời>"
                }
            }, ...]
        }
    }

Trong đó, thứ tự các kết quả trả về được sắp xếp theo điểm liên quan từ lớn đến bé. Dấu "..."
thể hiện thông tin không cần thiết bị ẩn đi.

#### Ví dụ

POST http://nerd.vn:9200/mard/faq/_search

	{"query": {
        "multi_match" : {
            "query": "Tôi muốn xin giấy chứng nhận an toàn thực phẩm. Cho hỏi tôi sẽ phải làm thủ tục như thế nào?",
            "fields": [ "title" ],
            "analyzer": "mard_analyzer"
        }
    }}

Kết quả:

	{
	    ...,
	    "hits": {
	        "total": 77,
	        "max_score": 14.06319,
	        "hits": [
	            {
	                "_index": "mard",
	                "_type": "faq",
	                "_id": "1Q-N3mcBqyi1QB87rolE",
	                "_score": 14.06319,
	                "_source": {
	                    "name": "Vũ Đăng Minh",
	                    "address": "Quảng Bình",
	                    "email": "Minhpov@yahoo.com",
	                    "title": "thủ tục cấp giấy chứng nhận thực phẩm an toàn",
	                    "question": "Tôi xin hỏi thủ tục để được cấp giấy chứng nhận thực phẩm an toàn (rau sạch)",
	                    "answer": "Mời bạn xem thủ tục cấp giấy chứng nhận đủ điều kiện sản xuất, sơ chế rau, quả an toàn tại địa chỉ sau: http://www.mard.gov.vn/Pages/news_detail.aspx?newsid=25173"
	                }
	            },
	            {
	                "_index": "mard",
	                "_type": "faq",
	                "_id": "tQ-N3mcBqyi1QB874Yo9",
	                "_score": 12.903351,
	                "_source": {
	                    "name": "Vu Phuong Anh",
	                    "address": "Thanh Tri- Ha Noi",
	                    "email": "phuonganhpdlaw@gmail.com",
	                    "title": "thủ tục cấp giấy chứng nhận vệ sinh an toàn thực phẩm",
	                    "question": "Tôi có một câu hỏi như sau, mong được giải đáp sớm: Gia đình tôi kinh doanh mặt hàng đồ uống cà phê. Tôi muốn đăng kí để nhận được giấy chứng nhận đảm bảo vệ sinh an toàn thực phẩm. Tôi đi đăng kí ở Chi Cục vệ sinh an toàn thực phẩm hà nội, nhưng được giả thích rằng từ ngày 1/7/2011 mặt hàng mà tôi kinh doanh sẽ do Bộ nông nghiệp phát triển nông thôn cấp giấy chứng nhận vệ sinh an toàn thực phẩm. Tôi muốn hỏi để được cấp giấy CN này cần thực hiện những thủ tục nào, sau bao lâu thì nhận được. Trước 1.7.2011 tôi đã hoàn thành những giấy tờ cần thiết mà chi cục vệ sinh an toàn thực phẩm yêu cầu như: đơn xin cấp GCN, giấy chứng nhận tập huấn VSATTP, giấy chứng nhận sức khỏe. Vậy giờ tôi có sử dụng được những giấy tờ này không, hay phải làm lại thủ tục từ đầu. Tôi rất mong được giải đáp câu hỏi này sớm để nhanh chóng hoàn thành việc xin cấp GCNVSATTP.",
	                    "answer": "Căn cứ Nghị định số 79/2008/NĐ-CP của Chính phủ quy định về hệ thống tổ chức quản lý, thanh tra và kiểm nghiệm về vệ sinh an toàn thực phẩm thì ..."
	                }
	            }, ...
	        ]
	    }
	}


Liên hệ
------------

Mọi câu hỏi xin liên hệ anh Nguyễn Bá Đạt, email: dat.nguyenba@nerd.vn
