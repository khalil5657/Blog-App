import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, Navigate, redirect } from "react-router-dom";
import styles from "./styles.module.css"
function CreatePostForm(props){
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()
    async function submitIt(e){
        e.preventDefault()

        try {
            const res = await fetch(`http://localhost:3002/posts/post`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials:"include",
              body: JSON.stringify({
                title,
                content,
                
              })
            })
      
            const data = await res.json()
            return navigate("/")
      
            // if (!res.ok) {
            //   setError(data.message || 'creation failed.')
            // }
          } catch (err) {
            console.error(err)
            // setError('An unexpected error occurred.')
          }
    }
    function changeTitle(e){
        setTitle(e.target.value)
    }
    function changeContent(e){
        setContent(e.target.value)
    }
    useEffect(()=>{
      if (!props.name){
        return navigate("/")
      }
    }, [])
    
    return <div className={styles.content}>
            <form action="" method="post" onSubmit={submitIt}>
                <label htmlFor="">Title</label>
                <input type="text" name="title" value={title} onChange={changeTitle}/>
                <label htmlFor="">Content</label>
                <input type="text" name="content" value={content} onChange={changeContent}/>
                <button type="submit">Add</button>
            </form>
            </div>
}



export default CreatePostForm