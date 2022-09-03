import UsersCardsContainer from "../../components/--AdminComponents/UsersCardsContainer/UsersCardsContainer";
import AdminSideBar from "../../components/--AdminComponents/AdminSideBar";
import AdminComponentContainer from "../../components/--AdminComponents/AdminComponentContainer";

import style from "./AdminPage.module.css";

export default function AdminPage() {
  return (
    <main className={style.mainDiv}>
      <AdminSideBar />
      <AdminComponentContainer />
    </main>
  );
}
