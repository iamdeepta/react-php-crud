import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap';
import EditTweet from './EditTweet';


const apiUrl = "http://localhost/Reactjs/react_php_crud/src/api";

const GetTweet = () => {

    const [tweets, setTweets] = useState([]);
    const [countTweets, setCountTweets] = useState(0);

    const [show, setShow] = useState(0);
    const [showEdit, setShowEdit] = useState(0);


  const handleClose = () => setShow(0);
  const handleShow = (e,id) => {
      setShow(id);
  }

  const handleCloseEdit = () => setShowEdit(0);
  const handleShowEdit = (e,id) => {
      setShowEdit(id);
  }

    useEffect(() => {
        axios
          .get(apiUrl + "/gettweets.php")
          .then(function (response) {
            if (response.data.response === "success") {
              setTweets(response.data.result);
              setCountTweets(response.data.count_tweets);
              //console.log(response.data.result);
            
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },[tweets]);

      let count = 0;

      const deleteTweet = (e,id) => {
        e.preventDefault();
        var fd = new FormData();
      fd.append("tweet_id", id);
            axios
        .post(apiUrl + "/deletetweet.php", fd)
        .then(function (response) {
          if (response.data.response === "success") {
            
            toast.success("Deleted Successfully!");
          } else toast.error(response.data.result);
        })
        .catch(function (error) {
          toast.error(error);
        });
      }

    
    return (

        <>
        <div className="mt-5">
            <div className="card" style={{height:"90vh"}}>
                <div className="card-header bg-primary text-light">Tweets ({countTweets})</div>

                <div className="card-body" style={{overflowY:"scroll",height:"90vh"}}>

                    {tweets.map((tweet,index)=> {

                        count = count+1;

                        return(
                        <>
                        <div className={count > 1 ? 'card card_inside mt-3' : 'card card_inside'} key={index}>
                        <div className="card-body">
                            <div>
                                <table>
                                    <tbody>
                                    <tr>
                                    <td style={{width:"86%"}}><span className="text-primary"><i>@{tweet.fullname}</i></span> {tweet.tweet}</td>
                                    <td><p style={{fontSize: "12px"}}>{tweet.created_at}</p></td>
                                    
                                    </tr>

                                    <tr>
                                   
                                    <td><p style={{fontSize: "12px"}}>{tweet.designation} (Email: {tweet.email})</p></td>
                                    
                                    </tr>
                                    </tbody>
                            
                                
                                </table>

                                <div className="mt-1">
                                <button className="btn btn-info btn-sm" onClick={(e)=>handleShowEdit(e,tweet.id)}>Edit</button><button className="btn btn-danger btn-sm ml-1" onClick={(e)=>handleShow(e,tweet.id)}>Delete</button>
                            
                                <Modal show={show===tweet.id ? show : ''} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>Are you sure you want to delete this tweet?</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Once you delete it you cannot get it back.</Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="danger" onClick={(e)=>{deleteTweet(e,tweet.id)}}>
                                        Delete
                                    </Button>
                                    </Modal.Footer>
                                </Modal>


                                <Modal show={showEdit===tweet.id ? showEdit : ''} onHide={handleCloseEdit}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>Edit your tweet Info</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <EditTweet edit_props={tweet} closeEdit={handleCloseEdit}/>
                                        
                                    </Modal.Body>
                                    <Modal.Footer>
                                    {/* <Button variant="secondary" onClick={handleCloseEdit}>
                                        Close
                                    </Button> */}
                                    {/* <Button variant="success" type={'submit'}>
                                        Update
                                    </Button> */}
                                    </Modal.Footer>
                                </Modal>

                                </div>
                            
                            </div>
                        </div>
                        </div>

                        </>

                        )

                    })}
                    
                </div>
            </div>
        </div>
        
        </>
    )
}

export default GetTweet;