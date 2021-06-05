window.addEventListener('load', function(){
    setTimeout(function(){
        document.querySelector('.container').classList.add('show_container');
        rollText(document.querySelector('.logo'));
    }, 1000)
});

loadData();
function loadData() {
    let out = '';
    for (key in projects) {
        out += '<a href="' + projects[key].link + '" target="_blank">';
        out += '<span>' + projects[key].symbol + '</span>';
        out += '<p>' + projects[key].name + '</p>';
        out += '</a>';
    }
    document.querySelector('.project_list').innerHTML = out;
}





let project_list = document.querySelectorAll('.project_list a');

document.querySelector('.search').addEventListener('keyup', function () {
    let filter = this.value.toLowerCase();

    for (key in projects) {
        const string = projects[key].name;
        
        if (!string.includes(filter) || filter == '') {
            project_list[key].classList.remove('hide_project');
        } else {
            project_list[key].classList.add('hide_project');
        }
    }
})




















const isRolling = Symbol("rolling text");

function getPositions(length) {
    return Array.from(new Array(length), () => [
        (length * Math.random() | 0) % length,
        (length * Math.random() | 0) % length,
    ]);
}

async function rollText(element) {
    if (element[isRolling]) return;

    element[isRolling] = true;

    const word = [...element.textContent];
    const ps = getPositions(word.length);
    const computedWords = [word.join("")];

    for (const [p1, p2] of ps) {
        [word[p1], word[p2]] = [word[p2], word[p1]];
        computedWords.push(element.textContent = word.join(""));
        await delay(100);
    }

    while (computedWords.length) {
        const word = computedWords.pop();
        element.textContent = word;
        await delay(100);
    }
    element[isRolling] = false;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function rollHandler({ target }) {
    if (target.matches('.roll_text')) rollText(target);
}

addEventListener("pointerover", rollHandler);