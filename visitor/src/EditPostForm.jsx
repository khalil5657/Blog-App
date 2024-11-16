import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, Navigate, redirect } from "react-router-dom";
function EditPostForm(props){
    const navigate = useNavigate()

    let { state } = useLocation();
    const [loading, setLoading] = useState(true)
    console.log(state)
    useEffect(()=>{
        if (!state){
            console.log("makaynach")
            return navigate("/")
        }
        setLoading(false)
    }, [])
    console.log
        const [title, setTitle] = useState(state?state.post.title:'')
        const [content, setContent] = useState(state?state.post.content:'')
        // setLoading(false)
    
    async function submitIt(e){
        e.preventDefault()

        try {
            const res = await fetch(`http://localhost:3002/posts/post/` + state.post.id, {
              method: 'PUT',
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
    if (loading == true){
        return <>
                <h1>Loading...</h1>
              </>
      }
    return <>
            <form action="" method="post" onSubmit={submitIt}>
                <label htmlFor="">Title</label>
                <input type="text" name="title" value={title} onChange={changeTitle}/>
                <label htmlFor="">Content</label>
                <input type="text" name="content" value={content} onChange={changeContent}/>
                <button type="submit">Add</button>
            </form>
            </>
}



export default EditPostForm