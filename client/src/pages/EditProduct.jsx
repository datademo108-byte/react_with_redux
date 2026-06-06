import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setName(data.name);
      setPrice(data.price);
      setImage(data.image);
      setDescription(data.description);
    };

    fetchProduct();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        {
          name,
          price,
          image,
          description,
        }
      );

      navigate("/products");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">

      <h2 className="text-2xl font-bold mb-4">
        Edit Product
      </h2>

      <form
        onSubmit={submitHandler}
        className="space-y-4"
      >

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border p-2 rounded"
          placeholder="Enter Product Name"
        />

        <input
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="w-full border p-2 rounded"
            placeholder="Enter Product Price"
        />

        <input
          type="text"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
          className="w-full border p-2 rounded"
          placeholder="Enter Product Image URL"
        />

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border p-2 rounded"
          placeholder="Enter Product Description"
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Update Product
        </button>

      </form>

    </div>
  );
}

export default EditProduct;