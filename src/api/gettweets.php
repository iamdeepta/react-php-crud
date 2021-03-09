<?php
    require('db.inc.php');
    
    $query = mysqli_query($dbc, "SELECT t.*,d.* FROM tweets as t left outer join tbl_designation as d on t.designation=d.ID ORDER BY t.id DESC");
    
    $tweets = array();
    $count_tweets = 0;
    while($query && $result=mysqli_fetch_array($query, MYSQLI_ASSOC)){
        array_push($tweets, array('id'=>$result['id'], 'ID'=>$result['ID'], 'fullname'=>$result['fullname'], 'email'=>$result['email'], 'designation'=>$result['des_name'], 'tweet'=>$result['tweet'], 'created_at'=>date('d/m/Y',strtotime($result['created_at']))));
        $count_tweets++;
    }
    
    echo json_encode(array('response' => 'success', 'result' => $tweets, 'count_tweets' => $count_tweets));