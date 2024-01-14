
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import { useState } from 'react';
import { useEffect } from 'react';

import axios from 'axios';


function App() {
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});
  //[title, setTitle] = useState("");
  
  
  
  
  //const handleEdit =  (post) => {
   // setSelectedPost(post);

  //}
  useEffect(() => {
    axios.get('http://localhost:4001/posts').then((res) => {
      console.log(res.data);
      setPosts(res.data);
    });
  }, [triggerUpdate]);

  const handleUpdate = (updatedPost) => {
    setSelectedPost(updatedPost);
    axios.patch(`http://localhost:4001/posts/${updatedPost._id}`, updatedPost).then((res) => {
      console.log(res);
      console.log(res.data);
      //selectedPost({});
      setTriggerUpdate(prev => !prev);
    } );
  }
  const handleDelete = async (_id) => {
    await axios.delete(`http://localhost:4001/posts/${_id}`).then((res) => {
      console.log(res.data);
      setPosts(prev => prev.filter(post => post._id !== _id));
     // setTriggerUpdate(prev => !prev);
    });
  }

  return (
    <div className="App">
      
      <Header />
      {selectedPost&&<PostForm postedit ={selectedPost} onUpdate={handleUpdate} setTriggerUpdate={setTriggerUpdate}/>}
      <PostList posts={posts} onEdit={handleUpdate} triggerUpdate={triggerUpdate} onDelete={handleDelete}/>  
      
      <Footer />
     
    </div>
  );
}

export default App;
