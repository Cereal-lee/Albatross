import AuthForm from "components/auth/AuthForm";
import AuthTemplate from "components/auth/AuthTemplate";
import { REGISTER } from "constants/symbols";
import { changeField, initForm, register } from "modules/auth";
import { check } from "modules/user";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Register() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  const [err, setErr] = useState("");

  const onChange = (e) => {
    setErr("");
    const { name, value } = e.target;
    dispatch(changeField({ form: REGISTER, name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    //항목이 비어있을경우
    if ([username, password, passwordConfirm].includes("")) {
      setErr("項目をすべて入力してください。");
      return;
    }
    //패스워드랑 패스워드체크가 틀릴때
    if (password !== passwordConfirm) {
      setErr("パスワードが一致していません。");
      dispatch(changeField({ form: REGISTER, name: "password", value: "" }));
      dispatch(
        changeField({ form: REGISTER, name: "passwordConfirm", value: "" })
      );
      return;
    }

    dispatch(register({ username, password }));
    dispatch(initForm(REGISTER));
  };

  useEffect(() => {
    dispatch(initForm(REGISTER));
    return () => dispatch(initForm(REGISTER));
  }, [dispatch]);

  useEffect(() => {
    setErr("");
    if (authError) {
      if (authError.response.status === 409) {
        setErr("入力したIDはすでに使われています。");
        return;
      }
      setErr("会員登録に失敗しました。");
      return;
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
        type={REGISTER}
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={err}
      />
    </AuthTemplate>
  );
}

export default Register;
