import React, {Component} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { uid } from 'react-uid'
import { deleteAnimation } from '../../thunks/deleteAnimation'
import { selectAnimationForEdit } from '../../actions/actions'

export class MyAnimationList extends Component {

  selectAnimation(e) {
    if(e.target.classList[1] === 'fas') {return}
    const items = document.querySelectorAll('.animation-li')
    items.forEach(item => item.classList.remove('selected-animation'))
    e.target.classList.add('selected-animation')
  }

  deleteAnimation(e) {
    const { deleteAnimation, user } = this.props
    deleteAnimation(user, parseInt(e.target.classList[0]))
  }

  editAnimation(e) {
    const { myAnimations, selectAnimationForEdit } = this.props
    const animationToEdit = myAnimations.find(animation => animation.id === parseInt(e.target.classList[0]))
    selectAnimationForEdit(animationToEdit)
  }
 
  render() {
    const { myAnimations, currentAnimation, user } = this.props
    if(!user) {
      return (
        <section className='my-animation-section'>
          <h2 className='must-be-loggedin-message'>You must be logged in to create/save animations</h2>
        </section>
      )
    }
    return (
      <section className='my-animation-section'>
        <ul className='animation-list'>
          {
          myAnimations.map(animation => {
            let selected = ''
            if (animation.id === currentAnimation.id) {selected = 'selected-animation'}
            return (
              <li 
                className={`animation-li ${animation.id} ${selected}`} 
                key={uid(animation)}
                onClick={e => this.selectAnimation(e) }>
                {animation.ani_name}
                <div className='icon-container fas'>  
                  <i className={`${animation.id} fas fa-edit`} onClick={(e) => this.editAnimation(e)}></i>
                  <i className={`${animation.id} fas fa-trash-alt`} onClick={(e) => this.deleteAnimation(e)}></i>
                </div>
              </li>
              )
            })
          }
          <Link to='/properties/selectAnimation/create'>
            <i className="fas fa-plus-circle"><p>Add New</p></i>
          </Link>
        </ul>
      </section>
    )
  }
}

export const mapStateToProps = (state) => ({
  myAnimations: state.myAnimations,
  currentAnimation: state.currentAnimation,
  user: state.user.id
})

export const mapDispatchToProps = (dispatch) => ({
  deleteAnimation: (user_id, animation_id) => dispatch(deleteAnimation(user_id, animation_id)),
  selectAnimationForEdit: (animation) => dispatch(selectAnimationForEdit(animation))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyAnimationList)