export const IPAddressValidation = (state) => {

    return [
        {
            field: 'ipaddress',
            method: 'isEmpty',
            validWhen: false,
            message: 'Please enter IP Address'
        },
        {
            field: 'iplabel',
            method: 'isEmpty',
            validWhen: false,
            message: 'Please enter IP Label'
        },
    ]
};