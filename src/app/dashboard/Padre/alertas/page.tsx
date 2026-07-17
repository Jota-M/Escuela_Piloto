// app/dashboard/familia/alertas/page.tsx
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
  LinearProgress,
} from '@mui/material';
import { alpha, keyframes } from '@mui/material/styles';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

type ColorKey = 'success' | 'info' | 'primary' | 'warning' | 'error';

type Student = { nombre: string; iniciales: string; color: ColorKey };
type AlertDetail = { label: string; value: string };
type Alert = {
  type: 'critical' | 'warning';
  title: string;
  description: string;
  action: string;
  timestamp: string;
  details: AlertDetail[];
};

const estudiantes: Student[] = [
  { nombre: 'Juan Pérez', iniciales: 'JP', color: 'success' },
  { nombre: 'María Gómez', iniciales: 'MG', color: 'primary' },
];

const alerts: Alert[] = [
  {
    type: 'critical',
    title: 'Calificación muy baja en Educación Física',
    description:
      'Juan ha obtenido una calificación de 5.8 en Educación Física, por debajo del mínimo requerido.',
    action: 'Contactar profesor',
    timestamp: 'Hace 2 horas',
    details: [
      { label: 'Clase de Educación Física', value: '5.8' },
      { label: 'Recomendación', value: 'Tomar clases de apoyo' },
    ],
  },
  {
    type: 'warning',
    title: 'Llegadas tarde frecuentes',
    description: 'Juan ha tenido llegadas tarde recurrentes. Se recomienda mejorar la puntualidad.',
    action: 'Ver más',
    timestamp: 'Hace 1 día',
    details: [
      { label: 'Frecuencia de llegadas tarde', value: '5 veces' },
      { label: 'Recomendación', value: 'Revisar horario y ser más puntual' },
    ],
  },
];

const summary = {
  totalAlerts: 12,
  criticalAlerts: 3,
  unreadAlerts: 7,
  resolvedAlerts: 8,
};

export default function AlertasPage() {
  const theme = useTheme();
  const [estudianteActivo, setEstudianteActivo] = useState(0);

  const getHex = (color: ColorKey) => theme.palette[color].main;

  const fadeUp = (index: number) => ({
    animation: `${fadeInUp} 0.55s cubic-bezier(0.16, 1, 0.3, 1) both`,
    animationDelay: `${index * 90}ms`,
    '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  });

  const criticalPct = (summary.criticalAlerts / summary.totalAlerts) * 100;
  const unreadPct = (summary.unreadAlerts / summary.totalAlerts) * 100;
  const resolvedPct = (summary.resolvedAlerts / summary.totalAlerts) * 100;

  const kpis = [
    {
      title: 'Total de alertas',
      value: String(summary.totalAlerts),
      icon: <NotificationsActiveIcon fontSize="small" />,
      color: 'primary' as ColorKey,
      note: 'Últimos 30 días',
      pct: 100,
    },
    {
      title: 'Alertas críticas',
      value: String(summary.criticalAlerts),
      icon: <ErrorOutlineIcon fontSize="small" />,
      color: 'error' as ColorKey,
      note: `${criticalPct.toFixed(0)}% del total`,
      pct: criticalPct,
    },
    {
      title: 'Sin leer',
      value: String(summary.unreadAlerts),
      icon: <MarkEmailUnreadIcon fontSize="small" />,
      color: 'info' as ColorKey,
      note: `${unreadPct.toFixed(0)}% del total`,
      pct: unreadPct,
    },
    {
      title: 'Resueltas',
      value: String(summary.resolvedAlerts),
      icon: <TaskAltIcon fontSize="small" />,
      color: 'success' as ColorKey,
      note: `${resolvedPct.toFixed(0)}% del total`,
      pct: resolvedPct,
    },
  ];

  return (
    <Box sx={{ p: { xs: 2.5, md: 4 }, bgcolor: 'background.default' }}>
      {/* Header */}
      <Stack sx={{ mb: 3, ...fadeUp(0) }}>
        <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.08em' }}>
          Portal de familia
        </Typography>
        <Typography variant="h4" fontWeight={800} sx={{ mt: 0.3 }}>
          Alertas y notificaciones
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
          Mantente informado sobre lo más importante de Juan Pérez
        </Typography>
      </Stack>

      {/* Selector de estudiante */}
      <Card
        elevation={0}
        sx={{ borderRadius: 4, p: { xs: 2.5, md: 3 }, mb: 3, border: '1px solid', borderColor: 'divider', ...fadeUp(1) }}
      >
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
                <LinearProgress
                  variant="determinate"
                  value={k.pct}
                  sx={{
                    mt: 1.5,
                    height: 6,
                    borderRadius: 99,
                    bgcolor: alpha(hex, 0.15),
                    '& .MuiLinearProgress-bar': { borderRadius: 99, bgcolor: hex },
                  }}
                />
                <Typography variant="caption" sx={{ color: hex, fontWeight: 700, display: 'block', mt: 0.8 }}>
                  {k.note}
                </Typography>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Lista de alertas */}
      <Stack spacing={2}>
        {alerts.map((alert, index) => {
          const hex = getHex(alert.type === 'critical' ? 'error' : 'warning');
          return (
            <Card
              key={index}
              elevation={0}
              sx={{
                borderRadius: 3.5,
                p: { xs: 2, md: 2.5 },
                border: '1px solid',
                borderColor: alpha(hex, 0.25),
                borderLeft: '4px solid',
                borderLeftColor: hex,
                background: `linear-gradient(90deg, ${alpha(hex, 0.06)}, transparent 30%)`,
                transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease',
                ...fadeUp(index + 6),
                '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 12px 26px ${alpha(hex, 0.18)}` },
              }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1.5}>
                <Box sx={{ flex: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: hex,
                        color: theme.palette.getContrastText(hex),
                        boxShadow: `0 6px 14px ${alpha(hex, 0.4)}`,
                        flexShrink: 0,
                      }}
                    >
                      <ErrorOutlineIcon sx={{ fontSize: 18 }} />
                    </Box>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {alert.title}
                    </Typography>
                  </Stack>

                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: { sm: 5.2 } }}>
                    {alert.description}
                  </Typography>

                  <Stack direction="row" spacing={0.6} alignItems="center" sx={{ mt: 1, ml: { sm: 5.2 } }}>
                    <AccessTimeIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                    <Typography variant="caption" color="text.disabled">
                      {alert.timestamp}
                    </Typography>
                  </Stack>

                  <Stack spacing={0.5} sx={{ mt: 1.5, ml: { sm: 5.2 } }}>
                    {alert.details.map((d, idx) => (
                      <Typography key={idx} variant="body2" color="text.secondary">
                        <Typography component="span" fontWeight={700} color="text.primary">
                          {d.label}:{' '}
                        </Typography>
                        {d.value}
                      </Typography>
                    ))}
                  </Stack>
                </Box>

                <Box sx={{ display: 'flex', alignItems: { xs: 'flex-start', sm: 'flex-end' }, flexShrink: 0 }}>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 700,
                      borderRadius: 99,
                      px: 2.5,
                      whiteSpace: 'nowrap',
                      background: `linear-gradient(135deg, ${hex}, ${alpha(hex, 0.8)})`,
                      boxShadow: `0 8px 20px ${alpha(hex, 0.35)}`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${alpha(hex, 0.9)}, ${hex})`,
                        boxShadow: `0 10px 24px ${alpha(hex, 0.45)}`,
                      },
                    }}
                  >
                    {alert.action}
                  </Button>
                </Box>
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}