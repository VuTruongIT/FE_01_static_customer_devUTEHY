// Add product to cart with quantity
function addToCart(productName, productPrice, quantityId, productImage,buttonClick) {
    let ProductName = document.getElementById(productName)?.innerText;
    let ProductPrice = document.getElementById(productPrice)?.innerText;
    let ProductImage = document.getElementById(productImage).src;

    if (isInCart(productName)) {
        return; 
    }

    function convertCurrencyToInteger(currencyStr) {
        // Loại bỏ dấu $ và chuyển đổi thành số thực
        let floatValue = parseFloat(currencyStr.replace("$", ""));
        // Chuyển thành số nguyên
        return Math.floor(floatValue);
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push({
        name: ProductName,
        price: ProductPrice,
        quantity: parseInt(quantityId), 
        image: ProductImage,
        total: convertCurrencyToInteger(ProductPrice) * parseInt(quantityId)
    });

    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Disable the button after adding to cart
    disableButton(`${buttonClick}`);

    alert(productName + " has been added to your cart.");
}

//2
function isInCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.some(item => item.name === productName);
}


//3
function disableButton(buttonId) {
    let button = document.getElementById(buttonId);
    button.disabled = true;
    button.classList.add('loading');
    button.innerHTML = '<span class="spinner"></span>';
}

//4
document.addEventListener("DOMContentLoaded", function() {
    // Function to disable the button
    function disableButton(buttonId) {
        let button = document.getElementById(buttonId);
        button.disabled = true;
        button.classList.add('loading');
        button.innerHTML = '<span class="spinner"></span>';
    }

    // Function to check if the course exists in local storage
    function isCourseInLocalStorage(courseName) {
        const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
        return storedCourses.some(course => course.name === courseName);
    }

    // Get all course containers
    const courses = document.querySelectorAll('.Product-Course');
    
    // Loop through all courses and check if they are already in local storage
    courses.forEach((course, index) => {
        const courseNameElement = course.querySelector('.course-description');
        const courseName = courseNameElement.textContent.trim();

        // Check if the course is in local storage and disable the button if it is
        if (isCourseInLocalStorage(courseName)) {
            const buttonId = `btn-product-${index + 1}`;
            disableButton(buttonId);
        }
    });
});

// Function to add a course to the cart and local storage
function addToCart(courseNameId, priceId, quantity, imgId, buttonId) {
    const courseName = document.getElementById(courseNameId).textContent.trim();
    const price = document.getElementById(priceId).textContent.trim();
    const courseImage = document.getElementById(imgId).src; // Capture the image src
    
    // Get existing courses from local storage or initialize an empty array
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    
    // Create a new course object with name, price, quantity, and image
    const newCourse = {
        name: courseName,
        price: price,
        quantity: quantity,
        image: courseImage
    };
    
    // Add the new course to the stored courses array
    storedCourses.push(newCourse);
    
    // Save the updated array back to local storage
    localStorage.setItem('courses', JSON.stringify(storedCourses));
    
    // Disable the button
    disableButton(buttonId);
}
