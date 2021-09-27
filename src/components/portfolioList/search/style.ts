import styled from "@emotion/styled";
import { loginTextColor } from "../../../util/css/color/color";
import { SearchProp } from "../../../util/interface/main/mainType";

export const SearchWrapper = styled.div`
  width: 100%;
  height: 100px;
  border-bottom: 2px solid #f0f0f0;
  display: flex;
  flex-direction: row;
  align-items: center;

  .field-select {
    display: flex;
    flex-direction: column;
    position: absolute;
    margin-left: 5%;
  }
`;

export const FieldSelectWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    color: ${loginTextColor};
    font-size: 18px;
  }

  .categoy_wrap {
    max-width: 230px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    p {
      padding-bottom: 2px;
      width: 100%;
      transition: all 0.3s;
    }
  }
`;

export const ArrowImg = styled.img`
  width: 15px;
  margin-left: 8px;
  cursor: pointer;
  transition: all 0.5s;
`;

export const FieldWrapper = styled.div`
  margin-left: 15%;
  display: flex;
  flex-direction: row;
`;

export const FieldItemWrapper = styled.div`
  margin: 0 10px;
  background: #ff7659;
  border-radius: 20px;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  span {
    font-size: 15px;
    color: white;
  }

  img {
    margin: 0 0 0 10px;
    cursor: pointer;
  }
`;

// 필드 선택 아이템 스타일
export const FieldSelectItemWrapper = styled.ul`
  width: 230px;
  overflow: auto;
  background: #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 2px 5px rgba(163, 163, 163, 0.25);
  flex-direction: column;
  transition: all 0.5s;
  position: absolute;
  top: 28px;
  border: ${({ arrowSelect }: SearchProp) =>
    arrowSelect ? "1px solid #eaeaea" : "none"};

  li {
    text-align: center;
    padding: 3px;
    cursor: pointer;
  }
`;