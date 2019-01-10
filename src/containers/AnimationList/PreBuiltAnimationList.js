import React, {Component} from 'react'
import { connect } from 'react-redux'
import { uid } from 'react-uid'
import { PropTypes } from 'prop-types'

export class PreBuiltAnimationList extends Component {

  selectAnimation(e) {
    const items = document.querySelectorAll('.animation-li')
    items.forEach(item => item.classList.remove('selected-animation'))
    e.target.classList.add('selected-animation')
  }

  render() {
    const { prebuiltAnimations, currentAnimation } = this.props
    return (
      <section className='prebuilt-animation-section'>
        <ul className= 'prebuilt-animation-list'>
        {
          prebuiltAnimations.map(animation => {
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
  prebuiltAnimations: state.prebuiltAnimations,
  currentAnimation: state.currentAnimation
})

PreBuiltAnimationList.propTypes = {
  prebuiltAnimations: PropTypes.array,
  currentAnimation: PropTypes.object
}

export default connect(mapStateToProps)(PreBuiltAnimationList)