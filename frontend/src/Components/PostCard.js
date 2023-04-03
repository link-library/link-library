import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

export const PostCard = ({
  id,
  title,
  url,
  description,
  category,
  onDelete,
}) => {
  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <Card
      sx={{
        maxWidth: 230,
        height: 320,
        position: 'relative',
      }}
    >
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>M</Avatar>}
        action={
          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        }
        title={title}
        subheader="2023 04 03"
      />
      <CardMedia
        component="img"
        height="140"
        image="/images/LinkLibraryLogo.png"
        alt="이미지"
        sx={{
          border: '2px solid black',
          boxSizing: 'border-box',
        }}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            height: '60px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
      >
        <IconButton>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
