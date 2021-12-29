const list = document.querySelector('bullet-chatting-list');
const video = document.querySelector('video');
list.bulletchattingplaystate = 'paused';
list.area = 40;
list.bulletchattingduration = 6000;
const texts = ['This alpaca is so cute 😋', 'Perfect in workmanship 🥳', 'High-energy alarm 😱', 'What\'s this alpaca\'s name?', 'Short legs', 'Is alpaca delicious?', 'The alpaca is eating grass', 'LOOOOOL', 'Has anyone noticed his eyes?', 'I love his smile', 'He find the treasure', 'Does alpaca like to eat berries? 🍇'];

window.addbulletchatting = (text, mode, fontSize, duration, delay) => {
    const bulletchatting = document.createElement('bullet-chatting');
    bulletchatting.innerHTML = text;
    bulletchatting.mode = mode;
    if (duration) {
        bulletchatting.bulletchattingduration = parseInt(duration);
    }
    if (delay) {
        bulletchatting.bulletchattingdelay = parseInt(delay);
    }
    if (fontSize) {
        bulletchatting.style.fontSize = fontSize + 'px';
    }
    list.appendChild(bulletchatting);
}

let index = 0;
function nextFrame () {
    const nowTime = video.currentTime;
    while (bulletchattings[index] && bulletchattings[index].time <= nowTime) {
        window.addbulletchatting(bulletchattings[index].text, bulletchattings[index].mode);
        index++;
    }

    if (video.paused) {
        return;
    } else {
        window.requestAnimationFrame(() => {
            nextFrame();
        });
    }
}

video.addEventListener('play', () => {
    list.bulletchattingplaystate = 'running';
    window.requestAnimationFrame(() => {
        nextFrame();
    });
});
video.addEventListener('pause', () => {
    list.bulletchattingplaystate = 'paused';
});
video.addEventListener('seeking', () => {
    list.innerHTML = '';
    for (let i = 0; i < bulletchattings.length; i++) {
        if (bulletchattings[i].time > video.currentTime) {
            index = i;
            break;
        }
    }
});

// generate bulletchattings
const duration = 146;
const bulletchattings = [];
for (let i = 0; i < duration * 7; i++) {
    bulletchattings.push({
        text: texts[parseInt(Math.random() * texts.length)],
        time: Math.random() * duration,
        mode: 'scroll',
    });
}
for (let i = 0; i < duration * 0.5; i++) {
    bulletchattings.push({
        text: texts[parseInt(Math.random() * texts.length)],
        time: Math.random() * duration,
        mode: 'top',
    });
}
for (let i = 0; i < duration * 0.5; i++) {
    bulletchattings.push({
        text: texts[parseInt(Math.random() * texts.length)],
        time: Math.random() * duration,
        mode: 'bottom',
    });
}
bulletchattings.sort((a, b) => a.time - b.time);