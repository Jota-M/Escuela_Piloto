// app/dashboard/page.tsx
'use client';

import React from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  Chip,
  Avatar,
  Stack,
  Divider,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import ClassIcon from '@mui/icons-material/Class';
import EventIcon from '@mui/icons-material/Event';
import TodayIcon from '@mui/icons-material/Today';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PsychologyIcon from '@mui/icons-material/Psychology';

type Stat = {
  tab: string;
  title: string;
  value: number;
  trend: string;
  icon: React.ReactNode;
  color: string;
  featured?: boolean;
};

type ActivityItem = {
  icon: React.ReactNode;
  color: string;
  text: string;
  meta: string;
  time: string;
};

type RiskItem = {
  student: string;
  paralelo: string;
  materia: string;
};

type AgendaItem = {
  date: string;
  title: string;
};

const DashboardPage = () => {
  const theme = useTheme();

  const stats: Stat[] = [
    {
      tab: 'EST',
      title: 'Estudiantes matriculados',
      value: 1240,
      trend: '+18 este bimestre',
      icon: <SchoolIcon fontSize="large" />,
      color: theme.palette.primary.main,
      featured: true,
    },
    {
      tab: 'DOC',
      title: 'Profesores',
      value: 87,
      trend: '4 nuevos ingresos',
      icon: <PeopleIcon fontSize="medium" />,
      color: theme.palette.secondary.main,
    },
    {
      tab: 'CLA',
      title: 'Clases activas',
      value: 56,
      trend: '3 turnos',
      icon: <ClassIcon fontSize="medium" />,
      color: theme.palette.success.main,
    },
    {
      tab: 'EVT',
      title: 'Eventos próximos',
      value: 4,
      trend: 'Próx.: Feria de ciencias',
      icon: <EventIcon fontSize="medium" />,
      color: theme.palette.warning.main,
    },
  ];

  const activity: ActivityItem[] = [
    {
      icon: <AssignmentTurnedInIcon fontSize="small" />,
      color: theme.palette.success.main,
      text: 'Notas de Química cargadas',
      meta: '3ro de Secundaria "B"',
      time: 'hace 12 min',
    },
    {
      icon: <PsychologyIcon fontSize="small" />,
      color: theme.palette.primary.main,
      text: 'Predicción de riesgo generada',
      meta: '12 estudiantes analizados · Matemáticas',
      time: 'hace 40 min',
    },
    {
      icon: <ReceiptLongIcon fontSize="small" />,
      color: theme.palette.secondary.main,
      text: 'Solicitud de factura recibida',
      meta: 'Familia Quispe · 5to "A"',
      time: 'hace 1 h',
    },
    {
      icon: <WhatsAppIcon fontSize="small" />,
      color: theme.palette.success.main,
      text: 'Notificación de permiso enviada',
      meta: 'Padre confirmó recepción',
      time: 'hace 2 h',
    },
    {
      icon: <AssignmentTurnedInIcon fontSize="small" />,
      color: theme.palette.success.main,
      text: 'Período de evaluación cerrado',
      meta: 'Inicial · Nivel Primaria',
      time: 'hace 3 h',
    },
  ];

  const riskAlerts: RiskItem[] = [
    { student: 'Estudiante #0231', paralelo: '4to "A"', materia: 'Matemáticas' },
    { student: 'Estudiante #0198', paralelo: '2do "C"', materia: 'Física' },
    { student: 'Estudiante #0304', paralelo: '6to "B"', materia: 'Química' },
  ];

  const agenda: AgendaItem[] = [
    { date: '18 JUL', title: 'Feria de ciencias' },
    { date: '22 JUL', title: 'Reunión de padres · Primaria' },
    { date: '25 JUL', title: 'Cierre de bimestre' },
  ];

  const featured = stats.find((s) => s.featured) as Stat;
  const secondary = stats.filter((s) => !s.featured);

  const StatCard = ({ stat, large = false }: { stat: Stat; large?: boolean }) => (
    <Card
      elevation={0}
      sx={{
        position: 'relative',
        overflow: 'visible',
        borderRadius: 3,
        border: '1px solid',
        borderColor: alpha(stat.color, 0.18),
        bgcolor: alpha(stat.color, theme.palette.mode === 'dark' ? 0.06 : 0.04),
        p: large ? 3.5 : 2.5,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 3,
          backgroundImage: `repeating-linear-gradient(${alpha(
            theme.palette.text.primary,
            0.035
          )} 0px, ${alpha(theme.palette.text.primary, 0.035)} 1px, transparent 1px, transparent 22px)`,
          pointerEvents: 'none',
        },
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 24px ${alpha(stat.color, 0.18)}`,
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -14,
          left: 20,
          px: 1.4,
          py: 0.4,
          bgcolor: stat.color,
          color: theme.palette.getContrastText(stat.color),
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.08em',
          borderRadius: '4px 4px 0 0',
          clipPath: 'polygon(0 0, 100% 0, 92% 100%, 8% 100%)',
        }}
      >
        {stat.tab}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.06em', lineHeight: 1.3 }}>
          {stat.title}
        </Typography>
        <Box sx={{ color: stat.color, opacity: 0.85 }}>{stat.icon}</Box>
      </Box>

      <Typography
        sx={{
          fontVariantNumeric: 'tabular-nums',
          fontWeight: 800,
          fontSize: large ? 56 : 34,
          lineHeight: 1,
          color: 'text.primary',
        }}
      >
        {stat.value}
      </Typography>

      <Typography variant="caption" sx={{ mt: 1.5, color: alpha(stat.color, 0.9), fontWeight: 600 }}>
        {stat.trend}
      </Typography>
    </Card>
  );

  // Panel base para las secciones nuevas: acento a la izquierda, sin pestaña.
  const Panel = ({
    title,
    icon,
    color,
    children,
  }: {
    title: string;
    icon: React.ReactNode;
    color: string;
    children: React.ReactNode;
  }) => (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderLeft: '4px solid',
        borderLeftColor: color,
        p: 3,
        height: '100%',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Box sx={{ color, display: 'flex' }}>{icon}</Box>
        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>
      </Stack>
      {children}
    </Card>
  );

  return (
    <Box sx={{ p: { xs: 2.5, md: 4 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.08em' }}>
            Instituto de Investigaciones
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={{ mt: 0.5 }}>
            Escuela Vocacional "Piloto Articulado a la Universidad"
          </Typography>
        </Box>
        <Chip
          icon={<TodayIcon />}
          label="Bimestre 2 · 2026"
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.12),
            color: theme.palette.primary.main,
            fontWeight: 700,
            px: 1,
          }}
        />
      </Box>

      {/* Stats principales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <StatCard stat={featured} large />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Grid container spacing={3}>
            {secondary.map((stat) => (
              <Grid size={{ xs: 12, sm: 4 }} key={stat.tab}>
                <StatCard stat={stat} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Paneles de contexto */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Panel title="Actividad reciente" icon={<TodayIcon />} color={theme.palette.primary.main}>
            <Stack divider={<Divider flexItem />} spacing={1.5}>
              {activity.map((item, i) => (
                <Stack key={i} direction="row" spacing={1.5} alignItems="center" sx={{ py: 0.5 }}>
                  <Avatar sx={{ bgcolor: alpha(item.color, 0.15), color: item.color, width: 32, height: 32 }}>
                    {item.icon}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" fontWeight={600} noWrap>
                      {item.text}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {item.meta}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.disabled" sx={{ whiteSpace: 'nowrap' }}>
                    {item.time}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Panel>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={3}>
            <Panel
              title="Alertas de riesgo académico"
              icon={<WarningAmberIcon />}
              color={theme.palette.error.main}
            >
              <Stack divider={<Divider flexItem />} spacing={1.2}>
                {riskAlerts.map((r, i) => (
                  <Box key={i} sx={{ py: 0.5 }}>
                    <Typography variant="body2" fontWeight={600}>
                      {r.student}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {r.paralelo} · {r.materia}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Panel>

            <Panel title="Agenda próxima" icon={<EventIcon />} color={theme.palette.warning.main}>
              <Stack divider={<Divider flexItem />} spacing={1.2}>
                {agenda.map((a, i) => (
                  <Stack key={i} direction="row" spacing={1.5} alignItems="center" sx={{ py: 0.5 }}>
                    <Chip
                      label={a.date}
                      size="small"
                      sx={{
                        bgcolor: alpha(theme.palette.warning.main, 0.12),
                        color: theme.palette.warning.main,
                        fontWeight: 700,
                        fontSize: 11,
                      }}
                    />
                    <Typography variant="body2">{a.title}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Panel>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;