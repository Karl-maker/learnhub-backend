import { StudentRepositoryType } from "../../../repositories/student/interface"

const topics = {
    StudentCreate: 'student-create',
}

const studentEvent = {
    topics
}

export type StudentEventCreatePayload = {
    student: Partial<StudentRepositoryType>,
}

export {
    studentEvent
}
