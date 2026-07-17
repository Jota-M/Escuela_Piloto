// app/dashboard/docente/asistencia/page.tsx
'use client';

import React, { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Button,
  TextField,
  Avatar,
  Grid,
  MenuItem,
  IconButton,
  Stack,
  useTheme,
} from '@mui/material';
import { alpha, keyframes } from '@mui/material/styles';

import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

type ColorKey = 'success' | 'info' | 'primary' | 'warning' | 'error' | 'secondary';
type Estado = 'presente' | 'ausente' | 'tardanza' | null;

interface Student {
  id: number;
  name: string;
  code: string;
  attendance: number;
  initials: string;
  color: ColorKey;
  status: Estado;
}

const colorCycle: ColorKey[] = ['primary', 'secondary', 'warning', 'error', 'success', 'info'];

const initialStudents: Student[] = [
  { id: 1, name: 'Ana Pérez', code: '#001234', attendance: 95, initials: 'AP', color: 'primary', status: 'presente' },
  { id: 2, name: 'Carlos Morales', code: '#001235', attendance: 78, initials: 'CM', color: 'secondary', status: 'ausente' },
  { id: 3, name: 'Lucía Rodríguez', code: '#001236', attendance: 98, initials: 'LR', color: 'warning', status: 'ausente' },
  { id: 4, name: 'Milenca Terrazas', code: '#001566', attendance: 66, initials: 'MT', color: 'error', status: 'presente' },
  { id: 5, name: 'Diego Fernández', code: '#001567', attendance: 88, initials: 'DF', color: 'success', status: 'presente' },
  { id: 6, name: 'Valeria Gómez', code: '#001568', attendance: 91, initials: 'VG', color: 'error', status: 'presente' },
  { id: 7, name: 'Tomás Aguilar', code: '#001569', attendance: 74, initials: 'TA', color: 'secondary', status: 'ausente' },
  { id: 8, name: 'Camila Soto', code: '#001570', attendance: 99, initials: 'CS', color: 'primary', status: 'presente' },
  { id: 9, name: 'Esteban Rojas', code: '#001571', attendance: 82, initials: 'ER', color: 'info', status: 'ausente' },
  { id: 10, name: 'Julieta Méndez', code: '#001572', attendance: 96, initials: 'JM', color: 'warning', status: 'presente' },
];

const estadoConfig: Record<Exclude<Estado, null>, { label: string; color: ColorKey; icon: React.ReactNode }> = {
  presente: { label: 'Presente', color: 'success', icon: <CheckIcon fontSize="small" /> },
  ausente: { label: 'Ausente', color: 'error', icon: <CloseIcon fontSize="small" /> },
  tardanza: { label: 'Tardanza', color: 'warning', icon: <AccessTimeIcon fontSize="small" /> },
};

export default function AsistenciaDocentePage() {
  const theme = useTheme();
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [busqueda, setBusqueda] = useState('');

  const getHex = (color: ColorKey) => theme.palette[color].main;

  const fadeUp = (index: number) => ({
    animation: `${fadeInUp} 0.55s cubic-bezier(0.16, 1, 0.3, 1) both`,
    animationDelay: `${index * 90}ms`,
    '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  });

  const updateStatus = (id: number, newStatus: Exclude<Estado, null>) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status: s.status === newStatus ? null : newStatus } : s)));
  };

  const markAll = (status: Exclude<Estado, null>) => {
    setStudents((prev) => prev.map((s) => ({ ...s, status })));
  };

  const countStatus = (status: Exclude<Estado, null>) => students.filter((s) => s.status === status).length;

  const filtrados = useMemo(
    () => students.filter((s) => s.name.toLowerCase().includes(busqueda.toLowerCase())),
    [students, busqueda]
  );

  const summary = [
    { key: 'presente' as const, count: countStatus('presente') },
    { key: 'ausente' as const, count: countStatus('ausente') },
    { key: 'tardanza' as const, count: countStatus('tardanza') },
  ];

  const selectStyle = {
    '& .MuiOutlinedInput-root': { borderRadius: 2.5, bgcolor: 'background.paper' },
  };

  return (
    <Box sx={{ p: { xs: 2.5, md: 4 }, bgcolor: 'background.default' }}>
      {/* Header */}
      <Stack sx={{ mb: 3, ...fadeUp(0) }}>
        <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.08em' }}>
          Panel docente
        </Typography>
        <Typography variant="h4" fontWeight={800} sx={{ mt: 0.3 }}>
          Tomar asistencia
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
          Registra la asistencia de tu clase en curso
        </Typography>
      </Stack>

      {/* Clase / fecha / hora */}
      <Card
        elevation={0}
        sx={{ borderRadius: 4, p: { xs: 2.5, md: 3 }, mb: 3, border: '1px solid', borderColor: 'divider', ...fadeUp(1) }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              CLASE ACTUAL
            </Typography>
            <TextField fullWidth select size="small" defaultValue="Matemáticas - 10mo A" sx={{ mt: 0.6, ...selectStyle }}>
              <MenuItem value="Matemáticas - 10mo A">Matemáticas - 10mo A</MenuItem>
              <MenuItem value="Lenguaje - 9no B">Lenguaje - 9no B</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              FECHA
            </Typography>
            <TextField
              fullWidth
              size="small"
              defaultValue="Lunes, 15 Enero 2024"
              sx={{ mt: 0.6, ...selectStyle }}
              InputProps={{ startAdornment: <CalendarTodayIcon sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} /> }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              HORA ACTUAL
            </Typography>
            <TextField
              fullWidth
              size="small"
              defaultValue="08:15 AM"
              sx={{ mt: 0.6, ...selectStyle }}
              InputProps={{ startAdornment: <ScheduleIcon sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} /> }}
            />
          </Grid>
        </Grid>
      </Card>

      {/* Resumen de estados */}
      <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mb: 3, ...fadeUp(2) }}>
        {summary.map((s) => {
          const cfg = estadoConfig[s.key];
          const hex = getHex(cfg.color);
          return (
            <Stack
              key={s.key}
              direction="row"
              spacing={0.8}
              alignItems="center"
              sx={{
                px: 1.8,
                py: 0.8,
                borderRadius: 99,
                border: '1px solid',
                borderColor: alpha(hex, 0.3),
                bgcolor: alpha(hex, theme.palette.mode === 'dark' ? 0.14 : 0.1),
                color: hex,
                fontWeight: 700,
              }}
            >
              {cfg.icon}
              <Typography variant="body2" fontWeight={700} sx={{ color: hex }}>
                {cfg.label}: {s.count}
              </Typography>
            </Stack>
          );
        })}
      </Stack>

      {/* Búsqueda + acciones masivas */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ md: 'center' }}
        spacing={1.5}
        sx={{ mb: 2, ...fadeUp(3) }}
      >
        <Typography variant="subtitle1" fontWeight={700}>
          Estudiantes ({filtrados.length})
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: { xs: '100%', md: 'auto' } }}>
          <TextField
            size="small"
            placeholder="Buscar estudiante..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            sx={selectStyle}
            InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} /> }}
          />
          <Button
            variant="contained"
            startIcon={<CheckIcon />}
            onClick={() => markAll('presente')}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 99,
              whiteSpace: 'nowrap',
              background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
              boxShadow: `0 8px 20px ${alpha(theme.palette.success.main, 0.35)}`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.success.dark}, ${theme.palette.success.main})`,
                boxShadow: `0 10px 24px ${alpha(theme.palette.success.main, 0.45)}`,
              },
            }}
          >
            Todos presentes
          </Button>
          <Button
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={() => markAll('ausente')}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 99,
              whiteSpace: 'nowrap',
              color: theme.palette.error.main,
              borderColor: alpha(theme.palette.error.main, 0.4),
              '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.08), borderColor: theme.palette.error.main },
            }}
          >
            Todos ausentes
          </Button>
        </Stack>
      </Stack>

      {/* Lista de estudiantes */}
      <Stack spacing={1.2}>
        {filtrados.map((student, i) => {
          const avatarHex = getHex(student.color);
          return (
            <Card
              key={student.id}
              elevation={0}
              sx={{
                borderRadius: 3,
                p: { xs: 1.5, lg: 1.8 },
                border: '1px solid',
                borderColor: 'divider',
                ...fadeUp(Math.min(i, 8) + 4),
                transition: 'box-shadow 0.2s ease',
                '&:hover': { boxShadow: `0 8px 20px ${alpha(theme.palette.text.primary, 0.06)}` },
              }}
            >
              <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="space-between" alignItems={{ lg: 'center' }} spacing={1.5}>
                {/* Estudiante */}
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ minWidth: 0, flexShrink: 0 }}>
                  <Avatar sx={{ bgcolor: avatarHex, color: theme.palette.getContrastText(avatarHex), fontWeight: 700 }}>
                    {student.initials}
                  </Avatar>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography fontWeight={700} noWrap>
                      {student.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {student.code} · Asistencia: {student.attendance}%
                    </Typography>
                  </Box>
                </Stack>

                {/* Acciones */}
                <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap" useFlexGap>
                  {(Object.keys(estadoConfig) as Exclude<Estado, null>[]).map((key) => {
                    const cfg = estadoConfig[key];
                    const hex = getHex(cfg.color);
                    const isActive = student.status === key;
                    return (
                      <Button
                        key={key}
                        size="small"
                        startIcon={cfg.icon}
                        onClick={() => updateStatus(student.id, key)}
                        sx={{
                          textTransform: 'none',
                          fontWeight: 700,
                          borderRadius: 99,
                          px: 1.6,
                          border: '1px solid',
                          borderColor: isActive ? hex : alpha(hex, 0.3),
                          color: isActive ? theme.palette.getContrastText(hex) : hex,
                          background: isActive ? `linear-gradient(135deg, ${hex}, ${alpha(hex, 0.8)})` : 'transparent',
                          boxShadow: isActive ? `0 6px 14px ${alpha(hex, 0.35)}` : 'none',
                          '&:hover': {
                            background: isActive ? `linear-gradient(135deg, ${hex}, ${alpha(hex, 0.8)})` : alpha(hex, 0.08),
                            borderColor: hex,
                          },
                        }}
                      >
                        {cfg.label}
                      </Button>
                    );
                  })}

                  <TextField size="small" placeholder="Notas..." sx={{ width: 140, ...selectStyle }} />
                  <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}