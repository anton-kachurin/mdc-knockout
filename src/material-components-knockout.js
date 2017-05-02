import augment from './mdc-knockout-augment';

import {TextfieldTemplate, TextfieldViewModel} from './mdc-knockout-textfield';
import {FormFieldTemplate, FormFieldViewModel} from './mdc-knockout-form-field';
import {CheckboxTemplate, CheckboxViewModel} from './mdc-knockout-checkbox';
import {RadioTemplate, RadioViewModel} from './mdc-knockout-radio';

import {SwitchTemplate, SwitchViewModel} from './mdc-knockout-switch';
import {ButtonTemplate, ButtonViewModel} from './mdc-knockout-button';
import {ElevationTemplate, ElevationViewModel} from './mdc-knockout-elevation';

import {MDCTextfield, MDCTextfieldFoundation} from '@material/textfield';
import {MDCFormField, MDCFormFieldFoundation} from '@material/form-field';
import {MDCCheckbox, MDCCheckboxFoundation} from '@material/checkbox';
import {MDCRadio, MDCRadioFoundation} from '@material/radio';

augment.registerBindings(ko);

augment.registerComponent(ko, 'mdc-textfield', TextfieldTemplate(), TextfieldViewModel, MDCTextfield, MDCTextfieldFoundation);
augment.registerComponent(ko, 'mdc-form-field', FormFieldTemplate(), FormFieldViewModel, MDCFormField, MDCFormFieldFoundation);
augment.registerComponent(ko, 'mdc-checkbox', CheckboxTemplate(), CheckboxViewModel, MDCCheckbox, MDCCheckboxFoundation);
augment.registerComponent(ko, 'mdc-radio', RadioTemplate(), RadioViewModel, MDCRadio, MDCRadioFoundation);
//
augment.registerComponent(ko, 'mdc-switch', SwitchTemplate(), SwitchViewModel);
augment.registerComponent(ko, 'mdc-button', ButtonTemplate(), ButtonViewModel);
augment.registerComponent(ko, 'mdc-elevation', ElevationTemplate(), ElevationViewModel);
