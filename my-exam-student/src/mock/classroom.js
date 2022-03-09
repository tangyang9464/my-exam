//引入mock模块
import Mock from 'mockjs';

Mock.mock('/api/classroom/join', { //输出数据
    'code': 200, //随机生成姓名
});
Mock.mock('/api/classroom/historyList', { //输出数据
    'code': 200,
    'data': {
        'historyRooms':[
            {
                'roomCode':'1',
                'course':'操作系统',
                'class':'183班',
                'studentNumber':167
            },
            {
                'roomCode':'2',
                'course':'计算机网络',
                'class':'183班',
                'studentNumber':123
            },
        ]
    }
});
Mock.mock('/api/classroom/list', { //输出数据
    'code': 200,
    'data': [
        {
            'roomId':'1',
            'course':'操作系统',
            'schoolClass':'183班',
            'teacherAvatar':'/',
            'teacherName':'王小明',
        },
        {
            'roomCode':'2',
            'course':'计算机网络',
            'class':'183班',
            'teacherAvatar':'/',
            'teacherName':'李红',
        },
    ]
});
Mock.mock('/api/classroom/joinHistoryRoom', { //输出数据
    'code': 200,
    'data': {}
});
Mock.mock('/api/classroom/exit', { //输出数据
    'code': 200,
    'data': {}
});
Mock.mock('/api/classroom/detail/1', { //输出数据
    'code': 200,
    'data': {
        'roomData':
            {
                'roomCode':'1',
                'course':'操作系统',
                'class':'183',
                'teacherAvatarPath':'/',
                'teacherName':'王小明',
            },
        'papers':[
            {
                'paperName':'操作系统',
                'totalScore': 10,
                'obtainScore':9,
                'questionNumber': 10,
                'totalTime':600,//秒
                'deadline':'2010-12',
                'finishStatus':'0' // (0-1-2 未开始-已经开始-已提交)
            },
            {
                'paperName':'计算机网络',
                'totalScore': 20,
                'obtainScore':20,
                'questionNumber': 12,
                'totalTime':1200,//秒
                'deadline':'2022-12',
                'finishStatus':'1' // (0-1-2 未开始-已经开始-已提交)
            },
            {
                'paperName':'计算机网络',
                'totalScore': 20,
                'obtainScore':20,
                'questionNumber': 12,
                'totalTime':1200,//秒
                'deadline':'2022-12',
                'finishStatus':'2' // (0-1-2 未开始-已经开始-已提交)
            }
        ]
    }
});