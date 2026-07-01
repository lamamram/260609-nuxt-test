<template>
  <div class="flex min-h-screen bg-gray-50">
    <aside class="w-64 bg-white border-r border-gray-200 p-4">
      <nav class="flex flex-col gap-2">
        <NuxtLink to="/" class="text-blue-600 hover:text-blue-800 font-medium p-2 rounded hover:bg-gray-100">
          Home
        </NuxtLink>
        <NuxtLink to="/home" class="text-blue-600 hover:text-blue-800 font-medium p-2 rounded hover:bg-gray-100">
          Welcome
        </NuxtLink>
      </nav>
    </aside>
    <div class="flex-1 flex flex-col">
      <header class="bg-white border-b border-gray-200 p-4">
        <h1 class="text-xl font-bold text-gray-800">Default Layout</h1>
      </header>
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>