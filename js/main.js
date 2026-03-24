/* 
 * NeoMeso - 滚动触发动画脚本
 * 版本：1.0
 * 最后更新：2026-03-23
 * 说明：元素进入视口时触发进入动画
 */

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
});

// 初始化滚动触发动画
function initScrollAnimations() {
    // 获取所有需要滚动触发的元素
    const scrollElements = document.querySelectorAll('.scroll-animate, .card, .product-card, .field-card, .coming-soon, .download-card, .team-card');
    
    // 添加初始类
    scrollElements.forEach(element => {
        if (!element.classList.contains('scroll-animate')) {
            element.classList.add('scroll-animate');
        }
    });
    
    // 使用 Intersection Observer API 监听元素是否进入视口
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 添加延迟实现阶梯动画效果
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100); // 每个元素延迟 100ms
                
                // 动画只触发一次，取消观察
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // 元素可见 10% 时触发
        rootMargin: '0px 0px -50px 0px' // 距离底部 50px 时触发
    });
    
    // 开始观察所有元素
    scrollElements.forEach(element => {
        observer.observe(element);
    });
}

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// 导航栏滚动效果
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    const currentScroll = window.pageYOffset;
    
    // 添加阴影效果
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// 卡片悬停时的微光效果增强
document.querySelectorAll('.card, .product-card, .field-card, .nav-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // 计算鼠标位置相对于卡片中心的偏移
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const offsetX = (x - centerX) / 20;
        const offsetY = (y - centerY) / 20;
        
        // 应用微妙的 3D 倾斜效果
        card.style.transform = `perspective(1000px) rotateX(${-offsetY}deg) rotateY(${offsetX}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});
