import React from "react";
import { Profile } from "../../../util/assets";
import * as S from "./style";
import { CommentType } from "../../../util/interface/main/commentType";

interface Prop {
  comment: CommentType;
}

const CommentItem = ({ comment }: Prop) => {
  return (
    <S.CommentItemWrapper>
      <div className="comment">
        <S.Content>
          <img src={Profile} alt="프로필 사진" />
          <div className="content">
            <div className="user-name">
              <strong>침착맨</strong>
              <div className="comment-date">
                <span>2021-09-26</span>
              </div>
            </div>
            <p>{comment.comment_content}</p>
          </div>
        </S.Content>
        <S.Util>
          <span>삭제</span>
          <span>신고</span>
        </S.Util>
      </div>
      {comment.re_comment.map((re_comment) => (
        <S.ReComment>
          <S.Content>
            <img src={Profile} alt="프로필 사진" />
            <div className="content">
              <div className="user-name">
                <strong>{re_comment.user.rc_name}</strong>
                <div className="comment-date">
                  <span>{re_comment.rc_date}</span>
                </div>
              </div>
              <p>{re_comment.re_comment_content}</p>
            </div>
          </S.Content>
          <S.Util>
            <span>삭제</span>
            <span>신고</span>
          </S.Util>
        </S.ReComment>
      ))}
    </S.CommentItemWrapper>
  );
};

export default CommentItem;