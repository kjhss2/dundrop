import axios from 'axios';
import { IS_DEV, API_KEY } from '../config';
import * as ActionTypes from '../redux/ActionTypes';

const axiosApiInstance = axios.create({
  // axios timeout setting
  timeout: 30000,
  // withCredentials: true
});

const createJsonHeader = (contentType = 'application/json') => {
  return {
    'Content-Type': contentType,
    // 'Access-Control-Allow-Origin': '*',
  };
};

export const callAPI = async (endPoint, config = {}, dispatch, skipSpinner) => {
  config.headers = createJsonHeader(config.contentType);
  return await commonFetch(endPoint, config, dispatch, skipSpinner);
};

const commonFetch = async (endPoint, config, dispatch, skipSpinner) => {
  const apiUrl = endPoint + API_KEY;

  // 개발모드일때 API Call URL Console 출력
  if (IS_DEV) console.debug(`(1)[DEV - API Request] => `, { endPoint, config });

  // start isRequest
  dispatchRunSpinner(dispatch, skipSpinner);

  try {
    const response = await axiosApiInstance({ url: apiUrl, ...config });
    return handleInternalServerSuccessResponse(response, dispatch, skipSpinner);
  } catch (error) {
    dispatchStopSpinner(dispatch, skipSpinner);
  }
};

const handleInternalServerSuccessResponse = (response, dispatch, skipSpinner) => {
  const { status, data } = response;
  if (IS_DEV) console.debug('(2)[DEV - API Response Success] => ', {
    url: response.config.url,
    data: data,
    status: status,
    response
  });
  // stop isRequest
  dispatchStopSpinner(dispatch, skipSpinner);
  return response;
};

const dispatchRunSpinner = (dispatch, skipSpinner = false) => {
  if (dispatch && !skipSpinner) {
    dispatch({ type: ActionTypes.COMMON__FETCH_REQUEST });
  }
};

const dispatchStopSpinner = (dispatch, skipSpinner = false) => {
  if (dispatch && !skipSpinner) {
    dispatch({ type: ActionTypes.COMMON__FETCH_REQUEST_COMPLETE });
  }
};