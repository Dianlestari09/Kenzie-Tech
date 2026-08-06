document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Navbar Sticky Effect on Scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // 3. Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default submission
            
            let isValid = true;
            
            // Get inputs
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const successMsg = document.getElementById('formSuccess');

            // Reset validation states
            [name, email, subject, message].forEach(input => {
                input.classList.remove('is-invalid');
            });
            successMsg.style.display = 'none';

            // Validate Name
            if (name.value.trim() === '') {
                name.classList.add('is-invalid');
                isValid = false;
            }

            // Validate Email (Basic Regex)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '' || !emailPattern.test(email.value)) {
                email.classList.add('is-invalid');
                isValid = false;
            }

            // Validate Subject
            if (subject.value.trim() === '') {
                subject.classList.add('is-invalid');
                isValid = false;
            }

            // Validate Message
            if (message.value.trim() === '') {
                message.classList.add('is-invalid');
                isValid = false;
            }

            // If valid, simulate send
            if (isValid) {
                // Here you would typically send data to a backend via fetch/XHR
                // For demonstration, we just show the success message and reset
                
                // Simulate button loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerText;
                submitBtn.innerText = 'Mengirim...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    
                    // Show success
                    successMsg.style.display = 'block';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                    }, 5000);
                }, 1500); // simulate 1.5s network delay
            }
        });

        // Remove invalid class on input
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.classList.contains('is-invalid')) {
                    input.classList.remove('is-invalid');
                }
            });
        });
    }

    // 4. Lightbox Modal for Images
    const stepImages = document.querySelectorAll('.step-img, .card img, .image-content img');
    if (stepImages.length > 0) {
        // Create modal elements
        const modal = document.createElement('div');
        modal.className = 'lightbox-modal';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';
        
        const modalImg = document.createElement('img');
        modalImg.className = 'lightbox-content';
        
        modal.appendChild(closeBtn);
        modal.appendChild(modalImg);
        document.body.appendChild(modal);

        // Open modal on image click
        stepImages.forEach(img => {
            img.style.cursor = 'zoom-in'; // Added cursor style for UX
            img.addEventListener('click', () => {
                modalImg.src = img.src;
                modal.classList.add('active');
            });
        });

        // Close modal on close button click
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});
