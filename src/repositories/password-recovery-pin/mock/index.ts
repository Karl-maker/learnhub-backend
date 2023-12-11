import { PasswordRecoveryPinRepositoryType, IPasswordRecoveryPinRepository } from "../interface";
import BaseRepository from "../../base";

export class PasswordRecoveryPinMockRepository extends BaseRepository.mock<PasswordRecoveryPinRepositoryType> implements IPasswordRecoveryPinRepository {
    constructor(data: PasswordRecoveryPinRepositoryType[]) {
        super(data);
    }
}
