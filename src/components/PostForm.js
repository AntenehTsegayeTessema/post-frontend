import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const PostForm = ({postedit,setTriggerUpdate:updateTrigger}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if(postedit){
          setTitle(postedit.title ||"");
          setDescription(postedit.description ||"");
        }
        else{
          setTitle("");
          setDescription("");
        }
      }, [postedit]);
      
    
    
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = {
            _id: postedit?._id,
            title,
            description,
        };
//
        if(postedit){
            postData._id = postedit._id;
            axios.patch(`http://localhost:4001/posts/${postedit._id}`, postData).then((res) => {
                console.log(res);
                console.log(res.data);
                setTitle("");
            setDescription("");
                updateTrigger(prev=>!prev);
            } );
        }
        else{
        
        axios.post("http://localhost:4001/posts", postData).then((res) => {
            console.log(res);
            console.log(res.data);
            setTitle("");
            setDescription("");
            updateTrigger(prev=>!prev);
            //setTriggerUpdate(prev=>!prev);

        });
    }
}


return (
    <div className="post-form">
    
    <form onSubmit ={handleSubmit}>
    <div className="form-group">
    <label htmlFor="title">Title</label>
    <input type="text" className="form-control" id="title"  value ={title} onChange={(e)=>setTitle(e.target.value)} />
    <br/> <br/></div>
    <div className="form-group">
    <label htmlFor="description">Description</label>
    <textarea className="form-control" id="description" rows="5" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
    <br/><br/></div>
    <button type="submit" className="btn btn-primary" >Submit</button>

<br/><br/><br/><br/><br/><br/>

    </form>
    </div>
);
}

export default PostForm;
