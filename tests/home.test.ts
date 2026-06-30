import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HomePage from '~/pages/home.vue'
import DefaultLayout from '~/layouts/default.vue'
import { readFileSync } from 'fs'
import { resolve } from 'path'

describe('Home Page', () => {
  it('renders the home page at /home route', async () => {
    const wrapper = await mountSuspended(HomePage)
    expect(wrapper.html()).toContain('Welcome')
  })
})

describe('Default Layout', () => {
  it('wraps pages with default layout', async () => {
    const wrapper = await mountSuspended(DefaultLayout)
    expect(wrapper.html()).toContain('Default Layout')
  })
})

describe('Bootstrap CSS', () => {
  it('loads Bootstrap CSS via CDN', async () => {
    const configPath = resolve(process.cwd(), 'nuxt.config.ts')
    const configContent = readFileSync(configPath, 'utf-8')
    expect(configContent).toContain('bootstrap')
    expect(configContent).toContain('cdn.jsdelivr.net')
  })
})