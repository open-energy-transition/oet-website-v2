import type { CollectionConfig, GlobalConfig } from 'payload'

import { AboutPage } from './AboutPage'
import { CareerPage } from './CareerPage'
import { Countries } from './Countries'
import { Departments } from './Departments'
import { DepartmentsPage } from './DepartmentsPage'
import { Jobs } from './Jobs'
import { Partners } from './Partners'
import { PartnersPage } from './PartnersPage'
import { TeamMembers } from './TeamMembers'
import { TeamPage } from './TeamPage'
import { TheoryOfChangePage } from './TheoryOfChangePage'

export const collections: CollectionConfig[] = [TeamMembers, Departments, Countries, Partners, Jobs]

export const globals: GlobalConfig[] = [
  AboutPage,
  DepartmentsPage,
  TeamPage,
  PartnersPage,
  CareerPage,
  TheoryOfChangePage,
]
