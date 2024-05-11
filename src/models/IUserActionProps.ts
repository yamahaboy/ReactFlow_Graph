export type UserAction = {
    userId: number;
    userName: string;
    sessionId: number;
    action: string;
    timestamp: string;
}

export type SimpleAction = {
    action: string;
    timestamp: string;
};

export type UserActionGroup = {
    userId: number;
    userName: string;
    sessionId: number;
    actions: SimpleAction[];
};