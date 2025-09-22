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

// 現在の曜日を取得して表示する関数
// この関数は常に今日の曜日を表示します
function displayCurrentDay() {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    const today = new Date();
    const dayOfWeek = today.getDay(); // 今日の曜日を取得
    const dayElement = document.getElementById('current-day');
    // 表示テキストを「X曜日」の形式に変更
    dayElement.textContent = `${days[dayOfWeek]}曜日`;
}

let displayedDayIndex; // 表示されている曜日を追跡するための変数 (0=日, 1=月, ...)
let showAllClasses = false; // 講義を全て表示するかのフラグ

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
    showWeekdaySections(day); // セクション表示を更新
    updateClassVisibility(); // 表示を即時更新
    // メニューを閉じる処理に遅延を追加
    setTimeout(() => hideMenu('adminMenu'), 100); // 遅延を100ミリ秒に調整
}

// 表示を今日の曜日に戻す関数
// eventオブジェクトを受け取るように修正
function resetDisplayedDay(event) {
    event.stopPropagation(); // イベント伝播を停止
    showWeekdaySections(); // セクション表示を今日の曜日に戻す
    updateClassVisibility(); // 表示を即時更新
    // メニューを閉じる処理に遅延を追加
    setTimeout(() => hideMenu('adminMenu'), 100); // 遅延を100ミリ秒に調整
}

// 管理メニューの「管理モード」トグルを処理する関数
function toggleAdminMode(isChecked) {
    const body = document.body;
    const adminMenuButton = document.getElementById('adminMenuButton');
    const adminOptionsWrapper = document.getElementById('adminOptionsWrapper');

    if (isChecked) {
        body.classList.add('admin-mode-active');
        if (adminMenuButton) adminMenuButton.style.display = 'inline-block';
        if (adminOptionsWrapper) adminOptionsWrapper.classList.remove('disabled');
    } else {
        body.classList.remove('admin-mode-active');
        if (adminMenuButton) adminMenuButton.style.display = 'none';
        if (adminOptionsWrapper) adminOptionsWrapper.classList.add('disabled');

        // 管理モードがOFFになったら、講義全表示もOFFにする
        const showAllToggle = document.getElementById('showAllClassesToggle');
        if (showAllToggle && showAllToggle.checked) {
            showAllToggle.checked = false;
            toggleShowAllClasses(false); // 状態をリセット
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
    const container = document.createElement('div');
    container.className = 'content-container';

    // course.time (e.g., "09:00 - 11:00") から開始時刻をパースしてdata属性に保存
    const startTimeStr = course.time.split(' - ')[0];
    container.dataset.startTime = startTimeStr;

    const timeContainer = document.createElement('div');
    timeContainer.className = 'left-aligned-container';
    const timeP = document.createElement('p');
    timeP.className = 'course-time';
    timeP.textContent = course.time;
    timeContainer.appendChild(timeP);

    const title = document.createElement('h1');
    title.textContent = course.name;

    const button = document.createElement('button');
    button.className = 'transition-button';
    button.textContent = '出欠登録';

    if (course.action.type === 'directLink') {
        button.onclick = () => openNewWindow(course.action.value);
    } else if (course.action.type === 'menu') {
        button.onclick = () => showMenu(course.action.value);
    }

    container.appendChild(timeContainer);
    container.appendChild(title);
    container.appendChild(button);

    return container;
}

// ページ読み込み時にコース情報を読み込んで表示する
async function loadAllCourses() {
    const days = {
        'monday': 'mondaySections',
        'tuesday': 'tuesdaySections',
        'wednesday': 'wednesdaySections',
        'thursday': 'thursdaySections',
        'friday': 'fridaySections',
        'saturday': 'saturdaySections'
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
                if (courses.length > 0) {
                    courses.forEach(course => {
                        const courseElement = createCourseElement(course);
                        sectionElement.appendChild(courseElement);
                    });
                    // 講義はあるが、時間外の場合に表示するメッセージを追加
                    const noClassMessage = document.createElement('p');
                    noClassMessage.className = 'no-class-message';
                    noClassMessage.textContent = '現在表示可能な講義はありません';
                    noClassMessage.style.display = 'none'; // 初期状態では非表示
                    sectionElement.appendChild(noClassMessage);
                } else {
                    // そもそも講義が一つもない場合
                    sectionElement.innerHTML = '<p>該当講義なし</p>';
                }
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

// 時間に基づいて講義の表示・非表示を切り替える関数
function updateClassVisibility() {
    const now = new Date();
    const todayIndex = now.getDay();

    // 表示中の曜日が今日でない、または「講義全表示」がONの場合、その曜日の講義をすべて表示する
    if (displayedDayIndex !== todayIndex || showAllClasses) {
        const visibleSection = document.querySelector('.weekday-sections[style*="display: flex"], .weekday-sections[style*="display: block"]');
        if (visibleSection) {
            const courses = visibleSection.querySelectorAll('.content-container');
            courses.forEach(course => {
                course.style.display = 'flex';
            });
            const noClassMessage = visibleSection.querySelector('.no-class-message');
            if (noClassMessage) {
                noClassMessage.style.display = 'none';
            }
        }
        return;
    }

    // 表示中の曜日が今日の場合、時間に基づいて表示を切り替える
    const daysMap = ['sundaySections', 'mondaySections', 'tuesdaySections', 'wednesdaySections', 'thursdaySections', 'fridaySections', 'saturdaySections'];
    const sectionId = daysMap[todayIndex];
    const sectionElement = document.getElementById(sectionId);

    if (!sectionElement) return;

    const courses = sectionElement.querySelectorAll('.content-container');
    let visibleCoursesCount = 0;

    courses.forEach(course => {
        const startTimeStr = course.dataset.startTime;
        if (!startTimeStr) {
            course.style.display = 'flex'; // data-start-timeがない場合は常に表示
            return;
        }

        const [startHour, startMinute] = startTimeStr.split(':').map(Number);

        const classStartTime = new Date(now);
        classStartTime.setHours(startHour, startMinute, 0, 0);

        // 表示開始時刻（講義開始30分前）
        const displayStartTime = new Date(classStartTime);
        displayStartTime.setMinutes(classStartTime.getMinutes() - 30);

        // 表示終了時刻（講義開始1時間後）
        const displayEndTime = new Date(classStartTime);
        displayEndTime.setHours(classStartTime.getHours() + 1);

        if (now >= displayStartTime && now <= displayEndTime) {
            course.style.display = 'flex';
            visibleCoursesCount++;
        } else {
            course.style.display = 'none';
        }
    });

    // 表示可能な講義が一つもない場合にメッセージを表示
    const noClassMessage = sectionElement.querySelector('.no-class-message');
    if (noClassMessage) {
        noClassMessage.style.display = (visibleCoursesCount === 0 && courses.length > 0) ? 'block' : 'none';
    }
}

// ページ読み込み時に実行
window.onload = async function() {
    await loadAllCourses(); // JSONからコース情報を読み込んで表示
    displayCurrentDay(); // 曜日を表示
    showWeekdaySections(); // 曜日ごとのセクションを切り替え、displayedDayIndexを初期化
    
    // 初期状態で管理メニューのオプションを無効化
    document.getElementById('adminOptionsWrapper').classList.add('disabled');

    updateClassVisibility(); // ページ読み込み時に一度実行
    setInterval(updateClassVisibility, 30000); // 30秒ごとに表示を更新

    // 各メニューオーバーレイがクリックされたらメニューを閉じるイベントリスナー
    const menuOverlays = document.querySelectorAll('.menu-overlay');
    menuOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(event) {
            // メニューコンテンツ自体をクリックした場合は閉じない
            if (event.target === overlay) {
                hideMenu(overlay.id);
            }
        });
    });
};
