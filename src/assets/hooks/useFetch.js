import axios from "axios";
import { useState } from "react";


const useFetch = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    const getData = (url) =>{
        axios.get(url)
            .then(res => {
              setError(false)
              setData(res.data)}) 
            .catch(err => setError(true))
            .finally(() => setLoading(false));
    } 

  return [data, getData, loading, error]
}

export default useFetch
