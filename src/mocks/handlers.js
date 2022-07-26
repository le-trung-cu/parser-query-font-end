import { rest, setupWorker } from 'msw';

const handlers = [
    rest.post('/signin', async (req, res, ctx) => {
        const { email, password } = await req.json();
        if (email == 'test@gmail.com' && password == 'password') {
            console.log(req.bodyUsed);
            return res(ctx.json({
                username: 'test',
                email: 'test@gmail.com',
                role: [],
            }));
        }
        return res(ctx.status(401), ctx.json({
            errorMessage: 'You have entered an invalid username or password'
        }))
    }),
    rest.get('/user', null),
]

export const worker = setupWorker(...handlers);