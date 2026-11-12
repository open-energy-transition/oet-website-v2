import { routes } from './routes'
import type { ImageMetadata } from 'astro'
import type { SvgComponent } from 'astro/types'
import aboutDesktop from '../assets/heroes/about-desktop.webp'
import aboutMobile from '../assets/heroes/about-mobile.webp'
import careerDesktop from '../assets/heroes/career-desktop.webp'
import careerMobile from '../assets/heroes/career-mobile.webp'
import deptEsmDesktop from '../assets/heroes/dept-energy-system-modeling-desktop.webp'
import deptEsmMobile from '../assets/heroes/dept-energy-system-modeling-mobile.webp'
import deptIndexDesktop from '../assets/heroes/dept-index-desktop.webp'
import deptIndexMobile from '../assets/heroes/dept-index-mobile.webp'
import newsDesktop from '../assets/heroes/news-and-events-desktop.webp'
import newsMobile from '../assets/heroes/news-and-events-mobile.webp'
import partnersDesktop from '../assets/heroes/partners-desktop.webp'
import partnersMobile from '../assets/heroes/partners-mobile.webp'
import publicationsDesktop from '../assets/heroes/publications-desktop.webp'
import publicationsMobile from '../assets/heroes/publications-mobile.webp'
import serviceDesktop from '../assets/heroes/service-system-operators-desktop.webp'
import serviceMobile from '../assets/heroes/service-system-operators-mobile.webp'
import servicesDesktop from '../assets/heroes/services-desktop.webp'
import servicesMobile from '../assets/heroes/services-mobile.webp'
import successDesktop from '../assets/heroes/success-stories-desktop.webp'
import successMobile from '../assets/heroes/success-stories-mobile.webp'
import teamDesktop from '../assets/heroes/team-desktop.webp'
import teamMobile from '../assets/heroes/team-mobile.webp'
import theoryDesktop from '../assets/heroes/theory-of-change-desktop.webp'
import theoryMobile from '../assets/heroes/theory-of-change-mobile.webp'
import toolsDesktop from '../assets/heroes/tools-and-data-desktop.webp'
import toolsMobile from '../assets/heroes/tools-and-data-mobile.webp'
import personPhoto from '../assets/shared/person-placeholder.png'
import DigitalId from '../icons/digital-id.svg'
import Employees from '../icons/employees.svg'
import GlobeAlt from '../icons/globe-alt.svg'
import Handshake from '../icons/handshake.svg'
import ModelCubeSpace from '../icons/model-cube-space.svg'
import PeopleGroup from '../icons/people-group.svg'
import SolarSystem from '../icons/solar-system.svg'

type Cell =
  | { kind: 'icon'; icon: SvgComponent; tone: 'brand' | 'light' }
  | { kind: 'count'; value: string; label: string; tone: 'outline' | 'glass' }

type HeroPlacement =
  | { layout: 'photo-centered' | 'centered-dark' }
  | { layout: 'map-bottom-left' | 'listing'; chipsBottomMobile: 30 | 42 | 62 }
  | {
      layout: 'photo-left' | 'map-left' | 'illustration-left'
      textLeft: 80 | 96
      mobileAnchor: 'bottom-30' | 'bottom-50' | 'top-180'
    }

type Hero = {
  id: string
} & HeroPlacement & {
    title: string
    titleSize: 'display-2' | 'display-3'
    titleSizeMobile: 'display-3' | 'display-5'
    eyebrow: { label: string; mobile: boolean } | null
    lead: string[]
    links: { label: string; href: string }[]
    stats: {
      groups: Cell[][]
      action: { href: string; label: string; icon: 'arrow-right' | 'arrow-down' } | null
    } | null
    person: { name: string; role: string; photo: ImageMetadata } | null
    image: { desktop: ImageMetadata; mobile: ImageMetadata }
    background: 'brand-600' | 'brand-700' | 'brand-800' | 'brand-900' | 'neutral-900'
    ornament:
      | 'none'
      | 'left-upper'
      | 'left-middle'
      | 'right-upper'
      | 'right-lower'
      | 'right-bottom'
      | 'photo-both-sides'
      | 'photo-right'
      | 'department-index'
      | 'department'
      | 'department-inverse'
    headerTheme: 'light' | 'dark'
  }

const icon = (component: SvgComponent, tone: 'brand' | 'light'): Cell => ({
  kind: 'icon',
  icon: component,
  tone,
})
const count = (value: string, label: string, tone: 'outline' | 'glass'): Cell => ({
  kind: 'count',
  value,
  label,
  tone,
})

export const heroes: Hero[] = [
  {
    id: 'about',
    layout: 'photo-centered',
    title: 'Committed to Building Solutions For a Sustainable Global Future.',
    titleSize: 'display-2',
    titleSizeMobile: 'display-5',
    eyebrow: null,
    lead: [],
    links: [{ label: 'About Us', href: '#about' }],
    stats: null,
    person: null,
    image: { desktop: aboutDesktop, mobile: aboutMobile },
    background: 'brand-700',
    ornament: 'none',
    headerTheme: 'dark',
  },
  {
    id: 'theory-of-change',
    layout: 'centered-dark',
    title: 'Our Theory of Change:\nDriving Global Impact',
    titleSize: 'display-2',
    titleSizeMobile: 'display-5',
    eyebrow: null,
    lead: [
      'At Open Energy Transition (OET), we transform global energy planning by promoting the use of open-source models and data.',
      'Our focus is on creating a global impact through promoting transparency, flexibility, accessibility, and collaboration in energy planning.',
    ],
    links: [{ label: 'Read Our Theory of Change', href: '#theory' }],
    stats: null,
    person: null,
    image: { desktop: theoryDesktop, mobile: theoryMobile },
    background: 'neutral-900',
    ornament: 'none',
    headerTheme: 'light',
  },
  {
    id: 'services',
    layout: 'map-bottom-left',
    chipsBottomMobile: 42,
    title: 'Make open-source energy planning work for your organisation',
    titleSize: 'display-2',
    titleSizeMobile: 'display-3',
    eyebrow: null,
    lead: [],
    links: [{ label: 'Services', href: '#services' }],
    stats: null,
    person: null,
    image: { desktop: servicesDesktop, mobile: servicesMobile },
    background: 'brand-700',
    ornament: 'left-middle',
    headerTheme: 'light',
  },
  {
    id: 'success-stories',
    layout: 'listing',
    chipsBottomMobile: 62,
    title: 'Driving The Energy Transition With Open-Source & Open Data',
    titleSize: 'display-2',
    titleSizeMobile: 'display-5',
    eyebrow: null,
    lead: [],
    links: [{ label: 'Success Stories', href: '#success-stories' }],
    stats: null,
    person: null,
    image: { desktop: successDesktop, mobile: successMobile },
    background: 'brand-700',
    ornament: 'left-upper',
    headerTheme: 'light',
  },
  {
    id: 'publications',
    layout: 'listing',
    chipsBottomMobile: 62,
    title: 'Explore Our Publication from Academic Works to Thought Leadership.',
    titleSize: 'display-2',
    titleSizeMobile: 'display-5',
    eyebrow: null,
    lead: [],
    links: [
      { label: 'Academic Publications', href: '#academic' },
      { label: 'Blogs', href: '#blogs' },
      { label: 'Policy Briefs', href: '#policy-briefs' },
      { label: 'Reports', href: '#reports' },
    ],
    stats: null,
    person: null,
    image: { desktop: publicationsDesktop, mobile: publicationsMobile },
    background: 'brand-900',
    ornament: 'right-upper',
    headerTheme: 'light',
  },
  {
    id: 'tools-and-data',
    layout: 'listing',
    chipsBottomMobile: 30,
    title: 'Range of Open Models, Open-Source Software, and Open Data.',
    titleSize: 'display-2',
    titleSizeMobile: 'display-5',
    eyebrow: { label: 'Tools & Data', mobile: false },
    lead: [],
    links: [{ label: 'Tools & Data', href: '#tools' }],
    stats: null,
    person: null,
    image: { desktop: toolsDesktop, mobile: toolsMobile },
    background: 'brand-700',
    ornament: 'right-lower',
    headerTheme: 'light',
  },
  {
    id: 'news-and-events',
    layout: 'listing',
    chipsBottomMobile: 30,
    title: 'News and Events from Community Meetups to Industry Forums',
    titleSize: 'display-2',
    titleSizeMobile: 'display-3',
    eyebrow: null,
    lead: [],
    links: [{ label: 'News & Events', href: '#news' }],
    stats: null,
    person: null,
    image: { desktop: newsDesktop, mobile: newsMobile },
    background: 'brand-900',
    ornament: 'right-bottom',
    headerTheme: 'light',
  },
  {
    id: 'team',
    layout: 'photo-left',
    textLeft: 96,
    mobileAnchor: 'bottom-30',
    title: 'Built on a Culture of Transparency, Collaboration, & Trust.',
    titleSize: 'display-2',
    titleSizeMobile: 'display-5',
    eyebrow: null,
    lead: [
      'Registered in Germany, since our founding in 2023, we have grown to a team of over 50 experts working remotely across multiple continents. We are led by award-winning energy modelers who are shaping the future of global energy planning.',
    ],
    links: [],
    stats: {
      groups: [
        [icon(GlobeAlt, 'brand'), count('9', 'Continents', 'outline')],
        [icon(Employees, 'light'), count('50+', 'Experts', 'outline')],
        [icon(ModelCubeSpace, 'light'), count('8', 'Department', 'outline')],
      ],
      action: null,
    },
    person: null,
    image: { desktop: teamDesktop, mobile: teamMobile },
    background: 'brand-600',
    ornament: 'photo-both-sides',
    headerTheme: 'light',
  },
  {
    id: 'partners',
    layout: 'photo-left',
    textLeft: 80,
    mobileAnchor: 'bottom-30',
    title:
      'Partnerships and Funding Powers OET’s Vision to Lasting Change for Communities Worldwide.',
    titleSize: 'display-3',
    titleSizeMobile: 'display-5',
    eyebrow: null,
    lead: [],
    links: [],
    stats: {
      groups: [
        [icon(GlobeAlt, 'brand'), count('9', 'Country', 'outline')],
        [icon(Employees, 'light'), count('99', 'Partners', 'outline')],
        [icon(Handshake, 'light'), count('999', 'Funders', 'outline')],
      ],
      action: null,
    },
    person: null,
    image: { desktop: partnersDesktop, mobile: partnersMobile },
    background: 'brand-600',
    ornament: 'none',
    headerTheme: 'light',
  },
  {
    id: 'career',
    layout: 'photo-left',
    textLeft: 96,
    mobileAnchor: 'bottom-30',
    title: 'Work\nWith Us',
    titleSize: 'display-2',
    titleSizeMobile: 'display-3',
    eyebrow: null,
    lead: [
      'Our culture is one founded on the principles of autonomy, trust, growth, and transparency. These values are embodied by all OETers, across our Departments, and all of our teams.',
      'Join OET and work alongside a global community creating open, transparent solutions for a faster and more equitable energy transition.',
    ],
    links: [],
    stats: {
      groups: [[icon(DigitalId, 'light'), count('3', 'Open Roles', 'outline')]],
      action: { href: '#open-roles', label: 'Explore Opportunities', icon: 'arrow-down' },
    },
    person: null,
    image: { desktop: careerDesktop, mobile: careerMobile },
    background: 'brand-600',
    ornament: 'photo-right',
    headerTheme: 'light',
  },
  {
    id: 'department-index',
    layout: 'map-left',
    textLeft: 80,
    mobileAnchor: 'bottom-30',
    title: 'The Departments\nof OET',
    titleSize: 'display-2',
    titleSizeMobile: 'display-3',
    eyebrow: null,
    lead: [
      'Meet the teams behind OET—bringing together diverse expertise to advance open, collaborative solutions for the energy transition.',
    ],
    links: [],
    stats: {
      groups: [
        [icon(SolarSystem, 'brand'), icon(PeopleGroup, 'light'), count('7', 'Department', 'glass')],
      ],
      action: { href: routes.team, label: 'Meet The Team', icon: 'arrow-right' },
    },
    person: null,
    image: { desktop: deptIndexDesktop, mobile: deptIndexMobile },
    background: 'brand-700',
    ornament: 'department-index',
    headerTheme: 'light',
  },
  {
    id: 'department-detail',
    layout: 'map-left',
    textLeft: 80,
    mobileAnchor: 'bottom-30',
    title: 'Energy System Modeling',
    titleSize: 'display-2',
    titleSizeMobile: 'display-3',
    eyebrow: null,
    lead: [
      'The Energy System Modelling Department develops, applies, and advances integrated open-source energy and grid planning models for real-world decision-making. We build transparent, reproducible modelling workflows that enable governments, regulators, TSOs, researchers, and civil society to explore, benchmark, or scrutinize future energy systems and long-term transition pathways.',
    ],
    links: [],
    stats: {
      groups: [
        [icon(SolarSystem, 'brand'), icon(PeopleGroup, 'light'), count('12', 'People', 'glass')],
      ],
      action: { href: routes.team, label: 'Meet The Team', icon: 'arrow-right' },
    },
    person: {
      name: 'Dr. Martha Maria Frysztacki',
      role: 'Head of Energy System Modeling, Co-Founder',
      photo: personPhoto,
    },
    image: { desktop: deptEsmDesktop, mobile: deptEsmMobile },
    background: 'brand-600',
    ornament: 'department',
    headerTheme: 'light',
  },
  {
    id: 'service-detail',
    layout: 'illustration-left',
    textLeft: 80,
    mobileAnchor: 'bottom-30',
    title: 'System Operators\nand Utilities',
    titleSize: 'display-3',
    titleSizeMobile: 'display-3',
    eyebrow: { label: 'Services', mobile: true },
    lead: [
      'Open Energy Transition helps system operators and utilities assess, adopt and operate open-source planning tools with confidence.',
    ],
    links: [],
    stats: { groups: [[icon(PeopleGroup, 'brand')]], action: null },
    person: null,
    image: { desktop: serviceDesktop, mobile: serviceMobile },
    background: 'brand-700',
    ornament: 'none',
    headerTheme: 'light',
  },
]

export const ctaBanners = [
  {
    tone: 'brand-600' as const,
    heading: 'Discuss a Technology Modelling Need',
    lead: null,
    text: 'If you are interested in collaborating with us on energy transition studies, open-source platforms, and training and support, please contact us.',
    actions: [
      { label: 'Contact Us', href: '#contact', emphasis: 'primary' as const, newTab: false },
      { label: 'Request a Demo', href: '#demo', emphasis: 'secondary' as const, newTab: false },
    ],
    collage: 'thermalpower' as const,
    breakout: true,
  },
  {
    tone: 'brand-600' as const,
    heading: 'Book OET\nfor Support Sessions',
    lead: 'Connect directly with the OET team for practical guidance, technical support, and expert insight.',
    text: 'Whether you’re exploring our tools, working through a challenge, or looking for ways to contribute, book a session tailored to your needs.',
    actions: [
      { label: 'Sign Up for a Call', href: '#call', emphasis: 'primary' as const, newTab: false },
      { label: 'Request a Demo', href: '#demo', emphasis: 'secondary' as const, newTab: false },
    ],
    collage: 'wind' as const,
    breakout: true,
  },
  {
    tone: 'light' as const,
    heading: 'Monthly Updates\nOpen Call',
    lead: 'Open call for the latest OET updates, project insights, and opportunities to connect and contribute.',
    text: 'A recurring monthly event where you can hear the latest from OET, connect with the community, and join the conversation.',
    actions: [
      {
        label: 'New Updates Every 7th of The Month',
        href: '#updates',
        emphasis: 'secondary' as const,
        newTab: false,
      },
    ],
    collage: 'thermalpower' as const,
    breakout: false,
  },
  {
    tone: 'brand-600' as const,
    heading: 'Discuss a Technology Modelling Need',
    lead: null,
    text: 'Talk to our team about a technology, dataset or repeatable analytical tool that should be represented transparently in energy system planning.',
    actions: [
      { label: 'Contact Us', href: '#contact', emphasis: 'primary' as const, newTab: false },
      { label: 'Request a Demo', href: '#demo', emphasis: 'secondary' as const, newTab: false },
    ],
    collage: 'biz' as const,
    breakout: true,
  },
]

export const sectionHeadings = [
  {
    layout: 'stack' as const,
    tag: 'Services',
    title: 'Make open-source energy planning\nwork for your organization',
    level: 'h2' as const,
    gap: 10 as const,
    width: 'full' as const,
    titleTone: 'neutral-900' as const,
    linkTone: 'brand' as const,
    align: 'center' as const,
    subline: null,
    columns: [],
    columnStyle: 'body-lg' as const,
    actions: [],
  },
  {
    layout: 'split' as const,
    tag: 'Tools Support',
    title: 'OET Supports\na Broad Range\nof Modeling Platforms',
    level: 'h2' as const,
    gap: 10 as const,
    width: 'full' as const,
    titleTone: 'neutral-900' as const,
    linkTone: 'brand' as const,
    align: 'center' as const,
    subline: null,
    columns: [
      'We support a broad range of modeling platforms to meet diverse needs and also build secure, open-source applications that integrate proprietary data, ensuring accessibility, privacy, and local self-maintenance without requiring public sharing.',
      'These include Python for Power System Analysis (PyPSA), the PyPSA-based European and global sector-coupled energy systems models PyPSA-Eur and PyPSA-Earth',
    ],
    columnStyle: 'body-md-medium' as const,
    actions: [
      {
        label: 'See All Tools',
        href: routes.toolsAndData,
        variant: 'primary' as const,
        size: 'xs' as const,
        arrow: true,
      },
    ],
  },
  {
    layout: 'stack' as const,
    tag: 'Team',
    title: 'A Fully remote team of 50+ people across 21 countries',
    level: 'h2' as const,
    gap: 8 as const,
    width: 'narrow' as const,
    titleTone: 'neutral-900' as const,
    linkTone: 'brand' as const,
    align: 'center' as const,
    subline:
      'Our team includes award-winning researchers and experienced energy modelers, united by a culture of transparency and collaboration.',
    columns: [],
    columnStyle: 'body-lg' as const,
    actions: [
      {
        label: 'Work With Us',
        href: routes.career,
        variant: 'primary' as const,
        size: 'sm-tall' as const,
        arrow: true,
      },
      {
        label: 'Explore Departments',
        href: routes.departments,
        variant: 'secondary' as const,
        size: 'sm-tall' as const,
        arrow: false,
      },
    ],
  },
  {
    layout: 'stack' as const,
    tag: 'Open Roles',
    title: 'Currently Open Roles',
    level: 'h2' as const,
    gap: 8 as const,
    width: 'narrow' as const,
    titleTone: 'neutral-900' as const,
    linkTone: 'brand' as const,
    align: 'center' as const,
    subline: null,
    columns: [
      'If you have any issues with or questions to your application, you are welcome to reach out to our team at: <a href="mailto:careers@openenergytransition.org">careers@openenergytransition.org</a>.',
      'All roles are fully-remote. If any travel is required, the job spec will state this. In brackets are the fixed location of hire, as well as any mandatory language fluency requirements.',
      'Please only apply for roles where you fulfil these aspects. We&#39;re excited to review your application!',
    ],
    columnStyle: 'body-lg' as const,
    actions: [],
  },
  {
    layout: 'split' as const,
    tag: 'For Sectors and Industries',
    title:
      'Open-source energy models are capable of supporting complex, high-stakes planning decisions.',
    level: 'h2' as const,
    gap: 12 as const,
    width: 'full' as const,
    titleTone: 'neutral-900' as const,
    linkTone: 'brand' as const,
    align: 'center' as const,
    subline: null,
    columns: [
      'Open Energy Transition strengthens the shared open-source planning stack and helps expert institutions put it into use.',
      'We build missing infrastructure, operationalize it in real planning workflows and enable institutions and partners to sustain it over time.',
    ],
    columnStyle: 'body-md' as const,
    actions: [],
  },
]

const option = (label: string, active: boolean) => ({ label, href: '#', active })

export const statusTabs = [option('Completed', true), option('In Progress', false)]
export const eventStateTabs = [
  option('All Events', true),
  option('Highlighted Events', false),
  option('Upcoming Events', false),
]
export const eventTypeTabs = [
  option('Show All', true),
  option('Webinars', false),
  option('Events', false),
  option('Support Meetups', false),
  option('Open Calls', false),
]
export const toolTabs = [
  option('Show All', true),
  option('Tools', false),
  option('Model', false),
  option('Data', false),
  option('Open Source Solvers', false),
  option('Community', false),
]
export const teamTabs = [
  option('Show All', true),
  option('Senior Leadership', false),
  option('Finance', false),
  option('People & Culture', false),
  option('Software Engineering', false),
  option('Modelling Tools & Data', false),
  option('Energy System Modeling', false),
  option('Grid Data', false),
  option('Research & Market Development', false),
]

const choices = (all: string, values: string[]) => [
  { value: 'all', label: all },
  ...values.map((value) => ({ value: value.toLowerCase().replaceAll(' ', '-'), label: value })),
]

export const filters = [
  {
    id: 'filter-region',
    facet: 'region',
    label: 'Region',
    selected: 'all',
    options: choices('All Region', [
      'Africa',
      'Asia',
      'Australia/Oceania',
      'Europe',
      'North America',
    ]),
  },
  {
    id: 'filter-service',
    facet: 'service',
    label: 'Services',
    selected: 'all',
    options: choices('All Services', [
      'Open-source migration',
      'Software Development',
      'Train and support',
    ]),
  },
  {
    id: 'filter-product',
    facet: 'product',
    label: 'Products',
    selected: 'all',
    options: choices('All Products', ['PyPSA', 'Openmod-tracker', 'Detect-Infra']),
  },
  {
    id: 'filter-tag',
    facet: 'tag',
    label: 'Tags',
    selected: 'all',
    options: choices('All Tags', ['SoftwareDevelopment', 'Hydrogen', 'Training']),
  },
]

export const sort = {
  id: 'sort',
  label: 'Sort By',
  prefix: 'Sort By',
  selected: 'a-z',
  options: [
    { value: 'a-z', label: 'A to Z' },
    { value: 'z-a', label: 'Z to A' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
  ],
}

export const richTextProject = `<h2>Develops an open, PyPSA-Earth-based model<br>for Australia</h2>
<p>Australia is heavily reliant on imported fuel while, at the same time, having an abundance of solar and wind resources. This creates significant potential for producing and using e-fuels such as e-methanol and e-ammonia as replacements for traditional gas oil and ammonia-based fertilizers, respectively.</p>
<p>When produced using clean hydrogen and electricity, both are net-zero in terms of carbon emissions as the CO₂ released during use is captured during production. Investment in local production of synthetic fuel is a way to hedge against the risks of international price volatility, increasing the economic value of fuels by creating local jobs.</p>
<p>This project develops an open, PyPSA-Earth-based model for Australia. Its easy-to-use app provides a graphic user interface to change the required model inputs, and enables users to explore the economic benefits of switching to e-fuels such as e-ammonia and e-methanol in case of oil import price shocks.</p>
<h3>Project Aims</h3>
<p>Support communication with the Government of Australia to identify potential policy issues from a security of supply perspective especially for eFuels covering green Ammonia and green Methanol</p>
<p>Use PyPSA-Earth to model the eFuel demand of Australia. Within this project, eFuel reflects Ammonia (for use within fertilizers production) and Methanol (for use within diesel replacement).</p>
<p>Prepare a simple Streamlit interface for direct interaction with the model (e.g., capex assumptions, e-fuel share of production)</p>`

export const richTextPublication = (
  imageSrc: string,
) => `<h2>Develops an open, PyPSA-Earth-based model<br>for Australia</h2>
<p>I was positively surprised by what the model could do. The European Insulation Manufacturers Association <a href="#eurima">(Eurima)</a> commissioned a study together with the <a href="#ica">International Copper Association</a> and the <a href="#ecf">European Climate Foundation</a> in 2023, titled <a href="#campaign">"Your Home, Our Future"</a>.</p>
<h3>Awareness and Behaviour Change</h3>
<p>"We are going for a paradigm shift," said the team behind the <a href="#campaign">Your Home, Our Future</a> campaign. They combined:</p>
<ul><li>Policy recommendations in the Light Report</li><li>Stakeholder workshops across the EU</li><li>Events presenting the findings</li></ul>
<blockquote>Open models let every stakeholder check the numbers for themselves.</blockquote>
<img src="${imageSrc}" alt="Panel discussion at a community event" width="1374" height="1396" loading="lazy">`

export const authors = [1, 2, 3].map(() => ({
  name: 'Dr. Martha Maria Frysztacki Name Here 2 Line Max',
  title: 'Title in OET/Company Here 1 Line Maximum Lorem ipsum dolor',
  photo: personPhoto,
  role: null,
  links: [],
}))

export const contact = {
  name: 'Dr. Markus Groissbock',
  title: 'Project Director & Senior Energy System Modeler | Power-to-X (Team Lead)',
  photo: personPhoto,
  role: 'Project Lead',
  links: [
    { kind: 'email' as const, href: '#email', label: 'Email: Dr. Markus Groissbock' },
    { kind: 'github' as const, href: '#github', label: 'GitHub: Dr. Markus Groissbock' },
    { kind: 'linkedin' as const, href: '#linkedin', label: 'LinkedIn: Dr. Markus Groissbock' },
  ],
}

const link = (label: string, disabled = false) => ({
  label: [{ text: label, underline: true }],
  truncate: false,
  href: '#',
  disabled,
  newTab: true,
})

export const projectLinkGroups = [
  {
    title: 'Tools',
    links: [link('Openmod-tracker'), link('Power Net Zero'), link('Open Energy Benchmark')],
  },
  { title: 'Data', links: [link('Dataset A', true), link('Dataset B')] },
  { title: 'Links', links: [link('Repository'), link('Interact With The Model (Streamlit)')] },
]

export const publicationLinkGroups = [
  { title: 'Resources', links: [link('Case Study PDF'), link('Slides')] },
  {
    title: 'Links',
    links: [
      link('The Your Home, Our Future Campaign'),
      link('The results of the study'),
      link('Model is publicly available on GitHub'),
      link('Project description on our website'),
    ],
  },
  {
    title: 'Journal & DOI',
    links: [
      link('IEEE Power and Energy Magazine, Volume: 24 Issue: 2, pages 100 - 115'),
      link('DOI: https://doi.org/10.1109/MPE.2025.3562145'),
    ],
  },
]

export const stripStats = [
  { value: '35', label: 'Projects', icon: SolarSystem },
  { value: '25', label: 'Partners', icon: Handshake },
  { value: '50+', label: 'Team Members', icon: PeopleGroup },
]

export const gridStats = [
  { value: '3', label: 'Policy Recommendations\nin the Light Report', icon: GlobeAlt },
  {
    value: '40+',
    label: 'Meetings Across the EU Energy and Construction Sectors',
    icon: Employees,
  },
  { value: '5', label: 'Stakeholder Workshops', icon: ModelCubeSpace },
  { value: '6', label: 'Events Presenting the Findings', icon: DigitalId },
]

export const richTextImage = newsDesktop
