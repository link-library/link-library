import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedCategoryNameState } from '../atoms';
import FilterTab from './FilterTab';
import { Box, Grid, Typography } from '@mui/material';
import { PostCard } from './PostCard';

export const MainComponent = () => {
  const selectedCategoryName = useRecoilValue(selectedCategoryNameState);

  const [postcards, setPostcards] = useState([]);
  const handleAddPostcard = (postcardData) => {
    const newPostcard = { id: Date.now(), ...postcardData };
    setPostcards((prevPostcards) => [...prevPostcards, newPostcard]);
  };

  const handleDelete = (id) => {
    setPostcards(postcards.filter((postcard) => postcard.id !== id));
  };

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: '20px',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
      >
        <Typography variant="h4" component="h4" sx={{ paddingTop: '20px' }}>
          {selectedCategoryName}
        </Typography>
        <Typography>링크 카드 배치</Typography>
        <FilterTab handleAddPostcard={handleAddPostcard} />
      </Box>
      <Box
        sx={{
          marginTop: 2,
          overflowY: 'auto',
          height: 'calc(100vh - 150px)',
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, minmax(230px, 1fr))',
            gap: '10px',
            paddingTop: '30px',
            paddingLeft: '50px',
          }}
        >
          {postcards.map((postcard) => (
            <Grid item key={postcard.id}>
              <PostCard
                key={postcard.id}
                id={postcard.id}
                title={postcard.title}
                url={postcard.url}
                description={postcard.description}
                category={postcard.category}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
export default MainComponent;
