import { rest } from 'msw';
import { URLS } from '../api/api';
const statusTypeCode = {
    '0': 'Pending',
    '1': 'Approval',
    '2': 'Discard',
}
const placeNamesUserSubmited = [
    { name: 'Xe cộ', source: 'auto', status: 'Pending', placeType: 'car', id: '196ff796-5c51-b877-8322-3a057234b803' },
    {
        "name": "ATM",
        "source": "auto",
        "status": "Approval",
        "placeType": "atm",
        "id": "823090be-ac40-da7b-d79d-3a056a57b759"
    },
    {
        "name": "Bai",
        "source": "auto",
        "status": "Pending",
        "placeType": "car",
        "id": "f18d5d17-0c6e-7f68-a400-3a0577d11f81"
    },
    {
        "name": "Bai2",
        "source": "auto",
        "status": "Pending",
        "placeType": "car",
        "id": "f522d01a-935a-4ef3-777c-3a0577d1393f"
    },
    {
        "name": "Bai3",
        "source": "auto",
        "status": "Pending",
        "placeType": "car",
        "id": "67a83de6-5a6c-6e27-2440-3a0577d15c72"
    },
    {
        "name": "Bai4",
        "source": "auto",
        "status": "Discard",
        "placeType": "car",
        "id": "0aae474b-8cb4-ebb5-032a-3a0577d23c6a"
    },
    {
        "name": "Bai5",
        "source": "auto",
        "status": "Discard",
        "placeType": "car",
        "id": "efbc71ed-6959-cf97-df79-3a0577d26c55"
    },
    {
        "name": "Bãi biển",
        "source": "auto",
        "status": "Approval",
        "placeType": "f3624c5b-ca15-09c7-7009-3a056a57b60c",
        "id": "93aa6af9-bb79-ba85-050d-3a057241e1ce"
    },
    {
        "name": "Bãi biển",
        "source": "auto",
        "status": "Disapproval",
        "placeType": "public_beach",
        "id": "e7eafba3-ada6-b1ce-ab71-3a056a57b853"
    },
    {
        "name": "Bãi giữ xe",
        "source": "auto",
        "status": "Approval",
        "placeType": "f3624c5b-ca15-09c7-7009-3a056a57b60c",
        "id": "196ff796-5c51-b877-8322-3a057234b803"
    },
    {
        "name": "Bãi giữ xe",
        "source": "auto",
        "status": "Approval",
        "placeType": "parking",
        "id": "8fc716c6-42eb-9dd1-a09b-3a056a57b7a4"
    },
    {
        "name": "Bãi giữ xe2",
        "source": "Anonymous",
        "status": "Pending",
        "placeType": "motorcycle_dealer",
        "id": "2bf14e93-f3fc-7704-ce08-3a057d71031e"
    },
    {
        "name": "Bãi giữ xe22",
        "source": "Anonymous",
        "status": "Pending",
        "placeType": "motorcycle_dealer",
        "id": "240772b2-7895-2635-d51c-3a057d7180df"
    },
    {
        "name": "Bảo tàng",
        "source": "auto",
        "status": "Pending",
        "placeType": "1c2818eb-7b9b-5f81-fbc6-3a056a57b617",
        "id": "a76572cd-7aff-54e5-c6f9-3a05724ac51f"
    },
    {
        "name": "Bảo tàng",
        "source": "auto",
        "status": "Pending",
        "placeType": "museum",
        "id": "a285e49a-40e9-d6c0-ace5-3a056a57b850"
    },
    {
        "name": "Bảo tàng 2",
        "source": "auto",
        "status": "Pending",
        "placeType": "1c2818eb-7b9b-5f81-fbc6-3a056a57b617",
        "id": "fefbb7cf-1f8a-5372-3188-3a05724dc31c"
    },
    {
        "name": "Bảo tàng1",
        "source": "auto",
        "status": "Pending",
        "placeType": "1c2818eb-7b9b-5f81-fbc6-3a056a57b617",
        "id": "243dcbeb-ffe4-105f-6110-3a05724d4c35"
    },
    {
        "name": "Bảo tàng2",
        "source": "auto",
        "status": "Pending",
        "placeType": "1c2818eb-7b9b-5f81-fbc6-3a056a57b617",
        "id": "4bbe741d-eb1d-7a41-ddfc-3a05724d7f32"
    },
    {
        "name": "Bến xe",
        "source": "auto",
        "status": "Pending",
        "placeType": "bb0dfbf3-e4db-280f-a0bd-3a056a57b719",
        "id": "8c1a63c4-1f50-605a-4c0f-3a05721d3e0a"
    },
    {
        "name": "Bến xe",
        "source": "auto",
        "status": "Pending",
        "placeType": "bus_station",
        "id": "e231bc49-4a56-ce8f-eed7-3a056a57b787"
    },
    {
        "name": "Bến xe 1",
        "source": "auto",
        "status": "Pending",
        "placeType": "f3624c5b-ca15-09c7-7009-3a056a57b60c",
        "id": "4d187123-4c86-cbac-3609-3a057229088c"
    },
    {
        "name": "Bến xe 10",
        "source": "auto",
        "status": "Pending",
        "placeType": "f3624c5b-ca15-09c7-7009-3a056a57b60c",
        "id": "fcf6d217-ac37-d07e-9e19-3a05725cb02d"
    },
    {
        "name": "Bến xe 11",
        "source": "auto",
        "status": "Pending",
        "placeType": "f3624c5b-ca15-09c7-7009-3a056a57b60c",
        "id": "2bffe8e4-04d0-6e22-6d66-3a05725d5310"
    },
    {
        "name": "Bến xe 113",
        "source": "auto",
        "status": "Pending",
        "placeType": "f3624c5b-ca15-09c7-7009-3a056a57b60c",
        "id": "928c0fb7-5ce3-4f4a-2099-3a057270c177"
    },
    {
        "name": "Bến xe 12",
        "source": "auto",
        "status": "Pending",
        "placeType": "f3624c5b-ca15-09c7-7009-3a056a57b60c",
        "id": "a2c25d7d-4975-9db1-2004-3a05725d8021"
    },
    {
        "name": "Bến xe 2",
        "source": "auto",
        "status": "Pending",
        "placeType": "f3624c5b-ca15-09c7-7009-3a056a57b60c",
        "id": "d9c5fd32-069e-11c0-802b-3a057246eea7"
    },
    {
        "name": "Bến xe 3",
        "source": "auto",
        "status": "Pending",
        "placeType": "f3624c5b-ca15-09c7-7009-3a056a57b60c",
        "id": "5d90f62e-e7e8-0c1b-2d24-3a0572515875"
    },
    {
        "name": "Bến xe 4",
        "source": "auto",
        "status": "Pending",
        "placeType": "f3624c5b-ca15-09c7-7009-3a056a57b60c",
        "id": "9b73e28a-6f3c-295f-0703-3a05725234ae"
    },
    {
        "name": "Bến xe 5",
        "source": "auto",
        "status": "Pending",
        "placeType": "f3624c5b-ca15-09c7-7009-3a056a57b60c",
        "id": "6831987d-6485-6d82-aa6a-3a0572538330"
    },
    {
        "name": "Bến xe 6",
        "source": "auto",
        "status": "Pending",
        "placeType": "f3624c5b-ca15-09c7-7009-3a056a57b60c",
        "id": "488a8250-d720-1bfd-8125-3a0572553e93"
    },
    {
        "name": "Bến xe 7",
        "source": "auto",
        "status": "Pending",
        "placeType": "f3624c5b-ca15-09c7-7009-3a056a57b60c",
        "id": "be5eea30-9fe6-ed79-1440-3a05725995fb"
    },
    {
        "name": "Bến xe 8",
        "source": "auto",
        "status": "Pending",
        "placeType": "f3624c5b-ca15-09c7-7009-3a056a57b60c",
        "id": "3db39538-f897-9024-c55f-3a05725b1991"
    },
    {
        "name": "Bến xex",
        "source": "Anonymous",
        "status": "Pending",
        "placeType": "car",
        "id": "0de7596f-b5c3-7b61-b945-3a057da4c57a"
    },
    {
        "name": "Bến đò, phà",
        "source": "auto",
        "status": "Approval",
        "placeType": "ferry",
        "id": "65b2b767-25f2-fd0d-9071-3a056a57b78f"
    },
    {
        "name": "Bệnh viện, trạm y tế",
        "source": "auto",
        "status": "Approval",
        "placeType": "hospital",
        "id": "40c6c8e4-60d2-1c99-4e16-3a056a57b775"
    },
    {
        "name": "Cho thuê xe xe máy, xe đạp",
        "source": "auto",
        "status": "Pending",
        "placeType": "motorcycle_rental",
        "id": "8327daa0-096a-56d9-5871-3a056a57b751"
    },
    {
        "name": "Cho thuê xe ô tô",
        "source": "auto",
        "status": "Approval",
        "placeType": "car_rental",
        "id": "ea14dd55-a253-234b-7ec4-3a056a57b74c"
    },
    {
        "name": "Chung cư, căn hộ",
        "source": "auto",
        "status": "Approval",
        "placeType": "apartment",
        "id": "eda991a7-b2e3-b4f4-aab8-3a056a57b7da"
    },
    {
        "name": "Chùa",
        "source": "auto",
        "status": "Approval",
        "placeType": "pagoda",
        "id": "ede57ebc-fbaa-34e1-6817-3a056a57b816"
    },
    {
        "name": "Chợ",
        "source": "auto",
        "status": "Approval",
        "placeType": "local_market",
        "id": "1deebf73-bd48-90b3-5587-3a056a57b8f0"
    },
    {
        "name": "Cà phê",
        "source": "auto",
        "status": "Approval",
        "placeType": "cafe",
        "id": "51e1a49c-2253-a601-0300-3a056a57b7e9"
    },
    {
        "name": "Công ty du lịch & lữ hành",
        "source": "auto",
        "status": "Approval",
        "placeType": "travel_agency",
        "id": "6005e612-16d8-7bf4-381d-3a056a57b841"
    },
    {
        "name": "Công ty xây dựng",
        "source": "auto",
        "status": "Pending",
        "placeType": "f2030d7e-a525-7e53-8848-3a056a57b60f",
        "id": "6057bc5b-1c69-16a0-e3f8-3a05725faa2d"
    },
    {
        "name": "Công ty xây dựng",
        "source": "auto",
        "status": "Approval",
        "placeType": "construction_company",
        "id": "f268beca-0547-a337-2926-3a056a57b830"
    },
    {
        "name": "Công ty xây dựng cx",
        "source": "auto",
        "status": "Pending",
        "placeType": "f2030d7e-a525-7e53-8848-3a056a57b60f",
        "id": "580347c8-fe1e-8f49-6702-3a05725ffe68"
    },
    {
        "name": "Công ty, tổ chức, hiệp hội",
        "source": "auto",
        "status": "Approval",
        "placeType": "establishment",
        "id": "0a11e30f-f2f0-aa6b-c7f0-3a056a57b827"
    },
    {
        "name": "Công viên/khu vực đi bộ thư giãn",
        "source": "auto",
        "status": "Approval",
        "placeType": "park",
        "id": "12bdfc20-a199-b598-7cd2-3a056a57b869"
    },
    {
        "name": "Cảng biển",
        "source": "auto",
        "status": "Approval",
        "placeType": "harbour",
        "id": "8cef2b51-6c52-8670-8807-3a056a57b99b"
    },
    {
        "name": "Cầu",
        "source": "auto",
        "status": "Approval",
        "placeType": "bridge",
        "id": "7803d752-306d-294d-ee45-3a056a57b993"
    },
    {
        "name": "Cửa hàng",
        "source": "auto",
        "status": "Approval",
        "placeType": "store",
        "id": "9a087613-5aeb-3c88-48a7-3a056a57b8fc"
    },
    {
        "name": "Cửa hàng bia/rượu",
        "source": "auto",
        "status": "Approval",
        "placeType": "liquor_store",
        "id": "d2d57b96-6496-1d65-6029-3a056a57b92a"
    },
    {
        "name": "Cửa hàng dụng cụ thể thao",
        "source": "auto",
        "status": "Approval",
        "placeType": "sports_store",
        "id": "f7401226-5a20-536e-3a65-3a056a57b911"
    },
    {
        "name": "Cửa hàng giày/dép",
        "source": "auto",
        "status": "Approval",
        "placeType": "shoe_store",
        "id": "10374541-4143-56ad-e179-3a056a57b8d8"
    },
    {
        "name": "Cửa hàng hoa/cây cảnh",
        "source": "auto",
        "status": "Approval",
        "placeType": "florist",
        "id": "f741e965-19bb-2355-1f2a-3a056a57b904"
    },
    {
        "name": "Cửa hàng lưu niệm/đặc sản/quà cáp",
        "source": "auto",
        "status": "Approval",
        "placeType": "gift_shop",
        "id": "ca6b3695-259a-659f-ad90-3a056a57b92e"
    },
    {
        "name": "Cửa hàng máy tính",
        "source": "auto",
        "status": "Approval",
        "placeType": "computer_store",
        "id": "4e688670-c8d3-1c96-bbf6-3a056a57b8e5"
    },
    {
        "name": "Cửa hàng mắt kính",
        "source": "auto",
        "status": "Approval",
        "placeType": "glasses_store",
        "id": "ee0aa58e-a1f8-694c-9d96-3a056a57b8d5"
    },
    {
        "name": "Cửa hàng mẹ và bé",
        "source": "auto",
        "status": "Approval",
        "placeType": "mommy_store",
        "id": "2f005d09-2689-fc0e-e637-3a056a57b8c9"
    },
    {
        "name": "Cửa hàng mỹ phẩm",
        "source": "auto",
        "status": "Approval",
        "placeType": "cosmetic_store",
        "id": "83c7174a-e974-9594-324b-3a056a57b8bb"
    },
    {
        "name": "Cửa hàng nhiên liệu (gas/than/dầu/..)",
        "source": "auto",
        "status": "Approval",
        "placeType": "fuel_store",
        "id": "33ab7e90-ce0c-e0c1-6678-3a056a57b940"
    },
    {
        "name": "Cửa hàng nhạc cụ",
        "source": "auto",
        "status": "Approval",
        "placeType": "musical_instrument_store",
        "id": "dd472a9f-fb8c-c437-5126-3a056a57b935"
    },
    {
        "name": "Cửa hàng nội thất",
        "source": "auto",
        "status": "Approval",
        "placeType": "furniture_store",
        "id": "f3c83f07-b279-ca7d-e0b5-3a056a57b90c"
    },
    {
        "name": "Cửa hàng thú cưng",
        "source": "auto",
        "status": "Approval",
        "placeType": "pet_store",
        "id": "0aba9762-ae33-65d3-c4c4-3a056a57b926"
    },
    {
        "name": "Cửa hàng thực phẩm",
        "source": "auto",
        "status": "Approval",
        "placeType": "food_store",
        "id": "8e0ee334-c519-6d71-dc7f-3a056a57b8e8"
    },
    {
        "name": "Cửa hàng tiện lợi 24/7",
        "source": "auto",
        "status": "Approval",
        "placeType": "convenience_store",
        "id": "5208e163-01c2-f1d9-822c-3a056a57b8ec"
    },
    {
        "name": "Cửa hàng trang sức",
        "source": "auto",
        "status": "Approval",
        "placeType": "jewelry_store",
        "id": "ee69c04b-f0dd-0313-dffd-3a056a57b91a"
    },
    {
        "name": "Cửa hàng trái cây, rau quả",
        "source": "auto",
        "status": "Approval",
        "placeType": "fruit_shop",
        "id": "942bf43a-3a91-0496-8b0c-3a056a57b900"
    },
    {
        "name": "Cửa hàng tạp hóa",
        "source": "auto",
        "status": "Approval",
        "placeType": "grocery_store",
        "id": "20a2adf0-dbe2-d017-add0-3a056a57b8f7"
    },
    {
        "name": "Cửa hàng vật liệu xây dựng, nội thất",
        "source": "auto",
        "status": "Approval",
        "placeType": "building_materials_store",
        "id": "3d1a156f-15cb-f229-fb71-3a056a57b932"
    },
    {
        "name": "Cửa hàng áo quần",
        "source": "auto",
        "status": "Approval",
        "placeType": "clothing_store",
        "id": "1eb507f6-5df0-6b3e-aa58-3a056a57b8d1"
    },
    {
        "name": "Cửa hàng điện nước",
        "source": "auto",
        "status": "Approval",
        "placeType": "electrical_supply_store",
        "id": "c8dba99a-770a-0528-8ce8-3a056a57b93a"
    },
    {
        "name": "Cửa hàng điện thoại di động",
        "source": "auto",
        "status": "Approval",
        "placeType": "cellphone_store",
        "id": "040ab087-5066-50ca-c157-3a056a57b8e0"
    },
    {
        "name": "Cửa hàng đồ chơi",
        "source": "auto",
        "status": "Approval",
        "placeType": "toy_store",
        "id": "da58b7f9-17b0-131d-1e78-3a056a57b908"
    },
    {
        "name": "Cửa hàng đồ cũ",
        "source": "auto",
        "status": "Approval",
        "placeType": "second_hand_store",
        "id": "0124f309-6a4e-cd96-5a32-3a056a57b944"
    },
    {
        "name": "Cửa hàng đồ gia dụng",
        "source": "auto",
        "status": "Approval",
        "placeType": "home_goods_store",
        "id": "d5338687-be73-8c9a-92d7-3a056a57b915"
    },
    {
        "name": "Cửa hàng đồ điện tử",
        "source": "auto",
        "status": "Approval",
        "placeType": "electronics_store",
        "id": "f883ff7c-85cd-f1bc-349e-3a056a57b8dc"
    },
    {
        "name": "Dịch vụ Spa/massage",
        "source": "auto",
        "status": "Approval",
        "placeType": "spa",
        "id": "90545eb0-b4f4-5173-3613-3a056a57b887"
    },
    {
        "name": "Dịch vụ chuyển phát, bưu điện",
        "source": "auto",
        "status": "Approval",
        "placeType": "post_office",
        "id": "0ed1bdb8-bfa1-a04b-80a6-3a056a57b94c"
    },
    {
        "name": "Dịch vụ chụp ảnh",
        "source": "auto",
        "status": "Approval",
        "placeType": "photography",
        "id": "4b1f012f-4106-4af9-1026-3a056a57b957"
    },
    {
        "name": "Dịch vụ cầm đồ",
        "source": "auto",
        "status": "Approval",
        "placeType": "pawn_shop",
        "id": "3f3644b2-e713-38d9-b74e-3a056a57b769"
    },
    {
        "name": "Dịch vụ giặt ủi",
        "source": "auto",
        "status": "Approval",
        "placeType": "laundry",
        "id": "067a3066-80e0-ba05-e327-3a056a57b950"
    },
    {
        "name": "Dịch vụ in ấn, photocopy",
        "source": "auto",
        "status": "Approval",
        "placeType": "photocopy",
        "id": "662c500b-8203-e7cf-818d-3a056a57b969"
    },
    {
        "name": "Dịch vụ liên quan đến cưới hỏi",
        "source": "auto",
        "status": "Approval",
        "placeType": "wedding_service",
        "id": "58214882-a5d3-443c-0976-3a056a57b948"
    },
    {
        "name": "Dịch vụ lưu trú (hostel, home stay)",
        "source": "auto",
        "status": "Approval",
        "placeType": "lodging",
        "id": "ed5b99a5-e87a-442d-d2bd-3a056a57b7d2"
    },
    {
        "name": "Dịch vụ mai táng",
        "source": "auto",
        "status": "Approval",
        "placeType": "funeral_service",
        "id": "0b220dc5-1a0e-0710-84b7-3a056a57b971"
    },
    {
        "name": "Dịch vụ may mặc",
        "source": "auto",
        "status": "Approval",
        "placeType": "tailor",
        "id": "f19e6b68-e26b-bb98-c72a-3a056a57b8cd"
    },
    {
        "name": "Dịch vụ môi giới việc làm",
        "source": "auto",
        "status": "Approval",
        "placeType": "employment_agency",
        "id": "452bc7c7-8235-87cc-1853-3a056a57b974"
    },
    {
        "name": "Dịch vụ mạng viễn thông",
        "source": "auto",
        "status": "Approval",
        "placeType": "tel_service",
        "id": "f63ec960-a245-8c5a-8800-3a056a57b95b"
    },
    {
        "name": "Dịch vụ pháp lý/công chứng",
        "source": "auto",
        "status": "Approval",
        "placeType": "legal_service",
        "id": "b9368103-2d99-3d8f-2b2b-3a056a57b962"
    },
    {
        "name": "Dịch vụ rửa xe oto, xe máy",
        "source": "auto",
        "status": "Approval",
        "placeType": "car_wash",
        "id": "24193f76-2051-2764-f22c-3a056a57b743"
    },
    {
        "name": "Dịch vụ sửa khóa",
        "source": "auto",
        "status": "Approval",
        "placeType": "locksmith",
        "id": "18fa4f34-436d-c52b-ad03-3a056a57b97f"
    },
    {
        "name": "Dịch vụ sửa xe máy, xe đạp",
        "source": "auto",
        "status": "Approval",
        "placeType": "motorcycle_repair",
        "id": "05949898-4518-776f-9824-3a056a57b748"
    },
    {
        "name": "Dịch vụ sửa xe, cứu hộ oto",
        "source": "auto",
        "status": "Approval",
        "placeType": "car_repair",
        "id": "ce3a0352-a205-2cc5-b6a6-3a056a57b73f"
    },
    {
        "name": "Dịch vụ thú y",
        "source": "auto",
        "status": "Approval",
        "placeType": "veterinary_care",
        "id": "f64a7459-7a34-27a2-738f-3a056a57b96d"
    },
    {
        "name": "Dịch vụ tổ chức sự kiện",
        "source": "auto",
        "status": "Approval",
        "placeType": "event_agency",
        "id": "2e04bad0-de9e-1ced-fed6-3a056a57b97c"
    },
    {
        "name": "Dịch vụ vận chuyển",
        "source": "auto",
        "status": "Approval",
        "placeType": "moving_service",
        "id": "6c36daf1-8544-9047-04df-3a056a57b954"
    },
    {
        "name": "Dịch vụ vệ sinh",
        "source": "auto",
        "status": "Approval",
        "placeType": "sanitation_service",
        "id": "6b589d6d-bea3-a787-7976-3a056a57b978"
    },
    {
        "name": "Dịch vụ ăn uống",
        "source": "auto",
        "status": "Approval",
        "placeType": "food_service",
        "id": "a9f121e6-7ef1-4ead-f925-3a056a57b7e6"
    },
    {
        "name": "Ga tàu lửa",
        "source": "auto",
        "status": "Approval",
        "placeType": "train_station",
        "id": "7cb67546-ad5c-57e1-95cf-3a056a57b793"
    },
    {
        "name": "Ga tàu điện ngầm",
        "source": "auto",
        "status": "Approval",
        "placeType": "subway_station",
        "id": "522df5fd-3460-da39-ed1a-3a056a57b79a"
    },
    {
        "name": "Giao thông công cộng",
        "source": "auto",
        "status": "Approval",
        "placeType": "public_transport",
        "id": "d9e72ac8-184f-b54c-e870-3a056a57b783"
    },
    {
        "name": "Giáo dục và đào tạo",
        "source": "auto",
        "status": "Approval",
        "placeType": "education",
        "id": "265f778f-8109-8f38-341d-3a056a57b7ab"
    },
    {
        "name": "Giải khát, quán nước, sinh tố",
        "source": "auto",
        "status": "Approval",
        "placeType": "drink",
        "id": "bb11d553-ff43-c62d-7ebb-3a056a57b804"
    },
    {
        "name": "Hiệu làm tóc/nails",
        "source": "auto",
        "status": "Approval",
        "placeType": "hair_care",
        "id": "0cca4863-d577-1fb4-360a-3a056a57b8be"
    },
    {
        "name": "Hộp đêm/Vũ trường/Quán bar",
        "source": "auto",
        "status": "Approval",
        "placeType": "bar",
        "id": "6b3b9bdb-b884-9241-f145-3a056a57b890"
    },
    {
        "name": "Kho bạc",
        "source": "auto",
        "status": "Approval",
        "placeType": "treasury",
        "id": "f42ea04a-3db0-cf35-087b-3a056a57b761"
    },
    {
        "name": "Khu công nghiệp",
        "source": "auto",
        "status": "Approval",
        "placeType": "industrial_zone",
        "id": "b89e5848-8635-0c4a-5dd5-3a056a57b83d"
    },
    {
        "name": "Khu triển lãm",
        "source": "auto",
        "status": "Approval",
        "placeType": "art_gallery",
        "id": "2803fbe1-5c6d-d1ae-58f8-3a056a57b857"
    },
    {
        "name": "Khu vui chơi",
        "source": "auto",
        "status": "Approval",
        "placeType": "amusement_park",
        "id": "3f6989e5-7e6d-d343-611a-3a056a57b875"
    },
    {
        "name": "Khu vực cắm trại",
        "source": "auto",
        "status": "Approval",
        "placeType": "campground",
        "id": "fa9005cf-d53c-f3c3-1ca9-3a056a57b84c"
    },
    {
        "name": "Khách sạn",
        "source": "auto",
        "status": "Approval",
        "placeType": "hotel",
        "id": "d39bb633-05e7-b019-1ff2-3a056a57b7d6"
    },
    {
        "name": "Kinh doanh bảo hiểm",
        "source": "auto",
        "status": "Approval",
        "placeType": "insurance_agency",
        "id": "154b9806-9eb2-a3a0-ae40-3a056a57b834"
    },
    {
        "name": "Kinh doanh bất động sản",
        "source": "auto",
        "status": "Approval",
        "placeType": "real_estate_agency",
        "id": "8b47ef81-a545-894c-d0a1-3a056a57b839"
    },
    {
        "name": "Kế toán",
        "source": "auto",
        "status": "Approval",
        "placeType": "accounting",
        "id": "05e3c174-e80c-9cb2-d0ce-3a056a57b765"
    },
    {
        "name": "Liên quan đến chính quyền, địa phương",
        "source": "auto",
        "status": "Approval",
        "placeType": "government",
        "id": "01633e4f-9609-16b5-3629-3a056a57b89a"
    },
    {
        "name": "Liên quan đến làm đẹp",
        "source": "auto",
        "status": "Approval",
        "placeType": "beauty",
        "id": "f0a36f27-793f-6151-9ac9-3a056a57b8b7"
    },
    {
        "name": "Liên quan đến nông nghiệp",
        "source": "auto",
        "status": "Approval",
        "placeType": "farming",
        "id": "55325ddd-2ce4-d5a6-6e5b-3a056a57b9a6"
    },
    {
        "name": "Liên quan đến thể dục thể thao",
        "source": "auto",
        "status": "Approval",
        "placeType": "sports",
        "id": "6139b4eb-f45c-46dd-74b1-3a056a57b85b"
    },
    {
        "name": "Liên quan đến thời trang",
        "source": "auto",
        "status": "Approval",
        "placeType": "fashion",
        "id": "c1e74a2e-6d36-d9b6-8122-3a056a57b8c6"
    },
    {
        "name": "Liên quan đến vui chơi, giải trí",
        "source": "auto",
        "status": "Approval",
        "placeType": "entertainment",
        "id": "fd1001ea-46f5-4488-c41b-3a056a57b871"
    },
    {
        "name": "Liên quan đến xổ số",
        "source": "auto",
        "status": "Approval",
        "placeType": "lottery",
        "id": "2f1e87e3-3ca7-0fe0-eaab-3a056a57b99e"
    },
    {
        "name": "Luật sư",
        "source": "auto",
        "status": "Approval",
        "placeType": "lawyer",
        "id": "49e51289-c359-17f7-0b80-3a056a57b966"
    },
    {
        "name": "Nghĩa trang",
        "source": "auto",
        "status": "Approval",
        "placeType": "cemetery",
        "id": "d2a28ca0-8ada-c8e3-b247-3a056a57b98a"
    },
    {
        "name": "Ngân hàng",
        "source": "auto",
        "status": "Approval",
        "placeType": "bank",
        "id": "6e97d60f-8fd3-f93a-0b95-3a056a57b75d"
    },
    {
        "name": "Nha khoa",
        "source": "auto",
        "status": "Approval",
        "placeType": "dentist",
        "id": "9c439c65-b350-3b36-f93b-3a056a57b780"
    },
    {
        "name": "Nhà hàng",
        "source": "auto",
        "status": "Approval",
        "placeType": "restaurant",
        "id": "df6d0e2d-7a52-d900-3a24-3a056a57b80e"
    },
    {
        "name": "Nhà hát",
        "source": "auto",
        "status": "Approval",
        "placeType": "theater",
        "id": "4cc14805-563b-f9c8-510d-3a056a57b884"
    },
    {
        "name": "Nhà kho/ kho hàng hóa",
        "source": "auto",
        "status": "Approval",
        "placeType": "storage",
        "id": "6fe4afcf-e698-85d4-fcba-3a056a57b82c"
    },
    {
        "name": "Nhà nghỉ",
        "source": "auto",
        "status": "Approval",
        "placeType": "guest_house",
        "id": "ba84bf4c-a89e-1f99-cd41-3a056a57b7e1"
    },
    {
        "name": "Nhà sách",
        "source": "auto",
        "status": "Approval",
        "placeType": "book_store",
        "id": "0e7c9c60-1e38-686e-1936-3a056a57b91e"
    },
    {
        "name": "Nhà thuốc, quầy thuốc",
        "source": "auto",
        "status": "Approval",
        "placeType": "pharmacy",
        "id": "a6098b6b-8c1a-95b4-f7d3-3a056a57b771"
    },
    {
        "name": "Nhà thờ thiên chúa/tin lành",
        "source": "auto",
        "status": "Approval",
        "placeType": "church",
        "id": "370b9529-562c-cf60-fc99-3a056a57b821"
    },
    {
        "name": "Nhà tù",
        "source": "auto",
        "status": "Approval",
        "placeType": "prison",
        "id": "86c395ba-2058-fbf2-581b-3a056a57b983"
    },
    {
        "name": "Nhà văn hoá, sinh hoạt cộng đồng",
        "source": "auto",
        "status": "Approval",
        "placeType": "community_center",
        "id": "b83ebf33-5df5-8c1c-db09-3a056a57b8ac"
    },
    {
        "name": "Nhà vệ sinh công cộng",
        "source": "auto",
        "status": "Approval",
        "placeType": "public_restroom",
        "id": "7efbf019-9272-4f13-625a-3a056a57b987"
    },
    {
        "name": "Nhà xe cong cong",
        "source": "user1",
        "status": "Pending",
        "placeType": "parking",
        "id": "eb057dfc-d284-c087-e758-3a056a659ded"
    },
    {
        "name": "Nơi thờ cúng, trang nghiêm",
        "source": "auto",
        "status": "Approval",
        "placeType": "worship",
        "id": "d8dd7f0f-cbee-a37c-7148-3a056a57b81e"
    },
    {
        "name": "Phòng khám",
        "source": "auto",
        "status": "Approval",
        "placeType": "doctor",
        "id": "33d5e154-4aff-04e2-e260-3a056a57b778"
    },
    {
        "name": "Phòng tập thể dục, thể hình",
        "source": "auto",
        "status": "Approval",
        "placeType": "gym",
        "id": "99e0e85b-f31e-a3fd-e147-3a056a57b85e"
    },
    {
        "name": "Pub/Lougne",
        "source": "auto",
        "status": "Approval",
        "placeType": "pub",
        "id": "8a4ecc48-b7ba-55a6-c56f-3a056a57b893"
    },
    {
        "name": "Quán chè",
        "source": "auto",
        "status": "Approval",
        "placeType": "sweet_soup",
        "id": "4085ba5f-36c0-8919-8d04-3a056a57b800"
    },
    {
        "name": "Quán karaoke",
        "source": "auto",
        "status": "Approval",
        "placeType": "karaoke",
        "id": "d5e49b76-11e3-7a32-d039-3a056a57b897"
    },
    {
        "name": "Quán kem",
        "source": "auto",
        "status": "Approval",
        "placeType": "ice_cream_shop",
        "id": "a1b0ba7a-bd09-44ab-c52e-3a056a57b807"
    },
    {
        "name": "Quán nhậu",
        "source": "auto",
        "status": "Approval",
        "placeType": "beer_bar",
        "id": "974472a3-827c-4191-c64f-3a056a57b7fc"
    },
    {
        "name": "Quán ăn",
        "source": "auto",
        "status": "Approval",
        "placeType": "eatery",
        "id": "95880cea-7231-d596-f1c1-3a056a57b7f4"
    },
    {
        "name": "Quảng trường",
        "source": "auto",
        "status": "Approval",
        "placeType": "town_square",
        "id": "1b4b2b04-aa12-496a-c181-3a056a57b8b0"
    },
    {
        "name": "Resort, villa",
        "source": "auto",
        "status": "Approval",
        "placeType": "resort",
        "id": "150e0cf0-9c1c-390b-6565-3a056a57b7dd"
    },
    {
        "name": "Rạp chiếu phim",
        "source": "auto",
        "status": "Approval",
        "placeType": "cinema",
        "id": "2af31ab2-cbc7-e3a0-d898-3a056a57b879"
    },
    {
        "name": "Siêu thị",
        "source": "auto",
        "status": "Approval",
        "placeType": "supermarket",
        "id": "166501cd-3895-7c9f-983e-3a056a57b8f3"
    },
    {
        "name": "Sân bay",
        "source": "auto",
        "status": "Approval",
        "placeType": "airport",
        "id": "5a8f9eab-6e57-9ff2-7d81-3a056a57b78b"
    },
    {
        "name": "Sân golf",
        "source": "auto",
        "status": "Approval",
        "placeType": "golf",
        "id": "9a6f4849-2319-7225-eff1-3a056a57b86d"
    },
    {
        "name": "Sân vận động",
        "source": "auto",
        "status": "Approval",
        "placeType": "stadium",
        "id": "5e280203-3572-3b25-0f61-3a056a57b866"
    },
    {
        "name": "Sòng bài",
        "source": "auto",
        "status": "Approval",
        "placeType": "casino",
        "id": "e82e6640-f2f3-fc34-64c0-3a056a57b88c"
    },
    {
        "name": "Sở thú",
        "source": "auto",
        "status": "Approval",
        "placeType": "zoo",
        "id": "91bb2feb-3495-1fb1-a6d7-3a056a57b880"
    },
    {
        "name": "Sức khỏe, y tế",
        "source": "auto",
        "status": "Approval",
        "placeType": "health",
        "id": "7a388708-9963-0ec5-ea4b-3a056a57b76d"
    },
    {
        "name": "Thuộc về thiên nhiên",
        "source": "auto",
        "status": "Approval",
        "placeType": "natural_feature",
        "id": "e7e2952f-689c-5bd5-28cc-3a056a57b98e"
    },
    {
        "name": "Thư viện",
        "source": "auto",
        "status": "Approval",
        "placeType": "library",
        "id": "31e35cfb-971a-8073-7c9b-3a056a57b87c"
    },
    {
        "name": "Thẩm mỹ viện, làm đẹp",
        "source": "auto",
        "status": "Approval",
        "placeType": "beauty_salon",
        "id": "39ea6059-5f3c-03fe-f835-3a056a57b8c2"
    },
    {
        "name": "Tiệm bánh",
        "source": "auto",
        "status": "Approval",
        "placeType": "bakery",
        "id": "ea4ab32d-e66c-64c5-3d98-3a056a57b7f1"
    },
    {
        "name": "Trung tâm mua sắm",
        "source": "auto",
        "status": "Approval",
        "placeType": "shopping_mall",
        "id": "5c9de669-679a-7e65-55ba-3a056a57b923"
    },
    {
        "name": "Trung tâm ngoại ngữ",
        "source": "auto",
        "status": "Approval",
        "placeType": "language_center",
        "id": "c1d34e35-04b0-e1d3-e4b5-3a056a57b7cf"
    },
    {
        "name": "Trung tâm thể dục thể thao, nhà thi đấu",
        "source": "auto",
        "status": "Approval",
        "placeType": "sports_center",
        "id": "5bc359d8-05b0-3787-740d-3a056a57b862"
    },
    {
        "name": "Trung tâm đào tạo",
        "source": "auto",
        "status": "Approval",
        "placeType": "training_center",
        "id": "7a007372-4f6a-1cda-ba41-3a056a57b7cb"
    },
    {
        "name": "Trung tâm đào tạo lái xe",
        "source": "auto",
        "status": "Approval",
        "placeType": "driving_school",
        "id": "5f8b5d6c-981e-3ba1-3e39-3a056a57b7c7"
    },
    {
        "name": "Trà sữa",
        "source": "auto",
        "status": "Approval",
        "placeType": "milk_tea",
        "id": "bdf9d75a-9e45-b27c-f905-3a056a57b7ed"
    },
    {
        "name": "Trường cao đẳng, trung cấp, trường nghề",
        "source": "auto",
        "status": "Approval",
        "placeType": "college",
        "id": "49bc34ff-cbbe-9576-0969-3a056a57b7c4"
    },
    {
        "name": "Trường mầm non, mẫu giáo",
        "source": "auto",
        "status": "Approval",
        "placeType": "preschool",
        "id": "bbeb9a32-e935-9e90-5cc7-3a056a57b7af"
    },
    {
        "name": "Trường tiểu học",
        "source": "auto",
        "status": "Approval",
        "placeType": "primary_school",
        "id": "c7ac34aa-82b4-99d3-1dae-3a056a57b7b3"
    },
    {
        "name": "Trường trung học cơ sở (THCS)",
        "source": "auto",
        "status": "Approval",
        "placeType": "secondary_school",
        "id": "74942310-4433-934b-a062-3a056a57b7b6"
    },
    {
        "name": "Trường trung học phổ thông (THPT)",
        "source": "auto",
        "status": "Approval",
        "placeType": "high_school",
        "id": "11993b3c-6595-a61f-b601-3a056a57b7bc"
    },
    {
        "name": "Trường đại học",
        "source": "auto",
        "status": "Approval",
        "placeType": "university",
        "id": "c008e8b2-44b6-6545-4f25-3a056a57b7c0"
    },
    {
        "name": "Trạm cứu hỏa",
        "source": "auto",
        "status": "Approval",
        "placeType": "fire_station",
        "id": "430f6d99-5f05-7f21-2410-3a056a57b8b3"
    },
    {
        "name": "Trạm năng lương (thủy/nhiệt/gió/..)",
        "source": "auto",
        "status": "Approval",
        "placeType": "power_station",
        "id": "aa91c3bf-9175-c5d0-0a3c-3a056a57b9a2"
    },
    {
        "name": "Trạm sạc xe điện",
        "source": "auto",
        "status": "Approval",
        "placeType": "charging_station",
        "id": "44abf4e1-e772-f62e-8d7d-3a056a57b79d"
    },
    {
        "name": "Trạm thu phí",
        "source": "auto",
        "status": "Approval",
        "placeType": "toll_booth",
        "id": "ee9efbfa-422b-41a3-52ba-3a056a57b997"
    },
    {
        "name": "Trạm trung chuyển",
        "source": "auto",
        "status": "Approval",
        "placeType": "transit_station",
        "id": "0b1b0c69-dc32-2ee7-f777-3a056a57b7a8"
    },
    {
        "name": "Trạm xe bus",
        "source": "auto",
        "status": "Approval",
        "placeType": "bus_stop",
        "id": "ab97a0d3-555a-185f-8262-3a056a57b796"
    },
    {
        "name": "Trạm xăng",
        "source": "auto",
        "status": "Approval",
        "placeType": "gas_station",
        "id": "7288a05a-0491-1338-aa58-3a056a57b7a1"
    },
    {
        "name": "Tài chính",
        "source": "auto",
        "status": "Approval",
        "placeType": "finance",
        "id": "9341dd1c-b3c2-44c9-f09e-3a056a57b755"
    },
    {
        "name": "Tòa án",
        "source": "auto",
        "status": "Approval",
        "placeType": "courthouse",
        "id": "7219a731-70f1-bc93-2f78-3a056a57b89e"
    },
    {
        "name": "Tôn giáo, tín ngưỡng",
        "source": "auto",
        "status": "Approval",
        "placeType": "religion",
        "id": "4f60ba23-1aae-adfd-a4aa-3a056a57b812"
    },
    {
        "name": "UBND, Trung tâm hành chính",
        "source": "auto",
        "status": "Approval",
        "placeType": "committee",
        "id": "2bad385e-20b9-ceb1-764d-3a056a57b8a5"
    },
    {
        "name": "Văn phòng cho thuê",
        "source": "auto",
        "status": "Approval",
        "placeType": "coworking_space",
        "id": "c9bcade7-d8cc-82da-8054-3a056a57b845"
    },
    {
        "name": "Vật lý trị liệu",
        "source": "auto",
        "status": "Approval",
        "placeType": "physiotherapist",
        "id": "54b344fd-35f3-a776-b7c9-3a056a57b77c"
    },
    {
        "name": "Xe co 2",
        "source": "auto",
        "status": "Pending",
        "placeType": "f3624c5b-ca15-09c7-7009-3a056a57b60c",
        "id": "05130ec7-7403-8c06-60f0-3a05726a396b"
    },
    {
        "name": "Xe co 3",
        "source": "auto",
        "status": "Pending",
        "placeType": "f3624c5b-ca15-09c7-7009-3a056a57b60c",
        "id": "c4cf359a-0573-bd02-2474-3a05726a8213"
    },
    {
        "name": "Xe co 4",
        "source": "auto",
        "status": "Pending",
        "placeType": "f3624c5b-ca15-09c7-7009-3a056a57b60c",
        "id": "3133afb0-a9da-0eeb-38e6-3a057276ebbd"
    },
    {
        "name": "Xe co 6",
        "source": "auto",
        "status": "Pending",
        "placeType": "f3624c5b-ca15-09c7-7009-3a056a57b60c",
        "id": "c69befc7-9c80-ee6a-5efd-3a05726c7345"
    },
    {
        "name": "Xe co1",
        "source": "auto",
        "status": "Pending",
        "placeType": "f3624c5b-ca15-09c7-7009-3a056a57b60c",
        "id": "936def69-f534-7dcc-4904-3a057208381e"
    },
    {
        "name": "Xe cộ",
        "source": "auto",
        "status": "Approval",
        "placeType": "car",
        "id": "6796ba3d-7726-cd9e-3d55-3a056a57b72c"
    },
    {
        "name": "quan banh beo a1",
        "source": "string",
        "status": "Pending",
        "placeType": "eatery",
        "id": "8eca6993-8d66-0b74-38e4-3a0572246de0"
    },
    {
        "name": "quan banh beo a2",
        "source": "string",
        "status": "Pending",
        "placeType": "eatery",
        "id": "abc24bf4-ea93-348b-8574-3a057225746d"
    },
    {
        "name": "quan banh beo p1",
        "source": "string",
        "status": "Pending",
        "placeType": "eatery",
        "id": "23678849-12a1-ecda-cb63-3a057226b981"
    },
    {
        "name": "string",
        "source": "string",
        "status": "Pending",
        "placeType": "eatry",
        "id": "5001aec5-e1af-463b-176b-3a056ecffbce"
    },
    {
        "name": "string1",
        "source": "string",
        "status": "Approval",
        "placeType": "eatry",
        "id": "4b7ddd47-75e9-e88d-70d9-3a056ed40ff9"
    },
    {
        "name": "Điểm du lịch",
        "source": "auto",
        "status": "Approval",
        "placeType": "tourist_attraction",
        "id": "d62a472c-520c-ff1d-a26a-3a056a57b849"
    },
    {
        "name": "Đại lý du lịch/vé máy bay",
        "source": "auto",
        "status": "Approval",
        "placeType": "travel_agent",
        "id": "296a2b24-91fd-b7b6-1d06-3a056a57b95f"
    },
    {
        "name": "Đại lý xe máy",
        "source": "auto",
        "status": "Approval",
        "placeType": "motorcycle_dealer",
        "id": "8687008e-a385-ad39-2766-3a056a57b735"
    },
    {
        "name": "Đại lý xe oto",
        "source": "auto",
        "status": "Approval",
        "placeType": "car_dealer",
        "id": "2b5d0baa-5d04-cfb9-0f63-3a056a57b732"
    },
    {
        "name": "Đại lý xe đạp",
        "source": "auto",
        "status": "Approval",
        "placeType": "bicycle_store",
        "id": "369ca192-1cac-8d87-39ce-3a056a57b739"
    },
    {
        "name": "Đại sứ quán/Lãnh sứ quán/Ngoại giao",
        "source": "auto",
        "status": "Approval",
        "placeType": "political",
        "id": "ca594e28-ecf7-1a0c-e0cf-3a056a57b8a9"
    },
    {
        "name": "Đền thờ, miếu",
        "source": "auto",
        "status": "Approval",
        "placeType": "temple",
        "id": "1d2cfae8-bbcc-811e-6676-3a056a57b81a"
    },
    {
        "name": "Địa điểm nói chung",
        "source": "auto",
        "status": "Approval",
        "placeType": "point",
        "id": "48b37cdb-06ab-a71f-83ba-3a056a57b9aa"
    },
    {
        "name": "Đồ ăn mang đi",
        "source": "auto",
        "status": "Approval",
        "placeType": "take_away",
        "id": "8b482065-bf71-a727-be20-3a056a57b80b"
    },
    {
        "name": "Đồ ăn nhanh",
        "source": "auto",
        "status": "Approval",
        "placeType": "fast_food",
        "id": "3ebee385-fd84-11f1-869e-3a056a57b7f9"
    },
    {
        "name": "Đồn/Cục cảnh sát",
        "source": "auto",
        "status": "Approval",
        "placeType": "police",
        "id": "1de4ef11-e231-a848-da28-3a056a57b8a1"
    }
];

const placeTypes = [
    {
        id: "",
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
        let items = placeNamesUserSubmited;
        if (req.url.searchParams.has('filter')) {
            items = items.filter(t => t.name.toLowerCase().indexOf(req.url.searchParams.get('filter').toLowerCase()) >= 0);
        }
        // pagination
        let totalCount = items.length;
        let start = parseInt(req.url.searchParams.get('skipCount')) || 0;
        let pageSize = parseInt(req.url.searchParams.get('maxResultCount') || 5);
        let end = start + pageSize;
        end = end < items.length ? end : items.length;
        items = items.slice(start, end);

        await new Promise(resolve => setTimeout(resolve, Math.random() * 500));

        return res(ctx.status(200), ctx.json({ items, totalCount }));
    }),

    // get place name by status
    rest.get(URLS.placeByStatus,  async (req, res, ctx) => {
        let statusType = req.url.searchParams.get('statusType') || '0';
        let items = placeNamesUserSubmited;
        
        items = items.filter(t => t.status === statusTypeCode[statusType])
        // items = items.filter(t => t.status === 'Pending')

        if (req.url.searchParams.has('filter')) {
            items = items.filter(t => t.name.toLowerCase().indexOf(req.url.searchParams.get('filter').toLowerCase()) >= 0);
        }
        // pagination
        let totalCount = items.length;
        let start = parseInt(req.url.searchParams.get('skipCount')) || 0;
        let pageSize = parseInt(req.url.searchParams.get('maxResultCount') || 5);
        let end = start + pageSize;
        end = end < items.length ? end : items.length;
        items = items.slice(start, end);

        await new Promise(resolve => setTimeout(resolve, Math.random() * 500));

        return res(ctx.status(200), ctx.json({ items, totalCount }));
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
    }),

    rest.put(URLS.place + '/:id', async (req, res, ctx) => {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 500));
        const { id } = req.params;
        const statusType = req.url.searchParams.get('statusType');

        const place = placeNamesUserSubmited.find(item => item.id === id);
        place.status = statusTypeCode[String(statusType)];

        return res(ctx.status(200), ctx.json({ ...place, status: statusType }));
    })
]