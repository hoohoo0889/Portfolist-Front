import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { Logo, Magnifier } from "../../../util/assets";
import * as S from "./style";
import SubMenu from "./SubMenu";
import Notiication from "./notification/Notiication";
import { useRecoilState, useSetRecoilState } from "recoil";
import { searchBar } from "../../../modules/atom/header";
import { searchValue } from "../../../modules/atom/portfolio/search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reload } from "../../../modules/atom/auth";
import LoginCompontent from "./loginCompontent";

const Header = () => {
  const [selectText, setSelectText] = useState<boolean>(true);
  const [isFocusing, setIsFocusing] = useRecoilState(searchBar);
  const [test, setTest] = useRecoilState(reload);

  const setSearchText = useSetRecoilState(searchValue);
  const searchInputRef = useRef<any>(null);
  const history = useHistory();
  const token = localStorage.getItem("access_token_portfolist");

  const searchHandler = (e: any) => {
    if (e.key === "Enter") {
      history.push(
        `list?page=0&size=10&field=&sort=date&query=${e.target.value}&searchType=`
      );
      setSearchText("");
    }
  };

  if (test === 1) {
    window.location.reload();

    if (token === null) {
      setTest(0);
    }
  }

  const focusOn = useCallback(() => {
    setIsFocusing(true);
  }, [setIsFocusing]);

  const focusOff = useCallback(() => {
    setIsFocusing(false);
  }, [setIsFocusing]);

  useEffect(() => {
    if (isFocusing) {
      searchInputRef.current.focus();
    }
  }, [history, isFocusing]);

  return (
    <>
      <ToastContainer />
      <S.HeaderWrapper>
        {token !== null ? (
          <S.Container>
            <div className="logo">
              <Link to="/">
                <img src={Logo} alt="포트폴리스트 로고" />
              </Link>
              <Link
                to="list?page=0&size=10&field=&sort=date&query=&searchType="
                className="list-item"
              >
                <span>포트폴리오</span>
              </Link>
              <Link to="/portfolio-make" className="list-item">
                <span>포트폴리오 제작</span>
              </Link>
            </div>
            <ul>
              <li>
                <img
                  className="magnifier-img"
                  src={Magnifier}
                  alt="검색 아이콘"
                  onClick={focusOn}
                />
              </li>
              <Notiication />
              <SubMenu />
            </ul>
          </S.Container>
        ) : (
          <LoginCompontent /> // 시작하기 컴포넌트
        )}
        <S.MagnifierWrapper isFocusing={isFocusing}>
          <S.Input onChange={(e) => searchHandler(e)}>
            <select
              name="제목"
              defaultValue="제목"
              onChange={() => setSelectText(!selectText)}
            >
              <option value="사용자"></option>
            </select>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="검색어를 입력해주세요"
              onBlur={focusOff}
              onKeyPress={(e) => searchHandler(e)}
            />
            <img src={Magnifier} alt="검색아이콘" />
          </S.Input>
        </S.MagnifierWrapper>
      </S.HeaderWrapper>
    </>
  );
};

export default withRouter(Header);
