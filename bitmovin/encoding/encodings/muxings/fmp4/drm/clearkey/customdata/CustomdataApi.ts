import { BaseAPI } from '../../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../../common/RestClient';
import CustomData from '../../../../../../../models/CustomData';
import ResponseEnvelope from '../../../../../../../models/ResponseEnvelope';

/**
 * CustomdataApi - object-oriented interface
 * @export
 * @class CustomdataApi
 * @extends {BaseAPI}
 */
export default class CustomdataApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary ClearKey DRM Custom Data of fMP4
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the fragmented mp4.
     * @param {string} drmId Id of the ClearKey DRM configuration.
     * @throws {RequiredError}
     * @memberof CustomdataApi
     */
    public getCustomData(encodingId: string, muxingId: string, drmId: string): Promise<CustomData> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            drm_id: drmId
        };
        return this.restClient.get<CustomData>('/encoding/encodings/{encoding_id}/muxings/fmp4/{muxing_id}/drm/clearkey/{drm_id}/customData', pathParamMap);
    }

}