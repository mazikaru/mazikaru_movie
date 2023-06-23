const ANIM_NONE = 0;
const ANIM_FADE = 1;

const TICK_ANIM_FADE = 10;
const TICK_MUSIC_FADE = 40;

const SHOW_NORMAL = 0;
const SHOW_SCREEN = 1;

let fast = false;

const LINES = `キャラクター名/演者指示/アニメーション指示/照明指示/台詞/番号
ここにキャラクター名を入れる////ここに台詞を入れる/1
あああ////それは前依然としてそうした発展団といった事の時を嫌うですござい。もし前に奨励順はいよいよその攻撃ましたくっじゃで困るているないをも話忘れますますて、始終とは行くませますだた。学校になっですのはよく十一月に必ずしもましんた。/2
`;
let SPLIT_LINES = [];
let TMP_SPLIT_LINES = LINES.split("\n");
for (let index in TMP_SPLIT_LINES) {
    let split = TMP_SPLIT_LINES[index].split("/");
    if (split[4] === "" && split[1] !== "hide" && split[1] !== "show") {
        continue;
    }
    if (split[0] === "") {
        split[0] = SPLIT_LINES[index - 1].speaker;
    }
    SPLIT_LINES[index] = {
        speaker: split[0],
        property: split[1],
        camera: split[2],
        scene: split[3],
        line: split[4],
        number: split[5]
    };
}

class MazikaruEffect {

    /** @public */
    play() {
        console.error("[Warning] Method 'play()' must be overridden by a children");
    }

}

class TextBoxMovie extends MazikaruEffect {

    /** @type {string} */
    path;
    /** @type {int} */
    anim;
    /** @type {int} */
    /** @type {HTMLVideoElement} */
    videoElem;
    /** @type {int} */
    animTaskId;
    /** @type {int} */
    classId;
    /** @type {int} */
    currentTick;

    /**
     * @param {string} path
     * @param {int} anim
     * @public
     */
    constructor(path, anim = ANIM_FADE) {
        super();
        this.path = "resource/text/" + path + ".mp4";
        this.anim = anim;
        this.videoElem = document.getElementById("text_box_mov");
        this.classId = getAvailableTextBoxClassId();
    }

    /** @public */
    play() {
        console.log("現在 " + currentTextBoxClassId + " 番目の文字エフェクトを表示中。");
        this.videoElem.src = this.path;
        this.videoElem.load();
        this.videoElem.currentTime = 0;
        switch (this.anim) {
            case ANIM_NONE:
                this.videoElem.style.opacity = 1;
                this.videoElem.play();
                break;
            case ANIM_FADE:
                this.videoElem.play();
                this.currentTick = 0;
                this.animTaskId = setInterval(/** @param {TextBoxMovie} elemWrapper */ function (elemWrapper) {
                    ++elemWrapper.currentTick;
                    elemWrapper.videoElem.style.opacity = elemWrapper.currentTick / TICK_ANIM_FADE;
                    if (currentTextBoxClassId !== elemWrapper.classId || elemWrapper.currentTick === TICK_ANIM_FADE) {
                        clearInterval(elemWrapper.animTaskId);
                    }
                }, 20, this);
                break;
            default:
                this.videoElem.play();
                break;
        }
    }

}

class TextBoxVoid extends MazikaruEffect {

    /** @type {int} */
    anim;
    /** @type {int} */
    /** @type {HTMLVideoElement} */
    videoElem;
    /** @type {int} */
    animTaskId;
    /** @type {int} */
    classId;
    /** @type {int} */
    currentTick;

    /**
     * @param {int} anim
     * @public
     */
    constructor(anim = ANIM_FADE) {
        super();
        this.anim = anim;
        this.videoElem = document.getElementById("text_box_mov");
        this.classId = getAvailableTextBoxClassId();
    }

    /** @public */
    play() {
        console.log("現在 " + currentTextBoxClassId + " 番目の文字エフェクトを表示中。これは、映像のない、空欄の文字エフェクトです。");
        switch (this.anim) {
            case ANIM_NONE:
                this.videoElem.style.opacity = 0;
                this.videoElem.pause();
                break;
            case ANIM_FADE:
                this.currentTick = 0;
                this.animTaskId = setInterval(/** @param {TextBoxVoid} elemWrapper */ function (elemWrapper) {
                    ++elemWrapper.currentTick;
                    elemWrapper.videoElem.style.opacity = (TICK_ANIM_FADE - elemWrapper.currentTick) / TICK_ANIM_FADE;
                    if (currentTextBoxClassId !== elemWrapper.classId || elemWrapper.currentTick === TICK_ANIM_FADE) {
                        elemWrapper.videoElem.pause();
                        clearInterval(elemWrapper.animTaskId);
                    }
                }, 20, this);
                break;
            default:
                this.videoElem.style.opacity = 0;
                break;
        }
    }

}

class MainScreenMovie extends MazikaruEffect {

    /** @type {string} */
    path;
    /** @type {int} */
    anim;
    /** @type {int} */
    /** @type {HTMLVideoElement} */
    videoElem;
    /** @type {int} */
    animTaskId;
    /** @type {int} */
    classId;
    /** @type {int} */
    currentTick;

    /** @type {int} */
    show;

    /**
     * @param {string} path
     * @param {int} anim
     * @param show
     * @public
     */
    constructor(path, anim = ANIM_FADE, show = SHOW_SCREEN) {
        super();
        this.path = "resource/main_screen/" + path + ".mp4";
        this.anim = anim;
        this.show = show;
        this.videoElem = document.getElementById("main_screen_mov");
        this.classId = getAvailableMainScreenClassId();
    }

    /** @public */
    play() {
        switch (this.show) {
            case SHOW_NORMAL:
                this.videoElem.style.mixBlendMode = "normal";
                break;
            case SHOW_SCREEN:
                this.videoElem.style.mixBlendMode = "screen";
                break;
            default:
                this.videoElem.style.mixBlendMode = "normal";
        }
        console.log("現在 " + currentMainScreenClassId + " 番目の映像を表示中");
        this.videoElem.src = this.path;
        this.videoElem.load();
        this.videoElem.currentTime = 0;
        switch (this.anim) {
            case ANIM_NONE:
                this.videoElem.style.opacity = 0.99;
                this.videoElem.play();
                break;
            case ANIM_FADE:
                this.videoElem.play();
                this.currentTick = 0;
                this.animTaskId = setInterval(/** @param {MainScreenMovie} elemWrapper */ function (elemWrapper) {
                    ++elemWrapper.currentTick;
                    elemWrapper.videoElem.style.opacity = (elemWrapper.currentTick / TICK_ANIM_FADE) - 0.01;
                    if (currentMainScreenClassId !== elemWrapper.classId || elemWrapper.currentTick === TICK_ANIM_FADE) {
                        clearInterval(elemWrapper.animTaskId);
                    }
                }, 20, this);
                break;
            default:
                this.videoElem.play();
                break;
        }
    }

}

class MainScreenVoid extends MazikaruEffect {

    /** @type {int} */
    anim;
    /** @type {int} */
    /** @type {HTMLVideoElement} */
    videoElem;
    /** @type {int} */
    animTaskId;
    /** @type {int} */
    classId;
    /** @type {int} */
    currentTick;

    /**
     * @param {int} anim
     * @public
     */
    constructor(anim = ANIM_FADE) {
        super();
        this.anim = anim;
        this.videoElem = document.getElementById("main_screen_mov");
        this.classId = getAvailableMainScreenClassId();
    }

    /** @public */
    play() {
        console.log("現在 " + currentMainScreenClassId + " 番目の映像を表示中。これは、空欄の映像です。");
        switch (this.anim) {
            case ANIM_NONE:
                this.videoElem.style.opacity = 0;
                this.videoElem.pause();
                break;
            case ANIM_FADE:
                this.currentTick = 0;
                this.animTaskId = setInterval(/** @param {MainScreenVoid} elemWrapper */ function (elemWrapper) {
                    ++elemWrapper.currentTick;
                    elemWrapper.videoElem.style.opacity = (TICK_ANIM_FADE - elemWrapper.currentTick) / TICK_ANIM_FADE;
                    if (currentMainScreenClassId !== elemWrapper.classId || elemWrapper.currentTick === TICK_ANIM_FADE) {
                        elemWrapper.videoElem.pause();
                        clearInterval(elemWrapper.animTaskId);
                    }
                }, 20, this);
                break;
            default:
                this.videoElem.style.opacity = 0;
                break;
        }
    }

}

class MainEffectMovie extends MazikaruEffect {

    /** @type {string} */
    path;
    /** @type {int} */
    anim;
    /** @type {int} */
    /** @type {HTMLVideoElement} */
    videoElem;
    /** @type {int} */
    animTaskId;
    /** @type {int} */
    classId;
    /** @type {int} */
    currentTick;

    /**
     * @param {string} path
     * @param {int} anim
     * @public
     */
    constructor(path, anim = ANIM_FADE) {
        super();
        this.path = "resource/main_effect/" + path + ".mp4";
        this.anim = anim;
        this.videoElem = document.getElementById("main_effect_mov");
        this.classId = getAvailableMainEffectClassId();
    }

    /** @public */
    play() {
        document.getElementById("back_ground_picture").style.opacity = 0.7;
        console.log("現在 " + currentMainEffectClassId + " 番目のメインエフェクトを表示中");
        this.videoElem.src = this.path;
        this.videoElem.load();
        this.videoElem.currentTime = 0;
        switch (this.anim) {
            case ANIM_NONE:
                this.videoElem.style.opacity = 0.99;
                this.videoElem.play();
                break;
            case ANIM_FADE:
                this.videoElem.play();
                this.currentTick = 0;
                this.animTaskId = setInterval(/** @param {MainEffectMovie} elemWrapper */ function (elemWrapper) {
                    ++elemWrapper.currentTick;
                    elemWrapper.videoElem.style.opacity = (elemWrapper.currentTick / TICK_ANIM_FADE) - 0.01;
                    if (currentMainEffectClassId !== elemWrapper.classId || elemWrapper.currentTick === TICK_ANIM_FADE) {
                        clearInterval(elemWrapper.animTaskId);
                    }
                }, 20, this);
                break;
            default:
                this.videoElem.play();
                break;
        }
    }

}

class MainEffectVoid extends MazikaruEffect {

    /** @type {int} */
    anim;
    /** @type {int} */
    /** @type {HTMLVideoElement} */
    videoElem;
    /** @type {int} */
    animTaskId;
    /** @type {int} */
    classId;
    /** @type {int} */
    currentTick;

    /**
     * @param {int} anim
     * @public
     */
    constructor(anim = ANIM_FADE) {
        super();
        this.anim = anim;
        this.videoElem = document.getElementById("main_effect_mov");
        this.classId = getAvailableMainEffectClassId();
    }

    /** @public */
    play() {
        document.getElementById("back_ground_picture").style.opacity = 0.98;
        console.log("現在 " + currentMainEffectClassId + " 番目のメインエフェクトを表示中。これは、空欄です。");
        switch (this.anim) {
            case ANIM_NONE:
                this.videoElem.style.opacity = 0;
                this.videoElem.pause();
                break;
            case ANIM_FADE:
                this.currentTick = 0;
                this.animTaskId = setInterval(/** @param {MainEffectVoid} elemWrapper */ function (elemWrapper) {
                    ++elemWrapper.currentTick;
                    elemWrapper.videoElem.style.opacity = (TICK_ANIM_FADE - elemWrapper.currentTick) / TICK_ANIM_FADE;
                    if (currentMainEffectClassId !== elemWrapper.classId || elemWrapper.currentTick === TICK_ANIM_FADE) {
                        elemWrapper.videoElem.pause();
                        clearInterval(elemWrapper.animTaskId);
                    }
                }, 20, this);
                break;
            default:
                this.videoElem.style.opacity = 0;
                break;
        }
    }

}

class BackgroundPicture extends MazikaruEffect {

    /** @type {string} */
    path;
    /** @type {int} */
    anim;
    /** @type {int} */
    /** @type {HTMLImageElement} */
    imageElem;
    /** @type {int} */
    animTaskId;
    /** @type {int} */
    classId;
    /** @type {int} */
    currentTick;

    /**
     * @param {string} path
     * @param {int} anim
     * @param {string} extension 拡張子
     * @public
     */
    constructor(path, anim = ANIM_FADE, extension = "png") {
        super();
        this.path = "resource/picture/" + path + "." + extension;
        this.anim = anim;
        this.imageElem = document.getElementById("back_ground_picture");
        this.classId = getAvailablePictureClassId();
    }

    /** @public */
    play() {
        console.log("現在 " + currentPictureClassId + " 番目の写真を表示中");
        this.imageElem.src = this.path;
        switch (this.anim) {
            case ANIM_NONE:
                this.imageElem.style.opacity = 0.98;
                break;
            case ANIM_FADE:
                this.currentTick = 0;
                this.animTaskId = setInterval(/** @param {BackgroundPicture} elemWrapper */ function (elemWrapper) {
                    ++elemWrapper.currentTick;
                    elemWrapper.imageElem.style.opacity = (elemWrapper.currentTick / TICK_ANIM_FADE) - 0.02;
                    if (currentPictureClassId !== elemWrapper.classId || elemWrapper.currentTick === TICK_ANIM_FADE) {
                        clearInterval(elemWrapper.animTaskId);
                    }
                }, 20, this);
                break;
            default:
                this.imageElem.style.opacity = 0.98;
                break;
        }
    }

}

class BackgroundPictureVoid extends MazikaruEffect {

    /** @type {int} */
    anim;
    /** @type {HTMLVideoElement} */
    imageElem;
    /** @type {int} */
    animTaskId;
    /** @type {int} */
    classId;
    /** @type {int} */
    currentTick;

    /**
     * @param {int} anim
     * @public
     */
    constructor(anim = ANIM_FADE) {
        super();
        this.anim = anim;
        this.imageElem = document.getElementById("back_ground_picture");
        this.classId = getAvailablePictureClassId();
    }

    /** @public */
    play() {
        console.log("現在 " + currentPictureClassId + " 番目の写真を表示中。これは、空欄です。");
        switch (this.anim) {
            case ANIM_NONE:
                this.imageElem.style.opacity = 0;
                break;
            case ANIM_FADE:
                this.currentTick = 0;
                this.animTaskId = setInterval(/** @param {BackgroundPictureVoid} elemWrapper */ function (elemWrapper) {
                    ++elemWrapper.currentTick;
                    elemWrapper.imageElem.style.opacity = (TICK_ANIM_FADE - elemWrapper.currentTick) / TICK_ANIM_FADE;
                    if (currentPictureClassId !== elemWrapper.classId || elemWrapper.currentTick === TICK_ANIM_FADE) {
                        clearInterval(elemWrapper.animTaskId);
                    }
                }, 20, this);
                break;
            default:
                this.imageElem.style.opacity = 0;
                break;
        }
    }

}

class BackgroundMusic extends MazikaruEffect {

    /** @type {string} */
    path;
    /** @type {int} */
    anim;
    /** @type {int} */
    /** @type {HTMLAudioElement} */
    audioElem;
    /** @type {int} */
    animTaskId;
    /** @type {int} */
    classId;
    /** @type {int} */
    currentTick;
    /** @type {number} */
    volume;

    /**
     * @param {string} path
     * @param {int} anim
     * @param volume
     * @public
     */
    constructor(path, anim = ANIM_FADE, volume = 1.0) {
        super();
        this.path = "resource/music/" + path + ".mp3";
        this.anim = anim;
        this.volume = volume;
        this.audioElem = document.getElementById("back_ground_music");
        this.classId = getAvailableMusicClassId();
    }

    /** @public */
    play() {
        console.log("現在 " + currentMusicClassId + " 番目の音楽を再生中");
        this.audioElem.src = this.path;
        this.audioElem.load();
        this.audioElem.currentTime = 0;
        switch (this.anim) {
            case ANIM_NONE:
                this.audioElem.volume = this.volume;
                this.audioElem.play();
                break;
            case ANIM_FADE:
                this.audioElem.play();
                this.currentTick = 0;
                this.animTaskId = setInterval(/** @param {BackgroundMusic} elemWrapper */ function (elemWrapper) {
                    ++elemWrapper.currentTick;
                    elemWrapper.audioElem.volume = (elemWrapper.currentTick / TICK_MUSIC_FADE * elemWrapper.volume) - 0.01;
                    if (currentMusicClassId !== elemWrapper.classId || elemWrapper.currentTick === TICK_MUSIC_FADE) {
                        clearInterval(elemWrapper.animTaskId);
                    }
                }, 20, this);
                break;
            default:
                this.audioElem.volume = this.volume;
                this.audioElem.play();
                break;
        }
    }

}

class BackgroundMusicVoid extends MazikaruEffect {

    /** @type {int} */
    anim;
    /** @type {HTMLAudioElement} */
    audioElem;
    /** @type {int} */
    animTaskId;
    /** @type {int} */
    classId;
    /** @type {int} */
    currentTick;
    /** @type {number} */
    lastElementVolume;

    /**
     * @param {int} anim
     * @public
     */
    constructor(anim = ANIM_FADE) {
        super();
        this.anim = anim;
        this.audioElem = document.getElementById("back_ground_music");
        this.classId = getAvailableMusicClassId();
    }

    /** @public */
    play() {
        const lastElement = getLastEffect(this);
        if (lastElement === null || !(lastElement instanceof BackgroundMusic)) {
            this.lastElementVolume = 0;
        } else {
            this.lastElementVolume = lastElement.volume;
        }
        console.log("現在 " + currentMusicClassId + " 番目の音楽を再生中。これは、空欄の音楽です。");
        switch (this.anim) {
            case ANIM_NONE:
                this.audioElem.volume = 0;
                this.audioElem.pause();
                break;
            case ANIM_FADE:
                this.currentTick = 0;
                this.animTaskId = setInterval(/** @param {BackgroundMusicVoid} elemWrapper */ function (elemWrapper) {
                    ++elemWrapper.currentTick;
                    elemWrapper.audioElem.volume = (TICK_MUSIC_FADE - elemWrapper.currentTick) / TICK_MUSIC_FADE * elemWrapper.lastElementVolume;
                    if (currentMusicClassId !== elemWrapper.classId || elemWrapper.currentTick === TICK_MUSIC_FADE) {
                        elemWrapper.audioElem.pause();
                        clearInterval(elemWrapper.animTaskId);
                    }
                }, 20, this);
                break;
            default:
                this.audioElem.volume = 0;
                this.audioElem.pause();
                break;
        }
    }

}


/** @type {int} */
let currentTextBoxClassId = -1;
/** @type {int} */
let lastTextBoxClassId = -1;

/** @type {int} */
let currentMainScreenClassId = -1;
/** @type {int} */
let lastMainScreenClassId = -1;

/** @type {int} */
let currentMainEffectClassId = -1;
/** @type {int} */
let lastMainEffectClassId = -1;

/** @type {int} */
let currentPictureClassId = -1;
/** @type {int} */
let lastPictureClassId = -1;

/** @type {int} */
let currentMusicClassId = -1;
/** @type {int} */
let lastMusicClassId = -1;

/** @type {int} */
let currentAllClassId = -1;

/** @type {int} */
let currentLineId = -1;

/** @return {int} */
function getAvailableTextBoxClassId() {
    return ++lastTextBoxClassId;
}

/** @return {int} */
function getAvailableMainScreenClassId() {
    return ++lastMainScreenClassId;
}

/** @return {int} */
function getAvailableMainEffectClassId() {
    return ++lastMainEffectClassId;
}

/** @return {int} */
function getAvailablePictureClassId() {
    return ++lastPictureClassId;
}

/** @return {int} */
function getAvailableMusicClassId() {
    return ++lastMusicClassId;
}

/**
 * @param {MazikaruEffect} search
 * @return {?MazikaruEffect}
 */
function getLastEffect(search) {
    switch (true) {
        case search instanceof TextBoxMovie || search instanceof TextBoxVoid:
            for (let i = currentAllClassId - 2; i >= 0; i--) {
                let wrapper = getElementWrapperById(i);
                if (wrapper instanceof TextBoxMovie || wrapper instanceof TextBoxVoid) {
                    return wrapper;
                }
            }
            return new TextBoxVoid(ANIM_NONE);
        case search instanceof MainEffectMovie || search instanceof MainEffectVoid:
            for (let i = currentAllClassId - 2; i >= 0; i--) {
                let wrapper = getElementWrapperById(i);
                if (wrapper instanceof MainEffectMovie || wrapper instanceof MainEffectVoid) {
                    return wrapper;
                }
            }
            return new MainEffectVoid(ANIM_NONE);
        case search instanceof MainScreenMovie || search instanceof MainScreenVoid:
            for (let i = currentAllClassId - 2; i >= 0; i--) {
                let wrapper = getElementWrapperById(i);
                if (wrapper instanceof MainScreenMovie || wrapper instanceof MainScreenVoid) {
                    return wrapper;
                }
            }
            return new MainScreenVoid(ANIM_NONE);
        case search instanceof BackgroundPicture || search instanceof BackgroundPictureVoid:
            for (let i = currentAllClassId - 2; i >= 0; i--) {
                let wrapper = getElementWrapperById(i);
                if (wrapper instanceof BackgroundPicture || wrapper instanceof BackgroundPictureVoid) {
                    return wrapper;
                }
            }
            return new BackgroundPictureVoid(ANIM_NONE);
        case search instanceof BackgroundMusic || search instanceof BackgroundMusicVoid:
            for (let i = currentAllClassId - 2; i >= 0; i--) {
                let wrapper = getElementWrapperById(i);
                if (wrapper instanceof BackgroundMusic || wrapper instanceof BackgroundMusicVoid) {
                    return wrapper;
                }
            }
            return new BackgroundMusicVoid(ANIM_NONE);
        default:
            return null;
    }
}

/** @return {MazikaruEffect} */
function getElementWrapperById(id) {
    return EFFECTS[id];
}

/**
 * @param {string} tag
 * @param {string} id
 * @return {HTMLElement}
 */
function createElement(tag, id) {
    let newElem = document.createElement(tag);
    newElem.id = id;
    return newElem;
}

/**
 * @param {boolean} behind 一つ後ろに戻るかどうか
 */
function next(behind = false) {
    console.log(currentAllClassId);
    if (behind && currentAllClassId <= 0) {
        return;
    }
    const wrapper = behind ? getLastEffect(getElementWrapperById(currentAllClassId - 1)) : getElementWrapperById(currentAllClassId);
    if (!behind) {
        switch (true) {
            case wrapper instanceof TextBoxMovie || wrapper instanceof TextBoxVoid:
                ++currentTextBoxClassId;
                break;
            case wrapper instanceof MainEffectMovie || wrapper instanceof MainEffectVoid:
                ++currentMainEffectClassId;
                break;
            case wrapper instanceof MainScreenMovie || wrapper instanceof MainScreenVoid:
                ++currentMainScreenClassId;
                break;
            case wrapper instanceof BackgroundPicture || wrapper instanceof BackgroundPictureVoid:
                ++currentPictureClassId;
                break;
            case wrapper instanceof BackgroundMusic || wrapper instanceof BackgroundMusicVoid:
                ++currentMusicClassId;
                break;
        }
        ++currentAllClassId;
    } else {
        switch (true) {
            case wrapper instanceof TextBoxMovie || wrapper instanceof TextBoxVoid:
                --currentTextBoxClassId;
                break;
            case wrapper instanceof MainEffectMovie || wrapper instanceof MainEffectVoid:
                --currentMainEffectClassId;
                break;
            case wrapper instanceof MainScreenMovie || wrapper instanceof MainScreenVoid:
                --currentMainScreenClassId;
                break;
            case wrapper instanceof BackgroundPicture || wrapper instanceof BackgroundPictureVoid:
                --currentPictureClassId;
                break;
            case wrapper instanceof BackgroundMusic || wrapper instanceof BackgroundMusicVoid:
                --currentMusicClassId;
                break;
        }
        --currentAllClassId;
    }
    if (currentAllClassId === EFFECTS.length) {
        currentTextBoxClassId = 0;
    }
    wrapper.play();
    onChangeResource();
}

/**
 * @param {boolean} behind
 */
function nextLine(behind = false) {
    if (behind && currentLineId <= 0) {
        return;
    }
    currentLineId = behind ? currentLineId - 1 : currentLineId + 1;
    let context = document.getElementById("context");
    document.getElementById("speaker").innerHTML = SPLIT_LINES[currentLineId].speaker + "<span style='color: #585858'>:</span>";
    context.textContent = SPLIT_LINES[currentLineId].line;
    if (SPLIT_LINES[currentLineId].property === "hide") {
        document.getElementById("text_box_lines_div").style.opacity = 0;
    } else {
        document.getElementById("text_box_lines_div").style.opacity = 1;
    }
    context.parentElement.scrollLeft = 0;
    setTimeout((lineId) => {
        if (lineId !== currentLineId) {
            return;
        }
        if (context.scrollWidth > context.parentElement.clientWidth) {
            let scrollId = setInterval((lineId2) => {
                if (context.parentElement.scrollLeft + context.parentElement.clientWidth >= context.scrollWidth || lineId2 !== currentLineId) {
                    clearInterval(scrollId);
                    return;
                }
                if (fast) {
                    context.parentElement.scrollLeft += 1;
                } else {
                    context.parentElement.scrollLeft += 2;
                }

            }, 2, lineId);
        }
    }, 1000, currentLineId);
}

function onChangeResource() {
    /** @type {HTMLParagraphElement} */
    const loggerElement = document.getElementById("logger");
    console.assert(loggerElement instanceof HTMLParagraphElement);
    loggerElement.innerHTML = "<span style='color: #007504'>上部テキスト(T): <span style='color: #00fd08'>" + currentTextBoxClassId.toString() + "   <span style='color: #959a00'>中央エフェクト(E): <span style='color: #eaf300'>" + currentMainEffectClassId.toString() + "   " +
        "<span style='color: #55009a'>中央メイン(M): <span style='color: #9900ff'>" + currentMainScreenClassId.toString() + "   <span style='color: #00559a'>中央背景(B): <span style='color: #0087f5'>" + currentPictureClassId.toString() + "   " +
        "<span style='color: #9a0000'>音響(S): <span style='color: #ff0000'>" + currentMusicClassId.toString();
}

/** @type {MazikaruEffect[]} */
let EFFECTS = [];

window.addEventListener("load", function () {
    EFFECTS = [

        new TextBoxVoid(ANIM_NONE),
        new MainEffectVoid(ANIM_NONE),
        new MainScreenVoid(ANIM_NONE),
        new BackgroundPictureVoid(ANIM_NONE),
        new BackgroundMusicVoid(ANIM_NONE),

        new BackgroundPicture("kousya_heiwa_half"),
        new MainScreenMovie("light_leak_half"),
        new MainEffectMovie("hiraganaga_nuketeiku"),
        new MainEffectVoid(),
        new MainScreenVoid(),
        new BackgroundPicture("kousya_heiwa", ANIM_NONE),
        new TextBoxMovie("まじくまじから"),
        new MainEffectMovie("mazikaru_hikari_ue"),
        new MainEffectVoid(),
        new TextBoxVoid(),
        // new BackgroundMusic("henshin", ANIM_NONE, 0.2),
        // new MainScreenMovie("ブレインウォッシュ2 プライオリティ2 音あり"),
        // new TextBoxMovie("ずざら"),
        // new MainScreenMovie("ブレインウォッシュ3 プライオリティ 打消し 音あり"),
        // new MainScreenVoid(),
        // new TextBoxVoid(),
        // new TextBoxMovie("たくたから"),
        // new MainEffectMovie("mazikaru_kougeki_new"),
        // new TextBoxVoid(),
        // new BackgroundPicture("kousya_heiwa_half", ANIM_NONE),
        // new BackgroundMusicVoid(),
        // new BackgroundPictureVoid(),
        // new MainScreenMovie("konan", ANIM_NONE),
        // new MainScreenVoid(),
        // new BackgroundPicture("kousya_heiwa_half"),
        // new BackgroundPictureVoid(),
        //
        // new BackgroundPicture("kyoushitsu_heiwa_half"),
        // new MainScreenMovie("xtc-half"),
        // new BackgroundPicture("kyoushitsu_heiwa", ANIM_NONE),
        // new MainScreenMovie("xtc-01"),
        // new MainEffectMovie("hiraganaga_chuuoukara_nuketeiku"),
        // new MainEffectVoid(),
        // new MainScreenVoid(),
        // new TextBoxMovie("けむけむ"),
        // new MainEffectMovie("tokei"),
        // new MainEffectVoid(),
        // new TextBoxVoid(),
        // new BackgroundPictureVoid(),
        // new MainScreenMovie("warp_to"),
        //
        // new MainScreenVoid(),
        // new BackgroundPicture("kousya_old_half"),
        // new MainScreenMovie("ブレインウォッシュ6 ニアミス 音あり", ANIM_NONE, SHOW_NORMAL),
        // new MainScreenVoid(),
        // new BackgroundPicture("kousya_old", ANIM_NONE),
        // new TextBoxMovie("天帝我をして"),
        // new MainEffectMovie("iokaru_hikari_ue"),
        // new MainEffectVoid(),
        // new TextBoxVoid(),
        // new TextBoxMovie("一を聞いて"),
        // new MainEffectMovie("iokaru_kougeki_new"),
        // new TextBoxVoid(),
        // new BackgroundPicture("kousya_old_half", ANIM_NONE),
        // new BackgroundPictureVoid(),
        //
        // new BackgroundPicture("kyoushitsu_old_half"),
        // new BackgroundMusic("木のドアをノック1", ANIM_NONE),
        // new BackgroundMusic("木のドアをノック1", ANIM_NONE),
        // new MainScreenMovie("ブレインウォッシュ7 ブラボー1 音あり"),
        // new MainEffectMovie("burabo_half"),
        // new MainEffectVoid(),
        // new MainScreenVoid(),
        // new BackgroundPicture("kyoushitsu_old", ANIM_NONE),
        // new MainEffectMovie("burabo2"),
        // new MainEffectVoid(),
        // new TextBoxMovie("覆水盆に"),
        // new MainEffectMovie("iokaru_zentai"),
        // new TextBoxVoid(),
        // new MainEffectVoid(),
        // new BackgroundPicture("kyoushitsu_old_half", ANIM_NONE),
        // new TextBoxMovie("らむらむ"),
        // new MainEffectMovie("tokei"),
        // new MainEffectVoid(),
        // new TextBoxVoid(),
        // new BackgroundPictureVoid(),
        // new MainScreenMovie("warp_back"),
        // new TextBoxMovie("いおかると共に", ANIM_NONE),
        // new MainScreenVoid(),
        // new BackgroundPicture("kyoushitsu_shihai_half"),
        // new BackgroundPicture("kyoushitsu_shihai"),
        // new TextBoxMovie("禍を転じて"),
        // new MainScreenMovie("bad_bird_lost_book"),
        // new MainScreenVoid(),
        // new TextBoxVoid(),
        // new BackgroundPictureVoid(),
        // new TextBoxMovie("まじくまじから"),
        // new TextBoxVoid(),
        // new MainScreenMovie("change"),
        // new MainScreenVoid(),
        // new BackgroundPicture("kyoushitsu_shihai"),
        // new BackgroundMusic("fight-again-cut"),
        // new BackgroundMusicVoid(),
        // new TextBoxMovie("られられ"),
        // new MainScreenMovie("am17"),
        // new MainScreenVoid(),
        // new TextBoxVoid(),
        // new BackgroundPictureVoid(),
        //
        // new BackgroundPicture("kousya_shihai"),
        // new BackgroundMusic("orchestral_mission", ANIM_NONE),
        // new BackgroundMusicVoid(),
        // new MainScreenMovie("ブレインウォッシュ3連発"),
        // new MainScreenVoid(),
        // new TextBoxMovie("石に漱ぎ"),
        // new MainEffectMovie("iokaru_kyokudai"),
        // new MainEffectMovie("game_set_all", ANIM_NONE),
        // new MainEffectVoid(),
        // new TextBoxVoid(),
        // new TextBoxMovie("3Dメガネ"),
        // new MainScreenMovie("ブレインウォッシュエボリューション3D", ANIM_NONE, SHOW_NORMAL),
        // new TextBoxVoid(),
        // new BackgroundMusic("rouningyou", ANIM_NONE),
        // new MainScreenMovie("パンチ", ANIM_NONE, SHOW_NORMAL),
        // new BackgroundMusicVoid(),
        // new TextBoxMovie("まほしく3D"),
        // new MainEffectMovie("mahosikaru"),
        // new MainEffectVoid(),
        // new TextBoxVoid(),
        // new TextBoxMovie("ましか3D"),
        // new MainScreenMovie("反実仮想1", ANIM_NONE, SHOW_NORMAL),
        // new TextBoxVoid(),
        // new TextBoxMovie("ましか予告"),
        // new TextBoxMovie("ましか3D", ANIM_NONE),
        // new MainScreenMovie("反実仮想2", ANIM_NONE, SHOW_NORMAL),
        // new TextBoxVoid(),
        // new TextBoxMovie("ましか予告", ANIM_NONE),
        // new TextBoxMovie("ましか3D", ANIM_NONE),
        // new MainScreenMovie("反実仮想3", ANIM_NONE, SHOW_NORMAL),
        // new TextBoxVoid(),
        // new BackgroundPictureVoid(),
        // new MainScreenVoid(),
        // new TextBoxMovie("3Dメガネ2"),
        // new TextBoxVoid(),
        // new MainScreenMovie("dance"),
        // new MainScreenVoid()
    ];
    window.addEventListener("keydown", function (event) {
        switch (event.key) {
            case " ":
            case "ArrowRight":
            case "Enter":
                event.preventDefault();
                next();
                break;
            case "ArrowLeft":
                event.preventDefault();
                next(true);
                break;
            case "z":
                event.preventDefault();
                if (document.body.requestFullscreen) {
                    document.body.requestFullscreen();
                } else if (document.body.mozRequestFullScreen) {
                    document.body.mozRequestFullScreen();
                } else if (document.body.webkitRequestFullscreen) {
                    document.body.webkitRequestFullscreen();
                }
                break;
            case "x":
                event.preventDefault();
                document.getElementById("logger_div").style.opacity = Number(document.getElementById("logger_div").style.opacity) === 1 ? 0 : 1;
                break;
            case "a":
                event.preventDefault();
                nextLine(true);
                break;
            case "s":
                event.preventDefault();
                nextLine();
                break;
            case "q":
                event.preventDefault();
                let textDiv = document.getElementById("text_box_lines_div");
                if (textDiv.style.opacity == "1") {
                    textDiv.style.opacity = 0;
                } else {
                    textDiv.style.opacity = 1;
                }
                break;
            case "w":
                event.preventDefault();
                fast = !fast;
        }
    });
    window.addEventListener("click", function (event) {
        event.preventDefault();
        next(true);
    });
    document.body.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        next();
    });
    document.body.addEventListener("touchstart", function (event) {
        event.preventDefault();
        next();
    });
});

