import { useEffect } from "react";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import { setProducts } from "../features/products/productSlice";

function Home() {
  const dispatch = useDispatch();

  const { products } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/products"
      );

      dispatch(setProducts(data));
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">

      <div className="row">

        {products.map((product) => (

          <div
            className="col-md-3 mb-4"
            key={product._id}
          >

            <div className="card">

              <img
                src={product.image}
                className="card-img-top"
                alt=""
                height={300}
                width={400}
              />

              <div className="card-body">

                <h5>{product.name}</h5>

                <h6>₹ {product.price}</h6>

              </div>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Home;