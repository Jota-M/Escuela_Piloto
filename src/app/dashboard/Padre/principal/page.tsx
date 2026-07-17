// app/dashboard/familia/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Avatar,
  Grid,
  IconButton,
  useTheme,
  Divider,
  Button,
  Stack,
} from '@mui/material';
import { alpha, keyframes } from '@mui/material/styles';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

type Student = { nombre: string; iniciales: string; curso: string };
type Grade = {
  materia: string;
  detalle: string;
  profesor: string;
  nota: number;
  estado: string;
  hex: string;
};

const estudiantes: Student[] = [
  { nombre: 'Juan Pérez', iniciales: 'JP', curso: '5to "A" · Primaria' },
  { nombre: 'María Pérez', iniciales: 'MP', curso: '2do "B" · Secundaria' },
  { nombre: 'Antonio Pérez', iniciales: 'AP', curso: '1ro "C" · Inicial' },
];

export default function DashboardPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [selected, setSelected] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const calificaciones: Grade[] = [
    { materia: 'Matemáticas', detalle: 'Examen Parcial · Álgebra', profesor: 'Prof. María González', nota: 92, estado: 'Excelente', hex: theme.palette.success.main },
    { materia: 'Ciencias Naturales', detalle: 'Proyecto · Sistema Solar', profesor: 'Prof. Carlos Mendoza', nota: 88, estado: 'Muy bueno', hex: theme.palette.info.main },
    { materia: 'Lenguaje y Literatura', detalle: 'Ensayo · Mi familia', profesor: 'Prof. Ana Rodríguez', nota: 75, estado: 'Bueno', hex: theme.palette.warning.main },
  ];

  const fadeUp = (index: number) => ({
    animation: `${fadeInUp} 0.55s cubic-bezier(0.16, 1, 0.3, 1) both`,
    animationDelay: `${index * 90}ms`,
    '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  });

  const ScoreRing = ({ nota, hex }: { nota: number; hex: string }) => (
    <Box
      sx={{
        position: 'relative',
        width: 54,
        height: 54,
        borderRadius: '50%',
        flexShrink: 0,
        background: `conic-gradient(${hex} ${mounted ? nota * 3.6 : 0}deg, ${alpha(hex, 0.14)} 0deg)`,
        transition: 'background 1s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 5,
          borderRadius: '50%',
          bgcolor: 'background.paper',
        }}
      />
      <Typography sx={{ position: 'relative', fontWeight: 800, fontSize: 14, color: 'text.primary' }}>
        {nota}
      </Typography>
    </Box>
  );

  const kpis = [
    {
      title: 'Rendimiento académico',
      value: '87/100',
      icon: <CheckCircleIcon fontSize="small" />,
      hex: theme.palette.success.main,
      note: 'Excelente progreso',
    },
    {
      title: 'Asistencia',
      value: '96%',
      icon: <GroupsIcon fontSize="small" />,
      hex: theme.palette.info.main,
      note: 'Muy buena asistencia',
    },
    {
      title: 'Estado de pagos',
      value: 'Al día',
      icon: <CheckCircleIcon fontSize="small" />,
      hex: theme.palette.success.main,
      note: 'Sin pagos pendientes',
    },
    {
      title: 'Próximo pago',
      value: '$125',
      icon: <EventIcon fontSize="small" />,
      hex: theme.palette.warning.main,
      note: 'Vence en 15 días',
    },
  ];

  return (
    <Box sx={{ p: { xs: 2.5, md: 4 }, bgcolor: 'background.default' }}>
      {/* Bienvenida + selector de estudiante */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          p: { xs: 2.5, md: 3.5 },
          mb: 3,
          background: isDark
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.14)}, transparent 65%)`
            : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)}, transparent 65%)`,
          border: '1px solid',
          borderColor: alpha(theme.palette.primary.main, 0.14),
          ...fadeUp(0),
        }}
      >
        <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.08em' }}>
          Portal de familia
        </Typography>
        <Typography variant="h4" fontWeight={800} sx={{ mt: 0.3, mb: 2.5 }}>
          Hola, bienvenido/a
        </Typography>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          {estudiantes.map((e, i) => {
            const active = i === selected;
            return (
              <Box
                key={e.nombre}
                onClick={() => setSelected(i)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.2,
                  px: 1.6,
                  py: 0.9,
                  borderRadius: 99,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: active ? theme.palette.primary.main : 'divider',
                  bgcolor: active ? alpha(theme.palette.primary.main, 0.1) : 'background.paper',
                  boxShadow: active ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.14)}` : 'none',
                  transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    fontSize: 13,
                    fontWeight: 700,
                    bgcolor: active ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.08),
                    color: active ? theme.palette.getContrastText(theme.palette.primary.main) : 'text.secondary',
                    transition: 'background-color 0.28s ease, color 0.28s ease',
                  }}
                >
                  {e.iniciales}
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight={700} lineHeight={1.2}>
                    {e.nombre}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" lineHeight={1.2}>
                    {e.curso}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Card>

      {/* Indicadores principales */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {kpis.map((k, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={k.title}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3.5,
                p: 2.5,
                height: '100%',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease, border-color 0.28s ease',
                ...fadeUp(i + 1),
                '&:hover': {
                  transform: 'translateY(-3px)',
                  borderColor: alpha(k.hex, 0.4),
                  boxShadow: `0 12px 28px ${alpha(k.hex, 0.16)}`,
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
                  bgcolor: alpha(k.hex, 0.12),
                  color: k.hex,
                  mb: 1.5,
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
              <Typography variant="caption" sx={{ color: k.hex, fontWeight: 600 }}>
                {k.note}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Calificaciones recientes */}
      <Card
        elevation={0}
        sx={{ borderRadius: 3.5, p: { xs: 2, md: 3 }, mb: 3, border: '1px solid', borderColor: 'divider', ...fadeUp(5) }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
          <Typography variant="subtitle1" fontWeight={700}>
            Calificaciones recientes
          </Typography>
          <Button
            variant="text"
            size="small"
            endIcon={<ChevronRightIcon />}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Ver todas
          </Button>
        </Box>
        <Divider />
        {calificaciones.map((c, index) => (
          <Box
            key={c.materia}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              py: 1.8,
              borderBottom: index !== calificaciones.length - 1 ? '1px solid' : 'none',
              borderColor: 'divider',
              borderRadius: 2,
              transition: 'background-color 0.2s ease',
              '&:hover': { bgcolor: alpha(theme.palette.text.primary, 0.02) },
            }}
          >
            <Box display="flex" alignItems="center" gap={2} sx={{ minWidth: 0 }}>
              <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}>
                <AssignmentIcon fontSize="small" />
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography fontWeight={700} noWrap>
                  {c.materia}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {c.detalle}
                </Typography>
                <Typography variant="caption" color="text.disabled" noWrap>
                  {c.profesor}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="caption" sx={{ color: c.hex, fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
                {c.estado}
              </Typography>
              <ScoreRing nota={c.nota} hex={c.hex} />
            </Box>
          </Box>
        ))}
      </Card>

      {/* Resumen de asistencia */}
      <Card elevation={0} sx={{ borderRadius: 3.5, p: { xs: 2, md: 3 }, border: '1px solid', borderColor: 'divider', ...fadeUp(6) }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle1" fontWeight={700}>
            Resumen de asistencia
          </Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<CalendarTodayIcon />}
            sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 99 }}
          >
            Este mes
          </Button>
        </Box>

        <Box
          sx={{
            height: 8,
            borderRadius: 99,
            bgcolor: alpha(theme.palette.success.main, 0.12),
            overflow: 'hidden',
            mb: 2.5,
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: mounted ? '90%' : '0%',
              borderRadius: 99,
              bgcolor: theme.palette.success.main,
              transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </Box>

        <Grid container spacing={2}>
          {[
            { value: '20 días', label: 'Días de clase' },
            { value: '2 días', label: 'Faltas' },
            { value: '1 día', label: 'Atrasos' },
          ].map((s) => (
            <Grid size={{ xs: 12, md: 4 }} key={s.label}>
              <Typography variant="h5" fontWeight={800}>
                {s.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {s.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
}