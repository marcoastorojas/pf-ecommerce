import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategories, postProduct } from "../../redux/actions";
import { validate } from "../../validations/validator";
import "./ProductForm.css";

export default function ProductForm() {
  const [inputs, setInputs] = useState({
    title: "",
    model: "",
    brand: "",
    images: "",
    description: "",
    price: 0,
    subcategoryId: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const subCategories = useSelector((state) => state.subCategories);

  useEffect(() => {
    dispatch(getSubCategories());
  }, [dispatch]);

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
      subcategoryId: "",
    });
  };


  if (subCategories.length > 0)
    return (
      <div>
        <h1>Add product to sell</h1>
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <div>
            <label>Product name:</label>
            <input
              type="text"
              name="title"
              value={inputs.title}
              placeholder="Product name"
              onChange={(e) => handleChange(e)}
            />
            {errors.title && <p className="danger">{errors.title}</p>}
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
            {errors.model && <p className="danger">{errors.model}</p>}
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
            {errors.brand && <p className="danger">{errors.brand}</p>}
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
            {errors.description && (
              <p className="danger">{errors.description}</p>
            )}
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
            {errors.price && <p className="danger">{errors.price}</p>}
          </div>
          <div>
            <div>
              <label>Image:</label>
              <input
                type="text"
                name="images"
                placeholder="Product image"
                onChange={(e) => handleChange(e)}
              />
              {errors.images && <p className="danger">{errors.images}</p>}
            </div>
            <div>
              <label>Categories:</label>
              <select name="subcategoryId" onChange={(e) => handleChange(e)}>
                <option>CATEGORIES</option>
                {subCategories &&
                  subCategories.map((sc) => {
                    return (
                      <option value={sc.id} key={sc.id}>
                        {sc.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <input
              type="submit"
              value="Submit"
              disabled={!(Object.entries(errors).length === 0)}
            />
          </div>
        </form>
      </div>
    );

  return <div>Wating fetching</div>;
}
