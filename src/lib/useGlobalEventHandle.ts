import { onMounted, onBeforeUnmount } from 'vue'
import type { DirectiveBinding } from 'vue'

export function useKeyboardEventHandle(dictionary: {
  [key: string]: (event: KeyboardEvent) => void
}) {
  const handleKeyboard = (event: KeyboardEvent) => {
    const which = `${event.ctrlKey ? 'ctrl:' : ''}${event.key}`
    if (dictionary[which]) {
      dictionary[which]?.(event)
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyboard)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyboard)
  })
}

declare global {
  interface HTMLElement {
    clickOutsideEvent: (event: Event) => void
  }
}
let exclude: any
const setExclude = (input: any) => {
  exclude = input
}
export const useEventHandle = {
  mounted(ele: HTMLElement, binding: any) {
    ele.clickOutsideEvent = (event: Event) => {
      if (!exclude.contains(event.target)) {
        binding.value(event, ele)
      }
    }
    document.addEventListener('click', ele.clickOutsideEvent)
  },
  updated(ele: HTMLElement, binding: DirectiveBinding) {
    setExclude(binding.arg)
  },
  unmounted(ele: HTMLElement) {
    document.removeEventListener('click', ele.clickOutsideEvent)
  },
}
