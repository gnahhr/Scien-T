export const levels = [
    {
      level: 1,
      numOfCustomers: 3,
      compounds: ["Sodium chloride"],
      elems: ["Na", "Cl"],
      goal: 40,
      newCompound: {
        name: "Sodium chloride",
        elems: ["Na", "Cl"]
      } 
    },
    {
        level: 2,
        numOfCustomers: 5,
        compounds: ["Sodium chloride", "Hydrochloric acid"],
        elems: ["Na", "Cl", "H"],
        goal: 80,
        newCompound: {
          name: "Hydrochloric acid",
          elems: ["H", "Cl"]
        } 
    },
    {
      level: 3,
      numOfCustomers: 7,
      compounds: ["Sodium chloride", "Hydrochloric acid", "Ammonia"],
      elems: ["Na", "Cl", "H", "N"],
      goal: 120,
      newCompound: {
        name: "Ammonia",
        elems: ["N", "H"]
      } 
    },
    {
      level: 4,
      numOfCustomers: 7,
      compounds: ["Sodium chloride", "Hydrochloric acid", "Ammonia", "Nitric acid"],
      elems: ["Na", "Cl", "H", "N", "O"],
      goal: 120,
      newCompound: {
        name: "Nitric acid",
        elems: ["N", "H", "O"]
      } 
    },
    {
      level: 5,
      numOfCustomers: 8,
      compounds: ["Hydrochloric acid", "Ammonia", "Nitric acid", "Phosphoric acid"],
      elems: ["Cl", "H", "N", "O", "P"],
      goal: 140,
      newCompound: {
        name: "Phosphoric acid",
        elems: ["P", "H", "O"]
      } 
    },
    {
      level: 6,
      numOfCustomers: 9,
      compounds: ["Hydrochloric acid", "Ammonia", "Nitric acid", "Phosphoric acid"],
      elems: ["Cl", "H", "N", "O", "P"],
      goal: 160,
      newCompound: {
        name: "Phosphoric acid",
        elems: ["P", "H", "O"]
      } 
    },
    {
      level: 7,
      numOfCustomers: 10,
      compounds: ["Hydrochloric acid", "Ammonia", "Nitric acid", "Phosphoric acid", "Ammonium sulfate"],
      elems: ["Cl", "H", "N", "O", "P"],
      goal: 180,
      newCompound: {
        name: "Ammonium sulfate",
        elems: ["N", "H", "S", "O"]
      } 
    },
    {
      level: 8,
      numOfCustomers: 10,
      compounds: ["Hydrochloric acid", "Ammonia", "Nitric acid", "Phosphoric acid", "Ammonium sulfate", "Carbonic acid"],
      elems: ["Cl", "H", "N", "O", "P"],
      goal: 180,
      newCompound: {
        name: "Carbonic acid",
        elems: ["H", "C", "O"]
      } 
    },
    {
      level: 9,
      numOfCustomers: 12,
      compounds: ["Hydrochloric acid", "Ammonia", "Nitric acid", "Phosphoric acid", "Ammonium sulfate", "Carbonic acid", "Sodium hydroxide"],
      elems: ["Cl", "H", "N", "O", "P", "Na"],
      goal: 220,
      newCompound: {
        name: "Sodium hydroxide",
        elems: ["Na", "O", "H"]
      } 
    },
  ]