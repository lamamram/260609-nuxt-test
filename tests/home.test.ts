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

describe('Tailwind CSS', () => {
  it('has @nuxt/ui module configured in nuxt.config.ts', async () => {
    const configPath = resolve(process.cwd(), 'nuxt.config.ts')
    const configContent = readFileSync(configPath, 'utf-8')
    expect(configContent).toContain('@nuxt/ui')
  })

  it('has tailwindcss CSS file with tailwindcss import', async () => {
    const cssPath = resolve(process.cwd(), 'app/assets/css/main.css')
    const cssContent = readFileSync(cssPath, 'utf-8')
    expect(cssContent).toContain('@import "tailwindcss"')
    expect(cssContent).toContain('@import "@nuxt/ui"')
  })

  it('applies tailwind CSS classes in the default layout', async () => {
    const wrapper = await mountSuspended(DefaultLayout)
    const html = wrapper.html()
    // Check for tailwind utility classes
    expect(html).toMatch(/class="[^"]*\b(flex|grid|p-|m-|bg-|text-|w-|h-)/)
  })

  it('applies tailwind CSS classes in the home page', async () => {
    const wrapper = await mountSuspended(HomePage)
    const html = wrapper.html()
    // Check for tailwind utility classes
    expect(html).toMatch(/class="[^"]*\b(flex|grid|p-|m-|bg-|text-|w-|h-)/)
  })
})

describe('Layout Navigation', () => {
  it('contains a nav element in the default layout', async () => {
    const wrapper = await mountSuspended(DefaultLayout)
    const navElement = wrapper.find('nav')
    expect(navElement.exists()).toBe(true)
  })

  it('contains an aside element on the left side in the default layout', async () => {
    const wrapper = await mountSuspended(DefaultLayout)
    const asideElement = wrapper.find('aside')
    expect(asideElement.exists()).toBe(true)
  })

  it('has nav and aside with tailwind classes for layout', async () => {
    const wrapper = await mountSuspended(DefaultLayout)
    const html = wrapper.html()
    // Nav should have tailwind classes
    const nav = wrapper.find('nav')
    expect(nav.attributes('class')).toMatch(/(flex|p-|m-|bg-|text-|w-|h-|border)/)
    // Aside should have tailwind classes
    const aside = wrapper.find('aside')
    expect(aside.attributes('class')).toMatch(/(flex|p-|m-|bg-|text-|w-|h-|border)/)
  })
})
