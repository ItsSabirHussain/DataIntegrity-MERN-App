import '@babel/runtime/helpers/esm/defineProperty';
import 'react';
import 'prop-types';
export { a as MuiPickersContext, M as MuiPickersUtilsProvider, u as useUtils } from './useUtils-cfb96ac9.js';
import 'clsx';
export { C as Clock } from './Clock-3486e4fb.js';
import '@babel/runtime/helpers/esm/extends';
import '@babel/runtime/helpers/esm/objectWithoutProperties';
import '@material-ui/core/Typography';
import '@material-ui/core/styles';
import { u as usePickerState } from './makePickerWithState-5f7b14e2.js';
export { m as makePickerWithState, a as useKeyboardPickerState, u as usePickerState, v as validate } from './makePickerWithState-5f7b14e2.js';
import '@material-ui/core/Button';
import '@material-ui/core/Toolbar';
import './Wrapper-241966d7.js';
import './TimePickerToolbar-706e7b5f.js';
import '@material-ui/core/TextField';
import '@material-ui/core/IconButton';
import '@material-ui/core/InputAdornment';
import 'rifm';
import '@material-ui/core/SvgIcon';
export { P as Picker } from './Picker-52b7c539.js';
import '@babel/runtime/helpers/esm/slicedToArray';
import '@babel/runtime/helpers/esm/classCallCheck';
import '@babel/runtime/helpers/esm/createClass';
import '@babel/runtime/helpers/esm/possibleConstructorReturn';
import '@babel/runtime/helpers/esm/getPrototypeOf';
import '@babel/runtime/helpers/esm/inherits';
export { default as Day } from './Day.js';
export { C as Calendar } from './Calendar-520b4578.js';
import 'react-transition-group';
import '@material-ui/core/CircularProgress';
import '@material-ui/core/DialogActions';
import '@material-ui/core/DialogContent';
import '@material-ui/core/Dialog';
import '@material-ui/core/Popover';
export { ClockView, default as TimePickerView } from './ClockView.js';
export { KeyboardTimePicker, TimePicker } from './TimePicker.js';
export { DatePicker, KeyboardDatePicker } from './DatePicker.js';
import '@material-ui/core/Grid';
import '@material-ui/core/Tab';
import '@material-ui/core/Tabs';
import '@material-ui/core/Paper';
export { DateTimePicker, KeyboardDateTimePicker } from './DateTimePicker.js';

function useStaticState(_ref) {
  var value = _ref.value,
      _ref$autoOk = _ref.autoOk,
      autoOk = _ref$autoOk === void 0 ? true : _ref$autoOk,
      onChange = _ref.onChange,
      defaultFormat = _ref.defaultFormat;

  var _usePickerState = usePickerState({
    value: value,
    onChange: onChange,
    autoOk: autoOk
  }, {
    // just a random format, mostly always not needed for users
    getDefaultFormat: function getDefaultFormat() {
      return defaultFormat || 'MM/dd/yyyy';
    }
  }),
      pickerProps = _usePickerState.pickerProps,
      wrapperProps = _usePickerState.wrapperProps,
      inputProps = _usePickerState.inputProps;

  return {
    pickerProps: pickerProps,
    wrapperProps: wrapperProps,
    inputProps: inputProps
  };
}

export { useStaticState };
//# sourceMappingURL=index.js.map
