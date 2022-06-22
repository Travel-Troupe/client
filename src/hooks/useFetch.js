import { useEffect, useCallback, useState } from 'react'
import { getItem } from '../utils/AppStorage';
import { API_URL } from '../utils/constants';
/**
 * Fetch hook
 * @param {string} url 
 * @param {any} options 
 * @param {Array} deps
 */
const useFetch = (url, options = {}, deps = [], immediate = true) => {
  const [state, setState] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  
  const fetchData = useCallback(async () => {
    try {
      const token = (await getItem('token')) || '' 
      const requestUrl = `${API_URL}${url}`

      const req = await fetch(requestUrl, {
        method: 'GET',
        headers: new Headers(token ? {
          'Authorization': `Bearer ${token}`,
        } : {}),
        ...options
      });

      const res = await req.json();
      setState(res)
    } catch(e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [...deps])

  useEffect(() => {
    immediate && fetchData()
  }, [])

  return { data: state, loading, error, refetch: fetchData }
}
export default useFetch