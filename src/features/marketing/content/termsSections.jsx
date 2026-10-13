import { LEGAL_CONTACT } from '../data/legalMeta.js'
import { SITE } from '../data/siteContent.js'

/** @type {Array<{ id: string, title: string, body: import('react').ReactNode }>} */
export const TERMS_SECTIONS = [
  {
    id: '1',
    title: '1. Identificación y aceptación',
    body: (
      <>
        <p>
          Los presentes Términos y Condiciones (en adelante, los «Términos») regulan el acceso y uso de la
          plataforma web <strong>{LEGAL_CONTACT.product}</strong> (el «Servicio»), disponible en{' '}
          <a href={LEGAL_CONTACT.productionUrl} className="marketing-link">
            {LEGAL_CONTACT.productionUrl}
          </a>{' '}
          y dominios asociados, operada por el equipo responsable de {SITE.name} (el «Operador»).
        </p>
        <p>
          Al navegar por el sitio, abrir una invitación digital, enviar una confirmación de asistencia (RSVP)
          o iniciar sesión en el panel de clientes o administración, declaras haber leído, comprendido y
          aceptado estos Términos. Si no estás de acuerdo, debes abstenerte de usar el Servicio.
        </p>
        <p>
          El Operador puede actualizar estos Términos. La fecha de «Última actualización» al inicio del
          documento indica la versión vigente. El uso continuado del Servicio tras un cambio material
          implica aceptación de la nueva versión, salvo que la ley exija un consentimiento adicional.
        </p>
      </>
    ),
  },
  {
    id: '2',
    title: '2. Descripción del Servicio',
    body: (
      <>
        <p>
          {SITE.name} ofrece invitaciones digitales para eventos (por ejemplo bodas y baby showers), con
          funciones que incluyen, según el proyecto contratado:
        </p>
        <ul>
          <li>Publicación de una invitación personalizada (textos, imágenes, ubicación, cronograma, etc.).</li>
          <li>Generación de enlaces únicos por invitado o grupo, con cupos de asistencia definidos.</li>
          <li>Formularios de confirmación de asistencia (RSVP) accesibles sin crear cuenta.</li>
          <li>Paneles web para clientes y administradores: gestión de enlaces, mesas, etiquetas, plantillas SMS y exportación de respuestas.</li>
        </ul>
        <p>
          El Servicio se presta «tal cual» y puede evolucionar (nuevas plantillas, límites de enlaces,
          mantenimiento programado). Las características concretas de cada evento se acuerdan con el
          Operador al contratar el proyecto.
        </p>
      </>
    ),
  },
  {
    id: '3',
    title: '3. Roles de usuario',
    body: (
      <>
        <p>El Servicio distingue los siguientes perfiles:</p>
        <ul>
          <li>
            <strong>Invitado (usuario final del evento):</strong> persona que accede a un enlace de
            invitación y, opcionalmente, completa el RSVP. No requiere registro en {SITE.name}.
          </li>
          <li>
            <strong>Cliente:</strong> persona o entidad contratante del evento, con cuenta de acceso
            (correo y contraseña) para administrar sus proyectos asignados, enlaces, confirmaciones y
            configuraciones permitidas (por ejemplo plantilla de mensaje SMS).
          </li>
          <li>
            <strong>Administrador:</strong> personal autorizado del Operador para crear proyectos, asignar
            clientes, gestionar enlaces, revisar respuestas y dar soporte técnico.
          </li>
          <li>
            <strong>Visitante del sitio de marketing:</strong> persona que consulta la página principal,
            demos o formularios de contacto sin iniciar sesión.
          </li>
        </ul>
        <p>
          Cada perfil tiene permisos técnicos limitados por las reglas de seguridad de la base de datos en
          la nube (Firestore Security Rules), descritas con más detalle en la Política de Privacidad.
        </p>
      </>
    ),
  },
  {
    id: '4',
    title: '4. Cuentas, acceso y seguridad',
    body: (
      <>
        <p>
          Las cuentas de Cliente y Administrador se autentican mediante <strong>Firebase Authentication</strong>{' '}
          (correo electrónico y contraseña). Eres responsable de mantener la confidencialidad de tus
          credenciales y de toda actividad realizada bajo tu cuenta.
        </p>
        <p>
          Debes notificar de inmediato a{' '}
          <a href={`mailto:${LEGAL_CONTACT.email}`} className="marketing-link">
            {LEGAL_CONTACT.email}
          </a>{' '}
          si sospechas acceso no autorizado. El Operador puede suspender o desactivar cuentas ante uso
          fraudulento, incumplimiento de estos Términos o riesgo para la seguridad del Servicio.
        </p>
        <p>
          La creación de cuentas de Cliente la realiza el Administrador. El Operador puede enviar correos
          de restablecimiento de contraseña a través de la infraestructura de Firebase/Google.
        </p>
      </>
    ),
  },
  {
    id: '5',
    title: '5. Enlaces de invitación y confirmaciones (RSVP)',
    body: (
      <>
        <p>
          Cada enlace de invitado está asociado a un código único, un nombre o etiqueta de invitado, cupos
          permitidos y, opcionalmente, mesa y etiquetas de organización (lado, grupo). Solo los enlaces
          marcados como activos y pertenecientes a proyectos en estado activo son válidos para la
          experiencia pública de invitación.
        </p>
        <p>
          Al enviar un RSVP, el invitado proporciona datos como confirmación de asistencia, nombres de
          asistentes, teléfono y mensaje opcional. Esos datos se almacenan en la colección{' '}
          <code>bodaRsvps</code> de Cloud Firestore, vinculados al identificador del proyecto y, cuando
          aplique, al código de enlace.
        </p>
        <p>
          El Cliente contratante es quien define la lista de invitados y la finalidad del tratamiento de
          sus datos personales para el evento. El Operador actúa como encargado del tratamiento respecto
          de esos datos de invitados, en los términos descritos en la Política de Privacidad.
        </p>
        <p>
          Queda prohibido manipular enlaces ajenos, intentar confirmar cupos superiores a los asignados,
          automatizar envíos masivos abusivos o usar el formulario RSVP con fines distintos al evento.
        </p>
      </>
    ),
  },
  {
    id: '6',
    title: '6. Propiedad intelectual y contenidos',
    body: (
      <>
        <p>
          El diseño del sitio, código fuente, plantillas base, logotipos y elementos de marca de{' '}
          {SITE.name} son propiedad del Operador o de sus licenciantes. No se concede licencia para
          reproducirlos fuera del uso normal del Servicio.
        </p>
        <p>
          Los textos, fotografías, música y demás contenidos del evento cargados o configurados en un
          proyecto pertenecen al Cliente o a quien ostente los derechos. El Cliente garantiza que tiene
          autorización para usar ese material y exime al Operador de reclamaciones de terceros por
          infracción de derechos de autor, imagen o marca.
        </p>
      </>
    ),
  },
  {
    id: '7',
    title: '7. Uso aceptable y prohibiciones',
    body: (
      <>
        <p>Está prohibido, entre otros:</p>
        <ul>
          <li>Usar el Servicio para actividades ilícitas, difamatorias, discriminatorias o que vulneren derechos de terceros.</li>
          <li>Intentar eludir las reglas de seguridad, escanear vulnerabilidades sin autorización o acceder a datos de proyectos ajenos.</li>
          <li>Introducir malware, realizar ataques de denegación de servicio o sobrecargar intencionalmente Firebase Hosting o Firestore.</li>
          <li>Revender o sublicenciar el panel o las invitaciones sin acuerdo escrito con el Operador.</li>
          <li>Recopilar datos personales de invitados para fines comerciales no relacionados con el evento sin base legal y aviso adecuado.</li>
        </ul>
        <p>El incumplimiento puede derivar en eliminación de contenidos, desactivación de enlaces o cierre de cuenta.</p>
      </>
    ),
  },
  {
    id: '8',
    title: '8. Infraestructura técnica (Firebase / Google Cloud)',
    body: (
      <>
        <p>
          El Servicio en producción utiliza el proyecto de Google Firebase identificado como{' '}
          <strong>{LEGAL_CONTACT.firebaseProjectId}</strong>, que incluye, entre otros componentes
          configurados en esta aplicación:
        </p>
        <ul>
          <li>
            <strong>Firebase Hosting:</strong> alojamiento y entrega del sitio web estático (SPA) al
            navegador del usuario.
          </li>
          <li>
            <strong>Firebase Authentication:</strong> registro e inicio de sesión de Clientes y
            Administradores.
          </li>
          <li>
            <strong>Cloud Firestore:</strong> base de datos para perfiles de usuario, proyectos, enlaces
            de invitados y confirmaciones RSVP.
          </li>
        </ul>
        <p>
          La configuración incluye un identificador de bucket de Cloud Storage en las variables de entorno;
          la versión actual de la aplicación <strong>no sube archivos</strong> a Firebase Storage: las
          imágenes y medios de la invitación se sirven mediante URLs configuradas en el contenido del
          proyecto (por ejemplo enlaces externos o recursos estáticos del propio sitio).
        </p>
        <p>
          El uso de Firebase implica el tratamiento de datos por Google LLC y sus afiliadas como
          proveedores de infraestructura, conforme a los términos de Google y Firebase. El detalle de
          categorías de datos, bases legales y transferencias internacionales figura en la Política de
          Privacidad.
        </p>
      </>
    ),
  },
  {
    id: '9',
    title: '9. Disponibilidad, mantenimiento y limitación de responsabilidad',
    body: (
      <>
        <p>
          El Operador procura mantener el Servicio disponible, pero no garantiza operación ininterrumpida.
          Pueden producirse interrupciones por mantenimiento, actualizaciones de Firebase, fallos de red o
          causas de fuerza mayor.
        </p>
        <p>
          En la medida permitida por la ley aplicable, el Operador no será responsable por daños indirectos,
          lucro cesante o pérdida de datos derivados del uso o imposibilidad de uso del Servicio, salvo
          dolo o negligencia grave debidamente acreditados.
        </p>
        <p>
          Las demos públicas y entornos de desarrollo pueden usar almacenamiento local del navegador
          (localStorage) para RSVP cuando Firebase no está configurado; esos datos no se sincronizan con
          producción. No debes confiar en ellos para eventos reales.
        </p>
      </>
    ),
  },
  {
    id: '10',
    title: '10. Tarifas, proyectos y baja del Servicio',
    body: (
      <>
        <p>
          Las condiciones comerciales (precio, número de enlaces, revisiones de diseño, plazos) se
          acuerdan fuera de estos Términos, por contrato, propuesta o comunicación con el Operador.
        </p>
        <p>
          Al finalizar un evento, el Cliente puede solicitar exportación de confirmaciones (por ejemplo
          Excel desde el panel). La conservación o eliminación posterior de datos en Firestore se rige por
          la Política de Privacidad y acuerdos específicos. Los proyectos pueden archivarse o desactivarse
          cambiando su estado técnico (<code>active</code> / otros), lo que afecta el acceso público a
          invitaciones y enlaces.
        </p>
      </>
    ),
  },
  {
    id: '11',
    title: '11. Ley aplicable y contacto',
    body: (
      <>
        <p>
          Estos Términos se interpretan conforme a las leyes de la República del Ecuador, incluida, cuando
          corresponda, la normativa de protección de datos personales (LOPDP y reglamentos relacionados),
          sin perjuicio de normas imperativas del país del usuario cuando resulten aplicables.
        </p>
        <p>
          Para consultas sobre estos Términos, soporte contractual o ejercicio de derechos relacionados con
          el Servicio, escribe a{' '}
          <a href={`mailto:${LEGAL_CONTACT.email}`} className="marketing-link">
            {LEGAL_CONTACT.email}
          </a>{' '}
          indicando tu nombre, rol (invitado, cliente o administrador) y el proyecto o evento concernido.
        </p>
      </>
    ),
  },
]
