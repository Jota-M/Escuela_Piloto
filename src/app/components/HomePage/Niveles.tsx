"use client";
import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Typography, useTheme, Box } from "@mui/material";
import Card from "./Card";

// --- Datos de las cards extraídos como configuración (evita repetir el JSX) ---
type NivelData = {
  init: string;
  imageurl: string;
  title: string;
  paragraph: string;
  features: string[];
};

const NIVELES: NivelData[] = [
  {
    init: "Primary",
    imageurl: "/Nivels/Primary.png",
    title: "Educación primaria vocacional",
    paragraph:
      "Brindar a los niños, niñas una educación integral que combine los contenidos académicos básicos con experiencias vocacionales tempranas, desarrollando habilidades, talentos por distintas áreas del conocimiento, para orientar sus intereses y prepararlos para la educación secundaria y la futura vida profesional.",
    features: ["6 a 11 años", "Fundamentos académicos", "Formación integral"],
  },
  {
    init: "Secondary",
    imageurl: "/Nivels/Secondaryy.png",
    title: "Educación secundaria especializada",
    paragraph:
      "Formar adolescentes con una educación integral que combine conocimientos académicos generales con competencias especializadas en áreas científicas, técnicas, artísticas o productivas, preparándolos para la educación superior universitaria y la vida profesional, con la participación activa en la sociedad.",
    features: ["12 a 17 años", "Orientación vocacional", "Pensamiento crítico"],
  },
  {
    init: "Superior",
    imageurl: "/Nivels/Uni.jpg",
    title: "Educación Universitaria Científica",
    paragraph:
      "Formar profesionales y científicos altamente capacitados, con pensamiento crítico, habilidades investigativas, creatividad e innovación, capaces de generar y aplicar conocimientos científicos, tecnológico para resolver problemas sociales, productivos, ambientales, contribuyendo al desarrollo sostenible, al bienestar de la comunidad y al progreso del país.",
    features: ["A partir de 18 años", "Especialización profesional", "Proyección universitaria"],
  },
];

// --- Hook simple para animar solo cuando la sección entra al viewport ---
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // solo se anima una vez
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Nivels() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { ref, inView } = useInView<HTMLDivElement>();

  // Estilo de animación reutilizable (antes duplicado 3 veces)
  const fadeIn = (delaySec: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.7s ease ${delaySec}s, transform 0.7s ease ${delaySec}s`,
  });

  return (
    <Box ref={ref}>
      <Divider sx={{ my: 6, borderColor: isDark ? "#333" : "#ccc" }} />

      <Grid
        id="Niveles"
        component="section"
        container
        spacing={4}
        sx={{ px: { xs: 2, sm: 4, md: 6, lg: 10 }, pt: 6 }}
        justifyContent="center"
      >
        {/* Encabezado */}
        <Grid size={{ xs: 12, sm: 10, md: 10, lg: 12 }} sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              color: isDark ? "#01579b" : "#fff",
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", md: "2rem" },
              lineHeight: 1.5,
              ...fadeIn(0),
            }}
          >
            Conoce nuestra propuesta {" "}
            <Box component="span" sx={{ color: "#facc15" }}>
              educativa integral
            </Box>
          </Typography>

          <Typography
            variant="h5"
            component="p"
            sx={{
              color: isDark ? "#e0e0e0" : "#222222",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              lineHeight: 2,
              ...fadeIn(0.15),
            }}
          >
            Modelo educativo científico vocacional a temprana edad
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: isDark ? "#e0e0e0" : "#222222",
              maxWidth: "800px",
              mx: "auto",
              mt: 2,
              ...fadeIn(0.3),
            }}
          >
            Formar integralmente a niños, niñas, adolescentes como futuros científicos,
            investigadores y creadores de conocimiento, estimulando la innovación, el
            pensamiento crítico, la vocación temprana, en un modelo educativo articulado
            la escuela con la universidad, orientado al desarrollo sostenible y al
            bienestar de la comunidad.
          </Typography>
        </Grid>

        {/* Cards generadas a partir del array NIVELES */}
        {NIVELES.map((nivel, index) => (
          <Grid
            key={nivel.init}
            size={{ xs: 12, sm: 6, md: 4, lg: 3.5 }}
            sx={{ display: "flex", justifyContent: "center", ...fadeIn(0.1 * (index + 1)) }}
          >
            <Card
              init={nivel.init}
              imageurl={nivel.imageurl}
              title={nivel.title}
              paragraph={nivel.paragraph}
              features={nivel.features}
            />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mt: 6 }} />
    </Box>
  );
}

export default Nivels;