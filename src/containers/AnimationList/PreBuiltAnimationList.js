import React, {Component} from 'react'
import { connect } from 'react-redux'
import { uid } from 'react-uid'


export class PreBuiltAnimationList extends Component {

  selectAnimation(e) {
    const items = document.querySelectorAll('.animation-li')
    items.forEach(item => item.classList.remove('selected-animation'))
    e.target.classList.add('selected-animation')
  }

  render() {
    const { templates, currentAnimation } = this.props
    return (
      <section className='prebuilt-animation-section'>
        <ul className= 'prebuilt-animation-list'>
        {
          templates.map(animation => {
            let selected = ''
            if (animation.id === currentAnimation.id) {selected = 'selected-animation'}
            return (
              <li 
                className={`animation-li ${animation.id} ${selected}`} 
                key={uid(animation)}
                onClick={e => this.selectAnimation(e) }>
               {animation.ani_name}
              </li>
            )
          })
        }
        </ul>
      </section>
    )
  }
}

export const mapStateToProps = (state) => ({
  templates: state.prebuiltAnimations,
  currentAnimation: state.currentAnimation
})

export default connect(mapStateToProps)(PreBuiltAnimationList)