export const randomString = (length = 8) => {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHUJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

export const buildQuerystring = obj => {
    var str = []
    for (var p in obj)
        if (obj.hasOwnProperty(p))
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    return str.join('&')
}

export const shorten = (str, len) => {
    if (!str) {
        return;
    }
    if (str.length > len) {
        return str.substring(0, len) + "…";
    }
    else {
        return str;
    }
}

export const timeAgo = date_str => {
    date_str = date_str.replace('+0000', 'Z');
    var time_formats = [
        [60, 'just now', 1],
        [120, '1 minute ago', '1 minute from now'],
        [3600, 'minutes ago', 60],
        [7200, '1 hour ago', '1 hour from now'],
        [86400, 'hours ago', 3600],
        [172800, 'yesterday', 'tomorrow'],
        [604800, 'days ago', 86400],
        [1209600, 'last week', 'next week'],
        [2419200, 'weeks ago', 604800],
        [4838400, 'last month', 'next month'],
        [29030400, 'months ago', 2419200],
        [58060800, 'last year', 'next year'],
        [2903040000, 'years ago', 29030400],
        [5806080000, 'last century', 'next century'],
        [58060800000, 'centuries ago', 2903040000]
    ];
    var time = ('' + date_str).replace(/-/g, "/").replace(/[TZ]/g, " ").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    if (time.substr(time.length - 4, 1) === ".") time = time.substr(0, time.length - 4);
    var seconds = (new Date() - new Date(time)) / 1000;
    var token = '', list_choice = 1;
    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = 'ago';
        list_choice = 2;
    }
    var i = 0, format;
    // eslint-disable-next-line no-cond-assign
    while (format = time_formats[i++])
        if (seconds < format[0]) {
            if (typeof format[2] == 'string')
                return format[list_choice];
            else
                return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
        }
    return time;
}

export const sluglify = string => {
    const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
    const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}

export const formatNumber = (amount, decimalCount = 2, decimal = ",", thousands = ".") => {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
}