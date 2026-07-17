// app/dashboard/docente/evaluaciones/page.tsx
'use client';

import React from 'react';
import {
  Box,
  Typography,
  Card,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Avatar,
  Stack,
  useTheme,
} from '@mui/material';
import { alpha, keyframes } from '@mui/material/styles';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

type ColorKey = 'success' | 'info' | 'primary' | 'warning' | 'error' | 'secondary';
type EstadoKey = 'success' | 'info' | 'warning' | 'error' | 'default';

interface Estudiante {
  nombre: string;
  id: string;
  color: ColorKey;
  trimestre1: number | null;
  trimestre2: number | null;
  practica1: number | null;
}

const estudiantes: Estudiante[] = [
  { nombre: 'Ana Pérez', id: '#001234', color: 'success', trimestre1: 85, trimestre2: 90, practica1: 78 },
  { nombre: 'Carlos Morales', id: '#001235', color: 'primary', trimestre1: 65, trimestre2: null, practica1: 58 },
  { nombre: 'Lucía Rodríguez', id: '#001236', color: 'warning', trimestre1: 95, trimestre2: 88, practica1: 92 },
  { nombre: 'Micaela Peñaranda', id: '#001237', color: 'secondary', trimestre1: 60, trimestre2: 30, practica1: 37 },
  { nombre: 'Lucía Rodríguez', id: '#001238', color: 'warning', trimestre1: 95, trimestre2: 88, practica1: 92 },
  { nombre: 'Antonela Pérez', id: '#001239', color: 'success', trimestre1: 90, trimestre2: 80, practica1: null },
  { nombre: 'Lucas Reglón', id: '#001240', color: 'warning', trimestre1: 98, trimestre2: 89, practica1: 90 },
  { nombre: 'Cristian Machaca', id: '#001241', color: 'secondary', trimestre1: 80, trimestre2: 55, practica1: 70 },
  { nombre: 'Belén Grimaldez', id: '#001242', color: 'warning', trimestre1: 90, trimestre2: 88, practica1: 100 },
];

const getPromedio = (a: number | null, b: number | null, c: number | null) => {
  const valores = [a, b, c].filter((v): v is number => v !== null);
  if (valores.length === 0) return null;
  return Math.round(valores.reduce((sum, v) => sum + v, 0) / valores.length);
};

const getEstado = (prom: number | null): { label: string; color: EstadoKey } => {
  if (prom === null) return { label: 'Sin datos', color: 'default' };
  if (prom >= 90) return { label: 'Excelente', color: 'success' };
  if (prom >= 70) return { label: 'Aprobado', color: 'info' };
  if (prom >= 60) return { label: 'En riesgo', color: 'warning' };
  return { label: 'Reprobado', color: 'error' };
};

export default function EvaluacionesPage() {
  const theme = useTheme();

  const getHex = (color: ColorKey) => theme.palette[color].main;

  const fadeUp = (index: number) => ({
    animation: `${fadeInUp} 0.55s cubic-bezier(0.16, 1, 0.3, 1) both`,
    animationDelay: `${index * 90}ms`,
    '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  });

  const selectStyle = {
    '& .MuiOutlinedInput-root': { borderRadius: 2.5, bgcolor: 'background.paper' },
  };

  return (
    <Box sx={{ p: { xs: 2.5, md: 4 }, bgcolor: 'background.default' }}>
      {/* Header */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ md: 'flex-end' }}
        spacing={2}
        sx={{ mb: 3, ...fadeUp(0) }}
      >
        <Box>
          <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.08em' }}>
            Panel docente
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={{ mt: 0.3 }}>
            Evaluaciones
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
            Registro y seguimiento de calificaciones por materia
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 99,
              px: 2.2,
              borderColor: 'divider',
              color: 'text.primary',
              '&:hover': { bgcolor: alpha(theme.palette.text.primary, 0.06), borderColor: 'divider' },
            }}
          >
            Calificar lote
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 99,
              px: 2.5,
              background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
              boxShadow: `0 8px 20px ${alpha(theme.palette.success.main, 0.35)}`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.success.dark}, ${theme.palette.success.main})`,
                boxShadow: `0 10px 24px ${alpha(theme.palette.success.main, 0.45)}`,
              },
            }}
          >
            Nueva evaluación
          </Button>
        </Stack>
      </Stack>

      {/* Filtros */}
      <Card
        elevation={0}
        sx={{ borderRadius: 4, p: { xs: 2.5, md: 3 }, mb: 3, border: '1px solid', borderColor: 'divider', ...fadeUp(1) }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth size="small" sx={selectStyle}>
              <InputLabel>Materia</InputLabel>
              <Select value="matematicas" label="Materia">
                <MenuItem value="matematicas">Matemáticas - 10mo A</MenuItem>
                <MenuItem value="lenguaje">Lenguaje y Literatura - 10mo A</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth size="small" sx={selectStyle}>
              <InputLabel>Período</InputLabel>
              <Select value="primer" label="Período">
                <MenuItem value="primer">Primer Trimestre</MenuItem>
                <MenuItem value="segundo">Segundo Trimestre</MenuItem>
                <MenuItem value="tercero">Tercer Trimestre</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth size="small" sx={selectStyle}>
              <InputLabel>Tipo de evaluación</InputLabel>
              <Select value="todas" label="Tipo de evaluación">
                <MenuItem value="todas">Todas</MenuItem>
                <MenuItem value="parciales">Parciales</MenuItem>
                <MenuItem value="practicas">Prácticas</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      {/* Tabla de calificaciones */}
      <Card elevation={0} sx={{ borderRadius: 3.5, p: { xs: 2, md: 3 }, border: '1px solid', borderColor: 'divider', ...fadeUp(2) }}>
        {/* Encabezado de tabla */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '2.2fr 1fr 1fr 1fr 0.9fr 1.1fr',
            gap: 1,
            px: 1.5,
            pb: 1.2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          {['Estudiante', 'Trimestre 1', 'Trimestre 2', 'Práctica 1', 'Promedio', 'Estado'].map((h) => (
            <Typography key={h} variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>
              {h}
            </Typography>
          ))}
        </Box>

        <Stack spacing={1} sx={{ mt: 1.2 }}>
          {estudiantes.map((e, i) => {
            const promedio = getPromedio(e.trimestre1, e.trimestre2, e.practica1);
            const estado = getEstado(promedio);
            const avatarHex = getHex(e.color);
            const estadoHex = estado.color !== 'default' ? getHex(estado.color) : theme.palette.grey[500];

            return (
              <Box
                key={i}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '2.2fr 1fr 1fr 1fr 0.9fr 1.1fr',
                  gap: 1,
                  alignItems: 'center',
                  p: 1.5,
                  borderRadius: 2.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'background-color 0.2s ease, transform 0.2s ease',
                  '&:hover': { bgcolor: alpha(theme.palette.text.primary, 0.03), transform: 'translateX(2px)' },
                }}
              >
                {/* Estudiante */}
                <Stack direction="row" alignItems="center" spacing={1.2} sx={{ minWidth: 0 }}>
                  <Avatar
                    sx={{
                      bgcolor: avatarHex,
                      color: theme.palette.getContrastText(avatarHex),
                      width: 36,
                      height: 36,
                      fontSize: 13,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {e.nombre.split(' ').map((p) => p[0]).join('')}
                  </Avatar>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography fontWeight={700} noWrap fontSize={14}>
                      {e.nombre}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
                      {e.id}
                    </Typography>
                  </Box>
                </Stack>

                {/* Notas */}
                {[e.trimestre1, e.trimestre2, e.practica1].map((nota, j) => (
                  <Box key={j}>
                    {nota !== null ? (
                      <Box
                        sx={{
                          width: 48,
                          textAlign: 'center',
                          py: 0.5,
                          borderRadius: 2,
                          fontWeight: 700,
                          fontSize: 13,
                          bgcolor: alpha(theme.palette.text.primary, 0.06),
                        }}
                      >
                        {nota}
                      </Box>
                    ) : (
                      <Typography color="text.disabled">—</Typography>
                    )}
                  </Box>
                ))}

                {/* Promedio */}
                <Typography fontWeight={800} sx={{ color: estado.color !== 'default' ? estadoHex : 'text.primary' }}>
                  {promedio ?? '—'}
                </Typography>

                {/* Estado */}
                <Box
                  sx={{
                    px: 1.4,
                    py: 0.4,
                    borderRadius: 99,
                    fontSize: 12,
                    fontWeight: 700,
                    textAlign: 'center',
                    width: 'fit-content',
                    color: estado.color !== 'default' ? estadoHex : theme.palette.text.secondary,
                    bgcolor: alpha(estadoHex, estado.color !== 'default' ? 0.14 : 0.1),
                  }}
                >
                  {estado.label}
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Card>
    </Box>
  );
}