export const navLinks = [
  {
    name: "about",
    path: "/about",
    hasDropdown: true,
    children: [
      { label: "Our Company ", key: "company" },
      { label: "Our Values", key: "values" },
      { label: "Vision & Mission", key: "mission" },
      { label: "Meet Our Experts", key: "experts" },
      { label: "Success Stories", key: "stories" },
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
      { label: "Farm Management", key: "management" },
      { label: "Training Course", key: "training" },
      {
        label: "Technical Consultancy",
        key: "consultancy",
      },
      { label: "Lab analysis/Eurofins", key: "lab" },
      { label: "Remote sensing", key: "remote-sensing" },
      // { label: "footer.servicesLinks.irrigation", key: "irrigation" },
    ],
  },
  { name: "news", path: "/news", hasDropdown: false },
];
