'use client';
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { tokens } from "@/app/dashboard/theme";

import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import SchoolIcon from "@mui/icons-material/School";
import Card from "@/app/components/DashAdmin/Card";
import EstudianteTable from "../../components/DashAdmin/EstudianteTable";

export default function Page() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [search, setSearch] = useState("");

  // 👨‍🎓 Datos simulados de estudiantes
  const [students] = useState([
  {
    name: "Ana Pérez",
    email: "ana.perez@uevp.edu.bo",
    status: "Activo",
    lastAccess: "Hace 3 horas",
    color: "blueAccent",
    career: "Informática",
    average: 89.5,
  },
  {
    name: "Juan Quispe",
    email: "juan.quispe@uevp.edu.bo",
    status: "Activo",
    lastAccess: "Ayer",
    color: "blueAccent",
    career: "Electromecánica",
    average: 78.2,
  },
  {
    name: "Lucía Mamani",
    email: "lucia.mamani@uevp.edu.bo",
    status: "Inactivo",
    lastAccess: "Hace 5 días",
    color: "blueAccent",
    career: "Contabilidad",
    average: 65.9,
  },
]);


  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Grid container spacing={3}>
      {/* Encabezado y búsqueda */}
      <Grid
        size={{ xs: 12, md: 6, lg: 12 }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
        sx={{
          backgroundColor: colors.primary[400],
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          height: "100%",
          width: "100%",
          p: 2,
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h2" gutterBottom>
            Gestión de Estudiantes
          </Typography>
          <Typography variant="h5">
            Administra a los estudiantes y su información académica
          </Typography>
        </Box>
        <Box display="flex" gap={2} alignItems="center">
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label="Buscar estudiantes"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            href="/dashboard/estudiantes/nuevo"
          >
            <AddIcon sx={{ mr: 1 }} />
            Agregar Estudiante
          </Button>
        </Box>
      </Grid>

      {/* Tarjetas resumen */}
      <Grid
        size={{ lg: 12 }}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr 1fr",
          },
          gap: 2,
        }}
      >
        <Card
          icon={SchoolIcon}
          title="Total Estudiantes"
          value={students.length}
          change={0}
          goal={500}
          description="Total de estudiantes registrados en la plataforma."
        />
        <Card
          icon={SchoolIcon}
          title="Activos"
          value={students.filter((s) => s.status === "Activo").length}
          change={0}
          goal={450}
          description="Número de estudiantes actualmente activos."
        />
        <Card
          icon={SchoolIcon}
          title="Inactivos"
          value={students.filter((s) => s.status === "Inactivo").length}
          change={0}
          goal={50}
          description="Número de estudiantes inactivos."
        />
        <Card
          icon={SchoolIcon}
          title="Total"
          value={students.length}
          goal={500}
          description="Número total de estudiantes activos e inactivos."
        />
      </Grid>

      {/* Tabla de estudiantes */}
      <Grid
        size={{ xs: 12 }}
        sx={{
          backgroundColor: colors.primary[400],
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          p: 2,
        }}
      >
        <EstudianteTable users={filteredStudents} />
      </Grid>
    </Grid>
  );
}
