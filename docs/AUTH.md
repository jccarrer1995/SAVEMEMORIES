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

Debe incluir, dentro de `match /projects/{projectId}`, la subcolección:

```javascript
match /links/{linkCode} {
  allow get: if isAdmin()
    || (resource != null
        && resource.data.active == true
        && activeProject(projectId));
  allow list: if isAdmin();
  allow create: if isAdmin()
    && request.resource.data.guestLabel is string
    && request.resource.data.guestLabel.size() > 0
    && request.resource.data.cupos is number
    && request.resource.data.cupos >= 1
    && request.resource.data.active == true;
  allow update: if isAdmin();
  allow delete: if false;
}
```

El admin necesita `get` en enlaces para comprobar códigos antes de crear; sin `isAdmin()` en `get`, falla con *Missing or insufficient permissions*.

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
| `/cliente` | `client` |

## Reglas Firestore

- Cada usuario solo puede **leer** su propio documento `users/{uid}`.
- Colección `projects`: lectura pública solo si `status == 'active'`; admin puede leer/escribir todo.
- Subcolección `projects/{id}/links/{linkCode}`: lectura pública solo si el enlace está `active` y el proyecto activo; admin gestiona enlaces.
- Escritura de roles: solo desde consola Firebase (etapa posterior podrá hacerlo el admin desde la app).

## Desarrollo local

Asegúrate de tener `.env` con las claves Firebase (ver `.env.example`). Sin ellas, `/login` muestra aviso de configuración pendiente.
