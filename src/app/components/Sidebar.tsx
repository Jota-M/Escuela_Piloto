'use client';
import { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import 'react-pro-sidebar/dist/css/styles.css';
import { tokens } from '../dashboard/theme';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: (title: string) => void;
}

const Item = ({ title, to, icon, selected, setSelected }: ItemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const router = useRouter();

  const handleClick = () => {
    setSelected(title);
    router.push(to);
  };

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100], cursor: 'pointer' }}
      onClick={handleClick}
      icon={icon}
    >
      <Typography fontSize="0.95rem" fontWeight={500}>
        {title}
      </Typography>
    </MenuItem>
  );
};

// Aquí el array de secciones igual

const sections = [
  {
    label: 'Administración',
    items: [
      { title: 'Dashboard', to: '/dashboard', icon: <HomeOutlinedIcon /> },
      { title: 'Users', to: '/dashboard/users', icon: <PeopleOutlinedIcon /> },
      { title: 'Docentes', to: '/dashboard/docentes', icon: <ReceiptOutlinedIcon /> },
      { title: 'Estudiantes', to: '/dashboard/estudiantes', icon: <PersonOutlinedIcon /> },
    ],
  },
  {
    label: 'Académica',
    items: [
      { title: 'Asignaciones', to: '/dashboard/asignaciones', icon: <ContactsOutlinedIcon /> },
      { title: 'Materias', to: '/dashboard/horario', icon: <HelpOutlineOutlinedIcon /> },
      { title: 'Horarios y Paralelos', to: '/dashboard/materias', icon: <CalendarTodayOutlinedIcon /> },
    ],
  },
  {
    label: 'Padre de Familia/Tutor',
    items: [
      { title: 'Panel Principal', to: '/dashboard/Padre/principal', icon: <HomeOutlinedIcon /> },
      { title: 'Calificaciones', to: '/dashboard/Padre/calificaciones', icon: <PeopleOutlinedIcon /> },
      { title: 'Asistencia', to: '/dashboard/Padre/asistencia', icon: <ReceiptOutlinedIcon /> },
      { title: 'Horario', to: '/dashboard/Padre/horario', icon: <PersonOutlinedIcon /> },
      { title: 'Alertas', to: '/dashboard/Padre/alertas', icon: <TimelineOutlinedIcon /> },
    ],
  },
  {
    label: 'Profesor',
    items: [
      { title: 'Home', to: '/dashboard/profesor/home', icon: <HomeOutlinedIcon /> },
      { title: 'Notas y Calificaciones', to: '/dashboard/profesor/notas', icon: <PeopleOutlinedIcon /> },
      { title: 'Asistencia', to: '/dashboard/profesor/asistencia', icon: <ReceiptOutlinedIcon /> },
      { title: 'Clases', to: '/dashboard/profesor/clases', icon: <PersonOutlinedIcon /> },
    ],
  },
];

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');

  return (
    <Box
      sx={{
        overflow: 'hidden',
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
        '& .pro-menu': {
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'thin',
          scrollbarColor: `${colors.grey[700]} transparent`,
        },
        '& .pro-menu::-webkit-scrollbar': {
          width: '6px',
        },
        '& .pro-menu::-webkit-scrollbar-thumb': {
          backgroundColor: colors.grey[700],
          borderRadius: '4px',
        },
        '& .pro-icon-wrapper': { backgroundColor: 'transparent !important' },
        '& .pro-inner-item': { padding: '5px 35px 5px 20px !important' },
        '& .pro-inner-item:hover': { color: '#868dfb !important' },
        '& .pro-menu-item.active': { color: '#6870fa !important' },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO Y TOGGLE */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: '10px 0 20px 0', color: colors.grey[100], minWidth: 80 }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px" mr="10px">
                <Typography variant="h3" color={colors.grey[100]}>
                  I.I.P. - E.V.P.
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} sx={{ p: 1, minWidth: 40 }}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* PERFIL */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100"
                  height="100"
                  src={`/Icon.png`}
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: '10px 0 0 0' }}
                >
                  Escuelita
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Director Administrativo
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENÚ AGRUPADO POR ÁREAS */}
          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            {sections.map((section, i) => (
              <Box key={i} mb={2}>
                {!isCollapsed && (
                  <Typography
                    variant="subtitle2"
                    color={colors.grey[300]}
                    sx={{ textTransform: 'uppercase', fontWeight: 600, mb: 1, ml: 1 }}
                  >
                    {section.label}
                  </Typography>
                )}
                {section.items.map((item) => (
                  <Item
                    key={item.title}
                    title={item.title}
                    to={item.to}
                    icon={item.icon}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))}
                {i !== sections.length - 1 && (
                  <Divider sx={{ my: 1, bgcolor: colors.grey[700] }} />
                )}
              </Box>
            ))}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
