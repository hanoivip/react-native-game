import { StyleSheet } from 'react-native';

export const common =  StyleSheet.create({
  failure: {
    color: 'red'
  },
  success: {
    color: 'green'
  },
  warn: {
    color: 'yellow'
  },
  validator: {
    color: 'red'
  }
});

export const wrapper = StyleSheet.create({

});

export const header = StyleSheet.create({
  topHeader: {
    height: 52,
    backgroundColor: '#2e393e'
  },
  btnMenu: {
    width: 50,
    height: 50,
    borderColor: '#62696b',
    borderWidth: 2,
    borderRadius: 50,
    position: 'absolute',
    left: '3%',
  },
  banner: {
    flex: 2
  },
  appIcon: {
    width: 136,
    height: 136,
    marginTop: 5,
    marginLeft: 11,
    marginRight: 11,
  },
  appInfo: {
    flexDirection: 'column',
    marginTop: 5,
    flex: 1
  },
  header: {
    borderTopWidth: 2,
    paddingTop: 5,
    height: 150,
    flexDirection: 'row',
  }
});

export const main = StyleSheet.create({
  tab: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  products: {
    flex: 1,
  },
  product: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1
  },
  productImage: {
    width: 120,
    height: 120,
  }
});

export const footer = StyleSheet.create({

});
