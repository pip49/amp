
// Sample Data (앰프 리스트)
const ampList = [
    { id: 1, title: "Class A Single-Ended", img: "https://via.placeholder.com/400x300/222/00FF00?text=AMP+01", sound: "assets/audio/1.mp3", desc: "따뜻한 음색의 싱글 엔디드 A급 증폭 회로입니다." },
    { id: 2, title: "Push-Pull Power Amp", img: "https://via.placeholder.com/400x300/222/00FF00?text=AMP+02", sound: "assets/audio/2.mp3", desc: "강력한 출력을 자랑하는 푸시풀 방식의 파워 앰프입니다." },
    { id: 3, title: "Blues Tone Pre-Amp", img: "https://via.placeholder.com/400x300/222/00FF00?text=AMP+03", sound: "assets/audio/3.mp3", desc: "블루스 기타 톤에 최적화된 프리앰프 회로입니다." },
    // 추가 앰프 데이터...
];

const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const loader = document.getElementById('loading-overlay');

// 갤러리 생성
ampList.forEach(amp => {
    const card = document.createElement('div');
    card.className = 'item';
    card.innerHTML = `
        <img src="${amp.img}" alt="${amp.title}">
        <div class="item-info">
            <div class="item-title">${amp.title}</div>
        </div>
    `;
    card.onclick = () => startLoading(amp);
    gallery.appendChild(card);
});

function startLoading(amp) {
    let count = 2;
    document.getElementById('countdown-num').innerText = count;
    loader.style.display = 'flex';

    const timer = setInterval(() => {
        count--;
        if (count >= 0) {
            document.getElementById('countdown-num').innerText = count;
        } else {
            clearInterval(timer);
            loader.style.display = 'none';
            openModal(amp);
        }
    }, 8000); // 0.8초 간격 (영화 카운트다운 느낌)
}

function openModal(amp) {
    document.getElementById('modal-img').src = amp.img;
    document.getElementById('modal-title').innerText = amp.title;
    document.getElementById('modal-desc').innerHTML = `<p>${amp.desc}</p><p>판매가: ₩50,000 (PDF 가이드 포함)</p>`;

    // 오디오 설정
    const audio = document.getElementById('main-audio');
    const playText = document.getElementById('playing-now');
    audio.src = amp.sound;
    playText.innerText = `청취 중: ${amp.title}`;
    audio.play().catch(e => console.log("자동 재생은 사용자 상호작용이 필요합니다."));

    modal.style.display = 'flex';
}

document.getElementById('close-modal').onclick = () => {
    modal.style.display = 'none';
};

window.onclick = (e) => {
    if (e.target == modal) modal.style.display = 'none';
};
