# Arquitectura de `src`

La aplicación está organizada por responsabilidad y por dominio:

```text
src/
├── app/                    # Entrada y enrutamiento principal
├── components/
│   └── shared/             # Componentes reutilizables entre dominios
├── features/
│   ├── studio/             # Sitio comercial de AHPixel
│   │   ├── components/
│   │   │   ├── canvas/     # Experiencia visual del proceso
│   │   │   └── contact/    # Formulario y contacto
│   │   ├── pages/          # Páginas públicas del estudio
│   │   └── styles/         # Estilos propios del estudio
│   └── demos/
│       ├── lumen/          # Demo Lumen Dental Studio
│       └── vanta/          # Demo Vanta Barber Club
├── types/                  # Declaraciones TypeScript
├── main.tsx                # Bootstrap de React
└── vite-env.d.ts           # Tipos del entorno Vite
```

## Criterios

- `app` decide qué experiencia se renderiza según la URL.
- `features` contiene funcionalidades completas y aisladas.
- `components/shared` solo contiene piezas usadas por más de una funcionalidad.
- Los imports internos usan el alias `@/` para evitar rutas relativas frágiles.
- Los prototipos retirados se conservan fuera de `src`, en `archive/legacy`, y no participan en la compilación.

Para agregar una nueva demo, crea `src/features/demos/nombre` con su aplicación, estilos y adaptador de ruta; después regístrala en `src/app/AppRouter.tsx`.
