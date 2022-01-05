const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Disable/Enable Button
const toggleButton = () => {
     button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
// Note: key is from free api so ok to show here
function tellMe(joke) {
    VoiceRSS.speech({
        key: '47db673ecaca4427aca995d2e2def708',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// Get jokes from Joke API: free api - no key needed
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // for 2-part jokes
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-To-Speech
        tellMe(joke);
        // Disable button
        toggleButton();

    } catch (error) {
        // Catch errors here
        console.log('whoops', error);
    }
}

// getJokes();

// Event Listeners
button.addEventListener('click', getJokes);

audioElement.addEventListener('ended', toggleButton);