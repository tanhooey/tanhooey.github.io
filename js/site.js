const TITLECARDTEXT = 'hey, my name\'s jason!';
const SUBTITLECARDTEXT = 'i\'m a full-stack software engineer. i build and write about stuff.';
const BLINKID = blink('title-card-contents');

// utility functions
function blink(container) {
    let text = $('#' + container).text();
    return setInterval(function () {
        if ($('#' + container).text().slice(-1) === '|') {
            $('#' + container).text(text.slice(0, -1));
            $('#' + container).append('&nbsp;');
        }
        else {
            $('#' + container).text(text);
        }
    }, 300);
}
async function typeContent(container, text, blinkId, delay) {
    return new Promise((resolve, reject) =>
        timeout = setTimeout(function () {
            clearInterval(blinkId);
            let i = 0;
            var type = setInterval(function () {
                if (i < text.length) {
                    $('#' + container).text(text.slice(0, i + 1) + '|');
                    i += 1;
                } else {
                    clearInterval(type);
                    resolve(timeout);
                }
            }, 40);
        }, delay));
}

function runIntro() {
    typeContent('title-card-contents', TITLECARDTEXT, BLINKID, 1500)
        .then((value) => {
            return new Promise((resolve, reject) => {
                clearTimeout(value);
                $('#title-card-contents').text(TITLECARDTEXT).append('&nbsp;');
                typeContent('title-card-subcontents', SUBTITLECARDTEXT, 10).then((value) => {
                    clearTimeout(value);
                    blink('title-card-subcontents');
                })
                let delay = setTimeout(function () {
                    resolve(delay);
                }, 3000)
            })
        })
        .then((value) => {
            clearTimeout(value);
            // make the scroll down icon appear
            $('.scroll-indicator').removeAttr('hidden').addClass('fade-in');
        });
}

function attachEventHandlers() {
    // add a click handler for the arrows
    $('#scroller').on('click', function () {
        window.location = '#experience'
    });

    //
    $(document).on('scroll', function () {
        let bounds = $('#intro')[0].getBoundingClientRect();
        let bottom = bounds.bottom;
        const opacity = 1.5 * (bounds.height - bottom) / bounds.height;
        const x = 1 - Math.max(0, Math.min(opacity, 1));
        $('#scroller').fadeTo(0, x);
    })
}

// code that runs when DOM is done loading
const init = $(function () {
    // run the intro card
    runIntro();
    attachEventHandlers();
})