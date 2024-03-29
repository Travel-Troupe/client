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
          'Content-Type': 'application/json',
        } : {}),
        ...options
      });

      const res = await req.json();
      if (!req.ok) {
        throw new Error(res?.message || res?.error || 'an error occured')
      }
      setState(res)
      setError(null)
      setLoading(false)
      return res
    } catch(e) {
      setError(e.message)
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