import type { Locale } from '../i18n/config'
import { findGlobal, required, texts, type GlobalDoc } from '../lib/cms'
import { links, loadServiceLinks, serviceLinksByColumn } from './navigation'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export type SocialKind = NonNullable<GlobalDoc<'site-settings'>['socialLinks']>[number]['kind']

export interface FooterSocial {
  kind: SocialKind
  label: string
  href: string
}

export interface FooterCtaContent {
  headline: string[]
  email: FooterLink
  action: FooterLink
}

export interface FooterContent {
  cta: FooterCtaContent
  blurb: string
  socials: FooterSocial[]
  copyright: string
  legal: FooterLink[]
  consentLabel: string
  consentLabelCompact: string
  columns: FooterColumn[]
}

export const loadFooter = async (locale: Locale): Promise<FooterContent> => {
  const [footer, settings, services] = await Promise.all([
    findGlobal('site-footer', locale, 0),
    findGlobal('site-settings', locale, 0),
    loadServiceLinks(locale),
  ])

  const serviceLinks = serviceLinksByColumn(services).map(({ label, href }) => ({ label, href }))

  return {
    cta: {
      headline: texts(footer.cta.headline, 'site-footer headline'),
      email: { label: settings.contactEmail, href: `mailto:${settings.contactEmail}` },
      action: { label: footer.cta.action.label, href: footer.cta.action.href },
    },
    blurb: footer.blurb,
    socials: required(settings.socialLinks, 'site social links').map(({ kind, label, url }) => ({
      kind,
      label,
      href: url,
    })),
    copyright: footer.copyright,
    legal: links(footer.legal, 'site-footer legal links'),
    consentLabel: footer.consentLabel,
    consentLabelCompact: footer.consentLabelCompact,
    columns: footer.columns.map((column) => ({
      title: column.title,
      links:
        column.blockType === 'servicesColumn'
          ? serviceLinks
          : links(column.links, `site-footer column "${column.title}" links`),
    })),
  }
}
