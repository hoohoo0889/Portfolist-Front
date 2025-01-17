import React, { useEffect } from "react";
import * as S from "./style";
import ImageWrapper from "./imageWrapper/ImageWrapper";
import ContentWrapper from "./contentWrapper/ContentWrapper";
import { MinusButton } from "../../../util/assets";
import { useRecoilState } from "recoil";
import {
  container_list_atom,
  portfolioMakeList,
} from "../../../modules/atom/portfolioPost";
import { ToastError } from "../../../hook/toastHook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImageContainerList = () => {
  const [containerList, setContainerList] = useRecoilState(container_list_atom);
  const [portfolioMakeArr, setPortfolioMakeArr] =
    useRecoilState(portfolioMakeList);

  useEffect(() => {
    setPortfolioMakeArr({
      ...portfolioMakeArr,
      container_list: containerList,
    });
  }, [containerList]);

  const addContainerListItem = () => {
    // 컨테이너를 추가하는 함수
    setContainerList((value: any) => [
      ...value,
      {
        container_title: "",
        container_text_list: [
          {
            box_title: "",
            box_content: "",
          },
        ],
        container_img_list: [],
      },
    ]);
  };

  const removeContainerList = (index: number) => {
    if (containerList.length <= 1) {
      ToastError("최소 1개의 리스트가 필요합니다.");
    } else {
      setContainerList(
        containerList?.filter((value: any, i: number) => {
          return index !== i;
        })
      );
    }
  };

  const onChangeTitle = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setContainerList(
      containerList.map((value: any, i: number) => {
        if (i === index) {
          return {
            ...containerList[index],
            container_title: e.target.value,
          };
        } else {
          return value;
        }
      })
    );
  };

  return (
    <S.MainWrapper className="make-container">
      <ToastContainer />
      <header>
        <button type="button" onClick={addContainerListItem}>
          + Add new list
        </button>
      </header>
      {containerList.map((value: any, index: number) => {
        const { container_title } = value;
        return (
          <S.ImageWrapeerList key={index}>
            <header>
              <input
                type="text"
                className="Title"
                value={container_title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChangeTitle(e, index);
                }}
                placeholder="자신만의 특별한 경험(경력, 인턴, 교육 등)이 있다면 입력해주세요."
              />
              <img
                src={MinusButton}
                className="MinusButton"
                onClick={() => {
                  removeContainerList(index);
                }}
                alt="삭제버튼"
              />
            </header>
            <S.ImageListSection>
              <ImageWrapper identity={index} />
              <ContentWrapper parent_index={index} />
            </S.ImageListSection>
          </S.ImageWrapeerList>
        );
      })}
    </S.MainWrapper>
  );
};

export default ImageContainerList;
