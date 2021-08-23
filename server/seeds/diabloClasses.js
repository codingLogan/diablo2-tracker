/**
 *
 * @param {string} name - Name of the skill
 * @param {number} baseLevelRequirement - Number req before selection
 * @returns
 */
function createSkill(name, baseLevelRequirement) {
  return {
    name,
    baseLevelRequirement,
  }
}

/**
 *
 * @param {string} name
 * @param {Array<{
 *   name: string,
 *   baseLevelRequirement: number
 * }>} skills - The skills of a class
 */
function createSkillTree(name, skills) {
  return {
    name,
    skills,
  }
}

const AMAZON = {
  name: 'Amazon',
  skillTrees: [
    createSkillTree('Javelin and Spear Skills', [
      createSkill('Jab', 1),
      createSkill('Power Strike', 6),
      createSkill('Poison Javelin', 6),
      createSkill('Impale', 12),
      createSkill('Lightning Bolt', 12),
      createSkill('Charged Strike', 18),
      createSkill('Plague Javelin', 18),
      createSkill('Fend', 24),
      createSkill('Lightning Strike', 30),
      createSkill('Lightning Fury', 30),
    ]),
    createSkillTree('Passive and Magic Skills', [
      createSkill('Inner Sight', 1),
      createSkill('Critical Strike', 1),
      createSkill('Dodge', 6),
      createSkill('Slow Missiles', 12),
      createSkill('Avoid', 12),
      createSkill('Penetrate', 18),
      createSkill('Decoy', 24),
      createSkill('Evade', 24),
      createSkill('Valkyrie', 30),
      createSkill('Pierce', 30),
    ]),
    createSkillTree('Bow and Crossbow Skills', [
      createSkill('Magic Arrow', 1),
      createSkill('Fire Arrow', 1),
      createSkill('Cold Arrow', 6),
      createSkill('Multiple Shot', 6),
      createSkill('Exploding Arrow', 12),
      createSkill('Ice Arrow', 18),
      createSkill('Guided Arrow', 18),
      createSkill('Strafe', 24),
      createSkill('Immolation Arrow', 24),
      createSkill('Freezing Arrow', 30),
    ]),
  ],
}

const ASSASSIN = {
  name: 'Assassin',
  skillTrees: [
    createSkillTree('Martial Arts', [
      createSkill('Tiger Strike', 1),
      createSkill('Dragon Talon', 1),
      createSkill('Fists of Fire', 6),
      createSkill('Dagon Claw', 6),
      createSkill('Cobra Strike', 12),
      createSkill('Claws of Thunder', 18),
      createSkill('Dragon Tail', 18),
      createSkill('Blades of Ice', 24),
      createSkill('Dragon Flight', 24),
      createSkill('Phoenix Strike', 30),
    ]),
    createSkillTree('Shadow Disciplines', [
      createSkill('Claw Mastery', 1),
      createSkill('Psychic Hammer', 1),
      createSkill('Burst of Speed', 6),
      createSkill('Weapon Block', 12),
      createSkill('Cloak of Shadows', 12),
      createSkill('Fade', 18),
      createSkill('Shadow Warrior', 18),
      createSkill('Mind Blast', 24),
      createSkill('Venom', 30),
      createSkill('Shadow Master', 30),
    ]),
    createSkillTree('Traps', [
      createSkill('Fire Blast', 1),
      createSkill('Shock Web', 6),
      createSkill('Blade Sentinel', 6),
      createSkill('Charged Bolt Sentry', 12),
      createSkill('Wake of Fire', 12),
      createSkill('Blade Fury', 18),
      createSkill('Lightning Sentry', 24),
      createSkill('Wake of Inferno', 24),
      createSkill('Death Sentry', 30),
      createSkill('Blade Shield', 30),
    ]),
  ],
}

const BARBARIAN = {
  name: 'Barbarian',
  skillTrees: [
    createSkillTree('Warcries', [
      createSkill('Howl', 1),
      createSkill('Find Potion', 1),
      createSkill('Taunt', 6),
      createSkill('Shout', 6),
      createSkill('Find Item', 12),
      createSkill('Battle Cry', 18),
      createSkill('Battle Orders', 24),
      createSkill('Grim Ward', 24),
      createSkill('War Cry', 30),
      createSkill('Battle Command', 30),
    ]),
    createSkillTree('Combat Masteries', [
      createSkill('Sword Mastery', 1),
      createSkill('Axe Mastery', 1),
      createSkill('Mace Mastery', 1),
      createSkill('Polearm Mastery', 6),
      createSkill('Throwing Mastery', 6),
      createSkill('Spear Mastery', 6),
      createSkill('Increased Stamina', 12),
      createSkill('Iron Skin', 18),
      createSkill('Increased Speed', 24),
      createSkill('Natural Resistances', 30),
    ]),
    createSkillTree('Combat Skills', [
      createSkill('Bash', 1),
      createSkill('Leap', 6),
      createSkill('Double Swing', 6),
      createSkill('Stun', 12),
      createSkill('Double Throw', 12),
      createSkill('Leap Attack', 18),
      createSkill('Concentrate', 18),
      createSkill('Frenzy', 24),
      createSkill('Whirlwind', 30),
      createSkill('Berserk', 30),
    ]),
  ],
}

const DRUID = {
  name: 'Druid',
  skillTrees: [
    createSkillTree('Elemental Skills', [
      createSkill('Firestorm', 1),
      createSkill('Molten Boulder', 6),
      createSkill('Arctic Blast', 6),
      createSkill('Fissure', 12),
      createSkill('Cyclone Armor', 12),
      createSkill('Twister', 18),
      createSkill('Volcano', 24),
      createSkill('Tornado', 24),
      createSkill('Armageddon', 30),
      createSkill('Hurricane', 30),
    ]),
    createSkillTree('Shape Shifting Skills', [
      createSkill('Werewolf', 1),
      createSkill('Lyncanthropy', 1),
      createSkill('Werebear', 6),
      createSkill('Feral Rage', 12),
      createSkill('Maul', 12),
      createSkill('Rabies', 18),
      createSkill('Fire Claws', 18),
      createSkill('Hunger', 24),
      createSkill('Shock Wave', 24),
      createSkill('Fury', 30),
    ]),
    createSkillTree('Summoning Skills', [
      createSkill('Raven', 1),
      createSkill('Poison Creeper', 1),
      createSkill('Oak Sage', 6),
      createSkill('Summon Spirit Wolf', 6),
      createSkill('Carrion Vine', 12),
      createSkill('Heart of Wolverine', 18),
      createSkill('Summon Dire Wolf', 18),
      createSkill('Solar Creeper', 24),
      createSkill('Spirit of Barbs', 30),
      createSkill('Summon Grizzly', 30),
    ]),
  ],
}

const NECROMANCER = {
  name: 'Necromancer',
  skillTrees: [
    createSkillTree('Summoning Skills', [
      createSkill('Skeleton Mastery', 1),
      createSkill('Raise Skeleton', 1),
      createSkill('Clay Golem', 6),
      createSkill('Golem Mastery', 12),
      createSkill('Skeletal Mage', 12),
      createSkill('Blood Golem', 18),
      createSkill('Summon Resist', 24),
      createSkill('Iron Golem', 24),
      createSkill('Fire Golem', 30),
      createSkill('Revive', 30),
    ]),
    createSkillTree('Poison and Bone Skills', [
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
    ]),
    createSkillTree('Curses', [
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
    ]),
  ],
}

const PALADIN = {
  name: 'Paladin',
  skillTrees: [
    createSkillTree('Defensive Auras', [
      createSkill('Prayer', 1),
      createSkill('Resist Fire', 1),
      createSkill('Defiance', 6),
      createSkill('Resist Cold', 6),
      createSkill('Cleansing', 12),
      createSkill('Resist Lightning', 12),
      createSkill('Vigor', 18),
      createSkill('Meditation', 24),
      createSkill('Redemption', 30),
      createSkill('Salvation', 30),
    ]),
    createSkillTree('Offensive Auras', [
      createSkill('Might', 1),
      createSkill('Holy Fire', 6),
      createSkill('Thorns', 6),
      createSkill('Blessed Aim', 12),
      createSkill('Concentration', 18),
      createSkill('Holy Freeze', 18),
      createSkill('Holy Shock', 24),
      createSkill('Sanctuary', 24),
      createSkill('Fanaticism', 30),
      createSkill('Conviction', 30),
    ]),
    createSkillTree('Combat Skills', [
      createSkill('Sacrifice', 1),
      createSkill('Smite', 1),
      createSkill('Holy Bolt', 6),
      createSkill('Zeal', 12),
      createSkill('Charge', 12),
      createSkill('Vengeance', 18),
      createSkill('Blessed Hammer', 18),
      createSkill('Conversion', 24),
      createSkill('Holy Shield', 24),
      createSkill('Fist of the Heavens', 30),
    ]),
  ],
}

const SORCERESS = {
  name: 'Sorceress',
  skillTrees: [
    createSkillTree('Cold Spells', [
      createSkill('Ice Bolt', 1),
      createSkill('Frozen Armor', 1),
      createSkill('Frost Nova', 6),
      createSkill('Ice Blast', 6),
      createSkill('Shiver Armor', 12),
      createSkill('Glacial Spike', 18),
      createSkill('Blizzard', 24),
      createSkill('Chilling Armor', 24),
      createSkill('Frozen Orb', 30),
      createSkill('Cold Mastery', 30),
    ]),
    createSkillTree('Lightning Spells', [
      createSkill('Charged Bolt', 1),
      createSkill('Static Field', 6),
      createSkill('Telekinesis', 6),
      createSkill('Nova', 12),
      createSkill('Lightning', 12),
      createSkill('Chain Lightning', 18),
      createSkill('Teleport', 18),
      createSkill('Thunder Storm', 24),
      createSkill('Energy Shield', 24),
      createSkill('Lightning Mastery', 30),
    ]),
    createSkillTree('Fire Spells', [
      createSkill('Fire Bolt', 1),
      createSkill('Warmth', 1),
      createSkill('Inferno', 6),
      createSkill('Blaze', 12),
      createSkill('Fire Ball', 12),
      createSkill('Fire Wall', 18),
      createSkill('Enchant', 18),
      createSkill('Meteor', 24),
      createSkill('Fire Mastery', 30),
      createSkill('Hydra', 30),
    ]),
  ],
}

function getCharacterClasses() {
  return [AMAZON, ASSASSIN, BARBARIAN, DRUID, NECROMANCER, PALADIN, SORCERESS]
}

export default getCharacterClasses
