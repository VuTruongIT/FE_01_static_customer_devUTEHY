//hover ảnh Fotter
const image = document.getElementById('hover-image');
image.addEventListener('mouseover', function () {
  image.src = 'img/Dev-UTEHY-Fotter-ThayDoi.png'; 
});

image.addEventListener('mouseout', function () {
  image.src = 'img/Dev-UTEHY.png'; 
});