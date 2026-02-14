const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const heartContainer = document.getElementById('heart-container');
const shyText = document.getElementById('shy-text');
const container = document.querySelector('.container');

// Sound effect (optional, maybe later)

// Move "No" button on hover
noBtn.addEventListener('mouseover', () => {
    moveNoButton();
});

// Also move on click/focus just in case
noBtn.addEventListener('click', () => {
    moveNoButton();
});

function moveNoButton() {
    // Get container dimensions
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    // Calculate max limits within the container
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;

    let newX, newY;
    let overlap = true;
    let attempts = 0;

    // Try to find a non-overlapping position
    while (overlap && attempts < 50) {
        newX = Math.random() * maxX;
        newY = Math.random() * maxY;

        // Create a temporary rect for the new position (relative to viewport for comparison)
        // Since newX/newY are relative to container, we need to convert them to viewport coordinates OR convert yesRect to container logic.
        // Easier: Check overlap in container coordinates.

        // Yes button position relative to container
        const yesLeft = yesRect.left - containerRect.left;
        const yesTop = yesRect.top - containerRect.top;

        // Check for intersection with padding
        const padding = 10; // Extra space around Yes button

        if (
            newX < yesLeft + yesRect.width + padding &&
            newX + btnRect.width > yesLeft - padding &&
            newY < yesTop + yesRect.height + padding &&
            newY + btnRect.height > yesTop - padding
        ) {
            overlap = true;
        } else {
            overlap = false;
        }
        attempts++;
    }

    noBtn.style.position = 'absolute';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';

    // Ensure size doesn't change by setting fixed width/height if needed, 
    // but white-space: nowrap in CSS should handle most cases.
    // Explicitly setting width helps too.
    if (!noBtn.style.width) {
        noBtn.style.width = btnRect.width + 'px';
    }

    shyText.style.opacity = '1';
}

// "Yes" button click
yesBtn.addEventListener('click', () => {
    heartContainer.classList.add('show');
    yesBtn.innerHTML = "Yay! 💖";

    // Confetti effect or something? Keeping it simple first.
    // Hide "No" button as requested again
    noBtn.style.display = 'none';
    shyText.textContent = "I knew it! 🥰";
    shyText.style.opacity = '1';
});
