//import React, { useState, useEffect } from "react";
//import axios from "axios";

const PostList = ({posts=[], onEdit,triggerUpdate,onDelete}) => {



   
    
    

    return (
        <div className="post-list">
        <h1>Post List</h1>
        {posts.map((post) => (
        <div className="post" key={post._id}>
        <p>Titile : {post.title} - {post.description}</p>
       <button className="btn btn-danger" onClick={() => {onDelete(post._id)} }>Delete</button>
       <button className="btn btn-warning" onClick={() => {onEdit(post)} }>Edit</button>

        </div>
        ))}
        </div>
    );
}

export default PostList;



