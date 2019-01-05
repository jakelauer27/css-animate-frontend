import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { uid } from 'react-uid'

const animatableProperties = ['background','background-color','background-position','background-size','border','border-color','border-width','border-bottom','border-bottom-color','border-bottom-left-radius','border-bottom-right-radius','border-bottom-width','border-left','border-left-color','border-left-width','border-radius','border-right','border-right-color','border-right-width','border-spacing','border-top','border-top-color','border-top-left-radius','border-top-right-radius','border-top-width','bottom',
'box-shadow','caret-color','clip','color','column-count','column-gap','column-rule','column-rule-color','column-rule-width','column-width','columns','content','filter','flex','flex-basis','flex-grow','flex-shrink','font','font-size','font-size-adjust','font-stretch','font-weight','grid-area','grid-auto-columns','grid-auto-flow','grid-auto-rows','grid-column-end','grid-column-gap','grid-column-start','grid-column','grid-gap','grid-row-end','grid-row-gap','grid-row-start','grid-row','grid-template-areas','grid-template-columns','grid-template-rows','grid-template','grid','height','left','letter-spacing','line-height','margin','margin-bottom','margin-left','margin-right','margin-top','max-height','max-width','min-height','min-width','opacity','order','outline','outline-color','outline-offset','outline-width','padding','padding-bottom','padding-left','padding-right','padding-top',
'perspective','perspective-origin','quotes','right','tab-size','text-decoration','text-decoration-color','text-indent','text-shadow','top','transform','vertical-align','visibility','width','word-spacing','z-index']

export default class CreateAnimationForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      duration: '',
      timing_function: '',
      delay: '',
      iteration_count: '',
      direction: '',
      fill_mode: '',
      keyframes: [{label: 0, name: 0, props: [{label: '', value: ''}]}, {label: 100, name: 100, props: [{label: '', value: ''}]}],
    }
  }

  handleChange = (e) => {
    const { value, name } = e.target
    this.setState({
      [name]: value
    })
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
    keyframes[name[0]].props[name[2]].label = value
    this.setState({keyframes})
  }

  handlePropValueChange = (e) => {
    const { value, name } = e.target
    const keyframes = [...this.state.keyframes]
    keyframes[name[0]].props[name[2]].value = value
    this.setState({keyframes})
  }

  addProperty = (e) => {
    const { classList } = e.target
    const keyframes = [...this.state.keyframes]
    let labelValue = keyframes[parseInt(classList[0])].label + .1
    if (labelValue > 100) {labelValue = 99} 
    const newProperty = {label: '', value: ''}
    keyframes[classList[0]].props.push(newProperty)
    this.setState({keyframes})
  }

  addStage = (e) => {
    const { classList } = e.target
    const keyframes = [...this.state.keyframes]
    let labelValue = keyframes[parseInt(classList[0])].label + .1
    const newSection = {label: labelValue, name: labelValue, props: [{label: '', value: ''}]}
    keyframes.splice([parseInt(classList[0])] + 1, 0, newSection)
    this.setState({keyframes})
  }

  render() {
    const { keyframes } = this.state
    return (
      <div className='create-animation-form-container'>
        <h2>Create/Edit Animation</h2>
        <label className='secondary-label'>Properties</label>
        <div className='underline'></div>
        <form className='create-animation-form'>
          {
            Object.keys(this.state).map( property => {
              if(property !== 'keyframes') {
                return (
                  <div className='form-item' key={uid(property)}>
                    <label htmlFor='property' className='create-label'>{property}</label>
                    <input
                      className='ani-prop-input' 
                      type='text' 
                      value={this.state[property]} 
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
          this.state.keyframes.map((section, i) => {
            return (
            <div className='keyframes-section' key={uid(section)}><i>section {i + 1}</i>
              <div className='section-underline'></div>
              <div className='section-label-container'>
                <input 
                  type="number" 
                  min="1" 
                  max="100" 
                  className='section-label'
                  name={i}
                  value={keyframes[i].label}
                  onChange={this.handleStageChange}/>
                <p>%</p>
              </div>
              <div className='properties-container'>
              {
                section.props.map((property, i2) => {
                  return (
                  <div className='property-container' key={uid(property)}>
                    <input 
                      list={`properties${i2}`} 
                      placeholder='select property' 
                      className='property-label'
                      name={[i, i2]}
                      value={keyframes[i].props[i2].label}
                      onChange={this.handlePropLabelChange}/>
                      <datalist id={`properties${i2}`}>
                        {
                          animatableProperties.map(prop => (
                            <option value={prop} key={uid(prop)}></option>
                            ))
                          }
                      </datalist>
                    <input 
                      type='text' 
                      className='property-value'
                      placeholder='value'
                      name={[i, i2]}
                      value={keyframes[i].props[i2].value}
                      onChange={this.handlePropValueChange}/>
                  </div>
                  )
                })
              }
              </div>
              <p className={`${i}`} onClick={this.addProperty}><i className={`${i} fas fa-plus-circle add-property-btn`}></i>add property</p>
              <div className='section-underline'></div>
              <p className={`${i}`} onClick={this.addStage}><i className={`${i} fas fa-plus-circle add-section-btn`}></i>add section</p>
            </div>
            )
          })  
          }
          </div>
        </form>
        <Link to='/properties/selectAnimation'>Cancel</Link>
      </div>
    )
  }
}

