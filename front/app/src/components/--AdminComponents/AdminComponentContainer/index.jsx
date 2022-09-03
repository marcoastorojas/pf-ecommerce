import { useParams } from "react-router-dom";
import style from "./index.module.css";

export default function AdminComponentContainer() {
  const params = useParams();

  return <div className={style.containerDiv}>--CONTAINER--</div>;
}
