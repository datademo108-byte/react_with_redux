import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProducts } from "../features/products/productSlice";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products } = useSelector(
    (state) => state.products
  );

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/products"
      );

      dispatch(setProducts(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const editProduct = (id) => {
  navigate(`/product/edit/${id}`);
};

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      fetchProducts();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-8">
        Products
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products.map((product) => (

            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-72 object-cover"
              />

              <div className="p-4">

                <h2 className="text-lg font-semibold mb-2">
                  {product.name}
                </h2>

                <p className="text-green-600 font-bold text-xl mb-2">
                  ₹ {product.price}
                </p>

                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      editProduct(product._id)
                    }
                    className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteProduct(product._id)
                    }
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Products;