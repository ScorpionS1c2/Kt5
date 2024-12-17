const images = document.querySelectorAll('.draggable');
let scale = 1;

images.forEach(image => {
    image.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const offsetX = touch.clientX - image.getBoundingClientRect().left;
        const offsetY = touch.clientY - image.getBoundingClientRect().top;

        const moveAt = (pageX, pageY) => {
            image.style.transform = `translate(${pageX - offsetX}px, ${pageY - offsetY}px) scale(${scale})`;
        };

        const onMouseMove = (e) => {
            moveAt(e.touches[0].clientX, e.touches[0].clientY);
        };

        const onTouchEnd = () => {
            document.removeEventListener('touchmove', onMouseMove);
            document.removeEventListener('touchend', onTouchEnd);
        };

        document.addEventListener('touchmove', onMouseMove);
        document.addEventListener('touchend', onTouchEnd);
    });
});

// Масштабирование
window.addEventListener('wheel', (e) => {
    e.preventDefault();
    scale += e.deltaY * -0.01;
    scale = Math.min(Math.max(0.5, scale), 3); // ограничение масштаба
    images.forEach(image => {
        image.style.transform = `scale(${scale})`;
    });
});