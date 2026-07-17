import * as React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTheme } from "@mui/material/styles";

interface MediaCardProps {
  title: string;
  paragraph: string;
  imageurl: string;
  init: string;
  /** Lista de bullets/features. Reemplaza a paragraph1/2/3. */
  features: string[];
  /** Opcional: qué pasa al hacer click en la card (navegación, modal, etc). */
  onClick?: () => void;
}

export default function MediaCard({
  title,
  paragraph,
  imageurl,
  init,
  features,
  onClick,
}: MediaCardProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const accent = isDark ? "#facc15" : "#01579b";

  return (
    <Card sx={{ width: { xs: "90%", sm: "90%", md: "100%", lg: "85%" } }}>
      <CardActionArea onClick={onClick} disabled={!onClick}>
        <CardMedia
          component="img"
          sx={{ height: { xs: 150, sm: 180, md: 200, lg: 200 }, objectFit: "cover" }}
          image={imageurl}
          alt={title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="caption"
            component="div"
            sx={{ fontWeight: "bold", color: accent }}
          >
            {init}
          </Typography>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
            >
              {title}
            </Typography>
            <CallMadeIcon sx={{ fontSize: "1rem", color: "text.secondary" }} />
          </Box>

          <Typography
            gutterBottom
            variant="body2"
            sx={{ color: "text.secondary", fontSize: "0.8rem" }}
          >
            {paragraph}
          </Typography>

          <Box>
            {features.map((text) => (
              <Box key={text} display="flex" alignItems="center" mb={0.5}>
                <CheckCircleIcon sx={{ fontSize: "1rem", color: accent, marginRight: "4px" }} />
                <Typography variant="body2" sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}