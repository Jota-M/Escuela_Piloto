// app/dashboard/familia/calificaciones/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Avatar,
  Grid,
  Button,
  Stack,
  useTheme,
  Divider,
} from '@mui/material';
import { alpha, keyframes } from '@mui/material/styles';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import DownloadIcon from '@mui/icons-material/Download';
import FilterListIcon from '@mui/icons-material/FilterList';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

type ColorKey = 'success' | 'info' | 'primary' | 'warning' | 'error';

type Student = { nombre: string; iniciales: string; color: ColorKey };
type Grade = { materia: string; nota: number; estado: string; color: ColorKey };

const estudiantes: Student[] = [
  { nombre: 'Juan Pérez', iniciales: 'JP', color: 'success' },
  { nombre: 'María Pérez', iniciales: 'MP', color: 'primary' },
];

const calificaciones: Grade[] = [
  { materia: 'Matemáticas', nota: 92, estado: 'Sobresaliente', color: 'success' },
  { materia: 'Ciencias', nota: 88, estado: 'Muy bueno', color: 'info' },
  { materia: 'Lenguaje', nota: 75, estado: 'Bueno', color: 'warning' },
  { materia: 'Sociales', nota: 84, estado: 'Muy bueno', color: 'info' },
  { materia: 'Ed. Física', nota: 61, estado: 'Necesita mejorar', color: 'error' },
  { materia: 'Arte', nota: 80, estado: 'Bueno', color: 'warning' },
];

const periodos = ['Bimestre 1', 'Bimestre 2', 'Bimestre 3', 'Bimestre 4'];

export default function CalificacionesPage() {
  const theme = useTheme();

  const [estudianteActivo, setEstudianteActivo] = useState(0);
  const [periodoActivo, setPeriodoActivo] = useState(1);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const getHex = (color: ColorKey) => theme.palette[color].main;

  const fadeUp = (index: number) => ({
    animation: `${fadeInUp} 0.55s cubic-bezier(0.16, 1, 0.3, 1) both`,
    animationDelay: `${index * 90}ms`,
    '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  });

  const ScoreRing = ({ nota, hex, size = 56 }: { nota: number; hex: string; size?: number }) => (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        flexShrink: 0,
        background: `conic-gradient(${hex} ${mounted ? nota * 3.6 : 0}deg, ${alpha(hex, 0.14)} 0deg)`,
        transition: 'background 1s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ position: 'absolute', inset: 5, borderRadius: '50%', bgcolor: 'background.paper' }} />
      <Typography sx={{ position: 'relative', fontWeight: 800, fontSize: size > 48 ? 15 : 13, color: 'text.primary' }}>
        {nota}
      </Typography>
    </Box>
  );

  const kpis = [
    { title: 'Promedio general', value: '8.7', icon: <CheckCircleIcon fontSize="small" />, color: 'success' as ColorKey, note: 'Excelente rendimiento' },
    { title: 'Mejor materia', value: 'Matemáticas', icon: <SchoolIcon fontSize="small" />, color: 'info' as ColorKey, note: 'Sobresaliente' },
    { title: 'Requiere atención', value: 'Ed. Física', icon: <EventIcon fontSize="small" />, color: 'error' as ColorKey, note: 'Necesita mejorar' },
    { title: 'Posición en clase', value: '3ro', icon: <GroupsIcon fontSize="small" />, color: 'primary' as ColorKey, note: 'De 25 estudiantes' },
  ];

  return (
    <Box sx={{ p: { xs: 2.5, md: 4 }, bgcolor: 'background.default' }}>
      {/* Header */}
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'flex-end' }} spacing={2} sx={{ mb: 3, ...fadeUp(0) }}>
        <Box>
          <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.08em' }}>
            Portal de familia
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={{ mt: 0.3 }}>
            Calificaciones
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 99,
            px: 2.5,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.35)}`,
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
              boxShadow: `0 10px 24px ${alpha(theme.palette.primary.main, 0.45)}`,
            },
          }}
        >
          Descargar boletín
        </Button>
      </Stack>

      {/* Selector estudiante + período */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          p: { xs: 2.5, md: 3 },
          mb: 3,
          border: '1px solid',
          borderColor: 'divider',
          ...fadeUp(1),
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              ESTUDIANTE
            </Typography>
            <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
              {estudiantes.map((e, index) => {
                const isActive = index === estudianteActivo;
                const hex = getHex(e.color);
                return (
                  <Box
                    key={e.nombre}
                    onClick={() => setEstudianteActivo(index)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 1.6,
                      py: 0.7,
                      borderRadius: 99,
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: 14,
                      color: isActive ? theme.palette.getContrastText(hex) : 'text.primary',
                      background: isActive ? `linear-gradient(135deg, ${hex}, ${alpha(hex, 0.75)})` : alpha(theme.palette.text.primary, 0.06),
                      boxShadow: isActive ? `0 6px 16px ${alpha(hex, 0.4)}` : 'none',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      '&:hover': { transform: 'translateY(-1px)' },
                    }}
                  >
                    <Avatar sx={{ width: 24, height: 24, fontSize: 11, fontWeight: 700, bgcolor: isActive ? 'rgba(255,255,255,0.25)' : hex, color: isActive ? '#fff' : theme.palette.getContrastText(hex) }}>
                      {e.iniciales}
                    </Avatar>
                    {e.nombre}
                  </Box>
                );
              })}
            </Stack>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <FilterListIcon sx={{ fontSize: 14 }} /> PERÍODO
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
              {periodos.map((p, i) => {
                const isActive = i === periodoActivo;
                return (
                  <Box
                    key={p}
                    onClick={() => setPeriodoActivo(i)}
                    sx={{
                      px: 1.6,
                      py: 0.7,
                      borderRadius: 99,
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: 13,
                      color: isActive ? theme.palette.getContrastText(theme.palette.secondary.main) : 'text.secondary',
                      background: isActive
                        ? `linear-gradient(135deg, ${theme.palette.secondary.main}, ${alpha(theme.palette.secondary.main, 0.75)})`
                        : alpha(theme.palette.text.primary, 0.06),
                      boxShadow: isActive ? `0 6px 16px ${alpha(theme.palette.secondary.main, 0.35)}` : 'none',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      '&:hover': { transform: 'translateY(-1px)' },
                    }}
                  >
                    {p}
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </Stack>
      </Card>

      {/* Indicadores principales, cada uno con su propio color */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {kpis.map((k, i) => {
          const hex = getHex(k.color);
          return (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={k.title}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3.5,
                  p: 2.5,
                  height: '100%',
                  border: '1px solid',
                  borderColor: alpha(hex, 0.25),
                  borderTop: '3px solid',
                  borderTopColor: hex,
                  background: `linear-gradient(180deg, ${alpha(hex, 0.06)}, transparent 60%)`,
                  transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease',
                  ...fadeUp(i + 2),
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: `0 12px 28px ${alpha(hex, 0.2)}`,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: hex,
                    color: theme.palette.getContrastText(hex),
                    mb: 1.5,
                    boxShadow: `0 6px 14px ${alpha(hex, 0.4)}`,
                  }}
                >
                  {k.icon}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {k.title}
                </Typography>
                <Typography variant="h5" fontWeight={800} sx={{ mt: 0.3 }}>
                  {k.value}
                </Typography>
                <Typography variant="caption" sx={{ color: hex, fontWeight: 700 }}>
                  {k.note}
                </Typography>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Rendimiento por materia */}
      <Card elevation={0} sx={{ borderRadius: 3.5, p: { xs: 2, md: 3 }, border: '1px solid', borderColor: 'divider', ...fadeUp(6) }}>
        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
          Rendimiento por materia
        </Typography>
        <Divider />

        {calificaciones.map((c, index) => {
          const hex = getHex(c.color);
          return (
            <Box
              key={c.materia}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                py: 1.6,
                borderBottom: index !== calificaciones.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
                borderRadius: 2,
                transition: 'background-color 0.2s ease',
                '&:hover': { bgcolor: alpha(hex, 0.04) },
              }}
            >
              <Typography fontWeight={700}>{c.materia}</Typography>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    px: 1.4,
                    py: 0.4,
                    borderRadius: 99,
                    fontSize: 12,
                    fontWeight: 700,
                    color: theme.palette.getContrastText(hex),
                    bgcolor: hex,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {c.estado}
                </Box>
                <ScoreRing nota={c.nota} hex={hex} size={48} />
              </Stack>
            </Box>
          );
        })}
      </Card>
    </Box>
  );
}