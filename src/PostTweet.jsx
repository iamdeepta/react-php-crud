import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = "http://localhost/Reactjs/react_php_crud/src/api";

const PostTweet = () => {

    const [val, setVal] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [designation, setDesignation] = useState("");
    const [designations, setDesignations] = useState([]);

  const postTweet = (e) => {
    e.preventDefault();
    //console.log("clicked");
    var fd = new FormData();
      fd.append("tweet", val);
      fd.append("fullname", name);
      fd.append("email", email);
      fd.append("designation", designation);
      console.log(fd);
      axios
        .post(apiUrl + "/posttweet.php", fd)
        .then(function (response) {
          if (response.data.response === "success") {
            //setRefreshApp(refreshApp === 1 ? 0 : 1);
            //console.log(response.data.response);
            setVal("");
            setName("");
            setEmail("");
            setDesignation("");
            toast.success("Tweeted Successfully!");
          } else toast.error(response.data.result);
        })
        .catch(function (error) {
          toast.error(error);
        });
  }

  const changeName = (e) => {

    setName(e.target.value);
  }

  const changeEmail = (e) => {

    setEmail(e.target.value);
  }

  const changeDesignation = (e) => {

    setDesignation(e.target.value);
    //console.log(e.target.value);
    
  }
  
  const changeTweet = (e) => {
    setVal(e.target.value);
  }

  useEffect(() => {

    axios
    .get(apiUrl + "/getdesignation.php")
    .then(function(response){
      if (response.data.response === "success") {
        setDesignations(response.data.result);
        //console.log(response.data.result);
      
      }
    })
    .catch(function(error){
      console.log(error);
    })
  },[designations]);

  return (

    <>
    <div className="mt-5">
      <div className="card">
        <div className="card-header"><span className="text-primary">Make Your Tweet</span></div>
        <div className="card-body">
        <form onSubmit={postTweet}>
      <div className="form-group">
        <label>Name</label>
          <input className="form-control" value={name} onChange={changeName} autoComplete="off"/>
        </div>

        <div className="form-group">
        <label>Email</label>
          <input className="form-control" value={email} onChange={changeEmail} autoComplete="off"/>
        </div>

        <div className="form-group">
        <label>Designation</label>
          <select className="form-control" onChange={changeDesignation}>
            <option value="">Select Designation</option>
            {designations.map((des,index) => {
              return(
                <>
              <option value={des.ID}>{des.des_name}</option>
              </>
              )
            })}
            
          </select>
        </div>

        <div className="form-group">
        <label>Make Tweet</label>
          <textarea className="form-control" value={val} onChange={changeTweet}></textarea>
        </div>
        
        <div>
          <button className="btn btn-primary" type={"submit"} style={{float: "right"}}>Tweet</button>
        </div>

      </form>
        </div>
      </div>
      
    </div>
    <ToastContainer/>
    </>
  )
}

export default PostTweet;
