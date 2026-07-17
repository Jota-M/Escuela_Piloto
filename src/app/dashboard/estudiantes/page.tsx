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
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import EstudianteTable from '@/app/components/DashAdmin/EstudianteTable';

type StudentStatus = 'Activo' | 'Inactivo';

type Student = {
  name: string;
  email: string;
  status: StudentStatus;
  lastAccess: string;
  color: string;
  career: string;
  average: number;
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

  // 👨‍🎓 Datos simulados de estudiantes
  const [students] = useState<Student[]>([
    {
      name: 'Ana Pérez',
      email: 'ana.perez@uevp.edu.bo',
      status: 'Activo',
      lastAccess: 'Hace 3 horas',
      color: 'blueAccent',
      career: 'Informática',
      average: 89.5,
    },
    {
      name: 'Juan Quispe',
      email: 'juan.quispe@uevp.edu.bo',
      status: 'Activo',
      lastAccess: 'Ayer',
      color: 'blueAccent',
      career: 'Electromecánica',
      average: 78.2,
    },
    {
      name: 'Lucía Mamani',
      email: 'lucia.mamani@uevp.edu.bo',
      status: 'Inactivo',
      lastAccess: 'Hace 5 días',
      color: 'blueAccent',
      career: 'Contabilidad',
      average: 65.9,
    },
  ]);

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const total = students.length;
  const activeCount = students.filter((s) => s.status === 'Activo').length;
  const inactiveCount = students.filter((s) => s.status === 'Inactivo').length;
  const activityRate = total > 0 ? Math.round((activeCount / total) * 100) : 0;

  const stats: Stat[] = [
    {
      tab: 'EST',
      title: 'Total de estudiantes',
      value: total,
      trend: 'Registrados en la plataforma',
      icon: <SchoolIcon fontSize="large" />,
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
      trend: 'Del total de la matrícula',
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
            Gestión de Estudiantes
          </Typography>
          <Typography variant="body2" sx={{ color: colors.grey[300], mt: 0.5 }}>
            Administra a los estudiantes y su información académica
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <TextField
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar estudiantes..."
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
            href="/dashboard/estudiantes/nuevo"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: colors.blueAccent[500],
              color: 'white',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              '&:hover': { backgroundColor: colors.blueAccent[600] },
            }}
          >
            Agregar Estudiante
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

      {/* Tabla de estudiantes */}
      <Box
        sx={{
          backgroundColor: colors.primary[400],
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          p: 2,
        }}
      >
        <EstudianteTable users={filteredStudents} />
      </Box>
    </Box>
  );
}