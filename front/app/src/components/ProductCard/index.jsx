//import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./index.module.css";

import { useSelector, useDispatch } from "react-redux";

import star from "../../media/images/bx-star.svg";
import starF from "../../media/images/bxs-star.svg";


export default function ProductCard({ id, title, image, price, model, brand }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  const product = { id, title, image, price, model, brand };


  return (
    <div>fixed</div>
  );
}
