'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Avatar,
  Chip,
  IconButton,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Menu,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '@/app/dashboard/theme';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

type Asignacion = {
  id: string;
  usuario: string;
  tipo: 'Docente' | 'Estudiante';
  materia: string;
  horas: number;
  estado: 'Activo' | 'Pendiente';
};

const ASIGNACIONES: Asignacion[] = [
  { id: '1', usuario: 'Luis Mamani Quispe', tipo: 'Docente', materia: 'Matemáticas', horas: 4, estado: 'Activo' },
  { id: '2', usuario: 'María López', tipo: 'Docente', materia: 'Lenguaje', horas: 6, estado: 'Activo' },
  { id: '3', usuario: 'Ana Pérez', tipo: 'Estudiante', materia: 'Informática', horas: 2, estado: 'Pendiente' },
  { id: '4', usuario: 'Carlos Ticona', tipo: 'Docente', materia: 'Ciencias Naturales', horas: 5, estado: 'Activo' },
];

const stats = [
  { title: 'Docentes Asignados', value: '67/72', progress: 67 / 72 },
  { title: 'Estudiantes Inscritos', value: '892/950', progress: 892 / 950 },
  { title: 'Materias Cubiertas', value: '45/48', progress: 45 / 48 },
  { title: 'Asignaciones Pendientes', value: '12', progress: 1 },
];

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();
}

export default function AsignacionesDeUsuarios() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [menuRow, setMenuRow] = useState<string | null>(null);

  const filtered = ASIGNACIONES.filter((a) =>
    `${a.usuario} ${a.materia}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setMenuAnchor(event.currentTarget);
    setMenuRow(id);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setMenuRow(null);
  };

  return (
    <Box p={{ xs: 2, sm: 3, md: 4, lg: 1 }}>
      {/* Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        spacing={2}
        mb={4}
      >
        <Typography variant="h4" color={colors.grey[100]}>
          Asignaciones
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Año Escolar</InputLabel>
            <Select defaultValue="2024-2025" label="Año Escolar">
              <MenuItem value="2024-2025">2024-2025</MenuItem>
              <MenuItem value="2023-2024">2023-2024</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{
              backgroundColor: colors.blueAccent[500],
              color: '#fff',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              '&:hover': { backgroundColor: colors.blueAccent[600] },
            }}
          >
            Nueva Asignación
          </Button>
          <Button
            variant="contained"
            startIcon={<GroupsOutlinedIcon />}
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: '#fff',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              '&:hover': { backgroundColor: colors.greenAccent[700] },
            }}
          >
            Asignación Masiva
          </Button>
        </Stack>
      </Stack>

      {/* Resumen */}
      <Grid container spacing={2} mb={4}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Box
              sx={{
                backgroundColor: colors.primary[400],
                p: 3,
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                height: '100%',
              }}
            >
              <Typography variant="subtitle2" color={colors.grey[300]}>
                {stat.title}
              </Typography>
              <Typography variant="h6" fontWeight="bold" color={colors.grey[100]} sx={{ mb: 1 }}>
                {stat.value}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Math.min(stat.progress * 100, 100)}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: colors.grey[700],
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: colors.greenAccent[500],
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Estructura Académica */}
      <Box sx={{ backgroundColor: colors.primary[400], p: 3, borderRadius: '8px', mb: 4 }}>
        <Typography variant="h6" color={colors.grey[100]} mb={2}>
          Estructura Académica
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" color={colors.grey[100]} sx={{ mb: 1 }}>
            Educación Primaria
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {['1er Grado', '2do Grado', '3er Grado'].map((g) => (
              <Chip
                key={g}
                label={g}
                sx={{ bgcolor: `${colors.blueAccent[500]}20`, color: colors.blueAccent[500], fontWeight: 600 }}
              />
            ))}
          </Stack>
        </Box>
        <Box>
          <Typography variant="body1" color={colors.grey[100]} sx={{ mb: 1 }}>
            Educación Secundaria
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {['1er Grado', '2do Grado'].map((g) => (
              <Chip
                key={g}
                label={g}
                sx={{ bgcolor: `${colors.blueAccent[500]}20`, color: colors.blueAccent[500], fontWeight: 600 }}
              />
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Tabla de asignaciones actuales */}
      <Box sx={{ backgroundColor: colors.primary[400], p: 3, borderRadius: '8px' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={2} mb={2}>
          <Typography variant="h6" color={colors.grey[100]}>
            Asignaciones actuales
          </Typography>
          <TextField
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por usuario o materia..."
            sx={{ minWidth: 260 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: colors.grey[500], fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: colors.grey[300], fontWeight: 700 }}>Usuario</TableCell>
              <TableCell sx={{ color: colors.grey[300], fontWeight: 700 }}>Tipo</TableCell>
              <TableCell sx={{ color: colors.grey[300], fontWeight: 700 }}>Materia</TableCell>
              <TableCell sx={{ color: colors.grey[300], fontWeight: 700 }}>Horas</TableCell>
              <TableCell sx={{ color: colors.grey[300], fontWeight: 700 }}>Estado</TableCell>
              <TableCell sx={{ color: colors.grey[300], fontWeight: 700 }} align="right">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((a) => (
              <TableRow key={a.id} hover>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatar sx={{ width: 32, height: 32, fontSize: 13, bgcolor: colors.blueAccent[500] }}>
                      {initials(a.usuario)}
                    </Avatar>
                    <Typography variant="body2" color={colors.grey[100]}>
                      {a.usuario}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    label={a.tipo}
                    size="small"
                    sx={{
                      bgcolor: a.tipo === 'Docente' ? `${colors.blueAccent[500]}20` : `${colors.greenAccent[500]}20`,
                      color: a.tipo === 'Docente' ? colors.blueAccent[500] : colors.greenAccent[500],
                      fontWeight: 600,
                    }}
                  />
                </TableCell>
                <TableCell>{a.materia}</TableCell>
                <TableCell>{a.horas}h</TableCell>
                <TableCell>
                  <Chip
                    label={a.estado}
                    size="small"
                    sx={{
                      bgcolor: a.estado === 'Activo' ? `${colors.greenAccent[500]}20` : `${colors.redAccent[500]}20`,
                      color: a.estado === 'Activo' ? colors.greenAccent[500] : colors.redAccent[500],
                      fontWeight: 600,
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => setOpenDialog(true)}>
                    <EditIcon fontSize="small" sx={{ color: colors.grey[300] }} />
                  </IconButton>
                  <IconButton size="small" onClick={(e) => handleOpenMenu(e, a.id)}>
                    <MoreVertIcon fontSize="small" sx={{ color: colors.grey[300] }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: colors.grey[300], py: 4 }}>
                  No se encontraron asignaciones para "{search}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleCloseMenu}>
          <MenuItem onClick={handleCloseMenu}>Reasignar</MenuItem>
          <MenuItem onClick={handleCloseMenu} sx={{ color: colors.redAccent[500] }}>
            Eliminar asignación
          </MenuItem>
        </Menu>
      </Box>

      {/* Dialog: nueva asignación */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Nueva Asignación</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Seleccionar Usuario"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: colors.grey[500] }} />
                  </InputAdornment>
                ),
              }}
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Tipo de Asignación</InputLabel>
                  <Select defaultValue="Docente" label="Tipo de Asignación">
                    <MenuItem value="Docente">Docente</MenuItem>
                    <MenuItem value="Estudiante">Estudiante</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Asignación de Materias</InputLabel>
                  <Select defaultValue="Matemáticas" label="Asignación de Materias">
                    <MenuItem value="Matemáticas">Matemáticas</MenuItem>
                    <MenuItem value="Ciencias Naturales">Ciencias Naturales</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TextField fullWidth label="Horas" variant="outlined" defaultValue="4h" />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(false)}
            sx={{
              backgroundColor: colors.greenAccent[500],
              color: '#fff',
              '&:hover': { backgroundColor: colors.greenAccent[600] },
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}