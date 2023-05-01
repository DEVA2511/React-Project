import { NoteAPI } from "api/note-api";
import { ButtonPrimary } from "components/Button/buttonPrimary";
import { Header } from "components/Header/Header";
import { withAuthRequired } from "hoc/withAuthRequired";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setNoteList } from "store/notes/note-slice";
import s from "./style.module.css";
export function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function fetchNotes() {
    const noteList = await NoteAPI.fetchAll();
    dispatch(setNoteList(noteList));
  }

  useEffect(() => {
    const unsub = NoteAPI.onShouldSyncNotes(fetchNotes);
    unsub();
  }, []);
  return (
    <div>
      <Header />
      <ButtonPrimary
        className={s.buttonAdd}
        onClick={() => navigate("/notes/new")}
      >
        +
      </ButtonPrimary>
      <div style={{ padding: 50 }}>
        <Outlet />
      </div>
    </div>
  );
}
export const ProtectedApp = withAuthRequired(App);
