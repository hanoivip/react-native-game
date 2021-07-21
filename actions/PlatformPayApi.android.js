import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  finishTransactionIOS,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap'
//import { ORDER_PAID, ORDER_PAID_FAIL } from './Type'
//const orderPaidSuccess = (data) => ({ type: ORDER_PAID, data })
//const orderPaidFailure = (error, message) => ({ type: ORDER_PAID_FAIL, error, message})

export function platformIapHelper(order, item)
{
//  console.log('Android platform iap helper...' + item)
//  return (dispatch) => {
//    dispatch(startLoading())
  return new Promise((resolve, reject) => {
    RNIap.getProducts([item])
    .then(products => {
      products.map((product, i) => {
        // set developer payload: order
        RNIap.requestPurchase(item)
        .then(json => {
          //console.log(JSON.stringify(json))
//          dispatch(endLoading())
//          dispatch(orderPaidSuccess(json))
          resolve(json)
        })
        .catch(error => {
          console.log("Google request purchase error")
//          dispatch(endLoading())
//          dispatch(orderPaidFailure(99, error.message))
          //return null
          resolve(false)
        })
      })
    })
    .catch(error => {
      console.log("Google get products error")
//      dispatch(endLoading())
//      dispatch(orderPaidFailure(98, error.message))
      //return null
      resolve(false)
    })
  })
}

export function platformIapInit()
{
//  return (dispatch) => {
    try {
        RNIap.initConnection().then(result => {
          console.log('Google iap init connection:', result);
          RNIap.flushFailedPurchasesCachedAsPendingAndroid();
        })
      } catch (err) {
        console.warn(err.code, err.message);
      }

    const purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase: InAppPurchase | SubscriptionPurchase) => {
        const receipt = purchase.transactionReceipt;
        //console.log('Google purchase updated: ', purchase)
        if (receipt) {
          try {
            if (Platform.OS === 'ios')
            {
               finishTransactionIOS(purchase.transactionId);
            }
            else if (Platform.OS === 'android')
            {
              RNIap.consumePurchaseAndroid(purchase.purchaseToken, "")
            }
          } catch (ackErr) {
            console.warn('Google acknownlegde error ', ackErr);
            RNIap.consumePurchaseAndroid(purchase.purchaseToken, "")
          }
        }
      },
    )

    const purchaseErrorSubscription = purchaseErrorListener(
      async (error: PurchaseError) => {
        console.warn('Google purchase error', JSON.stringify(error))
        // try to fix callback
        RNIap.flushFailedPurchasesCachedAsPendingAndroid()
      },
    )
//  }
}
