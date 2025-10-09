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
        spacing={2}
        sx={{
          padding: { xs: 2, sm: 2, md: 2, lg: 4 },
        }}
      >
        <Grid
          size={{ xs: 10, sm: 10, md: 10, lg: 10 }}
          offset={{ xs: 1 }}
          sx={{ paddingTop: { xs: 5, sm: 5, md: 10, lg: 4 } }}
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
            Desde primaria hasta formación superior técnica
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: isDark ? "#aaa" : "#6c757d",
              opacity: 0,
              transform: "translateY(20px)",
              animation: "fadeSlideIn 1.2s forwards",
              animationDelay: "0.4s",
            }}
          >
            Nuestra unidad educativa acompaña el crecimiento académico de cada estudiante desde sus primeras etapas hasta su proyección profesional universitaria.
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} offset={{ xs: 0, sm: 0, md: 0, lg: 1 }}>
          <Card
            init="Primary"
            imageurl="/Nivels/Initial.png"
            title="Educación Primaria"
            paragraph="Desarrollo integral de habilidades básicas: lectura, escritura, matemáticas y expresión. Formación con enfoque en pensamiento lógico y valores."
            paragraph1="6 a 11 años"
            paragraph2="Fundamentos académicos"
            paragraph3="Formación integral"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card
            init="Secondary"
            imageurl="/Nivels/Secondary.png"
            title="Educación Secundaria"
            paragraph="Preparación académica intermedia con enfoque en razonamiento crítico, habilidades científicas, y orientación vocacional progresiva."
            paragraph1="12 a 17 años"
            paragraph2="Orientación vocacional"
            paragraph3="Pensamiento crítico"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card
            init="Superior"
            imageurl="/Nivels/Uni.png"
            title="Educación Técnica Superior"
            paragraph="Programas profesionales especializados con acompañamiento docente, prácticas reales y conexión directa con la universidad."
            paragraph1="A partir de 18 años"
            paragraph2="Especialización profesional"
            paragraph3="Proyección universitaria"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4 }} offset={{ xs: 0, sm: 4, md: 4, lg: 5 }}>
          <Button variant="outlined">Ver malla curricular</Button>
        </Grid>
      </Grid>
      <hr />

      {/* Animaciones CSS */}
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
