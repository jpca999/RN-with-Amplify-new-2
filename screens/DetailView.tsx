// Bring in action from api etc here. 
import React, { useState } from 'react';
import Form from '../forms/Form';
// import { login } from '../api/authentication';
// import { setToken } from '../api/token';
import { Text, TextInput, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';

// const LoginScreen = ({ navigation }) => {
    const DetailView = (props) => {   

      console.log('12- props in Detials View recived =' , props); 
      const { CompanyName , executiveFirstName } = props.route.params.item;
      
      console.log('16 - CompanyName = ', CompanyName); 
      console.log(' 17 - executiveFirstName = ', executiveFirstName); 
      console.log(' 18 - Full Item  = ', props.route.params.item); 

      
        const handleResult = async (result) => {
            // if (result.ok && result.data) {
            // //   await setToken(result.data.auth_token);
            //   navigation.navigate('Home');
            // } else if (result.status === 401) {
            //   throw new Error('Invalid login.');
            // } else {
            //   throw new Error('Something went wrong.');
            // }
          };

          return (
            <SafeAreaView style={styles.container}> 
              <ScrollView style={styles.scrollView}>
            <Form
            //   action={login}
              afterSubmit={handleResult}
              buttonText="Submit"
              fields={{
               
              }}
            />
            </ScrollView>
            </SafeAreaView>
          );
        
};

export default DetailView;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15,
    },
    error: {
      marginBottom: 20,
      height: 17.5,
    },
  });
