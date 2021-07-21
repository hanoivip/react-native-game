import * as React from 'react'
import { View, Button, Dimensions, Text, Platform, DevSettings } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { wrapper, header, main, footer } from '../styles/app.style'

const initialLayout = { flex: 1 }

class ArticleListView extends React.Component {
  renderLink(article)
  {
    return (
      <View key={article.id} style={{ borderBottomWidth: 1, paddingTop: 10, paddingBottom: 10, flexDirection: 'row' }}>
        <Text style={{color: 'red'}}>[{article.tags}]</Text>
        <Text onPress={() => this.props.onClick(article.entry)}>{article.title}</Text>
      </View>
    )
  }
  render()
  {
    const articles = this.props.articles.data
    let list=[]
    Object.values(articles).map(article => {
      list.push(this.renderLink(article))
    })
    return (
      <View style={{height: 300}}>
        {list}
      </View>
    )
  }
}

export default class ArticleTabFragment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {index: 0}
  }

  setIndex(i)
  {
    this.setState({ index: i})
  }

  componentDidMount()
  {
    this.props.loadArticleList()
  }

  render()
  {
    const articles = this.props.articles
    const index = this.state.index
    const onClick = this.props.onClick

    let routes = []
    if (articles != null) {
      routes = articles.title
    }
    return (
      <View style={main.tab}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={(route, jumpTo)  => {
            //console.log(route)
            return <ArticleListView articles={articles[route.route.key]} jumpTo={jumpTo} onClick={onClick}/>
          }}
          onIndexChange={this.setIndex.bind(this)}
          initialLayout={initialLayout}
        />
        { routes.length <= 0 ?
          Platform.select({
            android: (
              <View>
                <Text>Loading........</Text>
                <Button title="Reload" onPress={() => DevSettings.reload()} />
              </View>),
            default: (
              <View>
                <Text>Loading........</Text>
                <Text>Load fail! Try to close and reopen app!</Text>
              </View>)
          }) : (<View/>) }
      </View>
    )
  }
}
