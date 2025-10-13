import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

interface PilsProps{
  image: string;
  title: string;
  description: string;
}

export default function Pils({ image, title, description }: PilsProps) {
  return (
    <Card sx={{ width: { xs: "90%", sm: "80%", md: "90%", lg: "18rem"} }}>
        <CardMedia
          component="img"
          sx={{ height: { xs: 180, sm: 180, md: 200, lg: 200 } }}
          image={image}
          alt=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </CardContent>
    </Card>
  );
}