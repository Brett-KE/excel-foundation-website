document.addEventListener("DOMContentLoaded", function () {
    fetch("assets/data/events.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(events => {
            console.log("Loaded Events:", events);
            displayEvents(events);
        })
        .catch(error => console.error("Error loading events:", error));
});


function displayEvents(events) {
    const eventsContainer = document.querySelector(".events-container");

    if (!eventsContainer) {
        console.error("Events container not found!");
        return;
    }

    let currentYear = "";
    let eventsHTML = "";

    events.forEach(event => {
        const eventYear = new Date(event.date).getFullYear();

        // Add year divider if the year changes
        if (eventYear !== currentYear) {
            if (currentYear !== "") {
                eventsHTML += `</div>`; // Close previous events-grid div
            }
            eventsHTML += `<h2 class="year-divider">${eventYear}</h2>`;
            eventsHTML += `<div class="events-grid">`;
            currentYear = eventYear;
        }

        // Handle missing image
        const eventImage = event.image ? event.image : "assets/images/default-event.jpg";

        // Event card HTML
        eventsHTML += `
            <div class="event-card" onclick="openEventPage('${event.id}')">
                <img src="${eventImage}" alt="${event.title}">
                <div class="event-details">
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-meta">${event.date} | ${event.location}</p>
                    <p class="event-meta"><strong>Theme:</strong> ${event.theme}</p>
                    <a href="event-details.html?id=${event.id}" class="view-more-btn">View More</a>
                </div>
            </div>
        `;
    });

    // Close the last events-grid div
    if (currentYear !== "") {
        eventsHTML += `</div>`;
    }

    eventsContainer.innerHTML = eventsHTML;
}

// Function to navigate to an event's detailed page
function openEventPage(eventId) {
    window.location.href = `event-details.html?id=${eventId}`;
}
