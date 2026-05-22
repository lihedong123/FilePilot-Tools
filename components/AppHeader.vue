<template>
  <header class="site-header">
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
        <NuxtLink to="/tools" class="nav-link">
          <LayoutGrid :size="16" />
          {{ t('nav.allTools') }}
        </NuxtLink>
        <NuxtLink to="/qr-code-generator" class="nav-link">
          <QrCode :size="16" />
          {{ t('nav.qrCode') }}
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
import { FileText, Files, Home, Image, LayoutGrid, QrCode } from 'lucide-vue-next'


const { locale, setLocale, t } = useLocale()
</script>
