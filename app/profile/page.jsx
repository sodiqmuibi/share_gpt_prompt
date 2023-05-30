'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@/components/Profile'


const Profiles = () => {
    const router = useRouter()
    const {data: session} = useSession()
    const [post, setPost] = useState([])
    const handleEdit = (posts) => {
        router.push(`/update-prompt?id=${posts._id}`)
    }
    const handleDelete = async (posts) => {
        const hasConfirmed = confirm("Are you sure you want to delete prompt?")
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${posts._id.toString()}`, {
                    method: 'DELETE'
                })
                const filter = post.filter((p) => p._id !== posts._id)
                setPost(filter)
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
    
          setPost(data);
        };
    
        if (session?.user.id) fetchPosts();
      }, [session?.user.id]);
  return (
    <Profile 
        name="My"
        desc="Welcome to your personalized profile page"
        data={post}
        handleEdit={handleEdit}
        handleDelete={handleDelete}/>
  )
}

export default Profiles
