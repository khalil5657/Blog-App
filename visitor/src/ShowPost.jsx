import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, Navigate, redirect } from "react-router-dom";

function ShowPost(props){
    const navigate = useNavigate()
    const { state } = useLocation()
    useEffect(()=>{
        if (!state){
            return navigate("/")
        }
    }, [])
    
    // const [theState, setTheState] = useState(state)
    const [comment, setComment] = useState(false)
    const [input, setInput] = useState('')
    const [changed, setChanged] = useState({})
    const [comments, setComments] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        if (state){
        fetch("http://localhost:3002/posts/post/comments/" + state.post.id,{
            headers: {'Content-Type': 'application/json'},
            method: 'GET',   
        }).then(res=>res.json()).then(data=>setComments(data.data))
        setLoading(false)
    }
    }, [changed])
    async function deleteComment(id){
        await fetch("http://localhost:3002/posts/post/comment/"+id, {
            headers: {'Content-Type': 'application/json'},
            method: "DELETE"
        })
        setChanged({})
    }
    function listIt(comment){
        return <div key={comment.id}>
            <hr />
            <h4>By: {comment.writer.username} At: {comment.commenteddate}</h4>
            <p>{comment.content}</p>
            {comment.writer.id==props.name.id&&<button onClick={()=>deleteComment(comment.id)}>Delete</button>}
            {comment.writer.id==props.name.id&&<Link to="/editComment" state={{comment:comment}}>Edit</Link>}

            {/* <button onClick={()=>deleteComment(comment.id)}>Delete</button> */}
            <hr />
        </div>
    }
    function changeComment(){
        if (comment){
            setComment(false)
        }else{
            setComment(true)
        }
    }
    async function submitComment(e) {
        e.preventDefault()
        await fetch(`http://localhost:3002/posts/post/${state.post.id}/comment/visitor`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            credentials: 'include',
            body: JSON.stringify({
                content:input,
                
              })
        })
        setInput('')
        setChanged({})
    }
    function handleComment(value){
        setInput(value)
    }
    if (loading){
        return <>
                <h1>Loading...</h1>
            </>
    }
    return <>
                <div>
                    <h2>Created By {state.post.writer.username} At {state.post.posteddate}</h2>
                    <h2>Title: {state.post.title}</h2>
                    <h2>Content:</h2>
                    <p>{state.post.content}</p>
                    <h2>Comments: {comments.length}</h2> <button onClick={()=>changeComment()}>Add comment</button>
                     {comment&&<div><form action="" onSubmit={submitComment}><label htmlFor="">Write here:</label><input type="text" onChange={(e)=>handleComment(e.target.value)} value={input}/><button>add</button></form></div>}
                    {comments&&comments.map((comment)=>listIt(comment))}
                    {/* user.map((post)=>listIt(post)) */}
                </div>
            </>
}


export default ShowPost