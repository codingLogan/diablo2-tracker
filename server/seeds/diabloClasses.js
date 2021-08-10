function createSkill(name, baseLevelRequirement) {
  return {
    name,
    baseLevelRequirement,
  }
}

function getCharacterClasses() {
  return [
    {
      name: 'Necromancer',
      skillTrees: [
        {
          name: 'Summoning Skills',
          skills: [
            createSkill('Skeleton Mastery', 1),
            createSkill('Raise Skeleton', 1),
            createSkill('Clay Golen', 6),
            createSkill('Golem Mastery', 12),
            createSkill('Skeletal Mage', 12),
            createSkill('Blood Golem', 18),
            createSkill('Summon Resist', 24),
            createSkill('Iron Golem', 24),
            createSkill('Fire Golem', 30),
            createSkill('Revive', 30),
          ],
        },
        {
          name: 'Poison and Bone Skills',
          skills: [
            createSkill('Teeth', 1),
            createSkill('Bone Armor', 1),
            createSkill('Poison Dagger', 6),
            createSkill('Corpse Explosion', 6),
            createSkill('Bone Wall', 12),
            createSkill('Poison Explosion', 18),
            createSkill('Bone Spear', 18),
            createSkill('Bone Prison', 24),
            createSkill('Poison Nova', 30),
            createSkill('Bone Spirit', 30),
          ],
        },
        {
          name: 'Curses',
          skills: [
            createSkill('Amplify Damage', 1),
            createSkill('Dim Vision', 6),
            createSkill('Weaken', 6),
            createSkill('Iron Maiden', 12),
            createSkill('Terror', 12),
            createSkill('Confuse', 18),
            createSkill('Life Tap', 18),
            createSkill('Attract', 24),
            createSkill('Decrepify', 24),
            createSkill('Lower Resist', 30),
          ],
        },
      ],
    },
  ]
}

export default getCharacterClasses
