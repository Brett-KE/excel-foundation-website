document.addEventListener("DOMContentLoaded", function () {
    // Get the event ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("id");

    // Fetch event data (Modify to match your JSON file location)
    fetch("assets/data/events.json")
        .then(response => response.json())
        .then(events => {
            const event = events.find(e => e.id == eventId);

            if (!event) {
                document.querySelector(".event-details").innerHTML = "<p>Event not found.</p>";
                return;
            }

            // Populate Event Details
            document.getElementById("event-title").textContent = event.title || "No Title Available";
            document.getElementById("event-date").textContent = `📅 Date: ${event.date || "TBA"}`;
            document.getElementById("event-location").textContent = `📍 Location: ${event.location || "TBA"}`;
            document.getElementById("event-description").textContent = event.description || "No description available.";

            // Populate Gallery
            const galleryContainer = document.getElementById("event-gallery");

            if (event.gallery && event.gallery.length > 0) {
                let galleryHTML = "";
                event.gallery.forEach(image => {
                    galleryHTML += `<img src="${image}" alt="Event Image">`;
                });
                galleryContainer.innerHTML = galleryHTML;
            } else {
                galleryContainer.innerHTML = `<p>No images available for this event.</p>`;
            }
        })
        .catch(error => {
            console.error("Error loading event data:", error);
            document.querySelector(".event-details").innerHTML = "<p>Failed to load event details.</p>";
        });
});
