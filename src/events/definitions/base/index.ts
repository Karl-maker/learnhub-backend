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
        response: Partial<T>;
        request: Partial<T>;
    };
}

export type EventCreatePayload<T> = {
    data: Partial<T>;
}

export type EventDeleteByIdPayload<T> = {
    data: Partial<T>;
    success: boolean;
}

export const EventEntityName = {
    quiz: `quiz`
}