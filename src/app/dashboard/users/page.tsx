// app/dashboard/usuarios/page.tsx
'use client';

import React, { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  useTheme,
  Grid,
  Card,
  Stack,
  TextField,
  InputAdornment,
} from '@mui/material';

import { tokens } from '@/app/dashboard/theme';

import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

type AccentKey = 'blueAccent' | 'greenAccent' | 'redAccent';

type UserStatus = 'Activo' | 'Pendiente' | 'Inactivo';
type UserRole = 'Docente' | 'Estudiante' | 'Secretaría';

type UserRow = {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastAccess: string;
};

const ROLE_COLOR: Record<UserRole, AccentKey> = {
  Docente: 'greenAccent',
  Estudiante: 'blueAccent',
  Secretaría: 'redAccent',
};

const STATUS_HEX: Record<UserStatus, string> = {
  Activo: '#2e7d32',
  Pendiente: '#facc15',
  Inactivo: '#e53935',
};

const users: UserRow[] = [
  { name: 'María González', email: 'maria.gonzalez@escuela.edu', role: 'Docente', status: 'Activo', lastAccess: 'Hace 2 horas' },
  { name: 'Juan Pérez', email: 'juan.perez@estudiante.edu', role: 'Estudiante', status: 'Activo', lastAccess: 'Hace 1 día' },
  { name: 'Ana Silva', email: 'ana.silva@secretaria.edu', role: 'Secretaría', status: 'Activo', lastAccess: 'Hace 3 horas' },
  { name: 'Carlos Rojas', email: 'carlos.rojas@estudiante.edu', role: 'Estudiante', status: 'Pendiente', lastAccess: 'Nunca' },
  { name: 'Lucía Fernández', email: 'lucia.fernandez@escuela.edu', role: 'Docente', status: 'Inactivo', lastAccess: 'Hace 3 meses' },
];

const getInitials = (name: string) =>
  name.split(' ').map((n) => n[0]).join('').slice(0, 2);

const ROLE_FILTERS: Array<UserRole | 'Todos'> = ['Todos', 'Docente', 'Estudiante', 'Secretaría'];

export default function UserDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'Todos'>('Todos');

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesRole = roleFilter === 'Todos' || u.role === roleFilter;
      const matchesQuery =
        query.trim() === '' ||
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase());
      return matchesRole && matchesQuery;
    });
  }, [query, roleFilter]);

  const stats = [
    { tab: 'TOT', title: 'Total usuarios', value: 1247, trend: '+12 esta semana', icon: <PeopleAltIcon fontSize="large" />, hex: colors.blueAccent[500], featured: true },
    { tab: 'ACT', title: 'Usuarios activos', value: 1189, trend: '95.3% del total', icon: <PersonOutlineIcon />, hex: colors.greenAccent[500] },
    { tab: 'PEN', title: 'Pendientes', value: 23, trend: 'Requieren aprobación', icon: <AccessTimeIcon />, hex: '#facc15' },
    { tab: 'INA', title: 'Inactivos', value: 35, trend: '2.8% del total', icon: <RemoveCircleOutlineIcon />, hex: colors.redAccent[500] },
  ];
  const featured = stats.find((s) => s.featured)!;
  const secondary = stats.filter((s) => !s.featured);

  const StatCard = ({ stat, large = false }: { stat: typeof stats[0]; large?: boolean }) => (
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
        '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 8px 24px ${stat.hex}30` },
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

      <Typography sx={{ fontVariantNumeric: 'tabular-nums', fontWeight: 800, fontSize: large ? 48 : 30, lineHeight: 1, color: colors.grey[100] }}>
        {stat.value}
      </Typography>

      <Typography variant="caption" sx={{ mt: 1.5, color: stat.hex, fontWeight: 600 }}>
        {stat.trend}
      </Typography>
    </Card>
  );

  const DotChip = ({ label, hex }: { label: string; hex: string }) => (
    <Chip
      size="small"
      label={label}
      sx={{
        bgcolor: `${hex}18`,
        color: colors.grey[100],
        fontWeight: 600,
        '& .MuiChip-label': { display: 'flex', alignItems: 'center', gap: 0.7, px: 0.5 },
      }}
      icon={
        <Box component="span" sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: hex, ml: 1 }} />
      }
    />
  );

  return (
    <Box sx={{ p: { xs: 2.5, md: 4 } }}>
      {/* Header */}
      <Stack direction="row" alignItems="flex-end" justifyContent="space-between" flexWrap="wrap" gap={2} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="overline" sx={{ color: colors.grey[300], letterSpacing: '0.08em' }}>
            Administración
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={{ mt: 0.5 }}>
            Gestión de Usuarios
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: colors.blueAccent[500],
            color: 'white',
            fontWeight: 700,
            '&:hover': { backgroundColor: colors.blueAccent[600] },
          }}
        >
          Nuevo Usuario
        </Button>
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

      {/* Toolbar: búsqueda + filtro de rol */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} justifyContent="space-between" sx={{ mb: 2 }}>
        <TextField
          size="small"
          placeholder="Buscar por nombre o correo..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ minWidth: { sm: 280 }, bgcolor: colors.primary[400], borderRadius: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: colors.grey[300], fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {ROLE_FILTERS.map((r) => (
            <Chip
              key={r}
              label={r}
              onClick={() => setRoleFilter(r)}
              sx={{
                fontWeight: 600,
                bgcolor: roleFilter === r ? colors.blueAccent[500] : colors.primary[400],
                color: roleFilter === r ? '#fff' : colors.grey[200],
                '&:hover': { bgcolor: roleFilter === r ? colors.blueAccent[600] : colors.primary[300] },
              }}
            />
          ))}
        </Stack>
      </Stack>

      {/* Tabla de usuarios */}
      <TableContainer component={Paper} sx={{ backgroundColor: colors.primary[400], borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: colors.grey[300], fontWeight: 700, borderBottom: `1px solid ${colors.primary[300]}` }}>Usuario</TableCell>
              <TableCell sx={{ color: colors.grey[300], fontWeight: 700, borderBottom: `1px solid ${colors.primary[300]}` }}>Rol</TableCell>
              <TableCell sx={{ color: colors.grey[300], fontWeight: 700, borderBottom: `1px solid ${colors.primary[300]}` }}>Estado</TableCell>
              <TableCell sx={{ color: colors.grey[300], fontWeight: 700, borderBottom: `1px solid ${colors.primary[300]}` }}>Último acceso</TableCell>
              <TableCell align="center" sx={{ color: colors.grey[300], fontWeight: 700, borderBottom: `1px solid ${colors.primary[300]}` }}>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((user, index) => {
              const roleHex = colors[ROLE_COLOR[user.role]][500];
              return (
                <TableRow
                  key={index}
                  sx={{ '&:hover': { bgcolor: colors.primary[500] }, '& td': { borderBottom: `1px solid ${colors.primary[300]}` } }}
                >
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ bgcolor: `${roleHex}25`, color: roleHex, border: `2px solid ${roleHex}`, mr: 2, fontWeight: 700 }}>
                        {getInitials(user.name)}
                      </Avatar>
                      <Box>
                        <Typography color={colors.grey[100]} fontWeight="bold">{user.name}</Typography>
                        <Typography color={colors.grey[300]} variant="body2">{user.email}</Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <DotChip label={user.role} hex={roleHex} />
                  </TableCell>

                  <TableCell>
                    <DotChip label={user.status} hex={STATUS_HEX[user.status]} />
                  </TableCell>

                  <TableCell>
                    <Typography color={colors.grey[200]}>{user.lastAccess}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <IconButton size="small">
                      <EditIcon sx={{ color: colors.grey[300], fontSize: 19 }} />
                    </IconButton>
                    <IconButton size="small">
                      <MoreVertIcon sx={{ color: colors.grey[300], fontSize: 19 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4, color: colors.grey[300] }}>
                  No se encontraron usuarios con ese criterio.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}