export class Validator {
    validators;

    constructor(validators) {
        this.validators = validators
    }
}

let Validators = {
    compose:function (validators) {
        return new Validator(validators);
    },

    required: null,

    pattern: function (reg) {
        return reg;
    }
};

export const FromGroup = function FromGroup(group) {
    group.form = {};
    Object.keys(group).reverse().forEach(key => {
        if (key != 'form') {
            group.form[key] = group[key].value;
        }
        if (group[key].prompt) {
            group.isvalid = false;
            group.error = group[key].prompt;
        }
    });
    return group;
};

export const FormControl = function FormControl(value, validators) {
    this.value = value.value;
    this.prompt = value.prompt;
    this.validators = validators || '';
    this.isvalid = false;

    this.getValid();
};

FormControl.prototype.getValid = function () {
    if (!this.validators) {
        this.isvalid = true;
        delete this.prompt;
        return;
    }
    const len = this.validators.validators.length;
    this.validators.validators.forEach(validator => {
        if (validator == null && len == 1) {
            this.isvalid = this.value !== '' ? true : false;
        } else if (validator != null && len > 1){
            this.isvalid = validator.test(this.value) ? true : false;
        }
        if (this.isvalid) {
            delete this.prompt;
        }
    });
};


export const ToGroup = function ToGroup(obj) {
    let group = {};
    Object.keys(obj).forEach(key => {
        if (obj[key].required) {
            if (obj[key].regExp) {
                group[key] = new FormControl(obj[key],Validators.compose([Validators.required,Validators.pattern(obj[key].regExp)]));
            } else {
                group[key] = new FormControl(obj[key],Validators.compose([Validators.required]));
            }
        } else {
            if (obj[key].regExp) {
                group[key] = new FormControl(obj[key],Validators.compose([Validators.pattern(obj[key].regExp)]));
            } else {
                group[key] = new FormControl(obj[key]);
            }
        }
    });
    return new FromGroup(group);
};