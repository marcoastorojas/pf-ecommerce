import { useState } from "react";
import { useEffect } from "react";

import style from "./index.modules.css";

export default function SearchBar() {
 const [textInput, setTextInput] = useState(null);

 useEffect(() => {
  console.log(textInput);
 });

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
   console.log({ search: textInput });
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
