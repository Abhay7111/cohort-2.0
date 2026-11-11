import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hook/usePost'
import Nav from '../../shared/components/Nav'

function Feed() {
    const { feed, handelGetFeed, loading, handelLike, handelDisLike } = usePost()

    useEffect(() => {
        handelGetFeed()
    }, [])

    if(loading || !feed){
        return (<main><h1>Loading...</h1></main>)
    }

    console.log(feed)
  return (
    <main>
        <Nav/>
        <div className="feed">
           {feed.map(post => {
            return <Post key={post._id} user={post.user} post={post} loading={loading} handelLike={handelLike} handelDisLike={handelDisLike} />
            })}
        </div>
    </main>
  )
}

export default Feed
