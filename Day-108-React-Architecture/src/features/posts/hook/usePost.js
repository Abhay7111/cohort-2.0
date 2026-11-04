import { getFeed } from '../services/post.api'
import { useContext, useState } from 'react'
import { PostContext } from '../post.context'

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

    return {loading, feed, post, feedError, handelGetFeed}
}