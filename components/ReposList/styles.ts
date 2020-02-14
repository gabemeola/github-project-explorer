import { css } from 'linaria';

export const repo = css`
  width: 100%;
  height: 45px;
  border: 1px solid grey;
  margin-bottom: 15px;
  padding: 5px 15px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;

export const info = css`
  font-weight: 400px;
  font-size: 10px;
  color: rgb(24, 27, 29, 0.7);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 220px;
`;
