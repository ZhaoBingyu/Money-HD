import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {HomeComponent} from './components/common/home/home.component';
import {PortalComponent} from './components/portal/portal.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'}, // 理财产品首页
  {
    path: 'home', component: HomeComponent,
    children: [
      {path: '', redirectTo: 'moneyHDHome', pathMatch: 'full'},
      {
        // 理财产品首页 moneyHDHome
        path: '',
        loadChildren: './components/view/money-hd-home/money-hd-home.module#MoneyHdHomeModule',
      },
      {
        // 登录 login
        path: '',
        loadChildren: './components/view/login/login.module#LoginModule',
      },
      {
        // 注册 register
        path: '',
        loadChildren: './components/view/register/register.module#RegisterModule',
      },
      {
        // 开户 openAccount 中国工商银行
        path: '',
        loadChildren: './components/view/open-account/open-account.module#OpenAccountModule',
      },
      {
        // 开户 openAccountJSBC JSBC 江苏银行
        path: '',
        loadChildren: './components/view/open-account-jsbc/open-account-jsbc.module#OpenAccountJsbcModule',
      },

      {
        // 开户 openAccountXYBC XYBC 兴业银行
        path: '',
        loadChildren: './components/view/open-account-xybc/open-account-xybc.module#OpenAccountXybcModule',
      },
      {
        // 新增理财账户 对公账户信息 addPubAccountInfo
        path: '',
        loadChildren: './components/view/add-public-account-info/add-public-account-info.module#AddPublicAccountInfoModule',
      },
      {
        // 忘记密码 findPassword
        path: '',
        loadChildren: './components/view/find-password/find-password.module#FindPasswordModule',
      },
      {
        // 申购 applyForPurchase
        path: '',
        loadChildren: './components/view/apply-for-purchase/apply-for-purchase.module#ApplyForPurchaseModule',
      },
      {
        // 赎回 redeemPurchase
        path: '',
        loadChildren: './components/view/redeem-purchase/redeem-purchase.module#RedeemPurchaseModule',
      },
      {
        // 提现 drawCash
        path: '',
        loadChildren: './components/view/draw-cash/draw-cash.module#DrawCashModule',
      },
      {
        // 修改登录密码 updateLoginPassword
        path: '',
        loadChildren: './components/view/update-login-password/update-login-password.module#UpdateLoginPasswordModule',
      },
      {
        // 修改支付密码 updatePayPassword
        path: '',
        loadChildren: './components/view/update-pay-password/update-pay-password.module#UpdatePayPasswordModule',
      },
      {
        path: 'enterCenter', component: PortalComponent, // 企业中心
        children: [
          {path: '', redirectTo: 'myAssets', pathMatch: 'full'}, // 我的资产
          {
            // 我的资产 myAssets
            path: '',
            loadChildren: './components/view/enter-center/my-assets/my-assets.module#MyAssetsModule',
          },
          {
            // 企业信息管理 accountInfo
            path: '',
            loadChildren: './components/view/enter-center/account-info/account-info.module#AccountInfoModule',
          },
          {
            // 理财账户管理 accountManagement
            path: '',
            loadChildren: './components/view/enter-center/account-management/account-management.module#AccountManagementModule',
          },
          {
            // 对公账户管理 publicAccountMangement
            path: '',
            loadChildren: './components/view/enter-center/public-account-management/public-account-management.module#PublicAccountManagementModule',
          },
          {
            // 交易记录  申购 tradeRecordPurchase
            path: '',
            loadChildren: './components/view/enter-center/trade-record/trade-record-purchase/trade-record-purchase.module#TradeRecordPurchaseModule',
          },
          {
            // 交易记录  赎回 tradeRecordRedeem
            path: '',
            loadChildren: './components/view/enter-center/trade-record/trade-record-redeem/trade-record-redeem.module#TradeRecordRedeemModule',
          },
          {
            // 交易记录  转出 tradeRecordTurnout
            path: '',
            loadChildren: './components/view/enter-center/trade-record/trade-record-turnout/trade-record-turnout.module#TradeRecordTurnoutModule',
          },

          {
            // 交易记录  收益 tradeRecordProfit
            path: '',
            loadChildren: './components/view/enter-center/trade-record/trade-record-profit/trade-record-profit.module#TradeRecordProfitModule',
          },
        ]
      },
      {
        // 404
        path: '',
        loadChildren: './components/view/page-not-fond/page-not-fond.module#PageNotFondModule',
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
