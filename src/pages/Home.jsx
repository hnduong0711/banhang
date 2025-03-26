import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { AoFerrow, Quanjogger, Tuilv, Giayf1enter } from '../assets/images'; 

function Home() {
  const [search, setSearch] = useState('');

  const products = [
    { id: 1, name: 'Áo Thun Xanh', price: 150000, image: AoFerrow },
    { id: 2, name: 'Quần Jeans Đen', price: 300000, image: Quanjogger },
    { id: 3, name: 'Giày Sneaker Trắng', price: 500000, image: Giayf1enter },
    { id: 4, name: 'Túi Xách Xanh', price: 250000, image: Tuilv },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-800 drop-shadow-md">
          Danh Sách Sản Phẩm
        </h1>
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full max-w-md p-3 border-2 border-green-500 rounded-full shadow-sm focus:outline-none focus:border-green-700 transition duration-300"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600">
                  {product.price.toLocaleString('vi-VN')} VNĐ
                </p>
                <button className="mt-3 w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-2 rounded-full hover:from-green-700 hover:to-green-900 transition duration-300">
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-6">Không tìm thấy sản phẩm nào!</p>
        )}
      </div>
    </div>
  );
}

export default Home;