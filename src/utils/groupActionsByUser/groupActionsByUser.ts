import { UserAction, UserActionGroup } from "../../models/IUserActionProps";

const groupActionsByUser = (userActions: UserAction[]): UserActionGroup[] => {
    const groups: Record<string, UserActionGroup> = {};

    userActions.forEach(action => {
        const groupKey = `${action.userId}_${action.sessionId}`;
        if (!groups[groupKey]) {
            groups[groupKey] = {
                userId: action.userId,
                userName: action.userName,
                sessionId: action.sessionId,
                actions: []
            };
        }
        groups[groupKey].actions.push({
            action: action.action,
            timestamp: action.timestamp
        });
    });

    return Object.values(groups);
};


export default groupActionsByUser