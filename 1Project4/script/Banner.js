
//Menu Công Nghệ di chuyển auto
const menu = document.querySelector('.menuCongNghe');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

let autoScrollInterval;

function scrollToLeft() {
  menu.scrollBy({
    left: -100, // Số pixel để cuộn về phía trái
    behavior: 'smooth'
  });
  setTimeout(updateArrows, 300); // Đảm bảo cập nhật sau khi cuộn
}

function scrollToRight() {
  menu.scrollBy({
    left: 100, // Số pixel để cuộn về phía phải
    behavior: 'smooth'
  });
  setTimeout(updateArrows, 300); // Đảm bảo cập nhật sau khi cuộn
}

function updateArrows() {
  // Kiểm tra xem có phải ở đầu danh sách không
  if (menu.scrollLeft === 0) {
    leftArrow.classList.add('hidden'); // Ẩn nút trái khi ở đầu
  } else {
    leftArrow.classList.remove('hidden'); // Hiển thị lại nút trái khi cuộn
  }

  // Kiểm tra xem có phải ở cuối danh sách không
  if (menu.scrollLeft + menu.clientWidth >= menu.scrollWidth) {
    rightArrow.classList.add('hidden'); // Ẩn nút phải khi ở cuối
  } else {
    rightArrow.classList.remove('hidden'); // Hiển thị lại nút phải
  }
}

function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    if (menu.scrollLeft + menu.clientWidth >= menu.scrollWidth) {
      // Nếu đến cuối thì quay lại đầu
      menu.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      // Nếu chưa đến cuối thì tiếp tục cuộn sang phải
      menu.scrollBy({ left: 100, behavior: 'smooth' });
    }
  }, 2000); // 3 giây mỗi lần cuộn
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval); // Dừng cuộn
}

// Bắt đầu cuộn tự động sau khi trang tải
startAutoScroll();

// Lắng nghe sự kiện cuộn để kiểm tra vị trí cuộn và cập nhật các nút
menu.addEventListener('scroll', updateArrows);

// Lắng nghe sự kiện di chuột vào để dừng cuộn
menu.addEventListener('mouseenter', stopAutoScroll);

// Lắng nghe sự kiện di chuột ra để tiếp tục cuộn
menu.addEventListener('mouseleave', startAutoScroll);

// Gọi hàm updateArrows ban đầu để thiết lập trạng thái của các nút
updateArrows();
