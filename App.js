import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableNativeFeedbackBase, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-community/async-storage'


let surahList = [
  "Al-Fatihah",
  "Al-Baqarah",
  "Aali Imran",
  "An-Nisa’",
  "Al-Ma’idah",
  "Al-An’am",
  "Al-A’raf",
  "Al-Anfal",
  "At-Taubah",
  "Yunus",
  "Hud",
  "Yusuf",
  "Ar-Ra’d",
  "Ibrahim",
  "Al-Hijr",
  "An-Nahl",
  "Al-Isra’",
  "Al-Kahf",
  "Maryam",
  "Ta-Ha",
  "Al-Anbiya’",
  "Al-Haj",
  "Al-Mu’minun",
  "An-Nur",
  "Al-Furqan",
  "Ash-Shu’ara’",
  "An-Naml",
  "Al-Qasas",
  "Al-Ankabut",
  "Ar-Rum",
  "Luqman",
  "As-Sajdah",
  "Al-Ahzab",
  "Saba’",
  "Al-Fatir",
  "Ya-Sin",
  "As-Saffah",
  "Sad",
  "Az-Zumar",
  "Ghafar",
  "Fusilat",
  "Ash-Shura",
  "Az-Zukhruf",
  "Ad-Dukhan",
  "Al-Jathiyah",
  "Al-Ahqaf",
  "Muhammad",
  "Al-Fat’h",
  "Al-Hujurat",
  "Qaf",
  "Adz-Dzariyah",
  "At-Tur",
  "An-Najm",
  "Al-Qamar",
  "Ar-Rahman",
  "Al-Waqi’ah",
  "Al-Hadid",
  "Al-Mujadilah",
  "Al-Hashr",
  "Al-Mumtahanah",
  "As-Saf",
  "Al-Jum’ah",
  "Al-Munafiqun",
  "At-Taghabun",
  "At-Talaq",
  "At-Tahrim",
  "Al-Mulk",
  "Al-Qalam",
  "Al-Haqqah",
  "Al-Ma’arij",
  "Nuh",
  "Al-Jinn",
  "Al-Muzammil",
  "Al-Mudaththir",
  "Al-Qiyamah",
  "Al-Insan",
  "Al-Mursalat",
  "An-Naba’",
  "An-Nazi’at",
  "‘Abasa",
  "At-Takwir",
  "Al-Infitar",
  "Al-Mutaffifin",
  "Al-Inshiqaq",
  "Al-Buruj",
  "At-Tariq",
  "Al-A’la",
  "Al-Ghashiyah",
  "Al-Fajr",
  "Al-Balad",
  "Ash-Shams",
  "Al-Layl",
  "Adh-Dhuha",
  "Al-Inshirah",
  "At-Tin",
  "Al-‘Alaq",
  "Al-Qadar",
  "Al-Bayinah",
  "Az-Zalzalah",
  "Al-‘Adiyah",
  "Al-Qari’ah",
  "At-Takathur",
  "Al-‘Asr",
  "Al-Humazah",
  "Al-Fil",
  "Quraish",
  "Al-Ma’un",
  "Al-Kauthar",
  "Al-Kafirun",
  "An-Nasr",
  "Al-Masad",
  "Al-Ikhlas",
  "Al-Falaq",
  "An-Nas",
]

let customFonts = {
  NerkoOne: require('./assets/fonts/NerkoOne.ttf'),
  BebasNeue: require('./assets/fonts/BebasNeue.ttf'),
  FredokaOne: require('./assets/fonts/FredokaOne.ttf')
};

export default class App extends Component {

  constructor(props) {
	super(props)

	stateSurahs = makeSurahs(surahList)
	AsyncStorage.getItem('data').then((dataSurahs) => {
	if (dataSurahs) {
	  stateSurahs = JSON.parse(dataSurahs)
	}
	else {
	  AsyncStorage.setItem('data', JSON.stringify(stateSurahs))
  }
  this.setState({
    Surahs: stateSurahs,
})
	});
  this.state = {
    Surahs: false,
    fontsLoaded: false
  }
	this.reviseSurah = this.reviseSurah.bind(this)
  }

  reviseSurah(number) {
	let newSurahs = [...this.state.Surahs]
	newSurahs[number].revised = new Date().getTime()
	this.setState({Surahs: newSurahs})
	AsyncStorage.setItem('data', JSON.stringify(newSurahs))
  }

  async _loadFontsAsync() {
	await Font.loadAsync(customFonts);
	this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
	this._loadFontsAsync()
  }

  
  render() {
	if (this.state.fontsLoaded & this.state.Surahs != false) {
	  return (
		<ScrollView contentContainerStyle={styles.containerPadding} style={styles.container}>
      <Text style={[styles.title, styles.heading]}>Quran Reviser By Kaju</Text>
		  <Text style={styles.title}>Memorised Surahs</Text>
		  { this.state.Surahs.filter(d => d.revised).sort((a, b) => a.revised - b.revised).map((d, i) => {
			return (
			  <View key={i} style={styles.surah}>
				<Text style={styles.surahName}>{d.name}</Text>
				<Button title="Revised" color="darkblue" style={ styles.surahButton } onPress={() => this.reviseSurah(d.number - 1)}/>
			  </View>
			)
		  }
		  )}
		  <Text style={styles.title}>Not Memorised Surahs</Text>
		  { this.state.Surahs.filter(d => !d.revised).map((d, i) => {
			return (
			  <View key={i} style={styles.surah}>
				<Text style={styles.surahName}>{d.name}</Text>
				<Button title="Revised" color="darkblue" style={ styles.surahButton } onPress={() => this.reviseSurah(d.number - 1)}/>
			  </View>
			)
		  }
		  
		  )}
		</ScrollView>
	  )
	}
	else return <AppLoading />
  }
}


const styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: 'darkblue',
  },

  surahName: {
	fontFamily: "NerkoOne",
	fontSize: 30,
	color: "darkblue"
  },

  surahButton: {
	alignSelf: "baseline",
  },

  surah: {
	flex: 1,
	flexDirection: "row",
	justifyContent: "space-between",
	borderColor: "dodgerblue",
	backgroundColor: "dodgerblue",
	borderRadius: 100,
	borderStyle: "solid",
	borderWidth: 2,

	marginVertical: 15,
	padding: 25
  },

  containerPadding: {
	paddingVertical: 25,
	paddingHorizontal: 25
  },

  title: {
    fontSize: 35,
    fontFamily: "FredokaOne",
    color: "darkblue",
    backgroundColor: "dodgerblue",
    padding: 30,
    marginVertical: 60,
    borderRadius: 40
  },

  heading: {
    fontFamily: "BebasNeue",
    fontSize: 50,
    marginVertical: 0,
    padding: 25
  }
});


function makeSurahs(surahList) {
  let output = []

  surahList.forEach((surah, i) => {
	output.push({
	  number: i + 1,
	  name: surah,
	  revised: null
	})
  })

  return output
}