<?php
    require('db.inc.php');

    //$date = date("Y-m-d");
    //extract($_POST);
    
    if(isset($_POST['id']) && isset($_POST['tweet']) && isset($_POST['fullname']) && isset($_POST['email']) && isset($_POST['designation'])){
        if(mb_strlen(trim($_POST['tweet'])) > 0 && mb_strlen(trim($_POST['fullname'])) > 0 && mb_strlen(trim($_POST['email'])) > 0 && mb_strlen(trim($_POST['designation'])) > 0){
            $query = mysqli_query($dbc, "UPDATE tweets SET tweet = '".mysql_safe(trim($_POST['tweet']))."',fullname = '".mysql_safe(trim($_POST['fullname']))."',email = '".mysql_safe(trim($_POST['email']))."',designation = '".mysql_safe(trim($_POST['designation']))."' WHERE id=".mysql_safe($_POST['id']));
            
            if(mysqli_affected_rows($dbc) > 0)
                echo json_encode(array('response' => 'success'));
            else
                echo json_encode(array('response' => 'error', 'result' => 'Please make atleast one change to update'));
                
        } else {
            echo json_encode(array('response' => 'error', 'result' => 'Please fill up all the empty fields before tweeting'));
        }
    } else {
        echo json_encode(array('response' => 'error', 'result' => 'Invalid Activity'));
    }
    