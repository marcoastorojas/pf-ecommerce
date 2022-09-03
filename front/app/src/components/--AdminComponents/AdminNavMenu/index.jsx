import defaultImg from "../../../media/images/sample-image-square.jpg";

import style from "./index.module.css";

export default function AdminNavMenu() {
  return (
    <div className={style.mainDiv}>
      <div className={style.profilePicDiv}>
        <img className={style.profilePic} src={defaultImg} alt="default" />
      </div>
      <div>stuuf1</div>
      <div>stuff2</div>
      <div>LogOut</div>
    </div>
  );
}
