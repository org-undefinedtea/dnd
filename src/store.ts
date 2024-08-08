import { defineStore } from 'pinia'
import { localStorageBoolean } from '@/lib/utilities'

interface StateObject {
  error: ErrorState
  load: boolean
  consent: boolean

  application: ApplicationState
}

interface ErrorState {
  type: string
  message: string
  context: {
    path: string
  }
}

interface ApplicationState {
  activePopoverMap: Record<string, boolean>
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

      application: {
        activePopoverMap: {},
      },
    }
  },
  actions: {
    togglePopover(uid: string) {
      if (this.application.activePopoverMap[uid] === undefined) {
        this.application.activePopoverMap[uid] = true
      } else {
        this.application.activePopoverMap[uid] = !this.application.activePopoverMap[uid]
      }
    },
    closePopover(uid: string) {
      this.application.activePopoverMap[uid] = false
    },
    closePopoverAll() {
      Object.keys(this.application.activePopoverMap).map((uid) => {
        this.application.activePopoverMap[uid] = false
      })
    },
  },
})
