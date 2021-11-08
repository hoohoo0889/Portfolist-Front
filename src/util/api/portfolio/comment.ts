import request, { token } from "../index";

export async function getComment(id: number) {
  return await request({
    url: `/comment/${id}`,
    method: "get",
    headers: { Authorization: token },
  });
}

export const postComment = async (id: number, content: string) => {
  return await request({
    url: `/comment/${id}`,
    method: "post",
    data: { content: content },
    headers: { Authorization: token },
  });
};

export const deleteComment = async (id: number) => {
  return await request({
    url: `/comment/${id}`,
    method: "delete",
    headers: { Authorization: token },
  });
};