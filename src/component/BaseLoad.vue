<script setup lang="ts">
import { ref } from 'vue'
import { v1 as uuid1 } from 'uuid'

interface Load {
  preserveAspectRatio?: string

  primary?: string
  secondary?: string
  primaryOpacity?: float
  secondaryOpacity?: float

  animate?: boolean
  duration?: number

  baseUrl?: string

  height?: number
  width?: number

  uuid?: string
}

const option = withDefaults(defineProps<Load>(), {
  preserveAspectRatio: 'xMidYMid meet',

  primary: '#0f172a',
  secondary: '#cbd5e1',
  primaryOpacity: 0.75,
  secondaryOpacity: 0.75,

  animate: true,
  duration: 3,

  baseUrl: '',

  height: 130,
  width: 400,

  uuid: uuid1(),
})

const itemUUID = ref(option.uuid ? `${option.uuid}-itemUUID` : uuid1())
const itemGradient = ref(option.uuid ? `${option.uuid}-itemGradient` : uuid1())
</script>

<template>
  <svg
    :width="option.width"
    :height="option.height"
    :viewBox="`0 0 ${option.width} ${option.height}`"
    version="1.1"
    ria-labelledby="loading-aria"
    :preserveAspectRatio="option.preserveAspectRatio"
  >
    <title id="loading-aria">loading...</title>
    <rect
      :style="{
        fill: `url(${option.baseUrl}#${itemGradient})`,
      }"
      :clip-path="`url(${option.baseUrl}#${itemUUID})`"
      :width="option.width"
      :height="option.height"
      x="0"
      y="0"
    />
    <defs>
      <clipPath :id="itemUUID">
        <slot>
          <rect x="51" y="45" rx="3" ry="3" width="906" height="17" />
          <circle cx="879" cy="123" r="11" />
          <circle cx="914" cy="123" r="11" />
          <rect x="104" y="115" rx="3" ry="3" width="141" height="15" />
          <rect x="305" y="114" rx="3" ry="3" width="299" height="15" />
          <rect x="661" y="114" rx="3" ry="3" width="141" height="15" />
          <rect x="55" y="155" rx="3" ry="3" width="897" height="2" />
          <circle cx="880" cy="184" r="11" />
          <circle cx="915" cy="184" r="11" />
          <rect x="105" y="176" rx="3" ry="3" width="141" height="15" />
          <rect x="306" y="175" rx="3" ry="3" width="299" height="15" />
          <rect x="662" y="175" rx="3" ry="3" width="141" height="15" />
          <rect x="56" y="216" rx="3" ry="3" width="897" height="2" />
          <circle cx="881" cy="242" r="11" />
          <circle cx="916" cy="242" r="11" />
          <rect x="106" y="234" rx="3" ry="3" width="141" height="15" />
          <rect x="307" y="233" rx="3" ry="3" width="299" height="15" />
          <rect x="663" y="233" rx="3" ry="3" width="141" height="15" />
          <rect x="57" y="274" rx="3" ry="3" width="897" height="2" />
          <circle cx="882" cy="303" r="11" />
          <circle cx="917" cy="303" r="11" />
          <rect x="107" y="295" rx="3" ry="3" width="141" height="15" />
          <rect x="308" y="294" rx="3" ry="3" width="299" height="15" />
          <rect x="664" y="294" rx="3" ry="3" width="141" height="15" />
          <rect x="58" y="335" rx="3" ry="3" width="897" height="2" />
          <circle cx="881" cy="363" r="11" />
          <circle cx="916" cy="363" r="11" />
          <rect x="106" y="355" rx="3" ry="3" width="141" height="15" />
          <rect x="307" y="354" rx="3" ry="3" width="299" height="15" />
          <rect x="663" y="354" rx="3" ry="3" width="141" height="15" />
          <rect x="57" y="395" rx="3" ry="3" width="897" height="2" />
          <circle cx="882" cy="424" r="11" />
          <circle cx="917" cy="424" r="11" />
          <rect x="107" y="416" rx="3" ry="3" width="141" height="15" />
          <rect x="308" y="415" rx="3" ry="3" width="299" height="15" />
          <rect x="664" y="415" rx="3" ry="3" width="141" height="15" />
          <rect x="55" y="453" rx="3" ry="3" width="897" height="2" />
          <rect x="51" y="49" rx="3" ry="3" width="2" height="465" />
          <rect x="955" y="49" rx="3" ry="3" width="2" height="465" />
          <circle cx="882" cy="484" r="11" />
          <circle cx="917" cy="484" r="11" />
          <rect x="107" y="476" rx="3" ry="3" width="141" height="15" />
          <rect x="308" y="475" rx="3" ry="3" width="299" height="15" />
          <rect x="664" y="475" rx="3" ry="3" width="141" height="15" />
          <rect x="55" y="513" rx="3" ry="3" width="897" height="2" />
          <rect x="52" y="80" rx="3" ry="3" width="906" height="17" />
          <rect x="53" y="57" rx="3" ry="3" width="68" height="33" />
          <rect x="222" y="54" rx="3" ry="3" width="149" height="33" />
          <rect x="544" y="55" rx="3" ry="3" width="137" height="33" />
          <rect x="782" y="56" rx="3" ry="3" width="72" height="33" />
          <rect x="933" y="54" rx="3" ry="3" width="24" height="33" />
        </slot>
      </clipPath>
      <linearGradient :id="itemGradient">
        <stop :stop-color="option.primary" :stop-opacity="option.primaryOpacity" offset="0%">
          <template v-if="option.animate">
            <animate
              :dur="`${duration}s`"
              values="-2; 1"
              attributeName="offset"
              repeatCount="indefinite"
            />
          </template>
        </stop>
        <stop :stop-color="option.secondary" :stop-opacity="option.secondaryOpacity" offset="50%">
          <template v-if="option.animate">
            <animate
              :dur="`${option.duration}s`"
              values="-1.5; 1.5"
              attributeName="offset"
              repeatCount="indefinite"
            />
          </template>
        </stop>
        <stop :stop-color="option.primary" :stop-opacity="option.primaryOpacity" offset="100%">
          <template v-if="option.animate">
            <animate
              :dur="`${option.duration}s`"
              values="-1; 2"
              attributeName="offset"
              repeatCount="indefinite"
            />
          </template>
        </stop>
      </linearGradient>
    </defs>
  </svg>
</template>
