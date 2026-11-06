import { getFeed } from '../services/post.api'
import { useContext, useState, useEffect } from 'react'
import { PostContext } from '../post.context'
import { createPost } from '../services/post.api'

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

    useEffect(() =>{
        handelGetFeed()
    },[])

    return {loading, feed, post, feedError, handelGetFeed, handelCreatePost}
}