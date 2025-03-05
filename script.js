document.addEventListener("DOMContentLoaded", function () {
    var bookSlotBtn = document.getElementById("book-slot-btn");
    var bookingPopup = document.getElementById("booking-popup");
    var closePopupBtn = document.getElementById("close-popup-btn");
    var form = document.getElementById("appointment-form");
    var formInputs = document.querySelectorAll("#appointment-form input");

    // Function to show the popup
    bookSlotBtn.addEventListener("click", function () {
        bookingPopup.classList.remove("hidden");
    });

    // Function to hide the popup
    closePopupBtn.addEventListener("click", function () {
        bookingPopup.classList.add("hidden");
    });

    // Function to pause animation
    function pauseAnimation() {
        bookingPopup.classList.add("paused");
    }

    // Function to resume animation
    function resumeAnimation() {
        bookingPopup.classList.remove("paused");
    }

    // Event listener for form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        pauseAnimation();
        setTimeout(function () {
            var messageDiv = document.getElementById("message");
            messageDiv.innerHTML = "Appointment booked successfully!";
            messageDiv.style.color = "green";
            form.reset();
            resumeAnimation();
        }, 1000);
    });

    // Pause animation when any form input is focused
    formInputs.forEach(function (input) {
        input.addEventListener("focus", pauseAnimation);
        input.addEventListener("blur", resumeAnimation);
    });
});
