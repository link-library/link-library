import React from 'react';
import { useRecoilValue } from 'recoil';
import { selectedCategoryNameState } from '../atoms';

export const MainComponent = () => {
  const selectedCategoryName = useRecoilValue(selectedCategoryNameState);

  return (
    <div style={{ flexGrow: 1, marginLeft: '20px' }}>
      <h1>{selectedCategoryName}</h1>
      <p>링크 카드 배치</p>
    </div>
  );
};
export default MainComponent;
