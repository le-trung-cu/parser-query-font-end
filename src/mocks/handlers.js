import { rest } from 'msw';
import { URLS } from '../api/api';

const placeNamesUserSubmited = [
    { name: 'Xe cộ', placeType: 'car' },
    { name: 'Đại lý xe oto', placeType: 'car_dealer' },
    { name: 'Đại lý xe máy', placeType: 'motorcycle_dealer' },
    { name: 'Đại lý xe đạp', placeType: 'bicycle_store' },
    { name: 'Quán ăn', placeType: 'eatry' },
    { name: 'Quán bánh bèo', placeType: 'eatry' },
    { name: 'Quán bánh xèo', placeType: 'eatry' },
];

const placeTypes = [
    {
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
    },
    {
        "type": "\tmotorcycle_rental\t",
        "typeName": "Cho thuê xe xe máy, xe đạp"
    },
    {
        "type": "\tfinance\t",
        "typeName": "Tài chính"
    },
    {
        "type": "\tatm\t",
        "typeName": "ATM"
    },
    {
        "type": "\tbank\t",
        "typeName": "Ngân hàng"
    },
    {
        "type": "\ttreasury\t",
        "typeName": "Kho bạc"
    },
    {
        "type": "\taccounting\t",
        "typeName": "Kế toán"
    },
    {
        "type": "\tpawn_shop\t",
        "typeName": "Dịch vụ cầm đồ"
    },
    {
        "type": "\thealth\t",
        "typeName": "Sức khỏe, y tế"
    },
    {
        "type": "\tpharmacy\t",
        "typeName": "Nhà thuốc, quầy thuốc"
    },
    {
        "type": "\thospital\t",
        "typeName": "Bệnh viện, trạm y tế"
    },
    {
        "type": "\tdoctor\t",
        "typeName": "Phòng khám"
    },
    {
        "type": "\tphysiotherapist\t",
        "typeName": "Vật lý trị liệu"
    },
    {
        "type": "\tdentist\t",
        "typeName": "Nha khoa"
    },
    {
        "type": "\tpublic_transport\t",
        "typeName": "Giao thông công cộng"
    },
    {
        "type": "\tbus_station\t",
        "typeName": "Bến xe"
    },
    {
        "type": "\tairport\t",
        "typeName": "Sân bay"
    },
    {
        "type": "\tferry\t",
        "typeName": "Bến đò, phà"
    },
    {
        "type": "\ttrain_station\t",
        "typeName": "Ga tàu lửa"
    },
    {
        "type": "\tbus_stop\t",
        "typeName": "Trạm xe bus"
    },
    {
        "type": "\tsubway_station\t",
        "typeName": "Ga tàu điện ngầm"
    },
    {
        "type": "\tcharging_station\t",
        "typeName": "Trạm sạc xe điện"
    },
    {
        "type": "\tgas_station\t",
        "typeName": "Trạm xăng"
    },
    {
        "type": "\tparking\t",
        "typeName": "Bãi giữ xe"
    },
    {
        "type": "\ttransit_station\t",
        "typeName": "Trạm trung chuyển"
    },
    {
        "type": "\teducation\t",
        "typeName": "Giáo dục và đào tạo"
    },
    {
        "type": "\tpreschool\t",
        "typeName": "Trường mầm non, mẫu giáo"
    },
    {
        "type": "\tprimary_school\t",
        "typeName": "Trường tiểu học"
    },
    {
        "type": "\tsecondary_school\t",
        "typeName": "Trường trung học cơ sở (THCS)"
    },
    {
        "type": "\thigh_school\t",
        "typeName": "Trường trung học phổ thông (THPT)"
    },
    {
        "type": "\tuniversity\t",
        "typeName": "Trường đại học"
    },
    {
        "type": "\tcollege\t",
        "typeName": "Trường cao đẳng, trung cấp, trường nghề"
    },
    {
        "type": "\tdriving_school\t",
        "typeName": "Trung tâm đào tạo lái xe"
    },
    {
        "type": "\ttraining_center\t",
        "typeName": "Trung tâm đào tạo"
    },
    {
        "type": "\tlanguage_center\t",
        "typeName": "Trung tâm ngoại ngữ"
    },
    {
        "type": "\tlodging\t",
        "typeName": "Dịch vụ lưu trú (hostel, home stay)"
    },
    {
        "type": "\thotel\t",
        "typeName": "Khách sạn"
    },
    {
        "type": "\tapartment\t",
        "typeName": "Chung cư, căn hộ"
    },
    {
        "type": "\tresort\t",
        "typeName": "Resort, villa"
    },
    {
        "type": "\tguest_house\t",
        "typeName": "Nhà nghỉ"
    },
    {
        "type": "\tfood_service\t",
        "typeName": "Dịch vụ ăn uống"
    },
    {
        "type": "\tcafe\t",
        "typeName": "Cà phê"
    },
    {
        "type": "\tmilk_tea\t",
        "typeName": "Trà sữa"
    },
    {
        "type": "\tbakery\t",
        "typeName": "Tiệm bánh"
    },
    {
        "type": "\teatery\t",
        "typeName": "Quán ăn"
    },
    {
        "type": "\tfast_food\t",
        "typeName": "Đồ ăn nhanh"
    },
    {
        "type": "\tbeer_bar\t",
        "typeName": "Quán nhậu"
    },
    {
        "type": "\tsweet_soup\t",
        "typeName": "Quán chè"
    },
    {
        "type": "\tdrink\t",
        "typeName": "Giải khát, quán nước, sinh tố"
    },
    {
        "type": "\tice_cream_shop\t",
        "typeName": "Quán kem"
    },
    {
        "type": "\ttake_away\t",
        "typeName": "Đồ ăn mang đi"
    },
    {
        "type": "\trestaurant\t",
        "typeName": "Nhà hàng"
    },
    {
        "type": "\treligion\t",
        "typeName": "Tôn giáo, tín ngưỡng"
    },
    {
        "type": "\tpagoda\t",
        "typeName": "Chùa"
    },
    {
        "type": "\ttemple\t",
        "typeName": "Đền thờ, miếu"
    },
    {
        "type": "\tworship\t",
        "typeName": "Nơi thờ cúng, trang nghiêm"
    },
    {
        "type": "\tchurch\t",
        "typeName": "Nhà thờ thiên chúa/tin lành"
    },
    {
        "type": "\testablishment\t",
        "typeName": "Công ty, tổ chức, hiệp hội"
    },
    {
        "type": "\tstorage\t",
        "typeName": "Nhà kho/ kho hàng hóa"
    },
    {
        "type": "\tconstruction_company\t",
        "typeName": "Công ty xây dựng"
    },
    {
        "type": "\tinsurance_agency\t",
        "typeName": "Kinh doanh bảo hiểm"
    },
    {
        "type": "\treal_estate_agency\t",
        "typeName": "Kinh doanh bất động sản"
    },
    {
        "type": "\tindustrial_zone\t",
        "typeName": "Khu công nghiệp"
    },
    {
        "type": "\ttravel_agency\t",
        "typeName": "Công ty du lịch & lữ hành"
    },
    {
        "type": "\tcoworking_space\t",
        "typeName": "Văn phòng cho thuê"
    },
    {
        "type": "\ttourist_attraction\t",
        "typeName": "Điểm du lịch"
    },
    {
        "type": "\tcampground\t",
        "typeName": "Khu vực cắm trại"
    },
    {
        "type": "\tmuseum\t",
        "typeName": "Bảo tàng"
    },
    {
        "type": "\tpublic_beach\t",
        "typeName": "Bãi biển"
    },
    {
        "type": "\tart_gallery\t",
        "typeName": "Khu triển lãm"
    },
    {
        "type": "\tsports\t",
        "typeName": "Liên quan đến thể dục thể thao"
    },
    {
        "type": "\tgym\t",
        "typeName": "Phòng tập thể dục, thể hình"
    },
    {
        "type": "\tsports_center\t",
        "typeName": "Trung tâm thể dục thể thao, nhà thi đấu"
    },
    {
        "type": "\tstadium\t",
        "typeName": "Sân vận động"
    },
    {
        "type": "\tpark\t",
        "typeName": "Công viên/khu vực đi bộ thư giãn"
    },
    {
        "type": "\tgolf\t",
        "typeName": "Sân golf"
    },
    {
        "type": "\tentertainment\t",
        "typeName": "Liên quan đến vui chơi, giải trí"
    },
    {
        "type": "\tamusement_park\t",
        "typeName": "Khu vui chơi"
    },
    {
        "type": "\tcinema\t",
        "typeName": "Rạp chiếu phim"
    },
    {
        "type": "\tlibrary\t",
        "typeName": "Thư viện"
    },
    {
        "type": "\tzoo\t",
        "typeName": "Sở thú"
    },
    {
        "type": "\ttheater\t",
        "typeName": "Nhà hát"
    },
    {
        "type": "\tspa\t",
        "typeName": "Dịch vụ Spa/massage"
    },
    {
        "type": "\tcasino\t",
        "typeName": "Sòng bài"
    },
    {
        "type": "\tbar\t",
        "typeName": "Hộp đêm/Vũ trường/Quán bar"
    },
    {
        "type": "\tpub\t",
        "typeName": "Pub/Lougne"
    },
    {
        "type": "\tkaraoke\t",
        "typeName": "Quán karaoke"
    },
    {
        "type": "\tgovernment\t",
        "typeName": "Liên quan đến chính quyền, địa phương"
    },
    {
        "type": "\tcourthouse\t",
        "typeName": "Tòa án"
    },
    {
        "type": "\tpolice\t",
        "typeName": "Đồn/Cục cảnh sát"
    },
    {
        "type": "\tcommittee\t",
        "typeName": "UBND, Trung tâm hành chính"
    },
    {
        "type": "\tpolitical\t",
        "typeName": "Đại sứ quán/Lãnh sứ quán/Ngoại giao"
    },
    {
        "type": "\tcommunity_center\t",
        "typeName": "Nhà văn hoá, sinh hoạt cộng đồng"
    },
    {
        "type": "\ttown_square\t",
        "typeName": "Quảng trường"
    },
    {
        "type": "\tfire_station\t",
        "typeName": "Trạm cứu hỏa"
    },
    {
        "type": "\tbeauty\t",
        "typeName": "Liên quan đến làm đẹp"
    },
    {
        "type": "\tcosmetic_store\t",
        "typeName": "Cửa hàng mỹ phẩm"
    },
    {
        "type": "\thair_care\t",
        "typeName": "Hiệu làm tóc/nails"
    },
    {
        "type": "\tbeauty_salon\t",
        "typeName": "Thẩm mỹ viện, làm đẹp"
    },
    {
        "type": "\tfashion\t",
        "typeName": "Liên quan đến thời trang"
    },
    {
        "type": "\tmommy_store\t",
        "typeName": "Cửa hàng mẹ và bé"
    },
    {
        "type": "\ttailor\t",
        "typeName": "Dịch vụ may mặc"
    },
    {
        "type": "\tclothing_store\t",
        "typeName": "Cửa hàng áo quần"
    },
    {
        "type": "\tglasses_store\t",
        "typeName": "Cửa hàng mắt kính"
    },
    {
        "type": "\tshoe_store\t",
        "typeName": "Cửa hàng giày/dép"
    },
    {
        "type": "\telectronics_store\t",
        "typeName": "Cửa hàng đồ điện tử"
    },
    {
        "type": "\tcellphone_store\t",
        "typeName": "Cửa hàng điện thoại di động"
    },
    {
        "type": "\tcomputer_store\t",
        "typeName": "Cửa hàng máy tính"
    },
    {
        "type": "\tfood_store\t",
        "typeName": "Cửa hàng thực phẩm"
    },
    {
        "type": "convenience_store",
        "typeName": "Cửa hàng tiện lợi 24/7"
    },
    {
        "type": "\tlocal_market\t",
        "typeName": "Chợ"
    },
    {
        "type": "\tsupermarket\t",
        "typeName": "Siêu thị"
    },
    {
        "type": "\tgrocery_store\t",
        "typeName": "Cửa hàng tạp hóa"
    },
    {
        "type": "\tstore\t",
        "typeName": "Cửa hàng"
    },
    {
        "type": "\tfruit_shop\t",
        "typeName": "Cửa hàng trái cây, rau quả"
    },
    {
        "type": "\tflorist\t",
        "typeName": "Cửa hàng hoa/cây cảnh"
    },
    {
        "type": "\ttoy_store\t",
        "typeName": "Cửa hàng đồ chơi"
    },
    {
        "type": "\tfurniture_store\t",
        "typeName": "Cửa hàng nội thất"
    },
    {
        "type": "\tsports_store\t",
        "typeName": "Cửa hàng dụng cụ thể thao"
    },
    {
        "type": "\thome_goods_store\t",
        "typeName": "Cửa hàng đồ gia dụng"
    },
    {
        "type": "\tjewelry_store\t",
        "typeName": "Cửa hàng trang sức"
    },
    {
        "type": "\tbook_store\t",
        "typeName": "Nhà sách"
    },
    {
        "type": "\tshopping_mall\t",
        "typeName": "Trung tâm mua sắm"
    },
    {
        "type": "\tpet_store\t",
        "typeName": "Cửa hàng thú cưng"
    },
    {
        "type": "\tliquor_store\t",
        "typeName": "Cửa hàng bia/rượu"
    },
    {
        "type": "\tgift_shop\t",
        "typeName": "Cửa hàng lưu niệm/đặc sản/quà cáp"
    },
    {
        "type": "\tbuilding_materials_store\t",
        "typeName": "Cửa hàng vật liệu xây dựng, nội thất"
    },
    {
        "type": "\tmusical_instrument_store\t",
        "typeName": "Cửa hàng nhạc cụ"
    },
    {
        "type": "\telectrical_supply_store\t",
        "typeName": "Cửa hàng điện nước"
    },
    {
        "type": "\tfuel_store\t",
        "typeName": "Cửa hàng nhiên liệu (gas/than/dầu/..)"
    },
    {
        "type": "\tsecond_hand_store\t",
        "typeName": "Cửa hàng đồ cũ"
    },
    {
        "type": "\twedding_service\t",
        "typeName": "Dịch vụ liên quan đến cưới hỏi"
    },
    {
        "type": "\tpost_office\t",
        "typeName": "Dịch vụ chuyển phát, bưu điện"
    },
    {
        "type": "\tlaundry\t",
        "typeName": "Dịch vụ giặt ủi"
    },
    {
        "type": "\tmoving_service\t",
        "typeName": "Dịch vụ vận chuyển"
    },
    {
        "type": "\tphotography\t",
        "typeName": "Dịch vụ chụp ảnh"
    },
    {
        "type": "\ttel_service\t",
        "typeName": "Dịch vụ mạng viễn thông"
    },
    {
        "type": "\ttravel_agent\t",
        "typeName": "Đại lý du lịch/vé máy bay"
    },
    {
        "type": "\tlegal_service\t",
        "typeName": "Dịch vụ pháp lý/công chứng"
    },
    {
        "type": "\tlawyer\t",
        "typeName": "Luật sư"
    },
    {
        "type": "\tphotocopy\t",
        "typeName": "Dịch vụ in ấn, photocopy"
    },
    {
        "type": "\tveterinary_care\t",
        "typeName": "Dịch vụ thú y"
    },
    {
        "type": "\tfuneral_service\t",
        "typeName": "Dịch vụ mai táng"
    },
    {
        "type": "\temployment_agency\t",
        "typeName": "Dịch vụ môi giới việc làm"
    },
    {
        "type": "\tsanitation_service\t",
        "typeName": "Dịch vụ vệ sinh"
    },
    {
        "type": "\tevent_agency\t",
        "typeName": "Dịch vụ tổ chức sự kiện"
    },
    {
        "type": "\tlocksmith\t",
        "typeName": "Dịch vụ sửa khóa"
    },
    {
        "type": "\tprison\t",
        "typeName": "Nhà tù"
    },
    {
        "type": "\tpublic_restroom\t",
        "typeName": "Nhà vệ sinh công cộng"
    },
    {
        "type": "\tcemetery\t",
        "typeName": "Nghĩa trang"
    },
    {
        "type": "\tnatural_feature\t",
        "typeName": "Thuộc về thiên nhiên"
    },
    {
        "type": "\tbridge\t",
        "typeName": "Cầu"
    },
    {
        "type": "\ttoll_booth\t",
        "typeName": "Trạm thu phí"
    },
    {
        "type": "\tharbour\t",
        "typeName": "Cảng biển"
    },
    {
        "type": "\tlottery\t",
        "typeName": "Liên quan đến xổ số"
    },
    {
        "type": "\tpower_station\t",
        "typeName": "Trạm năng lương (thủy/nhiệt/gió/..)"
    },
    {
        "type": "\tfarming\t",
        "typeName": "Liên quan đến nông nghiệp"
    },
    {
        "type": "\tpoint\t",
        "typeName": "Địa điểm nói chung"
    }
];

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
            error: true,
            message: 'You have entered an incorrect username or password'
        }))
    }),

    rest.get('/user', null),

    rest.get(URLS.placeTypes, async (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            totalCount: 165,
            items: placeTypes,
        }));
    }),

    rest.get('/suggestions', async (req, res, ctx) => {
        const placeNames = placeNamesUserSubmited
            .filter(t => t.name.toLowerCase().indexOf(req.url.searchParams.get('q').toLowerCase()) >= 0);
        const exist = placeNamesUserSubmited
            .findIndex(t => t.name.toLowerCase() === req.url.searchParams.get('q').toLowerCase()) >= 0;

        await new Promise(resolve => setTimeout(resolve, Math.random() * 1500));

        return res(ctx.status(200), ctx.json({ placeNames, exist }));
    }),

    rest.post('/place-name', async (req, res, ctx) => {
        const { placeType, name } = await req.json();
        const exist = placeNamesUserSubmited.findIndex(t => t.name.toLowerCase() === name.toLowerCase()) >= 0;
        if (exist) {
            return res(ctx.status(400), ctx.json({
                error: true,
                message: `${name} has exist in the database.`
            }));
        }
        placeNamesUserSubmited.push({ name: name, placeType });

        return res(ctx.status(201));
    })
]