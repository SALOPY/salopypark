document.addEventListener('DOMContentLoaded', () => {
    const lightboxLinks = document.querySelectorAll('.lightbox');
    const modal = document.createElement('div');
    modal.classList.add('lightbox-modal');
    document.body.appendChild(modal);

    let currentIndex = 0;
    const totalImages = lightboxLinks.length;

    function showImage(index) {
        const imgSrc = lightboxLinks[index].href;
        modal.innerHTML = `
            <span class="nav-arrow left">&lt;</span>
            <img src="${imgSrc}" alt="Lightbox Image">
            <span class="nav-arrow right">&gt;</span>
        `;
        modal.style.display = 'block';

        const leftArrow = modal.querySelector('.nav-arrow.left');
        const rightArrow = modal.querySelector('.nav-arrow.right');

        // 左箭头点击事件
        leftArrow.addEventListener('click', (event) => {
            event.stopPropagation();
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            showImage(currentIndex);
        });

        // 右箭头点击事件
        rightArrow.addEventListener('click', (event) => {
            event.stopPropagation();
            currentIndex = (currentIndex + 1) % totalImages;
            showImage(currentIndex);
        });
    }

    lightboxLinks.forEach((link, index) => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            currentIndex = index;
            showImage(currentIndex);
        });
    });

    // 点击模态窗口关闭
    modal.addEventListener('click', function(event) {
        if (event.target.tagName !== 'IMG' && !event.target.classList.contains('nav-arrow')) {
            modal.style.display = 'none';
        }
    });

    function generateRandomGIFs() {
        const gifContainer = document.getElementById('random-gifs');
        const gifCount = 5; // 你想随机添加的 GIF 数量
        const gifs = [
            'path/to/gif1.gif',
            'path/to/gif2.gif',
            'path/to/gif3.gif'
            // 添加更多 GIF 路径
        ];

        for (let i = 0; i < gifCount; i++) {
            const gif = document.createElement('img');
            gif.src = gifs[Math.floor(Math.random() * gifs.length)];
            gif.style.top = Math.random() * 80 + 'vh'; // 随机生成高度（防止 GIF 位于页面底部）
            gif.style.left = Math.random() * 90 + 'vw'; // 随机生成宽度（防止 GIF 超出页面边界）
            gifContainer.appendChild(gif);
        }
    }

    // 页面加载时生成 GIF
    window.onload = generateRandomGIFs;
});
