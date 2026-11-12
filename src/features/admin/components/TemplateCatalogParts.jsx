/* Piezas visuales compartidas por el catálogo y el detalle de plantillas. */

/** @param {{ cover: import('../data/templateCatalog.js').TemplateCatalogItem['cover'] }} props */
export function TemplateCover({ cover }) {
  if (cover.src) {
    return (
      <img
        className="tpl-cover-img"
        src={cover.src}
        srcSet={cover.srcSet}
        sizes="(min-width: 1200px) 30vw, (min-width: 700px) 45vw, 92vw"
        alt={cover.alt}
        loading="lazy"
      />
    )
  }
  return (
    <span className="tpl-cover-art" style={{ background: cover.gradient }} role="img" aria-label={cover.alt}>
      <span className="tpl-cover-art-text">Bride&nbsp;to&nbsp;be</span>
    </span>
  )
}

/** @param {{ colors: string[] }} props */
export function Palette({ colors }) {
  if (colors.length === 0) return null
  return (
    <span className="tpl-palette" role="img" aria-label="Paleta de colores">
      {colors.map((color) => (
        <span key={color} style={{ background: color }} title={color} />
      ))}
    </span>
  )
}
