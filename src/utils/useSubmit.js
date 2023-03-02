export const useSubmit = async(url, values)=>{
    const [response, setResponse] = useState({
        data: null, 
        loading: true
    })
    try {
        const res = await axios.post('http://localhost:5000/auth/login', {
            email: values.email,
            password: values.password
        })
        console.log(res.data)
        setResponse((prev) => {return {data: res.data, loading: false}})
    } catch (error) {
        console.log(error)
        setResponse((prev) => {return {data: null, loading: false}})
    }
    return response
}

