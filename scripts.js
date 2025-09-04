document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const fadeElements = document.querySelectorAll(".fade-in");
    const columnLeft = document.querySelector(".column-left");
    const columnRight = document.querySelector(".column-right");
    const skillItems = document.querySelectorAll(".skill-item");
    const skillsSection = document.getElementById("skills");
    const menuBolha = document.querySelector('.menu-bolha');
    const menuFlutuante = document.querySelector('.menu-flutuante');
    const contactItems = document.querySelectorAll(".contact p");
    const typingSection = document.querySelector(".motivacional");
    const typingLines = document.querySelectorAll(".typing-line");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add("visible");
                else entry.target.classList.remove("visible");
            });
        },
        { threshold: 0.2 }
    );
    fadeElements.forEach(el => observer.observe(el));

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const speed = 0.2;
        if(columnLeft) columnLeft.style.transform = `translateY(${400 - scrollY*speed}px)`;
        if(columnRight) columnRight.style.transform = `translateY(${-50 + scrollY*speed}px)`;
    });

    const observerSkills = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    const skillsArray = Array.from(skillItems);

                    skillsArray.forEach(item => {
                        const randX = Math.random();
                        const randY = Math.random();
                        const randR = Math.random();
                        item.style.setProperty('--randX', randX);
                        item.style.setProperty('--randY', randY);
                        item.style.setProperty('--randR', randR);
                        item.classList.add('scatter');
                    });

                    setTimeout(() => {
                        skillsArray.forEach(item => {
                            item.classList.remove('scatter');
                            item.style.opacity = '1';
                        });
                    }, 500);
                }
            });
        },
        { threshold: 0.3 }
    );
    if(skillsSection) observerSkills.observe(skillsSection);

    window.addEventListener('scroll', () => {
        if(window.scrollY > 100){
            header.classList.add('nav-mini');
        } else {
            header.classList.remove('nav-mini');
            menuFlutuante.classList.remove('active');
        }
    });

    menuBolha.addEventListener('click', () => {
        menuFlutuante.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
        if(!menuFlutuante.contains(e.target) && !menuBolha.contains(e.target)){
            menuFlutuante.classList.remove('active');
        }
    });

    document.querySelectorAll('.project-card video').forEach(video => {
        video.addEventListener('click', () => {
            if(video.paused) video.play();
            else video.pause();
        });
    });
   
    const typeSpeed = 45;
    const initialDelay = 500;

    if(typingSection){
        const observerTyping = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting){
                        let totalDelay = initialDelay;
                        typingLines.forEach(line => {
                            const text = line.dataset.original || line.textContent;
                            line.dataset.original = text;
                            line.textContent = "";

                            setTimeout(() => {
                                let i = 0;
                                function type() {
                                    if(i < text.length){
                                        line.textContent += text.charAt(i);
                                        i++;
                                        setTimeout(type, typeSpeed);
                                    }
                                }
                                type();
                            }, totalDelay);

                            totalDelay += text.length * typeSpeed + 300;
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );
        observerTyping.observe(typingSection);
    }
   
    const observerContact = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    let delay = 0;
                    contactItems.forEach(item => {
                        item.style.transitionDelay = `${delay}s`;
                        item.classList.add("visible");
                        delay += 0.1;
                    });
                } else {
                    contactItems.forEach(item => item.classList.remove("visible"));
                }
            });
        },
        { threshold: 0.3 }
    );
    if(contactItems.length > 0) observerContact.observe(contactItems[0].parentElement);
});

