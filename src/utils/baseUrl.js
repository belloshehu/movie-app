const SERVER = 'production'

const devBaseUrl = 'http://localhost:5000' 
const prodBaseUrl = 'https://movie-app-backend-49hg.onrender.com'

export const baseUrl = ()=>  SERVER === 'development'? devBaseUrl : prodBaseUrl
