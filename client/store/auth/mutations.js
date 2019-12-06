export const USER_DETAILS = 'USER_DETAILS';

export default {
    [USER_DETAILS](state, details) {
        state.userDetails = details.user;
    }
};