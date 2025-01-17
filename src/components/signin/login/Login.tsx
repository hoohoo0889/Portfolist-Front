import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastError, ToastSuccess } from "../../../hook/toastHook";
import { MAINURL } from "../../../util/api/common";
import { Github, Logo } from "../../../util/assets";
import { mainColor } from "../../../util/css/color/color";
import * as S from "./style";

interface LoginType {
  email: string;
  password: string;
}

const Login = () => {
  //const JWT_EXPIRY_TIME = 10000;
  //const refresh_token = localStorage.getItem("refresh_token_portfolist");
  const { push } = useHistory();

  const [buttonColor, setButtonColor] = useState<boolean>(false);
  const [emailBor, setEmailBor] = useState<boolean>(false);
  const [passwordBor, setPasswordBor] = useState<boolean>(false);
  const [loginInput, setLoginInput] = useState<LoginType>({
    email: "",
    password: "",
  });

  const onGithubHandler = useCallback(() => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=repo:status%20read:repo_hook%20user:email`;
  }, []);

  const { email, password } = loginInput;

  const loginNormal = useMutation("login", () =>
    axios
      .post(`${MAINURL}/login/normal`, loginInput)
      .then((res) => {
        localStorage.setItem("access_token_portfolist", res.data.access_token);
        localStorage.setItem(
          "refresh_token_portfolist",
          res.data.refresh_token
        );
      })
      .then(() => {
        ToastSuccess("로그인에 성공하였습니다.");
        push("/");
      })
      .catch((e) => {
        throw e;
      })
  );

  /* const onClientRefresh = useMutation("refresh", () =>
    axios.post("/refresh", refresh_token).then((res) => console.log(res))
  );
 */
  /*   useEffect(() => {
    setTimeout(() => {
      onClientRefresh.mutate();
    }, JWT_EXPIRY_TIME - 1000);
  }, [onClientRefresh]);
 */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  };

  const onSubmit = (e: any, data: any) => {
    e.preventDefault();

    loginNormal.mutate(data);

    if (loginNormal.isSuccess) {
      ToastSuccess("로그인에 성공하셨습니다.");
      push("/");
    } else if (loginNormal.isError) {
      ToastError("정보를 다시 입력해주세요");
    }
  };

  useEffect(() => {
    email.length >= 4 ? setEmailBor(true) : setEmailBor(false);
    password.length >= 4 ? setPasswordBor(true) : setPasswordBor(false);
    email && password ? setButtonColor(true) : setButtonColor(false);
  }, [email, password]);

  return (
    <S.BackWrapper>
      <ToastContainer />
      <S.Content>
        <Link to="/">
          <img src={Logo} alt="Portfolist 로고" />
        </Link>

        <S.InputWrapper>
          <input
            type="text"
            placeholder="이메일을 입력해주세요"
            name="email"
            value={email}
            onChange={onChange}
            style={{
              borderBottom: emailBor
                ? `2px solid ${mainColor}`
                : `2px solid #c4c4c4`,
            }}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            name="password"
            value={password}
            onChange={onChange}
            style={{
              borderBottom: passwordBor
                ? `2px solid ${mainColor}`
                : `2px solid #c4c4c4`,
            }}
          />
        </S.InputWrapper>
        <S.ButtonWrapper btnColor={buttonColor}>
          <button
            className="login-button"
            onClick={(e) => onSubmit(e, loginInput)}
          >
            login
          </button>
          <S.GitBtn onClick={onGithubHandler}>
            <img src={Github} alt="깃허브 로고"></img>
            <span>Github 로그인</span>
          </S.GitBtn>
        </S.ButtonWrapper>
        <Link to="/sign-up">아직 계정이 없으신가요?</Link>
      </S.Content>
    </S.BackWrapper>
  );
};

export default Login;
