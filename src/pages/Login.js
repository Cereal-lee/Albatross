import { check } from "modules/user";
import { LOGIN } from "constants/symbols";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import AuthTemplate from "../components/auth/AuthTemplate";
import { changeField, initForm, login } from "../modules/auth";

const Login = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  const [err, setErr] = useState("");

  const onChange = (e) => {
    setErr("");
    const { name, value } = e.target;
    dispatch(changeField({ form: LOGIN, name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    if (authError) return;
    dispatch(login({ username, password }));
    dispatch(initForm(LOGIN));
  };

  useEffect(() => {
    dispatch(initForm(LOGIN));
    return () => dispatch(initForm(LOGIN));
  }, [dispatch]);

  useEffect(() => {
    setErr("");
    if (authError) {
      setErr("ID、パスワードを確認してください。");
    }
    if (auth) {
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history("/");
    }

    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log("error");
    }
  }, [user, history]);

  return (
    <AuthTemplate>
      <AuthForm
        type={LOGIN}
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={err}
      />
    </AuthTemplate>
  );
};

export default Login;
