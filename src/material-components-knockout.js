import register from './mdc-knockout-init';

import TextfieldViewModel from './mdc-knockout-textfield';
import FormFieldViewModel from './mdc-knockout-form-field';
import CheckboxViewModel from './mdc-knockout-checkbox';
import RadioViewModel from './mdc-knockout-radio';
import SwitchViewModel from './mdc-knockout-switch';

import {MDCTextfield, MDCTextfieldFoundation} from '@material/textfield';
import {MDCFormField, MDCFormFieldFoundation} from '@material/form-field';
import {MDCCheckbox, MDCCheckboxFoundation} from '@material/checkbox';
import {MDCRadio, MDCRadioFoundation} from '@material/radio';

register('mdc-textfield', TextfieldViewModel, MDCTextfield, MDCTextfieldFoundation);
register('mdc-form-field', FormFieldViewModel, MDCFormField, MDCFormFieldFoundation);
register('mdc-checkbox', CheckboxViewModel, MDCCheckbox, MDCCheckboxFoundation);
register('mdc-radio', RadioViewModel, MDCRadio, MDCRadioFoundation);
register('mdc-switch', SwitchViewModel);
