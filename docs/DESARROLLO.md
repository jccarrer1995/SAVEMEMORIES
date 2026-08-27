# Reglas de desarrollo — SAVEMEMORIES

Documento de referencia para construir la plataforma de invitaciones digitales por etapas.

## Objetivo del producto

Plataforma multi-proyecto con:

- **Home comercial** para captar cotizaciones.
- **Administrador**: crea proyectos, asigna plantilla, contenido, imágenes, GPS, fecha y cuotas de enlaces.
- **Cliente**: consulta respuestas y genera enlaces dentro del límite asignado.
- **Invitación pública**: URL con código seguro; si se altera, mostrar error.

## Principios React

1. **Componentes pequeños y con una responsabilidad** — UI, hooks y servicios separados.
2. **Datos ≠ presentación** — la plantilla visual no debe contener textos fijos del evento.
3. **Composición sobre herencia** — secciones reutilizables por plantilla.
4. **Estado local mínimo** — levantar estado solo cuando varios componentes lo necesiten.
5. **Efectos acotados** — un `useEffect` por preocupación (título, scroll, audio, etc.).
6. **Context con moderación** — usar contexto para configuración del proyecto activo, no para todo el árbol.
7. **Lazy loading** — rutas de admin, cliente y exportaciones pesadas con `React.lazy`.
8. **Accesibilidad** — botones reales, labels, `aria-label` donde haga falta.

## Organización de carpetas

**No dejar archivos sueltos en `src/`.** Solo `main.jsx` e `index.css` en la raíz de `src/`.

```
src/
  app/                    # Arranque, router, providers globales
    router/
    providers/
  features/               # Módulos por dominio de negocio
    marketing/            # Home comercial
    invitations/          # Invitaciones públicas
      core/               # Tipos, registry, contexto, utilidades
      templates/          # Plantillas (boda, xv, babyshower…)
        boda/
          config/
          components/
          sections/
          pages/
          hooks/
          services/
          styles/
    admin/                # Panel administrador
    client/               # Panel cliente
  lib/                    # Integraciones externas (Firebase, etc.)
  shared/                 # UI y utilidades transversales
    components/
    constants/
    hooks/
    utils/
docs/                     # Documentación del proyecto
public/                   # Assets estáticos por plantilla o proyecto
```

Reglas:

- Cada **feature** tiene su propia carpeta con `pages/`, `components/`, `services/` según necesite.
- Los **servicios** (Firestore, Excel, auth) viven en `services/` dentro de la feature o en `lib/`.
- Los **tipos JSDoc** compartidos van en `core/types/` o `shared/types/`.
- **Nada de lógica de negocio** dentro de componentes de presentación puros.

## Límite de tamaño de archivos

| Tipo | Máximo recomendado |
|------|-------------------|
| Componentes `.jsx` | **200–300 líneas** |
| Servicios / hooks | **200 líneas** |
| CSS por plantilla | Dividir por sección si supera ~400 líneas |

Si un archivo crece:

1. Extraer secciones a `sections/`.
2. Extraer iconos o UI repetida a `components/`.
3. Mover lógica a `hooks/` o `services/`.

## Roles y permisos

Definidos en `src/shared/constants/roles.js`:

| Rol | Acceso |
|-----|--------|
| `admin` | CRUD de proyectos, clientes, plantillas, cuotas y configuración |
| `client` | Solo sus proyectos: respuestas, enlaces dentro del límite |
| *(público)* | Solo invitación con código válido; sin panel |

Reglas de código:

- Rutas de admin bajo `/admin/*` protegidas por rol.
- Rutas de cliente bajo `/cliente/*` protegidas y filtradas por `ownerId`.
- Nunca confiar en query params para cupos o nombre del invitado — validar en Firestore por `linkCode`.
- Firestore rules deben reflejar estos roles (etapa 7).

## Modelo de datos (orientativo)

```
users/{uid}           → role, email, displayName
projects/{projectId}  → templateId, slug, ownerId, content, limits, status
projects/{id}/links/{linkCode} → guestLabel, cupos, active
projects/{id}/rsvps/{rsvpId}   → respuestas del formulario
```

La colección legacy `bodaRsvps` se mantiene hasta migrar datos en una etapa posterior.

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home comercial (etapa 2) |
| `/invitacion/:projectId/:linkCode` | Invitación personalizada |
| `/demo/boda` | Demo legacy de la boda actual |
| `/login` | Autenticación |
| `/admin/*` | Panel administrador |
| `/cliente/*` | Panel cliente |

## Convenciones de nombres

- Componentes: `PascalCase.jsx`
- Hooks: `useNombre.js`
- Servicios: `camelCase.js` (verbo + sustantivo: `saveRsvp.js`)
- Constantes: `UPPER_SNAKE_CASE`
- Slugs de proyecto: `kebab-case` (ej. `juan-carlos-jessica`)

## Etapas de implementación

1. **Base multiproyecto** — registry, contexto, carpetas, demo funcionando.
2. **Home comercial** — landing informativa y CTA de cotización.
3. **Auth y roles** — Firebase Auth + guards de ruta.
4. **Admin proyectos** — CRUD, plantilla, contenido, assets.
5. **Enlaces seguros** — códigos, cupos en servidor, error en URL inválida.
6. **Panel cliente** — respuestas, cuota de enlaces, Excel.
7. **Seguridad y deploy** — Firestore rules, pruebas, publicación.

## Checklist antes de cerrar una etapa

- [ ] `npm run build` sin errores
- [ ] Ningún archivo nuevo supera 300 líneas
- [ ] Carpetas respetan la estructura anterior
- [ ] Rutas legacy siguen funcionando si aplica
- [ ] README o este doc actualizado si cambió la estructura
