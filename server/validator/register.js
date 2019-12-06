import * as Yup from 'yup';

const RegisterValidator = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required()
});

export default async (req, res, next) => {
    const { username, password, email } = req.body;

    // try {
    //     await RegisterValidator.validate({ username, password, email  });
    //     const existingUser = await User.findOne({
    //         userEmail: email
    //     });

    //     if (existingUser) {
    //         throw new Yup.ValidationError(
    //             'User already Exists !',
    //             req.body,
    //             'email'
    //         );
    //     }
    //     return next();
    // } catch (error) {
    //     return res.status(422).json({
    //         [error.path]: error.message
    //     });
    // }
};

