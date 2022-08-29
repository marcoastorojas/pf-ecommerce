import React from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

import ProductForm from "../../components/ProductForm/ProductForm";
import { useEffect } from "react";

import style from './index.module.css';


export default function Form() {
  useEffect(() => {
    document.title = 'Publish your product'
  }, [])
  return (
    <main className={style.contFormPage}>
      {/* <NavBar /> */}
      <ProductForm />
      {/* <Footer /> */}
    </main>
  );
}
