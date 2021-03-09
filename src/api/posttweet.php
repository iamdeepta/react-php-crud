<?php
    require('db.inc.php');

    $date = date("Y-m-d");
    
    if(isset($_POST['tweet']) && isset($_POST['fullname']) && isset($_POST['email']) && isset($_POST['designation'])){
        if(mb_strlen(trim($_POST['tweet'])) > 0 && mb_strlen(trim($_POST['fullname'])) > 0 && mb_strlen(trim($_POST['email'])) > 0 && mb_strlen(trim($_POST['designation'])) > 0){
            $query = mysqli_query($dbc, "INSERT INTO tweets (fullname, email, designation, tweet, created_at) VALUES('".mysql_safe(trim($_POST['fullname']))."','".mysql_safe(trim($_POST['email']))."','".mysql_safe(trim($_POST['designation']))."','".mysql_safe(trim($_POST['tweet']))."','".$date."')");
            
            if(mysqli_affected_rows($dbc) > 0)
                echo json_encode(array('response' => 'success'));
            else
                echo json_encode(array('response' => 'error', 'result' => 'Could not save your tweet'));
                
        } else {
            echo json_encode(array('response' => 'error', 'result' => 'Please fill up all the empty fields before tweeting'));
        }
    } else {
        echo json_encode(array('response' => 'error', 'result' => 'Invalid Activity'));
    }
    