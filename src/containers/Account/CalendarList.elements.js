import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin: 8px;
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  /* clippath: inset(50%); */
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${(props) => (props.checked ? '#4b59F7' : '#0467FB')};
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  ${Icon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')}
  }
`

// const Checkbox = ({ className, canHide, ...props }) => {
class Checkbox extends Component {

    state = {
        checked: true
    }
    // const [checked, changeChecked] = useState(true);

    // const handleCheckBoxChange = () => {
    //     changeChecked(!checked);
    // }
    changeChecked = (bool, id) => {
        this.setState({checked: bool})

        // const config = {
        //     headers: {
        //         'authorization': `Basic ${localStorage.getItem('token')}`
        //     }
        // }
        // const calendar = {
        //     hide: bool
        // }
        // axios.post(`/calendars/${id}/hide`, calendar, config)
        //     .then(res => {
        //         this.setState({checked: bool})
        //         // this.props.loadNewCalendars()
        //     })
        //     .catch(e => console.log(e))
    }

    render() {
        return (
            <CheckboxContainer className={this.props.className} onClick={() => this.props.canHide ? this.changeChecked(!this.state.checked, this.props.id) : "return false"}>
                <HiddenCheckbox checked={this.state.checked} {...this.props} />
                <StyledCheckbox checked={this.state.checked}>
                <Icon viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                </Icon>
                </StyledCheckbox>
            </CheckboxContainer>
    )
}}

export default Checkbox
