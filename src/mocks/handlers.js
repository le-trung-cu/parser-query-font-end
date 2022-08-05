import { rest } from 'msw';
import { URLS } from '../api/api';

const placeNamesUserSubmited = [
    { id: '', name: 'Xe cộ', source: 'auto', status: '', placeType: 'car' },
];

const placeTypes = [
    {
        "id": "",
        "type": "\tcar\t",
        "typeName": "Xe cộ"
    },
    {
        "type": "\tcar_dealer\t",
        "typeName": "Đại lý xe oto"
    },
    {
        "type": "\tmotorcycle_dealer\t",
        "typeName": "Đại lý xe máy"
    },
    {
        "type": "\tbicycle_store\t",
        "typeName": "Đại lý xe đạp"
    },
    {
        "type": "\tcar_repair\t",
        "typeName": "Dịch vụ sửa xe, cứu hộ oto"
    },
    {
        "type": "\tcar_wash\t",
        "typeName": "Dịch vụ rửa xe oto, xe máy"
    },
    {
        "type": "\tmotorcycle_repair\t",
        "typeName": "Dịch vụ sửa xe máy, xe đạp"
    },
    {
        "type": "\tcar_rental\t",
        "typeName": "Cho thuê xe ô tô"
    }
];
const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1QTRDM0EzNTAyQzdBRTNGQjIzQTVGNkI3NjNGNjg2IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NTk2Mzk5NDYsImV4cCI6MTY5MTE3NTk0NiwiaXNzIjoiaHR0cHM6Ly90ZXN0LXBsYWNlLnZpbWFwLnZuIiwiYXVkIjoiUGxhY2VBcHAiLCJjbGllbnRfaWQiOiJQbGFjZUFwcF9BcHAiLCJzdWIiOiI1Yzg3MGJjMC03YmMwLTk3YWItNjYxYy0zYTA1NmE1N2IxNTkiLCJhdXRoX3RpbWUiOjE2NTk2Mzk5NDUsImlkcCI6ImxvY2FsIiwicm9sZSI6ImFkbWluIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJlbWFpbCI6ImFkbWluQGFicC5pbyIsImVtYWlsX3ZlcmlmaWVkIjoiRmFsc2UiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTk2Mzk5NDYsInNjb3BlIjpbIlBsYWNlQXBwIl0sImFtciI6WyJwd2QiXX0.Rsu_qX8RWamIrWp6--KIxQzsrK8A-ihL5B5Mu0VCld_5AiwA8g853kDXjUhqzxKbVVZTty54MrBNtKEunYtvnjELBA1KFRdzNycmxlCsxyzPkpXSY-9QNza5zaWWbDE9WQTeZ2Aj7G0IxuFQNfcRypcVRt5-XkDDzh2YQLIfIXUZ2zlso-OWX90xSsoZaz9-gTtsokw3UQaRXiTWG0pWA_fmQCkL0qlEzrsiWVyjJsduMnee06X1-PBpCoQrsME2OxWujqXTB7kkj4U-yCWlzEa8IyOzJ7y6MYwA2ezzqo34Y5jc08W5ksHhvhcBaEz6jg-xRKLa-_bjH5c1e_YiwA"
export const handlers = [
    // account register
    rest.post(URLS.signUp, async (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            "result": 0,
            "description": "string",
            token,
            "tokenType": "string",
            "expireIn": "string"
        }));
    }),
    // login
    rest.post(URLS.signIn, async (req, res, ctx) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const { userNameOrEmailAddress: email, password } = await req.json();
        if (email === 'test@gmail.com' && password === 'User@123') {
            return res(ctx.json({
                result: 1,
                description: "string",
                token,
            }));
        }
        return res(ctx.status(200), ctx.json({
            "result": 2,
            "description": "InvalidUserNameOrPassword",
            "token": null,
            "tokenType": null,
            "expireIn": null
        }))
    }),
    // get placeTypes (for select box)
    rest.get(URLS.placeTypes, async (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            totalCount: placeTypes.length,
            items: placeTypes,
        }));
    }),
    // get place names
    rest.get(URLS.place, async (req, res, ctx) => {
        const items = placeNamesUserSubmited
            .filter(t => t.name.toLowerCase().indexOf(req.url.searchParams.get('filter').toLowerCase()) >= 0);
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1500));

        return res(ctx.status(200), ctx.json({ items, totalCount: items.length }));
    }),
    // create place name
    rest.post(URLS.place, async (req, res, ctx) => {
        const { placeType, name } = await req.json();
        const exist = placeNamesUserSubmited.findIndex(t => t.name.toLowerCase() === name.toLowerCase()) >= 0;
        if (exist) {
            return res(ctx.status(400), ctx.json({
                "error": {
                    "code": "string",
                    "message": "Place name has exist in the database",
                    "details": "string",
                    "data": {
                        "additionalProp1": "string",
                        "additionalProp2": "string",
                        "additionalProp3": "string"
                    },
                    "validationErrors": [
                        {
                            "message": "string",
                            "members": [
                                "string"
                            ]
                        }
                    ]
                }
            }));
        }

        const newPlace = { id: name, name: name, source: 'auto', status: 0, placeType }
        placeNamesUserSubmited.push(newPlace);

        return res(ctx.status(201), ctx.json(newPlace));
    })
]