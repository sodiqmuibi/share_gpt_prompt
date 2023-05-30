'use client'
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'
const PromptCardList = ({data, handleClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleClick={handleClick}/>
      ))}
    </div>
  )
}
const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [post, setPost] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [result, setResult] = useState([])
  
  const fetchPost = async () => {
    const response = await fetch("/api/prompt")
    const data = await response.json()
    setPost(data)
    console.log(post)
  }

  useEffect(() => {
    fetchPost()
  }, [])

  const filterPrompt = (search) => {
    const regex = new RegExp(search, "i")
    return post.filter((item) => regex.test(item.creator.username) || regex.test(item.prompt) || regex.test(item.tag))
  }

  const handleChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompt(e.target.value)
        setResult(searchResult)
      }, 500)
    )
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)
    const searchResult = filterPrompt(tagName)
    setResult(searchResult)
  }

  return (
    <div className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          required
          onChange={handleChange}
          className='search_input peer'/>
      </form>
      {searchText ? (
        <PromptCardList 
        data={result}
        handleClick={handleTagClick}/>
      ): (
        <PromptCardList 
          data={post}
          handleClick={handleTagClick}/>
      )}
    </div>
  )
}

export default Feed
