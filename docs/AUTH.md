# Autenticación y roles — SAVEMEMORIES

## Resumen

- Login con **correo y contraseña** (Firebase Authentication).
- El rol (`admin` o `client`) vive en Firestore: `users/{uid}`.
- No hay registro público: el administrador crea cuentas manualmente.

## 1. Activar Email/Password en Firebase

1. [Firebase Console](https://console.firebase.google.com/) → proyecto **savememories-prd**
2. **Authentication** → **Sign-in method**
3. Habilita **Correo electrónico/Contraseña**

## 2. Crear un usuario

### Desde el panel admin (recomendado)

1. Inicia sesión como **admin** → **Clientes** → **+ Nuevo cliente**
2. Completa nombre, correo y contraseña temporal
3. El sistema crea la cuenta en Firebase Auth y el perfil `users/{uid}` con `role: "client"`

### Manualmente en Firebase Console

1. **Authentication** → **Users** → **Add user**
2. Ingresa correo y contraseña temporal

Copia el **UID** del usuario recién creado y úsalo **exactamente** como ID del documento en Firestore (debe coincidir letra por letra).

## 3. Asignar rol en Firestore

1. **Firestore Database** → colección `users`
2. Crear documento con ID = **UID** del paso anterior
3. Campos:

```json
{
  "email": "admin@ejemplo.com",
  "displayName": "Administrador",
  "role": "admin"
}
```

Para un cliente, usa `"role": "client"`.

## 4. Desplegar reglas de Firestore

Copia el contenido completo de `firestore.rules` en la raíz del repo y publícalo en **Firestore Database → Reglas → Publicar**.

Debe incluir helpers `isProjectOwner`, `canManageProject` y reglas que permitan al **cliente dueño** (`ownerId == uid`) leer sus proyectos y gestionar enlaces. La subcolección `links` queda así:

```javascript
match /links/{linkCode} {
  allow get: if isAdmin()
    || isProjectOwner(projectId)
    || (resource != null
        && resource.data.active == true
        && activeProject(projectId));
  allow list: if canManageProject(projectId);
  allow create: if canManageProject(projectId)
    && request.resource.data.guestLabel is string
    && request.resource.data.guestLabel.size() > 0
    && request.resource.data.cupos is number
    && request.resource.data.cupos >= 1
    && request.resource.data.active == true;
  allow update: if canManageProject(projectId);
  allow delete: if false;
}
```

En `projects/{projectId}`: `list` para clientes filtra por `ownerId`; `get` también permite al dueño aunque el proyecto esté en borrador.

El admin y el cliente dueño necesitan `get` en enlaces para comprobar códigos antes de crear; sin permiso en `get`, falla con *Missing or insufficient permissions*.

O desde la carpeta del proyecto:

```bash
firebase deploy --only firestore:rules
```

Sin este paso, la app **no puede leer** `users/{uid}` y el login fallará aunque Auth y Firestore estén bien configurados.

## 5. Probar acceso

- **Admin:** https://jccarrer1995.github.io/SAVEMEMORIES/login → redirige a `/admin`
- **Cliente:** mismo login → redirige a `/cliente`

Si el usuario existe en Auth pero **no** tiene documento en `users`, el login falla con: *"Tu cuenta no tiene un rol asignado"*.

## Rutas protegidas

| Ruta | Rol requerido |
|------|----------------|
| `/admin` | `admin` |
| `/admin/proyectos` | `admin` |
| `/admin/clientes` | `admin` |
| `/cliente` | `client` |
| `/cliente/proyectos` | `client` |
| `/cliente/proyectos/:projectId/enlaces` | `client` (solo si `ownerId` coincide) |
| `/cliente/proyectos/:projectId/respuestas` | `client` (solo si `ownerId` coincide) |

## Panel cliente

1. El administrador crea al cliente en **Admin → Clientes** o asigna el **UID** en el campo `ownerId` del proyecto.
2. El cliente inicia sesión y ve en `/cliente/proyectos` solo los eventos donde `ownerId` es su UID.
3. Desde cada proyecto puede:
   - Ver confirmaciones RSVP y **exportar Excel**
   - Crear y activar/desactivar enlaces personalizados (respetando `linkLimit`)

Si un cliente no ve proyectos, verifica que el documento en Firestore tenga `ownerId` exactamente igual al UID de Authentication.

## Reglas Firestore

- Cada usuario solo puede **leer** su propio documento `users/{uid}`.
- Colección `projects`: lectura pública solo si `status == 'active'`; admin lee/escribe todo; cliente dueño lee los suyos (`ownerId`).
- Subcolección `projects/{id}/links/{linkCode}`: lectura pública solo si el enlace está `active` y el proyecto activo; admin y dueño gestionan enlaces.
- Colección `bodaRsvps`: creación pública (formulario invitación); lectura abierta para listar confirmaciones en paneles.
- Colección `users`: cada usuario lee su propio doc; el admin puede listar, crear, editar y eliminar perfiles con `role: "client"`.

## Desarrollo local

Asegúrate de tener `.env` con las claves Firebase (ver `.env.example`). Sin ellas, `/login` muestra aviso de configuración pendiente.
