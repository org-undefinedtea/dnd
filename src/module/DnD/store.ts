import { defineStore } from 'pinia'

interface StateObject {
  session: object | null
}

export const useDnDStore = defineStore('dnd', {
  state: (): StateObject => {
    return { session: null }
  },
})
