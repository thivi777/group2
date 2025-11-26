import { API_KEY } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {

    // ---------------- DOM Elements ----------------
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const generateBtn = document.getElementById("generateBtn");
    const ingredientsInput = document.getElementById("ingredients");
    const aiRecipeContainer = document.getElementById("aiRecipeCards");
    const carouselInner = document.querySelector("#recipeCarousel .carousel-inner");
    const carouselIndicators = document.querySelector(".carousel-indicators");

    // ---------------- Helper Functions ----------------
    // Capitalize first letter
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    // Update carousel with the latest recipe
    function updateCarousel(recipe) {
        if (!carouselInner) return;

        carouselInner.querySelectorAll(".carousel-item").forEach(item => item.classList.remove("active"));

        const carouselItem = document.createElement("div");
        carouselItem.className = "carousel-item active";
        carouselItem.innerHTML = `
            <img src="https://source.unsplash.com/1200x600/?${recipe.imageKeyword},food"
                 class="d-block w-100 carousel-img" alt="${recipe.title}">
            <div class="carousel-caption bg-light bg-opacity-75 rounded p-3">
                <h5>${recipe.title}</h5>
                <p>AI generated recipe for you!</p>
            </div>
        `;

        carouselInner.appendChild(carouselItem);

        if (carouselIndicators) {
            const indicatorBtn = document.createElement("button");
            indicatorBtn.type = "button";
            indicatorBtn.setAttribute("data-bs-target", "#recipeCarousel");
            indicatorBtn.setAttribute("data-bs-slide-to", carouselInner.children.length - 1);
            indicatorBtn.className = "rounded-circle";
            indicatorBtn.setAttribute("aria-label", `Slide ${carouselInner.children.length}`);
            carouselIndicators.appendChild(indicatorBtn);
        }
    }

    // ---------------- AI API ----------------
    async function fetchAIRecipe(promptText) {
        try {
            const body = {
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: `Generate a simple cooking recipe for: ${promptText}.
                        Return output in EXACT JSON format:
                        {
                            "title": "",
                            "ingredients": ["", "", ""],
                            "steps": ["", "", ""],
                            "imageKeyword": "",
                            "youtube": ""
                        }`
                    }
                ]
            };

            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            // Parse AI JSON output safely
            return JSON.parse(data.choices[0].message.content);
        } catch (err) {
            console.error("AI API Error:", err);
            alert("Failed to generate recipe. Try again.");
            return null;
        }
    }

    // ---------------- Generate Cards ----------------
    async function generateRecipes(queryList) {
        aiRecipeContainer.innerHTML = `<p class="text-center">⏳ Generating recipes...</p>`;

        for (let query of queryList) {
            const recipe = await fetchAIRecipe(query);
            if (recipe) {
                const carouselData = createRecipeCard(recipe);
                updateCarousel(carouselData);
            }
        }
        aiRecipeContainer.scrollIntoView({ behavior: "smooth" });
    }

    // ---------------- Event Listeners ----------------
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (!query) return alert("Please enter a recipe or ingredient!");
        generateRecipes([query]);
        searchInput.value = "";
    });

    generateBtn.addEventListener("click", () => {
        const query = ingredientsInput.value.trim();
        if (!query) return alert("Please enter ingredients!");
        const ingredients = query.split(",").map(i => i.trim());
        generateRecipes(ingredients);
        ingredientsInput.value = "";
    });

});
import { API_KEY } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {

    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const aiRecipeContainer = document.getElementById("aiRecipeCards");
    const carouselInner = document.querySelector("#recipeCarousel .carousel-inner");
    const carouselIndicators = document.querySelector(".carousel-indicators");

    // Safe JSON parser
    function safeParseJSON(str) {
        try {
            return JSON.parse(str);
        } catch {
            const match = str.match(/\{[\s\S]*\}/);
            return match ? JSON.parse(match[0]) : null;
        }
    }

    // Create a recipe card
    function createRecipeCard(recipe) {
        const colDiv = document.createElement("div");
        colDiv.className = "col-md-4";

        const cardDiv = document.createElement("div");
        cardDiv.className = "card ai-recipe-card shadow-sm h-100";

        cardDiv.innerHTML = `
            <img src="https://source.unsplash.com/400x300/?${recipe.imageKeyword || recipe.title},food"
                 class="card-img-top rounded" alt="${recipe.title}">
            <div class="card-body">
                <h5 class="card-title">${recipe.title}</h5>

                <h6>Ingredients:</h6>
                <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>

                <h6>Steps:</h6>
                <p>${recipe.steps.join("<br>")}</p>

                <a href="#" class="btn btn-accent mt-2">View Recipe</a>
            </div>
        `;

        colDiv.appendChild(cardDiv);
        aiRecipeContainer.innerHTML = ""; // clear previous
        aiRecipeContainer.appendChild(colDiv);

        setTimeout(() => cardDiv.classList.add("show"), 50);
        return { title: recipe.title, imageKeyword: recipe.imageKeyword || recipe.title };
    }

    // Update carousel
    function updateCarousel(recipe) {
        if (!carouselInner) return;
        carouselInner.innerHTML = ""; // clear old slides
        if (carouselIndicators) carouselIndicators.innerHTML = "";

        const carouselItem = document.createElement("div");
        carouselItem.className = "carousel-item active";
        carouselItem.innerHTML = `
            <img src="https://source.unsplash.com/1200x600/?${recipe.imageKeyword},food"
                 class="d-block w-100 carousel-img" alt="${recipe.title}">
            <div class="carousel-caption bg-light bg-opacity-75 rounded p-3">
                <h5>${recipe.title}</h5>
                <p>AI generated recipe for you!</p>
            </div>
        `;
        carouselInner.appendChild(carouselItem);
    }

    // Fetch recipe from AI
    async function fetchAIRecipe(promptText) {
        try {
            const body = {
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: `Generate one simple cooking recipe for: ${promptText}.
                        Return EXACT JSON:
                        {
                            "title": "",
                            "ingredients": ["", "", ""],
                            "steps": ["", "", ""],
                            "imageKeyword": "",
                            "youtube": ""
                        }`
                    }
                ]
            };

            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            const recipe = safeParseJSON(data.choices[0].message.content);

            // Fallback if AI fails
            if (!recipe) {
                return {
                    title: capitalize(promptText),
                    ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
                    steps: ["Step 1", "Step 2", "Step 3"],
                    imageKeyword: promptText,
                    youtube: ""
                };
            }

            return recipe;

        } catch (err) {
            console.error("AI API error:", err);
            // Always return fallback recipe
            return {
                title: capitalize(promptText),
                ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
                steps: ["Step 1", "Step 2", "Step 3"],
                imageKeyword: promptText,
                youtube: ""
            };
        }
    }

    // Generate single recipe
    async function generateRecipe(query) {
        aiRecipeContainer.innerHTML = `<p class="text-center">⏳ Generating recipe...</p>`;
        const recipe = await fetchAIRecipe(query);
        const carouselData = createRecipeCard(recipe);
        updateCarousel(carouselData);
    }

    // Event listener
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (!query) return alert("Please enter a recipe or ingredient!");
        generateRecipe(query);
        searchInput.value = "";
    });

});

