import React from 'react';
import { Grid, Typography, useTheme, Box } from '@mui/material';
import Title from './Title';
import Paragrafth from './Paragrafth';
import Pilars from './Pilars';
import VerseSection from './Verse';
import Pils from './Pils';

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
      }}
    >
      <Grid container spacing={6} justifyContent="center" alignItems="center">
        <Grid size={{ xs: 12, md: 6, lg: 5 }} sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: { xs: 'center', md: 'left' },
        }}>
          <Title text="Nuestro propósito" />
          <Typography
            variant="h3"
            sx={{
              color: '#01579b',
              fontWeight: 'bold',
              fontSize: { xs: '1.8rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
              lineHeight: 1.3,
              mb: 2,
            }}
          >
            Formación Vocacional con{' '}
            <Box component="span" sx={{ color: 'red' }}>
              Visión de Futuro
            </Box>
          </Typography>
          <Paragrafth
            text="Somos una unidad educativa vocacional piloto ubicada en Llallagua, dependiente de la Universidad, que ha sido creada con una visión transformadora: ofrecer a nuestros estudiantes una educación alineada con los modelos más avanzados del mundo, como el utilizado en países como China. Desde temprana edad, nuestros alumnos son guiados en un proceso formativo que les permite descubrir sus habilidades, desarrollar competencias específicas y proyectarse profesionalmente en áreas definidas. Esto les permite avanzar con claridad hacia estudios universitarios, con una base sólida y una vocación bien establecida."
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 5 }} sx={{ textAlign: 'center' }}>
          <Box
            component="img"
            src="fondo.jpg"
            alt="Estudiantes"
            sx={{
              width: '100%',
              maxWidth: 580,
              borderRadius: 4,
              boxShadow: isDark
                ? '0px 10px 20px rgba(0, 0, 0, 0.7)'
                : '0px 10px 20px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.3s ease',
            }}
          />
        </Grid>
      </Grid>

      <Box sx={{ my: 6, borderTop: '1px solid', borderColor: isDark ? '#333' : '#ccc' }} />
       <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.8rem', sm: '2rem', md: '2.6rem' },
            mb: 2,
            transition: 'color 0.4s ease',
            color: 'red' 
          }}
        >
          Nuestros Pilares
        </Typography>
        <Typography variant='subtitle1'>
          Los principios que guían nuestra propuesta vocacional, enfocada en el desarrollo integral y la proyección universitaria de nuestros estudiantes."
        </Typography>
        
      </Box>

      <Grid container spacing={1} justifyContent="center">
  <Grid size={{ xs: 12, sm: 12, md: 12, lg: 2.5 }} offset={{ xs: 2, sm: 0, md: 0, lg: 1 }}>
    <Pils
      image='/Pils-1.jpg'
      title='Orientación Vocacional'
      description='Guiamos a nuestros estudiantes desde edades tempranas hacia el descubrimiento de su vocación y talentos personales.'
    />
  </Grid>
  <Grid size={{ xs: 12, sm: 12, md: 12, lg: 2.5 }}>
    <Pils
      image='/Pils-2.jpg'
      title='Innovación Educativa'
      description='Incorporamos metodologías internacionales, como el modelo educativo chino, para una formación progresiva y especializada.'
    />
  </Grid>
  <Grid size={{ xs: 12, sm: 12, md: 12, lg: 2.5 }}>
    <Pils
      image='/Pils-3.jpg'
      title='Excelencia Académica'
      description='Promovemos un aprendizaje de alto nivel que fortalece las bases académicas para el ingreso universitario.'
    />
  </Grid>
  <Grid size={{ xs: 12, sm: 12, md: 12, lg: 2.5 }}>
    <Pils
      image='/Pils-4.jpg'
      title='Proyección Profesional'
      description='Preparamos a nuestros estudiantes para integrarse de forma directa a la universidad con una orientación definida.'
    />
  </Grid>
</Grid>
    <VerseSection/>  
    </Box>
    
    </>
  );
}


export default About;
