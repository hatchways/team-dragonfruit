import React, { Component } from 'react'
import WithBackground from '../../HOC/withBackground'
import './experience.css'
import SelectLanguage from '../select-language/select-language'




class Experience extends Component {

  state = {
    languageNumbers: 0,
    selectLanguages :[],
    skills: []
  }

  removeLanguage = (key) => {
    // let updatedSelected
    // this.state.selectLanguages.filter()
    console.log('salam')
    console.log(key)
  }
  addLanguage = () => {
    let id = Math.random()
    let selectedLangs = [...this.state.selectLanguages]
    selectedLangs.push({id:id,elem:<SelectLanguage removeLang={() => this.removeLanguage()} id={id} />})
    this.setState({ selectLanguages: selectedLangs })
  }
  onSelect
  render() {

    return (
      <WithBackground>
        <div className="languages-container">
          <h2>Add your experience here:</h2>
          {this.state.selectLanguages.map(language=>language.elem)}
          <div className="add_language-div">
            <button className="btn" onClick={() => {
              if (this.state.selectLanguages.length < 8) {
                this.addLanguage()
              }
            }}><i class='fas fa-plus'></i>
            </button>
            <p>Add language</p>
          </div>

        </div>
      </WithBackground>

    )
  }
}
export default Experience