import config from './app'

const api = () => {

    const ipams_api_base_url = config.ipams_api_base_url;
    const ipams_api_version= config.ipams_api_version;

    const routes = {

        LOGIN: `${ipams_api_base_url}/${ipams_api_version}/account/login`,

    };

    return routes;
};

export default api;