"use client";
import React from "react";
import Grid from "@mui/material/Grid";
import { Typography, Button, useTheme, Box } from "@mui/material";
import Card from "./Card";

function Nivels() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <>
      <Box sx={{ my: 6, borderTop: '1px solid', borderColor: isDark ? '#333' : '#ccc' }} />

      <Grid
        id="Niveles"
        container
        spacing={4}
        sx={{ px: { xs: 2, sm: 4, md: 6, lg: 10 }, pt: 6 }}
        justifyContent="center"
      >
        {/* Encabezado */}
        <Grid
          size={{ xs: 12, sm: 10, md: 10, lg: 12 }}
          sx={{ textAlign: 'center' }}
        >
          <Typography
            variant="h4"
            sx={{
              color: isDark ? "#fff" : "#01579b",
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", md: "2rem" },
              lineHeight: 1.5,
              opacity: 0,
              transform: "translateY(20px)",
              animation: "fadeSlideIn 0.8s forwards",
            }}
          >
            Conoce nuestra propuesta educativa integral
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: isDark ? "#ddd" : "black",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              lineHeight: 2,
              opacity: 0,
              transform: "translateY(20px)",
              animation: "fadeSlideIn 1s forwards",
              animationDelay: "0.2s",
            }}
          >
            Modelo educativo científico vocacional a temprana edad
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: isDark ? "#aaa" : "#6c757d",
              maxWidth: "800px",
              mx: "auto",
              mt: 2,
              opacity: 0,
              transform: "translateY(20px)",
              animation: "fadeSlideIn 1.2s forwards",
              animationDelay: "0.4s",
            }}
          >
            Formar integralmente a niños, niñas, adolescentes como futuros científicos, investigadores y creadores de conocimiento, estimulando la innovación, el pensamiento crítico, la vocación temprana, en un modelo educativo articulado la escuela con la universidad, orientado al desarrollo sostenible y al bienestar de la comunidad.
          </Typography>
        </Grid>
        {/* Cards */}
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3.5 }}>
          <Card
            init="Primary"
            imageurl="/Nivels/Primary.png"
            title="Educación primaria vocacional"
            paragraph="Brindar a los niños, niñas una educación integral que combine los contenidos académicos básicos con experiencias vocacionales tempranas, desarrollando habilidades, talentos por distintas áreas del conocimiento, para orientar sus intereses y prepararlos para la educación secundaria y la futura vida profesional."
            paragraph1="6 a 11 años"
            paragraph2="Fundamentos académicos"
            paragraph3="Formación integral"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3.5 }}>
          <Card
            init="Secondary"
            imageurl="/Nivels/Secondaryy.png"
            title="Educación secundaria especializada"
            paragraph="Formar adolescentes con una educación integral que combine conocimientos académicos generales con competencias especializadas en áreas científicas, técnicas, artísticas o productivas, preparándolos para la educación superior universitaria y la vida profesional, con la participación activa en la sociedad."
            paragraph1="12 a 17 años"
            paragraph2="Orientación vocacional"
            paragraph3="Pensamiento crítico"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3.5 }}>
          <Card
            init="Superior"
            imageurl="/Nivels/Uni.jpg"
            title="Educación Universitaria Cientifica"
            paragraph="Formar profesionales y científicos altamente capacitados, con pensamiento crítico, habilidades investigativas, creatividad e innovación, capaces de generar y aplicar conocimientos científicos, tecnológico para resolver problemas sociales, productivos, ambientales, contribuyendo al desarrollo sostenible, al bienestar de la comunidad y al progreso del país."
            paragraph1="A partir de 18 años"
            paragraph2="Especialización profesional"
            paragraph3="Proyección universitaria"
          />
        </Grid>

        {/* Botón */}
        <Grid
          size={{ xs: 12, sm: 8, md: 6, lg: 4 }}
          sx={{ textAlign: 'center', mt: 4 }}
        >
          <Button
            variant="outlined"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
              borderColor: isDark ? '#fff' : '#01579b',
              color: isDark ? '#fff' : '#01579b',
              '&:hover': {
                backgroundColor: isDark ? '#333' : '#01579b',
                color: '#fff',
              },
            }}
          >
            Ver malla curricular
          </Button>
        </Grid>
      </Grid>

      <hr />

      {/* Animaciones */}
      <style>{`
        @keyframes fadeSlideIn {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export default Nivels;
