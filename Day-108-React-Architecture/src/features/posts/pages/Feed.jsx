import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hook/usePost'

function Feed() {
    const { feed, handelGetFeed, loading } = usePost()

    useEffect(() => {
        handelGetFeed()
    }, [])

    if(loading || !feed){
        return (<main><h1>Loading...</h1></main>)
    }

    console.log(feed)
  return (
    <main>
        <div className="feed">
           {feed.map(post => {
            return <Post key={post._id} user={post.user} post={post} />
            })}
        </div>
    </main>
  )
}

export default Feed
