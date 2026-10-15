import { useNavigate } from 'react-router-dom'
import { getData } from '../context/DataContext'

const Category = () => {
  const navigate = useNavigate()
  const { data } = getData()

  // sab  products 
  const categories = [...new Set(data?.map((item) => item.category))]

  return (
    <div className="bg-[#101829]">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-7 px-4">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => navigate(`/category/${item}`)}
            className="uppercase bg-linear-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer hover:scale-105 transition-all"
          >
            {item.replace('-', ' ')}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Category