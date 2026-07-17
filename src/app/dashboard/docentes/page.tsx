// app/dashboard/docentes/page.tsx
'use client';

import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { tokens } from '@/app/dashboard/theme';

import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Stack,
  TextField,
  InputAdornment,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import DocenteTable from '@/app/components/DashAdmin/DocenteTable';

type TeacherStatus = 'Activo' | 'Inactivo';

type Teacher = {
  name: string;
  email: string;
  role: string;
  status: TeacherStatus;
  lastAccess: string;
  color: string;
};

type Stat = {
  tab: string;
  title: string;
  value: string | number;
  trend: string;
  icon: React.ReactNode;
  hex: string;
  featured?: boolean;
};

export default function Page() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [search, setSearch] = useState('');

  // 👨‍🏫 Docentes simulados
  const [teachers] = useState<Teacher[]>([
    { name: 'Luis Mamani Quispe', email: 'luis.mamani@uevp.edu.bo', role: 'Docente', status: 'Activo', lastAccess: 'Hace 1 hora', color: 'greenAccent' },
    { name: 'María López', email: 'maria.lopez@uevp.edu.bo', role: 'Docente', status: 'Inactivo', lastAccess: 'Hace 3 días', color: 'redAccent' },
    { name: 'Carlos Ticona', email: 'carlos.ticona@uevp.edu.bo', role: 'Docente', status: 'Activo', lastAccess: 'Hace 2 horas', color: 'greenAccent' },
  ]);

  const filteredTeachers = teachers.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const total = teachers.length;
  const activeCount = teachers.filter((t) => t.status === 'Activo').length;
  const inactiveCount = teachers.filter((t) => t.status === 'Inactivo').length;
  const activityRate = total > 0 ? Math.round((activeCount / total) * 100) : 0;

  const stats: Stat[] = [
    {
      tab: 'DOC',
      title: 'Total de docentes',
      value: total,
      trend: 'Registrados en la plataforma',
      icon: <PersonAddAlt1Icon fontSize="large" />,
      hex: colors.blueAccent[500],
      featured: true,
    },
    {
      tab: 'ACT',
      title: 'Activos',
      value: activeCount,
      trend: 'Con sesión reciente',
      icon: <CheckCircleOutlineIcon />,
      hex: colors.greenAccent[500],
    },
    {
      tab: 'INA',
      title: 'Inactivos',
      value: inactiveCount,
      trend: 'Sin acceso hace tiempo',
      icon: <RemoveCircleOutlineIcon />,
      hex: colors.redAccent[500],
    },
    {
      tab: 'TAS',
      title: 'Tasa de actividad',
      value: `${activityRate}%`,
      trend: 'Del total de la plantilla',
      icon: <TrendingUpIcon />,
      hex: '#facc15',
    },
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
        bgcolor: colors.primary[400],
        border: '1px solid',
        borderColor: `${stat.hex}30`,
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
          backgroundImage: `repeating-linear-gradient(${colors.grey[100]}08 0px, ${colors.grey[100]}08 1px, transparent 1px, transparent 22px)`,
          pointerEvents: 'none',
        },
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 24px ${stat.hex}30`,
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
          bgcolor: stat.hex,
          color: '#fff',
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
        <Typography variant="overline" sx={{ color: colors.grey[300], letterSpacing: '0.06em', lineHeight: 1.3 }}>
          {stat.title}
        </Typography>
        <Box sx={{ color: stat.hex, opacity: 0.85 }}>{stat.icon}</Box>
      </Box>

      <Typography
        sx={{
          fontVariantNumeric: 'tabular-nums',
          fontWeight: 800,
          fontSize: large ? 48 : 30,
          lineHeight: 1,
          color: colors.grey[100],
        }}
      >
        {stat.value}
      </Typography>

      <Typography variant="caption" sx={{ mt: 1.5, color: stat.hex, fontWeight: 600 }}>
        {stat.trend}
      </Typography>
    </Card>
  );

  return (
    <Box sx={{ p: { xs: 0 } }}>
      {/* Header */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ md: 'flex-end' }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="overline" sx={{ color: colors.grey[300], letterSpacing: '0.08em' }}>
            Administración
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={{ mt: 0.5 }}>
            Gestión de Docentes
          </Typography>
          <Typography variant="body2" sx={{ color: colors.grey[300], mt: 0.5 }}>
            Administra el personal docente y sus asignaciones
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <TextField
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar docentes..."
            sx={{ minWidth: 240, bgcolor: colors.primary[400], borderRadius: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: colors.grey[300], fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            href="/dashboard/docentes/nuevo"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: colors.blueAccent[500],
              color: 'white',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              '&:hover': { backgroundColor: colors.blueAccent[600] },
            }}
          >
            Agregar Docente
          </Button>
        </Stack>
      </Stack>

      {/* Stats */}
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

      {/* Tabla de docentes */}
      <Box
        sx={{
          backgroundColor: colors.primary[400],
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          p: 2,
        }}
      >
        <DocenteTable users={filteredTeachers} />
      </Box>
    </Box>
  );
}