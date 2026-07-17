'use client';

import React, { useMemo, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { tokens } from '@/app/dashboard/theme';

import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Stack,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

// ==================== TIPOS ====================
type Paralelo = {
  id: string;
  nivel: 'Primaria' | 'Secundaria';
  grado: string;
  paralelo: string;
  capacidad: number;
  matriculados: number;
  docenteGuia: string;
  aula: string;
};

type ClaseHorario = {
  dia: 'Lun' | 'Mar' | 'Mié' | 'Jue' | 'Vie';
  inicio: string; // "08:00"
  fin: string; // "08:45"
  materia: string;
  docente: string;
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

// ==================== DATOS SIMULADOS ====================
const PARALELOS: Paralelo[] = [
  { id: '6a', nivel: 'Primaria', grado: '6to', paralelo: 'A', capacidad: 35, matriculados: 32, docenteGuia: 'Luis Mamani Quispe', aula: 'Aula 12' },
  { id: '6b', nivel: 'Primaria', grado: '6to', paralelo: 'B', capacidad: 35, matriculados: 28, docenteGuia: 'María López', aula: 'Aula 13' },
  { id: '3a', nivel: 'Secundaria', grado: '3ro', paralelo: 'A', capacidad: 40, matriculados: 39, docenteGuia: 'Carlos Ticona', aula: 'Aula 21' },
  { id: '4a', nivel: 'Secundaria', grado: '4to', paralelo: 'A', capacidad: 40, matriculados: 30, docenteGuia: 'Ana Pérez', aula: 'Aula 22' },
];

const HORARIOS: Record<string, ClaseHorario[]> = {
  '6a': [
    { dia: 'Lun', inicio: '08:00', fin: '08:45', materia: 'Matemáticas', docente: 'L. Mamani', color: 'blueAccent' },
    { dia: 'Lun', inicio: '08:45', fin: '09:30', materia: 'Lenguaje', docente: 'M. López', color: 'greenAccent' },
    { dia: 'Mar', inicio: '08:00', fin: '08:45', materia: 'Ciencias', docente: 'C. Ticona', color: 'redAccent' },
    { dia: 'Mié', inicio: '08:00', fin: '08:45', materia: 'Matemáticas', docente: 'L. Mamani', color: 'blueAccent' },
    { dia: 'Jue', inicio: '09:30', fin: '10:15', materia: 'Educación Física', docente: 'A. Pérez', color: 'greenAccent' },
    { dia: 'Vie', inicio: '08:45', fin: '09:30', materia: 'Lenguaje', docente: 'M. López', color: 'greenAccent' },
  ],
  '6b': [
    { dia: 'Lun', inicio: '08:00', fin: '08:45', materia: 'Lenguaje', docente: 'M. López', color: 'greenAccent' },
    { dia: 'Mar', inicio: '08:45', fin: '09:30', materia: 'Matemáticas', docente: 'L. Mamani', color: 'blueAccent' },
  ],
  '3a': [
    { dia: 'Lun', inicio: '08:00', fin: '08:45', materia: 'Física', docente: 'C. Ticona', color: 'redAccent' },
    { dia: 'Jue', inicio: '08:00', fin: '08:45', materia: 'Química', docente: 'C. Ticona', color: 'redAccent' },
  ],
  '4a': [],
};

const DIAS: ClaseHorario['dia'][] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];
const FRANJAS = ['08:00', '08:45', '09:30', '10:15', '11:00', '11:45'];

// ==================== PÁGINA ====================
export default function Page() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [search, setSearch] = useState('');
  const [view, setView] = useState<'paralelos' | 'horarios'>('paralelos');
  const [paraleloSeleccionado, setParaleloSeleccionado] = useState(PARALELOS[0].id);

  const filteredParalelos = PARALELOS.filter((p) =>
    `${p.grado} ${p.paralelo} ${p.docenteGuia}`.toLowerCase().includes(search.toLowerCase())
  );

  const totalParalelos = PARALELOS.length;
  const capacidadTotal = PARALELOS.reduce((acc, p) => acc + p.capacidad, 0);
  const matriculadosTotal = PARALELOS.reduce((acc, p) => acc + p.matriculados, 0);
  const ocupacion = capacidadTotal > 0 ? Math.round((matriculadosTotal / capacidadTotal) * 100) : 0;

  const stats: Stat[] = [
    {
      tab: 'PAR',
      title: 'Paralelos activos',
      value: totalParalelos,
      trend: 'Entre primaria y secundaria',
      icon: <ClassOutlinedIcon fontSize="large" />,
      hex: colors.blueAccent[500],
      featured: true,
    },
    {
      tab: 'CAP',
      title: 'Capacidad total',
      value: capacidadTotal,
      trend: 'Cupos disponibles',
      icon: <GroupsOutlinedIcon />,
      hex: colors.greenAccent[500],
    },
    {
      tab: 'MAT',
      title: 'Matriculados',
      value: matriculadosTotal,
      trend: 'Estudiantes asignados',
      icon: <EventAvailableOutlinedIcon />,
      hex: colors.redAccent[500],
    },
    {
      tab: 'OCU',
      title: 'Ocupación',
      value: `${ocupacion}%`,
      trend: 'Del total de cupos',
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

  // Mapa día+franja -> clase, para pintar la grilla del paralelo seleccionado
  const grilla = useMemo(() => {
    const map = new Map<string, ClaseHorario>();
    (HORARIOS[paraleloSeleccionado] || []).forEach((c) => {
      map.set(`${c.dia}-${c.inicio}`, c);
    });
    return map;
  }, [paraleloSeleccionado]);

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
            Estructura Académica
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={{ mt: 0.5 }}>
            Horarios y Paralelos
          </Typography>
          <Typography variant="body2" sx={{ color: colors.grey[300], mt: 0.5 }}>
            Administra los paralelos por grado y el horario semanal de cada uno
          </Typography>
        </Box>

        {view === 'paralelos' && (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <TextField
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar paralelo o docente..."
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
              href="/dashboard/horarios-paralelos/nuevo"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: colors.blueAccent[500],
                color: 'white',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                '&:hover': { backgroundColor: colors.blueAccent[600] },
              }}
            >
              Nuevo Paralelo
            </Button>
          </Stack>
        )}
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

      {/* Tabs */}
      <Tabs
        value={view}
        onChange={(_, v) => setView(v)}
        sx={{
          mb: 3,
          '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 },
          '& .Mui-selected': { color: `${colors.blueAccent[500]} !important` },
          '& .MuiTabs-indicator': { backgroundColor: colors.blueAccent[500] },
        }}
      >
        <Tab label="Paralelos" value="paralelos" />
        <Tab label="Horario semanal" value="horarios" />
      </Tabs>

      {/* Vista: lista de paralelos */}
      {view === 'paralelos' && (
        <Box
          sx={{
            backgroundColor: colors.primary[400],
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            p: 2,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: colors.grey[300], fontWeight: 700 }}>Nivel</TableCell>
                <TableCell sx={{ color: colors.grey[300], fontWeight: 700 }}>Grado</TableCell>
                <TableCell sx={{ color: colors.grey[300], fontWeight: 700 }}>Paralelo</TableCell>
                <TableCell sx={{ color: colors.grey[300], fontWeight: 700 }}>Docente guía</TableCell>
                <TableCell sx={{ color: colors.grey[300], fontWeight: 700 }}>Aula</TableCell>
                <TableCell sx={{ color: colors.grey[300], fontWeight: 700 }}>Ocupación</TableCell>
                <TableCell sx={{ color: colors.grey[300], fontWeight: 700 }} align="right">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredParalelos.map((p) => {
                const ocupacionParalelo = Math.round((p.matriculados / p.capacidad) * 100);
                const lleno = ocupacionParalelo >= 90;
                return (
                  <TableRow key={p.id} hover>
                    <TableCell>{p.nivel}</TableCell>
                    <TableCell>{p.grado}</TableCell>
                    <TableCell>
                      <Chip
                        label={p.paralelo}
                        size="small"
                        sx={{ bgcolor: `${colors.blueAccent[500]}20`, color: colors.blueAccent[500], fontWeight: 700 }}
                      />
                    </TableCell>
                    <TableCell>{p.docenteGuia}</TableCell>
                    <TableCell>{p.aula}</TableCell>
                    <TableCell>
                      <Chip
                        label={`${p.matriculados}/${p.capacidad} · ${ocupacionParalelo}%`}
                        size="small"
                        sx={{
                          bgcolor: lleno ? `${colors.redAccent[500]}20` : `${colors.greenAccent[500]}20`,
                          color: lleno ? colors.redAccent[500] : colors.greenAccent[500],
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        startIcon={<EditOutlinedIcon fontSize="small" />}
                        onClick={() => {
                          setParaleloSeleccionado(p.id);
                          setView('horarios');
                        }}
                      >
                        Ver horario
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredParalelos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ color: colors.grey[300], py: 4 }}>
                    No se encontraron paralelos para "{search}"
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      )}

      {/* Vista: horario semanal */}
      {view === 'horarios' && (
        <Box
          sx={{
            backgroundColor: colors.primary[400],
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            p: 3,
          }}
        >
          <FormControl size="small" sx={{ minWidth: 220, mb: 3 }}>
            <InputLabel id="paralelo-select-label">Paralelo</InputLabel>
            <Select
              labelId="paralelo-select-label"
              label="Paralelo"
              value={paraleloSeleccionado}
              onChange={(e) => setParaleloSeleccionado(e.target.value)}
            >
              {PARALELOS.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.grado} "{p.paralelo}" — {p.nivel}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ overflowX: 'auto' }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: `100px repeat(${DIAS.length}, minmax(140px, 1fr))`,
                gap: 1,
                minWidth: 700,
              }}
            >
              {/* Encabezado de días */}
              <Box />
              {DIAS.map((dia) => (
                <Typography
                  key={dia}
                  variant="subtitle2"
                  sx={{ textAlign: 'center', fontWeight: 700, color: colors.grey[100], pb: 1 }}
                >
                  {dia}
                </Typography>
              ))}

              {/* Filas por franja horaria */}
              {FRANJAS.map((hora) => (
                <React.Fragment key={hora}>
                  <Typography
                    variant="caption"
                    sx={{ color: colors.grey[300], display: 'flex', alignItems: 'center', fontWeight: 600 }}
                  >
                    {hora}
                  </Typography>
                  {DIAS.map((dia) => {
                    const clase = grilla.get(`${dia}-${hora}`);
                    const accentHex = clase
                      ? (colors as any)[clase.color]?.[500] ?? colors.blueAccent[500]
                      : undefined;
                    return (
                      <Box
                        key={`${dia}-${hora}`}
                        sx={{
                          minHeight: 56,
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: clase ? `${accentHex}40` : colors.primary[500],
                          bgcolor: clase ? `${accentHex}15` : 'transparent',
                          p: 1,
                        }}
                      >
                        {clase && (
                          <>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: accentHex, display: 'block' }}>
                              {clase.materia}
                            </Typography>
                            <Typography variant="caption" sx={{ color: colors.grey[300] }}>
                              {clase.docente}
                            </Typography>
                          </>
                        )}
                      </Box>
                    );
                  })}
                </React.Fragment>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}