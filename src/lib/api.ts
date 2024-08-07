import { createClient } from '@supabase/supabase-js'

const api = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export default api

export async function fetchAccountData(uuid: any, whichData: any) {
  const { data, error, status } = await api
    .from('account')
    .select(whichData)
    .eq('uuid', uuid)
    .single()

  return { data, error, status }
}

export async function putAccountData(content: any) {
  const { error } = await api.from('account').upsert(content)

  return { error }
}

export async function fetchAccountStorage(path: any) {
  const { data, error } = await api.storage.from('account').download(path)

  return { data, error }
}

export async function putAccountStorage(file: any, path: any) {
  const { error } = await api.storage.from('account').upload(path, file)

  return { error }
}
