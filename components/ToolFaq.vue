<template>
  <section class="faq-section">
    <h2>{{ t(content.titleKey) }}</h2>
    <div class="seo-copy">
      <p v-for="paragraphKey in content.paragraphKeys" :key="paragraphKey">
        {{ t(paragraphKey) }}
      </p>
    </div>
    <div class="seo-columns">
      <div>
        <h3>{{ t('support.common.useCasesTitle') }}</h3>
        <ul>
          <li v-for="useCaseKey in content.useCaseKeys" :key="useCaseKey">
            {{ t(useCaseKey) }}
          </li>
        </ul>
      </div>
      <div>
        <h3>{{ t('support.common.stepsTitle') }}</h3>
        <ol>
          <li v-for="stepKey in content.stepKeys" :key="stepKey">
            {{ t(stepKey) }}
          </li>
        </ol>
      </div>
    </div>
    <div class="faq-grid">
      <article v-for="item in content.faqItems" :key="item.questionKey">
        <h3>{{ t(item.questionKey) }}</h3>
        <p>{{ t(item.answerKey) }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ToolKey } from '~/types/tool'

const props = defineProps<{
  toolKey: ToolKey
}>()

const { t } = useLocale()
const content = computed(() => getToolSupportContent(props.toolKey))

</script>
