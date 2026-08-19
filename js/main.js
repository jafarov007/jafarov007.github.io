// Main JS - GSAP, ScrollTrigger, Lenis, Neural Canvas, i18n & Interactive Terminal

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. TYPEWRITER DECLARATIONS (Defined first to avoid hoist errors)
    // ==========================================
    const typingTextEl = document.getElementById('typing-text');
    let typeTimeout = null;
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let currentLang = localStorage.getItem('site_lang') || 'en';

    const titlesByLang = {
        en: [
            "AI & Cyber Security Researcher",
            "Software Vulnerability Detection Specialist",
            "MSc Computer Engineer & Hacker",
            "Embedded Systems & Firmware Developer (C/C++, Rust)"
        ],
        tr: [
            "Yapay Zeka ve Siber Güvenlik Araştırmacısı",
            "Yazılım Zafiyet Tespiti Uzmanı",
            "Yüksek Mühendis & Hacker",
            "Gömülü Sistemler ve Donanım Geliştirici (C/C++, Rust)"
        ],
        az: [
            "Süni İntellekt və Kibertəhlükəsizlik Tədqiqatçısı",
            "Proqram Təminatı Zəiflik Analitiki",
            "Kompüter Mühəndisi (MSc) & Hacker",
            "Quraşdırılmış Sistemlər Mühəndisi (C/C++, Rust)"
        ]
    };

    function typeStep() {
        if (!typingTextEl) return;
        const phrases = titlesByLang[currentLang] || titlesByLang.en;
        if (phraseIdx >= phrases.length) phraseIdx = 0;
        const currentPhrase = phrases[phraseIdx];

        if (isDeleting) {
            typingTextEl.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typingTextEl.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = isDeleting ? 35 : 75;

        if (!isDeleting && charIdx === currentPhrase.length) {
            isDeleting = true;
            speed = 2200; // Pause at full text
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx++;
            speed = 400;
        }

        typeTimeout = setTimeout(typeStep, speed);
    }

    function restartTypewriter() {
        if (typeTimeout) clearTimeout(typeTimeout);
        phraseIdx = 0;
        charIdx = 0;
        isDeleting = false;
        if (typingTextEl) typeStep();
    }


    // ==========================================
    // 2. LENIS SMOOTH SCROLL & GSAP INTEGRATION
    // ==========================================
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);


    // ==========================================
    // 3. MULTI-LANGUAGE SYSTEM (EN / TR / AZ)
    // ==========================================
    const I18N = {
        en: {
            nav_about: "About",
            nav_education: "Education",
            nav_expertise: "Expertise",
            nav_research: "Research & Projects",
            nav_htb: "HTB Badges",
            nav_contact: "Contact",
            
            hero_badge: "AI & CYBERSECURITY RESEARCHER",
            hero_name: "ABDUL JAFAROV",
            hero_bio_short: "Continuous learner, researcher, and builder exploring the intersection of Artificial Intelligence, Deep Learning, and Cybersecurity.",
            btn_projects: "Explore Research",
            btn_cv: "Download CV",
            btn_contact: "Contact",

            side_bio: "AI & Cybersecurity Researcher | Hacker & Embedded Systems Enthusiast. Continuous learner, researcher, and builder.",
            side_htb_title: "Research & Open Source",
            side_htb_rarity: "2 academic papers (GNN models) · vulnerability detection & open source projects",
            side_quick_stats: "QUICK STATS",
            stat_degree: "MSc Computer Engineering",
            stat_specialty: "Explainable AI & Security",

            sec_about_title: "< About Me />",
            sec_about_desc: "Passionate AI and Cybersecurity Engineer focused on developing explainable deep learning models for software vulnerability detection, automated exploit analysis, and hardware security. Blending academic research with hands-on offensive security.",

            sec_edu_title: "< Education />",
            edu_msc_title: "MSc in Computer Engineering",
            edu_msc_school: "Istanbul Technical University / Advanced AI Research",
            edu_msc_date: "2024 - 2026",
            edu_msc_desc: "Focusing on Graph Neural Networks, Transformer Architectures (CodeBERT, Gemma), and Multi-Modal AI models for vulnerability identification.",
            edu_bsc_title: "BSc in Computer Engineering",
            edu_bsc_school: "Baku State University / Computer Science Department",
            edu_bsc_date: "2020 - 2024",
            edu_bsc_desc: "Core algorithms, operating systems, embedded hardware development, data structures, and network security protocols.",

            sec_exp_title: "< Expertise & Technologies />",
            exp_ai_title: "AI & Deep Learning",
            exp_sec_title: "Cyber Security & Ethical Hacking",
            exp_emb_title: "Embedded Systems & Hardware",
            exp_py_title: "Python & System Automation",

            sec_achieve_title: "< Achievements & Certifications />",
            htb_aws_title: "Respected by AWS — AWS Fortress Completed",
            htb_aws_desc: "Completed the AWS Fortress challenge on Hack The Box. Placed among the top 0.04% of global users.",
            htb_view_badge: "Verify HTB",
            htb_view_profile: "HTB Profile",
            icpc_title: "ICPC Northern Eurasia Finals — Honorable Mention",
            icpc_desc: "Awarded Honorable Mention in the 2020 ICPC Northern Eurasia Regional Finals for advanced algorithmic problem solving and competitive programming.",

            sec_pub_title: "< Research & Publications />",
            pub_badge_conf: "INTERNATIONAL CONFERENCE",
            pub_conf_title: "Graphormer and CodeBERT-Based Hybrid Vulnerability Detection",
            pub_conf_desc: "Novel hybrid model leveraging Graphormer structure-aware embeddings and CodeBERT token semantics to detect deep security flaws in source code.",
            
            pub_badge_journal: "RESEARCH PAPER",
            pub_journal_title: "VuldGemma: An Explainable Multi-Modal Approach for Software Vulnerability Detection",
            pub_journal_desc: "Multi-modal explainable LLM/GNN framework providing precise attention heatmaps and evidence graphs for vulnerability predictions.",

            proj_badge_metasploit: "METASPLOIT MODULE • PR #21616",
            proj_flowise_title: "Flowise RCE Module & Session Security (Metasploit PR #21616)",
            proj_flowise_desc: "Official Metasploit Framework exploit module (Pull Request #21616) targeting authenticated RCE and session security bypass vectors.",

            proj_badge_lab: "CYBER SECURITY LAB",
            proj_lab_title: "JafarovSecLab — Interactive Exploitation Suite",
            proj_lab_desc: "Comprehensive multi-scenario laboratory featuring XSS, IDOR, SSRF, SSTI, and privilege escalation vectors.",

            sec_contact_title: "< Interactive Terminal & Contact />",
            term_welcome: "Type 'help' or 'contact' to interact with JafarovSecLab Terminal CLI.",
            term_prompt_hint: "Commands: help | skills | htb | publications | contact | clear",

            footer_copy: "© 2026 Abdul Jafarov. Engineered for GitHub Pages."
        },
        tr: {
            nav_about: "Hakkımda",
            nav_education: "Eğitim",
            nav_expertise: "Uzmanlıklar",
            nav_research: "Yayınlar & Projeler",
            nav_htb: "HTB Rozetleri",
            nav_contact: "İletişim",

            hero_badge: "YAPAY ZEKA VE SİBER GÜVENLİK ARAŞTIRMACISI",
            hero_name: "ABDUL JAFAROV",
            hero_bio_short: "Yapay Zeka, Derin Öğrenme ve Siber Güvenlik kesişiminde araştırmaya, üretmeye ve öğrenmeye devam eden bir siber güvenlik araştırmacısı & hacker.",
            btn_projects: "Yayınları İncele",
            btn_cv: "CV İndir",
            btn_contact: "İletişim",

            side_bio: "Yapay Zeka & Siber Güvenlik Araştırmacısı | Hacker & Gömülü Sistemler Sevdalısı. Araştırmaya, üretmeye ve öğrenmeye devam eden bir araştırmacı.",
            side_htb_title: "Araştırmalar & Açık Kaynak",
            side_htb_rarity: "2 akademik yayın (GNN modelleri) · zafiyet tespiti ve açık kaynak projeler",
            side_quick_stats: "HIZLI BİLGİLER",
            stat_degree: "Yüksek Mühendis (MSc)",
            stat_specialty: "Açıklanabilir YZ ve Güvenlik",

            sec_about_title: "< Hakkımda />",
            sec_about_desc: "Yazılım zafiyet tespiti, otomatik sızma testi araçları ve donanım güvenliği için açıklanabilir derin öğrenme modelleri geliştiren Yapay Zeka ve Siber Güvenlik Mühendisi. Akademik araştırmaları pratik sızma testi deneyimiyle birleştiriyorum.",

            sec_edu_title: "< Eğitim />",
            edu_msc_title: "Bilgisayar Mühendisliği Yüksek Lisans (MSc)",
            edu_msc_school: "İstanbul Teknik Üniversitesi / İleri YZ Araştırmaları",
            edu_msc_date: "2024 - 2026",
            edu_msc_desc: "Çizge Sinir Ağları (GNN), Transformer Mimarileri (CodeBERT, Gemma) ve Çok Modlu YZ modelleri üzerine zafiyet analizi araştırmaları.",
            edu_bsc_title: "Bilgisayar Mühendisliği Lisans (BSc)",
            edu_bsc_school: "Bakü Devlet Üniversitesi / Bilgisayar Bilimleri",
            edu_bsc_date: "2020 - 2024",
            edu_bsc_desc: "Temel algoritmalar, işletim sistemleri, gömülü sistem mimarileri, veri yapıları ve ağ güvenliği protokolleri.",

            sec_exp_title: "< Uzmanlıklar & Teknolojiler />",
            exp_ai_title: "Yapay Zeka & Derin Öğrenme",
            exp_sec_title: "Siber Güvenlik & Etik Hackerlık",
            exp_emb_title: "Gömülü Sistemler & Donanım",
            exp_py_title: "Python & Sistem Otomasyonu",

            sec_achieve_title: "< Başarılar & Sertifikalar />",
            htb_aws_title: "Respected by AWS — AWS Fortress",
            htb_aws_desc: "Hack The Box platformundaki AWS Fortress zafiyet meydan okumasını tamamladı. Dünya genelindeki kullanıcılar arasında %0.04'lük dilimde yer alıyor.",
            htb_view_badge: "HTB Başarısını Doğrula",
            htb_view_profile: "HTB Profilini İncele",
            icpc_title: "ICPC Northern Eurasia Finals — Honorable Mention",
            icpc_desc: "ICPC Kuzey Avrasya Bölge Finallerinde (NERC 2020) karmaşık algoritma ve veri yapıları problemlerini çözerek Onur Derecesi (Honorable Mention) kazandı.",

            sec_pub_title: "< Yayınlar & Araştırma Projeleri />",
            pub_badge_conf: "ULUSLARARASI KONFERANS",
            pub_conf_title: "Graphormer and CodeBERT-Based Hybrid Vulnerability Detection",
            pub_conf_desc: "Graphormer yapısal gömme teknikleri ve CodeBERT anlamsal vektörlerini birleştirerek kaynak kod zafiyetlerini tespit eden hibrit model.",

            pub_badge_journal: "AKADEMİK MAKALE",
            pub_journal_title: "VuldGemma: An Explainable Multi-Modal Approach for Software Vulnerability Detection",
            pub_journal_desc: "Yazılım zafiyet tahminleri için dikkat haritaları ve kanıt grafikleri sunan açıklanabilir çok modlu LLM/GNN mimarisi.",

            proj_badge_metasploit: "METASPLOIT MODÜLÜ • PR #21616",
            proj_flowise_title: "Flowise RCE Module & Session Security (Metasploit PR #21616)",
            proj_flowise_desc: "Resmi Metasploit Framework modülü (Pull Request #21616) — oturum güvenliği atlatma ve yetkili RCE sömürü vektörleri.",

            proj_badge_lab: "SİBER GÜVENLİK LABORATUVARI",
            proj_lab_title: "JafarovSecLab — İnteraktif Zafiyet Laboratuvarı",
            proj_lab_desc: "XSS, IDOR, SSRF, SSTI ve diğer web zafiyet senaryolarını içeren çok modüllü güvenlik laboratuvarı.",

            sec_contact_title: "< İnteraktif Terminal & İletişim />",
            term_welcome: "JafarovSecLab Terminal CLI ile etkileşim için 'help' veya 'contact' yazın.",
            term_prompt_hint: "Komutlar: help | skills | htb | publications | contact | clear",

            footer_copy: "© 2026 Abdul Jafarov. GitHub Pages için tasarlandı."
        },
        az: {
            nav_about: "Haqqımda",
            nav_education: "Təhsil",
            nav_expertise: "Bacarıqlar",
            nav_research: "Nəşrlər & Layihələr",
            nav_htb: "HTB Nişanları",
            nav_contact: "Əlaqə",

            hero_badge: "SÜNİ İNTELLEKT VƏ KİBERTƏHLÜKƏSİZLİK TƏDQİQATÇISI",
            hero_name: "ƏBDÜL CƏFƏROV",
            hero_bio_short: "Süni İntellekt, Dərin Öyrənmə və Kibertəhlükəsizlik sahəsində araşdırmağa, yaratmağa və öyrənməyə davam edən bir tədqiqatçı & hacker.",
            btn_projects: "Layihələri İncələ",
            btn_cv: "CV Yüklə",
            btn_contact: "Əlaqə",

            side_bio: "Süni İntellekt & Kibertəhlükəsizlik Tədqiqatçısı | Hacker & Quraşdırılmış Sistemlər Həvəskarı.",
            side_htb_title: "Tədqiqatlar & Açıq Mənbə",
            side_htb_rarity: "2 akademik nəşr (GNN modelləri) · zəiflik təyini və açıq mənbə layihələri",
            side_quick_stats: "QISA MƏLUMAT",
            stat_degree: "Kompüter Mühəndisliyi (MSc)",
            stat_specialty: "İzah Edilə Bilən Sİ və Təhlükəsizlik",

            sec_about_title: "< Haqqımda />",
            sec_about_desc: "Proqram təminatı zəifliklərinin təyini, avtomatlaşdırılmış sızma testi alətləri və avadanlıq təhlükəsizliyi üçün izah edilə bilən dərin öyrənmə modelləri hazırlayan Süni İntellekt mühəndisi.",

            sec_edu_title: "< Təhsil />",
            edu_msc_title: "Kompüter Mühəndisliyi Magistr (MSc)",
            edu_msc_school: "İstanbul Texnik Universiteti / İrəli Sİ Tədqiqatları",
            edu_msc_date: "2024 - 2026",
            edu_msc_desc: "Qraf Neuron Şəbəkələri (GNN), Transformer Mimariləri (CodeBERT, Gemma) üzrə zəiflik analizi.",
            edu_bsc_title: "Kompüter Mühəndisliyi Bakalavr (BSc)",
            edu_bsc_school: "Bakı Dövlət Universiteti / Kompüter Elmləri",
            edu_bsc_date: "2020 - 2024",
            edu_bsc_desc: "Əsas alqoritmlər, əməliyyat sistemləri, daxili sistemlər, məlumat strukturları və şəbəkə təhlükəsizliyi.",

            sec_exp_title: "< Bacarıqlar & Texnologiyalar />",
            exp_ai_title: "Süni İntellekt & Dərin Öyrənmə",
            exp_sec_title: "Kibertəhlükəsizlik & Etik Hakerlik",
            exp_emb_title: "Daxili Sistemlər & Avadanlıq",
            exp_py_title: "Python & Sistem Avtomatlaşdırılması",

            sec_achieve_title: "< Uğurlar & Sertifikatlar />",
            htb_aws_title: "Respected by AWS — AWS Fortress",
            htb_aws_desc: "Hack The Box platformasındakı AWS Fortress sınağını tamamlayıb. Qlobal istifadəçilər arasında ilk 0.04%-dədir.",
            htb_view_badge: "HTB Uğurunu Yoxla",
            htb_view_profile: "HTB Profilinə Bax",
            icpc_title: "ICPC Northern Eurasia Finals — Honorable Mention",
            icpc_desc: "ICPC Şimali Avrasiya Finallarında (NERC 2020) alqoritmlər və məlumat strukturları üzrə Fəxri Fərmana layiq görüldü.",

            sec_pub_title: "< Nəşrlər & Layihələr />",
            pub_badge_conf: "BEYNƏLXALQ KONFRANS",
            pub_conf_title: "Graphormer and CodeBERT-Based Hybrid Vulnerability Detection",
            pub_conf_desc: "Graphormer strukturu və CodeBERT mətn semantikasını birləşdirən zəiflik təyini modeli.",

            pub_badge_journal: "MƏQALƏ",
            pub_journal_title: "VuldGemma: An Explainable Multi-Modal Approach for Software Vulnerability Detection",
            pub_journal_desc: "Zəiflik proqnozları üçün diqqət xəritələri təqdim edən izah edilə bilən çoxmodallı LLM/GNN modeli.",

            proj_badge_metasploit: "METASPLOIT MODULU • PR #21616",
            proj_flowise_title: "Flowise RCE Module & Session Security (Metasploit PR #21616)",
            proj_flowise_desc: "Rəsmi Metasploit Framework modulu (Pull Request #21616) — RCE və seans təhlükəsizlik istismarı.",

            proj_badge_lab: "KİBERTƏHLÜKƏSİZLİK LABORATORİYASI",
            proj_lab_title: "JafarovSecLab — İnteraktiv Zəiflik Laboratoriyası",
            proj_lab_desc: "XSS, IDOR, SSRF, SSTI və digər təhlükəsizlik ssenarilərini ehtiva edən çoxmodullu laboratoriya.",

            sec_contact_title: "< İnteraktiv Terminal & Əlaqə />",
            term_welcome: "Əlaqə üçün 'help' və ya 'contact' daxil edin.",
            term_prompt_hint: "Əmrlər: help | skills | htb | publications | contact | clear",

            footer_copy: "© 2026 Abdul Jafarov. GitHub Pages üçün dizayn edilib."
        }
    };

    function applyLanguage(lang) {
        if (!I18N[lang]) lang = 'en';
        currentLang = lang;
        localStorage.setItem('site_lang', lang);

        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-400/50');
                btn.classList.remove('opacity-60');
            } else {
                btn.classList.remove('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-400/50');
                btn.classList.add('opacity-60');
            }
        });

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (I18N[lang][key]) {
                el.innerHTML = I18N[lang][key];
            }
        });

        document.querySelectorAll('.glitch-title').forEach(el => {
            if (I18N[lang]['hero_name']) {
                el.setAttribute('data-text', I18N[lang]['hero_name']);
            }
        });

        restartTypewriter();
    }

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.getAttribute('data-lang');
            applyLanguage(lang);
        });
    });

    applyLanguage(currentLang);



    // ==========================================
    // 5. ADVANCED GSAP SCROLLTRIGGER SEQUENCING
    // ==========================================
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {

        // ── 5.1 HERO TRANSITION: Fast & responsive left shift on scroll ──
        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "35% top",
                scrub: 0.1
            }
        })
        .to("#hero .avatar-ring", {
            x: -280,
            scale: 0.7,
            opacity: 0.2,
            ease: "power1.out"
        }, 0)
        .to("#hero h1, #hero p, #hero .inline-flex, #hero .animate-bounce", {
            x: -220,
            opacity: 0,
            scale: 0.85,
            stagger: 0.02,
            ease: "power1.out"
        }, 0);

        // ── 5.2 GSAP PINNED DECK CARD TRANSITION ──
        const splitTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#split-section",
                start: "top top+=80",
                end: "+=4200",          // 4200px total pin scroll distance
                pin: true,
                scrub: 1,
                anticipatePin: 1
            }
        });

        // Only expertise and htb-badges start hidden; about-block is visible by default
        gsap.set(["#expertise", "#htb-badges"], { opacity: 0, pointerEvents: "none" });

        // Timeline layout:
        // t=0→3   : about-block (About + Education) visible & held   (~930px reading)
        // t=3→4   : crossfade about-block OUT, expertise IN           (~310px transition)
        // t=4→7   : expertise visible & held                          (~930px reading)
        // t=7→8   : crossfade expertise OUT, htb-badges IN            (~310px transition)
        // t=8.3→13.5 : htb-badges visible & held before unpin         (~1600px generous dwell)

        // Crossfade 1: about-block → expertise
        splitTl
            .to("#about-block", { opacity: 0, y: -15, pointerEvents: "none", duration: 1, ease: "power1.inOut" }, 3)
            .to("#expertise",   { opacity: 1, y:   0, pointerEvents: "auto",  duration: 1, ease: "power1.inOut" }, 3.3);

        // Crossfade 2: expertise → htb-badges
        splitTl
            .to("#expertise",  { opacity: 0, y: -15, pointerEvents: "none", duration: 1, ease: "power1.inOut" }, 7)
            .to("#htb-badges", { opacity: 1, y:   0, pointerEvents: "auto",  duration: 1, ease: "power1.inOut" }, 7.3)
            // Hold htb-badges visible and pinned for a long comfortable scroll distance:
            .to("#htb-badges", { opacity: 1 }, 13.5);

        // ── 5.4 RESEARCH SECTION ──
        gsap.from("#research-projects-section .grid > div", {
            scrollTrigger: {
                trigger: "#research-projects-section",
                start: "top 98%",
                once: true
            },
            y: 25,
            opacity: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: "power2.out",
            clearProps: "all"
        });

        // ── 5.5 INTERACTIVE TERMINAL & CONTACT ──
        gsap.from("#contact", {
            scrollTrigger: {
                trigger: "#contact",
                start: "top 90%",
                once: true
            },
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            clearProps: "all"
        });
    });

    // Mobile fallback: Instant document flow, zero white space, ultra-fast 0.11s entrance
    mm.add("(max-width: 1023px)", () => {
        // Reset pinned deck cards to normal visible flow on mobile
        gsap.set(["#about-block", "#expertise", "#htb-badges"], {
            opacity: 1,
            pointerEvents: "auto",
            clearProps: "transform"
        });

        gsap.utils.toArray('#left-profile-sidebar, #about, #education, #expertise, #htb-badges, #research-projects-section, #contact').forEach((el) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 100%",
                    once: true
                },
                y: 4,
                opacity: 0,
                duration: 0.11,
                ease: "power1.out",
                clearProps: "all"
            });
        });
    });


    // ==========================================
    // 6. NEURAL NETWORK CANVAS ANIMATION
    // ==========================================
    const canvas = document.getElementById('neural-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            createParticles();
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                const isLight = document.body.classList.contains('light-mode');
                ctx.fillStyle = isLight ? 'rgba(2, 132, 199, 0.6)' : 'rgba(0, 229, 255, 0.6)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function createParticles() {
            particles = [];
            const count = Math.floor((width * height) / 14000);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function drawConnections() {
            const isLight = document.body.classList.contains('light-mode');
            const maxDist = 120;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.25;
                        ctx.strokeStyle = isLight
                            ? `rgba(2, 132, 199, ${alpha})`
                            : `rgba(0, 229, 255, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);
            for (let p of particles) {
                p.update();
                p.draw();
            }
            drawConnections();
            requestAnimationFrame(animateCanvas);
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animateCanvas();
    }


    // ==========================================
    // 7. INTERACTIVE TERMINAL CLI
    // ==========================================
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');
    const termForm = document.getElementById('terminal-form');

    function executeCommand(cmdStr) {
        if (!termOutput) return;
        const cmd = cmdStr.trim().toLowerCase();

        const cmdLine = document.createElement('div');
        cmdLine.className = 'text-cyan-400 my-1 font-mono';
        cmdLine.innerHTML = `<span class="text-rose-400">jafarov007@sec-lab:~$</span> ${cmd}`;
        termOutput.appendChild(cmdLine);

        let response = '';
        switch (cmd) {
            case 'help':
                response = `
<div class="text-slate-300">Available commands:</div>
<div class="grid grid-cols-2 gap-2 mt-1 text-xs">
  <div><span class="text-cyan-400">whoami</span> : Engineer bio</div>
  <div><span class="text-cyan-400">htb</span> : Hack The Box stats & AWS badge</div>
  <div><span class="text-cyan-400">skills</span> : Tech stack (AI, Security, Embedded C/C++/Rust, JS, PHP)</div>
  <div><span class="text-cyan-400">publications</span> : Research papers & Metasploit PR #21616</div>
  <div><span class="text-cyan-400">contact</span> : Email & profile links</div>
  <div><span class="text-cyan-400">clear</span> : Clear terminal screen</div>
</div>`;
                break;

            case 'whoami':
                response = `<div class="text-emerald-400">Abdul Jafarov (Əbdül Cəfərov) — AI & Cybersecurity Researcher, MSc Computer Engineer, Hacker, and Embedded Systems (C/C++, Rust, JS, PHP) Specialist. Continuous learner, researcher, and builder.</div>`;
                break;

            case 'htb':
                response = `
<div class="text-rose-400 font-bold">Hack The Box Credentials:</div>
<div class="text-slate-300">
  - Achievement: Respected by AWS (AWS Fortress Completed)<br>
  - Rarity: Top 0.04% of global users<br>
  - Earned Date: 04 Apr 2026<br>
  - Profile: https://profile.hackthebox.com/profile/019d212c-c348-7008-9069-35beb7cd9b38
</div>`;
                break;

            case 'skills':
                response = `
<div class="text-cyan-300 font-bold">Technical Stack & Domain Expertise:</div>
<div class="text-slate-300">
  [AI / Deep Learning] PyTorch, Graph Neural Networks (Graphormer, GNNs), CodeBERT, Gemma, Multi-Modal Learning<br>
  [Cybersecurity] Vulnerability Research, Exploit Development, Metasploit Framework (PR #21616), Pen Testing<br>
  [Embedded Systems] Raspberry Pi, Arduino, Microcontrollers, Firmware Dev (C/C++, Rust), Hardware Security<br>
  [Languages] Python, C/C++, Rust, JavaScript (JS), PHP, Bash/Shell, SQL
</div>`;
                break;

            case 'publications':
                response = `
<div class="text-cyan-300 font-bold">Academic Publications & Exploits:</div>
<div class="text-slate-300">
  1. Graphormer and CodeBERT-Based Hybrid Vulnerability Detection (Int. Conference)<br>
  2. VuldGemma: An Explainable Multi-Modal Approach for Software Vulnerability Detection<br>
  3. Metasploit Framework: Flowise RCE Module (Pull Request #21616)
</div>`;
                break;

            case 'contact':
                response = `
<div class="text-slate-300">
  - Email: jafarovabdul012@gmail.com<br>
  - GitHub: https://github.com/jafarov007<br>
  - LinkedIn: https://tr.linkedin.com/in/abdul-jafarov-4123b537a<br>
  - HTB Profile: https://profile.hackthebox.com/profile/019d212c-c348-7008-9069-35beb7cd9b38
</div>`;
                break;

            case 'clear':
                termOutput.innerHTML = '';
                return;

            case '':
                return;

            default:
                response = `<div class="text-rose-400">Command not found: '${cmd}'. Type 'help' for options.</div>`;
        }

        const respDiv = document.createElement('div');
        respDiv.className = 'mb-3 font-mono text-sm';
        respDiv.innerHTML = response;
        termOutput.appendChild(respDiv);
        termOutput.scrollTop = termOutput.scrollHeight;
    }

    if (termForm) {
        termForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (termInput) {
                executeCommand(termInput.value);
                termInput.value = '';
            }
        });
    }

    if (termInput && !termForm) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                executeCommand(termInput.value);
                termInput.value = '';
            }
        });
    }
});
