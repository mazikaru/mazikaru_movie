
const ANIM_NONE = 0;
const ANIM_FADE = 1;

const TICK_ANIM_FADE = 10;

class TextBoxMovie {

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
    constructor(path, anim) {
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

class TextBoxVoid {

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
    constructor(anim) {
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

class MainScreenMovie {

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
    constructor(path, anim) {
        this.path = "resource/main_screen/" + path + ".mp4";
        this.anim = anim;
        this.videoElem = document.getElementById("main_screen_mov");
        this.classId = getAvailableMainScreenClassId();
    }

    /** @public */
    play() {
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

class MainScreenVoid {

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
    constructor(anim) {
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

class MainEffectMovie {

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
    constructor(path, anim) {
        this.path = "resource/main_effect/" + path + ".mp4";
        this.anim = anim;
        this.videoElem = document.getElementById("main_effect_mov");
        this.classId = getAvailableMainEffectClassId();
    }

    /** @public */
    play() {
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

class MainEffectVoid {

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
    constructor(anim) {
        this.anim = anim;
        this.videoElem = document.getElementById("main_effect_mov");
        this.classId = getAvailableMainEffectClassId();
    }

    /** @public */
    play() {
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

class BackgroundPicture {

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
     * @param {string} path 拡張子が必要です
     * @param {int} anim
     * @public
     */
    constructor(path, anim) {
        this.path = "resource/picture/" + path; /* constructor引数には拡張子が必要です */
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

class BackgroundPictureVoid {

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
    constructor(anim) {
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

class BackgroundMusic {

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

    /**
     * @param {string} path
     * @param {int} anim
     * @public
     */
    constructor(path, anim) {
        this.path = "resource/music/" + path + ".mp3";
        this.anim = anim;
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
                this.audioElem.volume = 1;
                this.audioElem.play();
                break;
            case ANIM_FADE:
                this.audioElem.play();
                this.currentTick = 0;
                this.animTaskId = setInterval(/** @param {BackgroundMusic} elemWrapper */ function (elemWrapper) {
                    ++elemWrapper.currentTick;
                    elemWrapper.audioElem.volume = (elemWrapper.currentTick / TICK_ANIM_FADE) - 0.01;
                    if (currentMusicClassId !== elemWrapper.classId || elemWrapper.currentTick === TICK_ANIM_FADE) {
                        clearInterval(elemWrapper.animTaskId);
                    }
                }, 20, this);
                break;
            default:
                this.audioElem.play();
                break;
        }
    }

}

class BackgroundMusicVoid {

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

    /**
     * @param {int} anim
     * @public
     */
    constructor(anim) {
        this.anim = anim;
        this.audioElem = document.getElementById("back_ground_music");
        this.classId = getAvailableMusicClassId();
    }

    /** @public */
    play() {
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
                    elemWrapper.audioElem.volume = (TICK_ANIM_FADE - elemWrapper.currentTick) / TICK_ANIM_FADE;
                    if (currentMusicClassId !== elemWrapper.classId || elemWrapper.currentTick === TICK_ANIM_FADE) {
                        elemWrapper.audioElem.pause();
                        clearInterval(elemWrapper.animTaskId);
                    }
                }, 20, this);
                break;
            default:
                this.audioElem.volume = 0;
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
 * @param {int} id
 * @return {TextBoxMovie|TextBoxVoid}
 */
function getTextBoxWrapperById(id) {
    return TEXT_BOXES[id];
}

/**
 * @param {int} id
 * @return {MainScreenMovie|MainScreenVoid}
 */
function getMainScreenWrapperById(id) {
    return MAIN_SCREENS[id];
}

/**
 * @param {int} id
 * @return {MainEffectMovie|MainEffectVoid}
 */
function getMainEffectWrapperById(id) {
    console.log(id)
    return MAIN_EFFECTS[id];
}

/**
 * @param {int} id
 * @return {BackgroundPicture|BackgroundPictureVoid}
 */
function getPictureWrapperById(id) {
    console.log(id)
    return PICTURES[id];
}

/**
 * @param {int} id
 * @return {BackgroundMusic|BackgroundMusicVoid}
 */
function getMusicWrapperById(id) {
    return MUSICS[id];
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
function nextTextBox(behind = false) {
    if (behind && currentTextBoxClassId <= 0) {
        return;
    }
    if (!behind) {
        ++currentTextBoxClassId;
    } else {
        --currentTextBoxClassId;
    }
    if (currentTextBoxClassId === TEXT_BOXES.length) {
        currentTextBoxClassId = 0;
    }
    getTextBoxWrapperById(currentTextBoxClassId).play();
    onChangeResource();
}

/**
 * @param {boolean} behind 一つ後ろに戻るかどうか
 */
function nextMainScreen(behind = false) {
    if (behind && currentMainScreenClassId <= 0) {
        return;
    }
    if (!behind) {
        ++currentMainScreenClassId;
    } else {
        --currentMainScreenClassId;
    }
    if (currentMainScreenClassId === MAIN_SCREENS.length) {
        currentMainScreenClassId = 0;
    }
    getMainScreenWrapperById(currentMainScreenClassId).play();
    onChangeResource();
}

/**
 * @param {boolean} behind 一つ後ろに戻るかどうか
 */
function nextMainEffect(behind = false) {
    if (behind && currentMainEffectClassId <= 0) {
        return;
    }
    if (!behind) {
        ++currentMainEffectClassId;
    } else {
        --currentMainEffectClassId;
    }
    if (currentMainEffectClassId === MAIN_EFFECTS.length) {
        currentMainEffectClassId = 0;
    }
    getMainEffectWrapperById(currentMainEffectClassId).play();
    onChangeResource();
}

/**
 * @param {boolean} behind 一つ後ろに戻るかどうか
 */
function nextPicture(behind = false) {
    if (behind && currentPictureClassId <= 0) {
        return;
    }
    if (!behind) {
        ++currentPictureClassId;
    } else {
        --currentPictureClassId;
    }
    if (currentPictureClassId === PICTURES.length) {
        currentPictureClassId = 0;
    }
    getPictureWrapperById(currentPictureClassId).play();
    onChangeResource()
}

/**
 * @param {boolean} behind 一つ後ろに戻るかどうか
 */
function nextMusic(behind = false) {
    if (behind && currentMusicClassId <= 0) {
        return;
    }
    if (!behind) {
        ++currentMusicClassId;
    } else {
        --currentMusicClassId;
    }
    if (currentMusicClassId === MUSICS.length) {
        currentMusicClassId = 0;
    }
    getMusicWrapperById(currentMusicClassId).play();
    onChangeResource();
}

function onChangeResource() {
    /** @type {HTMLParagraphElement} */
    const loggerElement = document.getElementById("logger");
    console.assert(loggerElement instanceof HTMLParagraphElement);
    loggerElement.innerHTML = "<span style='color: #007504'>上部テキスト(Q): <span style='color: #00fd08'>" + currentTextBoxClassId.toString() + "   <span style='color: #959a00'>中央エフェクト(W): <span style='color: #eaf300'>" + currentMainEffectClassId.toString() + "   " +
        "<span style='color: #55009a'>中央メイン(E): <span style='color: #9900ff'>" + currentMainScreenClassId.toString() + "   <span style='color: #00559a'>中央背景(R): <span style='color: #0087f5'>" + currentPictureClassId.toString() + "   " +
        "<span style='color: #9a0000'>音響(T): <span style='color: #ff0000'>" + currentMusicClassId.toString();
}

/** @type {(TextBoxMovie|TextBoxVoid)[]} */
let TEXT_BOXES = [];

/** @type {(MainScreenMovie|MainScreenVoid)[]} */
let MAIN_SCREENS = [];

/** @type {(MainEffectMovie|MainEffectVoid)[]} */
let MAIN_EFFECTS = [];

/** @type {(BackgroundPicture|BackgroundPictureVoid)[]} */
let PICTURES = [];

/** @type {(BackgroundMusic|BackgroundMusicVoid)[]} */
let MUSICS = [];

window.addEventListener("load", function () {
    TEXT_BOXES = [
        new TextBoxVoid(ANIM_NONE),
        new TextBoxMovie("まじくまじから", ANIM_FADE),
        new TextBoxVoid(ANIM_FADE),
        new TextBoxMovie("ずざら", ANIM_FADE),
        new TextBoxVoid(ANIM_FADE),
        new TextBoxMovie("たくたから", ANIM_FADE),
        new TextBoxVoid(ANIM_FADE),
        new TextBoxMovie("けむけむ", ANIM_FADE),
        new TextBoxVoid(ANIM_FADE),
        new TextBoxMovie("天帝我をして", ANIM_FADE),
        new TextBoxVoid(ANIM_FADE),
        new TextBoxMovie("一を聞いて", ANIM_FADE),
        new TextBoxVoid(ANIM_FADE),
        new TextBoxMovie("覆水盆に", ANIM_FADE),
        new TextBoxVoid(ANIM_FADE),
        new TextBoxMovie("らむらむ", ANIM_FADE),
        new TextBoxVoid(ANIM_FADE),
        new TextBoxMovie("禍を転じて", ANIM_FADE),
        new TextBoxVoid(ANIM_FADE),
        new TextBoxMovie("まじくまじから", ANIM_FADE),
        new TextBoxVoid(ANIM_FADE),
        new TextBoxMovie("られられ", ANIM_FADE),
        new TextBoxVoid(ANIM_FADE),
        new TextBoxMovie("石に漱ぎ", ANIM_FADE),
        new TextBoxVoid(ANIM_FADE),
        new TextBoxMovie("まほしくまほしから", ANIM_FADE),
        new TextBoxVoid(ANIM_FADE),
        new TextBoxMovie("ましかませ", ANIM_FADE),
        new TextBoxVoid(ANIM_FADE),
        new TextBoxMovie("ましか予告", ANIM_FADE),
        new TextBoxMovie("ましかませ", ANIM_NONE),
        new TextBoxMovie("ましか予告", ANIM_NONE),
        new TextBoxMovie("ましかませ", ANIM_NONE),
        new TextBoxVoid(ANIM_FADE),
        new TextBoxMovie("けむけむ", ANIM_FADE),
        new TextBoxVoid(ANIM_FADE),
    ];
    MAIN_SCREENS = [
        new MainScreenVoid(ANIM_NONE),
        new MainScreenMovie("light_leak_half", ANIM_FADE),
        new MainScreenVoid(ANIM_NONE),
        new MainScreenMovie("light_leak", ANIM_FADE),
        new MainScreenVoid(ANIM_FADE),
        new MainScreenMovie("konan", ANIM_NONE),
        new MainScreenVoid(ANIM_FADE),
        new MainScreenMovie("light_leak_half", ANIM_FADE),
        new MainScreenMovie("light_leak", ANIM_FADE),
        new MainScreenVoid(ANIM_NONE),
        new MainScreenMovie("warp_to", ANIM_FADE),
        new MainScreenVoid(ANIM_NONE),
        new MainScreenMovie("light_leak_half", ANIM_FADE),
        new MainScreenVoid(ANIM_NONE),
        new MainScreenMovie("light_leak_half", ANIM_FADE),
        new MainScreenVoid(ANIM_NONE),
        new MainScreenMovie("light_leak", ANIM_FADE),
        new MainScreenVoid(ANIM_FADE),
        new MainScreenMovie("warp_back", ANIM_FADE),
        new MainScreenVoid(ANIM_NONE)
    ];
    MAIN_EFFECTS = [
        new MainEffectVoid(ANIM_FADE),
        new MainEffectMovie("hiraganaga_nuketeiku", ANIM_FADE),
        new MainEffectVoid(ANIM_FADE),
        new MainEffectMovie("hikari_ue", ANIM_FADE),
        new MainEffectVoid(ANIM_FADE),
        new MainEffectMovie("mazikaru_kougeki", ANIM_FADE),
        new MainEffectMovie("hiraganaga_nuketeiku", ANIM_FADE),
        new MainEffectVoid(ANIM_FADE),
        new MainEffectMovie("mazikaru_kougeki", ANIM_FADE),
        new MainEffectMovie("mazikaru_kougeki", ANIM_FADE),
        new MainEffectVoid(ANIM_NONE),
    ];
    PICTURES = [
        new BackgroundPictureVoid(ANIM_NONE),
        new BackgroundPicture("kousya_heiwa_half.jpg", ANIM_FADE),
        new BackgroundPicture("kousya_heiwa.jpg", ANIM_NONE),
        new BackgroundPictureVoid(ANIM_FADE),
        new BackgroundPicture("kyoushitsu_heiwa.jpg", ANIM_FADE),
        new BackgroundPictureVoid(ANIM_FADE),
    ]
    MUSICS = [
        new BackgroundMusicVoid(ANIM_NONE),
        new BackgroundMusic("fight-again-cut", ANIM_NONE),
        new BackgroundMusicVoid(ANIM_FADE)
    ];
    window.addEventListener("keydown", function(event) {
        switch (event.key) {
            case "a":
                event.preventDefault();
                nextTextBox(true);
                break;
            case "q":
                event.preventDefault();
                nextTextBox();
                break;
            case "s":
                event.preventDefault();
                nextMainEffect(true);
                break;
            case "w":
                event.preventDefault();
                nextMainEffect();
                break;
            case "d":
                event.preventDefault();
                nextMainScreen(true);
                break;
            case "e":
                event.preventDefault();
                nextMainScreen();
                break;
            case "f":
                event.preventDefault();
                nextPicture(true);
                break;
            case "r":
                event.preventDefault();
                nextPicture();
                break;
            case "g":
                event.preventDefault();
                nextMusic(true);
                break;
            case "t":
                event.preventDefault();
                nextMusic();
                break;
            case "z":
                event.preventDefault();
                if(document.body.requestFullscreen) {
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
        }
    });
});

