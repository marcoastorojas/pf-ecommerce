import style from "./index.modules.css";

export function Footer() {
 return (
  <div>
   <br />
   <footer className={style.footer}>
    <hr />
    <br />
    <br />
    <div>
     <button>Contact us.</button>
     <button>Work with us.</button>
     <button>{"Q&A"}</button>
    </div>
    <p></p>
    <br />
    <br />
    <br />
   </footer>
  </div>
 );
}
