// app/dashboard/docente/page.tsx
'use client';

import React from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  Stack,
  useTheme,
} from '@mui/material';
import { alpha, keyframes } from '@mui/material/styles';

import GroupsIcon from '@mui/icons-material/Groups';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EditNoteIcon from '@mui/icons-material/EditNote';
import RoomIcon from '@mui/icons-material/Room';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

type ColorKey = 'success' | 'info' | 'primary' | 'warning' | 'error' | 'secondary';
type EstadoClase = 'En curso' | 'Próxima' | 'Pendiente';

const resumen = {
  estudiantes: 156,
  materias: 8,
  asistencia: 92,
  alertasPendientes: 7,
};

const kpis: { title: string; value: string; note: string; icon: React.ReactNode; color: ColorKey }[] = [
  { title: 'Estudiantes', value: String(resumen.estudiantes), note: '+12% vs mes anterior', icon: <GroupsIcon fontSize="small" />, color: 'primary' },
  { title: 'Materias asignadas', value: String(resumen.materias), note: '3 cursos diferentes', icon: <MenuBookIcon fontSize="small" />, color: 'info' },
  { title: 'Asistencia promedio', value: `${resumen.asistencia}%`, note: '+5% vs semana anterior', icon: <CheckCircleIcon fontSize="small" />, color: 'success' },
  { title: 'Alertas pendientes', value: String(resumen.alertasPendientes), note: 'Requieren atención', icon: <WarningAmberIcon fontSize="small" />, color: 'error' },
];

const horarioHoy: { hora: string; materia: string; aula: string; estudiantes: number; estado: EstadoClase }[] = [
  { hora: '08:00', materia: 'Matemáticas - 10mo A', aula: 'Aula 201', estudiantes: 28, estado: 'En curso' },
  { hora: '10:00', materia: 'Álgebra - 11vo B', aula: 'Aula 203', estudiantes: 25, estado: 'Próxima' },
  { hora: '14:00', materia: 'Cálculo - 12vo A', aula: 'Aula 205', estudiantes: 22, estado: 'Pendiente' },
];

const estadoColor: Record<EstadoClase, ColorKey> = {
  'En curso': 'success',
  'Próxima': 'info',
  'Pendiente': 'warning',
};

const alertasRecientes = [
  { titulo: 'Juan Pérez — 10mo A', detalle: '3 faltas consecutivas', color: 'error' as ColorKey },
  { titulo: 'Elvis Rodrigo — 11vo B', detalle: 'Tercera práctica consecutiva no entregada', color: 'error' as ColorKey },
  { titulo: 'Tarea pendiente', detalle: 'Álgebra · Ejercicios Cap. 5', color: 'warning' as ColorKey },
];

export default function DashboardDocentePage() {
  const theme = useTheme();

  const getHex = (color: ColorKey) => theme.palette[color].main;

  const fadeUp = (index: number) => ({
    animation: `${fadeInUp} 0.55s cubic-bezier(0.16, 1, 0.3, 1) both`,
    animationDelay: `${index * 90}ms`,
    '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  });

  return (
    <Box sx={{ p: { xs: 2.5, md: 4 }, bgcolor: 'background.default' }}>
      {/* Header */}
      <Stack sx={{ mb: 3, ...fadeUp(0) }}>
        <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.08em' }}>
          Panel docente
        </Typography>
        <Typography variant="h4" fontWeight={800} sx={{ mt: 0.3 }}>
          Resumen general
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
          Lunes, 15 de enero de 2024
        </Typography>
      </Stack>

      {/* KPIs */}
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
                  ...fadeUp(i + 1),
                  '&:hover': { transform: 'translateY(-3px)', boxShadow: `0 12px 28px ${alpha(hex, 0.2)}` },
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

      <Grid container spacing={2.5}>
        {/* Horario de hoy */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card
            elevation={0}
            sx={{ borderRadius: 3.5, p: { xs: 2, md: 3 }, border: '1px solid', borderColor: 'divider', ...fadeUp(5), height: '100%' }}
          >
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
              Horario de hoy
            </Typography>
            <Stack spacing={1.5}>
              {horarioHoy.map((h, i) => {
                const hex = getHex(estadoColor[h.estado]);
                return (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 1.8,
                      borderRadius: 2.5,
                      border: '1px solid',
                      borderColor: alpha(hex, 0.25),
                      borderLeft: '4px solid',
                      borderLeftColor: hex,
                      background: `linear-gradient(90deg, ${alpha(hex, 0.06)}, transparent 40%)`,
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 10px 22px ${alpha(hex, 0.18)}` },
                    }}
                  >
                    <Typography variant="h6" fontWeight={800} sx={{ minWidth: 56, color: hex }}>
                      {h.hora}
                    </Typography>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography fontWeight={700} noWrap>
                        {h.materia}
                      </Typography>
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.3 }}>
                        <RoomIcon sx={{ fontSize: 13, color: 'text.disabled' }} />
                        <Typography variant="caption" color="text.disabled">
                          {h.aula} · {h.estudiantes} estudiantes
                        </Typography>
                      </Stack>
                    </Box>

                    <Box
                      sx={{
                        px: 1.4,
                        py: 0.4,
                        borderRadius: 99,
                        fontSize: 12,
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        color: theme.palette.getContrastText(hex),
                        bgcolor: hex,
                      }}
                    >
                      {h.estado}
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Card>
        </Grid>

        {/* Alertas recientes + acciones rápidas */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={2.5}>
            <Card
              elevation={0}
              sx={{ borderRadius: 3.5, p: { xs: 2, md: 2.5 }, border: '1px solid', borderColor: 'divider', ...fadeUp(6) }}
            >
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
                Alertas recientes
              </Typography>
              <Stack spacing={1.2}>
                {alertasRecientes.map((a, i) => {
                  const hex = getHex(a.color);
                  return (
                    <Box
                      key={i}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.2,
                        p: 1.4,
                        borderRadius: 2.5,
                        border: '1px solid',
                        borderColor: alpha(hex, 0.25),
                        background: alpha(hex, theme.palette.mode === 'dark' ? 0.1 : 0.06),
                      }}
                    >
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: hex,
                          color: theme.palette.getContrastText(hex),
                          flexShrink: 0,
                          mt: 0.2,
                        }}
                      >
                        {a.color === 'error' ? (
                          <WarningAmberIcon sx={{ fontSize: 16 }} />
                        ) : (
                          <NotificationsActiveIcon sx={{ fontSize: 16 }} />
                        )}
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={700} noWrap>
                          {a.titulo}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {a.detalle}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Stack>
            </Card>

            <Card
              elevation={0}
              sx={{ borderRadius: 3.5, p: { xs: 2, md: 2.5 }, border: '1px solid', borderColor: 'divider', ...fadeUp(7) }}
            >
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
                Acciones rápidas
              </Typography>
              <Stack spacing={1.5}>
                <Button
                  variant="contained"
                  startIcon={<EditNoteIcon />}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 700,
                    borderRadius: 99,
                    py: 1,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.35)}`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                      boxShadow: `0 10px 24px ${alpha(theme.palette.primary.main, 0.45)}`,
                    },
                  }}
                >
                  Registrar notas
                </Button>
                <Button
                  variant="contained"
                  startIcon={<CheckCircleIcon />}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 700,
                    borderRadius: 99,
                    py: 1,
                    background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                    boxShadow: `0 8px 20px ${alpha(theme.palette.success.main, 0.35)}`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.success.dark}, ${theme.palette.success.main})`,
                      boxShadow: `0 10px 24px ${alpha(theme.palette.success.main, 0.45)}`,
                    },
                  }}
                >
                  Tomar asistencia
                </Button>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}