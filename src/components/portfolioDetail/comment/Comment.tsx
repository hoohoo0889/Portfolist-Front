import React, { useCallback, useEffect, useRef, useState } from "react";
import * as S from "./style";
import { reCommentControl } from "../../../modules/atom/portfolio/comment";
import CommentItem from "./CommentItem";
import { useRecoilState } from "recoil";
import { CommentType } from "../../../util/interface/portfolio/commentType";
import { ToastError, ToastSuccess } from "../../../hook/toastHook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getComment, postComment } from "../../../util/api/portfolio/comment";
import { useLocation } from "react-router";
import QueryString from "query-string";

const Comment = () => {
  const [reComment, setReComment] = useRecoilState(reCommentControl);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentContent, setCommentContent] = useState<string>("");
  const commentRef = useRef(null);

  const location = useLocation();
  const queryData = QueryString.parse(location.search);
  const id: any = queryData.id;

  function CommentAdd(content: string, id: number) {
    if (commentRef) {
      postComment(id, content)
        .then(() => {
          ToastSuccess("댓글이 작성되었습니다.");
          getTest();
        })
        .catch((e) => {
          ToastError("댓글 작성에 실패했습니다.");
          console.log(e);
        });
    }
  }

  const getTest = useCallback(() => {
    getComment(id).then((res) => setComments(res.data.comments));
  }, []);

  useEffect(() => {
    getTest();
  }, []);

  return (
    <>
      <ToastContainer />
      <S.CommentWrapper>
        <S.InputWrapper>
          <textarea
            placeholder="댓글을 입력해주세요"
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button onClick={() => CommentAdd(commentContent, id)}>등록</button>
        </S.InputWrapper>
        <S.CommentList>
          <div className="comment-info">
            <span>댓글 {comments?.length}개</span>
          </div>
        </S.CommentList>
        {comments?.length === 0 ? (
          <>작성된 댓글이 없습니다.</>
        ) : (
          <>
            {comments?.map((comment: CommentType) => (
              <>
                <CommentItem
                  key={comment.comment_id}
                  comment={comment}
                  portfolioId={id}
                  getTest={getTest}
                />
                <button
                  className="more_text"
                  onClick={() => setReComment(!reComment)}
                >
                  + 답글 달기
                </button>
                <S.Input
                  reComment={reComment}
                  type="text"
                  placeholder="답글을 작성해 주세요"
                />
              </>
            ))}
          </>
        )}
      </S.CommentWrapper>
    </>
  );
};

export default Comment;
