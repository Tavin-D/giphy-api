console.log("script.js loaded");

const apiKey = "A3yldSECPQKSIaRwapQZUQNcUgFWob4r";
const gifContainer = document.querySelector("#gif-container");
const searchInput = document.querySelector("#search-input");

async function getGifs(searchTerm = "football") {
    try {
        gifContainer.innerHTML = "<p>Loading GIFs...</p>";

        const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=12&rating=g`;

        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error("The Giphy request failed.");
        }

        const data = await response.json();

        const images = data.data.map(gif => ({
            url: gif.images.original.url,
            title: gif.title || "GIF"
        }));

        console.log(images);
        displayGifs(images);

    } catch (error) {
        console.error("Error fetching GIFs:", error);
        gifContainer.innerHTML = "<p>Could not load GIFs. Check your API key and try again.</p>";
    }
}

function displayGifs(images) {
    gifContainer.innerHTML = "";

    if (images.length === 0) {
        gifContainer.innerHTML = "<p>No GIFs found. Try another search.</p>";
        return;
    }

    images.forEach(gif => {
        gifContainer.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <img src="${gif.url}" alt="${gif.title}" class="img-fluid rounded">
            </div>
        `;
    });
}

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const searchTerm = searchInput.value.trim();

        if (searchTerm) {
            getGifs(searchTerm);
        }
    }
});

getGifs();