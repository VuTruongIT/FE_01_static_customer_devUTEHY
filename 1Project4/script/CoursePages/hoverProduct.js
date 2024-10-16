// Lấy phần tử hình ảnh
const courseImg = document.getElementById('course-Img');

// Thay đổi hình ảnh khi hover vào thẻ div
document.querySelector('.Product-Course').addEventListener('mouseover', function() {
    // courseImg.src = 'img/imgCoursePages/CC-BackEnd-NodeJS.png'; // Đường dẫn đến hình ảnh thay thế
});

// Trở lại hình ảnh ban đầu khi không hover
document.querySelector('.Product-Course').addEventListener('mouseout', function() {
    courseImg.src = 'img/imgCoursePages/BackEnd-NodeJS.png'; // Đường dẫn đến hình ảnh gốc
});
