import { useState } from "react";
// import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

import { getProductsByName } from "../../redux/actions";

import style from "./index.modules.css";

export default function SearchBar() {
 const dispatch = useDispatch();
 //  const navigate = useNavigate();

 const [textInput, setTextInput] = useState(null);

 //  useEffect(() => {
 //   console.log(textInput);
 //  });

 function onChangeHandler(e) {
  const input = e.target.value;
  if (input === "") {
   setTextInput(null);
  } else {
   setTextInput(input);
  }
 }

 function onSearchHandler(e) {
  e.preventDefault();
  if (!textInput) {
   console.log({ m: "nothing to search!" });
  } else {
   dispatch(getProductsByName(textInput));
   //  navigate("/results");
  }
 }

 return (
  <div>
   <form onSubmit={onSearchHandler} className={style.input}>
    <input
     type="text"
     placeholder="What are you looking for?"
     onChange={onChangeHandler}
    />
    {!textInput ? (
     <button type="submit" disabled>
      {">"}
     </button>
    ) : (
     <button type="submit">{">"}</button>
    )}
   </form>
  </div>
 );
}
