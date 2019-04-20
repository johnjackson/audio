var play_btn = document.getElementById('play_btn');
var audio = document.getElementById('audio');
var duration = document.getElementById('duration');
var current_time = document.getElementById('current_time');
var progress = document.getElementById('progress');
var volume = document.getElementById('volume');
var muted_btn = document.getElementById('muted_btn');
var mp3_list_box = document.getElementById('mp3_list_box');

var duration_str = '';
var mp3_list = [
    '圣斗士',
    'Butter-Fly',
    'Take Me To Your Heart'
];
var html = '';
mp3_list.map(function(item, index) {
    html += `<li onclick="selectMusic(${index})">${item}</li>`;
});
mp3_list_box.innerHTML = html;

function selectMusic(index) {
    audio.src = `${mp3_list[index]}.mp3`;
    audio.play();
    var all_li = document.querySelectorAll('#mp3_list_box li');
    var clicked_li = all_li[index];
    for(var i in all_li) {
        if(all_li[i].style) {
            all_li[i].style.color = '#000';
        }
    }
    clicked_li.style.color = '#f00';
}

play_btn.onclick = function() {
    if (audio.paused) {
        audio.play();
        updateCurrentTime();
        updateProgress(progress);
    } else {
        audio.pause();
    }
    togglePlayBtn();
};
progress.onchange = function() {
    audio.currentTime = this.value;
}
volume.onchange = function() {
    audio.volume = this.value;
    if(audio.volume == 0) {
        muted_btn.innerText = '有声';
    }else{
        muted_btn.innerText = '静音';
    }
}
// 点击静音
muted_btn.onclick = function() {
    audio.muted = !audio.muted;
    if(audio.muted) {
        muted_btn.innerText = '有声';
        volume.value = 0;
    }else{
        muted_btn.innerText = '静音';
        volume.value = audio.volume;
    }
}
function togglePlayBtn() {
    if (audio.paused) {
        play_btn.innerText = '播放';
    } else {
        play_btn.innerText = '暂停';
    }
}

audio.onloadedmetadata = function() {
    duration_str = audio.duration;
    duration.innerText = formatTime(duration_str);
    progress.max = Math.round(duration_str);
};

//播放时 更新当前时间
function updateCurrentTime() {
    setInterval(function() {
        //获取audio的当前 时间,并赋给页面上的自定义播放器的当前时间
        var time = Math.round(audio.currentTime);
        current_time.innerText = formatTime(time);
    }, 1000);
}

function updateProgress() {
    setInterval(function() {
        progress.value = audio.currentTime;
    }, 1000);
}

//格式化时间,将秒转为分:秒(mm:ss)
function formatTime(time) {
    var mins = parseInt(time / 60);
    var secs = parseInt(time % 60);
    mins = mins > 9 ? mins : '0' + mins;
    secs = secs > 9 ? secs : '0' + secs;
    return mins + ':' + secs;
}