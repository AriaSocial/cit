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

// 線形代数基礎メニューを表示する関数
function showLinearAlgebraMenu() {
    const menu = document.getElementById('linearAlgebraMenu');
    menu.style.display = 'flex'; // メニューを表示
}

// 線形代数基礎メニューを非表示にする関数
function hideLinearAlgebraMenu() {
    const menu = document.getElementById('linearAlgebraMenu');
    menu.style.display = 'none'; // メニューを非表示
}

// 英語理解１メニューを表示する関数を追加
function showEnglishMenu() {
    const menu = document.getElementById('englishMenu');
    menu.style.display = 'flex'; // メニューを表示
}

// 英語理解１メニューを非表示にする関数を追加
function hideEnglishMenu() {
    const menu = document.getElementById('englishMenu');
    menu.style.display = 'none'; // メニューを非表示
}

// 数学基礎 高度メニューを表示する関数を追加
function showMathMenu() {
    const menu = document.getElementById('mathMenu');
    menu.style.display = 'flex'; // メニューを表示
}

// 数学基礎 高度メニューを非表示にする関数を追加
function hideMathMenu() {
    const menu = document.getElementById('mathMenu');
    menu.style.display = 'none'; // メニューを非表示
}

// スポーツ科学メニューを表示する関数を追加
function showSportsScienceMenu() {
    const menu = document.getElementById('sportsScienceMenu');
    menu.style.display = 'flex'; // メニューを表示
}

// スポーツ科学メニューを非表示にする関数を追加
function hideSportsScienceMenu() {
    const menu = document.getElementById('sportsScienceMenu');
    menu.style.display = 'none'; // メニューを非表示
}

// 言語と文化１メニューを表示する関数を追加
function showLanguageCultureMenu() {
    const menu = document.getElementById('languageCultureMenu');
    menu.style.display = 'flex'; // メニューを表示
}

// 言語と文化１メニューを非表示にする関数を追加
function hideLanguageCultureMenu() {
    const menu = document.getElementById('languageCultureMenu');
    menu.style.display = 'none'; // メニューを非表示
}

// 英語表現１メニューを表示する関数を追加
function showEnglishExpressionMenu() {
    const menu = document.getElementById('englishExpressionMenu');
    menu.style.display = 'flex'; // メニューを表示
}

// 英語表現１メニューを非表示にする関数を追加
function hideEnglishExpressionMenu() {
    const menu = document.getElementById('englishExpressionMenu');
    menu.style.display = 'none'; // メニューを非表示
}

// 日本語表現法 高度メニューを表示する関数を追加
function showJapaneseExpressionMenu() {
    const menu = document.getElementById('japaneseExpressionMenu');
    menu.style.display = 'flex'; // メニューを表示
}

// 日本語表現法 高度メニューを非表示にする関数を追加
function hideJapaneseExpressionMenu() {
    const menu = document.getElementById('japaneseExpressionMenu');
    menu.style.display = 'none'; // メニューを非表示
}

// 学部指定科目群 1メニューを表示する関数を追加
function showFacultySubjectsMenu() {
    const menu = document.getElementById('facultySubjectsMenu');
    menu.style.display = 'flex'; // メニューを表示
}

// 学部指定科目群 1メニューを非表示にする関数を追加
function hideFacultySubjectsMenu() {
    const menu = document.getElementById('facultySubjectsMenu');
    menu.style.display = 'none'; // メニューを非表示
}

// 講義室番号入力メニューを表示する関数を追加
function showClassroomNumberMenu() {
    const menu = document.getElementById('classroomNumberMenu');
    menu.style.display = 'flex'; // メニューを表示
}

// 講義室番号入力メニューを非表示にする関数を追加
function hideClassroomNumberMenu() {
    const menu = document.getElementById('classroomNumberMenu');
    menu.style.display = 'none'; // メニューを非表示
     // 入力フィールドをクリア
    document.getElementById('classroomNumberInput').value = '';
}

// 講義室番号を送信する関数
function submitClassroomNumber() {
    const classroomNumber = document.getElementById('classroomNumberInput').value;
    if (classroomNumber) {
        const url = `https://attendance.is.it-chiba.ac.jp/attendance/class_room/${classroomNumber}`;
        openNewWindow(url); // 指定されたURLを開く
        hideClassroomNumberMenu(); // メニューを閉じる
    } else {
        alert('講義室番号を入力してください。'); // 番号が入力されていない場合
    }
}

// 開発メニューを表示する関数
function showDevelopmentMenu() {
    const menu = document.getElementById('developmentMenu');
    menu.style.display = 'flex'; // メニューを表示
}

// 開発メニューを非表示にする関数
function hideDevelopmentMenu() {
    const menu = document.getElementById('developmentMenu');
    menu.style.display = 'none'; // メニューを非表示
}

// 表示する曜日を設定し、セクション表示を更新する関数
// eventオブジェクトを受け取るように修正
function setDisplayedDay(event, day) {
    event.stopPropagation(); // イベント伝播を停止
    showWeekdaySections(day); // セクション表示を更新
    // メニューを閉じる処理に遅延を追加
    setTimeout(hideDevelopmentMenu, 100); // 遅延を100ミリ秒に調整
}

// 表示を今日の曜日に戻す関数
// eventオブジェクトを受け取るように修正
function resetDisplayedDay(event) {
    event.stopPropagation(); // イベント伝播を停止
    showWeekdaySections(); // セクション表示を今日の曜日に戻す
    // メニューを閉じる処理に遅延を追加
    setTimeout(hideDevelopmentMenu, 100); // 遅延を100ミリ秒に調整
}


// 曜日ごとのセクションを表示する関数
// dayToShowが指定された場合はその曜日のセクションを表示、それ以外は現在の曜日のセクションを表示
function showWeekdaySections(dayToShow) {
    const today = new Date();
    // dayToShowが指定されていればその曜日を使用、そうでなければ現在の曜日を使用
    const dayOfWeek = (dayToShow !== undefined) ? dayToShow : today.getDay();

    // 全ての曜日セクションと週末メッセージを非表示にする
    document.querySelectorAll('.weekday-sections').forEach(section => {
        section.style.display = 'none';
    });

    // 指定された曜日または現在の曜日に対応するセクションを表示する
    switch (dayOfWeek) {
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
            document.getElementById('weekendMessage').style.display = 'block'; // 週末メッセージを表示
            break;
    }
}

// スワイプ検出のための変数 (タッチ用)
let touchstartX = 0;
let touchendX = 0;
const swipeThreshold = 50; // スワイプと判定するための最小距離 (px)

// スワイプ検出のための変数 (マウス用)
let mousestartX = 0;
let mouseIsDown = false; // マウスが押されているかどうかのフラグ

// 曜日表示要素を取得
const currentDayElement = document.getElementById('current-day');

// --- タッチイベントリスナー ---
currentDayElement.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
}, false);

currentDayElement.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    handleTouchGesture();
}, false);

// --- マウスイベントリスナー ---
currentDayElement.addEventListener('mousedown', function(event) {
    mousestartX = event.screenX;
    mouseIsDown = true; // マウスが押された
}, false);

// mousemoveはdrag中にのみ検出したいが、ここではmouseupで判定するため不要
// currentDayElement.addEventListener('mousemove', function(event) {
//     if (!mouseIsDown) return;
//     // ドラッグ中の処理が必要な場合はここに追加
// }, false);

currentDayElement.addEventListener('mouseup', function(event) {
    if (!mouseIsDown) return; // マウスが押されていなければ何もしない
    const mouseendX = event.screenX;
    mouseIsDown = false; // マウスが離された
    handleMouseGesture(mousestartX, mouseendX);
}, false);

// マウスが要素の外で離された場合も考慮 (任意)
// document.addEventListener('mouseup', function(event) {
//     if (mouseIsDown) {
//         const mouseendX = event.screenX;
//         mouseIsDown = false;
//         handleMouseGesture(mousestartX, mouseendX);
//     }
// }, false);


// タッチスワイプジェスチャーを処理する関数
function handleTouchGesture() {
    // 右方向へのスワイプ（開始座標より終了座標が大きい）で、かつ一定距離以上の移動がある場合
    if (touchendX > touchstartX && touchendX - touchstartX > swipeThreshold) {
        console.log('Right touch swipe detected!'); // 開発者向けコンソールに表示
        showDevelopmentMenu(); // 開発メニューを表示
    }
    // 左方向へのスワイプ（必要に応じて追加）
    // else if (touchendX < touchstartX && touchstartX - touchendX > swipeThreshold) {
    //     console.log('Left touch swipe detected!');
    // }
}

// マウススワイプジェスチャーを処理する関数
function handleMouseGesture(startX, endX) {
     // 右方向へのスワイプ（開始座標より終了座標が大きい）で、かつ一定距離以上の移動がある場合
    if (endX > startX && endX - startX > swipeThreshold) {
        console.log('Right mouse swipe detected!'); // 開発者向けコンソールに表示
        showDevelopmentMenu(); // 開発メニューを表示
    }
    // 左方向へのスワイプ（必要に応じて追加）
    // else if (endX < startX && startX - endX > swipeThreshold) {
    //     console.log('Left mouse swipe detected!');
    // }
}


// ページ読み込み時に曜日を表示し、曜日ごとのセクションを切り替える
window.onload = function() {
    displayCurrentDay(); // 曜日を表示 (常に今日の曜日)
    showWeekdaySections(); // 曜日ごとのセクションを切り替える (デフォルトは今日の曜日)


    // 各メニューオーバーレイがクリックされたらメニューを閉じるイベントリスナー
    const menuOverlays = document.querySelectorAll('.menu-overlay');
    menuOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(event) {
            // メニューコンテンツ自体をクリックした場合は閉じない
            if (event.target === overlay) {
                // クリックされたオーバーレイのIDに応じて適切な非表示関数を呼び出す
                if (overlay.id === 'linearAlgebraMenu') hideLinearAlgebraMenu();
                else if (overlay.id === 'englishMenu') hideEnglishMenu();
                else if (overlay.id === 'mathMenu') hideMathMenu();
                else if (overlay.id === 'languageCultureMenu') hideLanguageCultureMenu();
                else if (overlay.id === 'englishExpressionMenu') hideEnglishExpressionMenu();
                else if (overlay.id === 'japaneseExpressionMenu') hideJapaneseExpressionMenu();
                else if (overlay.id === 'facultySubjectsMenu') hideFacultySubjectsMenu();
                else if (overlay.id === 'classroomNumberMenu') hideClassroomNumberMenu();
                else if (overlay.id === 'developmentMenu') hideDevelopmentMenu(); // 開発メニューの非表示も追加
            }
        });
    });
};
