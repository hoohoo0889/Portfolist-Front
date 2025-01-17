import React from "react";
import { useRecoilValue } from "recoil";
import { notificationSelector } from "../../../../modules/selector/user";
import NoticeItem from "./notice/NoticeItem";
import * as S from "./style";

interface NewsItemProps {
  title: string;
}

const NewsItem = ({ title }: NewsItemProps) => {
  const notification = useRecoilValue(notificationSelector);

  return (
    <>
      <S.NewsItemWrapper>
        <S.Title>{title}</S.Title>
        <S.ContentBox>
          {notification?.map((item, index) => (
            <NoticeItem key={index} name={item.name} type={item.type} />
          ))}
        </S.ContentBox>
      </S.NewsItemWrapper>
    </>
  );
};

export default NewsItem;
