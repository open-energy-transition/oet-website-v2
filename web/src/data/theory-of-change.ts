import type { Locale } from '../i18n/config'
import { findGlobal, required, texts, type GlobalDoc } from '../lib/cms'
import { image, optionalImage } from '../lib/media'

export type OutcomeIcon = 'medical-star' | 'employees' | 'referral-alt' | 'book-open-reader'
export type OutcomeTone = 'brand-400' | 'brand-500' | 'brand-800' | 'brand-900'
export type GlobeIcon =
  'code-merge' | 'code-fork' | 'people-group' | 'link-horizontal' | 'box-connection' | 'tools'

export interface SceneCaption {
  label: string
  statement: string
  emphasis: string | null
  details: [string, string]
}

type Caption = GlobalDoc<'theory-of-change-page'>['scene']['challenge']

const sceneId = 'theory'

const toCaption = (caption: Caption, what: string): SceneCaption => {
  const details = texts(caption.details, `${what} details`)
  if (details.length !== 2) throw new Error(`${what} needs exactly two detail lines`)
  return {
    label: caption.label,
    statement: caption.statement,
    emphasis: caption.emphasis === undefined ? null : caption.emphasis,
    details: [details[0], details[1]],
  }
}

export const loadTheoryPage = async (locale: Locale) => {
  const page = await findGlobal('theory-of-change-page', locale, 1)
  return {
    meta: page.meta,
    hero: {
      title: page.hero.title,
      lead: texts(page.hero.lead, 'theory of change hero lead'),
      links: required(page.hero.links, 'theory of change hero links').map(({ label, href }) => ({
        label,
        href,
      })),
      image: {
        desktop: image(page.hero.image.desktop, 'theory of change hero image desktop'),
        mobile: image(page.hero.image.mobile, 'theory of change hero image mobile'),
      },
    },
    scene: {
      id: sceneId,
      challenge: toCaption(page.scene.challenge, 'theory of change challenge'),
      goal: toCaption(page.scene.goal, 'theory of change goal'),
      values: texts(page.scene.values, 'theory of change values'),
    },
    approach: {
      mobileTag: page.approach.mobileTag,
      title: page.approach.title,
      subline: page.approach.subline,
      steps: required(page.approach.steps, 'theory of change approach steps').map(
        (step, index) => ({
          number: String(index + 1).padStart(2, '0'),
          title: step.title,
          text: step.text,
          image: optionalImage(step.image, `theory of change approach step ${index + 1} image`),
        }),
      ),
    },
    outcomes: {
      title: page.outcomes.title,
      columns: required(page.outcomes.columns, 'theory of change outcome columns').map(
        ({ output, description, outcome, icon, tone }) => ({
          output,
          description,
          outcome,
          icon,
          tone,
        }),
      ),
    },
    impact: page.impact,
    globe: {
      view: { lon: page.globe.view.longitude, lat: page.globe.view.latitude },
      pins: required(page.globe.pins, 'theory of change globe pins').map((pin) => ({
        icon: pin.icon,
        lon: pin.longitude,
        lat: pin.latitude,
        scale: pin.scale,
      })),
    },
  }
}
