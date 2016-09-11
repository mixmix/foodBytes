import React from 'react'
import speechRecognition from '../speechRecognition.js'
import Audio from './Audio'
import { bindActionCreators } from 'redux'
import { nextDispatch, previousDispatch, repeatDispatch, fetchRecipeSteps } from '../actions/actionCreators'
import { connect } from 'react-redux'


class RecipePage extends React.Component {

  /* Checks if the data ready and if so then will create audio component and play the audio */
  checkReady(){
    const { playing } = this.props.data
    if (playing !== undefined) {
      console.log("What is playing? ", playing)
      console.log("this is the props", this.props);
      console.log('This is the audio being played ', this.props.data.audio_path[this.props.data.currentStep - 1])
      return <Audio currentStep={this.props.data.currentStep} audio_path={this.props.data.audio_path[this.props.data.currentStep - 1]} playing={playing}/>
    }
  }

  /* This method gets the individual instruction and put it back to the <h3> tage  */
  getInstructions(instructions){
    if (instructions !== undefined){
      return instructions.map((ingredient) => ingredient)
    }
  }

  componentDidMount () {
    const { fetchRecipeSteps } = this.props
    const id = this.props.params.id

    fetchRecipeSteps(id)
      // go to the api, get recipes
      // dispatch RECEIVE_RECIPE_STEPS
      // run the speechRecognition(this.props, classToListenTo)  as a callback

    // bad mvp
    speechRecognition(this.props)
  }

  componentWillUnmount () {
    // later
    // destroy the listeners
  }

  render(){
    const { cooking_time, ingredients, instructions } = this.props.data
    return (
      <div className="jumbotron">
        {/* This is the placeholder the button */}
        <button id="speech">Start</button>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div className="caption text-center">
              <h3>Food Bytes</h3>
            </div>
            <div>
              <h5>Available Commands: 'Next' 'Previous' 'Repeat'</h5>
            </div>
           <div className="thumbnail">
             <img src="http://cook.sndimg.com/content/dam/images/cook/fullset/2012/9/24/0/CC-kelsey-nixon_grilled-cheese-sandwich-recipe-02_s4x3.jpg/jcr:content/renditions/cq5dam.web.266.200.jpeg" alt="sandwich" ></img>
           </div>
          </div>
        </div>
        <h3>Cook time: {cooking_time}</h3>
        <h3>Ingredients: {ingredients}</h3>
        <h3>Instructions:{this.getInstructions(instructions)} </h3>
        {this.checkReady()}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  //bindActionCreators is unknown. keep in mind
  return bindActionCreators({ nextDispatch,  previousDispatch, repeatDispatch, fetchRecipeSteps }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    data: state.recipe
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipePage)
