import * as UserActionCreators from '../actions-creators/user'
import * as WashhouseActionCreators from '../actions-creators/washhouse'

export default {
    ...UserActionCreators,
    ...WashhouseActionCreators
}