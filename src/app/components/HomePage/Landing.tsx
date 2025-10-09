import React from 'react'
import Navbar from './Navbar'

function Landing() {
  return (
    <div
      id="Inicio"
      className="relative w-full h-dvh bg-fixed bg-cover bg-center overflow-hidden pt-32 md:min-h-screen md:flex md:items-center scroll-smooth"
      style={{ backgroundImage: "url('/fondo2.jpg')" }}
    >
      {/* Capa de opacidad encima del fondo */}
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      {/* Navbar y contenido por encima de la capa de opacidad */}
      <div className="relative z-10 w-full">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Texto */}
          <div className="space-y-6 text-center md:text-left animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg">
              Formación Vocacional con{" "}
              <span className="text-blue-400 decoration-blue-400 decoration-4 animate-pulse">
                Excelencia Académica
              </span>{" "}
              y{" "}
              <span className="text-red-400 decoration-blue-400 decoration-4 animate-pulse">
                Compromiso Universitario
              </span>
            </h1>

            <p className="text-gray-200 opacity-0 animate-fadeIn delay-500">
              Unidad Educativa Vocacional Piloto dependiente de la Universidad.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {/* Botón principal */}
              <button className="relative overflow-hidden bg-blue-500 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 active:scale-95 before:absolute before:inset-0 before:bg-white/10 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700">
                Conócenos
              </button>

              {/* Botón secundario */}
              <button className="relative overflow-hidden bg-white text-blue-700 px-6 py-3 rounded-lg font-medium border border-blue-500 shadow-lg hover:bg-blue-700 hover:text-white transition-transform transform hover:scale-105 active:scale-95 before:absolute before:inset-0 before:bg-blue-100/30 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700">
                Solicitar información
              </button>
            </div>
          </div>

          <img
            src="/logo.png"
            alt="Logo Decorativo"
            className="hidden md:block w-72 mx-auto opacity-0 animate-fadeIn delay-700 animate-bounce-slow"
          />
        </div>
      </div>
    </div>
  )
}

export default Landing
