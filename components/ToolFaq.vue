<template>
  <section class="faq-section">
    <ObBlock :ob_info="ob_info" />
    <h2>{{ t('faq.title') }}</h2>
    <div class="faq-grid">
      <article>
        <h3>{{ t('faq.uploadedQuestion') }}</h3>
        <p>{{ t('faq.uploadedAnswer') }}</p>
      </article>
      <article>
        <h3>{{ t('faq.freeQuestion') }}</h3>
        <p>{{ t('faq.freeAnswer') }}</p>
      </article>
      <article>
        <h3>{{ t('faq.mobileQuestion') }}</h3>
        <p>{{ t('faq.mobileAnswer') }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()

const ob_info = {
  name: 'tool-faq',
  file: 'D:\\zhizhouAi\\myproject\\components\\ToolFaq.vue'
}
</script>
