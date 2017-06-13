import augment from './mdc-knockout-augment';

import {TextfieldTemplate, TextfieldViewModel} from './mdc-knockout-textfield';
import {FormFieldTemplate, FormFieldViewModel} from './mdc-knockout-form-field';
import {CheckboxTemplate, CheckboxViewModel} from './mdc-knockout-checkbox';
import {RadioTemplate, RadioViewModel} from './mdc-knockout-radio';
import {ToolbarTemplate, ToolbarViewModel} from './mdc-knockout-toolbar';

import {SwitchTemplate, SwitchViewModel} from './mdc-knockout-switch';
import {ButtonTemplate, ButtonViewModel} from './mdc-knockout-button';
import {ElevationTemplate, ElevationViewModel} from './mdc-knockout-elevation';

import {MDCTextfield} from '@material/textfield';
import {MDCFormField} from '@material/form-field';
import {MDCCheckbox} from '@material/checkbox';
import {MDCRadio} from '@material/radio';
import {MDCToolbar} from '@material/toolbar';

augment.registerBindings(ko);

augment.registerComponent(ko, 'mdc-textfield', TextfieldTemplate(), TextfieldViewModel, MDCTextfield);
augment.registerComponent(ko, 'mdc-form-field', FormFieldTemplate(), FormFieldViewModel, MDCFormField);
augment.registerComponent(ko, 'mdc-checkbox', CheckboxTemplate(), CheckboxViewModel, MDCCheckbox);
augment.registerComponent(ko, 'mdc-radio', RadioTemplate(), RadioViewModel, MDCRadio);
augment.registerComponent(ko, 'mdc-toolbar', ToolbarTemplate(), ToolbarViewModel, MDCToolbar);
//
augment.registerComponent(ko, 'mdc-switch', SwitchTemplate(), SwitchViewModel);
augment.registerComponent(ko, 'mdc-button', ButtonTemplate(), ButtonViewModel);
augment.registerComponent(ko, 'mdc-elevation', ElevationTemplate(), ElevationViewModel);
