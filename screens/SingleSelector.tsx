import { connect } from 'react-redux';
import React, {
  Component
} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Button,
  Text
} from 'react-native';
import CustomMultiPicker from "react-native-multiple-select-list";
import { Card, Input, CardSection,  Confirm } from '../components/common';

// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/EvilIcons';


class MultiSelector extends Component {

  constructor(props){
    super(props);
    this.state = {
      pageWidth: Dimensions.get('window').width,
      pageHeight: Dimensions.get('window').height,
      searchText: null,
      selected: [1,2],
    //   theAbc: '',
    };
  }


  componentDidMount = () => {
    // const selected = this.props.selected
    // if(typeof selected === "object"){
    //   console.log('13-  selected  = ' , selected);
    //   selected.map(select => {
    //     this._onSelect(select)
    //   })
    // } else {
    //   this._onSelect(selected)
    // }
  }

  componentWillUnmount() {
   console.log(' componentWillUnmount  called');
  }

  static navigationOptions = ({ navigation }) => ({
      // title: `${navigation.state.params.user}`,
  });

    render() {
      const userList = {
        "123":"Red_Priority_P",
        "124":"Homework_Needed_P",
        "p1":"RedPriority",
        "p2":"Distressed_RequireWork_P",
        "p3":"Research_Needed_P",
        "p4":"Continue_P",
        "p5":"Send_Contract_P",
        "p6":"Later_P",
        "p7":"No_Updated_P",
        "p8":"Later_Today_P",
        "p9":"Left_VM_P",
        "p10":"Motivated_Seller_P",
        "p11":"Bi_Weekly_P",
        "p12":"Polite_P",
        "p13":"Awesome_Person_P",
        "p14":"Negotiation_Willing_P",
        "p15":"Counter_P",
        "p16":"Wrong_NO_P"
}
   
      // const { params } = this.props.navigation.state;
      console.log('76- SingleSelector  =', this.props );
      return (
        <ScrollView>

    <Button title="Submit" onPress={() =>  { 
          
          console.log('82- Multi page - submit props =', this.props );
          console.log('83- Multi page - this.state =', this.state );

     
    //   this.setState({  theAbc: theitem });
      console.log('87- Multi page - this.state =', this.state );
      console.log('88- Multi page - this.state =', this.state.theAbc );
        let passVal = this.state.theAbc; 
        let passVal_2 = {passVal}
        console.log('91- Multi page - passVal=', passVal);
        console.log('92- Multi page - passVal2=', passVal_2);

          this.props.navigation.navigate('DetailView', passVal_2 )
          
          // this.setState ({  this.props.navigation.params.item :'the item' });

          } 
          }/>



<CustomMultiPicker
      options={userList}
      search={true} // should show search bar?
      multiple={false} //
      placeholder={"Search-2"}
      placeholderTextColor={'#757575'}
      returnValue={"label"} // label or value
      callback={(res)=>{

        console.log('86-  onclick =', res); 
      
        let value; 
        for(let i=0;i<=res.length;i++){
           if (res.indexOf(res[i]) !== -1) {
               console.log(res[i]);
               value = res[i];

              //  this.props.propertyUpdatePriority({ _id: this.props._id, prop: res[i], value: true })
           }
         }
         this.setState({  theAbc: value });
         console.log('120-after setting the value  theAbc: value so this.props=', this.props ); 


      }} // callback, array of selected items
      rowBackgroundColor={"#eee"}
      rowHeight={40}
      rowRadius={5}
      iconColor={"#00a2dd"}
      iconSize={30}
      selectedIconName={"ios-checkmark-circle-outline"}
      unselectedIconName={"ios-radio-button-off-outline"}
      scrollViewHeight={530}
      selected={[]} // list of options which are selected by default
    />
    </ScrollView>
      );
    }
}

export default MultiSelector; 


