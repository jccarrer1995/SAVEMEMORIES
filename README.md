# SAVEMEMORIES

Plataforma de invitaciones digitales (boda, XV, baby shower y más).

Sitio publicado: https://jccarrer1995.github.io/SAVEMEMORIES/

## Cómo correrlo

```bash
npm install
npm run dev
```

## Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/` | Home comercial con secciones, FAQ y contacto |
| `/invitacion/juan-carlos-jessica` | Demo boda Juan Carlos & Jessica |
| `/demo/boda` | Alias legacy de la demo |
| `/respuestas/juan-carlos-jessica` | Confirmaciones del proyecto |
| `/login` | Acceso (etapa 3) |
| `/admin` | Panel administrador (etapa 4) |
| `/cliente` | Panel cliente (etapa 6) |

Link por familia (mismo formato de siempre):

`https://jccarrer1995.github.io/SAVEMEMORIES/?invitados=Fam.%20Pérez&cupos=4`

También funciona en:

`/invitacion/juan-carlos-jessica?invitados=...&cupos=...` o `/demo/boda?invitados=...&cupos=...`

## Estructura

Ver reglas y etapas en [`docs/DESARROLLO.md`](docs/DESARROLLO.md).

Config del proyecto demo: `src/features/invitations/templates/boda/config/juanCarlosJessica.js`  
Textos del sitio comercial (WhatsApp, email): `src/features/marketing/data/siteContent.js`  
Assets: `public/boda/`

Firebase es opcional en local. Sin `.env`, el RSVP queda en el navegador.
