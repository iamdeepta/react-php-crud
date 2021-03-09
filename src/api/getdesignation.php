<?php
    require('db.inc.php');
    
    $query = mysqli_query($dbc, "SELECT ID, des_name FROM tbl_designation ORDER BY id ASC");
    
    $designation = array();
    while($query && $result=mysqli_fetch_array($query, MYSQLI_ASSOC)){
        array_push($designation, array('ID'=>$result['ID'], 'des_name'=>$result['des_name']));
    }
    
    echo json_encode(array('response' => 'success', 'result' => $designation));