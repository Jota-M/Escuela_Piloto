'use client';
import React, { useState } from 'react';
import Header from './Header';
import { useRouter } from 'next/navigation'; // ✅ Importar router

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // ✅ Hook de navegación

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    // 🔒 Simulación de login (solo frontend)
    setTimeout(() => {
      if (username === 'adminescuela' && password === 'adminescuela') {
        router.push('/dashboard'); // ✅ Redirige a /dashboard
      } else {
        setErrorMsg('Credenciales incorrectas');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* 🌌 Fondo con opacidad */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/fondo-pica.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -2,
        }}
      />
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        style={{ zIndex: -1 }}
      />

      <Header />

      <div className="mt-36 md:mt-20 lg:mt-0 flex flex-col md:flex-row w-full max-w-4xl rounded-2xl overflow-hidden shadow-xl bg-white/10 backdrop-blur-lg border border-white/10">
        {/* Lado izquierdo */}
        <div className="flex-1 p-8 md:p-12 text-white flex flex-col justify-center text-center">
          <img className="w-40 h-auto mx-auto mb-4" src="/School.png" alt="Logo" />
          <h1 className="text-3xl font-bold font-[Playfair_Display] italic">
            Unidad Educativa Escuela Vocacional Plataforma Educativa
          </h1>
          <p className="mt-4 text-sm text-gray-200">
            Bienvenido a la Escuela Vocacional Piloto en Llallagua, un centro de investigacion para diseñar modelos educativos con futuro.
          </p>
          <p className="mt-4 text-xs text-gray-400">
            © 2025 Unidad Educativa Vocacional Piloto – Llallagua
          </p>
        </div>

        <div className="hidden md:flex w-[1px] bg-white/30" />

        {/* Lado derecho: Login */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-white text-xl mb-4 font-semibold font-[Playfair_Display]">
            Iniciar Sesión
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-full px-5 py-3 bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-full px-5 py-3 bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur"
              required
            />

            {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-full mt-2 transition disabled:opacity-50"
            >
              {loading ? 'Cargando...' : '🔐 Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
