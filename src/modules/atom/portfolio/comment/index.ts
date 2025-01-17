import { atom, atomFamily, selectorFamily } from "recoil";
import { getComment } from "../../../../util/api/portfolio/comment";
import { CommentType } from "../../../../util/interface/portfolio/commentType";

export const commentList = atomFamily<CommentType[], number>({
  key: "commentList",
  default: [],
});

export const commentContent = atom<string>({
  key: "commentContent",
  default: "",
});

export const commentReoprt = atom<boolean>({
  key: "commentReoprt",
  default: false,
});

export const commentListSelector = selectorFamily<CommentType[], any>({
  key: "comments/get",
  get: (id) => async () => {
    try {
      const res = await getComment(id);
      return res.data.comments;
    } catch (e) {
      console.log(e);
    }
  },
  set:
    (id) =>
    ({ set }, newValue) => {
      set(commentList(id), newValue);
    },
});
