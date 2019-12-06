import * as Yup from 'yup';

const RegisterValidator = Yup.object().shape({
    UserName: Yup.string().min(3).required(),
    UserPassword: Yup.string().min(6).required()
});

export default (req, res, next) => {
    const UserName = req.body.username;
    const UserPassword = req.body.password;

    RegisterValidator.validate({ UserName, UserPassword })
    .then(() => next())
    .catch(error => res.status(422).json({
        [error.path]: error.message
    }));
};

