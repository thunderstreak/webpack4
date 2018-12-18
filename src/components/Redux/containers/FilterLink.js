import { connect } from 'react-redux'
import { setVisibilityFilter } from '@REDUX/actions'
import Link from '../Link'

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(Link)
