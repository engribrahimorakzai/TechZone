

import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

export const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAllProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await axios.get('https://dummyjson.com/products?limit=150')
      console.log('API response:', res.data)
      setData(res.data.products)
    } catch (err) {
      console.log('FETCH ERROR:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])
  const categoryOnlyData = ['All', ...new Set(data.map((item) => item.category))]
  const brandOnlyData = ['All', ...new Set(data.map((item) => item.brand).filter(Boolean))]
  return (
    <DataContext.Provider
      value={{ data, setData, loading, error, fetchAllProducts, categoryOnlyData, brandOnlyData }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const getData = () => useContext(DataContext)
