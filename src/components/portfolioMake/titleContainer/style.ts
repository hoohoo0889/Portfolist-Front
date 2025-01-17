import styled from "@emotion/styled";

export const MainContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  padding-bottom: 2.5rem;
  border-bottom: #e9e9e9 solid 1px;
`;

export const InputWrapper = styled.div`
  position: relative;
  .Title {
    width: 100%;
    font-size: 35px;
    color: #000000;
  }
  .Introduce {
    width: 100%;
    font-weight: 500;
    font-size: 20px;
    color: #000000;
    margin-top: 30px;
  }
  input::placeholder {
    color: #8b8b8b;
  }
  span {
    position: absolute;
    font-size: 20px;
    color: #ff7878;
  }
  .title-span {
    left: 298px;
    top: -4px;
  }
  .introduce-span {
    left: 236px;
    top: 20px;
  }
`;
