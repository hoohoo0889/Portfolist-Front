import styled from "@emotion/styled";
import arrowimg from "../../../../util/assets/icon/selectedArrow.svg";

export const MainContainer = styled.div`
  display: flex;
`;

export const FieldItemWrapper = styled.div`
  display: flex;
  select {
    width: 150px;
    height: 33px;
    -webkit-appearance: none; /* 네이티브 외형 감추기 */
    -moz-appearance: none;
    appearance: none;
    background: url(${arrowimg}) no-repeat 98% 50%; /* 화살표 모양의 이미지 */
    border-bottom: 3px #ff7659 solid;
    font-size: 17px;
    line-height: 23px;
    color: #000000;
    padding-left: 6px;
    cursor: pointer;
  }
  option {
    cursor: pointer;
  }
`;

export const FieldItemContainer = styled.div`
  margin-left: 15px;
  width: fit-content;
  background: #ff7659;
  border-radius: 20px;
  padding: 8px 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  span {
    font-size: 14px;
    color: white;
  }
  img {
    margin: 0 0 0 10px;
    cursor: pointer;
  }
`;
