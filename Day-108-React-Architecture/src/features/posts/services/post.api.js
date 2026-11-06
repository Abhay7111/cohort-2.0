import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})

export async function getFeed() {
    const response = await api.get('/posts/feed')
    const { posts } = response.data

    if (!Array.isArray(posts)) {
        throw new Error('Invalid feed response: expected posts to be an array')
    }

    return posts
}


export async function createPost(imageFile, caption) {
    const formData = new FormData()
    formData.append('img_url', imageFile)
    formData.append('caption', caption)

    const response = await api.post('/posts', formData)

    return response.data
}