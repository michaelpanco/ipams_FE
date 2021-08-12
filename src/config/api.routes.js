import config from './app'

const api = () => {

    const ipams_api_base_url = config.ipams_api_base_url;
    const ipams_api_version= config.ipams_api_version;

    const routes = {

        LOGIN: `${ipams_api_base_url}/${ipams_api_version}/account/login`,
        FETCHIPADDRESSES: `${ipams_api_base_url}/${ipams_api_version}/ipaddress`,
        FETCHIPADDRESSDETAILS: `${ipams_api_base_url}/${ipams_api_version}/ipaddress`,

        FETCHACCOUNTACTIVITIES: `${ipams_api_base_url}/${ipams_api_version}/account/activities`,

        CREATEIPADDRESSDETAILS: `${ipams_api_base_url}/${ipams_api_version}/ipaddress`,
        UPDATEIPADDRESSDETAILS: `${ipams_api_base_url}/${ipams_api_version}/ipaddress`,
    };

    return routes;
};

export default api;