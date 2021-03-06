export default {
    getItem: function (key) {
        let value;
        try {
            value = localStorage.getItem(key)
        } catch (ex) {
            // if (__DEV__) {
            // }
            console.log('localStorage.getItem报错,', ex.message)
        } finally {
            return value
        }
    },
    setItem: function (key, value) {
        try {
            // ios safari 无痕模式下，直接使用localStore.setItem会报错
            localStorage.setItem(key, value)
        } catch (ex){
            console.log('localStorage.setItem报错,', ex.message)
            // if (__DEV__) {
            // }
        }
    }
}