// api.js  通过接口 ， 进行后端相应的处理

module.exports = {
    //router.js
    selectTalk: '/selectTalk',
    insertTalk: '/insertTalk',
    selectRecruit: '/selectRecruit',
    pulicRecruit: '/pulicRecruit',
    selectRecruitById: '/selectRecruitById',

    //router_stu.js
    login: '/login',
    selectStuPrac: '/selectStuPrac',
    updatePractice: '/updatePractice',

    selectStuByName: '/selectStuByName',
    selectStuClassForm: '/selectStuClassForm',

    //router_teacher.js
    selectTchInfo: '/selectTchInfo',
    updateTchInfo: '/updateTchInfo',

    selectDesign: '/selectDesign',
    selectDesignByTch: '/selectDesignByTch',
    updateChoose: '/updateChoose',
    selectDesignByStu: '/selectDesignByStu',
    selectDesignById: '/selectDesignById'
}
