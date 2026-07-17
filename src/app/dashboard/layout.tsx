"use client";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Box, useTheme } from "@mui/material";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      display="flex"
      height="100dvh"
      sx={{
        // Mismo tono que el sidebar (#020518) para que no haya costura entre
        // el sidebar y el contenido. En light mode dejamos un gris muy claro
        // en vez del blanco puro por defecto de MUI, que también se sentía plano.
        backgroundColor: isDark ? "#020518" : "#f4f6f8",
      }}
    >
      <Sidebar />
      <Box flex={1} display="flex" flexDirection="column" overflow="hidden">
        <Topbar />
        <Box
          p={4}
          flex={1}
          overflow="auto"
          sx={{
            backgroundColor: isDark ? "#020518" : "#f4f6f8",
            backgroundImage: isDark
              ? "radial-gradient(circle at 0% 0%, rgba(2,136,209,0.06), transparent 40%)"
              : "none",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}