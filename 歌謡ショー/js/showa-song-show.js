// ============================================
// WAOコーポレーション 50周年記念 全国縦断 昭和の名曲ショー
// Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // スムーズスクロール
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#ticket-form') { 
                if(href === '#ticket-form') e.preventDefault();
                return; 
            }
            e.preventDefault();
            const targetId = href;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // タブ切り替え機能
    const tabsContainer = document.getElementById('tabs-container');
    if (tabsContainer) {
        const tabButtons = tabsContainer.querySelectorAll('.tab-button');
        const tabPanes = tabsContainer.querySelectorAll('.tab-pane');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;

                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                tabPanes.forEach(pane => {
                    if (pane.id === tabId) {
                        pane.classList.remove('hidden');
                    } else {
                        pane.classList.add('hidden');
                    }
                });
            });
        });
    }

    // アコーディオン機能
    const accordionToggles = document.querySelectorAll('.accordion-toggle');
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const isOpen = content.classList.contains('open');

            document.querySelectorAll('.accordion-content.open').forEach(openContent => {
                if (openContent !== content) {
                    openContent.classList.remove('open');
                    const prevToggle = openContent.previousElementSibling;
                    if (prevToggle) {
                        const iconSpan = prevToggle.querySelector('span');
                        if (iconSpan) iconSpan.textContent = '+';
                    }
                }
            });

            content.classList.toggle('open');
            const iconSpan = toggle.querySelector('span');
            if (iconSpan) {
                if (isOpen) {
                    iconSpan.textContent = '+';
                } else {
                    iconSpan.textContent = '–';
                }
            }
        });
    });

    // スケジュールデータ
    const scheduleData = [
        { date: "5月10日", prefecture: "大阪", venue: "浪切ホール" },
        { date: "6月21日", prefecture: "栃木", venue: "栃木県総合文化センターメインホール1階" },
        { date: "6月27日", prefecture: "広島", venue: "ふくやま文化会館 リーデンローズ 大ホール1階" },
        { date: "7月4日", prefecture: "群馬", venue: "高崎文化会館" },
        { date: "7月11日", prefecture: "新潟", venue: "県民会館大ホール1階" },
        { date: "7月19日", prefecture: "宮城", venue: "東北大学100周年川内記念講堂(東北大学萩ホール)" },
        { date: "8月30日", prefecture: "秋田", venue: "あきた芸術劇場ミルハス 大ホール" },
        { date: "9月6日", prefecture: "福島", venue: "福島市音楽堂 大ホール" },
        { date: "9月12日", prefecture: "香川", venue: "レクザムホール(香川県県民ホール) 小ホール" },
        { date: "9月19日", prefecture: "新潟", venue: "りゅーとぴあ コンサートホール" },
        { date: "9月21日", prefecture: "徳島", venue: "あわぎんホール" },
        { date: "9月26日", prefecture: "大分", venue: "lichikoグランシアタ 音の泉ホール" },
        { date: "10月3日", prefecture: "和歌山", venue: "和歌山城ホール" },
        { date: "10月4日", prefecture: "大阪", venue: "住友生命いずみホール" },
        { date: "12月20日", prefecture: "岡山", venue: "岡山芸術総合劇場ハレノワ 大ホール1階席" }
    ];

    const filterSelect = document.getElementById('prefecture-filter');
    const scheduleList = document.getElementById('schedule-list');

    // 都道府県リストの生成
    const prefectures = [...new Set(scheduleData.map(item => item.prefecture))].sort();
    prefectures.forEach(pref => {
        const option = document.createElement('option');
        option.value = pref;
        option.textContent = pref;
        filterSelect.appendChild(option);
    });

    // スケジュールリストのレンダリング
    const renderSchedule = (filter) => {
        scheduleList.innerHTML = '';
        const filteredData = (filter === 'all') 
            ? scheduleData 
            : scheduleData.filter(item => item.prefecture === filter);

        if (filteredData.length === 0) {
            scheduleList.innerHTML = '<p class="text-center text-gray-500 text-lg p-6">選択された都道府県での開催予定は現在ありません。</p>';
            return;
        }

        filteredData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row items-stretch transition duration-300 hover:shadow-lg';
            card.style.borderWidth = '2px';
            card.style.borderStyle = 'solid';
            card.style.borderColor = '#D4AF37';
            card.style.background = 'rgba(107, 44, 61, 0.3)';
            card.style.backdropFilter = 'blur(10px)';
            card.innerHTML = `
                <div class="p-4 text-white text-center md:w-48 flex-shrink-0 flex flex-col justify-center schedule-card-date" style="background: linear-gradient(135deg, #6B2C3D 0%, #4A1E2A 100%);">
                    <div class="text-2xl font-bold" style="font-family: 'Mochiy Pop One', sans-serif; color: #D4AF37;">${item.date}</div>
                    <div class="text-lg font-medium" style="font-family: 'Kosugi Maru', sans-serif; color: #D4AF37;">${item.prefecture}</div>
                </div>
                <div class="p-4 sm:p-6 flex-grow flex items-center">
                    <h3 class="text-xl sm:text-2xl font-semibold" style="font-family: 'Kosugi Maru', sans-serif; color: #D4AF37;">${item.venue}</h3>
                </div>
                <div class="p-4 md:ml-auto flex items-center justify-center">
                    <a href="#ticket" class="text-sm font-medium py-2 px-5 rounded-full whitespace-nowrap transition-colors" style="background: linear-gradient(135deg, #B8860B 0%, #D4AF37 100%); color: #6B2C3D; font-family: 'Kosugi Maru', sans-serif; border: 2px solid #D4AF37; font-weight: bold;">チケット詳細</a>
                </div>
            `;
            scheduleList.appendChild(card);
        });
    };

    filterSelect.addEventListener('change', (e) => {
        renderSchedule(e.target.value);
    });

    renderSchedule('all');

    // ヘッダーのスクロール効果
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    });
});

