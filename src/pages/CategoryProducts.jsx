import { useParams } from 'react-router-dom'
import { getData } from '../context/DataContext'
import ProductCard from '../components/ProductCard'

const CategoryProducts = () => {
  const { category } = useParams()
  const { data } = getData()

  const filtered = data?.filter((item) => item.category === category) || []

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold uppercase mb-6">
        {category.replace('-', ' ')}
      </h1>

      {filtered.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">
          Is category mein koi product nahi mila
        </p>
      )}
    </div>
  )
}

export default CategoryProducts