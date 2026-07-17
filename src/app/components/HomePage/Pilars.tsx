import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import Paragrafth from "./Paragrafth";
import Pils from "./Pils";

type PilarData = {
  image: string;
  title: string;
  description: string;
};

const PILARES: PilarData[] = [
  {
    image: "/Pils-1.jpg",
    title: "Fe",
    description:
      "La fe es un pilar fundamental en nuestra institución, fomentando la espiritualidad y el respeto por las creencias de cada individuo.",
  },
  {
    image: "/Pils-2.jpg",
    title: "Respeto",
    description:
      "El respeto es un pilar fundamental en nuestra institución, fomentando la convivencia y el entendimiento entre todos.",
  },
  {
    image: "/Pils-3.jpg",
    title: "Responsabilidad",
    description:
      "La responsabilidad es un pilar fundamental en nuestra institución, fomentando la autonomía y el compromiso con el aprendizaje.",
  },
  {
    image: "/Pils-4.jpg",
    title: "Disciplina",
    description:
      "La disciplina es un pilar fundamental en nuestra institución, fomentando la responsabilidad y el respeto por las normas.",
  },
];

function Pilars() {
  return (
    <Box component="section">
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.8rem", sm: "2rem", md: "2.6rem" },
            mb: 2,
            color: "#FFE05C",
            transition: "color 0.4s ease",
          }}
        >
          Nuestros Pilares
        </Typography>
        <Paragrafth text="Los valores que fundamentan nuestra propuesta educativa y forman el carácter de nuestros estudiantes." />
      </Box>

      <Grid container spacing={2} justifyContent="center">
        {PILARES.map((pilar) => (
          <Grid
            key={pilar.title}
            size={{ xs: 12, sm: 6, md: 4, lg: 2.5 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box sx={{ width: "100%", maxWidth: { xs: 340, sm: "none" }, mx: "auto" }}>
              <Pils image={pilar.image} title={pilar.title} description={pilar.description} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Pilars;