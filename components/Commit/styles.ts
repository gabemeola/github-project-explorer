import { css } from 'linaria';

export const wrapper = css`
  margin: 15px;
  display: flex;
`;

export const dot = css`
  width: 13px;
  height: 13px;
  border-radius: 30px;
  margin-top: 15px;
  margin-right: 15px;
  background-color: #266b80;
  font-size: 40px;
  position: relative;

  ::before {
    content: '';
    display: block;
    position: relative;
    left: 5px;
    width: 3px;
    height: 100vh;
    background-color: #266b80;
  }
`;

export const commit = css`
  flex: 1;
  border: 1px solid #dcdcdc;
  padding: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`;

export const commitTitle = css`
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 5px;
`;

export const commitBody = css`
  font-weight: 400px;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const info = css`
  font-weight: 400px;
  font-size: 10px;
  color: rgb(24, 27, 29, 0.7);
`;
