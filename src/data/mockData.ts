import { SubjectChapter, BazaarItem, Friend } from '../types';

export const INITIAL_CHAPTERS: SubjectChapter[] = [
  {
    id: 'sci-light',
    subject: 'Science',
    title: 'Light - Reflection & Refraction',
    weightage: 10,
    competencyPct: 84,
    accuracy: 62,
    isWeak: true,
    isPinned: true,
    formulas: [
      'Mirror Formula: 1/f = 1/v + 1/u',
      'Magnification: m = -v/u = h\'/h',
      'Snell\'s Law: n = sin(i) / sin(r) = c / v',
      'Lens Power: P = 1 / f (in meters), Unit: Dioptre (D)'
    ],
    concepts: [
      {
        title: 'Concave Mirror: Ray Rules & Virtual vs Real Images',
        summary: 'When an object is placed between Focus (F) and Pole (P), rays diverge after reflection. Their virtual extensions meet behind the mirror, creating an enlarged, erect, virtual image.',
        diagramSvg: `<svg viewBox="0 0 400 200" class="w-full h-auto max-h-48">
          <line x1="20" y1="100" x2="380" y2="100" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>
          <!-- Curved mirror -->
          <path d="M 280,20 Q 310,100 280,180" fill="none" stroke="#3b82f6" stroke-width="4"/>
          <line x1="280" y1="20" x2="295" y2="25" stroke="#cbd5e1" stroke-width="1.5"/>
          <line x1="285" y1="40" x2="300" y2="45" stroke="#cbd5e1" stroke-width="1.5"/>
          <line x1="295" y1="100" x2="310" y2="100" stroke="#cbd5e1" stroke-width="1.5"/>
          <!-- Points -->
          <circle cx="120" cy="100" r="4" fill="#ef4444"/>
          <text x="115" y="125" fill="#ef4444" font-size="12" font-weight="bold">C (2F)</text>
          <circle cx="200" cy="100" r="4" fill="#10b981"/>
          <text x="195" y="125" fill="#10b981" font-size="12" font-weight="bold">F</text>
          <circle cx="295" cy="100" r="4" fill="#3b82f6"/>
          <text x="290" y="125" fill="#3b82f6" font-size="12" font-weight="bold">P</text>
          <!-- Object between P and F -->
          <line x1="240" y1="100" x2="240" y2="55" stroke="#f59e0b" stroke-width="3" marker-end="url(#arrow)"/>
          <text x="230" y="48" fill="#f59e0b" font-size="11" font-weight="bold">Object (AB)</text>
          <!-- Ray 1: Parallel to axis -> reflects through F -->
          <line x1="240" y1="55" x2="292" y2="55" stroke="#ec4899" stroke-width="2"/>
          <line x1="292" y1="55" x2="160" y2="140" stroke="#ec4899" stroke-width="2"/>
          <!-- Virtual extension behind mirror -->
          <line x1="292" y1="55" x2="360" y2="10" stroke="#ec4899" stroke-width="2" stroke-dasharray="3,3"/>
          <line x1="240" y1="55" x2="295" y2="100" stroke="#8b5cf6" stroke-width="2"/>
          <line x1="295" y1="100" x2="360" y2="10" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="3,3"/>
          <!-- Virtual Image -->
          <line x1="360" y1="100" x2="360" y2="10" stroke="#10b981" stroke-width="3" stroke-dasharray="2,2"/>
          <text x="340" y="125" fill="#10b981" font-size="11" font-weight="bold">Virtual Image (A'B')</text>
        </svg>`,
        teachingOptions: [
          {
            text: 'Angle A: Move object closer to Pole (P)',
            explanation: 'As object gets closer to Pole, the virtual image becomes less enlarged and approaches Pole behind the mirror. Dentists use this exact sweet spot!',
            isCoreRule: true
          },
          {
            text: 'Angle B: Move object exactly onto Focus (F)',
            explanation: 'At Focus (F), the reflected rays become parallel to each other and form an infinite real image. Used in searchlights and car headlamps.'
          },
          {
            text: 'Angle C: Place object beyond Center of Curvature (C)',
            explanation: 'Image forms between C and F, inverted, diminished, and real. Essential for projector lens mechanics.'
          },
          {
            text: 'Angle D: Submerge mirror in pure water (n=1.33)',
            explanation: 'Crucial CBSE trap question! Mirror focal length DOES NOT change in water because reflection depends only on geometry (r/2), unlike lenses!'
          }
        ],
        newsOrShieldSnippet: {
          tag: '🚀 Space Tech & Gujarat Pride',
          title: 'ISRO Space Telescope Mirrors Engineered in Ahmedabad',
          body: 'SAC (Space Applications Centre) in Ahmedabad uses zero-expansion ceramic glass mirrors polished to nanometer precision using concave ray geometry.'
        }
      },
      {
        title: 'Refraction & Snell’s Law: Optical Density vs Speed of Light',
        summary: 'When light enters an optically denser medium (like glass or diamond), it bends toward the normal because light velocity drops.',
        teachingOptions: [
          {
            text: 'Case 1: Light enters normally at 90° to boundary',
            explanation: 'No bending occurs because angle of incidence i = 0°, so sin(r) = 0. Speed still decreases, but trajectory remains straight!',
            isCoreRule: true
          },
          {
            text: 'Case 2: Diamond’s high refractive index (2.42)',
            explanation: 'Critical angle is tiny (~24.4°). Light gets trapped by Total Internal Reflection multiple times, giving diamonds their famous sparkle.'
          },
          {
            text: 'Case 3: Atmospheric refraction causing delayed sunset',
            explanation: 'Sun remains visible 2 minutes after actual sunset due to the earth’s density gradient bending rays downward.'
          },
          {
            text: 'Case 4: Swapping glass slab with transparent kerosene',
            explanation: 'Even though kerosene floats on water (lower mass density), it is optically DENSER than water (n=1.44 vs 1.33).'
          }
        ],
        newsOrShieldSnippet: {
          tag: '🛡️ Mindset Shield (Focus Reset)',
          title: 'The 3-Minute Dopamine Reset',
          body: 'When your brain craves short video feeds, your prefrontal cortex is experiencing low dopamine contrast. One 3-minute study sprint restores deep concentration.'
        }
      }
    ],
    mistakeAutopsy: [
      {
        pastError: 'Wrote Focal Length of Convex Mirror as negative (-15 cm)',
        correctPattern: 'Convex mirror Focus lies behind the reflecting surface: always POSITIVE (+15 cm). Concave is negative.',
        weakSubtopic: 'Cartesian Sign Convention'
      },
      {
        pastError: 'Used Dioptre formula with focal length in centimeters instead of meters',
        correctPattern: 'Power P = 1 / f(m). If f = 20 cm, P = 1 / 0.2m = +5.0 D.',
        weakSubtopic: 'Lens Power Calculations'
      }
    ]
  },
  {
    id: 'math-triangles',
    subject: 'Mathematics',
    title: 'Triangles - Similarity & BPT',
    weightage: 10,
    competencyPct: 78,
    accuracy: 54,
    isWeak: true,
    isPinned: true,
    formulas: [
      'Basic Proportionality Theorem: If DE || BC, AD/DB = AE/EC',
      'AAA / AA Similarity Criterion',
      'SAS Similarity: Two pairs proportional and included angles equal',
      'SSS Similarity: All three pairs of sides in same ratio'
    ],
    concepts: [
      {
        title: 'Basic Proportionality Theorem (Thales Theorem)',
        summary: 'A line drawn parallel to one side of a triangle intersecting the other two sides divides them in the same ratio.',
        diagramSvg: `<svg viewBox="0 0 300 180" class="w-full h-auto max-h-44">
          <!-- Triangle ABC -->
          <polygon points="150,20 40,160 260,160" fill="none" stroke="#6366f1" stroke-width="3"/>
          <text x="145" y="15" fill="#6366f1" font-weight="bold">A</text>
          <text x="25" y="165" fill="#6366f1" font-weight="bold">B</text>
          <text x="270" y="165" fill="#6366f1" font-weight="bold">C</text>
          <!-- Parallel line DE -->
          <line x1="95" y1="90" x2="205" y2="90" stroke="#ec4899" stroke-width="2.5" stroke-dasharray="4,2"/>
          <text x="75" y="95" fill="#ec4899" font-weight="bold">D</text>
          <text x="215" y="95" fill="#ec4899" font-weight="bold">E</text>
          <!-- Ratio labels -->
          <text x="95" y="60" fill="#94a3b8" font-size="11">AD</text>
          <text x="50" y="130" fill="#94a3b8" font-size="11">DB</text>
          <text x="180" y="60" fill="#94a3b8" font-size="11">AE</text>
          <text x="235" y="130" fill="#94a3b8" font-size="11">EC</text>
        </svg>`,
        teachingOptions: [
          {
            text: 'Perspective 1: Ratio AD/AB vs AE/AC',
            explanation: 'Adding 1 to both sides gives (AD+DB)/DB = (AE+EC)/EC => AB/DB = AC/EC. Equally valid in CBSE proofs!',
            isCoreRule: true
          },
          {
            text: 'Perspective 2: Converse of BPT',
            explanation: 'If a line divides two sides in the same ratio, then the line MUST be parallel to the third side.'
          },
          {
            text: 'Perspective 3: Case when D is midpoint of AB',
            explanation: 'DE becomes the Midpoint Theorem line from Class 9: DE = 1/2 BC and DE || BC.'
          },
          {
            text: 'Perspective 4: Applying BPT in Trapezium ABCD',
            explanation: 'Drawing a diagonal splits the trapezium into two triangles where BPT yields identical ratios along the diagonal.'
          }
        ],
        newsOrShieldSnippet: {
          tag: '💡 Project Athena (Girls in STEM)',
          title: 'Structural Architecture & Geometry',
          body: 'Triangles are nature’s only rigid 2D polygon. Civil engineers across Gujarat bridges use BPT ratios for truss stability.'
        }
      }
    ],
    mistakeAutopsy: [
      {
        pastError: 'Assumed triangles are congruent instead of similar',
        correctPattern: 'Similar triangles have equal angles and proportional sides (not necessarily equal sides).',
        weakSubtopic: 'Criteria for Similarity'
      }
    ]
  },
  {
    id: 'sci-electricity',
    subject: 'Science',
    title: 'Electricity & Joule Heating',
    weightage: 12,
    competencyPct: 91,
    accuracy: 75,
    isWeak: false,
    isPinned: false,
    formulas: [
      'Ohm\'s Law: V = I * R',
      'Resistance: R = ρ * (L / A)',
      'Series Resistance: R_eq = R1 + R2 + ...',
      'Parallel Resistance: 1/R_eq = 1/R1 + 1/R2 + ...',
      'Joule\'s Heating: H = I² * R * t = V * I * t'
    ],
    concepts: [
      {
        title: 'Ohm’s Law & Electric Circuit Components',
        summary: 'Current flowing through a metallic conductor is directly proportional to the potential difference across its ends, provided temperature remains constant.',
        diagramSvg: `<svg viewBox="0 0 360 160" class="w-full h-auto max-h-40">
          <rect x="50" y="30" width="260" height="100" fill="none" stroke="#3b82f6" stroke-width="2.5" rx="8"/>
          <!-- Battery -->
          <line x1="160" y1="20" x2="160" y2="40" stroke="#ef4444" stroke-width="4"/>
          <line x1="175" y1="25" x2="175" y2="35" stroke="#ef4444" stroke-width="2"/>
          <text x="155" y="15" fill="#ef4444" font-size="11" font-weight="bold">+  -</text>
          <!-- Resistor Zigzag -->
          <path d="M 140,130 L 148,120 L 156,140 L 164,120 L 172,140 L 180,120 L 188,140 L 196,130" fill="none" stroke="#10b981" stroke-width="3"/>
          <text x="160" y="155" fill="#10b981" font-size="11" font-weight="bold">Resistor (R)</text>
          <!-- Ammeter -->
          <circle cx="280" cy="80" r="14" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
          <text x="275" y="85" fill="#f59e0b" font-weight="bold">A</text>
          <!-- Switch -->
          <circle cx="70" cy="80" r="4" fill="#3b82f6"/>
          <line x1="74" y1="80" x2="95" y2="70" stroke="#3b82f6" stroke-width="2.5"/>
          <circle cx="95" cy="80" r="4" fill="#3b82f6"/>
          <text x="65" y="105" fill="#94a3b8" font-size="10">Key (K)</text>
        </svg>`,
        teachingOptions: [
          {
            text: 'Angle A: Doubling wire length L while keeping area constant',
            explanation: 'Resistance doubles because R is proportional to length L.',
            isCoreRule: true
          },
          {
            text: 'Angle B: Stretching wire to double length without adding mass',
            explanation: 'Volume is constant (A1 * L1 = A2 * L2). If L doubles, A halves, so R increases 4-fold! Classic exam trick.'
          },
          {
            text: 'Angle C: Connecting bulbs in Parallel vs Series at home',
            explanation: 'In parallel each device gets full 220V voltage and operates independently with lower equivalent resistance.'
          },
          {
            text: 'Angle D: Why Nichrome is used in electric irons',
            explanation: 'Nichrome has high resistivity and does not easily oxidize/burn even at glowing red-hot temperatures.'
          }
        ],
        newsOrShieldSnippet: {
          tag: '⚡ Tech Frontier',
          title: 'Superconductors in High-Speed Rail',
          body: 'Zero-resistance materials allow maglev trains to glide frictionlessly above magnetic tracks.'
        }
      }
    ],
    mistakeAutopsy: [
      {
        pastError: 'Calculated domestic power cost without converting Watts to Kilowatts',
        correctPattern: '1 Commercial Unit of Electricity = 1 kWh = 1000 W * 3600 s = 3.6 x 10^6 Joules.',
        weakSubtopic: 'Electric Energy & Power'
      }
    ]
  },
  {
    id: 'math-quadratics',
    subject: 'Mathematics',
    title: 'Quadratic Equations & Roots',
    weightage: 8,
    competencyPct: 82,
    accuracy: 71,
    isWeak: false,
    isPinned: false,
    formulas: [
      'Standard Form: ax² + bx + c = 0 (a ≠ 0)',
      'Quadratic Formula: x = (-b ± √(b² - 4ac)) / (2a)',
      'Discriminant D = b² - 4ac',
      'Nature of Roots: D > 0 (two distinct real), D = 0 (two equal real), D < 0 (no real roots)'
    ],
    concepts: [
      {
        title: 'The Discriminant & Parabolic Graph Intercepts',
        summary: 'The discriminant D = b² - 4ac reveals whether the parabola cuts the X-axis twice, touches it once, or floats entirely above/below it.',
        teachingOptions: [
          {
            text: 'Interpretation 1: D = 0 indicates a perfect square trinomial',
            explanation: 'The roots are identical (-b/2a) and the vertex sits exactly on the X-axis.',
            isCoreRule: true
          },
          {
            text: 'Interpretation 2: Word problems with speed & upstream/downstream',
            explanation: 'Time = Distance / Speed. Upstream speed is (v - u), Downstream is (v + u). Total time equations form quadratics.'
          },
          {
            text: 'Interpretation 3: Why negative discriminant gives imaginary roots',
            explanation: 'Square root of a negative real number is not in Real numbers ℝ, but leads into Complex Numbers ℂ in Class 11 PCM.'
          },
          {
            text: 'Interpretation 4: Splitting the middle term shortcut',
            explanation: 'Find two numbers whose product is a*c and sum is b.'
          }
        ],
        newsOrShieldSnippet: {
          tag: '🏏 Gujarat Cricket & Physics',
          title: 'Trajectory of a Six at Narendra Modi Stadium',
          body: 'Every cricket ball hit follows a quadratic parabolic curve y = ax² + bx + c under gravitational acceleration.'
        }
      }
    ],
    mistakeAutopsy: [
      {
        pastError: 'Forgot ± sign before the square root in quadratic formula',
        correctPattern: 'Always use x = (-b ± √D) / 2a to capture both real solutions.',
        weakSubtopic: 'Quadratic Formula'
      }
    ]
  },
  {
    id: 'sst-nationalism',
    subject: 'Social Science',
    title: 'Nationalism in India',
    weightage: 9,
    competencyPct: 79,
    accuracy: 68,
    isWeak: false,
    isPinned: false,
    formulas: [
      'Rowlatt Act (1919) -> Jallianwala Bagh (13 April 1919)',
      'Non-Cooperation Movement (1920-1922, Chauri Chaura incident)',
      'Civil Disobedience Movement (1930, Dandi Salt March)',
      'Poona Pact (Sept 1932: Dr. B.R. Ambedkar & Mahatma Gandhi)'
    ],
    concepts: [
      {
        title: 'The Salt March & Civil Disobedience Movement',
        summary: 'Gandhi marched 240 miles from Sabarmati Ashram to Dandi, breaking the British salt monopoly tax and mobilizing millions.',
        teachingOptions: [
          {
            text: 'Why Salt was chosen as the symbol',
            explanation: 'Salt was consumed equally by rich and poor alike; taxing a fundamental biological necessity united all social strata.',
            isCoreRule: true
          },
          {
            text: 'Difference between Non-Cooperation and Civil Disobedience',
            explanation: 'Non-cooperation meant not assisting British administration; Civil Disobedience went further by actively breaking colonial laws.'
          },
          {
            text: 'Role of Industrial Working Class & Peasantry',
            explanation: 'Peasants in Awadh led by Baba Ramchandra protested high talukdari rents; tribal peasants led by Alluri Sitaram Raju used guerrilla warfare.'
          },
          {
            text: 'Limits of Civil Disobedience: Dalit & Muslim League stance',
            explanation: 'Dr. Ambedkar demanded separate electorates leading to the Poona Pact, while Muslim League sought reserved seats in Central Assembly.'
          }
        ],
        newsOrShieldSnippet: {
          tag: '📜 Dandi Heritage',
          title: 'Sabarmati to Dandi Coastal Corridor',
          body: 'The historic route passes through Anand and Bharuch, now recognized as a national heritage memorial.'
        }
      }
    ],
    mistakeAutopsy: [
      {
        pastError: 'Confused dates of Poona Pact with Gandhi-Irwin Pact',
        correctPattern: 'Gandhi-Irwin Pact was March 1931; Poona Pact was September 1932.',
        weakSubtopic: 'Chronology & Timeline'
      }
    ]
  }
];

export const INITIAL_FRIENDS: Friend[] = [
  {
    id: 'f-1',
    codename: 'cyber-tiger',
    username: 'Aryan_CBSE',
    realName: 'Aryan Patel',
    rankBadge: 'Ace Dominator',
    streak: 18,
    avatarSeed: 'tiger',
    battlesCount: 12,
    messages: [
      { id: 'm1', sender: 'them', text: 'Hey! Did you finish the Concave mirror ray diagram notes?', timestamp: '11:20 AM' },
      { id: 'm2', sender: 'me', text: 'Yes, just banked 45 Urja on that! Check this out:', timestamp: '11:22 AM' }
    ]
  },
  {
    id: 'f-2',
    codename: 'neon-falcon',
    username: 'Pooja_X',
    realName: 'Pooja Shah',
    rankBadge: 'Crown II',
    streak: 9,
    avatarSeed: 'falcon',
    battlesCount: 8,
    messages: [
      { id: 'm3', sender: 'them', text: 'Ready for 1v1 Quiz Battle in Science?', timestamp: 'Yesterday' }
    ]
  },
  {
    id: 'f-3',
    codename: 'quantum-fox',
    username: 'Dev_GSEB',
    realName: 'Devang Joshi',
    rankBadge: 'Diamond IV',
    streak: 24,
    avatarSeed: 'fox',
    battlesCount: 5,
    messages: [
      { id: 'm4', sender: 'them', text: 'LDCE Robotics seat is our target this year!', timestamp: '2 days ago' }
    ]
  }
];

export const BAZAAR_CATALOG: BazaarItem[] = [
  // Upper-Body Drip
  {
    id: 'drip-gold-chain',
    category: 'drip',
    name: '24K Solid Gold Locket',
    price: 60,
    icon: '⛓️',
    description: 'Polished gold chain visible over any shirt or blazer.'
  },
  {
    id: 'drip-oversized-hoodie',
    category: 'drip',
    name: 'Pastel Lavender Oversized Hoodie',
    price: 85,
    icon: '🧥',
    description: 'Comfortable heavy cotton hoodie with drop-shoulder silhouette.'
  },
  {
    id: 'drip-cyber-visor',
    category: 'drip',
    name: 'Cyber HUD Neon Visor',
    price: 110,
    icon: '🥽',
    description: 'Holographic glowing optics displaying live Urja telemetry.'
  },
  {
    id: 'drip-denim-jacket',
    category: 'drip',
    name: 'Distressed Indigo Denim Jacket',
    price: 95,
    icon: '👔',
    description: 'Class 10 pilot jacket with stitched scalloped patches.'
  },

  // Avatar Rings
  {
    id: 'ring-neon-pulse',
    category: 'rings',
    name: 'Neon Pulse Electric Ring',
    price: 50,
    icon: '⭕',
    previewColor: '#00e5ff',
    description: 'Pulsing cyan light ring surrounding the student profile avatar.'
  },
  {
    id: 'ring-scalloped-gold',
    category: 'rings',
    name: '12-Point Scalloped Gold Cookie',
    price: 75,
    icon: '🍪',
    previewColor: '#ffd700',
    description: 'The signature M3 Expressive scalloped cookie edge.'
  },
  {
    id: 'ring-plasma-orbit',
    category: 'rings',
    name: 'Atomic Plasma 3-Ring Orbit',
    price: 120,
    icon: '⚛️',
    previewColor: '#ec4899',
    description: 'Three rotating orbital electron rings encircling your avatar.'
  },
  {
    id: 'ring-conqueror-halo',
    category: 'rings',
    name: 'Conqueror Hinokami Fire Halo',
    price: 200,
    icon: '🔥',
    previewColor: '#ff3d00',
    description: 'Grandmaster fiery solar flare aura reserved for top rankers.'
  },

  // Card Skins
  {
    id: 'skin-holo-foil',
    category: 'skins',
    name: 'Holographic Prism Foil',
    price: 90,
    icon: '✨',
    description: 'Rainbow metallic sheen across the 3D Mitra Pass surface.'
  },
  {
    id: 'skin-obsidian-matrix',
    category: 'skins',
    name: 'Obsidian Circuit Grid',
    price: 80,
    icon: '🔲',
    description: 'Deep carbon fiber weave with engraved gold PCB traces.'
  },
  {
    id: 'skin-sakura-bloom',
    category: 'skins',
    name: 'Pastel Sakura Blossoms',
    price: 65,
    icon: '🌸',
    description: 'Soft cream & blush pink petals with watercolor shading.'
  },

  // Streak Flames
  {
    id: 'flame-classic-orange',
    category: 'flames',
    name: 'Classic Solar Orange Fire',
    price: 0,
    icon: '🔥',
    description: 'Standard burning streak flame.'
  },
  {
    id: 'flame-blue-plasma',
    category: 'flames',
    name: 'Blue Plasma Electric Flame',
    price: 70,
    icon: '💙',
    description: '10,000°K ionizing blue streak flame.'
  },
  {
    id: 'flame-cursed-purple',
    category: 'flames',
    name: 'Cursed Hollow Purple Fire',
    price: 130,
    icon: '💜',
    description: 'JJK-inspired purple energy radiating with black sparks.'
  },
  {
    id: 'flame-void-black',
    category: 'flames',
    name: 'Gemini Void Singularity Flame',
    price: 160,
    icon: '🖤',
    description: 'Pure black aura with sharp iridescent white edges.'
  },

  // UI Themes
  {
    id: 'theme-pastel',
    category: 'themes',
    name: 'Orion Pastel (Warm Cream)',
    price: 0,
    icon: '🍦',
    previewColor: '#FAF8F5',
    description: 'Warm cream canvas with soft lavender, mint and blush bento cards.'
  },
  {
    id: 'theme-charcoal',
    category: 'themes',
    name: 'Orion Charcoal (Dark M3)',
    price: 40,
    icon: '🌑',
    previewColor: '#141416',
    description: 'Deep charcoal background with tonal pastel-tinted containers.'
  },
  {
    id: 'theme-oled',
    category: 'themes',
    name: 'Gemini Void (True OLED Black)',
    price: 80,
    icon: '🌌',
    previewColor: '#000000',
    description: 'Zero pixel power pure OLED with glowing Gemini blue border cues.'
  },
  {
    id: 'theme-jjk',
    category: 'themes',
    name: 'Cursed Purple (JJK Mode)',
    price: 120,
    icon: '🔮',
    previewColor: '#1a0b2e',
    description: 'Mystic dark purple with vivid violet neon accents.'
  },
  {
    id: 'theme-hinokami',
    category: 'themes',
    name: 'Demon Slayer Hinokami',
    price: 150,
    icon: '🗡️',
    previewColor: '#200808',
    description: 'Sun-breathing crimson and gold solar flares.'
  }
];

export const SCALLOPED_BADGES = [
  { id: 'b1', name: 'First Checkpoint', desc: 'Banked Urja in first 3-min sprint', icon: '⚡', unlocked: true },
  { id: 'b2', name: '7-Day Blaze', desc: 'Maintained 7 consecutive study days', icon: '🔥', unlocked: true },
  { id: 'b3', name: 'Ray Master', desc: 'Mastered concave & convex mirror ray diagrams', icon: '📐', unlocked: true },
  { id: 'b4', name: 'Oral Ace', desc: 'Scored 100% on NCERT viva keywords', icon: '🎙️', unlocked: false },
  { id: 'b5', name: 'BPT Conqueror', desc: 'Proved Thales theorem without flaw', icon: '🔺', unlocked: false },
  { id: 'b6', name: '1v1 Arena Victor', desc: 'Won 5 quiz battles against friends', icon: '⚔️', unlocked: false },
  { id: 'b7', name: 'Speed Demon', desc: 'Completed 60/25/15 mock in under 30 mins', icon: '⏱️', unlocked: false },
  { id: 'b8', name: 'Dandi March Historian', desc: 'Mastered modern Indian history timelines', icon: '📜', unlocked: false },
  { id: 'b9', name: 'Sikka Millionaire', desc: 'Accumulated 500+ Sikka in Bazaar', icon: '🪙', unlocked: false },
  { id: 'b10', name: 'Night Owl Pilot', desc: 'Cleared 3 checkpoints after 10 PM', icon: '🦉', unlocked: false },
  { id: 'b11', name: 'Early Bird Sprint', desc: 'Started morning routine before 7 AM', icon: '🌅', unlocked: false },
  { id: 'b12', name: 'Mistake Autopsy Surgeon', desc: 'Fixed 5 weak zones from past tests', icon: '🔍', unlocked: false },
  { id: 'b13', name: 'P2P Note Sharer', desc: 'Sent handwritten diagram doubt to friend', icon: '🤝', unlocked: false },
  { id: 'b14', name: 'CBSE Competency King', desc: 'Achieved 85%+ competency rating', icon: '👑', unlocked: false },
  { id: 'b15', name: 'GSEB Top Percentile', desc: 'Secured 95+ percentile in mock test', icon: '🏅', unlocked: false },
  { id: 'b16', name: '3D Card Virtuoso', desc: 'Customized back side holo stickers', icon: '🪪', unlocked: false },
  { id: 'b17', name: 'Conqueror Legend', desc: 'Surpassed 5,000 Urja barrier', icon: '🌟', unlocked: false }
];
