import React, { useState, useEffect } from "react";
import { MinusButton } from "../../../../util/assets";
import * as S from "./style";
import { ToastSuccess, ToastError } from "../../../../hook/toastHook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState } from "recoil";
import { container_list_atom } from "../../../../modules/atom/portfolioPost";

const ContentWrapper = (props: any) => {
  const { parent_index } = props;
  const [containerList, setContainerList] = useRecoilState(container_list_atom);

  useEffect(() => {
    console.log(containerList);
  }, [containerList]);

  const onChangeContainerTextList = (
    e: any,
    parent_index: number,
    index: number
  ) => {
    const { name, value } = e.target;
    setContainerList(
      containerList.map((item: any, i: number) => {
        console.log(item);
        if (parent_index === i) {
          let newList = containerList[parent_index].container_text_list.map(
            (child_item: any, child_index: number) => {
              if (child_index === index) {
                return {
                  ...child_item,
                  [name]: value,
                };
              } else {
                return child_item;
              }
            }
          );
          return {
            ...item,
            container_text_list: newList,
          };
        } else {
          return item;
        }
      })
    );
  };

  const DeleteContainerText = (parent_index: number, index: number) => {
    if (containerList[parent_index].container_text_list.length <= 1) {
      ToastError("삭제할 수 없습니다");
    } else {
      let newList = containerList[parent_index].container_text_list?.filter(
        (value: any, i: number) => {
          return i !== index;
        }
      );
      setContainerList((containerList: any) => [
        { ...containerList[parent_index], container_text_list: newList },
      ]);
    }
  };

  const addContainerText = (parent_index: number) => {
    setContainerList(
      containerList.map((value: any, i: number) => {
        if (parent_index === i) {
          return {
            ...containerList[parent_index],
            container_text_list: [
              ...containerList[parent_index].container_text_list,
              {
                box_title: "",
                box_content: "",
              },
            ],
          };
        } else {
          return value;
        }
      })
    );
  };

  return (
    <S.ContentContainer>
      <ToastContainer />
      {containerList[parent_index].container_text_list?.map(
        (value: any, index: number) => {
          const { box_content, box_title } = value;
          return (
            <S.BoxItem key={index}>
              <div className="Title">
                <input
                  placeholder="제목을 입력해주세요."
                  name="box_title"
                  value={box_title}
                  onChange={(e: any) => {
                    onChangeContainerTextList(e, parent_index, index);
                  }}
                />
                <img
                  src={MinusButton}
                  alt="MinusButton"
                  onClick={() => {
                    DeleteContainerText(parent_index, index);
                  }}
                />
              </div>
              <textarea
                placeholder="내용을 입력해주세요."
                className="Content"
                name="box_content"
                value={box_content}
                onChange={(e: any) => {
                  onChangeContainerTextList(e, parent_index, index);
                }}
              ></textarea>
              {index + 1 <
              containerList[parent_index].container_text_list.length ? (
                ""
              ) : (
                <span
                  className="addContent"
                  onClick={() => {
                    addContainerText(parent_index);
                  }}
                >
                  내용 추가
                </span>
              )}
            </S.BoxItem>
          );
        }
      )}
    </S.ContentContainer>
  );
};

export default ContentWrapper;
