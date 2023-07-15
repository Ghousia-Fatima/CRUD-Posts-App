import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function PostsApp() {
const [posts, setposts] = useState([]);
const [post, setpost] = useState();
const [showEditForm, setshowEditForm] = useState(false);
const [showCreateForm, setshowCreateForm] = useState(false)
const [newPost, setnewPost] = useState(
  {
    id:"", title:"", body:""
  }
)

useEffect(()=>{
  axios.get("http://127.0.0.1:3003/posts")
  .then(res=>setposts(res.data))
  .catch(err=>console.log(err))
},[])

// Update Operation 
function editPostDetails(postInfo)
{
console.log("Editing Post:", postInfo)
setpost(postInfo)
setshowEditForm(true)
}
console.log(post)

function updateRecord(e){
  e.preventDefault()
  // console.log(newPost)
  axios
  .put(`http://127.0.0.1:3003/posts/${post.id}`, newPost)
  .then(res=>{
    alert("Record Updated")
    setshowEditForm(false)
    window.location.reload()
  })
  .catch(err=>console.log(err))
}
 
function deletePost(postInfo){
  if(window.confirm("Are you sure to delete the record?")) 
  axios
  .delete(`http://127.0.0.1:3003/posts/${postInfo.id}`)
  .then(res=>alert("Record Deleted Successfully"))
  .catch(err=>console.log(err))

  window.location.reload()

}

function showCreatePostForm(){
setshowCreateForm(true)
}

function CreateNewPost(){
  axios
  .post(`http://127.0.0.1:3003/posts/`, newPost)
  .then(res=>alert("New Post Created"))
  .catch(err=>console.log(err))

  window.location.reload()

}

  return (
    <>
    {/* Heading of the App */}
      <div className="row">
        <div className="col-md-12">
            <h2 className='text-center bg-primary text-white py-2'>List of Posts</h2>
        </div>
      </div>

<button className='btn btn-primary' onClick={showCreatePostForm} >Create New Record</button>


{/* Form to Create Record */}

{showCreateForm?
<form>
  <label htmlFor=''>ID</label>
  <input type='text' className='form-control'
  onChange={(e)=>setnewPost({...newPost, id:e.target.value})}
  />
  <label htmlFor=''>Title</label>
  <input type='text' className='form-control'
  onChange={(e)=>setnewPost({...newPost, title:e.target.value})}
  />
  <label htmlFor=''>Body</label>
  <input type='text' className='form-control'
  onChange={(e)=>setnewPost({...newPost, body:e.target.value})}
  />
  <button type='button' className='btn btn-primary my-2' onClick={CreateNewPost} >Create Record</button>
</form>:null}


{/* Table to display Posts Data */}
{showEditForm?
<form>
  <label htmlFor=''>ID</label>
  <input type='text' defaultValue={post.id} className='form-control'
  onChange={(e)=>setnewPost({...newPost, id:e.target.value})}
  />
  <label htmlFor=''>Title</label>
  <input type='text' defaultValue={post.title} className='form-control'
  onChange={(e)=>setnewPost({...newPost, title:e.target.value})}
  />
  <label htmlFor=''>Body</label>
  <input type='text' defaultValue={post.body} className='form-control'
  onChange={(e)=>setnewPost({...newPost, body:e.target.value})}
  />
  <button className='btn btn-primary my-2' onClick={updateRecord} >Update record</button>
</form>
:<table className="table">
<thead>
  <tr>
    <th scope="col">ID</th>
    <th scope="col">Title</th>
    <th scope="col">Body</th>
    <th scope="col" colSpan={2} className='text-center'>Action</th>
  </tr>
</thead>
<tbody>
  {
    posts &&
    posts.map((post)=>(
      <tr key={post.id}>
        <td>{post.id}</td>
        <td>{post.title}</td>
        <td>{post.body}</td>
        <td>
          <button className="btn btn-danger btn-sm" onClick={()=>editPostDetails(post)}> Edit </button>
        </td>
        <td>
          <button className="btn btn-success btn-sm" onClick={()=>deletePost(post)}> Delete </button>
        </td>
      </tr>
    ))
  }
</tbody>
</table>}
    </>
  );
}
