export const locales = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'zh', label: '中文' }
] as const;

export type Locale = (typeof locales)[number]['code'];

export const defaultLocale: Locale = 'en';

export const messages = {
  en: {
    languageSwitcher: { label: 'Language' },
    nav: {
      quote: 'Request a Quote',
      about: 'About',
      faq: 'FAQ',
      contact: 'Contact'
    },
    footer: {
      copy: 'All rights reserved.',
      terms: 'Terms',
      privacy: 'Privacy',
      support: 'Support',
      admin: 'Admin'
    },
    disclaimer:
      'BuyFromChina.ca is a purchasing agent for direct shipment from Taobao/Tmall. We do not manufacture, sell, or warrant the products. All sales are final and no returns or exchanges are offered.',
    home: {
      badge: 'China’s Best, Delivered to Canada.',
      headline: 'From Taobao to your doorstep.',
      description:
        'BuyFromChina.ca is the simplest way for Canadians to shop Taobao and Tmall. We verify listings, convert the pricing to CAD, and handle purchasing, customs, and delivery.',
      primaryCta: 'Request a Quote',
      secondaryCta: 'See how it works',
      statChip: '12h',
      statDescription:
        'Quotes delivered within 12 hours. Test purchases and consolidated shipping available. Customs are handled by Taobao’s direct-shipping service.',
      bannerTag: 'Real purchases',
      bannerTitle: 'Curated Taobao finds, shipped to Canada with care.',
      about: {
        title: 'About BuyFromChina.ca',
        body:
          'We are a Canadian-owned procurement service dedicated to helping shoppers access China’s biggest marketplaces. Our bilingual sourcing team verifies sellers, consolidates logistics, and delivers a smooth end-to-end experience. Whether you are importing a single pair of sneakers or outfitting an entire studio, we treat every order with the same care.',
        stats: [
          {
            label: '10-14 business days',
            description: 'Typical delivery window from Qingdao consolidation warehouse to Canadian doorstep.'
          },
          {
            label: '100% CAD pricing',
            description: 'Quotes include currency conversion, duties, tax, and local courier drop-off.'
          }
        ],
        overlayTag: 'On-the-ground quality checks',
        overlayBody: 'Partners across Guangzhou, Hangzhou, and Shenzhen keep your orders on schedule.'
      },
      how: {
        title: 'How it works',
        intro: 'Four clear steps from inspiration to delivery. Every request is handled by our bilingual procurement specialists.',
        steps: [
          {
            title: 'Send us the product links or images',
            description:
              'Share any product URLs or inspiration photos with sizing notes. We validate listings and calculate everything in CAD.'
          },
          {
            title: 'Confirm your quote',
            description:
              'Review the full breakdown including shipping, tax, and service fee. Approve it or ask for tweaks.'
          },
          {
            title: 'Pay securely',
            description: 'Checkout with Stripe in Canadian dollars. We order from the seller and handle logistics.'
          },
          {
            title: 'Track delivery to Canada',
            description: 'We coordinate domestic shipping so your parcel lands right at your doorstep.'
          }
        ]
      },
      reasons: {
        title: 'Why choose us',
        intro:
          'We combine local insights with on-the-ground partners in China to deliver a premium experience for Canadian shoppers and businesses alike.',
        cta: 'Start your quote',
        cards: [
          {
            title: 'Specialized Taobao expertise',
            description: 'We navigate language barriers, payment hurdles, and seller vetting so you don’t have to.'
          },
          {
            title: 'Transparent pricing',
            description: 'Every quote shows item cost, service fee, tax, and shipping upfront—no surprise charges later.'
          },
          {
            title: 'Stripe-protected payments',
            description: 'Complete your order using Stripe Checkout for bank-grade security and buyer protection.'
          },
          {
            title: 'Dedicated Canadian support',
            description: 'Our team is based in Canada and available to help via email any time you have questions.'
          }
        ]
      },
      testimonialsTitle: 'What importers across Canada say',
      closing: {
        title: 'Ready to import your next Taobao find?',
        description: 'Get a tailored quote in Canadian dollars. No obligations until you confirm the payment.',
        cta: 'Start your quote'
      }
    },
    about: {
      heroTag: 'About BuyFromChina.ca',
      heroTitle: 'Trusted Taobao & Tmall procurement for Canadians.',
      heroBody:
        'We bridge the language, payment, and logistics gap so you can access China’s most exciting marketplaces without the stress. From single-item shoppers to bulk resellers, we deliver end-to-end support designed for Canadian buyers.',
      founderHeading: 'Meet our Founder',
      founderBio:
        'I’m Amelia, founder of BuyFromChina.ca, a platform that makes it easy for Canadians to shop trusted products directly from China. After living in Canada for over a decade, I created this service to simplify cross-border shopping and share the creativity and quality of Chinese brands with more people.',
      founderLinkedIn: {
        label: 'Connect on LinkedIn',
        href: 'https://www.linkedin.com/in/amelia-wang-a11y/'
      },
      driverTitle: 'What drives us',
      driverBody:
        'We believe Canadian buyers deserve the same access to China’s makers as local shoppers. Our role is to remove uncertainty—whether that’s opaque pricing, payments that bounce, or packages that get stuck at the border—so every order feels effortless.',
      processTitle: 'Our Proven Process',
      processIntro:
        'We’ve distilled hundreds of transactions into a predictable workflow that keeps you informed at each milestone.',
      processSteps: [
        {
          title: 'Discover',
          description:
            'Send us the product links or reference images that caught your eye. We verify sellers, stock, and variations.'
        },
        {
          title: 'Quote',
          description:
            'You receive an all-inclusive CAD breakdown covering product cost, logistics, duties, and service fee with clear timelines.'
        },
        {
          title: 'Checkout',
          description:
            'Approve the quote and pay securely through Stripe. We finalize the purchase, track parcels, and keep you updated.'
        },
        {
          title: 'Deliver',
          description:
            'Parcels route through trusted consolidators and arrive at your Canadian address, ready for unboxing without surprises.'
        }
      ],
      testimonialsTitle: 'What our customers say',
      testimonialsIntro:
        'Thousands of Canadians rely on us for timely communication, transparent CAD pricing, and parcels that arrive when promised.',
      testimonials: [
        {
          quote:
            'They sourced limited-edition designer pieces that Taobao sellers wouldn’t ship to Canada. Communication was fast and the CAD pricing matched the final invoice.',
          name: 'Lena W.',
          role: 'Vancouver, BC'
        },
        {
          quote:
            'I run a small resale shop and depend on consistent restocks. BuyFromChina.ca handles quality checks, consolidation, and customs so I can focus on customers.',
          name: 'Darius P.',
          role: 'Toronto, ON'
        },
        {
          quote:
            'This is easily the smoothest Taobao buying experience I’ve had. Stripe checkout, proactive updates, and delivery in under two weeks!',
          name: 'Michelle K.',
          role: 'Calgary, AB'
        }
      ],
      valuesTitle: 'Our Core Values',
      values: [
        {
          title: 'Transparency first',
          description: 'All pricing is broken down in CAD with zero hidden fees. You know exactly what each shipment costs.'
        },
        {
          title: 'Human support',
          description: 'You speak with real buyers fluent in Mandarin and English who negotiate with sellers on your behalf.'
        },
        {
          title: 'Trusted logistics',
          description:
            'We work with vetted forwarders and double-check packaging so your parcels arrive safely, insured, and on schedule.'
        },
        {
          title: 'Sustainable choices',
          description: 'We consolidate shipments where possible and partner with carriers committed to offsetting emissions.'
        }
      ],
      missionTitle: 'Our Mission',
      missionBody:
        'To make every Canadian feel confident buying from China’s marketplaces by pairing concierge support with automation that removes friction. We champion small sellers, highlight authentic products, and build reliable trade routes that empower cross-border creativity.',
      missionNote:
        'We’re continuously improving our tooling—pricing engines, order tracking, customs documentation—so you spend less time translating and more time enjoying your finds.',
      ctaTitle: 'Get in touch',
      ctaBody:
        'Ready to start your next import project—or need advice on navigating Taobao and Tmall? We’d love to help. Reach out and we’ll respond within 12 hours.',
      ctaPrimary: 'Request a quote',
      ctaSecondary: 'Contact our team'
    },
    faq: {
      title: 'Frequently Asked Questions',
      intro: 'Everything you need to know about bringing China’s best products to Canada with confidence.',
      items: [
        {
          id: 'sourcing',
          question: 'How do you source items from Taobao or Tmall?',
          answer:
            'Our bilingual staff confirms product availability directly with the seller, verifies sizing or specification details, and submits payment using trusted domestic methods. We only purchase from sellers with strong ratings and responsive customer service.'
        },
        {
          id: 'pricing',
          question: 'What is included in the quote?',
          answer:
            'Every quote includes the product cost converted to CAD, our 15% service fee (minimum $5), international shipping to Canada based on parcel size, and 13% HST. Remote postal codes may include an additional shipping surcharge.'
        },
        {
          id: 'timeline',
          question: 'How long does delivery take?',
          answer:
            'Most shipments arrive in 10-14 business days after payment, depending on seller dispatch speed and Canadian customs processing. We email tracking updates as soon as the parcel leaves China and again when it clears customs.'
        },
        {
          id: 'payment',
          question: 'How do I pay for my order?',
          answer:
            'Once you approve the quote, you will be redirected to Stripe Checkout to complete payment with your preferred credit card or Apple Pay/Google Pay wallet. Your card information never touches our servers.'
        },
        {
          id: 'returns-policy',
          question: 'Do you guarantee product quality or accept returns?',
          answer:
            'We’re a purchasing agent that helps you buy items directly from Chinese marketplaces. We’ll do our best to select listings with strong ratings and reviews, but we can’t guarantee product quality and we don’t provide returns or exchanges. Please review the product details carefully before ordering.'
        }
      ]
    },
    contactPage: {
      title: 'Contact our team',
      subtitle: 'We’re here to help with sizing checks, bulk orders, or any questions about the import process.'
    },
    contactForm: {
      labels: {
        name: 'Name',
        email: 'Email',
        message: 'Message'
      },
      placeholders: {
        name: 'Jane Doe',
        email: 'you@email.com',
        message: 'Share details about your request.'
      },
      status: {
        success: 'Thanks! Your message is on the way.',
        error: 'Something went wrong. Please try again later.',
        sending: 'Sending…'
      },
      button: {
        idle: 'Send message',
        sending: 'Sending…'
      },
      errors: {
        nameRequired: 'Please enter your name.',
        nameMax: 'Name must be under 80 characters.',
        emailInvalid: 'Enter a valid email address.',
        messageMin: 'Tell us how we can help (at least 10 characters).',
        messageMax: 'Message is too long.',
        rateLimited: 'Too many messages. Please wait a minute and try again.',
        fixFields: 'Please fix the highlighted fields.',
        deliveryFailed: 'We could not send your message. Please try again later or email support@buyfromchina.ca.'
      }
    },
    quotePage: {
      badge: 'China’s Best, Delivered to Canada.',
      title: 'Request a quote',
      description:
        'Tell us what you want from Taobao or Tmall and we will send you a detailed CAD quote with shipping, duties, tax, and service fee included. Approve the quote to pay securely via Stripe Checkout.',
      cards: [
        {
          title: '24/7 sourcing support',
          body: 'Our bilingual buyers coordinate with Taobao sellers, confirm stock, and answer questions within 12 hours.'
        },
        {
          title: 'Everything in CAD',
          body: 'Quotes include cross-border shipping, duties, tax, and our service fee. You’ll never be surprised by hidden costs.'
        }
      ]
    },
    quoteForm: {
      urlsLabel: 'Product URLs',
      optionalHint: '(optional)',
      addUrl: 'Add URL',
      remove: 'Remove',
      urlsHint: 'Enter one link per field. Click “Add URL” to include more Taobao or Tmall products.',
      recipientName: { label: 'Recipient name', placeholder: 'Full name' },
      addressLine1: { label: 'Street address', placeholder: '123 Example Street' },
      addressLine2: { label: 'Apartment, suite, etc.', placeholder: 'Unit 5B' },
      email: { label: 'Email', placeholder: 'you@email.com' },
      city: { label: 'City', placeholder: 'Toronto' },
      province: { label: 'Province / Territory', placeholder: 'ON' },
      postalCode: { label: 'Canadian postal code', placeholder: 'M5V 2T6' },
      notes: { label: 'Notes', placeholder: 'Provide size preferences, reference photos, seller options, etc.' },
      attachments: {
        label: 'Reference images',
        add: 'Add image',
        hint: 'Upload up to 5 PNG or JPEG images. Use “Add image” to attach another photo.'
      },
      referencePrice: { label: 'Reference price in CAD (optional)', placeholder: 'e.g. 89.99' },
      parcelSize: { legend: 'Estimated parcel size', small: 'Small (accessories, light items)', medium: 'Medium (shoes, hoodies, tech)', large: 'Large (jackets, bulk orders)' },
      termsNotice: 'We respond within 12 hours. By submitting, you agree to our',
      submit: { idle: 'Send request', pending: 'Submitting…' },
      status: {
        successTitle: 'We received your request.',
        successBody: 'Our team will review the item and email you a detailed quote shortly.',
        successAttachments: 'Attachment count: {{count}}. We will reference these images when preparing pricing.',
        submitting: 'Submitting quote request…',
        generalError: 'Please correct the highlighted fields.'
      },
      zod: {
        urlsInvalid: 'Enter valid Taobao or Tmall URLs. Use a new line for each link.',
        recipientName: 'Enter the recipient name.',
        addressLine1: 'Enter the street address.',
        city: 'Enter a city.',
        province: 'Enter a province or territory.',
        email: 'Enter a valid email address.',
        postalCode: 'Use a valid Canadian postal code.',
        notes: 'Notes must be at most 1500 characters.',
        referencePrice: 'Reference price must be a positive number.',
        size: 'Select an estimated parcel size.'
      },
      server: {
        rateLimited: 'Too many quote attempts. Please wait a minute and try again.',
        attachmentsExceeded: 'Upload up to 5 reference images.',
        attachmentTooLarge: 'Each image must be 15MB or smaller.',
        attachmentType:
          'Images must be PNG or JPEG. Remove the unsupported file and try again.',
        uploadError: 'We could not upload your attachment. Please try again.',
        success: 'Request received! We will email a quote soon.'
      }
    },
    successPage: {
      noOrder: {
        title: 'Payment received',
        body: 'Thank you! If you need an updated receipt, contact us at support@buyfromchina.ca.',
        back: 'Back to home'
      },
      confirmed: {
        title: 'Payment confirmed',
        subtitle: 'We received your payment. Our sourcing team will place the order and update you with tracking details.',
        details: {
          orderId: 'Order ID',
          quoteId: 'Quote ID',
          paidOn: 'Paid on',
          total: 'Total'
        },
        adminLink: 'View in admin',
        homeLink: 'Return home'
      }
    },
    legal: {
      terms: {
        title: 'Terms of Service',
        effectiveLabel: 'Effective date',
        effectiveDate: '28 October 2024',
        intro:
          'BuyFromChina.ca (“we”, “us”, “our”) provides procurement and logistics services to customers located in Canada who wish to purchase items from Taobao, Tmall, and other Chinese marketplaces (“Services”). By requesting a quote or submitting payment you agree to these Terms of Service.',
        sections: [
          {
            heading: '1. Quotes & pricing',
            body: [
              'Quotes are valid for 48 hours unless otherwise stated. Pricing includes the product cost (converted to CAD), a service fee, international shipping, and applicable taxes. We reserve the right to adjust quotes if the seller changes pricing, availability, or shipping terms before payment is received. Where adjustments are required we will notify you and request approval before proceeding.'
            ]
          },
          {
            heading: '2. Payment',
            body: [
              'Payments are processed through Stripe. We do not store your credit card information. Orders are confirmed and placed with sellers only after successful payment. If payment is not received within the quote validity window, the quote may be cancelled or recalculated.'
            ]
          },
          {
            heading: '3. Cancellations & refunds',
            body: [
              'BuyFromChina.ca is a purchasing agent that arranges direct shipment from Taobao/Tmall sellers. We do not manufacture, own, or warrant any products. All sales are final—no cancellations, returns, or exchanges are offered once payment is made.'
            ]
          },
          {
            heading: 'Third-Party Products & No-Return Policy',
            body: [
              'BuyFromChina.ca provides a purchasing and forwarding service to help customers in Canada order products directly from third-party sellers on Taobao/Tmall and other Chinese marketplaces. We are not the manufacturer or seller of these products and therefore do not make any representations or warranties (express or implied) regarding product quality, performance, safety, fitness for a particular purpose, or merchantability.',
              'While we make reasonable efforts to source items from listings with positive ratings and reviews, final responsibility for product selection rests with the customer. Please review the seller’s description, photos, sizing charts, ratings, and comments before you place an order.',
              'All orders are final once placed. No returns, exchanges, or refunds are provided by BuyFromChina.ca for reasons including—but not limited to—size, color, fit, change of mind, or general dissatisfaction. If an item arrives damaged or not as described, we can assist you in contacting the marketplace seller to seek a resolution, but outcomes are not guaranteed and may be subject to the seller’s policies and platform rules.',
              'By placing an order, you acknowledge and agree to the above terms.'
            ]
          },
          {
            heading: '4. Customs & duties',
            body: [
              'We handle customs documentation and remittance of duties and taxes based on information supplied by the seller and you. You are responsible for providing accurate delivery information. While uncommon, customs inspections may introduce delays outside our control.'
            ]
          },
          {
            heading: '5. Limitation of liability',
            body: [
              'To the maximum extent permitted by law, our liability for any claim arising from the Services is limited to the amount you paid for the applicable order. We are not liable for incidental, indirect, or consequential damages.'
            ]
          },
          {
            heading: '6. Changes',
            body: [
              'We may update these Terms from time to time. Material changes will be communicated via email or on our website. Continued use of the Services after a change constitutes acceptance of the updated Terms.'
            ]
          }
        ],
        contact:
          'Questions about these Terms can be sent to support@buyfromchina.ca.'
      },
      privacy: {
        title: 'Privacy Policy',
        effectiveLabel: 'Effective date',
        effectiveDate: '28 October 2024',
        intro:
          'We respect your privacy and are committed to safeguarding personal information collected in connection with the Services. This Privacy Policy outlines how we gather, use, and disclose your data when you interact with BuyFromChina.ca.',
        sections: [
          {
            heading: '1. Information we collect',
            list: [
              'Contact information such as your name, email address, and shipping details.',
              'Quote details including product URLs, sizing notes, and reference pricing you provide.',
              'Payment confirmations and related order metadata from Stripe. We never receive or store full card numbers.',
              'Communication history when you contact support.'
            ]
          },
          {
            heading: '2. How we use information',
            intro: 'We use personal information to:',
            list: [
              'Generate quotes and fulfill procurement and logistics activities.',
              'Send transactional emails (quotes, payment confirmations, shipping updates).',
              'Improve our Services, prevent fraud, and comply with legal requirements.'
            ]
          },
          {
            heading: '3. Sharing information',
            body: [
              'We share information with trusted partners such as Stripe (payments), logistics providers, and communication platforms solely to deliver the Services. We do not sell your data to third parties.'
            ]
          },
          {
            heading: '4. Data retention',
            body: [
              'We keep quotes and order records for as long as required to provide service support, comply with tax obligations, and maintain accurate financial records. You may request deletion of non-statutory information by contacting us.'
            ]
          },
          {
            heading: '5. Security',
            body: [
              'We implement administrative, technical, and physical safeguards to protect personal data, including encryption, access controls, and routine security reviews. However, no method of transmission or storage is completely secure.'
            ]
          },
          {
            heading: '6. Your choices',
            body: [
              'You can opt-out of marketing communications, request a copy of your data, or ask us to correct inaccurate information by emailing support@buyfromchina.ca.'
            ]
          },
          {
            heading: '7. Updates',
            body: [
              'We may update this policy periodically. Changes will be posted on this page with a revised effective date. Material updates will be highlighted or communicated via email.'
            ]
          }
        ]
      }
    },
    globalError: {
      badge: 'Something went wrong',
      title: 'We hit a snag loading this page.',
      description: 'Try again in a moment, or head back to the dashboard.',
      retry: 'Try again',
      adminLink: 'Go to admin'
    },
    notFound: {
      title: 'This page does not exist.',
      description: 'Double-check the URL or return to the dashboard.',
      home: 'Back to home',
      admin: 'Go to admin'
    }
  },
  fr: {
    languageSwitcher: { label: 'Langue' },
    nav: {
      quote: 'Demander un devis',
      about: 'À propos',
      faq: 'FAQ',
      contact: 'Contact'
    },
    footer: {
      copy: 'Tous droits réservés.',
      terms: 'Conditions',
      privacy: 'Confidentialité',
      support: 'Assistance',
      admin: 'Admin'
    },
    disclaimer:
      'BuyFromChina.ca agit comme agent d’achat pour des expéditions directes Taobao/Tmall. Nous ne fabriquons, vendons ni garantissons les produits. Toutes les ventes sont finales, aucun retour ni échange n’est possible.',
    home: {
      badge: 'Le meilleur de la Chine livré au Canada.',
      headline: 'De Taobao jusqu’à votre porte.',
      description:
        'BuyFromChina.ca est la façon la plus simple pour les Canadiens d’acheter sur Taobao et Tmall. Nous vérifions les annonces, convertissons les prix en dollars CA et gérons l’achat, la douane et la livraison.',
      primaryCta: 'Demander un devis',
      secondaryCta: 'Voir le fonctionnement',
      statChip: '12h',
      statDescription:
        'Devis envoyés en moins de 12 heures. Achats test et expéditions groupées disponibles. Les formalités douanières sont prises en charge par le service d’expédition directe de Taobao.',
      bannerTag: 'Achats réels',
      bannerTitle: 'Sélections Taobao, expédiées vers le Canada avec soin.',
      about: {
        title: 'À propos de BuyFromChina.ca',
        body:
          'Nous sommes un service canadien qui aide les acheteurs à accéder aux plus grands marchés chinois. Notre équipe bilingue vérifie les vendeurs, consolide la logistique et offre une expérience fluide de bout en bout. Petites commandes ou projets complets, chaque demande reçoit la même attention.',
        stats: [
          {
            label: '10-14 jours ouvrables',
            description: 'Délai moyen entre l’entrepôt de Qingdao et votre adresse canadienne.'
          },
          {
            label: '100 % en dollars CA',
            description: 'Les devis incluent conversion, droits, taxes et livraison locale.'
          }
        ],
        overlayTag: 'Contrôles de qualité sur place',
        overlayBody: 'Nos partenaires à Guangzhou, Hangzhou et Shenzhen veillent au respect des délais.'
      },
      how: {
        title: 'Notre processus',
        intro: 'Quatre étapes simples, de l’inspiration à la livraison, gérées par nos spécialistes bilingues.',
        steps: [
          {
            title: 'Envoyez les liens ou images produit',
            description:
              'Partagez toute URL ou photo d’inspiration avec les tailles souhaitées. Nous validons l’annonce et calculons tout en dollars CA.'
          },
          {
            title: 'Validez votre devis',
            description:
              'Consultez le détail complet incluant expédition, taxes et frais de service. Approuvez ou demandez des ajustements.'
          },
          {
            title: 'Payez en toute sécurité',
            description: 'Réglez via Stripe en dollars canadiens. Nous achetons auprès du vendeur et gérons la logistique.'
          },
          {
            title: 'Suivez la livraison au Canada',
            description: 'Nous organisons le transport interne pour que le colis arrive directement chez vous.'
          }
        ]
      },
      reasons: {
        title: 'Pourquoi nous choisir',
        intro:
          'Nous allions expertise locale et partenaires sur le terrain en Chine pour offrir une expérience premium aux particuliers comme aux entreprises canadiennes.',
        cta: 'Commencer un devis',
        cards: [
          {
            title: 'Expertise Taobao dédiée',
            description: 'Nous gérons la langue, les paiements et la vérification des vendeurs à votre place.'
          },
          {
            title: 'Tarification transparente',
            description: 'Chaque devis détaille prix, service, taxes et livraison — aucun frais surprise.'
          },
          {
            title: 'Paiements protégés par Stripe',
            description: 'Stripe Checkout offre une sécurité de niveau bancaire et une protection acheteur.'
          },
          {
            title: 'Support canadien réactif',
            description: 'Notre équipe basée au Canada répond rapidement à toutes vos questions.'
          }
        ]
      },
      testimonialsTitle: 'Ce que disent les importateurs canadiens',
      closing: {
        title: 'Prêt à importer votre prochaine trouvaille Taobao ?',
        description: 'Recevez un devis personnalisé en dollars CA. Vous ne payez rien tant que vous n’approuvez pas.',
        cta: 'Commencer un devis'
      }
    },
    about: {
      heroTag: 'À propos de BuyFromChina.ca',
      heroTitle: 'Un partenaire Taobao/Tmall de confiance pour les Canadiens.',
      heroBody:
        'Nous comblons les écarts de langue, de paiement et de logistique pour vous donner accès aux marchés chinois en toute simplicité. Du particulier au revendeur, nous offrons un accompagnement complet pensé pour le Canada.',
      founderHeading: 'Rencontrez notre fondatrice',
      founderBio:
        'Je suis Amelia, fondatrice de BuyFromChina.ca. Après plus de dix ans au Canada, j’ai lancé ce service pour simplifier les achats transfrontaliers et partager la créativité des marques chinoises.',
      founderLinkedIn: {
        label: 'Suivez-nous sur LinkedIn',
        href: 'https://www.linkedin.com/in/amelia-wang-a11y/'
      },
      driverTitle: 'Notre motivation',
      driverBody:
        'Nous pensons que les acheteurs canadiens méritent le même accès aux créateurs chinois que les clients locaux. Notre rôle est d’éliminer les incertitudes — prix opaques, paiements refusés, colis bloqués — afin que chaque commande soit sereine.',
      processTitle: 'Notre processus éprouvé',
      processIntro:
        'Nous avons transformé des centaines de transactions en un flux prévisible, avec mises à jour à chaque étape.',
      processSteps: [
        {
          title: 'Découvrir',
          description:
            'Envoyez-nous les liens ou images des produits qui vous plaisent. Nous vérifions les vendeurs, le stock et les variations.'
        },
        {
          title: 'Devis',
          description:
            'Vous recevez un récapitulatif complet en dollars CA couvrant produit, logistique, droits et frais de service.'
        },
        {
          title: 'Paiement',
          description:
            'Approuvez le devis puis payez via Stripe. Nous finalisons l’achat, suivons les colis et vous tenons informé.'
        },
        {
          title: 'Livraison',
          description:
            'Les colis transitent par nos consolidateurs de confiance et arrivent à votre adresse canadienne sans mauvaise surprise.'
        }
      ],
      testimonialsTitle: 'Ce que disent nos clients',
      testimonialsIntro:
        'Des milliers de Canadiens comptent sur nous pour des réponses rapides, des prix transparents en dollars CA et des livraisons ponctuelles.',
      testimonials: [
        {
          quote:
            'Ils ont trouvé des pièces de créateurs limitées que les vendeurs Taobao refusaient d’expédier au Canada. Communication rapide et devis conforme à la facture finale.',
          name: 'Lena W.',
          role: 'Vancouver (C.-B.)'
        },
        {
          quote:
            'Je gère une petite boutique de revente. BuyFromChina.ca s’occupe du contrôle qualité, de la consolidation et de la douane pendant que je m’occupe de mes clients.',
          name: 'Darius P.',
          role: 'Toronto (ON)'
        },
        {
          quote:
            'C’est de loin mon expérience Taobao la plus fluide : paiement Stripe, mises à jour proactives et livraison en moins de deux semaines.',
          name: 'Michelle K.',
          role: 'Calgary (AB)'
        }
      ],
      valuesTitle: 'Nos valeurs',
      values: [
        {
          title: 'Transparence absolue',
          description: 'Chaque devis détaille les coûts en dollars CA sans frais cachés.'
        },
        {
          title: 'Support humain',
          description: 'Vous parlez à de vrais acheteurs bilingues qui négocient avec les vendeurs pour vous.'
        },
        {
          title: 'Logistique fiable',
          description: 'Nous travaillons avec des transitaires sélectionnés et vérifions chaque colis.'
        },
        {
          title: 'Choix responsables',
          description: 'Nous regroupons les envois quand c’est possible et collaborons avec des transporteurs engagés.'
        }
      ],
      missionTitle: 'Notre mission',
      missionBody:
        'Offrir à chaque Canadien la confiance nécessaire pour acheter sur les marketplaces chinoises grâce à un accompagnement concierge et des outils qui éliminent les frictions.',
      missionNote:
        'Nous améliorons sans cesse nos outils — calculs tarifaires, suivi de commande, documents douaniers — afin que vous passiez moins de temps à traduire et plus de temps à profiter de vos trouvailles.',
      ctaTitle: 'Contactez-nous',
      ctaBody:
        'Prêt pour votre prochain projet d’importation ou besoin de conseils sur Taobao/Tmall ? Écrivez-nous, réponse sous 12 h.',
      ctaPrimary: 'Demander un devis',
      ctaSecondary: 'Écrire à l’équipe'
    },
    faq: {
      title: 'Foire aux questions',
      intro: 'Tout ce qu’il faut savoir pour importer des produits chinois au Canada en toute sérénité.',
      items: [
        {
          id: 'sourcing',
          question: 'Comment sourcez-vous les articles sur Taobao ou Tmall ? ',
          answer:
            'Notre équipe bilingue vérifie la disponibilité auprès du vendeur, confirme les tailles ou spécifications puis paie via des méthodes locales fiables. Nous achetons uniquement auprès de vendeurs bien notés et réactifs.'
        },
        {
          id: 'pricing',
          question: 'Que comprend le devis ?',
          answer:
            'Le coût du produit converti en dollars CA, notre frais de service de 15 % (minimum 5 $), l’expédition internationale vers le Canada selon la taille du colis et la TVH de 13 %. Les codes postaux éloignés peuvent entraîner un supplément.'
        },
        {
          id: 'timeline',
          question: 'Quel est le délai de livraison ?',
          answer:
            'La plupart des colis arrivent en 10 à 14 jours ouvrables après paiement, selon la rapidité d’expédition du vendeur et la douane canadienne. Nous envoyons des mises à jour dès que le colis quitte la Chine puis après le dédouanement.'
        },
        {
          id: 'payment',
          question: 'Comment payer ma commande ?',
          answer:
            'Après validation du devis, vous êtes redirigé vers Stripe Checkout pour payer par carte ou portefeuille Apple/Google Pay. Nous n’accédons jamais aux données complètes de votre carte.'
        },
        {
          id: 'returns-policy',
          question: 'Garantissez-vous la qualité ou acceptez-vous les retours ?',
          answer:
            'Nous agissons comme agent d’achat auprès des marketplaces chinoises. Nous sélectionnons les annonces les mieux notées, mais ne pouvons garantir la qualité et n’offrons pas de retours/échanges. Vérifiez bien la fiche produit avant de commander.'
        }
      ]
    },
    contactPage: {
      title: 'Contactez notre équipe',
      subtitle: 'Nous vous aidons pour les vérifications de taille, les commandes groupées ou toute question sur l’importation.'
    },
    contactForm: {
      labels: { name: 'Nom', email: 'Courriel', message: 'Message' },
      placeholders: {
        name: 'Jane Dupont',
        email: 'vous@email.com',
        message: 'Précisez votre demande.'
      },
      status: {
        success: 'Merci ! Votre message a bien été envoyé.',
        error: 'Une erreur est survenue. Réessayez plus tard.',
        sending: 'Envoi…'
      },
      button: { idle: 'Envoyer', sending: 'Envoi…' },
      errors: {
        nameRequired: 'Merci d’indiquer votre nom.',
        nameMax: 'Le nom doit contenir moins de 80 caractères.',
        emailInvalid: 'Saisissez une adresse courriel valide.',
        messageMin: 'Expliquez comment nous aider (minimum 10 caractères).',
        messageMax: 'Message trop long.',
        rateLimited: 'Trop de messages. Patientez une minute avant de réessayer.',
        fixFields: 'Corrigez les champs signalés.',
        deliveryFailed: 'Impossible d’envoyer votre message. Réessayez plus tard ou écrivez directement à support@buyfromchina.ca.'
      }
    },
    quotePage: {
      badge: 'Le meilleur de la Chine livré au Canada.',
      title: 'Demander un devis',
      description:
        'Dites-nous ce que vous souhaitez sur Taobao ou Tmall et nous vous enverrons un devis détaillé en dollars CA incluant livraison, droits, taxes et frais de service.',
      cards: [
        {
          title: 'Support sourcing 24/7',
          body: 'Nos acheteurs bilingues contactent les vendeurs Taobao, confirment le stock et répondent à vos questions en moins de 12 h.'
        },
        {
          title: 'Tout en dollars CA',
          body: 'Les devis incluent transport international, droits, taxes et frais de service. Aucun frais caché.'
        }
      ]
    },
    quoteForm: {
      urlsLabel: 'Liens produits',
      optionalHint: '(optionnel)',
      addUrl: 'Ajouter un lien',
      remove: 'Supprimer',
      urlsHint: 'Saisissez un lien par champ. Cliquez sur “Ajouter un lien” pour en inclure d’autres.',
      recipientName: { label: 'Nom du destinataire', placeholder: 'Nom complet' },
      addressLine1: { label: 'Adresse', placeholder: '123 rue Exemple' },
      addressLine2: { label: 'Appartement, etc.', placeholder: 'Unité 5B' },
      email: { label: 'Courriel', placeholder: 'vous@email.com' },
      city: { label: 'Ville', placeholder: 'Toronto' },
      province: { label: 'Province / Territoire', placeholder: 'QC' },
      postalCode: { label: 'Code postal canadien', placeholder: 'H3Z 2Y7' },
      notes: { label: 'Notes', placeholder: 'Tailles, photos de référence, options de vendeurs…' },
      attachments: {
        label: 'Images de référence',
        add: 'Ajouter une image',
        hint: 'Téléversez jusqu’à 5 images PNG ou JPEG. Utilisez “Ajouter une image” pour une photo supplémentaire.'
      },
      referencePrice: { label: 'Prix de référence en CAD (optionnel)', placeholder: 'ex. 89,99' },
      parcelSize: {
        legend: 'Taille estimée du colis',
        small: 'Petit (accessoires, articles légers)',
        medium: 'Moyen (chaussures, hoodies, tech)',
        large: 'Grand (manteaux, commandes groupées)'
      },
      termsNotice: 'Réponse sous 12 h. En soumettant, vous acceptez nos',
      submit: { idle: 'Envoyer la demande', pending: 'Envoi…' },
      status: {
        successTitle: 'Nous avons reçu votre demande.',
        successBody: 'Notre équipe étudie l’article et vous enverra un devis détaillé sous peu.',
        successAttachments: 'Nombre de pièces jointes : {{count}}. Elles serviront de référence pour l’estimation.',
        submitting: 'Envoi de la demande de devis…',
        generalError: 'Corrigez les champs signalés.'
      },
      zod: {
        urlsInvalid: 'Ajoutez des URL valides (un lien par champ).',
        recipientName: 'Indiquez le nom du destinataire.',
        addressLine1: 'Indiquez l’adresse.',
        city: 'Indiquez une ville.',
        province: 'Indiquez une province ou un territoire.',
        email: 'Indiquez un courriel valide.',
        postalCode: 'Saisissez un code postal canadien valide.',
        notes: 'Les notes doivent contenir au plus 1500 caractères.',
        referencePrice: 'Le prix de référence doit être un nombre positif.',
        size: 'Sélectionnez une taille estimée.'
      },
      server: {
        rateLimited: 'Trop de demandes de devis. Réessayez dans une minute.',
        attachmentsExceeded: 'Téléversez jusqu’à 5 images de référence.',
        attachmentTooLarge: 'Chaque image doit faire 15 Mo ou moins.',
        attachmentType: 'Formats acceptés : PNG ou JPEG.',
        uploadError: 'Échec du téléversement. Réessayez.',
        success: 'Demande reçue ! Nous vous écrirons bientôt.'
      }
    },
    successPage: {
      noOrder: {
        title: 'Paiement reçu',
        body: 'Merci ! Pour un reçu mis à jour, écrivez à support@buyfromchina.ca.',
        back: 'Retour à l’accueil'
      },
      confirmed: {
        title: 'Paiement confirmé',
        subtitle: 'Nous allons passer la commande et vous transmettre les informations de suivi.',
        details: {
          orderId: 'ID commande',
          quoteId: 'ID devis',
          paidOn: 'Payé le',
          total: 'Total'
        },
        adminLink: 'Voir dans l’admin',
        homeLink: 'Retour à l’accueil'
      }
    },
    legal: {
      terms: {
        title: 'Conditions d’utilisation',
        effectiveLabel: 'Date d’effet',
        effectiveDate: '28 octobre 2024',
        intro:
          'BuyFromChina.ca (« nous ») fournit des services d’achat et de logistique pour les clients canadiens souhaitant commander sur Taobao, Tmall et autres marketplaces chinoises. En demandant un devis ou en payant, vous acceptez ces conditions.',
        sections: [
          {
            heading: '1. Devis et tarification',
            body: [
              'Les devis sont valables 48 h sauf mention contraire. Ils incluent le coût du produit (converti en CAD), les frais de service, l’expédition internationale et les taxes applicables. Si le vendeur modifie ses conditions avant paiement, nous vous informerons et demanderons votre approbation.'
            ]
          },
          {
            heading: '2. Paiement',
            body: [
              'Les paiements passent par Stripe. Nous ne stockons pas vos données de carte. La commande n’est passée qu’après paiement réussi. Passé le délai du devis, il peut être annulé ou recalculé.'
            ]
          },
          {
            heading: '3. Annulations et remboursements',
            body: [
              'BuyFromChina.ca agit comme agent d’achat. Nous ne fabriquons ni ne garantissons les produits. Les ventes sont finales : aucun annulation, retour ou échange après paiement.'
            ]
          },
          {
            heading: 'Produits tiers et politique sans retour',
            body: [
              'Nous aidons les clients à acheter directement auprès de vendeurs tiers. Nous ne garantissons pas la qualité et n’offrons pas de retours. Vérifiez attentivement les fiches produits avant de commander.',
              'Les commandes sont finales. Aucun remboursement pour changement d’avis, taille ou couleur. En cas de produit endommagé ou non conforme, nous pouvons contacter le vendeur, sans garantie de résultat.',
              'En commandant, vous reconnaissez ces conditions.'
            ]
          },
          {
            heading: '4. Douanes et droits',
            body: [
              'Nous préparons les documents et remettons droits/taxes selon les informations fournies. Des retards douaniers indépendants de notre volonté peuvent survenir.'
            ]
          },
          {
            heading: '5. Limitation de responsabilité',
            body: [
              'Notre responsabilité maximale est limitée au montant payé pour la commande concernée. Aucun dommage indirect n’est couvert.'
            ]
          },
          {
            heading: '6. Modifications',
            body: [
              'Nous pouvons mettre ces conditions à jour. Les changements importants seront communiqués. Continuer à utiliser nos services vaut acceptation.'
            ]
          }
        ],
        contact: 'Questions ? Écrivez à support@buyfromchina.ca.'
      },
      privacy: {
        title: 'Politique de confidentialité',
        effectiveLabel: 'Date d’effet',
        effectiveDate: '28 octobre 2024',
        intro:
          'Nous respectons votre vie privée et expliquons comment nous collectons, utilisons et protégeons vos données.',
        sections: [
          {
            heading: '1. Données collectées',
            list: [
              'Coordonnées (nom, courriel, adresse).',
              'Détails de devis (URL produits, tailles, prix de référence).',
              'Confirmations de paiement et métadonnées Stripe (sans numéro complet de carte).',
              'Historique de communication avec le support.'
            ]
          },
          {
            heading: '2. Utilisation',
            intro: 'Nous utilisons ces données pour :',
            list: [
              'Établir des devis et exécuter les commandes.',
              'Envoyer des courriels transactionnels (devis, paiements, suivi).',
              'Améliorer le service, prévenir la fraude et respecter la loi.'
            ]
          },
          {
            heading: '3. Partage',
            body: [
              'Nous partageons les informations uniquement avec des partenaires nécessaires (Stripe, transporteurs, outils de communication). Jamais de revente de données.'
            ]
          },
          {
            heading: '4. Conservation',
            body: [
              'Les devis et commandes sont conservés tant que requis pour l’assistance, la comptabilité et les obligations fiscales. Vous pouvez demander la suppression de données non obligatoires.'
            ]
          },
          {
            heading: '5. Sécurité',
            body: [
              'Nous appliquons des mesures administratives, techniques et physiques (chiffrement, contrôles d’accès). Aucun système n’est toutefois totalement sécurisé.'
            ]
          },
          {
            heading: '6. Vos choix',
            body: [
              'Vous pouvez vous désabonner des communications marketing, obtenir une copie de vos données ou demander une correction en écrivant à support@buyfromchina.ca.'
            ]
          },
          {
            heading: '7. Mises à jour',
            body: [
              'Nous mettrons cette politique à jour si nécessaire et indiquerons la nouvelle date d’effet.'
            ]
          }
        ]
      }
    },
    globalError: {
      badge: 'Un problème est survenu',
      title: 'Impossible de charger cette page.',
      description: 'Réessayez dans un instant ou retournez au tableau de bord.',
      retry: 'Réessayer',
      adminLink: 'Accéder à l’admin'
    },
    notFound: {
      title: 'Page introuvable.',
      description: 'Vérifiez l’URL ou revenez à l’accueil.',
      home: 'Retour à l’accueil',
      admin: 'Accéder à l’admin'
    }
  },
  zh: {
    languageSwitcher: { label: '语言' },
    nav: {
      quote: '提交报价请求',
      about: '关于我们',
      faq: '常见问题',
      contact: '联系我们'
    },
    footer: {
      copy: '版权所有。',
      terms: '服务条款',
      privacy: '隐私政策',
      support: '支持',
      admin: '后台'
    },
    disclaimer:
      'BuyFromChina.ca 仅提供淘宝/天猫直邮采购服务，不生产、不销售也不为商品提供质保。所有订单为最终销售，不接受退换。',
    home: {
      badge: '把中国好物送到加拿大。',
      headline: '从淘宝直达你家门口。',
      description: 'BuyFromChina.ca 让加拿大买家轻松逛淘宝/天猫。我们负责核实商品、换算加元、下单、清关与配送。',
      primaryCta: '提交报价请求',
      secondaryCta: '了解流程',
      statChip: '12h',
      statDescription: '12 小时内提供报价，可代拍样品并支持合箱发货。海关流程由淘宝直邮渠道处理。',
      bannerTag: '真实代购',
      bannerTitle: '精选淘宝好物，用心寄到加拿大。',
      about: {
        title: '关于 BuyFromChina.ca',
        body: '我们是加拿大本地采购团队，帮助买家触达中国最大电商平台。双语买手核实卖家、整合物流，提供顺畅的一站式体验。无论是一双球鞋还是整个工作室设备，我们都悉心处理。',
        stats: [
          { label: '10-14 个工作日', description: '从青岛集运仓到加拿大地址的典型时效。' },
          { label: '价格全部以加元显示', description: '报价包含汇率、关税、税费以及本地快递投递。' }
        ],
        overlayTag: '本地验货 / 质量把控',
        overlayBody: '广州、杭州、深圳的伙伴实时盯单，确保准时出货。'
      },
      how: {
        title: '流程介绍',
        intro: '四个步骤完成从灵感到收货。每个请求均由双语采购专员亲自跟进。',
        steps: [
          {
            title: '发送商品链接或图片',
            description: '提供任何商品链接或参考图片并备注尺码。我们核实信息并用加元报价。'
          },
          {
            title: '确认报价',
            description: '查看包含运费、税费、服务费的明细，如需调整可随时提出。'
          },
          {
            title: '安全支付',
            description: '使用 Stripe 以加元结算，我们负责向卖家下单并处理物流。'
          },
          {
            title: '追踪配送',
            description: '我们安排加拿大段派送，包裹送到家门口。'
          }
        ]
      },
      reasons: {
        title: '为什么选择我们',
        intro: '结合加拿大本地洞察与中国一线合作伙伴，为个人和商家提供高品质体验。',
        cta: '开始报价',
        cards: [
          { title: '淘宝采购专家', description: '语言、支付、卖家筛选都交给我们。' },
          { title: '价格透明', description: '每份报价列出商品、服务、税费、运费，绝无隐藏费用。' },
          { title: 'Stripe 安全支付', description: '通过 Stripe Checkout 付款，享受银行级安全与买家保障。' },
          { title: '加拿大本地客服', description: '团队坐标加拿大，随时用中英文为您解答。' }
        ]
      },
      testimonialsTitle: '来自加拿大买家的真实反馈',
      closing: {
        title: '准备好下一件淘宝好物了吗？',
        description: '先获取专属加元报价，确认后再付款，无任何强制义务。',
        cta: '开始报价'
      }
    },
    about: {
      heroTag: '关于 BuyFromChina.ca',
      heroTitle: '值得信赖的淘宝/天猫代购团队。',
      heroBody: '我们打通语言、支付、物流的障碍，帮助加拿大买家无压力地获取中国好物。',
      founderHeading: '创始人介绍',
      founderBio: '我是 Amelia，在加拿大生活十余年后创立 BuyFromChina.ca，希望用更简单的方式把中国品牌的创意与品质带给更多人。',
      founderLinkedIn: {
        label: 'LinkedIn 主页',
        href: 'https://www.linkedin.com/in/amelia-wang-a11y/'
      },
      driverTitle: '我们的初心',
      driverBody: '我们相信加拿大买家也应享有与本地消费者同样的选择。我们的使命是消除价格不透明、支付失败、包裹滞留等不确定性。',
      processTitle: '标准化流程',
      processIntro: '数百次交易总结出的清晰步骤，确保每个节点都能及时告知。',
      processSteps: [
        { title: '需求', description: '发送心仪商品的链接或图片，我们核实卖家与库存。' },
        { title: '报价', description: '提供包含商品、物流、关税、服务费的加元报价。' },
        { title: '付款', description: 'Stripe 安全支付后，我们下单并跟踪。' },
        { title: '交付', description: '可信赖的集运伙伴确保包裹准时送达。' }
      ],
      testimonialsTitle: '客户评价',
      testimonialsIntro: '上千位加拿大买家因我们的快速沟通和透明报价而信赖我们。',
      testimonials: [
        {
          quote: '他们帮我买到国内限量设计师单品，沟通迅速，报价与最终账单一致。',
          name: 'Lena W.',
          role: '温哥华'
        },
        {
          quote: '我经营小型买手店，BuyFromChina.ca 帮我做质检、合箱、清关，让我专注顾客。',
          name: 'Darius P.',
          role: '多伦多'
        },
        {
          quote: '这是我最顺利的一次淘宝下单经历：Stripe 付款、主动更新、不到两周收货。',
          name: 'Michelle K.',
          role: '卡尔加里'
        }
      ],
      valuesTitle: '核心价值',
      values: [
        { title: '透明', description: '所有费用以加元注明，拒绝隐藏成本。' },
        { title: '真人服务', description: '中英双语买手直接与卖家沟通。' },
        { title: '可靠物流', description: '经过审核的货代与二次包装，保障安全准时。' },
        { title: '可持续', description: '尽量合箱发货，并优先选择减排承运商。' }
      ],
      missionTitle: '我们的使命',
      missionBody: '通过专业团队 + 自动化工具，让跨境购物像本地买东西一样轻松。',
      missionNote: '我们持续完善报价引擎、订单跟踪、报关文档等工具，让你把时间花在享受收货。',
      ctaTitle: '欢迎联系',
      ctaBody: '想开始下一次代购或需要淘宝攻略？欢迎来聊，我们 12 小时内回复。',
      ctaPrimary: '提交报价',
      ctaSecondary: '联系团队'
    },
    faq: {
      title: '常见问题',
      intro: '关于采购流程、定价、支付和配送时间的全部答案。',
      items: [
        {
          id: 'sourcing',
          question: '你们如何在淘宝/天猫下单？',
          answer: '双语团队直接与卖家确认库存、尺码和细节，并通过安全的国内方式付款，只选择信誉良好的店铺。'
        },
        {
          id: 'pricing',
          question: '报价包含哪些费用？',
          answer: '商品成本（换算加元）、15% 服务费（最低 5 加元）、寄到加拿大的国际运费以及 13% HST。偏远地区可能另加运费。'
        },
        {
          id: 'timeline',
          question: '多久能收到？',
          answer: '付款后一般 10-14 个工作日到货，具体取决于卖家发货速度和加拿大海关。包裹离开中国和清关完成后我们都会发邮件通知。'
        },
        {
          id: 'payment',
          question: '如何付款？',
          answer: '确认报价后跳转到 Stripe Checkout，可用信用卡或 Apple/Google Pay，卡信息不会经过我们的服务器。'
        },
        {
          id: 'returns-policy',
          question: '是否保证品质或接受退换？',
          answer: '我们只是代购，尽力选择口碑好的链接，但无法提供质量保证，也不接受退换货。下单前请仔细查看商品信息。'
        }
      ]
    },
    contactPage: {
      title: '联系团队',
      subtitle: '尺码确认、大额采购或流程疑问，都可以随时咨询我们。'
    },
    contactForm: {
      labels: { name: '姓名', email: '邮箱', message: '留言' },
      placeholders: { name: '张伟', email: 'you@email.com', message: '告诉我们您的需求。' },
      status: {
        success: '谢谢！消息已送达。',
        error: '发生错误，请稍后重试。',
        sending: '发送中…'
      },
      button: { idle: '发送', sending: '发送中…' },
      errors: {
        nameRequired: '请输入姓名。',
        nameMax: '姓名需少于 80 个字符。',
        emailInvalid: '请输入有效邮箱。',
        messageMin: '请至少输入 10 个字符说明需求。',
        messageMax: '留言过长。',
        rateLimited: '发送过于频繁，请稍后再试。',
        fixFields: '请修正标红字段。',
        deliveryFailed: '暂时无法发送消息，请稍后再试或直接联系 support@buyfromchina.ca。'
      }
    },
    quotePage: {
      badge: '把中国好物送到加拿大。',
      title: '提交报价',
      description: '告诉我们淘宝/天猫想买的商品，我们会发加元报价，包含物流、关税、税费和服务费。',
      cards: [
        { title: '全天候采购协助', body: '双语买手联系卖家确认库存，12 小时内回复问题。' },
        { title: '费用全以加元显示', body: '报价覆盖跨境运费、关税、税费和服务费，没有隐藏费用。' }
      ]
    },
    quoteForm: {
      urlsLabel: '商品链接',
      optionalHint: '（可选）',
      addUrl: '添加链接',
      remove: '删除',
      urlsHint: '每个输入框填写一个链接，需要更多可点“添加链接”。',
      recipientName: { label: '收件人姓名', placeholder: '姓名' },
      addressLine1: { label: '街道地址', placeholder: '123 Example Street' },
      addressLine2: { label: '公寓/单元', placeholder: 'Unit 5B' },
      email: { label: '邮箱', placeholder: 'you@email.com' },
      city: { label: '城市', placeholder: 'Toronto' },
      province: { label: '省 / 特区', placeholder: 'ON' },
      postalCode: { label: '加拿大邮编', placeholder: 'M5V 2T6' },
      notes: { label: '备注', placeholder: '尺码、参考图片、候选卖家…' },
      attachments: {
        label: '参考图片',
        add: '添加图片',
        hint: '最多上传 5 张 PNG/JPEG，可点击“添加图片”继续。'
      },
      referencePrice: { label: '加元参考价格（可选）', placeholder: '如 89.99' },
      parcelSize: {
        legend: '预计包裹尺寸',
        small: '小：配饰、轻小件',
        medium: '中：鞋服、电子',
        large: '大：外套、批量'
      },
      termsNotice: '我们会在 12 小时内回复。提交即表示同意',
      submit: { idle: '提交请求', pending: '提交中…' },
      status: {
        successTitle: '我们已收到您的请求。',
        successBody: '团队会审核商品并尽快发送详细报价。',
        successAttachments: '附件数量：{{count}}。我们会参考这些图片算价。',
        submitting: '正在提交报价…',
        generalError: '请修正标红字段。'
      },
      zod: {
        urlsInvalid: '请输入有效链接，每行一个。',
        recipientName: '请输入收件人姓名。',
        addressLine1: '请输入街道地址。',
        city: '请输入城市。',
        province: '请输入省份或地区。',
        email: '请输入有效邮箱。',
        postalCode: '请输入有效的加拿大邮编。',
        notes: '备注最多 1500 个字符。',
        referencePrice: '参考价格需为正数。',
        size: '请选择估算尺寸。'
      },
      server: {
        rateLimited: '请求过于频繁，请稍后再试。',
        attachmentsExceeded: '最多上传 5 张参考图片。',
        attachmentTooLarge: '单张图片需小于 15MB。',
        attachmentType: '仅支持 PNG/JPEG。',
        uploadError: '上传失败，请重试。',
        success: '请求已提交，我们将尽快回复。'
      }
    },
    successPage: {
      noOrder: {
        title: '已收到付款',
        body: '感谢支持！如需发票副本，请联系 support@buyfromchina.ca。',
        back: '返回首页'
      },
      confirmed: {
        title: '付款确认',
        subtitle: '我们会下单并发送物流更新。',
        details: { orderId: '订单号', quoteId: '报价号', paidOn: '支付日期', total: '总计' },
        adminLink: '前往后台',
        homeLink: '返回首页'
      }
    },
    legal: {
      terms: {
        title: '服务条款',
        effectiveLabel: '生效日期',
        effectiveDate: '2024 年 10 月 28 日',
        intro: 'BuyFromChina.ca（“我们”）为加拿大客户提供淘宝/天猫等平台的采购与物流服务。提交报价或付款即表示同意下列条款。',
        sections: [
          {
            heading: '1. 报价与定价',
            body: [
              '报价默认有效期 48 小时，包含商品成本（折算加元）、服务费、国际运费及相关税费。若卖家在付款前调价或变更条款，我们会通知您并征求同意。'
            ]
          },
          {
            heading: '2. 付款',
            body: [
              '所有款项通过 Stripe 处理，我们不保存完整银行卡信息。只有付款成功后才会下单。超出有效期的报价可能被取消或重新计算。'
            ]
          },
          {
            heading: '3. 取消与退款',
            body: [
              '我们是采购代理，不生产或质保商品。付款后订单为最终销售，不接受取消、退货或换货。'
            ]
          },
          {
            heading: '第三方商品及无退货政策',
            body: [
              '我们协助您直接向第三方卖家下单，无法保证产品品质，也不提供退换。下单前请仔细阅读商品信息。',
              '如商品损坏或与描述不符，我们可协助联系卖家，但结果取决于卖家及平台政策。'
            ]
          },
          {
            heading: '4. 海关与关税',
            body: [
              '我们根据卖家及您提供的信息准备清关文件并缴纳关税/税费。海关抽检可能导致不可控延迟。'
            ]
          },
          {
            heading: '5. 责任限制',
            body: [
              '在法律允许范围内，我们的赔偿责任以相关订单已付金额为限，不承担间接损失。'
            ]
          },
          {
            heading: '6. 条款更新',
            body: [
              '我们可能更新条款，重大更改会通过网站或邮箱通知。继续使用即视为接受新条款。'
            ]
          }
        ],
        contact: '如有疑问，请发邮件至 support@buyfromchina.ca。'
      },
      privacy: {
        title: '隐私政策',
        effectiveLabel: '生效日期',
        effectiveDate: '2024 年 10 月 28 日',
        intro: '我们重视您的隐私，本政策说明收集哪些信息以及如何使用。',
        sections: [
          {
            heading: '1. 收集的信息',
            list: [
              '联系方式：姓名、邮箱、收货地址等。',
              '报价信息：商品链接、尺码备注、参考价格。',
              '支付信息：来自 Stripe 的支付确认及订单元数据（不含完整卡号）。',
              '与客服沟通的记录。'
            ]
          },
          {
            heading: '2. 用途',
            intro: '我们使用这些数据以：',
            list: [
              '生成报价并完成采购/物流。',
              '发送报价、付款、物流等通知邮件。',
              '改进服务、防止欺诈并履行法律义务。'
            ]
          },
          {
            heading: '3. 信息共享',
            body: [
              '仅在必要时与可信合作伙伴共享（Stripe、物流、通信工具），绝不出售数据。'
            ]
          },
          {
            heading: '4. 信息保留',
            body: [
              '为提供售后、履行税务/会计义务，我们会保留报价与订单记录。您可申请删除法律不要求保留的部分。'
            ]
          },
          {
            heading: '5. 安全',
            body: [
              '我们采用管理、技术及物理措施（加密、访问控制等）保护数据，但任何系统都无法保证 100% 安全。'
            ]
          },
          {
            heading: '6. 您的选择',
            body: [
              '您可退订营销邮件、索取自己的数据副本或纠正错误信息，方式：support@buyfromchina.ca。'
            ]
          },
          {
            heading: '7. 政策更新',
            body: [
              '如有改动，我们会在此页面更新生效日期，重大变更将另行提示。'
            ]
          }
        ]
      }
    },
    globalError: {
      badge: '出现错误',
      title: '页面加载遇到问题。',
      description: '稍后再试，或返回后台。',
      retry: '重试',
      adminLink: '进入后台'
    },
    notFound: {
      title: '页面不存在',
      description: '请检查链接或返回首页。',
      home: '返回首页',
      admin: '进入后台'
    }
  }
} as const satisfies Record<Locale, Record<string, unknown>>;

export type Messages = (typeof messages)[Locale];
