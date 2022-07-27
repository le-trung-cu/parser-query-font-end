import { rest } from 'msw';

const placeTypeNamesUserSubmited = [
    { name: 'Xe cộ', placeType: 'car' },
    { name: 'Đại lý xe oto', placeType: 'car_dealer' },
    { name: 'Đại lý xe máy', placeType: 'motorcycle_dealer' },
    { name: 'Đại lý xe đạp', placeType: 'bicycle_store' },
    { name: 'Quán ăn', placeType: 'eatry' },
    { name: 'Quán bánh bèo', placeType: 'eatry' },
    { name: 'Quán bánh xèo', placeType: 'eatry' },
]

export const handlers = [
    rest.post('/signin', async (req, res, ctx) => {
        const { email, password } = await req.json();
        if (email === 'test@gmail.com' && password === 'password') {
            return res(ctx.json({
                username: 'test',
                email: 'test@gmail.com',
                role: [],
            }));
        }
        return res(ctx.status(401), ctx.json({
            errorMessage: 'You have entered an incorrect username or password'
        }))
    }),

    rest.get('/user', null),

    rest.get('/place-types', async (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([
            { name: 'Xe cộ', id: 'car' },
            { name: 'Đại lý xe oto', id: 'car_dealer' },
            { name: 'Đại lý xe máy', id: 'motorcycle_dealer' },
            { name: 'Đại lý xe đạp', id: 'bicycle_store' },
            { name: 'Quán ăn', id: 'eatry' },
        ]));
    }),

    rest.get('/suggestions', async (req, res, ctx) => {
        const placeTypeNames = placeTypeNamesUserSubmited.filter(t => t.name.toLowerCase().indexOf(req.url.searchParams.get('q').toLowerCase()) >= 0);
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1500))
        return res(ctx.status(200), ctx.json(placeTypeNames));
    }),
]