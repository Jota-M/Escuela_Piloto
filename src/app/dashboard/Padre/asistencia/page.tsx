// app/dashboard/familia/asistencia/page.tsx
'use client';

import React, { useState } from 'react';
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
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

type ColorKey = 'success' | 'info' | 'primary' | 'warning' | 'error';

type Student = { nombre: string; iniciales: string; color: ColorKey };
type Estado = 'presente' | 'tarde' | 'falta' | 'seleccionado' | 'none';
type DiaAsistencia = { dia: number; estado: Estado };

const estudiantes: Student[] = [
  { nombre: 'Juan Pérez', iniciales: 'JP', color: 'success' },
  { nombre: 'María Pérez', iniciales: 'MP', color: 'primary' },
];

const calendario: DiaAsistencia[] = [
  { dia: 25, estado: 'presente' },
  { dia: 26, estado: 'presente' },
  { dia: 27, estado: 'presente' },
  { dia: 28, estado: 'presente' },
  { dia: 1, estado: 'presente' },
  { dia: 2, estado: 'tarde' },
  { dia: 3, estado: 'tarde' },

  { dia: 4, estado: 'presente' },
  { dia: 5, estado: 'presente' },
  { dia: 6, estado: 'tarde' },
  { dia: 7, estado: 'presente' },
  { dia: 8, estado: 'presente' },
  { dia: 9, estado: 'falta' },
  { dia: 10, estado: 'falta' },

  { dia: 11, estado: 'presente' },
  { dia: 12, estado: 'presente' },
  { dia: 13, estado: 'falta' },
  { dia: 14, estado: 'presente' },
  { dia: 15, estado: 'presente' },
  { dia: 16, estado: 'falta' },
  { dia: 17, estado: 'presente' },

  { dia: 18, estado: 'presente' },
  { dia: 19, estado: 'presente' },
  { dia: 20, estado: 'falta' },
  { dia: 21, estado: 'tarde' },
  { dia: 22, estado: 'presente' },
  { dia: 23, estado: 'falta' },
  { dia: 24, estado: 'presente' },
  { dia: 25, estado: 'falta' },
  { dia: 26, estado: 'presente' },
  { dia: 27, estado: 'presente' },
  { dia: 28, estado: 'seleccionado' },
  { dia: 29, estado: 'none' },
  { dia: 30, estado: 'none' },
  { dia: 31, estado: 'none' },
];

const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

export default function AsistenciaPage() {
  const theme = useTheme();
  const [estudianteActivo, setEstudianteActivo] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState('Marzo 2024');

  const getHex = (color: ColorKey) => theme.palette[color].main;

  const fadeUp = (index: number) => ({
    animation: `${fadeInUp} 0.55s cubic-bezier(0.16, 1, 0.3, 1) both`,
    animationDelay: `${index * 90}ms`,
    '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  });

  const estadoConfig: Record<Estado, { color: ColorKey | null; label: string }> = {
    presente: { color: 'success', label: 'Presente' },
    tarde: { color: 'warning', label: 'Tarde' },
    falta: { color: 'error', label: 'Falta' },
    seleccionado: { color: 'primary', label: 'Hoy' },
    none: { color: null, label: '' },
  };

  const kpis = [
    { title: 'Asistencia general', value: '96%', icon: <CheckCircleIcon fontSize="small" />, color: 'success' as ColorKey, note: 'Excelente asistencia' },
    { title: 'Días presentes', value: '19/20', icon: <CalendarTodayIcon fontSize="small" />, color: 'info' as ColorKey, note: 'Este mes' },
    { title: 'Llegadas tarde', value: '2', icon: <AccessTimeIcon fontSize="small" />, color: 'warning' as ColorKey, note: 'Mejorar puntualidad' },
    { title: 'Faltas justificadas', value: '1', icon: <AssignmentTurnedInIcon fontSize="small" />, color: 'info' as ColorKey, note: 'Médica · 13/03' },
  ];

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
            Portal de familia
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={{ mt: 0.3 }}>
            Asistencia
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
            3er Grado A · Control y seguimiento de asistencia escolar
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
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
            Descargar reporte
          </Button>
          <Button
            variant="contained"
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
            Justificar falta
          </Button>
        </Stack>
      </Stack>

      {/* Selector estudiante + período */}
      <Card
        elevation={0}
        sx={{ borderRadius: 4, p: { xs: 2.5, md: 3 }, mb: 3, border: '1px solid', borderColor: 'divider', ...fadeUp(1) }}
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
                      background: isActive
                        ? `linear-gradient(135deg, ${hex}, ${alpha(hex, 0.75)})`
                        : alpha(theme.palette.text.primary, 0.06),
                      boxShadow: isActive ? `0 6px 16px ${alpha(hex, 0.4)}` : 'none',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      '&:hover': { transform: 'translateY(-1px)' },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 24,
                        height: 24,
                        fontSize: 11,
                        fontWeight: 700,
                        bgcolor: isActive ? 'rgba(255,255,255,0.25)' : hex,
                        color: isActive ? '#fff' : theme.palette.getContrastText(hex),
                      }}
                    >
                      {e.iniciales}
                    </Avatar>
                    {e.nombre}
                  </Box>
                );
              })}
            </Stack>
          </Box>

          <Box>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <CalendarTodayIcon sx={{ fontSize: 14 }} /> PERÍODO
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
              <Button
                onClick={() => alert('Mes anterior')}
                sx={{
                  minWidth: 36,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid',
                  borderColor: 'divider',
                  color: 'text.secondary',
                }}
              >
                <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
              </Button>
              <Box
                sx={{
                  px: 2,
                  py: 0.7,
                  borderRadius: 99,
                  fontWeight: 700,
                  fontSize: 14,
                  color: theme.palette.getContrastText(theme.palette.primary.main),
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.75)})`,
                  boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.35)}`,
                }}
              >
                {selectedMonth}
              </Box>
              <Button
                onClick={() => alert('Mes siguiente')}
                sx={{
                  minWidth: 36,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid',
                  borderColor: 'divider',
                  color: 'text.secondary',
                }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Card>

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
                  ...fadeUp(i + 2),
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

      {/* Calendario de asistencia */}
      <Card elevation={0} sx={{ borderRadius: 3.5, p: { xs: 2, md: 3 }, border: '1px solid', borderColor: 'divider', ...fadeUp(6) }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={1} sx={{ mb: 1.5 }}>
          <Typography variant="subtitle1" fontWeight={700}>
            Calendario de asistencia — {selectedMonth}
          </Typography>
          <Stack direction="row" spacing={2}>
            {([
              { label: 'Presente', color: 'success' as ColorKey },
              { label: 'Tarde', color: 'warning' as ColorKey },
              { label: 'Falta', color: 'error' as ColorKey },
            ]).map((leg) => (
              <Stack key={leg.label} direction="row" spacing={0.6} alignItems="center">
                <Box sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: getHex(leg.color) }} />
                <Typography variant="caption" color="text.secondary">
                  {leg.label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Divider sx={{ mb: 2 }} />

        {/* Encabezado días de la semana */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, mb: 1 }}>
          {diasSemana.map((d) => (
            <Typography key={d} variant="caption" textAlign="center" sx={{ color: 'text.secondary', fontWeight: 700 }}>
              {d}
            </Typography>
          ))}
        </Box>

        {/* Grilla de días */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
          {calendario.map(({ dia, estado }, i) => {
            const cfg = estadoConfig[estado];
            const hex = cfg.color ? getHex(cfg.color) : null;
            const isSelected = estado === 'seleccionado';

            return (
              <Box
                key={i}
                title={cfg.label ? `Día ${dia} · ${cfg.label}` : undefined}
                sx={{
                  aspectRatio: '1 / 1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2.5,
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  userSelect: 'none',
                  cursor: hex ? 'pointer' : 'default',
                  color: !hex
                    ? 'text.disabled'
                    : isSelected
                      ? theme.palette.getContrastText(hex)
                      : theme.palette.mode === 'dark'
                        ? '#fff'
                        : hex,
                  background: isSelected
                    ? `linear-gradient(135deg, ${hex}, ${alpha(hex as string, 0.75)})`
                    : hex
                      ? alpha(hex, theme.palette.mode === 'dark' ? 0.35 : 0.14)
                      : 'transparent',
                  border: isSelected
                    ? `2px solid ${hex}`
                    : `1px solid ${hex ? alpha(hex, 0.3) : theme.palette.divider}`,
                  boxShadow: isSelected ? `0 6px 16px ${alpha(hex as string, 0.4)}` : 'none',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': hex
                    ? { transform: 'translateY(-2px)', boxShadow: `0 8px 18px ${alpha(hex, 0.3)}` }
                    : {},
                }}
              >
                {dia}
              </Box>
            );
          })}
        </Box>
      </Card>
    </Box>
  );
}