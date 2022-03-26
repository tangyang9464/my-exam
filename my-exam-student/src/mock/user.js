//引入mock模块
import Mock from 'mockjs';

Mock.mock('/api/user/register', { //输出数据
    'code': 200,
    'msg':'密码错误',
    'data': {}
});