import { LEGAL_CONTACT } from '../data/legalMeta.js'
import { SITE } from '../data/siteContent.js'

/** @type {Array<{ id: string, title: string, body: import('react').ReactNode }>} */
export const PRIVACY_SECTIONS = [
  {
    id: '1',
    title: '1. Responsable, alcance y marco legal',
    body: (
      <>
        <p>
          La presente Política de Privacidad describe cómo <strong>{LEGAL_CONTACT.product}</strong> (operado
          bajo la marca {SITE.name}) trata los datos personales cuando utilizas el sitio web, una invitación
          digital, el formulario de confirmación (RSVP) o los paneles de administración y cliente.
        </p>
        <p>
          Para efectos de la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP) y normativa
          concordante:
        </p>
        <ul>
          <li>
            Respecto de <strong>datos de invitados al evento</strong> (nombres, teléfonos, mensajes de
            RSVP, etc.), el <strong>Cliente contratante del evento</strong> actúa generalmente como
            responsable del tratamiento (define la finalidad: organizar la celebración y gestionar
            asistencia). {SITE.name} actúa como <strong>encargado del tratamiento</strong>, procesando esos
            datos según instrucciones del Cliente y la configuración del proyecto.
          </li>
          <li>
            Respecto de <strong>cuentas de panel</strong>, datos de contacto comercial y operación de la
            plataforma, el Operador de {SITE.name} actúa como <strong>responsable del tratamiento</strong>.
          </li>
        </ul>
        <p>
          Contacto para privacidad:{' '}
          <a href={`mailto:${LEGAL_CONTACT.email}`} className="marketing-link">
            {LEGAL_CONTACT.email}
          </a>
          . Producción:{' '}
          <a href={LEGAL_CONTACT.productionUrl} className="marketing-link">
            {LEGAL_CONTACT.productionUrl}
          </a>
          . Proyecto Firebase: <code>{LEGAL_CONTACT.firebaseProjectId}</code>.
        </p>
      </>
    ),
  },
  {
    id: '2',
    title: '2. Inventario de tratamientos y categorías de datos',
    body: (
      <>
        <p>La tabla siguiente resume los principales tratamientos implementados en la aplicación actual:</p>
        <div className="marketing-legal-table-wrap">
          <table className="marketing-legal-table">
            <thead>
              <tr>
                <th>Actividad</th>
                <th>Datos tratados</th>
                <th>Quién los ve</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Visita al sitio de marketing</td>
                <td>Datos técnicos del navegador; posibles logs de Hosting (IP, user-agent, URL)</td>
                <td>Operador; Google (Firebase Hosting)</td>
              </tr>
              <tr>
                <td>Contacto (correo, WhatsApp)</td>
                <td>Datos que tú envíes fuera de la app (correo, mensaje)</td>
                <td>Operador; proveedor de correo o Meta/WhatsApp</td>
              </tr>
              <tr>
                <td>Inicio de sesión en panel</td>
                <td>Correo, contraseña (hash en Firebase Auth), UID, tokens de sesión</td>
                <td>Operador; Google (Firebase Authentication)</td>
              </tr>
              <tr>
                <td>Perfil de Cliente</td>
                <td>UID, correo, nombre para mostrar, rol <code>client</code>, estado activo, marcas de tiempo</td>
                <td>El propio usuario; Administradores (Firestore <code>users</code>)</td>
              </tr>
              <tr>
                <td>Gestión de proyectos</td>
                <td>Título, slug, plantilla, estado, límite de enlaces, contenido del evento (JSON), plantilla SMS, ownerId, fechas</td>
                <td>Administradores; Cliente propietario (<code>projects</code>)</td>
              </tr>
              <tr>
                <td>Enlaces de invitados</td>
                <td>Código de enlace, etiqueta del invitado, cupos, mesa, etiquetas lado/grupo, activo/inactivo</td>
                <td>Administradores; Cliente del proyecto; invitado con enlace válido (<code>projects/&#123;id&#125;/links</code>)</td>
              </tr>
              <tr>
                <td>RSVP / confirmación</td>
                <td>projectId, linkCode (opc.), confirmación, nombres, teléfono, mensaje, grupo, cupos, mesa asignada, createdAt</td>
                <td>Ver sección 4 (reglas de acceso). Almacenamiento: <code>bodaRsvps</code></td>
              </tr>
              <tr>
                <td>Modo desarrollo sin Firebase</td>
                <td>RSVP en localStorage del navegador (<code>invitation-rsvps-&#123;projectId&#125;-v1</code>)</td>
                <td>Solo el dispositivo local; no se envía al Operador</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          No utilizamos Firebase Analytics, Google Analytics ni cookies de publicidad propias en el código
          actual de la aplicación. Firebase/Google pueden registrar datos técnicos propios de su
          infraestructura conforme a sus políticas.
        </p>
      </>
    ),
  },
  {
    id: '3',
    title: '3. Servicios de Google Firebase utilizados (auditoría técnica)',
    body: (
      <>
        <p>
          El backend en la nube del Servicio en producción se apoya en{' '}
          <strong>Google Firebase</strong> (proyecto <code>{LEGAL_CONTACT.firebaseProjectId}</code>).
          Componentes relevantes:
        </p>
        <h3 className="marketing-legal-h3">3.1 Firebase Authentication</h3>
        <ul>
          <li>
            <strong>Finalidad:</strong> autenticar Administradores y Clientes en el panel web (correo y
            contraseña).
          </li>
          <li>
            <strong>Datos:</strong> identificador único (UID), correo electrónico, metadatos de cuenta,
            tokens de sesión, registros de intentos de acceso gestionados por Google.
          </li>
          <li>
            <strong>Operaciones en app:</strong> inicio de sesión, creación de usuarios Cliente por
            Administrador (app secundaria de Firebase), envío de correo de restablecimiento de contraseña.
          </li>
        </ul>
        <h3 className="marketing-legal-h3">3.2 Cloud Firestore</h3>
        <ul>
          <li>
            <strong>Finalidad:</strong> persistir perfiles, proyectos, enlaces y confirmaciones RSVP.
          </li>
          <li>
            <strong>Colecciones / rutas documentadas:</strong>
            <ul>
              <li>
                <code>users/&#123;uid&#125;</code> — perfil (email, displayName, role, active, timestamps).
              </li>
              <li>
                <code>projects/&#123;projectId&#125;</code> — configuración del evento (title, templateId,
                status, ownerId, linkLimit, content, smsTemplate, etc.).
              </li>
              <li>
                <code>projects/&#123;projectId&#125;/links/&#123;linkCode&#125;</code> — enlace por invitado
                (guestLabel, cupos, mesa, etiquetaLado, etiquetaGrupo, active).
              </li>
              <li>
                <code>bodaRsvps/&#123;docId&#125;</code> — cada envío o actualización de RSVP vinculado a un
                projectId.
              </li>
            </ul>
          </li>
          <li>
            <strong>Reglas de seguridad:</strong> desplegadas en el archivo <code>firestore.rules</code> del
            repositorio y publicadas con <code>firebase deploy --only firestore:rules</code>. Limitan lectura
            y escritura según rol (admin, client propietario, invitado público con enlace activo).
          </li>
        </ul>
        <h3 className="marketing-legal-h3">3.3 Firebase Hosting</h3>
        <ul>
          <li>
            <strong>Finalidad:</strong> servir la aplicación web compilada (HTML, JS, CSS) desde{' '}
            {LEGAL_CONTACT.productionUrl}.
          </li>
          <li>
            <strong>Datos:</strong> registros de acceso estándar (dirección IP, fecha, recurso solicitado,
            código de respuesta), gestionados por Google.
          </li>
        </ul>
        <h3 className="marketing-legal-h3">3.4 Cloud Storage (bucket configurado)</h3>
        <p>
          Las variables de entorno incluyen <code>VITE_FIREBASE_STORAGE_BUCKET</code> para integración con
          el proyecto Firebase. <strong>La versión actual del código no realiza cargas ni lecturas de
          archivos</strong> en Cloud Storage; los medios de las invitaciones se referencian por URL en el
          contenido del proyecto o en assets estáticos del Hosting.
        </p>
        <h3 className="marketing-legal-h3">3.5 Subencargados y documentación Google</h3>
        <p>
          Google actúa como encargado / proveedor de infraestructura. Puedes consultar:
        </p>
        <ul>
          <li>
            <a
              href="https://firebase.google.com/support/privacy"
              className="marketing-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacidad y seguridad en Firebase
            </a>
          </li>
          <li>
            <a
              href="https://policies.google.com/privacy"
              className="marketing-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de privacidad de Google
            </a>
          </li>
          <li>
            <a
              href="https://cloud.google.com/terms/data-processing-addendum"
              className="marketing-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Adenda de tratamiento de datos de Google Cloud (cuando aplique contractualmente)
            </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: '4',
    title: '4. Acceso a datos RSVP y transparencia (Firestore Rules)',
    body: (
      <>
        <p>
          Por diseño técnico actual, la colección <code>bodaRsvps</code> tiene reglas que permiten{' '}
          <strong>lectura pública</strong> (<code>allow read: if true</code>). Esto implica que cualquier
          persona que conozca o deduzca el identificador de un documento podría leer ese registro mediante
          la API de Firestore si accede directamente al proyecto (no solo a través del panel).
        </p>
        <p>
          <strong>Implicación para auditoría y cumplimiento:</strong> los datos de RSVP no deben considerarse
          confidenciales frente a terceros técnicos avanzados; el panel web restringe la visualización a
          usuarios autorizados, pero la base de datos permite lectura abierta por documento. Los Clientes
          deben informar a sus invitados que los datos de confirmación se procesan en la nube con esta
          arquitectura. El Operador puede revisar esta regla en futuras versiones para endurecer la
          privacidad (por ejemplo lectura solo para roles autenticados).
        </p>
        <p>Otras reglas relevantes:</p>
        <ul>
          <li>
            <strong>Creación de RSVP:</strong> cualquier visitante puede crear documentos que cumplan
            validaciones de campos (longitud de nombres, teléfono, projectId, etc.).
          </li>
          <li>
            <strong>Actualización / eliminación de RSVP:</strong> Administradores y Clientes con permiso sobre
            el projectId asociado; condiciones adicionales para registros legacy sin projectId.
          </li>
          <li>
            <strong>Proyectos activos:</strong> lectura pública de proyectos con <code>status == 'active'</code>{' '}
            para renderizar invitaciones; enlaces solo si <code>active == true</code>.
          </li>
          <li>
            <strong>Usuarios:</strong> cada usuario lee su propio documento; administradores listan y gestionan
            Clientes.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: '5',
    title: '5. Finalidades y bases de legitimación',
    body: (
      <>
        <ul>
          <li>
            <strong>Prestación del Servicio</strong> (ejecución de contrato o medidas precontractuales): publicar
            invitaciones, validar enlaces, registrar RSVP, operar paneles.
          </li>
          <li>
            <strong>Seguridad y fraude:</strong> autenticación, reglas de Firestore, logs de infraestructura.
          </li>
          <li>
            <strong>Interés legítimo del Operador:</strong> mejora del producto, soporte, copias de seguridad
            operativas de Firebase, estadísticas agregadas internas sin perfilar invitados con fines
            publicitarios.
          </li>
          <li>
            <strong>Obligación legal:</strong> conservación de información exigida por autoridad competente.
          </li>
          <li>
            <strong>Consentimiento del invitado:</strong> al enviar el formulario RSVP, el invitado facilita
            datos de forma consciente para el evento; el Cliente debe haber informado previamente la finalidad
            (organización del evento).
          </li>
        </ul>
      </>
    ),
  },
  {
    id: '6',
    title: '6. Plazos de conservación',
    body: (
      <>
        <p>
          Los datos se conservan mientras el proyecto esté activo o mientras sea necesario para la finalidad
          del evento y obligaciones legales. Tras la celebración:
        </p>
        <ul>
          <li>
            Las confirmaciones RSVP pueden permanecer en Firestore hasta que el Cliente o el Operador
            solicite su eliminación o se ejecute una política de limpieza acordada.
          </li>
          <li>
            Las cuentas de Cliente inactivas pueden desactivarse (<code>active: false</code>); la cuenta en
            Firebase Auth puede requerir eliminación manual desde la consola de Firebase.
          </li>
          <li>
            Los logs de Google/Firebase se rigen por los plazos de retención de Google Cloud.
          </li>
        </ul>
        <p>
          Para solicitar eliminación de datos de un evento concreto, contacta a{' '}
          <a href={`mailto:${LEGAL_CONTACT.email}`} className="marketing-link">
            {LEGAL_CONTACT.email}
          </a>{' '}
          con el nombre del proyecto o enlace. Los invitados pueden dirigirse al organizador del evento
          (Cliente) como responsable principal.
        </p>
      </>
    ),
  },
  {
    id: '7',
    title: '7. Destinatarios y transferencias internacionales',
    body: (
      <>
        <p>Los datos pueden ser tratados por:</p>
        <ul>
          <li>Personal autorizado del Operador de {SITE.name}.</li>
          <li>Google LLC y entidades del grupo Google (Firebase, Cloud), con servidores fuera del Ecuador, incluidos Estados Unidos.</li>
        </ul>
        <p>
          Las transferencias internacionales se amparan en cláusulas contractuales tipo, certificaciones o
          mecanismos reconocidos por la LOPDP y las políticas de Google Cloud/Firebase, según el servicio
          contratado por el Operador en la consola de Google.
        </p>
        <p>No vendemos datos personales a terceros.</p>
      </>
    ),
  },
  {
    id: '8',
    title: '8. Derechos de las personas titulares',
    body: (
      <>
        <p>
          De acuerdo con la LOPDP, puedes ejercer derechos de acceso, rectificación, eliminación,
          oposición, limitación del tratamiento y portabilidad cuando correspondan, contactando a{' '}
          <a href={`mailto:${LEGAL_CONTACT.email}`} className="marketing-link">
            {LEGAL_CONTACT.email}
          </a>
          .
        </p>
        <p>
          Si tus datos fueron recogidos porque fuiste invitado a un evento, el organizador (Cliente) es el
          primer punto de contacto; el Operador asistirá al Cliente para atender solicitudes sobre datos
          almacenados en {SITE.name}.
        </p>
        <p>
          Tienes derecho a presentar reclamo ante la autoridad de protección de datos personal del Ecuador
          si consideras que el tratamiento vulnera la normativa.
        </p>
      </>
    ),
  },
  {
    id: '9',
    title: '9. Seguridad',
    body: (
      <>
        <p>Medidas implementadas incluyen, entre otras:</p>
        <ul>
          <li>Autenticación gestionada por Firebase Auth (contraseñas no almacenadas en texto plano en Firestore).</li>
          <li>Reglas de seguridad de Firestore con control por rol y propiedad de proyecto.</li>
          <li>Comunicación cifrada HTTPS/TLS en Hosting y APIs de Firebase.</li>
          <li>Separación de roles administrador / cliente en documentos <code>users</code>.</li>
          <li>Variables de configuración sensibles (<code>VITE_FIREBASE_*</code>) en entorno de despliegue, no expuestas intencionalmente en repositorio público.</li>
        </ul>
        <p>
          Ningún sistema es infalible. Debes usar contraseñas robustas y notificar incidentes de seguridad
          sospechados.
        </p>
      </>
    ),
  },
  {
    id: '10',
    title: '10. Cookies, almacenamiento local y tecnologías similares',
    body: (
      <>
        <p>
          La aplicación utiliza principalmente <strong>almacenamiento local del navegador</strong> en
          escenarios de desarrollo o demo sin Firebase configurado, para guardar RSVP temporalmente bajo la
          clave <code>invitation-rsvps-&#123;projectId&#125;-v1</code>.
        </p>
        <p>
          Firebase Authentication puede persistir el estado de sesión en el navegador (IndexedDB / localStorage
          según configuración del SDK) para mantener la sesión del panel iniciada.
        </p>
        <p>
          No desplegamos banderas de cookies de analítica propias en el código fuente revisado. Puedes
          configurar tu navegador para limitar cookies y almacenamiento local; ello puede impedir iniciar
          sesión o guardar RSVP en modo local.
        </p>
      </>
    ),
  },
  {
    id: '11',
    title: '11. Menores de edad',
    body: (
      <>
        <p>
          El Servicio está dirigido a la organización de eventos familiares y sociales. No recopilamos
          intencionalmente datos de menores de edad sin el consentimiento de padres o tutores. Si un RSVP
          incluye nombres de niños asistentes al evento, el organizador es responsable de contar con la
          autorización correspondiente.
        </p>
      </>
    ),
  },
  {
    id: '12',
    title: '12. Cambios en esta política',
    body: (
      <>
        <p>
          Publicaremos cambios materiales actualizando la fecha al inicio del documento. Para tratamientos
          que requieran nuevo consentimiento según la ley, lo solicitaremos de forma explícita.
        </p>
        <p>
          Documentos relacionados:{' '}
          <a href="/terminos-y-condiciones" className="marketing-link">
            Términos y condiciones
          </a>
          .
        </p>
      </>
    ),
  },
]
