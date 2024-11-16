import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, Navigate, redirect } from "react-router-dom";
import styles from "./styles.module.css"

function EditComment(props){
    const navigate = useNavigate()

    let { state } = useLocation();
    const [loading, setLoading] = useState(true)
    console.log(state)
    useEffect(()=>{
        if (!state){
            return navigate("/")
        }
        setLoading(false)
    }, [])
    console.log
        const [content, setContent] = useState(state?state.comment.content:'')
        // setLoading(false)
    
    async function submitIt(e){
        e.preventDefault()

        try {
            const res = await fetch(`http://localhost:3002/posts/post/comment/` + state.comment.id, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials:"include",
              body: JSON.stringify({
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
    
    function changeContent(e){
        setContent(e.target.value)
    }
    useEffect(()=>{
      if (!props.name){
        return navigate("/")
      }
    }, [])
    if (loading == true){
        return <>
                <h1>Loading...</h1>
              </>
      }
    return <div className={styles.content}>
            <form action="" method="post" onSubmit={submitIt}>
                <label htmlFor="">Content</label>
                <input type="text" name="content" value={content} onChange={changeContent}/>
                <button type="submit">Add</button>
            </form>
            </div>
}

export default EditComment