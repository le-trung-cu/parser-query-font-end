import { rest } from 'msw'

const places =  [
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "quan nuoc",
    "source": "auto",
    "status": "1",
    "placeType": "eatery"
  },
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa7",
    "name": "quan an",
    "source": "auto",
    "status": "2",
    "placeType": "eatery"
  }
]

export const handlers = [
  rest.get('/test', function (req, res, ctx) {
    return res(ctx.status(401))
  }),
  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true')

    return res(
      // Respond with a 200 status code
      ctx.status(200),
    )
  }),

  rest.get('/user', (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem('is-authenticated')

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      )
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),

  rest.get('/app/place',(req, res, ctx) => {
      return res(ctx.json({
        "items": places,
        "totalCount": 0
      }))
  } ),
//https://test-place.vimap.vn/api/app/place/3fa85f64-5717-4562-b3fc-2c963f66afa6?statusType=0
  rest.put('/app/place/:id', async (req, res, ctx) => {
    const {id} = req.params;
    const statusType = req.url.searchParams.get('statusType')

    const place = places.find(item => item.id === id);
    place.status = statusType;
    await new Promise(resolve => setTimeout(resolve, 5000));
    return res(ctx.json(place));
  })
]