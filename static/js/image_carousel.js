document.addEventListener('DOMContentLoaded', function() {
    const imagesData = [
        { src: './static/images/prmbench_stem_1.jpg', alt: 'Image 1 Description' },
        { src: './static/images/prmbench_stem_2.jpg', alt: 'Image 2 Description' },
        { src: './static/images/prmbench_stem_3.jpg', alt: 'Image 3 Description' },
    ];

    let currentImageIndex = 0;
    let autoPlayInterval; // To store the interval ID for autoplay

    const carouselDisplay = document.getElementById('carousel-image-display');
    const prevArrow = document.getElementById('image-carousel-prev');
    const nextArrow = document.getElementById('image-carousel-next');
    const dotsContainer = document.getElementById('image-carousel-dots');

    const AUTO_PLAY_DELAY = 5000; // 5 seconds for autoplay (in milliseconds)

    // Function to render images and dots
    function renderCarousel() {
        carouselDisplay.innerHTML = ''; // Clear existing images
        dotsContainer.innerHTML = ''; // Clear existing dots

        imagesData.forEach((imageData, index) => {
            const img = document.createElement('img');
            img.src = imageData.src;
            img.alt = imageData.alt;
            img.classList.add('carousel-image');
            if (index === currentImageIndex) {
                img.classList.add('active');
            }
            // Make image itself clickable to advance
            img.addEventListener('click', () => showImage(currentImageIndex + 1));
            carouselDisplay.appendChild(img);

            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === currentImageIndex) {
                dot.classList.add('active');
            }
            dot.dataset.index = index; // Store index for click handling
            dot.addEventListener('click', () => showImage(index));
            dotsContainer.appendChild(dot);
        });
    }

    // Function to show a specific image
    function showImage(index) {
        // Calculate new index (looping)
        let newIndex = index;
        if (newIndex >= imagesData.length) {
            newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = imagesData.length - 1;
        }

        // Get all images and dots
        const allImages = carouselDisplay.querySelectorAll('.carousel-image');
        const allDots = dotsContainer.querySelectorAll('.dot');

        // Deactivate current image and dot
        if (allImages[currentImageIndex]) {
            allImages[currentImageIndex].classList.remove('active');
        }
        if (allDots[currentImageIndex]) {
            allDots[currentImageIndex].classList.remove('active');
        }

        // Activate new image and dot
        if (allImages[newIndex]) {
            allImages[newIndex].classList.add('active');
        }
        if (allDots[newIndex]) {
            allDots[newIndex].classList.add('active');
        }

        currentImageIndex = newIndex;

        // Reset autoplay timer when image changes
        resetAutoplay();
    }

    // Navigation functions
    function showNextImage() {
        showImage(currentImageIndex + 1);
    }

    function showPrevImage() {
        showImage(currentImageIndex - 1);
    }

    // Autoplay functions
    function startAutoplay() {
        autoPlayInterval = setInterval(showNextImage, AUTO_PLAY_DELAY);
    }

    function stopAutoplay() {
        clearInterval(autoPlayInterval);
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Event Listeners
    prevArrow.addEventListener('click', showPrevImage);
    nextArrow.addEventListener('click', showNextImage);

    // Initial render and start autoplay
    renderCarousel();
    startAutoplay(); // Start autoplay on load

    // Optional: Pause autoplay on hover over carousel, resume on mouse leave
    const carouselContainer = document.querySelector('.image-carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);
});