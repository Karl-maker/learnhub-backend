import MockDatabase from "../../helpers/db/mock";
import { PasswordRecoveryPinMockRepository } from "./mock";

const PasswordRecoveryPinRepository = {
    mock: new PasswordRecoveryPinMockRepository(MockDatabase.getInstance().database.password_recovery_pin)
}

export default PasswordRecoveryPinRepository;


