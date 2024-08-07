import { onMounted, onBeforeUnmount } from 'vue'

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
