import { css } from 'linaria';

export const wrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 400px;
  margin: 0 auto;

  button {
    width: 80px;
    height: 40px;
    border: 1px solid #dcdcdc;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    cursor: pointer;
  }

  button[data-active='true'] {
    background-color: #266b80;
    color: white;
  }
`;
