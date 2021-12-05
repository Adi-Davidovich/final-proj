export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId,
    load,
    store,
    debounce,
    getRandomColor,
    delay,
    getRandomIntInclusive
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}


function load(key) {
    var val = localStorage.getItem(key)
    return (val) ? JSON.parse(val) : null;
}

function store(key, val) {
    localStorage[key] = JSON.stringify(val);
}


function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}


function debounce(func, wait) {
    let timeout

    return function executedFunction(...args) {
        //rest-makes the args to an array
        const later = () => {
            clearTimeout(timeout)
            func(...args) //spread-from array to vars
        }

        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }