import React, { useState } from "react";
import {
  MainWrapper,
  FieldWrapper,
} from "../../../../util/css/mypage/mypage/mypageModify/style";
import { ModifyPensil } from "../../../../util/assets/index";
import MyInfoModifyDetail from "./MyInfoModifyDetail";

const MyInfoModify = () => {
  const [isModify, setIsModify] = useState<boolean>(false);
  return (
    <>
      {!isModify ? (
        <MainWrapper>
          <h1>침착맨</h1>
          <p>안녕하세요 저는 침착맨 입니다</p>
          <FieldWrapper>
            <span>
              <b>분야</b>
            </span>
            <span>프론트엔드</span>
          </FieldWrapper>
          <img
            src={ModifyPensil}
            onClick={() => {
              setIsModify(true);
            }}
            alt="수정이미지"
          />
        </MainWrapper>
      ) : (
        <MyInfoModifyDetail setIsModify={setIsModify} />
      )}
    </>
  );
};

export default MyInfoModify;