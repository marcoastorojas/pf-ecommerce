import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategories, postProduct, getCategories } from "../../redux/actions";
import { validate } from "../../validations/validator";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import style from "./ProductForm.module.css";

export default function ProductForm() {
  const [inputs, setInputs] = useState({
    title: "",
    model: "",
    brand: "",
    images: "",
    description: "",
    price: 0,
    categoryId: "",
  });
  const [errors, setErrors] = useState({});
  const [next, setNext] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const subCategories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories(true));
  }, [dispatch]);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });

    setErrors(validate({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setNext(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postProduct(inputs));

    toast.success("Successfully created!");
    setTimeout(() => {
      setInputs({
        title: "",
        model: "",
        brand: "",
        images: "",
        description: "",
        price: 0,
        categoryId: "",
      });
      navigate("/");
    }, 2000);
  };

  if (!next)
    return (
      <div className="contFormPro">
        <button onClick={() => console.log(subCategories)}>CATEGORIAS</button>
        <h1>Add product to sell</h1>
        <form onSubmit={(e) => handleNext(e)} className={style.form}>
          <div>
            <label>Product name:</label>
            <input type="text" name="title" value={inputs.title} placeholder="Product name" onChange={(e) => handleChange(e)} />
            {errors.title && <p className={style.danger}>{errors.title}</p>}
          </div>
          <div>
            <label>Product model:</label>
            <input type="text" name="model" value={inputs.model} placeholder="Product model" onChange={(e) => handleChange(e)} />
            {errors.model && <p className={style.danger}>{errors.model}</p>}
          </div>
          <div>
            <label>Product brand:</label>
            <input type="text" name="brand" value={inputs.brand} placeholder="Product brand" onChange={(e) => handleChange(e)} />
            {errors.brand && <p className={style.danger}>{errors.brand}</p>}
          </div>
          <div>
            <label>Product description:</label>
            <input type="text" name="description" value={inputs.description} placeholder="Product description" onChange={(e) => handleChange(e)} />
            {errors.description && <p className={style.danger}>{errors.description}</p>}
          </div>
          <div>
            <label>Product price:</label>
            <input type="text" name="price" value={inputs.price} placeholder="Product price" onChange={(e) => handleChange(e)} />
            {errors.price && <p className={style.danger}>{errors.price}</p>}
          </div>
          <div>
            <label>Image:</label>
            <input type="text" name="images" placeholder="Product image" onChange={(e) => handleChange(e)} />
            {errors.images && <p className={style.danger}>{errors.images}</p>}
          </div>
          <div>
            <label>Categories:</label>

            <div className={style.contentSelect}>
              <select name="categoryId" className={style.contentSelect} onChange={(e) => handleChange(e)}>
                <option hidden>Select a category</option>
                {subCategories &&
                  subCategories.map((sc) => {
                    return (
                      <option value={sc.id} key={sc.id}>
                        {sc.name}
                      </option>
                    );
                  })}
              </select>
              <i></i>
            </div>
          </div>

          <input className="buttonFormPro" type="submit" value="NEXT" disabled={!(Object.entries(errors).length === 0)} />
        </form>
      </div>
    );
  else if (next) {
    return (
      <form className={style.preview} onSubmit={(e) => handleSubmit(e)}>
        <h1>Preview product</h1>
        <div>
          <img src={inputs.images} alt={inputs.title} />
          <h3>Name: {inputs.title}</h3>
          <h3>Model: {inputs.model}</h3>
          <h3>Brand: {inputs.brand}</h3>
          <h3>Description: {inputs.description}</h3>
          <h3>Price: ${Intl.NumberFormat().format(inputs.price)}</h3>
        </div>
        <div className={style.buttons}>
          <h1>Would you like to sell your product?</h1>
        </div>
        <input className="buttonFormPro" type="submit" value="Publish" />
        <button className="buttonFormPro" onClick={() => setNext(false)}>
          Go Back
        </button>
        {/* <Toaster /> */}
      </form>
    );
  }

  return <div>Wating fetching</div>;
}
