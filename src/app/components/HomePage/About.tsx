import React from 'react';
import { Grid, Typography, useTheme, Box } from '@mui/material';
import Title from './Title';
import Paragrafth from './Paragrafth';
import VerseSection from './Verse';
import Pils from './Pils';

interface ItemProps {
  title: string,
  text: string,
  isDark: boolean
}

function InfoCard({ title, text, isDark }: ItemProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        border: isDark ? '1px solid #444' : '1px solid #ccc',
        borderRadius: 3,
        p: 3,
        height: '100%',
        boxShadow: isDark
          ? '0 4px 12px rgba(0,0,0,0.4)'
          : '0 4px 12px rgba(0,0,0,0.1)',
        backgroundColor: isDark ? '#071929' : '#fafafa',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <Box
        sx={{
          color: 'red',
          fontWeight: 'bold',
          fontSize: { xs: '1.8rem', sm: '2rem', md: '2.3rem' },
          lineHeight: 1.3,
          mb: 2,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        {title}
      </Box>
      <Paragrafth text={text} />
    </Box>
  );
}

function About() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const textColor = isDark ? '#e0e0e0' : '#222222';

  return (
    <>
      <Box
        id="Nosotros"
        sx={{
          color: textColor,
          py: { xs: 8, md: 10 },
          px: { xs: 2, sm: 4, md: 8 },
          transition: 'background-color 0.4s ease, color 0.4s ease',
          scrollMarginTop: '80px',
        }}
      >
        {/* Propósito */}
        <Grid container spacing={6} justifyContent="center" alignItems="center">
          <Grid
            size={{ xs: 12, md: 6, lg: 5 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Title text="Nuestro propósito" />
            <Typography
              variant="h3"
              sx={{
                color: '#01579b',
                fontWeight: 'bold',
                fontSize: {
                  xs: '1.8rem',
                  sm: '2rem',
                  md: '2.5rem',
                  lg: '3rem',
                },
                lineHeight: 1.3,
                mb: 2,
              }}
            >
              Una educación con{' '}
              <Box component="span" sx={{ color: '#facc15' }}>
                propósito eterno
              </Box>
            </Typography>
            <Paragrafth
              text="En el corazón de nuestra institución late un compromiso inquebrantable con la excelencia educativa y la formación integral de nuestros estudiantes. Nos dedicamos a cultivar no solo mentes brillantes, sino también corazones compasivos y espíritus resilientes."
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 5 }} sx={{ textAlign: 'center' }}>
            <Box
              component="img"
              src="/fondo.jpg"
              alt="Estudiantes"
              loading="lazy"
              sx={{
                width: '100%',
                maxWidth: 800,
                borderRadius: 4,
                boxShadow: isDark
                  ? '0px 10px 20px rgba(0, 0, 0, 0.7)'
                  : '0px 10px 20px rgba(0, 0, 0, 0.1)',
                transition: 'box-shadow 0.3s ease',
              }}
            />
          </Grid>
        </Grid>

        {/* Misión y Visión */}
        <Grid container spacing={4} sx={{ mt: 6, ml: { xs: 0, md: 0 } }}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ px: { xs: 1, md: 2 } }}>
            <InfoCard
              title="Misión"
              isDark={isDark}
              text="Institución educativa innovadora referente nacional en la formación vocacional desde primaria, secundaria, articulada a la universidad, alineada con los modelos más avanzados del mundo, que desde temprana edad, nuestros estudiantes, desde la niñez y la adolescencia se forme como científicos, investigadores, creadores de conocimiento, capaces de aplicar la ciencia tecnología, innovación para transformar su realidad, resolver los problemas de su comunidad y aportar al desarrollo científico, cultural, productivo del país con visión humanista, social y sostenible."
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{ px: { xs: 1, md: 2 } }}>
            <InfoCard
              title="Visión"
              isDark={isDark}
              text="Formar integralmente a niños, niñas, adolescentes en los niveles de primaria, secundaria como científicos y creadores de conocimientos, promoviendo la investigación, innovación tecnología, el pensamiento crítico, en un modelo educativo articulado con la Universidad, que integre valores éticos, disciplina, responsabilidad social y compromiso con la comunidad, fomentando soluciones sostenibles y contribuyendo al desarrollo científico, educativo, productivo del país."
            />
          </Grid>
        </Grid>

        {/* Separador */}
        <Box
          sx={{
            my: 6,
            borderTop: '1px solid',
            borderColor: isDark ? '#333' : '#ccc',
          }}
        />

        {/* Pilares */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1.8rem', sm: '2rem', md: '2.6rem' },
              mb: 2,
              transition: 'color 0.4s ease',
              color: '#FFE05C',
            }}
          >
            Nuestros Pilares
          </Typography>
          <Paragrafth text="Los valores que fundamentan nuestra propuesta educativa y forman el carácter de nuestros estudiantes." />
        </Box>

        <Grid container spacing={1} justifyContent="center">
          <Grid
            size={{ xs: 12, sm: 12, md: 12, lg: 2.5 }}
            offset={{ xs: 2, sm: 0, md: 0, lg: 1 }}
          >
            <Pils
              image="/Pils-1.jpg"
              title="Fe"
              description="La fe es un pilar fundamental en nuestra institución, fomentando la espiritualidad y el respeto por las creencias de cada individuo."
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 2.5 }}>
            <Pils
              image="/Pils-2.jpg"
              title="Respeto"
              description="El respeto es un pilar fundamental en nuestra institución, fomentando la convivencia y el entendimiento entre todos."
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 2.5 }}>
            <Pils
              image="/Pils-3.jpg"
              title="Responsabilidad"
              description="La responsabilidad es un pilar fundamental en nuestra institución, fomentando la autonomía y el compromiso con el aprendizaje."
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 2.5 }}>
            <Pils
              image="/Pils-4.jpg"
              title="Disciplina"
              description="La disciplina es un pilar fundamental en nuestra institución, fomentando la responsabilidad y el respeto por las normas."
            />
          </Grid>
        </Grid>

        <VerseSection />
      </Box>
    </>
  );
}

export default About;
