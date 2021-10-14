import React, { useState } from "react";
import { Magnifier } from "../../../util/assets";
import * as S from "./style";

const SearchInput = () => {
  const [selectText, setSelectText] = useState<boolean>(true);
  return (
    <S.SearchInput>
      <div className="select-box">
        <span onClick={() => setSelectText(!selectText)}>
          {selectText ? "제목" : "사용자"}
        </span>
      </div>
      <input type="text" placeholder="검색어를 입력해주세요" />
      <img src={Magnifier} alt="검색 아이콘" />
    </S.SearchInput>
  );
};

export default SearchInput;