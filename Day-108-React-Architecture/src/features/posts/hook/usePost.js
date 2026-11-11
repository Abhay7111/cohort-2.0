import { getFeed, createPost, likePost, disLikePost } from '../services/post.api'
import { useContext, useState, useEffect } from 'react'
import { PostContext } from '../post.context'
import {  } from '../services/post.api'

export const usePost = () => {
    const context = useContext(PostContext)
    const {loading, post, feed, setLoading, setPost, setFeed} = context
    const [feedError, setFeedError] = useState(null)

    const handelGetFeed = async () => {
        setFeedError(null)
        setLoading(true)
        try {
            const data = await getFeed()
            setFeed(data)
        } catch (error) {
            setFeedError(error instanceof Error ? error.message : 'Failed to load feed')
        } finally {
            setLoading(false)
        }
    }

    const handelCreatePost = async(imageFile, caption) => {
        setLoading(true)
        try {
            const data = await createPost(imageFile, caption)
            setFeed(currentFeed => [data.post, ...(currentFeed ?? [])])
            return true
        } finally {
            setLoading(false)
        }
    }

    const handelLike = async (post) => {
        const data = await likePost(post)
        await handelGetFeed()
    }
    
    const handelDisLike = async (post) => {
        const data = await disLikePost(post)
        await handelGetFeed()
    }

    useEffect(() =>{
        handelGetFeed()
    },[])

    return {loading, feed, post, feedError, handelGetFeed, handelCreatePost, handelLike, handelDisLike}
}