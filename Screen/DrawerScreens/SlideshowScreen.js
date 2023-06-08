//import Slideshow from 'react-native-slideshow';
import React, { Component } from 'react';

import { Base_url, RequestOptionsGet, RequestOptionsPut, RequestOptionsPost } from '../utils/utils';

export default class Slideshow extends Component {
  /* async getPublicitec(){   
   const fetchUrl =  `publicites`;
   
       const responseJson = await RequestOptionsGet(fetchUrl);
       
        
      if(responseJson.data.length>0)
       {
         let datas = [];
           Object.entries(responseJson.data).map(([key, value]) => {
             datas.push({ title: value.titre, caption: value.lien , url : `${Base_url}images/${value.image}.jpg`});
           });
        ////console.log(datas)
         this.setState({dataSource: datas});
       }   
 }*/
  constructor({ props }) {
    super(props);
    this.state = {
      position: 1,
      interval: null,
      dataSource: [
        {
          title: 'Title 1',
          caption: 'Caption 1',
          url: Base_url + 'images/img/no-picture.png',
        },
      ],
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
        });
      }, 2000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <Slideshow
        dataSource={this.state.dataSource}
        position={this.state.position}
        onPositionChanged={position => this.setState({ position })} />
    );
  }
}