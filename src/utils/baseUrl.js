const SERVER = 'development'

const devBaseUrl = 'http://localhost:5000' 
const prodBaseUrl = 'http://localhost:5000'

export const baseUrl = ()=>  SERVER === 'development'? devBaseUrl : prodBaseUrl
