import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TheNavigation from '../TheNavigation.vue'

describe('TheNavigation', () => {
  it('can render', () => {
    const wrapper = mount(TheNavigation)
    expect(wrapper.exists).toBeTruthy()
  })
})
