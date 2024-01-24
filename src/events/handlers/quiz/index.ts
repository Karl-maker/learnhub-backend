import config from "../../../config";
import NodeMailer, { NodeMailerConfig } from "../../../helpers/email/nodemailer";
import event from "../../../helpers/event";
import logger from "../../../helpers/logger";
import AccountModel from "../../../models/account";
import StudentModel from "../../../models/student";
import AccountRepository from "../../../repositories/account";
import { QuizRepositoryType } from "../../../repositories/quiz/interface";
import StudentRepository from "../../../repositories/student";
import { EventEntityName, EventUpdateByIdPayload, baseEvent } from "../../definitions/base";


export default () => {
    
    /**
     * @desc send notification (email / SMS) of completed quiz
     * @note if complete === true that means a quiz was completed
     */

    event.subscribe(baseEvent(EventEntityName.quiz).topics.UpdateById, (payload: EventUpdateByIdPayload<QuizRepositoryType>) => {
        (async ()=> {
            try {
                if(!payload.data.request.complete) return;

                const student = await new StudentModel(StudentRepository.mock).findById(payload.data.response.student_id);
                const account = await new AccountModel(AccountRepository.mock).findById(student.account_id);

                let score: number = payload.data.request.score ? payload.data.request.score : undefined;
                let total_score: number = 0;
                let total_points: number = 0;
                let message: {
                    title: string;
                    note: string;
                };

                payload.data.response.questions.forEach((question) => {
                    total_score += question.earned_marks;
                    total_points += question.possible_marks;
                });

                if(!score) score = total_score / total_points;

                switch (true) {
                    case score <= 0:
                        message = {
                            title: `Oops!`,
                            note: `It seems like there might be a misunderstanding. Let's review and try again! 🤔`
                        };
                        break;
                    case score < 0.2:
                        message = {
                            title: `More Practice`,
                            note: `With a little more practice and review, you will get this in no time. Keep going! 🚀`
                        };
                        break;
                    case score < 0.4:
                        message = {
                            title: `Keep Going!`,
                            note: `You're making progress! Keep practicing and you'll see improvement. 💪`
                        };
                        break;
                    case score < 0.5:
                        message = {
                            title: `Almost There!`,
                            note: `Hey, you're on the right track! Keep trying, and you'll pass with flying colors! 🌈`
                        };
                        break;
                    case score < 0.6:
                        message = {
                            title: `Good Job`,
                            note: `Nice work! With some more practice, you'll be scoring even higher. Keep it up! 🌟`
                        };
                        break;
                    case score < 0.7:
                        message = {
                            title: `Great!`,
                            note: `Congratulations on passing this quiz. Let's keep practicing for even better results! 🎉`
                        };
                        break;
                    case score < 0.8:
                        message = {
                            title: `Yay!`,
                            note: `You did well! Keep up the good work and continue to excel! 🎊`
                        };
                        break;
                    case score < 0.9:
                        message = {
                            title: `Wow!!`,
                            note: `You are up there, congratz!! Your hard work is paying off! 🌠`
                        };
                        break;
                    case score < 0.96:
                        message = {
                            title: `Congratulations!`,
                            note: `Scoring within 90% is amazing! Keep it up and aim for even higher scores! 🏆`
                        };
                        break;
                    case score < 1:
                        message = {
                            title: `Almost Perfect!`,
                            note: `Congratulations! You almost scored perfect. Just a bit more to reach the top! 🌟`
                        };
                        break;
                    case score === 1:
                        message = {
                            title: `Perfect!!`,
                            note: `Congratulations on your perfect score! You're a star! ⭐️`
                        };
                        break;
                    default:
                        message = {
                            title: `Good Job!`,
                            note: `You've completed the quiz. Keep up the good work and continue to learn and grow! 🌈`
                        };
                        break;
                }

                const nodeMailerConfig: NodeMailerConfig = {
                    service: config.nodemailer.service,
                    host: config.nodemailer.host,
                    port: Number(config.nodemailer.port),
                    auth: {
                        user: config.nodemailer.auth.user,
                        pass: config.nodemailer.auth.password
                    },
                    secure: false
                }

                new NodeMailer(nodeMailerConfig).send({
                    email: account.email,
                    subject: `Quiz Report`,
                    template: 'quiz-report',
                    context: {
                        name: account.first_name,
                        quiz_id: payload.data.response.id,
                        total_points,
                        total_score,
                        score: score * 100,
                        message
                    }
                });
            } catch(err) {
                logger.error(err.message, err);
            }
        })();
    })
}