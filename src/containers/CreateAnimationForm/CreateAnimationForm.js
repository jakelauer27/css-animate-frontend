import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { uid } from 'react-uid'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as API from '../../utils/apiCalls/apiCalls'
import { getMyAnimations } from '../../thunks/getMyAnimations'
import { removeAnimationForEdit, updateCurrentAnimation } from '../../actions/actions'
import { editAnimation } from '../../utils/apiCalls/apiCalls'
import * as formValidation from '../../utils/formValidators/formValidators'


export class CreateAnimationForm extends Component {
  constructor() {
    super()
    this.state = {
      properties: { name: '',
      duration: '',
      timingFunction: '',
      delay: '',
      iterationCount: '',
      direction: '',
      fillMode: ''
      },
      keyframes: [
        { label: '0%',
          name: '0%',
          properties: [
            { name: '', value: '' }
          ]
        },
        { label: '100%', name: '100%', properties: [{name: '', value: ''}]}],
      redirect: false,
      disabled: true
    }
  }

  componentDidMount() {
    const { animationToEdit } = this.props
    if(animationToEdit.properties) {
      this.setState({properties: animationToEdit.properties, keyframes: animationToEdit.keyframes.sections})
    }
  }

  handleSubmit = async () => {
    const { user_id, getMyAnimations, animationToEdit, cancelEdit, updateCurrentAnimation } = this.props
    const { properties, keyframes } = this.state
    let savedkeyframes = { name: properties.name, sections: keyframes}
    document.querySelector('.selected-animation').classList.remove('selected-animation')

    if (animationToEdit.properties) {
      await editAnimation(user_id, animationToEdit.id, {name: properties.name, user_id, id: animationToEdit.id, properties, keyframes: savedkeyframes})
      updateCurrentAnimation({id: animationToEdit.id, user_id, ani_name: properties.name, properties, keyframes: savedkeyframes})
      cancelEdit()
      await getMyAnimations(user_id)
      this.setState({redirect: true})
      return
    }

    const saved = await API.addAnimation(user_id, properties.name, JSON.stringify(properties), JSON.stringify(savedkeyframes))
    updateCurrentAnimation({id: saved.id, user_id, ani_name: properties.name, properties, keyframes: savedkeyframes})
    await getMyAnimations(user_id)
    this.setState({redirect: true})
  }

  handlePropertyChange = (e) => {
    const { value, name } = e.target
    const valid = formValidation.validateAnimationProp(e.target, value)
    const properties = {...this.state.properties}
    properties[name] = value
    this.setState({properties, disabled: (this.checkFormCompletion() || !valid)})
  }

  handleStageChange = (e) => {
    const { value, name } = e.target
    const valid = formValidation.keyframeStage(e.target, value)
    const keyframes = [...this.state.keyframes]
    keyframes[name].label = value
    keyframes[name].name = value
    this.setState({keyframes, disabled: (this.checkFormCompletion() || !valid)})
  }

  handlePropLabelChange = (e) => {
    const { value, name } = e.target
    const valid = formValidation.keyframeProperty(e.target, value)
    const keyframes = [...this.state.keyframes]
    keyframes[name[0]].properties[name[2]].name = value
    this.setState({keyframes, disabled: (this.checkFormCompletion() || !valid)})
  }

  handlePropValueChange = (e) => {
    const { value, name } = e.target
    const valid = formValidation.keyframeValue(e.target, value)
    const keyframes = [...this.state.keyframes]
    keyframes[name[0]].properties[name[2]].value = value
    this.setState({keyframes, disabled: (this.checkFormCompletion() || !valid)})
  }

  addProperty = (e) => {
    const { classList } = e.target
    const keyframes = [...this.state.keyframes]
    const newProperty = {name: '', value: ''}
    keyframes[classList[0]].properties.push(newProperty)
    this.setState({keyframes, disabled: this.checkFormCompletion()})
  }

  removeProperty = (e) => {
    const { classList } = e.target
    const keyframes = [...this.state.keyframes]
    keyframes[classList[0]].properties.splice(classList[1], 1)
    this.setState({keyframes, disabled: this.checkFormCompletion()})
  }

  addStage = (e) => {
    const { classList } = e.target
    const keyframes = [...this.state.keyframes]
    const newSection = {label: '%', name: '%', properties: [{name: '', value: ''}]}
    keyframes.splice([parseInt(classList[0])] + 1, 0, newSection)
    this.setState({keyframes, disabled: this.checkFormCompletion()})
  }

  removeStage = (e) => {
    const { classList } = e.target
    const keyframes = [...this.state.keyframes]
    keyframes.splice([parseInt(classList[0])], 1)
    this.setState({keyframes, disabled: this.checkFormCompletion()})
  }

  async cancelEdit() {
    await this.props.getMyAnimations(this.props.user_id)
    this.props.cancelEdit()
  }

  checkFormCompletion() {
    const { properties, keyframes } = this.state
    let incomplete = false
    Object.keys(properties).forEach(property => {
      if (!properties[property]) {return incomplete = true}
    })
    Object.keys(keyframes).forEach((section, i) => {
      if(!keyframes[i].name || !keyframes[i].label) {return incomplete = true}
      keyframes[i].properties.forEach((property, j) => {
        if (!keyframes[i].properties[j].name || !keyframes[i].properties[j].value ) {return incomplete = true}
      })
    })
    return incomplete
  }

  render() {
    let title = 'Create Animation'
    let exitButton = <Link to='/properties/selectAnimation' className='cancel-form-btn'>Cancel</Link>
    const { animationToEdit } = this.props
    const { keyframes, redirect } = this.state

    if(animationToEdit.properties) {
      title= 'Edit Animation'
      exitButton = <button className='cancel-form-btn' onClick={() => this.cancelEdit()}>Cancel</button>
    }

    if(redirect) {return <Redirect to='/properties/selectAnimation' />}

    return (
      <div className='create-animation-form-container'>
        <h2>{title}</h2>
        <form className='create-animation-form'>
        <label className='secondary-label'>Properties</label>
        <div className='underline'></div>
          {
            Object.keys(this.state.properties).map( property => {
              return (
                <div className='form-item' key={uid(property)}>
                  <label htmlFor='property' className='create-label'>{property}</label>
                  <input
                    className={`ani-prop-input ${property}`}
                    type='text' 
                    value={this.state.properties[property]} 
                    name={property}
                    onChange={this.handlePropertyChange}>
                  </input>
                </div>
              )
            })
          }
        <label className='secondary-label'>Keyframes</label>
        <div className='underline'></div>
        <div className='keyframes-form'>
        {
          this.state.keyframes.map((section, sectionIndex, arr) => {
            let minus = <p className={`${sectionIndex} btn-text`} onClick={this.removeStage}><i className={`${sectionIndex} fas fa-minus-circle remove-section-btn`}></i>remove section</p>
            if (arr.length <= 2) {minus = null}
            return (
            <div className='keyframes-section' key={uid(section)}><i>section {sectionIndex + 1}</i>
              <div className='section-underline'></div>
              <div className='section-label-container'>
                <input 
                  type='text'
                  className='section-label'
                  name={sectionIndex}
                  value={keyframes[sectionIndex].label}
                  onChange={this.handleStageChange}/>
              </div>
              <div className='properties-container'>
              {
                section.properties.map((property, propertyIndex, arr) => {
                  let minus = <i className={`${sectionIndex} ${propertyIndex} fas fa-minus-circle delete-property`} onClick={this.removeProperty}></i>
                  if (arr.length === 1) {minus = null}
                  return (
                  <div className='property-container' key={uid(property)}>
                    <input 
                      placeholder='property' 
                      className='property-label'
                      name={[sectionIndex, propertyIndex]}
                      value={keyframes[sectionIndex].properties[propertyIndex].name}
                      onChange={this.handlePropLabelChange}>
                    </input>
                    <input 
                      type='text' 
                      className={`property-value ${keyframes[sectionIndex].properties[propertyIndex].name}`}
                      placeholder='value'
                      name={[sectionIndex, propertyIndex]}
                      value={keyframes[sectionIndex].properties[propertyIndex].value}
                      onChange={this.handlePropValueChange}
                      disabled={(!formValidation.keyframeProperty(null, keyframes[sectionIndex].properties[propertyIndex].name))}/>
                    {minus}
                  </div>
                  )
                })
              }
              </div>
              <p className={`${sectionIndex} btn-text`} onClick={this.addProperty}><i className={`${sectionIndex} fas fa-plus-circle add-property-btn`}></i>add property</p>
              <div className='section-underline'></div>
              <div className='add-remove-container'>
                <p className={`${sectionIndex} btn-text`} onClick={this.addStage}><i className={`${sectionIndex} fas fa-plus-circle add-section-btn`}></i>add section</p>
                {minus}
              </div>
            </div>
            )
          })  
          }
          </div>
        </form>
        <div className='bottom-form-btn-container'>
          {exitButton}
          <button onClick={() => this.handleSubmit()} className='save-form-btn' disabled={this.state.disabled}>Save</button>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  user_id: state.user.id,
  animationToEdit: state.animationForEdit
})

export const mapDispatchToProps = (dispatch) => ({
  getMyAnimations: (user_id) => dispatch(getMyAnimations(user_id)),
  cancelEdit: () => dispatch(removeAnimationForEdit()),
  updateCurrentAnimation: (animation) => dispatch(updateCurrentAnimation(animation)),
})


export default connect(mapStateToProps, mapDispatchToProps)(CreateAnimationForm)
