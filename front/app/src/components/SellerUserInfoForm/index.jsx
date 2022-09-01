import style from "./index.module.css";
import { useSelector } from "react-redux";

export default function SelleUserInfoForm({ disabledForm }) {
  const user = useSelector((state) => state.user);

  return (
    <form className={style.infoForm}>
      {disabledForm ? (
        <div className={style.formContainerDiv}>
          <div className={style.formSectionOne}>
            <div>
              <label htmlFor="name">Name</label>
              <br />
              <input id="name" type="text" placeholder={user.name} value={user.name} className={style.formInput} disabled />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <br />
              <input id="username" type="text" placeholder={user.username} value={user.username} className={style.formInput} disabled />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <br />
              <input id="email" type="text" placeholder={user.email} value={user.email} className={style.formInput} disabled />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <br />
              <input id="password" type="text" placeholder="password" value={user.password} className={style.formInput} disabled />
            </div>
            <div>
              <label htmlFor="newPassword">New Password</label>
              <br />
              <input id="newPassword" type="text" placeholder="newPassword" value={user.newPassword} className={style.formInput} disabled />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="lastname">Last Name</label>
              <br />
              <input id="lastname" type="text" placeholder={user.name} className={style.formInput} disabled />
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className={style.formContainerDiv}>
          <div className={style.formSectionOne}>
            <div>
              <label htmlFor="username">Username</label>
              <br />
              <input id="username" type="text" placeholder={user.username} className={style.formInput} />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <br />
              <input id="email" type="text" placeholder={user.email} className={style.formInput} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <br />
              <input id="password" type="text" placeholder="password" className={style.formInput} />
            </div>
            <div>
              <label htmlFor="newPassword">New Password</label>
              <br />
              <input id="newPassword" type="text" placeholder="newPassword" className={style.formInput} />
            </div>
          </div>
          <div className={style.formSectionTwo}>
            <div>
              <label htmlFor="name">Name</label>
              <br />
              <input id="name" type="text" placeholder={user.name} className={style.formInput} />
            </div>
            <button type="submit"></button>
          </div>
        </div>
      )}
    </form>
  );
}
