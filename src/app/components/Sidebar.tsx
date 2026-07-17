'use client';

import { useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  alpha,
  Drawer,
  useMediaQuery,
} from '@mui/material';
import { keyframes } from '@mui/system';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseIcon from '@mui/icons-material/Close';

// ==================== ANIMACIONES (tomadas de ModernSidebar) ====================
const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ==================== RUTAS (idénticas a tu prototipo, sin tocar) ====================
// ⚠️ Ojo: "Materias" apunta a /dashboard/horario y "Horarios y Paralelos" apunta a
// /dashboard/materias — están cruzados en tu versión original. Los dejé tal cual
// porque pediste mantener las rutas, pero probablemente sea un bug a corregir.
const sections = [
  {
    label: 'Administración',
    items: [
      { title: 'Dashboard', to: '/dashboard', exact: true, icon: <HomeOutlinedIcon /> },
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

// ==================== ITEM DE MENÚ ====================
interface MenuItemProps {
  title: string;
  to: string;
  exact?: boolean;
  icon: React.ReactNode;
  currentPath: string;
  isCollapsed: boolean;
  onNavigate: () => void;
}

const MenuItem = ({ title, to, exact, icon, currentPath, isCollapsed, onNavigate }: MenuItemProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const normalizedTo = to.endsWith('/') ? to.slice(0, -1) : to;
  const normalizedPath = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
  const isActive = exact
    ? normalizedPath === normalizedTo
    : normalizedPath === normalizedTo || normalizedPath.startsWith(normalizedTo + '/');

  const content = (
    <Link href={to} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
      <ListItemButton
        onClick={onNavigate}
        sx={{
          minHeight: 46,
          px: 2,
          mb: 0.5,
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.25s ease',
          backgroundColor: isActive
            ? isDark
              ? alpha('#0288d1', 0.15)
              : alpha('#0288d1', 0.1)
            : 'transparent',
          '&:hover': {
            backgroundColor: isDark ? alpha('#0288d1', 0.12) : alpha('#0288d1', 0.08),
            transform: 'translateX(4px)',
          },
          '&::before': isActive
            ? {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 4,
              height: '70%',
              borderRadius: '0 4px 4px 0',
              background: 'linear-gradient(180deg, #0288d1, #01579b)',
              animation: `${pulse} 2s ease-in-out infinite`,
            }
            : {},
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isCollapsed ? 'auto' : 2,
            justifyContent: 'center',
            color: isActive ? '#0288d1' : isDark ? '#b0bec5' : '#607d8b',
          }}
        >
          {icon}
        </ListItemIcon>
        {!isCollapsed && (
          <ListItemText
            primary={title}
            primaryTypographyProps={{
              fontSize: '0.9rem',
              fontWeight: isActive ? 700 : 500,
              color: isActive ? '#0288d1' : 'inherit',
            }}
          />
        )}
      </ListItemButton>
    </Link>
  );

  if (isCollapsed) {
    return (
      <Tooltip title={title} placement="right" arrow>
        {content}
      </Tooltip>
    );
  }

  return content;
};

// ==================== SECCIÓN DE MENÚ ====================
interface MenuSectionProps {
  label: string;
  items: { title: string; to: string; exact?: boolean; icon: React.ReactNode }[];
  currentPath: string;
  isCollapsed: boolean;
  isLast: boolean;
  onNavigate: () => void;
}

const MenuSection = ({ label, items, currentPath, isCollapsed, isLast, onNavigate }: MenuSectionProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ mb: 2 }}>
      {!isCollapsed && (
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textTransform: 'uppercase',
            fontWeight: 700,
            letterSpacing: 1,
            color: isDark ? '#78909c' : '#90a4ae',
            px: 1.5,
            mb: 0.5,
          }}
        >
          {label}
        </Typography>
      )}

      <List component="div" disablePadding>
        {items.map((item, index) => (
          <Box key={item.title} sx={{ animation: `${fadeIn} 0.3s ease-out ${index * 0.05}s both` }}>
            <MenuItem
              title={item.title}
              to={item.to}
              exact={item.exact}
              icon={item.icon}
              currentPath={currentPath}
              isCollapsed={isCollapsed}
              onNavigate={onNavigate}
            />
          </Box>
        ))}
      </List>

      {!isLast && (
        <Divider
          sx={{
            mt: 1.5,
            mb: 0.5,
            borderColor: isDark ? alpha('#fff', 0.08) : alpha('#000', 0.08),
          }}
        />
      )}
    </Box>
  );
};

// ==================== CONTENIDO DEL SIDEBAR ====================
const SidebarContent = ({
  isCollapsed,
  isMobile,
  setIsCollapsed,
  pathname,
  isDark,
  onClose,
}: {
  isCollapsed: boolean;
  isMobile: boolean;
  setIsCollapsed: (v: boolean) => void;
  pathname: string;
  isDark: boolean;
  onClose: () => void;
}) => {
  return (
    <Box
      sx={{
        background: isDark ? '#020518' : '#ffffff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${isDark ? alpha('#fff', 0.07) : alpha('#000', 0.07)}`,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, #0288d1 0%, #26c6da 60%, transparent 100%)',
          },
        }}
      >
        {!isCollapsed && (
          <Box display="flex" alignItems="center" gap={1.5} flex={1}>
            <Box
              component="img"
              src="/Icon.png"
              alt="Logo"
              sx={{ width: 44, height: 44, borderRadius: '50%', flexShrink: 0 }}
            />
            <Box>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: isDark ? '#fff' : '#263238', lineHeight: 1.2 }}>
                Escuelita
              </Typography>
              <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: '#0288d1' }}>
                Director Administrativo
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isDark ? 'rgba(255,215,0,0.7)' : 'rgba(180,130,0,0.85)',
                }}
              >
                Escuela Piloto
              </Typography>
            </Box>
          </Box>
        )}

        <Tooltip title={isMobile ? 'Cerrar' : isCollapsed ? 'Expandir' : 'Contraer'} placement="right">
          <IconButton
            onClick={() => (isMobile ? onClose() : setIsCollapsed(!isCollapsed))}
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'rotate(180deg)',
                backgroundColor: isDark ? alpha('#0288d1', 0.15) : alpha('#0288d1', 0.1),
              },
            }}
          >
            {isMobile ? <CloseIcon sx={{ color: '#0288d1' }} /> : <MenuOutlinedIcon sx={{ color: '#0288d1' }} />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* NAVEGACIÓN */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          px: 1.5,
          py: 2,
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: isDark ? alpha('#fff', 0.1) : alpha('#000', 0.1),
            borderRadius: 3,
          },
        }}
      >
        {sections.map((section, i) => (
          <MenuSection
            key={section.label}
            label={section.label}
            items={section.items}
            currentPath={pathname}
            isCollapsed={isCollapsed}
            isLast={i === sections.length - 1}
            onNavigate={() => {
              if (isMobile) onClose();
            }}
          />
        ))}
      </Box>

      {/* FOOTER */}
      {!isCollapsed && (
        <Box sx={{ p: 2, borderTop: `1px solid ${isDark ? alpha('#fff', 0.08) : alpha('#000', 0.08)}` }}>
          <Typography variant="caption" sx={{ color: isDark ? '#546e7a' : '#78909c', textAlign: 'center', display: 'block', fontSize: '0.7rem' }}>
            © 2026 Escuela Vocacional
          </Typography>
        </Box>
      )}
    </Box>
  );
};

// ==================== COMPONENTE PRINCIPAL ====================
const Sidebar = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() || '/dashboard';

  const sidebarContent = (
    <SidebarContent
      isCollapsed={isMobile ? false : isCollapsed}
      isMobile={isMobile}
      setIsCollapsed={setIsCollapsed}
      pathname={pathname}
      isDark={isDark}
      onClose={() => setMobileOpen(false)}
    />
  );

  return (
    <>
      {isMobile && (
        <Box sx={{ position: 'fixed', top: 8, left: 8, zIndex: 1100 }}>
          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{
              width: 48,
              height: 48,
              border: `1px solid ${isDark ? alpha('#fff', 0.12) : alpha('#000', 0.12)}`,
              boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.08)',
              borderRadius: 2,
              backgroundColor: isDark ? '#020518' : '#fff',
            }}
          >
            <MenuOutlinedIcon sx={{ color: '#0288d1', fontSize: 22 }} />
          </IconButton>
        </Box>
      )}

      {isMobile ? (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: 280,
              background: isDark ? '#020518' : '#ffffff',
              borderRight: `1px solid ${isDark ? alpha('#fff', 0.12) : alpha('#000', 0.12)}`,
              boxShadow: '4px 0 24px rgba(0,0,0,0.2)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: 'linear-gradient(90deg, #0288d1, #01579b, #0288d1)',
                backgroundSize: '200% 100%',
                animation: `${shimmer} 3s linear infinite`,
              },
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      ) : (
        <Box
          sx={{
            height: '100vh',
            width: isCollapsed ? 80 : 280,
            backgroundColor: isDark ? '#1a2332' : '#ffffff',
            borderRight: `1px solid ${isDark ? alpha('#fff', 0.12) : alpha('#000', 0.12)}`,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: isDark ? '4px 0 24px rgba(0,0,0,0.3)' : '4px 0 24px rgba(0,0,0,0.08)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: 'linear-gradient(90deg, #0288d1, #01579b, #0288d1)',
              backgroundSize: '200% 100%',
              animation: `${shimmer} 3s linear infinite`,
            },
          }}
        >
          {sidebarContent}
        </Box>
      )}
    </>
  );
};

export default Sidebar;