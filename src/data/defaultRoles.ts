import { Role } from '@/types/roles';

const roleColors = [
  'hsl(168, 45%, 32%)',   // Teal
  'hsl(15, 65%, 55%)',    // Terracotta
  'hsl(145, 35%, 45%)',   // Sage
  'hsl(35, 50%, 55%)',    // Sand
  'hsl(200, 45%, 45%)',   // Blue
  'hsl(280, 40%, 50%)',   // Purple
  'hsl(45, 60%, 50%)',    // Gold
  'hsl(0, 55%, 50%)',     // Red
  'hsl(180, 40%, 40%)',   // Cyan
  'hsl(320, 45%, 50%)',   // Pink
  'hsl(90, 40%, 45%)',    // Green
  'hsl(25, 55%, 50%)',    // Orange
  'hsl(220, 50%, 50%)',   // Indigo
  'hsl(60, 50%, 45%)',    // Lime
  'hsl(340, 50%, 50%)',   // Rose
];

export const defaultRoles: Role[] = [
  {
    id: '1',
    name: 'To Hack Structure',
    essence: 'Fast optimization',
    method: 'Structure Hacking',
    companyType: 'Process studio',
    weight: 0,
    color: roleColors[0],
  },
  {
    id: '2',
    name: 'To Secure Clarity',
    essence: 'Risk insight',
    method: 'Clarity & Security',
    companyType: 'Risk consulting',
    weight: 0,
    color: roleColors[1],
  },
  {
    id: '3',
    name: 'To Enable Clarity',
    essence: 'Planning',
    method: 'Clarity Enablement',
    companyType: 'Planning agency',
    weight: 0,
    color: roleColors[2],
  },
  {
    id: '4',
    name: 'To Simplify Intelligence',
    essence: 'Make complexity simple',
    method: 'Simplicity Intelligence',
    companyType: 'Simplicity studio',
    weight: 0,
    color: roleColors[3],
  },
  {
    id: '5',
    name: 'To Hold Space for Truth',
    essence: 'Emotional depth',
    method: 'Heart-Clarity',
    companyType: 'Emotional clarity studio',
    weight: 0,
    color: roleColors[4],
  },
  {
    id: '6',
    name: 'To Create Strategic Vision',
    essence: 'Big-picture patterns',
    method: 'Strategic Vision',
    companyType: 'Vision consulting',
    weight: 0,
    color: roleColors[5],
  },
  {
    id: '7',
    name: 'To Create Stable Support',
    essence: 'Calm support',
    method: 'Stable Support',
    companyType: 'Support consultancy',
    weight: 0,
    color: roleColors[6],
  },
  {
    id: '8',
    name: 'To Make Ideas Visible',
    essence: 'Abstract → visual',
    method: 'Idea-to-Vision',
    companyType: 'Concept studio',
    weight: 0,
    color: roleColors[7],
  },
  {
    id: '9',
    name: 'To Reveal Meaning',
    essence: 'Hidden links',
    method: 'Meaning-Reframing',
    companyType: 'Systemic clarity lab',
    weight: 0,
    color: roleColors[8],
  },
  {
    id: '10',
    name: 'To Predict the Path',
    essence: 'Feasibility + shortcuts',
    method: 'Predictive Path',
    companyType: 'Strategy lab',
    weight: 0,
    color: roleColors[9],
  },
  {
    id: '11',
    name: 'To Elevate Thinking',
    essence: 'Meta-cognition',
    method: 'Thinking Elevation',
    companyType: 'Cognitive institute',
    weight: 0,
    color: roleColors[10],
  },
  {
    id: '12',
    name: 'To Nurture Potential',
    essence: 'Inspire & empower',
    method: 'Potential-Nurturing',
    companyType: 'Empowerment studio',
    weight: 0,
    color: roleColors[11],
  },
  {
    id: '13',
    name: 'To Care Unconditionally',
    essence: 'Ethical love',
    method: 'Unconditional Care',
    companyType: 'Life guidance studio',
    weight: 0,
    color: roleColors[12],
  },
  {
    id: '14',
    name: 'To Decipher Presence',
    essence: 'Embodied clarity',
    method: 'Presence-Deciphering',
    companyType: 'Presence lab',
    weight: 0,
    color: roleColors[13],
  },
  {
    id: '15',
    name: 'To Connect People',
    essence: 'Matchmaking intuition',
    method: 'Matchmaking Insight',
    companyType: 'Connector hub',
    weight: 0,
    color: roleColors[14],
  },
];
