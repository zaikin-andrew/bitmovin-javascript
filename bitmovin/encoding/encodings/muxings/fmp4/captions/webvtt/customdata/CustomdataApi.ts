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
     * @summary Get FMP4 Embed WebVtt Captions Custom Data
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the fMP4 muxing.
     * @param {string} captionsId Id of the captions config.
     * @throws {RequiredError}
     * @memberof CustomdataApi
     */
    public getCustomData(encodingId: string, muxingId: string, captionsId: string): Promise<CustomData> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            captions_id: captionsId
        };
        return this.restClient.get<CustomData>('/encoding/encodings/{encoding_id}/muxings/fmp4/{muxing_id}/captions/webvtt/{captions_id}/customData', pathParamMap);
    }

}
