import { Link } from 'react-router-dom'

const Breadcrums = ({ title }) => {
    return (
        <div className="max-w-6xl mx-auto py-4 text-gray-600">
            <Link to="/" className="hover:text-red-500">
                Home
            </Link>{' '}
            /{' '}
            <Link to="/products" className="hover:text-red-500">
                Products
            </Link>{' '}
            / <span className="font-semibold text-gray-800">{title}</span>
        </div>
    )
}

export default Breadcrums