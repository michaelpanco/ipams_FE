export const loginValidation = (state) => {

    return [
        {
            field: 'username',
            method: 'isEmpty',
            validWhen: false,
            message: 'Please enter username'
        },
        {
            field: 'password',
            method: 'isEmpty',
            validWhen: false,
            message: 'Please enter password'
        },
    ]
};