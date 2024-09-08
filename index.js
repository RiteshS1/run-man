score = 0;
cross = true;

audio = new Audio('bg.mp3');
audiogo = new Audio('dog-bark.mp3');


setTimeout(() => {
    audio.play();
audio.autoplay = true;
audio.load();
}, 5000);


document.onkeydown = function(e){
    console.log("key pressed is",e.keyCode);
    if(e.keyCode==38){
        man= document.querySelector('.man');
        man.classList.add('animateMan');
        setTimeout(() => {
            man.classList.remove('animateMan');
        }, 700);

    }
    if (e.keyCode == 39) {
        man = document.querySelector('.man');
        manX = parseInt(window.getComputedStyle(man, null).getPropertyValue('left'));
        man.style.left = manX + 112 + "px";
    }
    if (e.keyCode == 37) {
        man = document.querySelector('.man');
        manX = parseInt(window.getComputedStyle(man, null).getPropertyValue('left'));
        man.style.left = (manX - 112) + "px";
    }
}




setInterval(() => {
    man = document.querySelector('.man');
    start = document.querySelector('.start');
    dog = document.querySelector('.dog');

    dx = parseInt(window.getComputedStyle(man, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(man, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(dog, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(dog, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
   
    if (offsetX <100 && offsetY < 192) {
        
        start.innerHTML = "☠️Game Over☠️🤭RELOAD-NOW!";
        dog.classList.remove('dogAni');
        audiogo.play();
      
       
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 4000);
    }
    else if (offsetX< 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(dog, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            dog.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    document.querySelector('.scoreC').innerHTML = "Your Score: " + score +"😉";
}
document.querySelector('.info').addEventListener('click',()=>{
    document.querySelector('.info').innerHTML= "Press the Upper Arrow Key To Make the Man Dodge the FIERCE DOG🫡~KEEP RELOADING AS THE GAME ENDS😜";
    document.querySelector('.info').style.height= '25%';
    document.querySelector('.info').style.width= '19%';
    document.querySelector('.info').style.left= '20px';
})
let startX, startY, endX, endY;

document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
    endY = e.touches[0].clientY;
});

document.addEventListener('touchend', () => {
    let diffX = endX - startX;
    let diffY = endY - startY;

    if (Math.abs(diffY) > Math.abs(diffX) && diffY < 0) { // Upward swipe
        let man = document.querySelector('.man');
        man.classList.add('animateMan');
        setTimeout(() => {
            man.classList.remove('animateMan');
        }, 700);
    }
});
