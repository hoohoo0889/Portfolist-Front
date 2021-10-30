import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import * as S from "./style";
import { useMutation, useQuery } from "react-query";
import CommentItem from "./CommentItem";
import { CommentType } from "../../../util/interface/portfolio/commentType";
import { ToastSuccess } from "../../../hook/toastHook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getComment, postComment } from "../../../util/api/portfolio/comment";
import { commentList } from "../../../modules/atom/portfolio/comment";

interface Props {
  id: number;
}

const Comment = ({ id }: Props) => {
  const [comments, setComments] = useRecoilState(commentList);
  const [commentContent, setCommentContent] = useState<string>("");

  const commentAdd = useMutation((content: string) => postComment(2, content));
  const { data } = useQuery("comment", () => getComment(2));

  // 댓글 작성
  function CommentAdd(content: any) {
    commentAdd.mutate(content);
    ToastSuccess("댓글이 작성되었습니다.");
  }

  useEffect(() => {
    setComments(data?.data.comments);
    console.log(data?.data.comments);
  }, [data?.data, setComments, comments]);

  return (
    <>
      <ToastContainer />
      <S.CommentWrapper>
        <S.InputWrapper>
          <textarea
            placeholder="댓글을 입력해주세요"
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button onClick={() => CommentAdd(commentContent)}>등록</button>
        </S.InputWrapper>
        <S.CommentList>
          <div className="comment-info">
            <span>댓글 {comments?.length}개</span>
          </div>
        </S.CommentList>
        {comments?.map((comment: CommentType) => (
          <CommentItem key={comment.comment_id} comment={comment} />
        ))}
        {comments?.length === 0 ? <>작성된 댓글이 없습니다.</> : ""}
        {comments?.length >= 5 ? <S.MoreButton>더보기</S.MoreButton> : ""}
      </S.CommentWrapper>
    </>
  );
};

export default Comment;
