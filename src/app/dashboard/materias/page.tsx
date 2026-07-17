// app/dashboard/admin/materias/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Collapse,
  Stack,
  IconButton,
  Tooltip,
  TextField,
  MenuItem,
  useTheme,
} from '@mui/material';
import { alpha, keyframes } from '@mui/material/styles';

import SchoolIcon from '@mui/icons-material/School';
import CategoryIcon from '@mui/icons-material/Category';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

type ColorKey = 'success' | 'info' | 'primary' | 'warning' | 'error' | 'secondary';

interface Subject {
  name: string;
  credits: number;
  type: 'Obligatoria' | 'Electiva';
}

interface CategorySection {
  title: string;
  description: string;
  color: ColorKey;
  icon: React.ReactNode;
  subjects: Subject[];
}

const periodos = [
  { value: '2024', label: 'Gestión 2024' },
  { value: '2025', label: 'Gestión 2025' },
];

const categories: CategorySection[] = [
  {
    title: 'Nivel Inicial',
    description: 'Vida-Tierra-Territorio, Comunidad y Sociedades, Cosmos y Pensamiento',
    color: 'success',
    icon: <CategoryIcon fontSize="small" />,
    subjects: [
      { name: 'Desarrollo bio-psicomotriz (Ciencias Naturales)', credits: 6, type: 'Obligatoria' },
      { name: 'Desarrollo de la comunicación, lenguaje y artes (Música, APV, CS, Recreación)', credits: 5, type: 'Obligatoria' },
      { name: 'Desarrollo sociocultural, afectivo y espiritual', credits: 4, type: 'Obligatoria' },
      { name: 'Desarrollo del conocimiento y la producción (Matemáticas, Técnica Tecnológica)', credits: 4, type: 'Obligatoria' },
    ],
  },
  {
    title: 'Nivel Primario',
    description: 'Música, Artes Plásticas, Talleres',
    color: 'warning',
    icon: <LibraryBooksIcon fontSize="small" />,
    subjects: [
      { name: 'Comunicación y Lenguajes — Lengua Originaria y Extranjera', credits: 3, type: 'Electiva' },
      { name: 'Ciencias Sociales', credits: 2, type: 'Electiva' },
      { name: 'Artes Plásticas y Visuales', credits: 2, type: 'Electiva' },
      { name: 'Educación Física y Deportes', credits: 2, type: 'Electiva' },
      { name: 'Educación Musical', credits: 2, type: 'Electiva' },
      { name: 'Matemática', credits: 2, type: 'Electiva' },
      { name: 'Técnica Tecnológica', credits: 2, type: 'Electiva' },
      { name: 'Ciencias Naturales', credits: 2, type: 'Electiva' },
      { name: 'Valores, Espiritualidades y Religiones', credits: 2, type: 'Electiva' },
    ],
  },
  {
    title: 'Nivel Secundario',
    description: 'Física, Química, Historia',
    color: 'info',
    icon: <SchoolIcon fontSize="small" />,
    subjects: [
      { name: 'Deportes', credits: 2, type: 'Obligatoria' },
      { name: 'Recreación', credits: 1, type: 'Electiva' },
      { name: 'Salud y Bienestar', credits: 2, type: 'Obligatoria' },
    ],
  },
];

function CategoryCard({
  section,
  index,
  fadeUp,
}: {
  section: CategorySection;
  index: number;
  fadeUp: (i: number) => object;
}) {
  const [open, setOpen] = useState(index === 0);
  const theme = useTheme();
  const hex = theme.palette[section.color].main;

  return (
    <Box
      sx={{
        borderRadius: 3.5,
        border: '1px solid',
        borderColor: alpha(hex, 0.25),
        overflow: 'hidden',
        transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease',
        ...fadeUp(index),
        '&:hover': { boxShadow: `0 12px 28px ${alpha(hex, 0.15)}` },
      }}
    >
      {/* Header */}
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: { xs: 2, md: 3 },
          py: 1.8,
          cursor: 'pointer',
          background: `linear-gradient(90deg, ${alpha(hex, 0.14)}, ${alpha(hex, 0.03)})`,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
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
          {section.icon}
        </Box>

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="subtitle1" fontWeight={700}>
            {section.title}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
            {section.description}
          </Typography>
        </Box>

        <Box
          sx={{
            px: 1.4,
            py: 0.3,
            borderRadius: 99,
            fontSize: 12,
            fontWeight: 700,
            color: hex,
            bgcolor: alpha(hex, 0.14),
            whiteSpace: 'nowrap',
          }}
        >
          {section.subjects.length} materias
        </Box>

        <Tooltip title="Añadir nueva materia">
          <IconButton
            size="small"
            onClick={(e) => e.stopPropagation()}
            sx={{ color: hex, '&:hover': { bgcolor: alpha(hex, 0.12) } }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <ExpandMoreIcon
          sx={{
            color: 'text.secondary',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease',
          }}
        />
      </Box>

      {/* Materias */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack spacing={1.2} sx={{ p: { xs: 2, md: 3 } }}>
          {section.subjects.map((subject, i) => {
            const tipoHex = theme.palette[subject.type === 'Obligatoria' ? 'success' : 'info'].main;
            return (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                  p: 1.8,
                  borderRadius: 2.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'background-color 0.2s ease, transform 0.2s ease',
                  '&:hover': { bgcolor: alpha(hex, 0.05), transform: 'translateX(2px)' },
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="subtitle2" fontWeight={700} noWrap>
                    {subject.name}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Créditos: {subject.credits}
                    </Typography>
                    <Box
                      sx={{
                        px: 1,
                        py: 0.15,
                        borderRadius: 99,
                        fontSize: 11,
                        fontWeight: 700,
                        color: tipoHex,
                        bgcolor: alpha(tipoHex, 0.14),
                      }}
                    >
                      {subject.type}
                    </Box>
                  </Stack>
                </Box>
                <Tooltip title="Editar materia">
                  <IconButton size="small" sx={{ color: 'warning.main', flexShrink: 0 }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            );
          })}
        </Stack>
      </Collapse>
    </Box>
  );
}

export default function GestionMateriasPage() {
  const theme = useTheme();

  const getHex = (color: ColorKey) => theme.palette[color].main;

  const fadeUp = (index: number) => ({
    animation: `${fadeInUp} 0.55s cubic-bezier(0.16, 1, 0.3, 1) both`,
    animationDelay: `${index * 90}ms`,
    '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  });

  const kpis = [
    { title: 'Total materias', value: '48', icon: <LibraryBooksIcon fontSize="small" />, color: 'primary' as ColorKey, note: 'Activas en currículo' },
    { title: 'Materias básicas', value: '12', icon: <CategoryIcon fontSize="small" />, color: 'success' as ColorKey, note: 'Obligatorias' },
    { title: 'Materias electivas', value: '18', icon: <AddIcon fontSize="small" />, color: 'warning' as ColorKey, note: 'Opcionales' },
    { title: 'Créditos totales', value: '156', icon: <WorkspacePremiumIcon fontSize="small" />, color: 'secondary' as ColorKey, note: 'Por año académico' },
  ];

  return (
    <Box sx={{ p: { xs: 2.5, md: 4 }, bgcolor: 'background.default' }}>
      {/* Header */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ md: 'flex-end' }}
        spacing={2}
        sx={{ mb: 3, ...fadeUp(0) }}
      >
        <Box>
          <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.08em' }}>
            Gestión académica
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={{ mt: 0.3 }}>
            Gestión de materias
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
            Configura las materias del currículo académico, créditos y requisitos por grado
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          <Button
            variant="outlined"
            startIcon={<UploadFileIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 99,
              px: 2.2,
              borderColor: 'divider',
              color: 'text.primary',
              '&:hover': { bgcolor: alpha(theme.palette.text.primary, 0.06), borderColor: 'divider' },
            }}
          >
            Importar materias
          </Button>
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 99,
              px: 2.2,
              borderColor: 'divider',
              color: 'text.primary',
              '&:hover': { bgcolor: alpha(theme.palette.text.primary, 0.06), borderColor: 'divider' },
            }}
          >
            Exportar todo
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 99,
              px: 2.5,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.35)}`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                boxShadow: `0 10px 24px ${alpha(theme.palette.primary.main, 0.45)}`,
              },
            }}
          >
            Nueva materia
          </Button>
        </Stack>
      </Stack>

      {/* Selector de período */}
      <Box sx={{ mb: 3, ...fadeUp(1) }}>
        <TextField
          select
          label="Período"
          defaultValue="2025"
          sx={{
            width: { xs: '100%', sm: 260 },
            '& .MuiOutlinedInput-root': { borderRadius: 2.5, bgcolor: 'background.paper' },
          }}
        >
          {periodos.map((p) => (
            <MenuItem key={p.value} value={p.value}>
              {p.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* KPIs */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {kpis.map((k, i) => {
          const hex = getHex(k.color);
          return (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={k.title}>
              <Box
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
                <Typography variant="caption" sx={{ color: hex, fontWeight: 700 }}>
                  {k.note}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      {/* Categorías */}
      <Stack spacing={2.5}>
        {categories.map((cat, idx) => (
          <CategoryCard key={cat.title} section={cat} index={idx + 6} fadeUp={fadeUp} />
        ))}
      </Stack>
    </Box>
  );
}