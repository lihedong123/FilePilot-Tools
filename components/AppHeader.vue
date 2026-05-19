<template>
  <header class="site-header">
    <ObBlock :ob_info="ob_info" />
    <div class="header-inner">
      <NuxtLink class="brand-link" to="/" :aria-label="t('brand')">
        <span class="brand-mark">
          <FileText :size="18" />
        </span>
        <span>{{ t('brand') }}</span>
      </NuxtLink>

      <nav class="desktop-nav" :aria-label="t('nav.home')">
        <NuxtLink to="/" class="nav-link">
          <Home :size="16" />
          {{ t('nav.home') }}
        </NuxtLink>
        <NuxtLink to="/image-tools" class="nav-link">
          <Image :size="16" />
          {{ t('nav.imageTools') }}
        </NuxtLink>
        <NuxtLink to="/pdf-tools" class="nav-link">
          <Files :size="16" />
          {{ t('nav.pdfTools') }}
        </NuxtLink>
      </nav>

      <div class="header-actions">
        <div class="language-switcher" :aria-label="t('nav.language')">
          <button
            class="language-button"
            :class="{ 'is-active': locale === 'en' }"
            type="button"
            @click="setLocale('en')"
          >
            EN
          </button>
          <button
            class="language-button"
            :class="{ 'is-active': locale === 'zh-CN' }"
            type="button"
            @click="setLocale('zh-CN')"
          >
            中文
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { FileText, Files, Home, Image } from 'lucide-vue-next'

const ob_info = {
  name: 'app-header',
  file: 'D:\\zhizhouAi\\myproject\\components\\AppHeader.vue'
}

const { locale, setLocale, t } = useLocale()
</script>
