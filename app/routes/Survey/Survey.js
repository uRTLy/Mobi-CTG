import { View, Text, StyleSheet, Picker, NetInfo } from "react-native";
import React, { Component } from "react";
import { Button, FormLabel, FormInput } from "react-native-elements";
import content from "../../config/content.js";
import { MaterialIcons } from "@exponent/vector-icons"

const { surveyOptions } = content;


class Survey extends Component {
  constructor () {
    super();
    this.state = {
      age: "",
      pregnancy: "pierwsza",
      ktg: "pierwsze",
      stressLevel: "mały stres",
      satisfactionLevel: "mały",
      steps: [],
      isConnected: false,
      ageError: false,
    };
  }
  componentWillMount () {
    NetInfo.isConnected.addEventListener("change", connection => {
      console.log(connection);
    });
  }
  // validate () {
  //   const { age } = this.state;
  //   const isLetter = this.validateResults(age);
  //   this.setState({ ageError: isLetter , age });
  //   return (isLetter && age.length);
  // }
  // validateResults (result) {
  //   console.log(result.split(""));
  //   const isString = result.split('').every(letter => !isNaN(parseInt(letter, 10)) );
  //   console.log(isString);
  //   return isString;
  // }
  goToHomeScene () {
    const stateToPass =  Object.assign({}, this.state, { steps: this.props.steps });
    fetch("https://mobictgbackend.herokuapp.com/api/survey",
     {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ ...stateToPass })
    });

  this.setState({ age: "", steps: [] });
  this.props.navigator.push({
    name: "HomeScene"
    });
  }
  render () {
    return (
      <View style={styles.container}>
        <View>
          <FormLabel style={styles.FormLabel}> Wiek </FormLabel>
          <FormInput onChangeText={(age) => this.setState({ age })} />
        </View>


        <FormLabel style={styles.FormLabel}> Ciąza </FormLabel>

        <Picker
          selectedValue={this.state.pregnancy}
          onValueChange={pregnancy => this.setState({ pregnancy })}>
        {surveyOptions.pregnancy.map((value, i) => <Picker.Item key={i} label={value} value={value}/>)}
        </Picker>

        <FormLabel style={styles.FormLabel}> Badanie KTG podczas tej ciązy </FormLabel>

        <Picker
          selectedValue={this.state.ktg}
          onValueChange={ktg => this.setState({ ktg })}>
        {surveyOptions.KTG.map((value, i) => <Picker.Item key={i} label={value} value={value}/>)}
        </Picker>

        <FormLabel style={styles.FormLabel}> Ocena poziomu stresu podczas wykonywania badania </FormLabel>

        <Picker
          selectedValue={this.state.stressLevel}
          onValueChange={stressLevel => this.setState({ stressLevel })}>
        {surveyOptions.stressLevel.map((value, i) =>
          <Picker.Item key={i} label={value} value={value}/>)}
        </Picker>

        <FormLabel style={styles.FormLabel}> Poziom satysfakcji z wykonanego badania</FormLabel>

        <Picker
          selectedValue={this.state.satisfactionLevel}
          onValueChange={satisfactionLevel => this.setState({ satisfactionLevel })}>
        {surveyOptions.satisfactionLevel.map((value, i) =>
          <Picker.Item key={i} label={value} value={value}/>)}
        </Picker>

        <Button style={styles.button} title="ZAKOŃCZ ANKIETĘ" onPress={() => this.goToHomeScene()}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    flex: 1,
    backgroundColor: "#2979ff",

  },
  button: {
    backgroundColor: "#1de9b6",
  },
  formlabel: {
    color: "#fff"
  }
});

export default Survey;
