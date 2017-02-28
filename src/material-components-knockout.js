import register from './mdc-knockout-init';
import TextfieldViewModel from './mdc-knockout-textfield';
import FormFieldViewModel from './mdc-knockout-form-field';
import CheckboxViewModel from './mdc-knockout-checkbox';
import RadioViewModel from './mdc-knockout-radio';

register('mdc-textfield', TextfieldViewModel);
register('mdc-form-field', FormFieldViewModel);
register('mdc-checkbox', CheckboxViewModel);
register('mdc-radio', RadioViewModel);
