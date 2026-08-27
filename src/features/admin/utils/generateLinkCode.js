/**
 * @param {number} [length=8]
 */
export function generateLinkCode(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const bytes = crypto.getRandomValues(new Uint8Array(length))
  return Array.from(bytes, (byte) => chars[byte % chars.length]).join('')
}
