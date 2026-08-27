import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../lib/firebase/index.js'
import { createAuthUser } from '../../../lib/firebase/createAuthUser.js'
import {
  fetchClientRecord,
  persistClientRecord,
  removeClientRecord,
} from '../../../lib/firebase/userStore.js'
import { getClientSaveErrorMessage } from '../utils/validateClientForm.js'

export { listClientRecords as listClients, fetchClientRecord as getClientById } from '../../../lib/firebase/userStore.js'

/** @returns {import('../types/clientRecord.js').ClientFormValues} */
export function createEmptyClientForm() {
  return {
    email: '',
    displayName: '',
    temporarySecret: '',
    active: true,
  }
}

/**
 * @param {import('../types/clientRecord.js').ClientRecord} client
 * @returns {import('../types/clientRecord.js').ClientFormValues}
 */
export function clientToFormValues(client) {
  return {
    uid: client.uid,
    email: client.email,
    displayName: client.displayName,
    temporarySecret: '',
    active: client.active,
  }
}

/**
 * @param {import('../types/clientRecord.js').ClientFormValues} values
 * @param {boolean} isNew
 */
export async function saveClient(values, isNew) {
  const email = values.email.trim().toLowerCase()
  const displayName = values.displayName.trim()

  try {
    if (isNew) {
      const uid = await createAuthUser(email, values.temporarySecret.trim())
      await persistClientRecord(
        uid,
        {
          email,
          displayName,
          role: 'client',
          active: true,
        },
        true,
      )
      return uid
    }

    const uid = values.uid
    if (!uid) throw new Error('Cliente no identificado.')

    await persistClientRecord(
      uid,
      {
        displayName,
        active: values.active,
      },
      false,
    )
    return uid
  } catch (error) {
    throw new Error(getClientSaveErrorMessage(error), { cause: error })
  }
}

/**
 * @param {string} uid
 */
export async function deleteClient(uid) {
  const client = await fetchClientRecord(uid)
  if (!client) throw new Error('Cliente no encontrado.')
  await removeClientRecord(uid)
}

/**
 * @param {string} email
 */
export async function sendClientPasswordReset(email) {
  if (!auth) throw new Error('Firebase no está configurado.')
  await sendPasswordResetEmail(auth, email.trim().toLowerCase())
}
