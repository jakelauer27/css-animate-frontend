import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { uid } from 'react-uid'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as API from '../../utils/apiCalls/apiCalls'
import { getMyAnimations } from '../../thunks/getMyAnimations'
import { removeAnimationForEdit } from '../../actions/actions'
import { editAnimation } from '../../thunks/editAnimation'

const animatableProperties = ['background','background-color','background-position','background-size','border','border-color','border-width','border-bottom','border-bottom-color','border-bottom-left-radius','border-bottom-right-radius','border-bottom-width','border-left','border-left-color','border-left-width','border-radius','border-right','border-right-color','border-right-width','border-spacing','border-top','border-top-color','border-top-left-radius','border-top-right-radius','border-top-width','bottom',
'box-shadow','caret-color','clip','color','column-count','column-gap','column-rule','column-rule-color','column-rule-width','column-width','columns','content','filter','flex','flex-basis','flex-grow','flex-shrink','font','font-size','font-size-adjust','font-stretch','font-weight','grid-area','grid-auto-columns','grid-auto-flow','grid-auto-rows','grid-column-end','grid-column-gap','grid-column-start','grid-column','grid-gap','grid-row-end','grid-row-gap','grid-row-start','grid-row','grid-template-areas','grid-template-columns','grid-template-rows','grid-template','grid','height','left','letter-spacing','line-height','margin','margin-bottom','margin-left','margin-right','margin-top','max-height','max-width','min-height','min-width','opacity','order','outline','outline-color','outline-offset','outline-width','padding','padding-bottom','padding-left','padding-right','padding-top',
'perspective','perspective-origin','quotes','right','tab-size','text-decoration','text-decoration-color','text-indent','text-shadow','top','transform','vertical-align','visibility','width','word-spacing','z-index']

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
      redirect: false
    }
  }

  componentDidMount() {
    const { animationToEdit } = this.props
    if(animationToEdit.properties) {
      this.setState({properties: animationToEdit.properties, keyframes: animationToEdit.keyframes.sections})
    }
  }

  handleSubmit = async () => {
    const { user_id, getMyAnimations, animationToEdit, editAnimation, cancelEdit } = this.props
    const { properties, keyframes } = this.state
    let savedkeyframes = { name: properties.name, sections: keyframes}

    if (animationToEdit.properties) {
      await editAnimation(user_id, animationToEdit.id, {name: properties.name, user_id, id: animationToEdit.id, properties, keyframes: savedkeyframes})
      cancelEdit()
      await getMyAnimations(user_id)
      this.setState({redirect: true})
      return
    }

    await API.addAnimation(user_id, properties.name, JSON.stringify(properties), JSON.stringify(savedkeyframes))
    await getMyAnimations(user_id)
    this.setState({redirect: true})
  }

  handleChange = (e) => {
    const { value, name } = e.target
    const properties = {...this.state.properties}
    properties[name] = value
    this.setState({properties})
  }

  handleStageChange = (e) => {
    const { value, name } = e.target
    const keyframes = [...this.state.keyframes]
    keyframes[name].label = value
    keyframes[name].name = value
    this.setState({keyframes})
  }

  handlePropLabelChange = (e) => {
    const { value, name } = e.target
    const keyframes = [...this.state.keyframes]
    keyframes[name[0]].properties[name[2]].name = value
    this.setState({keyframes})
  }

  handlePropValueChange = (e) => {
    const { value, name } = e.target
    const keyframes = [...this.state.keyframes]
    keyframes[name[0]].properties[name[2]].value = value
    this.setState({keyframes})
  }

  addProperty = (e) => {
    const { classList } = e.target
    const keyframes = [...this.state.keyframes]
    const newProperty = {name: '', value: ''}
    keyframes[classList[0]].properties.push(newProperty)
    this.setState({keyframes})
  }

  removeProperty = (e) => {
    const { classList } = e.target
    const keyframes = [...this.state.keyframes]
    keyframes[classList[0]].properties.splice(classList[1], 1)
    this.setState({keyframes})
  }

  addStage = (e) => {
    const { classList } = e.target
    const keyframes = [...this.state.keyframes]
    const newSection = {label: '%', name: '%', properties: [{name: '', value: ''}]}
    keyframes.splice([parseInt(classList[0])] + 1, 0, newSection)
    this.setState({keyframes})
  }

  removeStage = (e) => {
    const { classList } = e.target
    const keyframes = [...this.state.keyframes]
    keyframes.splice([parseInt(classList[0])], 1)
    this.setState({keyframes})
  }

  cancelEdit() {
    this.props.cancelEdit()
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
        <label className='secondary-label'>Properties</label>
        <div className='underline'></div>
        <form className='create-animation-form'>
          {
            Object.keys(this.state.properties).map( property => {
              if(property !== 'keyframes' && property !== 'redirect') {
                return (
                  <div className='form-item' key={uid(property)}>
                    <label htmlFor='property' className='create-label'>{property}</label>
                    <input
                      className='ani-prop-input' 
                      type='text' 
                      value={this.state.properties[property]} 
                      name={property}
                      onChange={this.handleChange}>
                    </input>
                  </div>
                )
              }
            })
          }
        <label className='secondary-label'>Keyframes</label>
        <div className='underline'></div>
        <div className='keyframes-form'>
        {
          this.state.keyframes.map((section, i, arr) => {
            let minus = <p className={`${i} btn-text`} onClick={this.removeStage}><i className={`${i} fas fa-minus-circle remove-section-btn`}></i>remove section</p>
            if (arr.length <= 2) {minus = null}
            return (
            <div className='keyframes-section' key={uid(section)}><i>section {i + 1}</i>
              <div className='section-underline'></div>
              <div className='section-label-container'>
                <input 
                  type='text'
                  className='section-label'
                  name={i}
                  value={keyframes[i].label}
                  onChange={this.handleStageChange}/>
                <p>%</p>
              </div>
              <div className='properties-container'>
              {
                section.properties.map((property, i2, arr) => {
                  let minus = <i className={`${i} ${i2} fas fa-minus-circle delete-property`} onClick={this.removeProperty}></i>
                  if (arr.length === 1) {minus = null}
                  return (
                  <div className='property-container' key={uid(property)}>
                    <input 
                      placeholder='property' 
                      className='property-label'
                      name={[i, i2]}
                      value={keyframes[i].properties[i2].name}
                      onChange={this.handlePropLabelChange}>
                    </input>
                    <input 
                      type='text' 
                      className='property-value'
                      placeholder='value'
                      name={[i, i2]}
                      value={keyframes[i].properties[i2].value}
                      onChange={this.handlePropValueChange}/>
                    {minus}
                  </div>
                  )
                })
              }
              </div>
              <p className={`${i} btn-text`} onClick={this.addProperty}><i className={`${i} fas fa-plus-circle add-property-btn`}></i>add property</p>
              <div className='section-underline'></div>
              <div className='add-remove-container'>
                <p className={`${i} btn-text`} onClick={this.addStage}><i className={`${i} fas fa-plus-circle add-section-btn`}></i>add section</p>
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
          <button onClick={() => this.handleSubmit()} className='save-form-btn'>Save</button>
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
  editAnimation: (user_id, animation_id, animation) => dispatch(editAnimation(user_id, animation_id, animation))
})


export default connect(mapStateToProps, mapDispatchToProps)(CreateAnimationForm)
