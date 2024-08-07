<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface PathItem {
  label: string
  to: string
}

const route = useRoute()

const getPathList = (location): PathItem[] => {
  const partList = location.path
    .split('/')
    .filter((item) => item.trim() !== '')
    .filter((item) => item.trim() !== 'dnd')

  return partList.map((part, index) => {
    const parent = partList.slice(0, index)
    return {
      label: part,
      to: parent.length > 0 ? `/dnd/${parent.join('/')}/${part}` : `/dnd/${part}`,
    }
  })
}

const pathList = computed<PathItem[]>(() => getPathList(route))
</script>

<template>
  <nav class="sticky top-auto hidden p-4 md:flex" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-4">
      <li>
        <div>
          <RouterLink to="/dnd" class="text-gray-300 hover:text-gray-500">
            <svg
              class="h-3 w-3 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">home</span>
          </RouterLink>
        </div>
      </li>
      <li v-for="item in pathList" :key="item.to">
        <div class="flex items-center">
          <svg
            class="h-3 w-3 flex-shrink-0 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
          </svg>

          <RouterLink
            :to="item.to"
            class="ml-4 text-xs font-medium text-gray-500 hover:text-gray-700"
            >{{ item.label }}</RouterLink
          >
        </div>
      </li>
    </ol>
  </nav>
</template>
