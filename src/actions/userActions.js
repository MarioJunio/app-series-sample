import firebase from 'firebase';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export const userLoginAction = (user) => ({
    type: USER_LOGIN,
    user
});

export const userLogoutAction = () => ({
    type: USER_LOGOUT
});

export const tentarEntrar = (email, senha) => dispatch => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, senha)
        .then(user => {
            dispatch(userLoginAction(user));
        });
};

export const criarConta = (email, senha) => dispatch => (
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, senha)
        .then(user => {
            dispatch(userLoginAction(user));
        })
);


