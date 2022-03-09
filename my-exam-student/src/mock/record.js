//引入mock模块
import Mock from 'mockjs';

Mock.mock('/api/record/list', { //输出数据
    'code': 200,
    'data': {
        'records':[
            {
                'paperName':'期末考试',
                'totalScore': 10,
                'obtainScore':9,
                'questionNumber': 10,
                'TrueNumber':10,
                'deadline':'2010-12',
                'submitTime':'2020-12',
                'finishStatus':'2' // (0-1-2 未开始-已提交/未批改-已批改)
            }
        ]
    }
});