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
            Escuela Vocacional Piloto{' '}
            <Box component="span" sx={{ color: 'red' }}>
              Objetivo
            </Box>
          </Typography>
          <Paragrafth
          alignText='left'
            text="Formar estudiantes desde las Aulas Escolares Vocacionales Piloto a la Universidad, que permita seguir estudios superiores universitario según su vocación, o ingresar al campo laboral en las empresas productivas."
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
      <Grid container spacing={4} sx={{ mt: 6, ml: { xs: 0, md: 0 } }}>
  {/* Misión */}
  <Grid size={{ xs: 12, md: 6 }} sx={{ px: { xs: 1, md: 2 } }}>
    <Box
      sx={{
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center',
        border: isDark ? '1px solid #444' : '1px solid #ccc',
        borderRadius: 3,
        p: 3,
        height: '100%',
        boxShadow: isDark
          ? '0 4px 12px rgba(0,0,0,0.4)'
          : '0 4px 12px rgba(0,0,0,0.1)',
        backgroundColor: isDark ? '#071929' : '#fafafa',
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
        Misión
      </Box>
      <Paragrafth
        text="Institución educativa innovadora referente nacional en la formación vocacional desde primaria, secundaria, articulada a la universidad, alineada con los modelos más avanzados del mundo, que desde temprana edad, nuestros estudiantes, desde la niñez y la adolescencia se forme como científicos, investigadores, creadores de conocimiento, capaces de aplicar la ciencia tecnología, innovación para transformar su realidad, resolver los problemas de su comunidad y aportar al desarrollo científico, cultural, productivo del país con visión humanista, social y sostenible."
      />
    </Box>
  </Grid>

  {/* Visión */}
  <Grid size={{ xs: 12, md: 6 }} sx={{ px: { xs: 1, md: 2 } }}>
    <Box
      sx={{
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center',
        border: isDark ? '1px solid #444' : '1px solid #ccc',
        borderRadius: 3,
        p: 3,
        height: '100%',
        boxShadow: isDark
          ? '0 4px 12px rgba(0,0,0,0.4)'
          : '0 4px 12px rgba(0,0,0,0.1)',
        backgroundColor: isDark ? '#071929' : '#fafafa',
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
        Visión
      </Box>
      <Paragrafth
        text="Formar integralmente a niños, niñas, adolescentes en los niveles de primaria, secundaria como científicos y creadores de conocimientos, promoviendo la investigación, innovación tecnología, el pensamiento crítico, en un modelo educativo articulado con la Universidad, que integre valores éticos, disciplina, responsabilidad social y compromiso con la comunidad, fomentando soluciones sostenibles y contribuyendo al desarrollo científico, educativo, productivo del país."
      />
    </Box>
  </Grid>
</Grid>

      <Box sx={{ my: 3, borderTop: '1px solid', borderColor: isDark ? '#333' : '#ccc' }} />
       <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.8rem', sm: '2rem', md: '2.6rem' },
            transition: 'color 0.4s ease',
            color: 'red' 
          }}
        >
          Nuestros Pilares
        </Typography>
        <Typography variant='subtitle1'>
          Los cuatro pilares de articular y conectar el sistema educativo de Bolivia.
        </Typography>
        
      </Box>

      <Grid container spacing={0} justifyContent="center">
  <Grid size={{ xs: 11, sm: 6, md: 4, lg: 2.5 }} sx={{ mb: { xs: 4, sm: 2} }}>
    <Pils
      image='/Pils-1.png'
      title='Educación nivel primario, secundario'
      description='Formar integralmente a niños, niñas, adolescentes de primaria y secundaria en un modelo educativo vocacional científico, articulado con la universidad, que despierte el interés por la ciencia investigación, tecnología, innovación, desarrollando pensamiento crítico, creativo y compromiso social para contribuir al progreso de la región y del país. '
    />
  </Grid>
  <Grid size={{ xs: 11, sm: 6, md: 4, lg: 2.5 }} sx={{ mb: { xs: 4, sm: 2 } }}>
    <Pils
      image='/Pils-22.png'
      title='Educación superior universitaria'
      description='Garantizar una formación integral, continua y articulada desde la educación primaria, secundaria hasta la universidad, que desarrollen competencias científicas, técnicas, humanísticas y valores comunitarios, orientado a los estudiantes hacia la investigación, innovación y el compromiso social, para contribuir al desarrollo sostenible del país.'
    />
  </Grid>
  <Grid size={{ xs: 11, sm: 6, md: 4, lg: 2.5 }} sx={{ mb: { xs: 4, sm: 0 } }}>
    <Pils
      image='/Pils-3.png'
      title='Empresa y/o Industria (privada, estatal y social).  '
      description='Desarrollar actividades productivas, industriales, de servicio de manera eficiente, sostenible, responsable, que generen valores económicos, empleo digno, innovación tecnología y beneficios sociales, contribuyendo al desarrollo integral de la sociedad y del país.'
    />
  </Grid>
  <Grid size={{ xs: 11, sm: 6, md: 4, lg: 2.5 }} >
    <Pils
      image='/Pils-4.png'
      title='Sociedad (área dispersa y concentrada).'
      description='Fortalecer la organización social, cultural, productiva, política de las comunidades en áreas dispersas, concentradas, promoviendo el bienestar colectivo, la inclusión equidad territorial y el desarrollo sostenible, respetando la diversidad cultural y las necesidades propias de cada espacio.'
    />
  </Grid>
</Grid>
    <VerseSection/>  
    </Box>
    
    </>
  );
}


export default About;
