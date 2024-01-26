export const baseEvent = (e: string) => {
    return {
        topics: {
            UpdateById: `${e}-update-by-id`,
            Create: `${e}-create`,
            DeleteById: `${e}-delete-by-id`,
        }
    }
}

export type EventUpdateByIdPayload<T> = {
    success: boolean;
    data: {
        response: T;
        request: T;
    };
}

export type EventCreatePayload<T> = {
    data: T;
}

export type EventDeleteByIdPayload<T> = {
    data: T;
    success: boolean;
}

export const EventEntityName = {
    quiz: `quiz`
}