const auth = firebase.auth()
const db = firebase.firestore()

let PROXY_URL = 'https://warm-scrubland-06418.herokuapp.com/'
const BASE_PROXY_URL = 'https://warm-scrubland-06418.herokuapp.com/'

let GCF_SERVER = 'http://localhost:5001/kazi-bkgut/us-central1/'
if (window.location.host.includes('kazi')) {
    GCF_SERVER = 'https://us-central1-kazi-bkgut.cloudfunctions.net/'
    console.log('PROD')
    localStorage.setItem('debug', 'prod')
} else {
    console.log('DEV')
    localStorage.setItem('debug', 'dev')
}


auth.onAuthStateChanged((user) => {
    if (window.location.pathname.includes('auth')) {
        if (user) {
            window.location.href = './'
        }
    } else {
        if (!user) {
            window.location.href = window.location.origin+'/auth?from_url='+window.location.href.replaceAll('&', '%26')
        }
    }
    // try {
    //     init()
    // } catch (error) {}
});