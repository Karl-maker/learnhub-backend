import event from "../../../helpers/event";
import logger from "../../../helpers/logger";
import { StudentEventUpdateProfilePicturePayload, studentEvent } from "../../definitions/student";
import Upload from "../../../service/upload/basic";
import BlobRepository from "../../../repositories/blob";

export default () => {

    /**
     * @desc clean past student picture
     */
    event.subscribe(studentEvent.topics.StudentProfileImageUpdate, (payload: StudentEventUpdateProfilePicturePayload) => {
        (async ()=> {
            try {
                new Upload(BlobRepository.fs).remove(payload.picture.old.id, payload.picture.old.ext);
            } catch(err) {
                logger.error(err.message, err);
            }
        })();
    })

}