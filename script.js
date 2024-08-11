document.addEventListener("DOMContentLoaded", function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const fullscreenToggle = document.getElementById('fullscreen-toggle');
    const slideshowToggle = document.getElementById('slideshow-toggle');
    const images = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;
    let slideshowInterval;

    // Captions array for the images
    const captions = [
        "Bright lights and vibrant vibes",
        "Endless horizons and tranquil waves",
        "A warm cup and a moment of peace",
        "Adding life and color with every leaf",
        "Striding through life's journey in style!",
        "Nature’s little surprises",
        "Embracing the glow of the city lights.",
        "Where neon dreams meet real-life moments",
        "Joy in every toothy grin",
        "See the world through a different lens",
        "Where the river dances over rocks",
        "Majestic peaks and endless skies",
        "Nature’s cheerful little bloom",
        "Where the earth meets the heavens"
    ];

    function showImage(index) {
        if (index >= 0 && index < images.length) {
            lightboxImg.src = images[index].src;
            captionText.innerHTML = captions[index] || ""; // Show caption if it exists
            currentIndex = index;
            lightbox.style.display = 'block';
        }
    }

    images.forEach((item, index) => {
        item.addEventListener('click', function() {
            showImage(index);
        });
    });

    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
        stopSlideshow();
    });

    prevBtn.addEventListener('click', function() {
        showImage(currentIndex - 1);
    });

    nextBtn.addEventListener('click', function() {
        showImage(currentIndex + 1);
    });

    fullscreenToggle.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            lightbox.requestFullscreen();
            lightbox.classList.add('fullscreen-enabled');
        } else {
            document.exitFullscreen();
            lightbox.classList.remove('fullscreen-enabled');
        }
    });

    slideshowToggle.addEventListener('click', function() {
        if (slideshowInterval) {
            stopSlideshow();
        } else {
            startSlideshow();
        }
    });

    function startSlideshow() {
        slideshowToggle.innerHTML = '&#10074;&#10074;'; // Pause icon
        slideshowInterval = setInterval(function() {
            showImage((currentIndex + 1) % images.length);
        }, 3000);
    }

    function stopSlideshow() {
        slideshowToggle.innerHTML = '&#9654;'; // Play icon
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }

    document.addEventListener('keydown', function(event) {
        if (lightbox.style.display === 'block') {
            if (event.key === 'ArrowLeft') {
                showImage(currentIndex - 1);
            } else if (event.key === 'ArrowRight') {
                showImage(currentIndex + 1);
            } else if (event.key === 'Escape') {
                lightbox.style.display = 'none';
                stopSlideshow();
            } else if (event.key === 'f') {
                fullscreenToggle.click();
            }
        }
    });
});
