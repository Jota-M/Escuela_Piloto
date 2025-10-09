'use client';
import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  YouTube,
  LocationOn,
  Phone,
  Email,
  AccessTime,
  Favorite,
} from '@mui/icons-material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0f172a',
        color: 'white',
        pt: 8,
        pb: 4,
        px: { xs: 2, md: 8 },
      }}
    >
      <Grid container spacing={2} justifyContent="space-between">
        {/* Columna 1 - Información institucional */}
        <Grid size={{xs:12, md:4, lg:4}} 
          sx={{ pl: { lg: 4 } }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Favorite sx={{ fontSize: 40, color: '#38bdf8', mr: 1 }} />
            <Box>
              <Typography variant="subtitle1">
                Instituto de Investigación Pedagógica



              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', color: '#38bdf8' }}
              >
                Con su escuela vocacional piloto dependiente de la universidad
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationOn sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">
              Calle Sucre Nº 123<br />
              Llallagua, Potosí - Bolivia
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Phone sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">+591 4 532 9876</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Email sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">contacto@sanjuanbosco.edu.bo</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTime sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">Lun - Vie: 7:30 AM - 5:00 PM</Typography>
          </Box>
        </Grid>

        {/* Columna 2 - Enlaces rápidos */}
        <Grid size={{xs:12, md:4, lg:4}} >
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Enlaces Rápidos
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link href="#inicio" underline="hover" color="inherit">Inicio</Link>
            <Link href="#nosotros" underline="hover" color="inherit">Nosotros</Link>
            <Link href="#Niveles" underline="hover" color="inherit">Niveles Educativos</Link>
            <Link href="#galeria" underline="hover" color="inherit">Galería</Link>
            <Link href="#noticias" underline="hover" color="inherit">Noticias</Link>
            <Link href="#Contactos" underline="hover" color="inherit">Contacto</Link>
          </Box>
        </Grid>

        {/* Columna 3 - Redes sociales y mapa */}
        <Grid size={{xs:12, md:4, lg:4}} >
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Síguenos
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <IconButton
              component="a"
              href="https://www.facebook.com/UnidadEducativaSanJuanBosco"
              target="_blank"
              rel="noopener"
              sx={{
                bgcolor: '#1d4ed8',
                color: 'white',
                '&:hover': { bgcolor: '#2563eb' },
              }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.instagram.com/sanjuanbosco"
              target="_blank"
              rel="noopener"
              sx={{
                bgcolor: '#db2777',
                color: 'white',
                '&:hover': { bgcolor: '#be185d' },
              }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.youtube.com/channel/UCexample"
              target="_blank"
              rel="noopener"
              sx={{
                bgcolor: '#dc2626',
                color: 'white',
                '&:hover': { bgcolor: '#b91c1c' },
              }}
            >
              <YouTube />
            </IconButton>
          </Box>

          {/* Mapa / Ubicación */}
          <Box
            sx={{
              bgcolor: '#1e293b',
              borderRadius: 2,
              p: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" gutterBottom>
              Nuestra Ubicación
            </Typography>
            <Link
              href="https://www.google.com/maps/place/Llallagua,+Potos%C3%AD,+Bolivia"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{ color: '#38bdf8', fontWeight: 'bold' }}
            >
              Ver ubicación completa
            </Link>
          </Box>
        </Grid>
      </Grid>

      {/* Divider y derechos de autor */}
      <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />
      <Typography
        variant="body2"
        align="center"
        sx={{ color: 'gray.400' }}
      >
        © 2025 Unidad Educativa Particular Cristiana San Juan Bosco. Todos los derechos reservados.
      </Typography>
    </Box>
  );
}

export default Footer;
