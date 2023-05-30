'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@/components/Form'

const UpdatePrompt = () => {
    // const {data: session} = useSession()
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')
    const router = useRouter()
    const [submit, setSubmit] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    useEffect(() => {
        const getPromptDetails = async () => {
          const response = await fetch(`/api/prompt/${promptId}`);
          const data = await response.json();
    
          setPost({
            prompt: data.prompt,
            tag: data.tag,
          });
        };
    
        if (promptId) getPromptDetails();
      }, [promptId]);
    const updatePost = async (e) => {
        e.preventDefault();
        setSubmit(true)
        if (!promptId) return alert("Prompt ID not found")
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if (response.ok) {
                router.push("/")
            }
        } catch(error) {
            console.log(error)
        } finally {
            setSubmit(false)
        }
    }
  return (
    <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submit={submit}
        handleSubmit={updatePost}/>

  )
}

export default UpdatePrompt
