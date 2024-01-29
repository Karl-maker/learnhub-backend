import { StudentRepositoryType } from "../../../repositories/student/interface"

const topics = {
    StudentCreate: 'student-create',
    StudentProfileImageUpdate: 'student-updated-picture'
}

const studentEvent = {
    topics
}

export type StudentEventCreatePayload = {
    student: StudentRepositoryType,
}

export type StudentEventUpdateProfilePicturePayload = {
    student: {
        id: string;
    };
    picture: {
        old: {
            url: string;
            id: string;
            ext: string;
        };
        new: {
            url: string;
            id: string;
            ext: string; 
        };
    }
}

export {
    studentEvent
}
