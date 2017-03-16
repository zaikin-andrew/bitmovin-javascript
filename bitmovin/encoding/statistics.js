import urljoin from 'url-join';
import http, {utils} from '../http';
import BitmovinError from '../BitmovinError';
import {isValidApiRequestDateString} from '../DateUtils';

export const statistics = (configuration, http) => {
  const { get } = http;

  const fn = (baseUrl) => {
    return {
      list: (options = {}) => {
        let url = baseUrl;
        let { limit, offset } = options;

        if (options !== {} && options.from && options.to) {
          if (!isValidApiRequestDateString(options.from) || !isValidApiRequestDateString(options.to)) {
            console.error('Wrong date format! Correct format is yyyy-MM-dd');
            return Promise.reject(new BitmovinError('Wrong date format! Correct format is yyyy-MM-dd', {}));
          }
          url = urljoin(baseUrl, options.from, options.to);
        }

        const getParams = utils.buildGetParamString({
          limit : limit,
          offset: offset
        });

        if (getParams.length > 0) {
          url = urljoin(baseUrl, getParams);
        }

        return get(configuration, url);
      }
    };
  };

  return {

    /*
     * Gets the overall encoding statistics
     *
     * Options is a hash with optional parameters:
     * limit: Number - maximum results
     * offset: Number - skip n results
     *
     * If from and to is set only statistics between these two dates are returned
     * from: Date
     * to: Date
    */
    overall : () => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/statistics');
      return get(configuration, url);
    },
    vod: fn(urljoin(configuration.apiBaseUrl, 'encoding/statistics/encodings/vod')),
    live: fn(urljoin(configuration.apiBaseUrl, 'encoding/statistics/encodings/live')),
    encodings: (encodingId) => {
      return {
        liveStatistics: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/statistics/encodings', encodingId, 'live-statistics');
          return get(configuration, url);
        }
      };
    }
  };
};

export default (configuration) => {
  return statistics(configuration, http);
};
