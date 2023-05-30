'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Profile from '@/components/Profile'


const NotMyProfile = ({params}) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const profileName = searchParams.get('name')
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
          const response = await fetch(`/api/users/${params?.id}/posts`);
          const data = await response.json();
          setPost(data);
        };
    
        if (params?.id) fetchPosts();
      }, [params.id]);
  return (
    <Profile 
        name={profileName}
        desc= {`Welcome to ${profileName} personalized page`}
        data={post}
        handleEdit={handleEdit}
        handleDelete={handleDelete}/>
  )
}

export default NotMyProfile
