import { defineStore } from 'pinia'
import { localStorageBoolean } from '@/lib/utilities'

interface StateObject {
  error: ErrorState
  load: boolean
  consent: boolean
}

interface ErrorState {
  type: string
  message: string
  context: {
    path: string
  }
}

export const useMainStore = defineStore('main', {
  state: (): StateObject => {
    return {
      error: {
        type: '',
        message: '',
        context: {
          path: '',
        },
      },
      load: false,
      consent: localStorageBoolean('cookie-consent'),
    }
  },
})
