import React,{FC} from 'react';
import { Map,Marker,Markers,InfoWindow } from 'react-amap';
import { AST_NameMapping } from 'terser';
// import styles from './index.less';


const MapContainer = () => {
    return (
        <div style={{ width: '100%', height: '400px' }} >
            <Map amapkey='dc150cf59bd28e7d6d73c7c7738b399a' />
        </div>
    )

}

const randomPosition = () => ({
    longitude: 100 + Math.random() * 20,
    latitude: 30 + Math.random() * 20
  })
  const randomMarker = (len) => (
    Array(len).fill(true).map((e, idx) => ({
      position: randomPosition(),
      key:idx
    }))
  );  
  
  const MapSearch = (props) => {
    const map = props.__map__;
    console.log('dddd',map.Autocomplete)
    // var autoComplete= new AMap.Autocomplete({});
    if(!map) {
      console.log('组件必须作为Map的子组件使用');
      return ;
    }

    return(
      <div>
          <span  >请输入关键字</span>
          <input id='tipinput' type="text"/>
      </div>
    )
  }

  // const searchPlace =(map) => {
  //   AMap.service(["AMap.PlaceSearch"], function() {
  //     //构造地点查询类
  //     var placeSearch = new AMap.PlaceSearch({ 
  //         pageSize: 5, // 单页显示结果条数
  //         pageIndex: 1, // 页码
  //         city: "010", // 兴趣点城市
  //         citylimit: true,  //是否强制限制在设置的城市内搜索
  //         map: map, // 展现结果的地图实例
  //         panel: "panel", // 结果列表将在此容器中进行展示。
  //         autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
  //     });
  //     //关键字查询
  //     placeSearch.search('北京大学');
  // });
  // }

class MapApp extends React.Component {
    constructor(props) {
      super(props);
      // Good Practice
      this.mapCenter = { longitude: 120, latitude: 30 };
      this.markerPosition = {longitude: 121, latitude: 36}
      this.state ={
        markers: [
          {
            position:{
              latitude: 31.349136,
              longitude: 121.498416
              },
            key:'B0FFHHY7XU',
            label:1
        },
        {
          key: "B0FFHJ6QOC",
          position:{
            latitude: 31.349136,
            longitude: 121.498555
          },
          label:2
        }
      ],
        infoWindowPosition:{
            longitude: 120,
            latitude: 30
        },
        place:"微盟",
        visible:false
      }
      this.mapEvent ={
        created:this.searchPlace
      }
      this.markersEvents = {
        created:(allMarkers) => { 
          console.log('All Markers Instance Are Below');
          console.log(allMarkers);
        },
        click: (e, marker) => {
            const {position,key} = marker.getExtData();
            console.log('点击的是哪个点',key)

            const infoWindowPosition ={
                longitude:position.longitude,
                latitude:position.latitude+0.7
            }
            this.setState({infoWindowPosition},()=>{
                this.toggleVisible();
            })
        },
        dragend: (MapsOption, marker) => { /* ... */ }
      }
    }
    searchPlace =(map) => {
      const {place} =this.state;
      const _this =this;
      AMap.service(["AMap.PlaceSearch"], function() {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({ 
            pageSize: 5, // 单页显示结果条数
            pageIndex: 1, // 页码
            city: "上海", // 兴趣点城市
            citylimit: true,  //是否强制限制在设置的城市内搜索
            // map: map, // 展现结果的地图实例
            // panel: "panel", // 结果列表将在此容器中进行展示。
            autoFitView: true,
            // selectChanged:()=>{
            //   console.log('触发了改变')
            // }
        });
        //关键字查询
        placeSearch.search(place,(status,result)=>{
          var pois = result.poiList.pois;
          let markers = [];
          console.log('淡粉色的',pois)
          markers=  pois.map((item,index) => ({
            position:{
              longitude:item.location.lng,
              latitude:item.location.lat
            },
          }))

        //   {
        //     position:{
        //       latitude: 31.349136,
        //       longitude: 121.498416
        //       },
        //     key:'B0FFHHY7XU',
        //     label:1
        // },
          _this.setState({markers},()=>{
            //  map.setFitView();
          })
          // for(var i = 0; i < pois.length; i++){
          //     var poi = pois[i];
          //     var marker = [];
          //     marker[i] = new AMap.Marker({
          //         position: poi.location,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          //         title: poi.name
          //     });
          //     // 将创建的点标记添加到已有的地图实例：
          //     map.add(marker[i]);
          // }
          // map.setFitView();
        });

    });
    }
    toggleVisible() {
        this.setState({
          visible: !this.state.visible
        })
      }
      handleEnter =(e) => {
        const value = e.target.value;
        this.setState({place:value},()=>{
          this.searchPlace()
        })
        console.log('是的',value)
      }
    render() {
        const plugins = [
            'Scale',
            'ControlBar'
        ];
console.log('1111',this.state.markers)
       const panel =  {
          "position": "absolute",
          "background-color": "white",
          "max-height": "90%",
          "overflow-y": "auto",
          "top": '10px',
          "right": '10px',
          "width": '280px'
      }
        const styleA = {
            position: 'absolute',
            top: '10px',
            left: '10px',
            padding: '5px 10px',
            border: '1px solid #d3d3d3',
            backgroundColor: '#f9f9f9'
          }
          const loadingStyle = {
            position: 'relative',
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }
          const styleC = {
            background: `url('http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '30px',
            height: '40px',
            color: '#000',
            textAlign: 'center',
            lineHeight: '40px'
          }
          const html = `<div><h4>Greetings</h4><p>This is content of this info window</p><p>Click 'Change Value' Button: ${this.state.value}</p></div>`;  
      return <div style={{ width: '100%', height: '400px' }}>
        <Map 
            amapkey='dc150cf59bd28e7d6d73c7c7738b399a'
            plugins={plugins}
            // loading={loading}
            status= { 
                {
                    animateEnable:true
                }   
            }
            lang='zh_cn'
            zoom={6}
            center={this.mapCenter}
            events={this.mapEvent}
        >
          <div id="panel"></div>
            <div style={styleA}>
              <span  >请输入关键字</span>
              <input id='tipinput' type="text" onBlur={this.handleEnter}  />
            </div>
            {/* <MapSearch  /> */}
            <Markers 
                events={this.markersEvents}
                markers={this.state.markers}
                // render={(item)=>{
                //   return <span>{item.label}</span>
                // }}
            />
            
            {/* <Marker position={{longitude: 120, latitude: 34 }} >
            <div style={styleC}>1</div>
          </Marker> */}

            {/* <InfoWindow
            position={this.state.infoWindowPosition}
            visible={this.state.visible}
            content={html}
            isCustom={false}
            events={this.toggleVisible}
          /> */}
        </Map>
      </div>
    }
  }


export default MapApp;