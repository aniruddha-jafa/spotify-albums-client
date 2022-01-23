import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

type returnType<T> = {
  loading: boolean,
  error: Error | null,
  data: T | null
}

/**
 * A higher-order Hook for returning data of type T
 * takes in a fetcherFunc, and its param fetchId 
 * 
 * @example 
 * useFetcher<Album>(getOneAlbum, albumId)  // returns info about 1 album
 * useFetcher<Album[]>(getManyAlbums, albumId)  // returns info about many albums
 * 
 * 
 * @param fetcherFunc - takes a string as input and returns data of a given type
 * @param fetchId - the string id to feed into fetcherFunc
 * @returns {returnType<T>} - a wrapper around data of a given type T (if available), 
 *                                 along with loading  & error info 
 */
export function useFetcher<T>(
    fetcherFunc: (arg: string) => Promise<T>,
    fetchId: string | null
  ): returnType<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!fetchId) return

    setLoading(true)

    fetcherFunc(fetchId)
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError)
  }, [fetcherFunc, fetchId])

  return {
    loading,
    data,
    error,
  }
}

useFetcher.PropTypes = {
  fetcherFunc: PropTypes.func.isRequired,
  fetcherFuncParam: PropTypes.string.isRequired,
}
