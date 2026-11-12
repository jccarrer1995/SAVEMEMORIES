import { Circle, Document, Font, Page, StyleSheet, Svg, Text, View } from '@react-pdf/renderer'
import { publicUrl } from '../../invitations/core/utils/publicUrl.js'
import { guestTagLabels, mesaNumber, peopleLabel } from '../utils/mesaSimulationModel.js'

/** @param {string} path */
const fontUrl = (path) => new URL(publicUrl(path), window.location.origin).href

Font.register({
  family: 'Instrument Serif',
  fonts: [
    { src: fontUrl('/fonts/InstrumentSerif-Regular.ttf') },
    { src: fontUrl('/fonts/InstrumentSerif-Italic.ttf'), fontStyle: 'italic' },
  ],
})

Font.register({
  family: 'Geist',
  fonts: [
    { src: fontUrl('/fonts/Geist-Regular.ttf'), fontWeight: 400 },
    { src: fontUrl('/fonts/Geist-Medium.ttf'), fontWeight: 500 },
    { src: fontUrl('/fonts/Geist-SemiBold.ttf'), fontWeight: 600 },
  ],
})

// Sin cortes de palabra con guiones.
Font.registerHyphenationCallback((word) => [word])

const C = {
  paper: '#f6f1e8',
  card: '#fcfaf5',
  line: '#e3dbcc',
  ink: '#1d211b',
  soft: '#6a6e63',
  olive: '#252c21',
  clay: '#b0603b',
  sand: '#d8c7a6',
}

const s = StyleSheet.create({
  page: {
    backgroundColor: C.paper,
    paddingTop: 34,
    paddingBottom: 52,
    paddingHorizontal: 40,
    fontFamily: 'Geist',
    fontSize: 9,
    color: C.ink,
  },
  brandRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { flexDirection: 'row', alignItems: 'center' },
  mark: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 0.9,
    borderColor: C.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  markText: { fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 13, marginTop: -2 },
  brandWord: { fontSize: 8, fontWeight: 600, letterSpacing: 2.2 },
  eyebrow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: C.clay, marginRight: 6 },
  eyebrowText: { fontSize: 7.5, fontWeight: 500, letterSpacing: 1.6, color: C.soft },
  title: { fontFamily: 'Instrument Serif', fontSize: 36, lineHeight: 1, marginTop: 24 },
  titleAmp: { fontFamily: 'Instrument Serif', fontStyle: 'italic', color: C.clay },
  subtitle: { marginTop: 12, fontSize: 10, color: C.soft },
  filterPill: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: C.olive,
    color: C.paper,
    fontSize: 8,
    fontWeight: 500,
  },
  stats: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 0.75,
    borderColor: C.line,
    borderRadius: 12,
    backgroundColor: C.card,
  },
  stat: { flex: 1, paddingVertical: 9, paddingHorizontal: 12 },
  statDivider: { borderLeftWidth: 0.75, borderLeftColor: C.line },
  statValue: { fontFamily: 'Instrument Serif', fontSize: 22, lineHeight: 1 },
  statLabel: { marginTop: 4, fontSize: 6.8, fontWeight: 500, letterSpacing: 1.2, color: C.soft },
  row: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  card: {
    width: 166,
    marginRight: 8,
    padding: 4,
    borderRadius: 12,
    borderWidth: 0.75,
    borderColor: C.line,
    backgroundColor: C.card,
  },
  stage: { borderRadius: 9, backgroundColor: C.olive, paddingTop: 8, paddingHorizontal: 8, paddingBottom: 8 },
  stageHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stageTag: {
    paddingVertical: 2.5,
    paddingHorizontal: 7,
    borderRadius: 8,
    borderWidth: 0.6,
    borderColor: '#4a5244',
    color: '#d9d4c8',
    fontSize: 6.3,
    fontWeight: 500,
    letterSpacing: 1,
  },
  stageTotal: { fontSize: 7.5, color: '#c9c4b8' },
  roundWrap: { alignItems: 'center', marginTop: 4 },
  round: { width: 88, height: 88, position: 'relative' },
  tableLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableKicker: { fontSize: 5.5, letterSpacing: 1.6, color: '#a9a497' },
  tableNumber: { fontFamily: 'Instrument Serif', fontSize: 20, lineHeight: 1, color: C.paper, marginTop: 1 },
  guests: { paddingTop: 4, paddingHorizontal: 4 },
  guest: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 0.6,
    borderBottomColor: C.line,
    borderBottomStyle: 'dashed',
  },
  guestLast: { borderBottomWidth: 0 },
  guestDot: { width: 6.5, height: 6.5, borderRadius: 3.25, marginRight: 7 },
  guestBody: { flex: 1, paddingRight: 6 },
  guestName: { fontSize: 7.8, fontWeight: 500, lineHeight: 1.25 },
  guestTags: { marginTop: 1, fontSize: 6.1, color: C.soft },
  guestCount: {
    minWidth: 18,
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 8,
    borderWidth: 0.6,
    borderColor: C.line,
    fontFamily: 'Instrument Serif',
    fontSize: 9.5,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    left: 40,
    right: 40,
    bottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 0.6,
    borderTopColor: C.line,
    fontSize: 7,
    color: C.soft,
  },
})

const COLUMNS = 3

/**
 * @template T
 * @param {T[]} list
 * @param {number} size
 * @returns {T[][]}
 */
function chunk(list, size) {
  const rows = []
  for (let index = 0; index < list.length; index += size) rows.push(list.slice(index, index + size))
  return rows
}

/** Título con el "&" en cursiva terracota. */
function EventTitle({ title }) {
  const parts = title.split('&')
  if (parts.length < 2) return <Text style={s.title}>{title}</Text>
  return (
    <Text style={s.title}>
      {parts.map((part, index) => (
        <Text key={index}>
          {part}
          {index < parts.length - 1 ? <Text style={s.titleAmp}>&amp;</Text> : null}
        </Text>
      ))}
    </Text>
  )
}

/**
 * @param {{
 *   group: import('../../admin/utils/guestLinkTableHelpers.js').MesaGuestGroup,
 *   tones: Record<string, string>,
 *   last?: boolean,
 * }} props
 */
function MesaPdfCard({ group, tones, last }) {
  const seats = []
  for (const guest of group.guests) {
    const count = Math.max(0, Number(guest.cupos) || 0)
    for (let index = 0; index < count; index += 1) seats.push(tones[guest.id] ?? C.sand)
  }
  const total = seats.length
  const ring = 39
  const seatRadius = Math.min(6, ((2 * Math.PI * ring) / Math.max(total, 1)) * 0.34)

  return (
    <View style={[s.card, last ? { marginRight: 0 } : {}]}>
      <View style={s.stage}>
        <View style={s.stageHead}>
          <Text style={s.stageTag}>
            {group.guests.length === 1 ? '1 GRUPO' : `${group.guests.length} GRUPOS`}
          </Text>
          <Text style={s.stageTotal}>{peopleLabel(group.totalCupos)}</Text>
        </View>
        <View style={s.roundWrap}>
          <View style={s.round}>
            <Svg width={88} height={88} viewBox="0 0 100 100">
              <Circle cx={50} cy={50} r={28} fill="#3a4235" />
              <Circle cx={50} cy={50} r={23.5} fill="#30372b" stroke="#566050" strokeWidth={0.6} />
              {seats.map((tone, index) => {
                const angle = (index / total) * Math.PI * 2 - Math.PI / 2
                return (
                  <Circle
                    key={index}
                    cx={50 + Math.cos(angle) * ring}
                    cy={50 + Math.sin(angle) * ring}
                    r={seatRadius}
                    fill={tone}
                  />
                )
              })}
            </Svg>
            <View style={s.tableLabel}>
              <Text style={s.tableKicker}>MESA</Text>
              <Text style={s.tableNumber}>{mesaNumber(group.mesaLabel)}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={s.guests}>
        {group.guests.map((guest, index) => {
          const tags = guestTagLabels(guest)
          return (
            <View key={guest.id} style={[s.guest, index === group.guests.length - 1 ? s.guestLast : {}]}>
              <View style={[s.guestDot, { backgroundColor: tones[guest.id] ?? C.sand }]} />
              <View style={s.guestBody}>
                <Text style={s.guestName}>{guest.guestLabel}</Text>
                {tags.length ? <Text style={s.guestTags}>{tags.join(' · ')}</Text> : null}
              </View>
              <Text style={s.guestCount}>{guest.cupos}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

/**
 * @param {{
 *   groups: import('../../admin/utils/guestLinkTableHelpers.js').MesaGuestGroup[],
 *   tones: Record<string, string>,
 *   title: string,
 *   subtitle?: string,
 *   filterLabel?: string,
 * }} props
 */
export function MesasPdfDocument({ groups, tones, title, subtitle, filterLabel }) {
  const people = groups.reduce((sum, group) => sum + group.totalCupos, 0)
  const links = groups.reduce((sum, group) => sum + group.guests.length, 0)
  const generated = new Date().toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric' })

  const stats = [
    { label: 'MESAS', value: groups.length },
    { label: 'PERSONAS', value: people },
    { label: 'GRUPOS DE INVITADOS', value: links },
  ]

  return (
    <Document title={`Mesas · ${title}`} author="SAVEMEMORIES" creator="SAVEMEMORIES" language="es">
      <Page size="A4" style={s.page}>
        <View style={s.brandRow}>
          <View style={s.brand}>
            <View style={s.mark}>
              <Text style={s.markText}>S</Text>
            </View>
            <Text style={s.brandWord}>SAVEMEMORIES</Text>
          </View>
          <View style={s.eyebrow}>
            <View style={s.dot} />
            <Text style={s.eyebrowText}>DISTRIBUCIÓN DE MESAS</Text>
          </View>
        </View>

        <EventTitle title={title} />
        {subtitle ? <Text style={s.subtitle}>{subtitle}</Text> : null}
        {filterLabel ? <Text style={s.filterPill}>Filtro: {filterLabel}</Text> : null}

        <View style={s.stats}>
          {stats.map((stat, index) => (
            <View key={stat.label} style={[s.stat, index > 0 ? s.statDivider : {}]}>
              <Text style={s.statValue}>{stat.value}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {chunk(groups, COLUMNS).map((row) => (
          <View key={row[0].mesaLabel} style={s.row} wrap={false}>
            {row.map((group, index) => (
              <MesaPdfCard key={group.mesaLabel} group={group} tones={tones} last={index === COLUMNS - 1} />
            ))}
          </View>
        ))}

        <View style={s.footer} fixed>
          <Text>SAVEMEMORIES · Generado el {generated}</Text>
          <Text render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} />
        </View>
      </Page>
    </Document>
  )
}
