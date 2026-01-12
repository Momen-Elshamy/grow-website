export const navLinks = [
  {
    name: "about",
    path: "/about",
    hasDropdown: true,
    children: [
      { label: "Our Values", key: "values" },
      { label: "Vision & Mission", key: "mission" },
      { label: "Meet Our Experts", key: "experts" },
    ],
  },
  {
    name: "solutions",
    path: "/solutions",
    hasDropdown: true,
    children: [
      { label: "Farm Operation and Management", key: "operation" },
      { label: 'Farm Resource Planning solution "FRP"', key: "frp" },
      { label: "Water Management", key: "water" },
      { label: "Human Capital Training & Development", key: "training" },
      { label: "Commercial Management", key: "commercial" },
    ],
  },
  {
    name: "services",
    path: "/services",
    hasDropdown: true,
    children: [
      { label: "Technical Consultancy", key: "consultancy" },
      { label: "Lab analysis/Eurofins", key: "lab" },
      { label: "Training Course", key: "training" },
      {
        label: "Engineering & design of Irrigation and drainage systems.",
        key: "irrigation",
      },
      {
        label:
          "Revision, Re-engineering and optimization of existing water systems.",
        key: "optimization",
      },
      { label: "Remote sensing", key: "remote-sensing" },
    ],
  },
  { name: "news", path: "/news", hasDropdown: false },
];
