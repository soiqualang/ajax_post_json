<?php
header('Access-Control-Allow-Origin: *');
if(isset($_POST['q'])){
    $q=$_POST['q'];
    if($q!=''){
        $url='http://nerd.vn:9200/mard/faq/_search';
        $data='{"query": {
        			"multi_match" : {
        				"query": "'.$q.'",
        				"fields": ["title"],
        				"analyzer": "mard_analyzer"
        			}
        		}}';
        $ch = curl_init( $url );
        curl_setopt( $ch, CURLOPT_POSTFIELDS, $data );
        curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        $result = curl_exec($ch);
        curl_close($ch);
        echo $result;
    }
}
?>