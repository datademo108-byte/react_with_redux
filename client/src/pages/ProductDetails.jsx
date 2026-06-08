import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [relatedProducts, setRelatedProducts] =
    useState([]);

  const [selectedImage, setSelectedImage] =
    useState("");

  useEffect(() => {
    fetchProduct();
    fetchRelatedProducts();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${id}`
      );

      const data = await response.json();

      setProduct(data);

      if (data.images?.length > 0) {
        setSelectedImage(data.images[0]);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products"
      );

      const data = await response.json();

      setRelatedProducts(data);

    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <div className="text-center mt-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <div className="grid md:grid-cols-2 gap-10">

        {/* Left Side */}

        <div>

          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-lg shadow"
          />

          <div className="grid grid-cols-4 gap-3 mt-4">

            {product.images?.map(
              (img, index) => (

                <img
                  key={index}
                  src={img}
                  alt=""
                  onClick={() =>
                    setSelectedImage(img)
                  }
                  className={`h-24 w-full object-cover rounded border cursor-pointer ${
                    selectedImage === img
                      ? "border-blue-600"
                      : "border-gray-300"
                  }`}
                />

              )
            )}

          </div>

        </div>

        {/* Right Side */}

        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-3xl font-bold text-green-600 mt-4">
            ₹ {product.price}
          </p>

          <p className="text-gray-600 mt-6 leading-7">
            {product.description}
          </p>

          <button
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            Buy Now
          </button>

        </div>

      </div>

      {/* Related Products */}

      <div className="mt-16">

        <h2 className="text-3xl font-bold mb-6">
          Related Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {relatedProducts
            .filter(
              (item) => item._id !== product._id
            )
            .slice(0, 4)
            .map((item) => (

              <div
                key={item._id}
                onClick={() =>
                  navigate(
                    `/product/${item._id}`
                  )
                }
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition"
              >

                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-4">

                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-green-600 font-bold mt-2">
                    ₹ {item.price}
                  </p>

                </div>

              </div>

            ))}

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;