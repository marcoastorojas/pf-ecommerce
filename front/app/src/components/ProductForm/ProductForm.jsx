import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postProduct } from "../../redux/actions";

export default function ProductForm() {
  const [inputs, setInputs] = useState({
    title: "",
    model: "",
    brand: "",
    images: "",
    description: "",
    price: 0,
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  return (
    <div>
      <h1>Add product to sell</h1>
      <form>
        <div>
          <label>Product name:</label>
          <input
            type="text"
            name="title"
            value={inputs.title}
            placeholder="Product name"
          />
        </div>
        <div>
          <label>Product model:</label>
          <input
            type="text"
            name="model"
            value={inputs.model}
            placeholder="Product model"
          />
        </div>
        <div>
          <label>Product brand:</label>
          <input
            type="text"
            name="brand"
            value={inputs.brand}
            placeholder="Product brand"
          />
        </div>
        <div>
          <label>Product description:</label>
          <input
            type="text"
            name="description"
            value={inputs.description}
            placeholder="Product description"
          />
        </div>
        <div>
          <label>Product price:</label>
          <input
            type="text"
            name="price"
            value={inputs.price}
            placeholder="Product price"
          />
        </div>
        <div>
          <label>Product name:</label>
          <input
            type="text"
            name="title"
            value={inputs.title}
            placeholder="Product name"
          />
        </div>
        <div>
          <input
            type="submit"
            value="SELL"
            disabled={!(Object.entries(errors).length === 0)}
          />
        </div>
      </form>
    </div>
  );
}
