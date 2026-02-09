async function fetchWorlds() {
    try {
        const response = await fetch('./data/worlds.json');
        const worlds = await response.json();
        const emberUnlocked = localStorage.getItem("unlocked_ember") === "true";

        // Logic to render the map UI based on the unlock flag
        worlds.forEach(world => {
            if (world.name === 'Ember') {
                if (!emberUnlocked) {
                    renderLockedEmber(); // Function to render Ember as locked
                } else {
                    renderUnlockedEmber(); // Function to render Ember as normal
                }
            } else {
                renderWorld(world);
            }
        });
    } catch (error) {
        console.error('Error fetching worlds:', error);
    }
}

function renderLockedEmber() {
    // Code to display Ember as locked (greyed out, lock icon, disable click)
}

function renderUnlockedEmber() {
    // Code to display Ember normally
}

function renderWorld(world) {
    // Code to render other worlds
}