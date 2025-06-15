// Store the currently selected character type
let currentCharacterType = 'mermaid'; // Default character type

// Function to load images for a specific category
async function loadCategoryImages(category) {
    // console.log(`Loading ${category} images for ${currentCharacterType}`); // Debug log
    const basePath = 'assets/images/character';

    try {
        // Fetch the JSON file
        const response = await fetch(`character-images.json`);
        const data = await response.json();

        // Get the assets container
        const assetsContainer = document.querySelector('.theme-character-creator__assets');

        // Clear existing content
        assetsContainer.innerHTML = '';

        // If it's the base category, show all character types
        if (category === 'base') {
            const characterTypes = ['mermaid', 'vampire', 'demon'];
            characterTypes.forEach(type => {
                const baseFiles = data[type].base.files;
                if (baseFiles.length > 0) {
                    baseFiles.forEach(file => {
                        const singleDiv = document.createElement('div');
                        singleDiv.className = 'theme-character-creator__assets-single';

                        const img = document.createElement('img');
                        img.src = `${basePath}/${type}/base/${file}`;
                        img.alt = `${type} base`;
                        img.dataset.characterType = type;

                        img.addEventListener('click', () => {
                            // Update the current character type
                            currentCharacterType = type;
                            // Update the character preview
                            updateCharacterPreview(category, file, type);
                            // Update the active button style
                            document.querySelectorAll('.theme-character-creator__assets-single img').forEach(img => {
                                img.parentElement.classList.remove('active');
                            });
                            singleDiv.classList.add('active');
                        });

                        singleDiv.appendChild(img);
                        assetsContainer.appendChild(singleDiv);
                    });
                }
            });
        } else {
            // For other categories, show files for the current character type
            const categoryFiles = data[currentCharacterType][category].files;

            categoryFiles.forEach(file => {
                const singleDiv = document.createElement('div');
                singleDiv.className = 'theme-character-creator__assets-single';

                const img = document.createElement('img');
                img.src = `${basePath}/${currentCharacterType}/${category}/${file}`;
                img.alt = file.replace('.png', '');

                img.addEventListener('click', () => {
                    updateCharacterPreview(category, file, currentCharacterType);
                    // Update the active button style
                    document.querySelectorAll('.theme-character-creator__assets-single img').forEach(img => {
                        img.parentElement.classList.remove('active');
                    });
                    singleDiv.classList.add('active');
                });

                singleDiv.appendChild(img);
                assetsContainer.appendChild(singleDiv);
            });
        }

    } catch (error) {
        console.error(`Error loading ${category} images:`, error);
    }
}

function updateCharacterPreview(category, file, characterType) {
    const characterContainer = document.querySelector('.theme-character-creator__character');
    const basePath = 'assets/images/character';

    // If it's the base category, clear all existing images
    if (category === 'base') {
        characterContainer.innerHTML = '';
    }

    const existingImg = characterContainer.querySelector(`img[data-category="${category}"]`);
    if (existingImg) {
        existingImg.remove();
    }

    // Create and add new image
    const img = document.createElement('img');
    img.src = `${basePath}/${characterType}/${category}/${file}`;
    img.alt = file.replace('.png', '');
    img.setAttribute('data-category', category);
    characterContainer.appendChild(img);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded'); // Debug log

    const buttons = document.querySelectorAll('.theme-character-creator__buttons .theme-btn');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            const category = button.textContent.toLowerCase();

            if (category === 'done') return;

            buttons.forEach(btn => btn.classList.remove('active'));

            button.classList.add('active');

            loadCategoryImages(category);
        });
    });

    // Load base images by default
    loadCategoryImages('base');
});

document.querySelector(".doneBtn").addEventListener("click", () => {
    const previewBox = document.querySelector(".theme-character-creator__character");

    html2canvas(previewBox).then(canvas => {
        const link = document.createElement("a");
        link.download = "your-character.png";
        link.href = canvas.toDataURL();
        link.click();
        alert("Character saved as PNG!");
    }).catch(err => {
        console.error("Failed to save character as PNG:", err);
        alert("Failed to save character as PNG. Please try again.");
    });
});
