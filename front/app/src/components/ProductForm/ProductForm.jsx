import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postProduct } from "../../redux/actions";
import { validate } from "../../validations/validator";

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

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });

    setErrors(validate({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postProduct(inputs));
    setInputs({
      title: "",
      model: "",
      brand: "",
      images: "",
      description: "",
      price: 0,
    });
  };

  return (
    <div>
      <h1>Add product to sell</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Product name:</label>
          <input
            type="text"
            name="title"
            value={inputs.title}
            placeholder="Product name"
            onChange={(e) => handleChange(e)}
          />
          {errors.title && <p>{errors.title}</p>}
        </div>
        <div>
          <label>Product model:</label>
          <input
            type="text"
            name="model"
            value={inputs.model}
            placeholder="Product model"
            onChange={(e) => handleChange(e)}
          />
          {errors.model && <p>{errors.model}</p>}
        </div>
        <div>
          <label>Product brand:</label>
          <input
            type="text"
            name="brand"
            value={inputs.brand}
            placeholder="Product brand"
            onChange={(e) => handleChange(e)}
          />
          {errors.brand && <p>{errors.brand}</p>}
        </div>
        <div>
          <label>Product description:</label>
          <input
            type="text"
            name="description"
            value={inputs.description}
            placeholder="Product description"
            onChange={(e) => handleChange(e)}
          />
          {errors.description && <p>{errors.description}</p>}
        </div>
        <div>
          <label>Product price:</label>
          <input
            type="text"
            name="price"
            value={inputs.price}
            placeholder="Product price"
            onChange={(e) => handleChange(e)}
          />
        </div>
        {errors.price && <p>{errors.price}</p>}
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
