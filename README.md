# SAVEMEMORIES

App de eventos para llevar el control de invitados. Invitación digital (boda / XV / eventos).

## Cómo correrlo

```bash
cd invitacion-digital
npm install
npm run dev
```

- Invitación: http://localhost:5174/
- Confirmaciones + Excel: http://localhost:5174/respuestas
- Link por familia: `http://localhost:5174/?invitados=Fam.%20Pérez&cupos=4`

Textos, fecha, mapas y regalos: `src/features/boda/data.js`  
Fotos y música: `public/boda/`

Firebase es opcional. Sin `.env`, el RSVP queda en el navegador y se descarga a Excel.
