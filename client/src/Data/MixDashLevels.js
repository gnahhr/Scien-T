export const levels = [
    {
      level: 1,
      numOfCustomers: 5,
      compounds: ["Sodium Chloride", "Hydrochloric acid", "Sodium hydroxide"],
      elems: ["Na", "Cl", "H", "O"],
      goal: 100,
      newCompound: {
        name: "Salt",
        elems: ["Na", "Cl"]
      } 
    },
    {
        level: 2,
        numOfCustomers: 7,
        compounds: ["Sodium Chloride", "Hydrochloric acid", "Sodium hydroxide", "Acetic acid"],
        elems: ["Na", "Cl", "H", "O", "C"],
        goal: 120,
        newCompound: {
          name: "Acetic acid",
          elems: ["C", "H", "O"]
        } 
    }
  ]