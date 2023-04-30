import { ButtonPrimary } from "components/Button/buttonPrimary";
import s from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "components/Input/Input";
import { AuthLayout } from "Layout/AuthLayout/AuthLayout";
import { useState } from "react";
import { AuthAPI } from "api/auth";
import { setUser } from "store/auth/auth-slice";
import { useDispatch } from "react-redux";
import { toast } from "utills/sweet-alert";

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    if (password == password1) {
      try {
        const user = await AuthAPI.signup(email, password);
        dispatch(setUser(user));
        await toast("success", "signup succeed, you are sign in..");
        navigate("/");
      } catch (err) {
        console.log("Auth Failed");
        toast("error", err.message);
      }
    } else {
      toast("error", "Password is don't match..");
    }
  };

  const form = (
    <div className={s.formContainer}>
      <h2 className={s.title}>
        Signup <br />
        to access your team notes
      </h2>
      <form onSubmit={submit} className={s.formGroup}>
        <Input placeholder={"Email"} onTextChange={setEmail} />
        <Input
          placeholder={"Password"}
          type="password"
          onTextChange={setPassword}
        />
        <Input
          placeholder={"Conform Password"}
          type="password"
          onTextChange={setPassword1}
        />
        <ButtonPrimary type="submit" className={s.button}>
          Signup!
        </ButtonPrimary>
        <span>
          Already have an account yet ? <Link to={"/signin"}>Signup</Link>
        </span>
      </form>
    </div>
  );
  return <AuthLayout>{form}</AuthLayout>;
}
