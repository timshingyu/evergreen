import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Box, { spacing, position, layout, dimensions } from 'ui-box'
import { Text } from '../../typography'
import { withTheme } from '../../theme'

const CheckIcon = ({ fill = 'currentColor', ...props }) => (
  <svg width={10} height={7} viewBox="0 0 10 7" {...props}>
    <path
      fill={fill}
      fillRule="evenodd"
      d="M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z"
    />
  </svg>
)

CheckIcon.propTypes = {
  fill: PropTypes.string
}

const MinusIcon = ({ fill = 'currentColor', ...props }) => (
  <svg width={16} height={16} viewBox="0 0 16 16" {...props}>
    <path
      fill={fill}
      fillRule="evenodd"
      d="M11 7H5c-.55 0-1 .45-1 1s.45 1 1 1h6c.55 0 1-.45 1-1s-.45-1-1-1z"
    />
  </svg>
)

MinusIcon.propTypes = {
  fill: PropTypes.string
}

class Checkbox extends PureComponent {
  static propTypes = {
    /**
     * Composes some Box APIs.
     */
    ...spacing.propTypes,
    ...position.propTypes,
    ...layout.propTypes,
    ...dimensions.propTypes,

    /**
     * The id attribute of the checkbox.
     */
    id: PropTypes.string,

    /**
     * The id attribute of the checkbox.
     */
    name: PropTypes.string,

    /**
     * Label of the checkbox.
     */
    label: PropTypes.node,

    /**
     * The value attribute of the checkbox.
     */
    value: PropTypes.string,

    /**
     * The checked attribute of the checkbox.
     */
    checked: PropTypes.bool,

    /**
     * State in addition to "checked" and "unchecked".
     * When true, the checkbox displays a "minus" icon.
     */
    indeterminate: PropTypes.bool,

    /**
     * Function that returns the ref of the checkbox.
     */
    innerRef: PropTypes.func,

    /**
     * Function called when state changes.
     */
    onChange: PropTypes.func,

    /**
     * When true, the checkbox is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * When true, the aria-invalid attribute is true.
     * Used for accessibility.
     */
    isInvalid: PropTypes.bool,

    /**
     * The appearance of the checkbox.
     * The default theme only comes with a default style.
     */
    appearance: PropTypes.string,

    /**
     * Theme provided by ThemeProvider.
     */
    theme: PropTypes.object.isRequired
  }

  static defaultProps = {
    checked: false,
    indeterminate: false,
    innerRef: () => {},
    onChange: () => {},
    appearance: 'default'
  }

  handleInnerRef = el => {
    if (el) {
      el.indeterminate = this.props.indeterminate
    }

    this.props.innerRef(el)
  }

  render() {
    const {
      theme,

      id,
      name,
      label,
      appearance,
      disabled,
      isInvalid,
      checked,
      onChange,
      value,
      indeterminate,
      innerRef,
      ...props
    } = this.props

    const themedClassName = theme.getCheckboxClassName(appearance)

    return (
      <Box
        is="label"
        cursor={disabled ? 'not-allowed' : 'pointer'}
        position="relative"
        display="flex"
        marginY={16}
        {...props}
      >
        <Box
          className={themedClassName}
          is="input"
          id={id}
          type="checkbox"
          name={name}
          value={value}
          checked={checked || indeterminate}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={isInvalid}
          innerRef={this.handleInnerRef}
        />
        <Box
          boxSizing="border-box"
          borderRadius={3}
          display="flex"
          flex="none"
          alignItems="center"
          justifyContent="center"
          width={16}
          height={16}
        >
          {indeterminate ? <MinusIcon /> : <CheckIcon />}
        </Box>
        {label && (
          <Text
            marginLeft={8}
            size={300}
            color={disabled ? 'muted' : 'default'}
          >
            {label}
          </Text>
        )}
      </Box>
    )
  }
}

export default withTheme(Checkbox)
