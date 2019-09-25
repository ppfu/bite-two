import Vue from 'vue'
import Router from 'vue-router'
import BotNav from '@/components/tabs'
import Login from '@/pages/login' //登录页
import ForgetPwd from '@/pages/forgetPwd' //忘记密码
import Register from '@/pages/register' //注册
import Home from '@/pages/home' //首页
import Deal from '@/pages/deal' //交易
import Transfer from '@/pages/transfer' //转账
import Store from '@/pages/store' //商城
import Mine from '@/pages/mine' //我的
import Chat from '@/pages/homepage/chat' //客服
import AboutBala from '@/pages/homepage/aboutBala' //玩转余额宝
import MenCoin from '@/pages/homepage/menCoin' //提币
import Wallet from '@/pages/homepage/wallet' //钱包
import MyMill from '@/pages/homepage/myMill' //我的矿机
import OrePool from '@/pages/homepage/orePool' //矿池
import FlashAgainst from '@/pages/homepage/flashAgainst' //闪兑
import FlashRecord from '@/pages/homepage/flashRecord' //闪兑记录
import LifeSection from '@/pages/homepage/lifeSection' //生活版块
import Games from '@/pages/homepage/games' //娱乐游戏
import Messages from '@/pages/homepage/messages' //消息
import MessDetail from '@/pages/homepage/messDetail' //消息详情
import CoinTrend from '@/pages/homepage/coinTrend' //货币趋势详情
import VCoin from '@/pages/homepage/vCoin' //V币货
import Generalize from '@/pages/homepage/generalize' //推广链接
import ComDetail from '@/pages/storepage/comDetail' //商品详情
import OrderDetail from '@/pages/storepage/orderDetail' //提交订单
import Setting from '@/pages/mypage/setting' //账户设置
import AccountAuth from '@/pages/mypage/accountAuth' //账户认证
import CashWay from '@/pages/mypage/cashWay' //收款方法
import WeChat from '@/pages/mypage/weChat' //微信
import Alipay from '@/pages/mypage/alipay' //支付宝
import BankCard from '@/pages/mypage/bankCard' //银行卡
import MoneyPass from '@/pages/mypage/moneyPass' //资金密码
import LogPass from '@/pages/mypage/logPass' //登录密码
import Order from '@/pages/mypage/order' //订单
import OrderInfo from '@/pages/mypage/orderInfo' //订单详情
import DealList from '@/pages/mypage/dealList' //交易列表
import Earnings from '@/pages/mypage/earnings' //收益
import Strategy from '@/pages/mypage/strategy' //攻略
import Group from '@/pages/mypage/group' //团队
import DirectDrive from '@/pages/mypage/directDrive' //直推
import TransferAcc from '@/pages/mypage/transferAcc' //转账
import MoneyCode from '@/pages/mypage/moneyCode' //收款码
import MyAddress from '@/pages/mypage/myAddress' //我的收货地址
import AddAdderss from '@/pages/mypage/addAdderss' //增加地址
import EditAddress from '@/pages/mypage/editAddress' //编辑地址
import Payment from '@/pages/dealpage/payment' //付款
Vue.use(Router)
export default new Router({
  // mode: "history",
  // scrollBehavior(to, from, savedPosition) {
  // 	//判断如果滚动条的位置存在直接返回到当前位置，否者返回到起点
  // 	console.log(to);
  // 	console.log(from);
  // 	console.log(savedPosition);
  //   if (to.hash) {
  //     return {
  //       selector: to.hash
  //     }
  //   }
  //   // if (savedPosition) {
  // 	// 	console.log("111");
  //   //   return {x: 500, y: 500}
  //   // } else {
  // 	// 	console.log("222");
  //   //   if (to.hash) {
  //   //     return {
  //   //       selector: to.hash
  //   //     }
  //   //   }
  //   // }
  // },
  routes: [{ //默认路由
      path: '/',
      name: 'login',
      components: {
        main: Login,
      },
      meta: {
        index: 1,
      }
    },
    {
      path: '/forgetpwd',
      name: 'forgetpwd',
      components: {
        main: ForgetPwd
      },
      meta: {
        index: 2
      }
    },
    {
      path: '/register',
      name: 'register',
      components: {
        main: Register
      },
      meta: {
        index: 2
      }
    },
    {
      path: '/home',
      name: 'home',
      components: {
        main: Home,
        footer: BotNav,
      },
      meta: {
        index: 2,
        // none: "true",
        // keepAlive:true,
      }
    },
    {
      path: '/deal',
      name: 'deal',
      components: {
        main: Deal,
        footer: BotNav,
      },
      meta: {
        index: 2,
        // none: "true",
        // keepAlive:true,
      }
    },

    {
      path: '/chat',
      name: 'chat',
      components: {
        main: Chat,
      },
      meta: {
        index: 6,
        keepAlive: true,
      }
    },
    {
      path: '/aboutBala',
      name: 'aboutBala',
      components: {
        main: AboutBala,
      },
      meta: {
        index: 4,
        // keepAlive:true,
      }
    },



    {
      path: '/menCoin',
      name: 'menCoin',
      components: {
        main: MenCoin,
      },
      meta: {
        index: 4,
        // keepAlive:true,
      }
    },
    {
      path: '/store',
      name: 'store',
      components: {
        main: Store,
        footer: BotNav,
      },
      meta: {
        index: 2,
        // none: "true",
        // keepAlive:true,
      }
    },
    {
      path: '/Transfer',
      name: 'Transfer',
      components: {
        main: Transfer,
        footer: BotNav,
      },
      meta: {
        index: 2,
        none: "true",
        // keepAlive:true,
      }
    },
    {
      path: '/mine',
      name: 'mine',
      components: {
        main: Mine,
        footer: BotNav,
      },
      meta: {
        index: 2,
        none: "true",
        // keepAlive:true
      }
    },
    {
      path: '/myMill',
      name: 'myMill',
      components: {
        main: MyMill,
      },
      meta: {
        index: 3,
        keepAlive: true
      }
    },
    {
      path: '/orePool',
      name: 'orePool',
      components: {
        main: OrePool,
      },
      meta: {
        index: 4,
        keepAlive: true
      }
    },
    {
      path: '/wallet',
      name: 'wallet',
      components: {
        main: Wallet,
      },
      meta: {
        index: 3,
        // keepAlive: true
      }
    },
    {
      path: '/flashAgainst',
      name: 'flashAgainst',
      components: {
        main: FlashAgainst,
      },
      meta: {
        index: 5,
        // keepAlive:true
      }
    },
    {
      path: '/flashRecord',
      name: 'flashRecord',
      components: {
        main: FlashRecord,
      },
      meta: {
        index: 6,
        keepAlive: true
      }
    },
    {
      path: '/lifeSection',
      name: 'lifeSection',
      components: {
        main: LifeSection,
      },
      meta: {
        index: 3,
        keepAlive: true
      }
    },
    {
      path: '/games',
      name: 'games',
      components: {
        main: Games,
      },
      meta: {
        index: 3,
        keepAlive: true
      }
    },
    {
      path: '/messages',
      name: 'messages',
      components: {
        main: Messages,
      },
      meta: {
        index: 3,
        // keepAlive: true
      }
    },
    {
      path: '/messDetail',
      name: 'messDetail',
      components: {
        main: MessDetail,
      },
      meta: {
        index: 4,
        // keepAlive: true
      }
    },
    {
      path: '/coinTrend',
      name: 'coinTrend',
      components: {
        main: CoinTrend,
      },
      meta: {
        index: 3,
        keepAlive: true
      }
    },
    {
      path: '/vCoin',
      name: 'vCoin',
      components: {
        main: VCoin,
      },
      meta: {
        index: 3,
        keepAlive: true
      }
    },
    {
      path: '/generalize',
      name: 'generalize',
      components: {
        main: Generalize,
      },
      meta: {
        index: 4,
        keepAlive: true
      }
    },
    {
      path: '/comDetail',
      name: 'comDetail',
      components: {
        main: ComDetail,
      },
      meta: {
        index: 3,
        keepAlive: true
      }
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      components: {
        main: OrderDetail,
      },
      meta: {
        index: 4,
        // keepAlive: true
      }
    },
    {
      path: '/setting',
      name: 'setting',
      components: {
        main: Setting,
      },
      meta: {
        index: 3,
        keepAlive: true
      }
    },
    {
      path: '/accountAuth',
      name: 'accountAuth',
      components: {
        main: AccountAuth,
      },
      meta: {
        index: 4,
        // keepAlive:true
      }
    },
    {
      path: '/cashWay',
      name: 'cashWay',
      components: {
        main: CashWay,
      },
      meta: {
        index: 6,
        // keepAlive:true,
      }
    },
    {
      path: '/weChat',
      name: 'weChat',
      components: {
        main: WeChat,
      },
      meta: {
        index: 7,
        // keepAlive:true,
      }
    },
    {
      path: '/alipay',
      name: 'alipay',
      components: {
        main: Alipay,
      },
      meta: {
        index: 7,
        // keepAlive:true,
      }
    },
    {
      path: '/bankCard',
      name: 'bankCard',
      components: {
        main: BankCard,
      },
      meta: {
        index: 7,
        // keepAlive:true,
      }
    },
    {
      path: '/moneyPass',
      name: 'moneyPass',
      components: {
        main: MoneyPass,
      },
      meta: {
        index: 5,
        // keepAlive:true,
      }
    },
    {
      path: '/logPass',
      name: 'logPass',
      components: {
        main: LogPass,
      },
      meta: {
        index: 5,
        // keepAlive:true,
      }
    },
    {
      path: '/order',
      name: 'order',
      components: {
        main: Order,
      },
      meta: {
        index: 4,
        // keepAlive:true,
      }
    },
    {
      path: '/orderInfo',
      name: 'orderInfo',
      components: {
        main: OrderInfo,
      },
      meta: {
        index: 5,
        // keepAlive:true,
      }
    },
    {
      path: '/dealList',
      name: 'dealList',
      components: {
        main: DealList,
      },
      meta: {
        index: 4,
        // keepAlive:true,
      }
    },
    {
      path: '/earnings',
      name: 'earnings',
      components: {
        main: Earnings,
      },
      meta: {
        index: 4,
        // keepAlive:true,
      }
    },
    {
      path: '/strategy',
      name: 'strategy',
      components: {
        main: Strategy,
      },
      meta: {
        index: 5,
        // keepAlive:true,
      }
    },
    {
      path: '/group',
      name: 'group',
      components: {
        main: Group,
      },
      meta: {
        index: 4,
        // keepAlive:true,
      }
    },
    {
      path: '/directDrive',
      name: 'directDrive',
      components: {
        main: DirectDrive,
      },
      meta: {
        index: 5,
        // keepAlive:true,
      }
    },
    {
      path: '/transferAcc',
      name: 'transferAcc',
      components: {
        main: TransferAcc,
      },
      meta: {
        index: 4,
        // keepAlive:true,
      }
    },
    {
      path: '/moneyCode',
      name: 'moneyCode',
      components: {
        main: MoneyCode,
      },
      meta: {
        index: 4,
        // keepAlive:true,
      }
    },
    {
     path: '/myAddress',
     name: 'myAddress',
     components: {
       main: MyAddress,
     },
     meta: {
       index: 5,
       // keepAlive:true,
     }
   },
    {
      path: '/addAdderss',
      name: 'addAdderss',
      components: {
        main: AddAdderss,
      },
      meta: {
        index: 6,
        // keepAlive:true,
      }
    },
     {
      path: '/editAddress',
      name: 'editAddress',
      components: {
        main: EditAddress,
      },
      meta: {
        index: 6,
        // keepAlive:true,
      }
    },
 {
   path: '/payment',
   name: 'payment',
   components: {
     main: Payment,
   },
   meta: {
     index: 5,
     // none: "true",
     // keepAlive:true,
   }
 },
  ],
});
