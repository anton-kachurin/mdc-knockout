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

augment.registerBindings(ko);

augment.registerComponent(ko, 'mdc-textfield', TextfieldViewModel, MDCTextfield, MDCTextfieldFoundation);
augment.registerComponent(ko, 'mdc-form-field', FormFieldViewModel, MDCFormField, MDCFormFieldFoundation);
augment.registerComponent(ko, 'mdc-checkbox', CheckboxViewModel, MDCCheckbox, MDCCheckboxFoundation);
augment.registerComponent(ko, 'mdc-radio', RadioViewModel, MDCRadio, MDCRadioFoundation);

augment.registerComponent(ko, 'mdc-switch', SwitchViewModel);
augment.registerComponent(ko, 'mdc-button', ButtonViewModel);
augment.registerComponent(ko, 'mdc-elevation', ElevationViewModel);
