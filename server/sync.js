const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const TOPIC = 'test-topics'

async function sync(publish) {
    while(true) {
        publish(TOPIC, 'test-msg')
        await sleep(10)
    }
}

module.exports = {
    sync
}