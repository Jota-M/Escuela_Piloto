// app/dashboard/docente/clases/page.tsx
'use client';

import React, { useMemo, useState } from 'react';
import {
    Box,
    Typography,
    Card,
    Button,
    Grid,
    Avatar,
    Stack,
    useTheme,
} from '@mui/material';
import { alpha, keyframes } from '@mui/material/styles';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import RoomIcon from '@mui/icons-material/Room';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditNoteIcon from '@mui/icons-material/EditNote';
import TodayIcon from '@mui/icons-material/Today';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

type ColorKey = 'success' | 'info' | 'primary' | 'warning' | 'error' | 'secondary';

type Clase = {
    materia: string;
    grado: string;
    aula: string;
    estudiantes: number;
    promedio: number;
    color: ColorKey;
    horario: string; // resumen legible
};

const clases: Clase[] = [
    { materia: 'Matemáticas', grado: '10mo A', aula: 'Aula 201', estudiantes: 28, promedio: 82, color: 'primary', horario: 'Lun / Mié / Vie · 08:00' },
    { materia: 'Álgebra', grado: '11vo B', aula: 'Aula 203', estudiantes: 25, promedio: 76, color: 'info', horario: 'Mar / Jue · 10:00' },
    { materia: 'Cálculo', grado: '12vo A', aula: 'Aula 205', estudiantes: 22, promedio: 88, color: 'success', horario: 'Lun / Jue · 14:00' },
    { materia: 'Matemáticas', grado: '9no C', aula: 'Aula 108', estudiantes: 30, promedio: 71, color: 'warning', horario: 'Mié / Vie · 11:20' },
];

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

const periodos = ['07:15 - 08:00', '08:00 - 08:45', '09:50 - 10:35', '10:35 - 11:20', '11:20 - 12:05', '13:30 - 14:15', '14:15 - 15:00'];

// índice de clase (0-3) por día + período. undefined = libre
const grilla: Record<string, number> = {
    'Lunes-0': 0, 'Lunes-5': 2,
    'Martes-3': 1,
    'Miércoles-0': 0, 'Miércoles-4': 3,
    'Jueves-1': 1, 'Jueves-5': 2,
    'Viernes-0': 0, 'Viernes-4': 3,
};

export default function MisClasesDocentePage() {
    const theme = useTheme();

    const getHex = (color: ColorKey) => theme.palette[color].main;

    const fadeUp = (index: number) => ({
        animation: `${fadeInUp} 0.55s cubic-bezier(0.16, 1, 0.3, 1) both`,
        animationDelay: `${index * 90}ms`,
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
    });

    const totalEstudiantes = useMemo(() => clases.reduce((sum, c) => sum + c.estudiantes, 0), []);
    const totalHoras = Object.keys(grilla).length * 0.75;

    const kpis = [
        { title: 'Clases asignadas', value: String(clases.length), icon: <MenuBookIcon fontSize="small" />, color: 'primary' as ColorKey, note: 'Este período' },
        { title: 'Total estudiantes', value: String(totalEstudiantes), icon: <GroupsIcon fontSize="small" />, color: 'info' as ColorKey, note: 'En todos tus cursos' },
        { title: 'Horas por semana', value: `${totalHoras.toFixed(1)} hrs`, icon: <AccessTimeIcon fontSize="small" />, color: 'warning' as ColorKey, note: 'Distribuidas en 5 días' },
        { title: 'Próxima clase', value: 'Matemáticas 10mo A', icon: <EventAvailableIcon fontSize="small" />, color: 'success' as ColorKey, note: 'Hoy · 08:00' },
    ];

    return (
        <Box sx={{ p: { xs: 2.5, md: 4 }, bgcolor: 'background.default' }}>
            {/* Header */}
            <Stack sx={{ mb: 3, ...fadeUp(0) }}>
                <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.08em' }}>
                    Panel docente
                </Typography>
                <Typography variant="h4" fontWeight={800} sx={{ mt: 0.3 }}>
                    Mis clases
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
                    Materias y cursos que tienes asignados este período
                </Typography>
            </Stack>

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
                                    ...fadeUp(i + 1),
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
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Lista de clases */}
            <Grid container spacing={2.5} sx={{ mb: 3 }}>
                {clases.map((c, i) => {
                    const hex = getHex(c.color);
                    return (
                        <Grid size={{ xs: 12, md: 6 }} key={`${c.materia}-${c.grado}`}>
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
                                    background: `linear-gradient(90deg, ${alpha(hex, 0.06)}, transparent 45%)`,
                                    transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease',
                                    ...fadeUp(i + 5),
                                    '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 12px 26px ${alpha(hex, 0.18)}` },
                                }}
                            >
                                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1.5}>
                                    <Stack direction="row" spacing={1.5} sx={{ minWidth: 0 }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: hex,
                                                color: theme.palette.getContrastText(hex),
                                                fontWeight: 700,
                                                width: 42,
                                                height: 42,
                                            }}
                                        >
                                            <MenuBookIcon fontSize="small" />
                                        </Avatar>
                                        <Box sx={{ minWidth: 0 }}>
                                            <Typography fontWeight={800} noWrap>
                                                {c.materia}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" noWrap>
                                                {c.grado}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Box
                                        sx={{
                                            px: 1.4,
                                            py: 0.4,
                                            borderRadius: 99,
                                            fontSize: 12,
                                            fontWeight: 700,
                                            whiteSpace: 'nowrap',
                                            color: hex,
                                            bgcolor: alpha(hex, 0.14),
                                        }}
                                    >
                                        Prom. {c.promedio}
                                    </Box>
                                </Stack>

                                <Stack direction="row" spacing={2.5} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
                                    <Stack direction="row" spacing={0.6} alignItems="center">
                                        <RoomIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
                                        <Typography variant="caption" color="text.secondary">
                                            {c.aula}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={0.6} alignItems="center">
                                        <GroupsIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
                                        <Typography variant="caption" color="text.secondary">
                                            {c.estudiantes} estudiantes
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={0.6} alignItems="center">
                                        <AccessTimeIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
                                        <Typography variant="caption" color="text.secondary">
                                            {c.horario}
                                        </Typography>
                                    </Stack>
                                </Stack>

                                <Stack direction="row" spacing={1.2} sx={{ mt: 2.5 }}>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        startIcon={<CheckCircleIcon />}
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            borderRadius: 99,
                                            background: `linear-gradient(135deg, ${hex}, ${alpha(hex, 0.8)})`,
                                            boxShadow: `0 6px 16px ${alpha(hex, 0.35)}`,
                                            '&:hover': { background: `linear-gradient(135deg, ${alpha(hex, 0.9)}, ${hex})` },
                                        }}
                                    >
                                        Tomar asistencia
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        startIcon={<EditNoteIcon />}
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            borderRadius: 99,
                                            color: hex,
                                            borderColor: alpha(hex, 0.4),
                                            '&:hover': { bgcolor: alpha(hex, 0.08), borderColor: hex },
                                        }}
                                    >
                                        Calificar
                                    </Button>
                                </Stack>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Horario semanal */}
            <Card elevation={0} sx={{ borderRadius: 3.5, p: { xs: 2, md: 3 }, border: '1px solid', borderColor: 'divider', ...fadeUp(9) }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <TodayIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    <Typography variant="subtitle1" fontWeight={700}>
                        Horario semanal
                    </Typography>
                </Stack>

                <Box sx={{ overflowX: 'auto' }}>
                    <Box sx={{ minWidth: 760 }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '110px repeat(5, 1fr)', gap: 1, mb: 1 }}>
                            <Box />
                            {dias.map((d) => (
                                <Typography key={d} variant="caption" textAlign="center" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                                    {d}
                                </Typography>
                            ))}
                        </Box>

                        <Stack spacing={1}>
                            {periodos.map((periodo, pIndex) => (
                                <Box
                                    key={periodo}
                                    sx={{ display: 'grid', gridTemplateColumns: '110px repeat(5, 1fr)', gap: 1, alignItems: 'stretch' }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                            {periodo}
                                        </Typography>
                                    </Box>

                                    {dias.map((dia) => {
                                        const idx = grilla[`${dia}-${pIndex}`];
                                        const c = idx !== undefined ? clases[idx] : null;
                                        const hex = c ? getHex(c.color) : null;
                                        return (
                                            <Box
                                                key={dia}
                                                sx={{
                                                    borderRadius: 2,
                                                    minHeight: 52,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    px: 0.5,
                                                    textAlign: 'center',
                                                    border: '1px solid',
                                                    borderColor: hex ? alpha(hex, 0.3) : 'divider',
                                                    bgcolor: hex ? alpha(hex, theme.palette.mode === 'dark' ? 0.3 : 0.14) : 'transparent',
                                                    color: hex ? (theme.palette.mode === 'dark' ? '#fff' : hex) : 'text.disabled',
                                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                                    '&:hover': hex
                                                        ? { transform: 'translateY(-2px)', boxShadow: `0 8px 16px ${alpha(hex, 0.25)}` }
                                                        : {},
                                                }}
                                            >
                                                {c ? (
                                                    <>
                                                        <Typography sx={{ fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>
                                                            {c.materia}
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 10, opacity: 0.8 }}>{c.grado}</Typography>
                                                    </>
                                                ) : (
                                                    <Typography sx={{ fontSize: 12 }}>—</Typography>
                                                )}
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