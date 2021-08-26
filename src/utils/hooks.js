import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export function useFetcher(fetcherFunc = fetch, fetcherFuncParams) {
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!fetcherFuncParams) return;
    
    setLoading(true)
    setError()

    fetcherFunc(fetcherFuncParams)
      .then(setData)
      .then(() => setLoading(false))
      .catch(() => setError(true))

  }, [fetcherFunc, fetcherFuncParams])

  return {
    loading,
    data,
    error
  };
}

useFetcher.PropTypes = {
  fetcherFunc: PropTypes.func.isRequired,
  fetcherFuncParam: PropTypes.string.isRequired
}