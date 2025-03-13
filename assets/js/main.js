document.addEventListener("DOMContentLoaded", function() {
    loadHTML("header.html", "#header");
    loadHTML("footer.html", "#footer");
});

function loadHTML(url, selector) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.querySelector(selector).innerHTML = data;
        })
        .catch(error => console.error(`Error loading ${url}:`, error));
}
