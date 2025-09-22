// ボタンがクリックされたときに実行される関数（URL遷移用）
function openNewWindow(urlToOpen) {
    // 別ウィンドウ（新しいタブ）でURLを開く
    // URLが空の場合は何もしないか、エラーメッセージを表示することも可能
    if (urlToOpen) {
        window.open(urlToOpen, '_blank');
    } else {
        console.log('URLが指定されていません'); // 開発者向けコンソールに表示
        // alert('現在、このリンクは利用できません。'); // ユーザー向けにアラートを表示する場合
    }
}

let displayedDayIndex; // 表示されている曜日を追跡するための変数 (0=日, 1=月, ...)
let showAllClasses = false; // 講義を全て表示するかのフラグ
let isForcedDisplay = false; // 曜日が強制的に表示されているかのフラグ

function updateDayDisplay() {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    const dayElement = document.getElementById('current-day');
    // displayedDayIndexは表示中の曜日を保持
    const dayName = days[displayedDayIndex]; 

    if (isForcedDisplay) {
        dayElement.textContent = `${dayName}曜日（強制表示中）`;
    } else {
        dayElement.textContent = `${dayName}曜日`;
    }
}

// 汎用的なメニュー表示関数
function showMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu) {
        menu.style.display = 'flex';
    }
}

// 汎用的なメニュー非表示関数
function hideMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu) {
        menu.style.display = 'none';
        // 講義室番号入力メニューの場合、入力フィールドをクリアする
        if (menuId === 'classroomNumberMenu') {
            document.getElementById('classroomNumberInput').value = '';
        }
    }
}

// Constants for localStorage
const DONT_SHOW_TODAY_KEY = 'chibatech_dont_show_today';

// Function to show the welcome overlay
function showWelcomeOverlay() {
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    if (welcomeOverlay) {
        welcomeOverlay.style.display = 'flex';
    }
}

// Function to hide the welcome overlay
function hideWelcomeOverlay() {
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    if (welcomeOverlay) {
        const dontShowTodayCheckbox = document.getElementById('dontShowTodayCheckbox');
        if (dontShowTodayCheckbox && dontShowTodayCheckbox.checked) {
            // Set a flag in localStorage that expires at the end of today
            const now = new Date();
            // Midnight of tomorrow
            const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0); 
            localStorage.setItem(DONT_SHOW_TODAY_KEY, endOfToday.getTime().toString());
        }
        welcomeOverlay.style.display = 'none';
        // チェックボックスの状態をリセット
        if (dontShowTodayCheckbox) dontShowTodayCheckbox.checked = false;
    }

}

// 講義室番号を送信する関数
function submitClassroomNumber() {
    const classroomNumber = document.getElementById('classroomNumberInput').value;
    // 'admin' をBase64エンコードした文字列 'YWRtaW4=' と比較
    if (classroomNumber === atob('YWRtaW4=')) {
        hideMenu('classroomNumberMenu'); // 講義室指定メニューを閉じる
        showMenu('adminMenu'); // 管理メニューを開く
    } else if (classroomNumber) {
        const url = `https://attendance.is.it-chiba.ac.jp/attendance/class_room/${classroomNumber}`;
        openNewWindow(url); // 指定されたURLを開く
        hideMenu('classroomNumberMenu'); // メニューを閉じる
    } else {
        alert('講義室番号を入力してください。'); // 番号が入力されていない場合
    }
}

// 表示する曜日を設定し、セクション表示を更新する関数
// eventオブジェクトを受け取るように修正
function setDisplayedDay(event, day) {
    event.stopPropagation(); // イベント伝播を停止
    isForcedDisplay = true; // 強制表示フラグを立てる
    showWeekdaySections(day); // セクション表示を更新
    updateDayDisplay(); // 曜日表示を更新
    updateClassVisibility(); // 表示を即時更新
    // メニューを閉じる処理に遅延を追加
    setTimeout(() => hideMenu('adminMenu'), 100); // 遅延を100ミリ秒に調整
}

// 表示を今日の曜日に戻す関数
// eventオブジェクトを受け取るように修正
function resetDisplayedDay(event) {
    event.stopPropagation(); // イベント伝播を停止
    isForcedDisplay = false; // 強制表示フラグを解除
    showWeekdaySections(); // セクション表示を今日の曜日に戻す
    updateDayDisplay(); // 曜日表示を更新
    updateClassVisibility(); // 表示を即時更新
    // メニューを閉じる処理に遅延を追加
    setTimeout(() => hideMenu('adminMenu'), 100); // 遅延を100ミリ秒に調整
}

// ウェルカムオーバーレイを次回アクセス時に再表示する
function resetWelcomeOverlay() {
    localStorage.removeItem(DONT_SHOW_TODAY_KEY);
    alert('ウェルカムメッセージが次回アクセス時に再表示されます。');
}

// ウェルカムオーバーレイを今すぐ表示する
function showWelcomeOverlayNow() {
    hideMenu('adminMenu');
    // 少し遅延させて表示
    setTimeout(showWelcomeOverlay, 150);
}

// 管理メニューの「管理モード」トグルを処理する関数
function toggleAdminMode(isChecked) {
    const body = document.body;
    const adminMenuButton = document.getElementById('adminMenuButton');
    const adminOptions = document.querySelectorAll('.admin-option');
    const adminIndicator = document.getElementById('admin-mode-indicator');

    if (isChecked) {
        body.classList.add('admin-mode-active');
        if (adminMenuButton) adminMenuButton.style.display = 'inline-block';
        adminOptions.forEach(el => el.classList.remove('disabled'));
        if (adminIndicator) adminIndicator.style.display = 'block';
    } else {
        body.classList.remove('admin-mode-active');
        if (adminMenuButton) adminMenuButton.style.display = 'none';
        adminOptions.forEach(el => el.classList.add('disabled'));
        if (adminIndicator) adminIndicator.style.display = 'none';

        // 管理モードがOFFになったら、講義全表示もOFFにする
        const showAllToggle = document.getElementById('showAllClassesToggle');
        if (showAllToggle && showAllToggle.checked) {
            showAllToggle.checked = false;
            toggleShowAllClasses(false); // 状態をリセット
        }

        // 強制表示も解除する
        if (isForcedDisplay) {
            isForcedDisplay = false;
            showWeekdaySections(); // 引数なしで呼び出し、今日の曜日に戻す
            updateDayDisplay();
            updateClassVisibility(); // 表示を更新
        }
    }
}

// 管理メニューの「講義全表示」トグルを処理する関数
function toggleShowAllClasses(isChecked) {
    showAllClasses = isChecked;
    updateClassVisibility(); // 表示を即時更新
}

// 曜日ごとのセクションを表示する関数
// dayToShowが指定された場合はその曜日のセクションを表示、それ以外は現在の曜日のセクションを表示
function showWeekdaySections(dayToShow) {
    const today = new Date();
    // dayToShowが指定されていればその曜日を使用、そうでなければ現在の曜日を使用
    displayedDayIndex = (dayToShow !== undefined) ? dayToShow : today.getDay();

    // 全ての曜日セクションと週末メッセージを非表示にする
    document.querySelectorAll('.weekday-sections').forEach(section => {
        section.style.display = 'none';
    });

    // 指定された曜日または現在の曜日に対応するセクションを表示する
    switch (displayedDayIndex) {
        case 1: // 月曜日
            document.getElementById('mondaySections').style.display = 'flex';
            break;
        case 2: // 火曜日
            document.getElementById('tuesdaySections').style.display = 'flex';
            break;
        case 3: // 水曜日
            document.getElementById('wednesdaySections').style.display = 'flex';
            break;
        case 4: // 木曜日
            document.getElementById('thursdaySections').style.display = 'flex';
            break;
        case 5: // 金曜日
            document.getElementById('fridaySections').style.display = 'flex';
            break;
        case 6: // 土曜日
            document.getElementById('saturdaySections').style.display = 'flex'; // 土曜日セクションを表示
            break;
        default: // 日曜日 (dayOfWeek === 0)
            document.getElementById('sundaySections').style.display = 'block'; // 日曜日メッセージを表示
            break;
    }
}

// 個々のコースのHTML要素を生成する関数
function createCourseElement(course) {
    const template = document.getElementById('course-card-template');
    const clone = template.content.cloneNode(true);

    const container = clone.querySelector('.content-container');
    const timeP = clone.querySelector('.course-time');
    const title = clone.querySelector('h1');
    const button = clone.querySelector('.transition-button');

    // course.time (e.g., "09:00 - 11:00") から開始時刻をパースしてdata属性に保存
    const startTimeStr = course.time.split(' - ')[0];
    container.dataset.startTime = startTimeStr;

    timeP.textContent = course.time;
    title.textContent = course.name;

    if (course.action.type === 'directLink') {
        button.onclick = () => openNewWindow(course.action.value);
    } else if (course.action.type === 'menu') {
        // メニューデータをボタンに紐付けて、クリック時に動的生成する
        button.onclick = () => createAndShowMenu(course.action);
    }

    return container;
}

// メニューを動的に生成して表示する関数
function createAndShowMenu(menuData) {
    const existingMenu = document.getElementById(menuData.menuId);
    if (existingMenu) {
        existingMenu.remove();
    }

    const template = document.getElementById('choice-menu-template');
    const clone = template.content.cloneNode(true);

    const menuOverlay = clone.querySelector('.menu-overlay');
    const title = clone.querySelector('h2');
    const grid = clone.querySelector('.class-buttons-grid');
    const closeButton = clone.querySelector('.close-menu-button');

    menuOverlay.id = menuData.menuId;
    title.textContent = menuData.title;

    // 各選択肢ボタンを作成
    menuData.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.name;
        if (option.disabled || !option.url) {
            button.classList.add('grayed-out-button');
        } else {
            button.onclick = () => openNewWindow(option.url);
        }
        grid.appendChild(button);
    });

    closeButton.onclick = () => hideDynamicMenu(menuData.menuId);

    // オーバーレイクリックで閉じる
    menuOverlay.addEventListener('click', function(event) {
        if (event.target === menuOverlay) {
            hideDynamicMenu(menuData.menuId);
        }
    });

    // bodyに追加して表示
    document.body.appendChild(clone);
    menuOverlay.style.display = 'flex';
}

// 動的に生成されたメニューを削除する関数
function hideDynamicMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu) {
        menu.remove();
    }
}

// ページ読み込み時にコース情報を読み込んで表示する
async function loadAllCourses() {
    const days = {
        'monday': 'mondaySections',
        'tuesday': 'tuesdaySections',
        'wednesday': 'wednesdaySections',
        'thursday': 'thursdaySections',
        'friday': 'fridaySections',
        'saturday': 'saturdaySections',
        'sunday': 'sundaySections'
    };

    // 各曜日のJSONを並行して読み込む
    const promises = Object.entries(days).map(async ([day, sectionId]) => {
        try {
            const response = await fetch(`data/${day}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const courses = await response.json();
            const sectionElement = document.getElementById(sectionId);
            
            if (sectionElement) {
                sectionElement.innerHTML = ''; // 既存の内容をクリア
                courses.forEach(course => {
                    const courseElement = createCourseElement(course);
                    sectionElement.appendChild(courseElement);
                });
                // 講義がない場合、または時間外の場合に表示するメッセージを常に追加
                const noClassMessage = document.createElement('p');
                noClassMessage.className = 'no-class-message';
                noClassMessage.textContent = 'この時間に出欠登録できる講義はありません';
                noClassMessage.style.display = 'none'; // 初期状態では非表示
                sectionElement.appendChild(noClassMessage);
            }
        } catch (error) {
            console.error(`Could not load courses for ${day}:`, error);
            const sectionElement = document.getElementById(sectionId);
            if(sectionElement) {
                sectionElement.innerHTML = '<p>講義情報の読み込みに失敗しました。</p>';
            }
        }
    });

    await Promise.all(promises);
}

// Function to check localStorage and show welcome overlay if needed
function checkAndShowWelcomeOverlay() {
    const storedValue = localStorage.getItem(DONT_SHOW_TODAY_KEY);
    if (storedValue) {
        const expirationTime = parseInt(storedValue, 10);
        const now = new Date().getTime();
        if (now < expirationTime) {
            // It's still today, don't show the overlay
            return;
        } else {
            // Expiration time passed, clear the flag
            localStorage.removeItem(DONT_SHOW_TODAY_KEY);
        }
    }
    showWelcomeOverlay(); // If no flag or flag expired, show the overlay
}

// 時間に基づいて講義の表示・非表示を切り替える関数
function updateClassVisibility() {
    const now = new Date();
    const todayIndex = now.getDay();
    const daysMap = ['sundaySections', 'mondaySections', 'tuesdaySections', 'wednesdaySections', 'thursdaySections', 'fridaySections', 'saturdaySections'];
    const sectionId = daysMap[displayedDayIndex];
    const sectionElement = document.getElementById(sectionId);

    if (!sectionElement) return;

    const courses = sectionElement.querySelectorAll('.content-container');
    const noClassMessage = sectionElement.querySelector('.no-class-message');
    let visibleCoursesCount = 0;

    // 「講義全表示」がONの場合
    if (showAllClasses) {
        courses.forEach(course => {
            course.style.display = 'flex';
        });
        visibleCoursesCount = courses.length;
    }
    // 「講義全表示」がOFFで、かつ表示中の曜日が今日の場合
    else if (displayedDayIndex === todayIndex) {
        courses.forEach(course => {
            const startTimeStr = course.dataset.startTime;
            if (!startTimeStr) {
                course.style.display = 'flex';
                visibleCoursesCount++;
                return;
            }

            const [startHour, startMinute] = startTimeStr.split(':').map(Number);
            const classStartTime = new Date(now);
            classStartTime.setHours(startHour, startMinute, 0, 0);
            const displayStartTime = new Date(classStartTime);
            displayStartTime.setMinutes(classStartTime.getMinutes() - 30);
            const displayEndTime = new Date(classStartTime);
            displayEndTime.setHours(classStartTime.getHours() + 1);

            if (now >= displayStartTime && now <= displayEndTime) {
                course.style.display = 'flex';
                visibleCoursesCount++;
            } else {
                course.style.display = 'none';
            }
        });
    }
    // 「講義全表示」がOFFで、かつ表示中の曜日が今日でない場合
    else {
        courses.forEach(course => {
            course.style.display = 'none';
        });
        visibleCoursesCount = 0;
    }

    // 表示可能な講義が一つもない場合にメッセージを表示
    if (noClassMessage) {
        noClassMessage.style.display = (visibleCoursesCount === 0) ? 'block' : 'none';
    }
}

// ページ読み込み時に実行
window.onload = function() {
    // 汎用的な初期化処理
    initializeHamburgerMenu();
    initializeOverlayClosers();

    // メインページ（講義一覧ページ）でのみ実行する初期化処理
    if (document.getElementById('mondaySections')) {
        initializeMainPage();
    }
};

async function initializeMainPage() {
    await loadAllCourses(); // JSONからコース情報を読み込んで表示
    showWeekdaySections(); // 曜日ごとのセクションを切り替え、displayedDayIndexを初期化
    updateDayDisplay(); // 曜日表示を初期化
    
    // 初期状態で管理メニューのオプションを無効化
    document.querySelectorAll('.admin-option').forEach(el => el.classList.add('disabled'));

    updateClassVisibility(); // ページ読み込み時に一度実行
    checkAndShowWelcomeOverlay(); // ウェルカムオーバーレイの表示をチェック
    setInterval(updateClassVisibility, 30000); // 30秒ごとに表示を更新
}

function initializeHamburgerMenu() {
    // ハンバーガーメニューの制御
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const siteHeader = document.querySelector('.site-header');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation(); // bodyのクリックイベントに伝播させない
            const isActive = mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive);
        });

        // メニュー外をクリックしたら閉じる
        document.body.addEventListener('click', (event) => {
            // メニューが開いていて、クリックがメニュー内でもヘッダー内でもない場合
            if (mainNav.classList.contains('active') && !mainNav.contains(event.target) && !siteHeader.contains(event.target)) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

function initializeOverlayClosers() {
    // 各メニューオーバーレイがクリックされたらメニューを閉じるイベントリスナー
    const menuOverlays = document.querySelectorAll('.menu-overlay');
    menuOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(event) {
            // メニューコンテンツ自体をクリックした場合は閉じない
            // welcomeOverlayは背景クリックで閉じないようにする
            if (event.target === overlay && overlay.id !== 'welcomeOverlay') {
                hideMenu(overlay.id);
            }
        });
    });
}
