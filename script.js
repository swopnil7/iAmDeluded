window.addEventListener('DOMContentLoaded', function() {
    const sections = [
        { id: 'intro', btn: 'btn-intro' },
        { id: 'skills', btn: 'btn-skills' },
        { id: 'projects', btn: 'btn-projects' },
        { id: 'contact', btn: 'btn-contact' }
    ];
    
    function setActiveButton() {
        let maxVisible = null;
        let maxVisibleArea = 0;
        for (const s of sections) {
            const section = document.getElementById(s.id);
            if (section) {
                const rect = section.getBoundingClientRect();
                const visibleTop = Math.max(rect.top, 0);
                const visibleBottom = Math.min(rect.bottom, document.documentElement.clientHeight);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);
                if (visibleHeight > maxVisibleArea) {
                    maxVisibleArea = visibleHeight;
                    maxVisible = s;
                }
            }
        }
        for (const s of sections) {
            const btn = document.getElementById(s.btn);
            if (btn) {
                if (maxVisible && s.id === maxVisible.id) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            }
        }
    }

    window.addEventListener('scroll', setActiveButton);
    window.addEventListener('resize', setActiveButton);
    setActiveButton();
});

document.addEventListener('DOMContentLoaded', function () {
    const holder = document.querySelector('.project-holder');
    if (!holder) return;

    let animationId = null;
    let direction = 0; // -1 for left, 1 for right, 0 for none
    const edgeZone = 80; // px from edge to trigger scroll
    const scrollSpeed = 3; // px per frame

    function scrollStep() {
        if (direction !== 0) {
            holder.scrollLeft += direction * scrollSpeed;
            animationId = requestAnimationFrame(scrollStep);
        }
    }

    holder.addEventListener('mousemove', (e) => {
        const rect = holder.getBoundingClientRect();
        const x = e.clientX - rect.left;

        if (x > rect.width - edgeZone) {
            direction = 1; // Scroll right
        } else if (x < edgeZone) {
            direction = -1; // Scroll left
        } else {
            direction = 0;
        }

        if (direction !== 0 && !animationId) {
            animationId = requestAnimationFrame(scrollStep);
        }
        if (direction === 0 && animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    });

    holder.addEventListener('mouseleave', () => {
        direction = 0;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    });
});