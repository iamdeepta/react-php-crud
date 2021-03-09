import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = "http://localhost/Reactjs/react_php_crud/src/api";


const EditTweet = (props) => {

    const [fullname, setFullname] = useState(props.edit_props.fullname);
    const [email, setEmail] = useState(props.edit_props.email);
    const [designation, setDesignation] = useState(props.edit_props.ID);
    const [designations, setDesignations] = useState([]);
    const [val, setVal] = useState(props.edit_props.tweet);

    const editName = (e) => {

        setFullname(e.target.value);
    }

    const editEmail = (e) => {

        setEmail(e.target.value);
    }

    const changeDesignation = (e) => {

        setDesignation(e.target.value);
        
        
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

      const editTweet = (e,id) => {
        e.preventDefault();
        //console.log("clicked");
        var fd = new FormData();
          fd.append("tweet", val);
          fd.append("fullname", fullname);
          fd.append("email", email);
          fd.append("designation", designation);
          fd.append("id",id);
          console.log(fd);
          axios
            .post(apiUrl + "/updatetweet.php", fd)
            .then(function (response) {
              if (response.data.response === "success") {
            
                //props.showEdit = 0;
                props.closeEdit();
                toast.success("Updated Successfully!");
              } else toast.error(response.data.result);
            })
            .catch(function (error) {
              toast.error(error);
            });
      }

    return(

        <>
            <form onSubmit={(e)=>editTweet(e,props.edit_props.id)}>
                <div>
                    <label>Name</label>
                    <input class="form-control" value={fullname} onChange={editName}></input>
                </div>

                <div>
                    <label>Email</label>
                    <input class="form-control" value={email} onChange={editEmail}></input>
                </div>

                <div className="form-group">
                    <label>Designation</label>
                    <select className="form-control" onChange={changeDesignation}>
                        {/* <option value={designation}>{props.edit_props.designation}</option> */}
                        {designations.map((des,index) => {
                        return(
                            <>
                        <option value={des.ID} selected={designation===des.ID}>{des.des_name}</option>
                        </>
                        )
                        })}
                        
                    </select>
                </div>

                <div className="form-group">
                <label>Make Tweet</label>
                <textarea className="form-control" value={val} onChange={changeTweet}></textarea>
                </div>

                <div className="form-group">
                <button className="btn btn-success" type={'submit'} style={{float: "right"}}>Update</button>
                </div>
            </form>
            
        </>
    )
}

export default EditTweet;