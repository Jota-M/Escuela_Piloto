import { Box, Typography, useTheme } from '@mui/material';

const VerseSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const backgroundColor = isDark ? '#181B33' : '#EEEFF7';
  const textColor = isDark ? '#f5f5f5' : '#212121';
  const accentColor = isDark ? '#facc15' : '#b8860b'; // dorado más cálido

  return (
    <Box
      sx={{
        mt: { xs: 3, md: 6 },
        py: { xs: 10, md: 14 },
        backgroundColor,
        textAlign: 'center',
        transition: 'background-color 0.4s ease, color 0.4s ease',
      }}
    >
      <Typography
  variant="h2"
  sx={{
    fontFamily: `'Playfair Display', serif`,
    fontStyle: 'italic',
    fontWeight: 600,
    fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.2rem' },
    color: textColor,
    maxWidth: '1000px',
    mx: 'auto',
    lineHeight: 1.4,
    whiteSpace: 'pre-line', 
    transition: 'color 0.4s ease',
  }}
>
  {`¨Una mirada del presente y futuro…¨
Por una educación liberadora con calidad y por un País con Desarrollo
“Una educación de calidad y excelencia un país con desarrollo”
El propósito si:
No hay una buena educación
No hay desarrollo en un país
No hay posibilidad de salir del
Atraso y pobreza`}
</Typography>


      
    </Box>
  );
};

export default VerseSection;
