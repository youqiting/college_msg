// api.js  通过接口 ， 进行后端相应的处理
const baseUrl = 'http://localhost:8081';

module.exports = {
    login: baseUrl+ '/login',
    selectPractice: baseUrl+ '/selectPractice',
    updatePractice: baseUrl+ '/updatePractice',

    selectDesign: baseUrl + '/selectDesign',
    selectDesignByTch: baseUrl + '/selectDesignByTch'
}