import React, { useState } from "react";
import * as S from "../../../../util/css/mypage/mypage/mypageModify/style";
import FieldItemBox from "./FieldItemBox";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastError, ToastSuccess } from "../../../../hook/toastHook";
import { FieldType } from "../../../../util/interface/Sign/loginType";
import { patchUserInfo } from "../../../../util/api/mypage";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getFieldSelector } from "../../../../modules/atom/portfolio";
import { isModifyModal } from "../../../../modules/atom/mypage";
import { userInfoValue } from "../../../../modules/selector/user";
import { myIntroduce, myName } from "../../../../modules/atom/mypage/mypage";

const MyInfoModifyDetail = ({ getUserInfo }: any) => {
  const [selectIdArr, setSelectIdArr] = useState<number[]>([]);
  const userInfo = useRecoilValue(userInfoValue);
  const fieldList = useRecoilValue(getFieldSelector);
  const setIsModify = useSetRecoilState(isModifyModal);
  const [name, setName] = useRecoilState(myName);
  const [introduce, setIntroduce] = useRecoilState(myIntroduce);

  const patchUserInfoHandler = () => {
    patchUserInfo(selectIdArr, name, introduce)
      .then(() => {
        ToastSuccess("프로필이 수정되었습니다.");
        getUserInfo();
        setIsModify(false);
      })
      .catch((e) => {
        ToastError("정보를 다시 확인해주세요");
        throw e;
      });
  };

  const fieldSelectHandler = (e: any) => {
    const { value } = e.target;
    if (selectIdArr.length !== 3) {
      if (!selectIdArr.includes(e)) {
        setSelectIdArr([...selectIdArr, value]);
      }
    } else {
      ToastError("분야를 3개 이상 등록할 수 없습니다.");
    }
  };

  return (
    <>
      <ToastContainer />
      <S.ModifyDetailContainer>
        <ToastContainer />
        <S.InputWrapper>
          <input
            type="text"
            placeholder="사용하실 닉네임을 입력하세요"
            defaultValue={userInfo?.name}
            name="name"
            onChange={(e: any) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="자신을 한줄 소개 해주세요"
            defaultValue={userInfo?.introduce}
            name="introduce"
            onChange={(e: any) => setIntroduce(e.target.value)}
          />
        </S.InputWrapper>
        <S.FieldSelecteWrapper>
          <span>
            <b>분야</b>
          </span>
          <select
            onChange={(e) => {
              fieldSelectHandler(e);
            }}
          >
            <option selected disabled hidden>
              분야를 선택하세요
            </option>
            {fieldList.map((field: FieldType, index: number) => (
              <option key={index} value={field.id}>
                {field.content}
              </option>
            ))}
          </select>
          <FieldItemBox
            selectIdArr={selectIdArr}
            setSelectIdArr={setSelectIdArr}
            fieldList={fieldList}
          />
        </S.FieldSelecteWrapper>
        <p>분야는 최대 3개까지 선택할 수 있습니다. </p>
        <S.ButtonContainer>
          <button
            type="button"
            onClick={() => {
              setIsModify(false);
              ToastSuccess("프로필 수정이 취소되었습니다.");
            }}
          >
            취소
          </button>
          <input
            type="submit"
            value="수정 완료"
            onClick={() => patchUserInfoHandler()}
          />
        </S.ButtonContainer>
      </S.ModifyDetailContainer>
    </>
  );
};

export default MyInfoModifyDetail;
