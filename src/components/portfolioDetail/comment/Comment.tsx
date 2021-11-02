import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as S from "./style";
import CommentItem from "./CommentItem";
import { CommentType } from "../../../util/interface/portfolio/commentType";
import { ToastSuccess } from "../../../hook/toastHook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getComment, postComment } from "../../../util/api/portfolio/comment";
import { getCommentList } from "../../../modules/atom/portfolio/comment";
import { portfolioId } from "../../../modules/atom/portfolio";

const Comment = () => {
  const id = useRecoilValue(portfolioId);
  const [comments, setComments] = useRecoilState(getCommentList);
  const [commentContent, setCommentContent] = useState<string>("");
  const commentRef = useRef(null);

  function CommentAdd(content: any, id: number) {
    const ref = commentRef.current.value;
    postComment(id, content)
      .then(() => {
        getTest();
      })
      .catch((e) => {
        throw e;
      });
    ToastSuccess("댓글이 작성되었습니다.");
  }

  const getTest = useCallback(() => {
    getComment(id)
      .then((res) => setComments(res.data))
      .catch(() => {
        setComments([]);
        return;
      });
  }, [id, setComments]);

  useEffect(() => {
    getTest();
  }, [getTest]);

  return (
    <>
      <ToastContainer />
      <S.CommentWrapper>
        <S.InputWrapper>
          <textarea
            placeholder="댓글을 입력해주세요"
            onChange={(e) => setCommentContent(e.target.value)}
            ref={commentRef}
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
              <CommentItem key={comment.comment_id} comment={comment} />
            ))}
            {comments?.length >= 5 ? <S.MoreButton>더보기</S.MoreButton> : ""}
          </>
        )}
      </S.CommentWrapper>
    </>
  );
};

export default Comment;
