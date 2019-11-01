/**
 * This is a ReactApiClient modification of the ApiClient class to make it work with React, see:
 * https://stackoverflow.com/questions/55482386/generate-static-javascript-client-from-swagger-for-use-in-react-native
 */

import { ApiClient } from "rest_api_for_predictive_analtyics";
import { DocumentApi } from "rest_api_for_predictive_analtyics";
// import { SetApi } from "rest_api_for_predictive_analtyics";
import SetApi from "./cicero-api-client/src/api/SetApi";

class ReactApiClient extends ApiClient {
  callApi(
    path,
    httpMethod,
    pathParams,
    queryParams,
    collectionQueryParams,
    headerParams,
    formParams,
    bodyParam,
    authNames,
    contentTypes,
    accepts,
    returnType,
    callback
  ) {
    return fetch(`${this.basePath}${path}`, {
      method: httpMethod
    });
  }
}

class ReactSetApi extends SetApi {
  constructor() {
    super(new ReactApiClient());
  }
}

class ReactDocumentApi extends DocumentApi {
  constructor() {
    super(new ReactApiClient());
  }
}

export { ReactSetApi, ReactDocumentApi };
