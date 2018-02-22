import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

import {
    Text,
    TouchableWithoutFeedback,
    View,
    LayoutAnimation
} from 'react-native'
import { CardSection } from './common'

class ListItem extends React.Component {
    componentWillUpdate() {
        LayoutAnimation.spring()
    }

    renderDescription() {
        const { library: { description }, expanded } = this.props

        if (expanded) {
            return (
                <CardSection>
                    <Text>
                        { description }
                    </Text>
                </CardSection>
            )
        }
    }

    render() {
        const { library: { id, title }, selectLibrary } = this.props

        return (
            <TouchableWithoutFeedback onPress={() => { selectLibrary(id) }}>
                <View>
                    <CardSection>
                        <Text style={ styles.titleStyle }>{ title }</Text>
                    </CardSection>
                    { this.renderDescription() }
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
}

const mapStateToProps = (state, ownProps) => {
    const expanded = state.selectedLibraryId === ownProps.library.id

    return { expanded }
}

export default connect(mapStateToProps, actions)(ListItem)