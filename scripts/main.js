















// Creatures of the world

// Forest Creatures
// Bramblekin: Small, mischievous beings made of twisting vines and leaves. They snack on magical herbs, sometimes stealing enchanted items from wizards for fun.
// Rootclaws: Small, spider-like creatures made of twisting roots. They cling to trees and absorb natural magic, enhancing the flora around them. Corrupted versions drain life instead.
// Flare Moths: Bioluminescent moths that release tiny bursts of light magic when disturbed. They help wizards track magic sources but can become unstable when corrupted, blinding opponents.
// Cave Creatures
// Flicker Rats: Rodent-like creatures with faintly glowing fur, absorbing ambient magic from their surroundings. Usually harmless scavengers, but corrupted ones become erratic, pulsing with unstable energy.
// Gemstone Larva: Soft-bodied burrowers that feed on magical minerals, eventually solidifying into crystalline exoskeletons. Corrupted ones become aggressive, consuming enchanted artifacts.
// Shadow Blinkers: Small, nocturnal creatures that teleport short distances using ambient magic. Normally harmless, corrupted versions erratically teleport around, disrupting nearby spells.
// Mountain Creatures
// Pebble Crawlers: Tiny, crab-like creatures formed from compacted stone. They skitter along rock surfaces and naturally absorb elemental energy, making them resistant to some weaker spells.
// Galehounds: Wolf-like beings that harness wind magic to leap across cliffs and ridges. Their movement speeds up storms, and corrupted versions create chaotic gusts that hinder travelers.
// Ember Hawks: Birds with feathers infused with fire magic, helping wizards monitor volcanic activity. Corrupted ones scatter uncontrolled embers, igniting the land beneath them.
// Desert Creatures
// Dust Sprites: Wispy, barely tangible creatures that blend into sandstorms. Normally passive, but corrupted ones generate mini-sand cyclones to disorient travelers.
// Scorch Sprites: Tiny elemental beings that regulate heat in the sands. Normally they help balance temperatures, but corrupted ones intensify heat waves, making survival difficult
// Glass Jackals: Jackal-like creatures with semi-translucent, hardened skin formed by desert magic. They blend into mirages, but corrupted ones fracture unpredictably, scattering razor-sharp shards.
// Ocean Creatures
// Ripple Fish: Small aquatic creatures that instinctively mimic the magical energy around them, briefly copying spells that pass through the water. Harmless unless provoked or corrupted.
// Current Weavers: Jellyfish-like entities that manipulate currents, allowing easier travel. Wizards use them to guide ships, but corrupted ones tangle and twist ocean flow into dangerous whirlpools
// Echo Rays: Flat-bodied ocean dwellers that absorb sound magic to communicate. Corrupted ones generate distorted echoes that scramble spell-casting underwater.
// Sky Creatures
// Breeze Imps: Tiny winged creatures that ride air currents. They playfully alter wind flow, helping wizards with flying spells, but corrupted ones create chaotic gusts that interfere with movement.
// Nimbus Runners: Swift, winged creatures that surf wind currents, creating stable flight paths. Corrupted ones generate turbulence that knocks airborne entities off balance.
// Sky Quills: Feathered creatures that inscribe magic runes in the air using their enchanted tails. Wizards study their patterns, but corrupted ones create unstable glyphs that interfere with spells.
// Ruins Creatures
// Lost Scriptlings: Tiny floating scroll fragments with faded magical glyphs. Normally harmless, they sometimes whisper fragmented spells to wizards, but corrupted ones repeat hexes and distort magic.
// Glyph Gnats: Tiny floating symbols that once assisted with spell transcription but now hover aimlessly. Corrupted versions scramble magical text, making spells unusable.
// Echo Husk Beetles: Beetles that absorb leftover magical energy from decayed ruins to sustain themselves. Corrupted versions latch onto living beings, disrupting mana flow




// corrupted pure magic entities

// Warped Tomeborns – Spells inside them have been rewritten into deadly, unstable hexes.
// Ink Corruptors – Ink Wings that now distort reality, turning words and symbols into chaotic glyphs.
// Fractured Lantern Wisps – Glitchy magical lights that flicker erratically, creating blinding illusions.
// Runebound Revenants – Twisted glyphs that act violently, creating unstable spell areas.
// Glass Shards – Broken pieces of formerly protective entities, now acting as razor-sharp barriers.
// Echo Distorters – Echoforms that now repeat incorrect or warped versions of spells, causing unpredictable effects
// Mana Leeches – Darkened sprites that steal magic instead of aiding it, draining spell energy from casters.













//Turn-Based AI Decision Process
// Define player and enemy objects
const player = {
    health: 100,
    maxHealth: 100,
    mana: 50,
    maxMana: 50,
    lastUsedSpell: null,
    spells: [
        { name: "Fire Bolt", damage: 15, manaCost: 10, type: "attack" },
        { name: "Ice Shard", damage: 10, manaCost: 5, type: "attack" },
        { name: "Healing Light", healingAmount: 25, manaCost: 20, type: "heal" },
        { name: "Arcane Surge", damage: 35, manaCost: 25, type: "attack" }
    ]
};

const enemy = {
    health: 100,
    maxHealth: 100,
    mana: 50,
    maxMana: 50,
    lastUsedSpell: null,
    spells: [
        { name: "Shadow Burst", damage: 15, manaCost: 10, type: "attack" },
        { name: "Lightning Pulse", damage: 10, manaCost: 5, type: "attack" },
        { name: "Dark Restoration", healingAmount: 25, manaCost: 20, type: "heal" },
        { name: "Void Strike", damage: 35, manaCost: 25, type: "attack" }
    ]
};

// AI decision-making
function enemyTurn() {
    let selectedSpell = null;

    // Step 1: Check if enemy needs to heal
    if (enemy.health <= enemy.maxHealth * 0.3 && enemy.lastUsedSpell !== "heal") {
        selectedSpell = enemy.spells.find(spell => spell.type === "heal");
    } else {
        // Step 2: Choose attack based on situation
        const availableSpells = enemy.spells.filter(spell => spell.name !== enemy.lastUsedSpell && spell.manaCost <= enemy.mana);
        
        if (player.health <= player.maxHealth * 0.3) {
            selectedSpell = availableSpells.find(spell => spell.damage >= 30); // Prioritize high damage attack
        }
        
        if (!selectedSpell) {
            selectedSpell = availableSpells[Math.floor(Math.random() * availableSpells.length)]; // Random fallback
        }
    }

    executeAbility(enemy, selectedSpell);
}

// Function to execute a spell
function executeAbility(entity, spell) {
    if (!spell) {
        console.log(`${entity === player ? "Player" : "Enemy"} has no valid spell to use.`);
        return;
    }

    if (spell.type === "attack") {
        console.log(`${entity === player ? "Player" : "Enemy"} uses ${spell.name}, dealing ${spell.damage} damage.`);
        entity === player ? enemy.health -= spell.damage : player.health -= spell.damage;
    } else if (spell.type === "heal") {
        console.log(`${entity === player ? "Player" : "Enemy"} uses ${spell.name}, restoring ${spell.healingAmount} HP.`);
        entity.health += spell.healingAmount;
        if (entity.health > entity.maxHealth) entity.health = entity.maxHealth;
    }

    entity.mana -= spell.manaCost;
    entity.lastUsedSpell = spell.name;
    
    // Step 4: Mana regen
    entity.mana += Math.floor(entity.maxMana * 0.25); // 25% mana regen
    if (entity.mana > entity.maxMana) entity.mana = entity.maxMana;

    checkGameOver();
}

// Check for game over
function checkGameOver() {
    if (player.health <= 0) {
        console.log("Game Over! You lost.");
    } else if (enemy.health <= 0) {
        console.log("Victory! You defeated the enemy.");
    }
}

// Example battle turn simulation
enemyTurn();