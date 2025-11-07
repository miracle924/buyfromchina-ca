export const locales = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'zh', label: '中文' }
] as const;

export type Locale = (typeof locales)[number]['code'];

export const defaultLocale: Locale = 'en';

type HomeContent = {
  badge: string;
  headline: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  statChip: string;
  statDescription: string;
  bannerTag: string;
  bannerTitle: string;
  about: {
    title: string;
    body: string;
    stats: { label: string; description: string }[];
    overlayTag: string;
    overlayBody: string;
  };
  how: {
    title: string;
    intro: string;
    steps: { title: string; description: string }[];
  };
  reasons: {
    title: string;
    intro: string;
    cta: string;
    cards: { title: string; description: string }[];
  };
  testimonialsTitle: string;
  closing: {
    title: string;
    description: string;
    cta: string;
  };
};

type Messages = {
  languageSwitcher: { label: string };
  nav: { quote: string; about: string; faq: string; contact: string };
  footer: { copy: string; terms: string; privacy: string; support: string; admin: string };
  home: HomeContent;
};

export const messages: Record<Locale, Messages> = {
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
    home: {
      badge: 'Le meilleur de la Chine livré au Canada.',
      headline: 'De Taobao jusqu’à votre porte.',
      description:
        'BuyFromChina.ca est la façon la plus simple pour les Canadiens d’acheter sur Taobao et Tmall. Nous vérifions les annonces, convertissons les prix en CAD et gérons l’achat, la douane et la livraison.',
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
          'Nous sommes un service canadien spécialisé dans l’accès aux plus grands marchés chinois. Notre équipe bilingue vérifie les vendeurs, consolide la logistique et assure une expérience fluide de bout en bout. Petites commandes ou projets complets, chaque demande reçoit la même attention.',
        stats: [
          {
            label: '10-14 jours ouvrables',
            description: 'Délai moyen du centre de consolidation de Qingdao jusqu’à votre adresse canadienne.'
          },
          {
            label: '100 % en dollars CA',
            description: 'Les devis incluent conversion, droits, taxes et livraison locale.'
          }
        ],
        overlayTag: 'Contrôles de qualité sur place',
        overlayBody: 'Des partenaires à Guangzhou, Hangzhou et Shenzhen suivent vos commandes en temps réel.'
      },
      how: {
        title: 'Notre processus',
        intro:
          'Quatre étapes claires, de l’inspiration à la livraison. Chaque demande est gérée par nos spécialistes bilingues.',
        steps: [
          {
            title: 'Envoyez les liens ou images produit',
            description:
              'Partagez toute URL produit ou photo d’inspiration avec les tailles souhaitées. Nous validons l’annonce et calculons tout en dollars CA.'
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
            description: 'Stripe Checkout assure une sécurité de niveau bancaire et une protection acheteur.'
          },
          {
            title: 'Support canadien réactif',
            description: 'Notre équipe basée au Canada répond rapidement par courriel à toutes vos questions.'
          }
        ]
      },
      testimonialsTitle: 'Ce que disent les importateurs canadiens',
      closing: {
        title: 'Prêt à importer votre prochaine trouvaille Taobao ?',
        description: 'Recevez un devis personnalisé en dollars CA. Vous ne payez rien tant que vous n’approuvez pas.',
        cta: 'Commencer un devis'
      }
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
    home: {
      badge: '把中国好物送到加拿大。',
      headline: '从淘宝直达你家门口。',
      description:
        'BuyFromChina.ca 让加拿大买家轻松逛淘宝、天猫。我们负责核实商品、换算加元，并处理下单、清关与配送。',
      primaryCta: '提交报价请求',
      secondaryCta: '了解流程',
      statChip: '12h',
      statDescription: '12 小时内提供报价，可代拍样品并支持合箱发货。海关流程由淘宝直邮渠道处理。',
      bannerTag: '真实代购',
      bannerTitle: '精选淘宝好物，用心寄到加拿大。',
      about: {
        title: '关于 BuyFromChina.ca',
        body:
          '我们是加拿大本地的采购团队，帮助买家触达中国最大电商平台。双语买手负责核实卖家、整合物流，提供顺畅的一站式体验。无论是一双球鞋还是整套工作室设备，我们都悉心处理。',
        stats: [
          {
            label: '10-14 个工作日',
            description: '从青岛集运仓到加拿大地址的典型时效。'
          },
          {
            label: '价格全部以加元显示',
            description: '报价包含汇率、关税、税费以及本地快递投递。'
          }
        ],
        overlayTag: '本地验货 / 质量把控',
        overlayBody: '广州、杭州、深圳的合作伙伴实时跟进，确保准时出货。'
      },
      how: {
        title: '流程介绍',
        intro: '四个步骤完成从灵感到收货。每一单都由双语采购专员亲自跟进。',
        steps: [
          {
            title: '发送商品链接或图片',
            description: '提供任何商品链接或参考图片并备注尺码。我们核实信息并用加元报价。'
          },
          {
            title: '确认报价',
            description: '查看包含运费、税费、服务费的明细。如需调整可随时提出。'
          },
          {
            title: '安全支付',
            description: '使用 Stripe 以加元结算，我们负责向卖家下单并处理物流。'
          },
          {
            title: '追踪运送进度',
            description: '我们安排加拿大段派送，包裹直接送到你家门口。'
          }
        ]
      },
      reasons: {
        title: '选择我们的理由',
        intro: '结合本地洞察与中国一线合作伙伴，为加拿大买家与商家提供高级别体验。',
        cta: '开始报价',
        cards: [
          {
            title: '淘宝采购专家',
            description: '帮你解决语言、支付、卖家审核等难题。'
          },
          {
            title: '价格透明',
            description: '每份报价都会列出商品、服务、税费与运费，绝无隐藏费用。'
          },
          {
            title: 'Stripe 安全支付',
            description: '通过 Stripe Checkout 付款，享受银行级安全与买家保障。'
          },
          {
            title: '加拿大本地客服',
            description: '团队坐标加拿大，随时用中文或英文为你解答。'
          }
        ]
      },
      testimonialsTitle: '来自加拿大买家的真实反馈',
      closing: {
        title: '准备好下一个淘宝好物了吗？',
        description: '获取专属加元报价，确认后才需要付款，无任何强制义务。',
        cta: '开始报价'
      }
    }
  }
};
