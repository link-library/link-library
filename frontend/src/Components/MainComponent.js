import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedCategoryNameState } from '../atoms';
import FilterTab from './FilterTab';
import { Box, Grid } from '@mui/material';
import { PostCard } from './PostCard';

export const MainComponent = () => {
  const selectedCategoryName = useRecoilValue(selectedCategoryNameState);

  const [postcards, setPostcards] = useState([]);
  const handleAddPostcard = (postcardData) => {
    setPostcards((prevPostcards) => [...prevPostcards, postcardData]);
  };

  return (
    <Box>
      <Box sx={{ flexGrow: 1, marginLeft: '20px' }}>
        <h1>{selectedCategoryName}</h1>
        <p>링크 카드 배치</p>
        <FilterTab handleAddPostcard={handleAddPostcard} />
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, minmax(230px, 1fr))',
            gap: '10px',
            overflowY: 'auto',
            maxHeight: '100vh',
            paddingTop: '30px',
            paddingLeft: '50px',
          }}
        >
          {postcards.map((postcard, index) => (
            <Grid item key={index}>
              <PostCard>
                title={postcard.name}
                url={postcard.url}
                description={postcard.description}
                category={postcard.category}
              </PostCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
export default MainComponent;
