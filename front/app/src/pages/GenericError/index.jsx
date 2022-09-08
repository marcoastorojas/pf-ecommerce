import style from "./index.module.css";

export default function GenericError() {
  return (
    <main className={style.genericError}>
      <h1>Error</h1>
      <h2>Page not Found.</h2>
    </main>
  );
}
