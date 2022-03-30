//引入mock模块
import Mock from 'mockjs';

Mock.mock('/api/paper/detail/1', { //输出数据
    'code': 200,
    'data': {
        'paperName':'期末考试',
        'totalTime':600,
        'questions':[
            {
                'stem':'本题要求实现一个计算m~n（m<n）之间所有整数的和的简单函数。',
                'questionType': 'singleChoice',
                'options':['即串长度相等可','串长度任意','个位置任意','均相等'],
                'score':3
            },
            {
                'stem':'多选题',
                'questionType': 'mutiChoice',
                'options':['串长','串长度任意','个位置任意','均相等'],
                'score':3
            },
            {
                'stem':'判断题',
                'questionType': 'judge',
                'score':3
            },
        ]
    }
});