import type { ToolInfo, ToolKey } from '~/types/tool'

const siteUrl = 'https://filepilottools.top'
const siteName = 'FilePilot Tools'

type FaqItemKeys = {
  questionKey: string
  answerKey: string
}

type ToolSupportContent = {
  titleKey: string
  paragraphKeys: string[]
  useCaseKeys: string[]
  stepKeys: string[]
  faqItems: FaqItemKeys[]
}

type PageSeoOptions = {
  titleKey: string
  descriptionKey: string
  path: string
  schemaType: 'WebSite' | 'CollectionPage'
}

const genericFaqItems: FaqItemKeys[] = [
  {
    questionKey: 'faq.uploadedQuestion',
    answerKey: 'faq.uploadedAnswer'
  },
  {
    questionKey: 'faq.freeQuestion',
    answerKey: 'faq.freeAnswer'
  },
  {
    questionKey: 'faq.mobileQuestion',
    answerKey: 'faq.mobileAnswer'
  }
]

// These keys drive both the visible FAQ block and the FAQPage JSON-LD in <head>.
// Keeping one shared map avoids the search metadata saying something different from the page content.
const toolSupportContent: Record<ToolKey, ToolSupportContent> = {
  'image-compressor': {
    titleKey: 'support.imageCompressor.title',
    paragraphKeys: ['support.imageCompressor.paragraph1', 'support.imageCompressor.paragraph2'],
    useCaseKeys: ['support.imageCompressor.useCase1', 'support.imageCompressor.useCase2', 'support.imageCompressor.useCase3'],
    stepKeys: ['support.imageCompressor.step1', 'support.imageCompressor.step2', 'support.imageCompressor.step3'],
    faqItems: [
      {
        questionKey: 'support.imageCompressor.faq1Question',
        answerKey: 'support.imageCompressor.faq1Answer'
      },
      {
        questionKey: 'support.imageCompressor.faq2Question',
        answerKey: 'support.imageCompressor.faq2Answer'
      }
    ]
  },
  'image-converter': {
    titleKey: 'support.imageConverter.title',
    paragraphKeys: ['support.imageConverter.paragraph1', 'support.imageConverter.paragraph2'],
    useCaseKeys: ['support.imageConverter.useCase1', 'support.imageConverter.useCase2', 'support.imageConverter.useCase3'],
    stepKeys: ['support.imageConverter.step1', 'support.imageConverter.step2', 'support.imageConverter.step3'],
    faqItems: [
      {
        questionKey: 'support.imageConverter.faq1Question',
        answerKey: 'support.imageConverter.faq1Answer'
      },
      {
        questionKey: 'support.imageConverter.faq2Question',
        answerKey: 'support.imageConverter.faq2Answer'
      }
    ]
  },
  'image-to-pdf': {
    titleKey: 'support.imageToPdf.title',
    paragraphKeys: ['support.imageToPdf.paragraph1', 'support.imageToPdf.paragraph2'],
    useCaseKeys: ['support.imageToPdf.useCase1', 'support.imageToPdf.useCase2', 'support.imageToPdf.useCase3'],
    stepKeys: ['support.imageToPdf.step1', 'support.imageToPdf.step2', 'support.imageToPdf.step3'],
    faqItems: [
      {
        questionKey: 'support.imageToPdf.faq1Question',
        answerKey: 'support.imageToPdf.faq1Answer'
      },
      {
        questionKey: 'support.imageToPdf.faq2Question',
        answerKey: 'support.imageToPdf.faq2Answer'
      }
    ]
  },
  'crop-image': {
    titleKey: 'support.cropImage.title',
    paragraphKeys: ['support.cropImage.paragraph1', 'support.cropImage.paragraph2'],
    useCaseKeys: ['support.cropImage.useCase1', 'support.cropImage.useCase2', 'support.cropImage.useCase3'],
    stepKeys: ['support.cropImage.step1', 'support.cropImage.step2', 'support.cropImage.step3'],
    faqItems: [
      {
        questionKey: 'support.cropImage.faq1Question',
        answerKey: 'support.cropImage.faq1Answer'
      },
      {
        questionKey: 'support.cropImage.faq2Question',
        answerKey: 'support.cropImage.faq2Answer'
      }
    ]
  },
  'rotate-image': {
    titleKey: 'support.rotateImage.title',
    paragraphKeys: ['support.rotateImage.paragraph1', 'support.rotateImage.paragraph2'],
    useCaseKeys: ['support.rotateImage.useCase1', 'support.rotateImage.useCase2', 'support.rotateImage.useCase3'],
    stepKeys: ['support.rotateImage.step1', 'support.rotateImage.step2', 'support.rotateImage.step3'],
    faqItems: [
      {
        questionKey: 'support.rotateImage.faq1Question',
        answerKey: 'support.rotateImage.faq1Answer'
      },
      {
        questionKey: 'support.rotateImage.faq2Question',
        answerKey: 'support.rotateImage.faq2Answer'
      }
    ]
  },
  'merge-pdf': {
    titleKey: 'support.mergePdf.title',
    paragraphKeys: ['support.mergePdf.paragraph1', 'support.mergePdf.paragraph2'],
    useCaseKeys: ['support.mergePdf.useCase1', 'support.mergePdf.useCase2', 'support.mergePdf.useCase3'],
    stepKeys: ['support.mergePdf.step1', 'support.mergePdf.step2', 'support.mergePdf.step3'],
    faqItems: [
      {
        questionKey: 'support.mergePdf.faq1Question',
        answerKey: 'support.mergePdf.faq1Answer'
      },
      {
        questionKey: 'support.mergePdf.faq2Question',
        answerKey: 'support.mergePdf.faq2Answer'
      }
    ]
  },
  'split-pdf': {
    titleKey: 'support.splitPdf.title',
    paragraphKeys: ['support.splitPdf.paragraph1', 'support.splitPdf.paragraph2'],
    useCaseKeys: ['support.splitPdf.useCase1', 'support.splitPdf.useCase2', 'support.splitPdf.useCase3'],
    stepKeys: ['support.splitPdf.step1', 'support.splitPdf.step2', 'support.splitPdf.step3'],
    faqItems: [
      {
        questionKey: 'support.splitPdf.faq1Question',
        answerKey: 'support.splitPdf.faq1Answer'
      },
      {
        questionKey: 'support.splitPdf.faq2Question',
        answerKey: 'support.splitPdf.faq2Answer'
      }
    ]
  },
  'compress-pdf': {
    titleKey: 'support.compressPdf.title',
    paragraphKeys: ['support.compressPdf.paragraph1', 'support.compressPdf.paragraph2'],
    useCaseKeys: ['support.compressPdf.useCase1', 'support.compressPdf.useCase2', 'support.compressPdf.useCase3'],
    stepKeys: ['support.compressPdf.step1', 'support.compressPdf.step2', 'support.compressPdf.step3'],
    faqItems: [
      {
        questionKey: 'support.compressPdf.faq1Question',
        answerKey: 'support.compressPdf.faq1Answer'
      },
      {
        questionKey: 'support.compressPdf.faq2Question',
        answerKey: 'support.compressPdf.faq2Answer'
      }
    ]
  },
  'pdf-to-images': {
    titleKey: 'support.pdfToImages.title',
    paragraphKeys: ['support.pdfToImages.paragraph1', 'support.pdfToImages.paragraph2'],
    useCaseKeys: ['support.pdfToImages.useCase1', 'support.pdfToImages.useCase2', 'support.pdfToImages.useCase3'],
    stepKeys: ['support.pdfToImages.step1', 'support.pdfToImages.step2', 'support.pdfToImages.step3'],
    faqItems: [
      {
        questionKey: 'support.pdfToImages.faq1Question',
        answerKey: 'support.pdfToImages.faq1Answer'
      },
      {
        questionKey: 'support.pdfToImages.faq2Question',
        answerKey: 'support.pdfToImages.faq2Answer'
      }
    ]
  },
  'resize-image': {
    titleKey: 'support.resizeImage.title',
    paragraphKeys: ['support.resizeImage.paragraph1', 'support.resizeImage.paragraph2'],
    useCaseKeys: ['support.resizeImage.useCase1', 'support.resizeImage.useCase2', 'support.resizeImage.useCase3'],
    stepKeys: ['support.resizeImage.step1', 'support.resizeImage.step2', 'support.resizeImage.step3'],
    faqItems: [
      {
        questionKey: 'support.resizeImage.faq1Question',
        answerKey: 'support.resizeImage.faq1Answer'
      },
      {
        questionKey: 'support.resizeImage.faq2Question',
        answerKey: 'support.resizeImage.faq2Answer'
      }
    ]
  },
  'qr-code-generator': {
    titleKey: 'support.qrCode.title',
    paragraphKeys: ['support.qrCode.paragraph1', 'support.qrCode.paragraph2'],
    useCaseKeys: ['support.qrCode.useCase1', 'support.qrCode.useCase2', 'support.qrCode.useCase3'],
    stepKeys: ['support.qrCode.step1', 'support.qrCode.step2', 'support.qrCode.step3'],
    faqItems: [
      {
        questionKey: 'support.qrCode.faq1Question',
        answerKey: 'support.qrCode.faq1Answer'
      },
      {
        questionKey: 'support.qrCode.faq2Question',
        answerKey: 'support.qrCode.faq2Answer'
      }
    ]
  }
}

function getAbsoluteUrl(path: string) {
  return `${siteUrl}${path}`
}

function getOgLocale(locale: string) {
  return locale === 'zh-CN' ? 'zh_CN' : 'en_US'
}

function buildCommonMeta(title: string, description: string, url: string, locale: string) {
  return [
    {
      name: 'description',
      content: description
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:site_name',
      content: siteName
    },
    {
      property: 'og:title',
      content: title
    },
    {
      property: 'og:description',
      content: description
    },
    {
      property: 'og:url',
      content: url
    },
    {
      property: 'og:locale',
      content: getOgLocale(locale)
    },
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:title',
      content: title
    },
    {
      name: 'twitter:description',
      content: description
    }
  ]
}

export function getGenericFaqItems() {
  return genericFaqItems
}

export function getToolSupportContent(toolKey: ToolKey) {
  const content = toolSupportContent[toolKey]

  return {
    ...content,
    faqItems: [...content.faqItems, ...genericFaqItems]
  }
}

export function useToolSeo(tool: ToolInfo) {
  const { t, locale } = useLocale()
  const supportContent = getToolSupportContent(tool.key)

  useHead(() => {
    const title = t(tool.seoTitleKey)
    const description = t(tool.seoDescriptionKey)
    const url = getAbsoluteUrl(tool.href)
    const faqEntities = supportContent.faqItems.map((item) => ({
      '@type': 'Question',
      name: t(item.questionKey),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(item.answerKey)
      }
    }))
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          name: t(tool.titleKey),
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Any',
          url,
          description,
          isAccessibleForFree: true,
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          }
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqEntities
        }
      ]
    }

    return {
      title,
      htmlAttrs: {
        lang: locale.value
      },
      link: [
        {
          rel: 'canonical',
          href: url
        }
      ],
      meta: buildCommonMeta(title, description, url, locale.value),
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(schema)
        }
      ]
    }
  })
}

export function usePageSeo(options: PageSeoOptions) {
  const { t, locale } = useLocale()

  useHead(() => {
    const title = t(options.titleKey)
    const description = t(options.descriptionKey)
    const url = getAbsoluteUrl(options.path)
    const schema = {
      '@context': 'https://schema.org',
      '@type': options.schemaType,
      name: title,
      url,
      description
    }

    return {
      title,
      htmlAttrs: {
        lang: locale.value
      },
      link: [
        {
          rel: 'canonical',
          href: url
        }
      ],
      meta: buildCommonMeta(title, description, url, locale.value),
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(schema)
        }
      ]
    }
  })
}
