import augment from './mdc-knockout-augment';

import TextfieldViewModel from './mdc-knockout-textfield';
import FormFieldViewModel from './mdc-knockout-form-field';
import CheckboxViewModel from './mdc-knockout-checkbox';
import RadioViewModel from './mdc-knockout-radio';

import SwitchViewModel from './mdc-knockout-switch';
import ButtonViewModel from './mdc-knockout-button';
import ElevationViewModel from './mdc-knockout-elevation';

import {MDCTextfield, MDCTextfieldFoundation} from '@material/textfield';
import {MDCFormField, MDCFormFieldFoundation} from '@material/form-field';
import {MDCCheckbox, MDCCheckboxFoundation} from '@material/checkbox';
import {MDCRadio, MDCRadioFoundation} from '@material/radio';

augment.registerBindings();

augment.registerComponent('mdc-textfield', TextfieldViewModel, MDCTextfield, MDCTextfieldFoundation);
augment.registerComponent('mdc-form-field', FormFieldViewModel, MDCFormField, MDCFormFieldFoundation);
augment.registerComponent('mdc-checkbox', CheckboxViewModel, MDCCheckbox, MDCCheckboxFoundation);
augment.registerComponent('mdc-radio', RadioViewModel, MDCRadio, MDCRadioFoundation);

augment.registerComponent('mdc-switch', SwitchViewModel);
augment.registerComponent('mdc-button', ButtonViewModel);
augment.registerComponent('mdc-elevation', ElevationViewModel);
