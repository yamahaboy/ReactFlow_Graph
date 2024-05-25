import { UserAction, UserActionGroup } from "../../models/IUserActionProps";

const groupActionsByUser = (userActions: UserAction[]): UserActionGroup[] => {
    const groups: Record<string, UserActionGroup> = {};

    userActions.forEach(action => {
        if (!groups[action.userId]) {
            groups[action.userId] = {
                userId: action.userId,
                userName: action.userName,
                sessionId: action.sessionId,
                actions: []
            };
        }
        groups[action.userId].actions.push({
            action: action.action,
            timestamp: action.timestamp
        });
    });

    return Object.values(groups);
};


export default groupActionsByUser