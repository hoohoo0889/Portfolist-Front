import React, { useState } from "react";
import {
  BeforeTouching,
  Flower,
  Profile,
  Touching,
} from "../../../util/assets";
import * as S from "./style";
import { PortListType } from "../../../util/interface/portfolio/portListType";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { MAINURL } from "../../../util/api";

interface Prop {
  list: PortListType;
}

const Tag = ({ field }: any) => {
  return <S.Tag>{field}</S.Tag>;
};

const ListItem = ({ list }: Prop) => {
  const [touchingBoolean, setTouchingBoolean] = useState<boolean>(list.touched);
  const [count, setCount] = useState<number>(list.total_touching);

  function CountChangeHandler(count: number) {
    touchingBoolean ? setCount(count - 1) : setCount(count + 1);
  }

  function TextSliceHandler(txt: string, len: number) {
    if (txt.length > len) {
      txt = txt.substr(0, len) + " ...";
    }

    return txt;
  }

  const touching = useMutation("touching", () =>
    axios.post(
      `${MAINURL}/touching/${list.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "access_token_portfolist"
          )}`,
        },
      }
    )
  );

  const unTouching = useMutation("touching", () =>
    axios.delete(`${MAINURL}/touching/${list.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "access_token_portfolist"
        )}`,
      },
    })
  );

  return (
    <S.ListItemWrapper>
      <div className="portfoilo-img">
        <img src={Flower} alt="포트폴리오 배너" />
      </div>
      <S.Content touchingBoolean={touchingBoolean}>
        <div className="tag-wrapper">
          <div className="tag">
            {list.field.map((field, index) => (
              <Tag key={index} field={field} />
            ))}
          </div>
          <div className="touching">
            <img
              src={touchingBoolean ? Touching : BeforeTouching}
              alt="터칭 아이콘"
              onClick={() => {
                setTouchingBoolean(!touchingBoolean);
                CountChangeHandler(count);
                touchingBoolean ? unTouching.mutate() : touching.mutate();
              }}
            />
            <span>{count === 0 ? "0" : count}</span>
          </div>
        </div>
        <div className="title">
          <Link
            to={`/portfolio/${list.id}`}
            title="포트폴리오 상세 페이지 이동합니다."
          >
            {list.title}
          </Link>
          <span>{TextSliceHandler(list.introduce, 32)}</span>
          <span>댓글 {list.total_comment}</span>
        </div>
        <div className="user-profile">
          <img
            src={
              list.profile_img === null ? `${Profile}` : `${list.profile_img}`
            }
            alt="사용자의 프로필 사진"
          />
          <Link to={`/user-page`} title="유저 페이지 이동합니다.">
            <strong>{list.name}</strong>님이 포트폴리오
          </Link>
        </div>
      </S.Content>
    </S.ListItemWrapper>
  );
};

export default ListItem;
