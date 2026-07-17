// app/dashboard/familia/horario/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Avatar,
  Grid,
  Stack,
  useTheme,
} from '@mui/material';
import { alpha, keyframes } from '@mui/material/styles';

import ScheduleIcon from '@mui/icons-material/Schedule';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import TodayIcon from '@mui/icons-material/Today';
import RoomIcon from '@mui/icons-material/Room';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

type ColorKey = 'success' | 'info' | 'primary' | 'warning' | 'error' | 'secondary';

type Student = { nombre: string; iniciales: string; color: ColorKey };

interface ClaseInfo {
  materia: string;
  hora: string;
  aula: string;
  profesor: string;
  color: ColorKey;
}

interface RecordatorioInfo {
  titulo: string;
  fecha: string;
  hora: string;
  lugar: string;
  color: ColorKey;
}

const estudiantes: Student[] = [
  { nombre: 'Juan Pérez', iniciales: 'JP', color: 'success' },
  { nombre: 'María Gómez', iniciales: 'MG', color: 'primary' },
];

const claseActual: ClaseInfo = {
  materia: 'Matemáticas',
  hora: '13:30 - 14:15',
  aula: 'Aula 201',
  profesor: 'Prof. M. González',
  color: 'info',
};

const proximaClase: ClaseInfo = {
  materia: 'Lenguaje',
  hora: '14:15 - 15:00',
  aula: 'Aula 203',
  profesor: 'Prof. A. Rodríguez',
  color: 'warning',
};

const recordatorio: RecordatorioInfo = {
  titulo: 'Reunión de padres',
  fecha: 'Viernes 10 de octubre',
  hora: '17:00',
  lugar: 'Salón de Actos',
  color: 'error',
};

const materiaColorMap: Record<string, ColorKey> = {
  Matemáticas: 'info',
  Ciencias: 'success',
  Lenguaje: 'warning',
  Sociales: 'secondary',
  'Ed. Física': 'error',
  Arte: 'primary',
};

const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'] as const;
const diasLabel = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

const horario: {
  hora: string;
  lunes: string;
  martes: string;
  miercoles: string;
  jueves: string;
  viernes: string;
}[] = [
    { hora: '07:00 - 07:45', lunes: 'Matemáticas', martes: 'Ciencias', miercoles: 'Lenguaje', jueves: 'Sociales', viernes: 'Arte' },
    { hora: '07:45 - 08:30', lunes: 'Ciencias', martes: 'Matemáticas', miercoles: 'Sociales', jueves: 'Lenguaje', viernes: 'Ed. Física' },
    { hora: '08:30 - 09:15', lunes: 'Lenguaje', martes: 'Arte', miercoles: 'Matemáticas', jueves: 'Ciencias', viernes: 'Matemáticas' },
    { hora: '09:15 - 10:00', lunes: 'Sociales', martes: 'Ed. Física', miercoles: 'Ciencias', jueves: 'Arte', viernes: 'Lenguaje' },
  ];

export default function HorarioPage() {
  const theme = useTheme();
  const [estudianteActivo, setEstudianteActivo] = useState(0);

  const getHex = (color: ColorKey) => theme.palette[color].main;

  const fadeUp = (index: number) => ({
    animation: `${fadeInUp} 0.55s cubic-bezier(0.16, 1, 0.3, 1) both`,
    animationDelay: `${index * 90}ms`,
    '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  });

  const estudiante = estudiantes[estudianteActivo];

  const infoCards = [
    { kind: 'actual' as const, label: 'Clase actual', icon: <ScheduleIcon fontSize="small" />, data: claseActual },
    { kind: 'proxima' as const, label: 'Próxima clase', icon: <ArrowForwardIosIcon sx={{ fontSize: 16 }} />, data: proximaClase },
  ];

  return (
    <Box sx={{ p: { xs: 2.5, md: 4 }, bgcolor: 'background.default' }}>
      {/* Header */}
      <Stack sx={{ mb: 3, ...fadeUp(0) }}>
        <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.08em' }}>
          Portal de familia
        </Typography>
        <Typography variant="h4" fontWeight={800} sx={{ mt: 0.3 }}>
          Horario
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
          Clases del día y horario semanal de {estudiante.nombre}
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

      {/* Clase actual / próxima / recordatorio */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {infoCards.map((c, i) => {
          const hex = getHex(c.data.color);
          return (
            <Grid size={{ xs: 12, md: 4 }} key={c.kind}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3.5,
                  p: 2.5,
                  height: '100%',
                  border: '1px solid',
                  borderColor: alpha(hex, 0.25),
                  borderLeft: '4px solid',
                  borderLeftColor: hex,
                  background: `linear-gradient(90deg, ${alpha(hex, 0.06)}, transparent 40%)`,
                  transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease',
                  ...fadeUp(i + 2),
                  '&:hover': { transform: 'translateY(-3px)', boxShadow: `0 12px 28px ${alpha(hex, 0.2)}` },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: hex,
                      color: theme.palette.getContrastText(hex),
                      boxShadow: `0 6px 14px ${alpha(hex, 0.4)}`,
                    }}
                  >
                    {c.icon}
                  </Box>
                  <Typography variant="subtitle2" fontWeight={700} sx={{ color: hex }}>
                    {c.label}
                  </Typography>
                </Stack>
                <Typography variant="h6" fontWeight={800}>
                  {c.data.materia}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
                  {c.data.hora}
                </Typography>
                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.8 }}>
                  <RoomIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                  <Typography variant="caption" color="text.disabled">
                    {c.data.aula} · {c.data.profesor}
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          );
        })}

        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3.5,
              p: 2.5,
              height: '100%',
              border: '1px solid',
              borderColor: alpha(getHex(recordatorio.color), 0.25),
              borderLeft: '4px solid',
              borderLeftColor: getHex(recordatorio.color),
              background: `linear-gradient(90deg, ${alpha(getHex(recordatorio.color), 0.06)}, transparent 40%)`,
              transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease',
              ...fadeUp(4),
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: `0 12px 28px ${alpha(getHex(recordatorio.color), 0.2)}`,
              },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: getHex(recordatorio.color),
                  color: theme.palette.getContrastText(getHex(recordatorio.color)),
                  boxShadow: `0 6px 14px ${alpha(getHex(recordatorio.color), 0.4)}`,
                }}
              >
                <NotificationsActiveIcon sx={{ fontSize: 16 }} />
              </Box>
              <Typography variant="subtitle2" fontWeight={700} sx={{ color: getHex(recordatorio.color) }}>
                Recordatorio
              </Typography>
            </Stack>
            <Typography variant="h6" fontWeight={800}>
              {recordatorio.titulo}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
              {recordatorio.fecha} · {recordatorio.hora}
            </Typography>
            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.8 }}>
              <RoomIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
              <Typography variant="caption" color="text.disabled">
                {recordatorio.lugar}
              </Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Horario semanal */}
      <Card elevation={0} sx={{ borderRadius: 3.5, p: { xs: 2, md: 3 }, border: '1px solid', borderColor: 'divider', ...fadeUp(5) }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <TodayIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          <Typography variant="subtitle1" fontWeight={700}>
            Horario semanal
          </Typography>
        </Stack>

        <Box sx={{ overflowX: 'auto' }}>
          <Box sx={{ minWidth: 720 }}>
            {/* Encabezado de días */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '110px repeat(5, 1fr)', gap: 1, mb: 1 }}>
              <Box />
              {diasLabel.map((d) => (
                <Typography key={d} variant="caption" textAlign="center" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                  {d}
                </Typography>
              ))}
            </Box>

            {/* Filas */}
            <Stack spacing={1}>
              {horario.map((fila, rowIndex) => (
                <Box
                  key={rowIndex}
                  sx={{ display: 'grid', gridTemplateColumns: '110px repeat(5, 1fr)', gap: 1, alignItems: 'stretch' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      {fila.hora}
                    </Typography>
                  </Box>

                  {dias.map((dia) => {
                    const materia = fila[dia];
                    const color = materiaColorMap[materia] ?? 'primary';
                    const hex = getHex(color);
                    return (
                      <Box
                        key={dia}
                        sx={{
                          borderRadius: 2,
                          minHeight: 52,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          px: 0.5,
                          textAlign: 'center',
                          border: '1px solid',
                          borderColor: alpha(hex, 0.3),
                          bgcolor: alpha(hex, theme.palette.mode === 'dark' ? 0.3 : 0.14),
                          color: theme.palette.mode === 'dark' ? '#fff' : hex,
                          fontWeight: 700,
                          fontSize: 12,
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                          '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 8px 16px ${alpha(hex, 0.25)}` },
                        }}
                      >
                        {materia}
                      </Box>
                    );
                  })}
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}