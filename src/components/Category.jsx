
import { useNavigate } from 'react-router-dom'
import { getData } from '../context/DataContext'

const Category = () => {
  const navigate = useNavigate()
  const { data } = getData()

  const categories = [...new Set(data?.map((item) => item.category))]

  return (
    <div className="bg-[#101829]">
      <div className="max-w-7xl mx-auto flex gap-3 md:gap-4 md:flex-wrap md:justify-center overflow-x-auto py-5 md:py-7 px-4">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => navigate(`/category/${item}`)}
            className="shrink-0 whitespace-nowrap uppercase text-sm md:text-base bg-linear-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer hover:scale-105 transition-all"
          >
            {item.replaceAll('-', ' ')}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Category