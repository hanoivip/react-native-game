import React from 'react'
import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import * as Progress from 'react-native-progress'

export default class DownloadFragment extends React.Component {

  componentDidMount()
  {
    this.props.loadReleaseMeta();
    this.props.loadDownloadedMeta();
  }
  // show how to install file
  instructInstall()
  {
    // show youtube links
  }
  // start to download lastest version
  download()
  {
    const lastest = this.props.lastest
    const fileName = lastest.file_name +'_' + lastest.version_name + lastest.version_code + '.apk'
    this.props.fileDownload(lastest.url, fileName, lastest.file_size)
  }
  // cancel current download
  cancel()
  {
    if (this.props.downloading != null)
      this.props.fileDownloadCancel(this.props.downloading.task)
  }
  // check for downloaded version
  isDownloaded()
  {
    const lastest = this.props.lastest
    const fileName = lastest.file_name +'_' + lastest.version_name + lastest.version_code + '.apk'
    return this.props.fileExists(fileName)
  }
  isDownloading()
  {
    return this.props.downloading != null
  }
  // convert current downloading info to circle progress: 0-1
  convertProgress()
  {
    return this.props.downloading.percent
  }
  needUpdate()
  {
    const downloaded = this.props.downloaded
    const lastest = this.props.lastest
    return download == null || downloaded.version_name != lastest.version_name || downloaded.version_code < lastest.version_code
  }
  locateFile()
  {

  }

  renderActions()
  {
    let actionBtn = null;
    if (isDownloaded()) {
      if (needUpdate()) {
        actionBtn=(<Button onPress={download} title='Update'></Button>)
      }
      else {
        actionBtn=(
          <View>
            <Button onPress={instructInstall} title='Install'></Button>
            <Button onPress={locateFile} title='Locate'></Button>
          </View>)
      }
    }
    else {
      if (isDownloading()) {
        actionBtn=(
          <View>
            <Progress.Circle size={30} progress={convertProgress()}/>
            <Button onPress={cancel} title='Cancel'></Button>
          </View>)
      }
      else {
        actionBtn=(<Button onPress={download} title='Download'></Button>)
      }
    }
    return actionBtn
  }

  render()
  {
    const lastest = this.props.lastest;
    if (lastest == null) {
      return (<View><Text>This game has no any release yet! Please kindly wait ...</Text></View>)
    }
    else {
      let actions = renderActions()
      return (
        <View>
          <Text>Filename: {lastest.file_name}</Text>
          <Text>Version name: {lastest.version_name}</Text>
          <Text>Version code: {lastest.version_code}</Text>
          {actions}
        </View>
      )
    }
  }
}
