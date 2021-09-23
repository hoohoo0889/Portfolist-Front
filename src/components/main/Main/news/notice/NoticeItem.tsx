import React from "react";
import { NoticeMent } from "../../../../../hook/noticeMentHook";
import { NewIcon } from "../../../../../util/assets";
import * as S from "./style";

const NoticeItem = () => {
  return (
    <S.NoticeItem>
      <img src={NewIcon} alt="new 아이콘" />
      <S.Content>{NoticeMent("TOUCHING", "곽도현")}</S.Content>
    </S.NoticeItem>
  );
};

export default NoticeItem;