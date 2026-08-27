import axios from 'axios'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY
const BASE_URL ='https://newsapi.org/v2/everything'

export const getNews = async (keyword:string) => {
    const response = await axios.get(BASE_URL,{
        params:{
            q: keyword,
            apiKey:API_KEY,
            sortBy:'publishedAt',
            language:'kr'
        }
    })
    return response.data.articles
}