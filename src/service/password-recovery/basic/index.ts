
import config from "../../../config";
import { AccountRecoveryPinContext, Context } from "../../../helpers/email/interface";
import NodeMailer, { NodeMailerConfig } from "../../../helpers/email/nodemailer";
import AccountModel from "../../../models/account";
import { IPasswordRecoveryPinRepository } from "../../../repositories/password-recovery-pin/interface";
import { generateRandomString } from "../../../utils/code";
import { hasTimePassedSinceExpiration } from "../../../utils/date";
import NotFoundError from "../../../utils/error/not-found";
import UnauthorizedError from "../../../utils/error/unauthorized";
import JWT from "../../../utils/jwt";
import { AccessAccountPayload } from "../../login/local";
import IPasswordRecovery, { PasswordRecoveryConfirmType } from "../interface";

const expiration_in_minutes = 10;

export default class PasswordRecovery implements IPasswordRecovery {
    private passwordRecoveryPinRepository: IPasswordRecoveryPinRepository;
    private accountModel: AccountModel;
    private jwt: JWT;

    constructor(
        passwordRecoveryPinRepository: IPasswordRecoveryPinRepository, 
        accountModel: AccountModel,
        jwt: JWT,
        ) {
        this.passwordRecoveryPinRepository = passwordRecoveryPinRepository;
        this.accountModel = accountModel;
        this.jwt = jwt;
    }

    async sendPin(email: string): Promise<void> {
        try {
            const currentDate = new Date();
            const account = await this.accountModel.findOne({ email });
            if(!account) throw new NotFoundError(`Account Not Found`);
            const randomCode = generateRandomString(5);
            await this.passwordRecoveryPinRepository.create({
                account_id: account.id,
                code: randomCode,
                expires_at: new Date(currentDate.getTime() + expiration_in_minutes * 60000),
                confirmed: false
            });

            const context: Context<AccountRecoveryPinContext> = {
                pin: randomCode.split('').join(' '),
                expires_in: `${expiration_in_minutes} minutes`,
                name: account.first_name
            }

            const emailConfig: NodeMailerConfig = {
                service: config.nodemailer.service,
                host: config.nodemailer.host,
                port: Number(config.nodemailer.port),
                auth: {
                    user: config.nodemailer.auth.user,
                    pass: config.nodemailer.auth.password
                },
                secure: false
            }

            new NodeMailer(emailConfig).send({
                email,
                subject: "Password Recovery",
                template: 'account-recovery-pin',
                context
            });

        } catch (err) {
            throw err;
        }
    }
    async confirm(email: string, pin: string): Promise<PasswordRecoveryConfirmType<{}>> {
        try {
            const account = await this.accountModel.findOne({ email });
            const recovery = await this.passwordRecoveryPinRepository.find({
                account_id: account.id,
            }, {
                sort: {
                    field: 'created_at',
                    direction: 'desc'
                },
                pagination: {
                    page: 1,
                    size: 1
                }
            });

            if(recovery.amount < 1) throw new NotFoundError('Not Found');
            if(recovery.data[0].confirmed) throw new NotFoundError('Not Found');
            if(pin !== recovery.data[0].code) throw new NotFoundError('Not Found');
            if(recovery.amount < 1) throw new NotFoundError('Not Found');

            const recoveryData = recovery.data[0];

            if(hasTimePassedSinceExpiration(recoveryData.expires_at, expiration_in_minutes)) throw new UnauthorizedError('Code has expired');

            await this.passwordRecoveryPinRepository.update({
                account_id: account.id,
                code: pin,
                confirmed: false
            }, {
                confirmed: true
            })

            const token = this.jwt.create<AccessAccountPayload>({
                iss: config.token.iss,
                data: {
                    id: account.id,
                    role: account.type
                }
            }, 60000 * 10);

            return {
                success: true,
                data: {
                    token
                }
            }

        } catch(err) {
            throw err;
        }
    }
    
}