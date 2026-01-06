export const navLinks = [
  { 
    name: 'about', 
    path: '/about', 
    hasDropdown: true,
    children: [
      { label: 'Our Story', key: 'story' },
      { label: 'Team', key: 'team' },
      { label: 'Careers', key: 'careers' },
    ]
  },
  { 
    name: 'solutions', 
    path: '/solutions', 
    hasDropdown: true,
    children: [
      { label: 'Enterprise', key: 'enterprise' },
      { label: 'SME Solutions', key: 'sme' },
      { label: 'Custom Systems', key: 'custom' },
    ]
  },
  { 
    name: 'services', 
    path: '/services', 
    hasDropdown: true,
    children: [
      { label: 'Consulting', key: 'consulting' },
      { label: 'Development', key: 'dev' },
      { label: 'Maintenance', key: 'maintenance' },
    ]
  },
  { name: 'news', path: '/news', hasDropdown: false },
];
