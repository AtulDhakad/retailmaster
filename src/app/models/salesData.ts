export class Month {
    no: number;
    title: String;
}

export const stores: Array<object> = [
    { store_id: '1', code: 'en', website_id: '1', group_id: '1', name: 'Online' },
    { store_id: '5', code: 'retail_en', website_id: '3', group_id: '3', name: 'Retail' },
    { store_id: '6', code: 'reseller_en', website_id: '2', group_id: '4', name: 'Reseller' },
    { store_id: '7', code: 'pos_en', website_id: '4', group_id: '5', name: 'POS' },
    { store_id: '9', code: 'dropship_en', website_id: '7', group_id: '7', name: 'Dropship' },
    { store_id: '11', code: 'facebook_en', website_id: '8', group_id: '9', name: 'Facebook' },
    { store_id: '12', code: 'divanah_en', website_id: '9', group_id: '10', name: 'Divanah' }
]

export const years: number[] = [
    2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026
];

export const months: Month[] = [
    { no: 1, title: 'Jan' },
    { no: 2, title: 'Feb' },
    { no: 3, title: 'Mar' },
    { no: 4, title: 'Apr' },
    { no: 5, title: 'May' },
    { no: 6, title: 'Jun' },
    { no: 7, title: 'Jul' },
    { no: 8, title: 'Aug' },
    { no: 9, title: 'Sep' },
    { no: 10, title: 'Oct' },
    { no: 11, title: 'Nov' },
    { no: 12, title: 'Dec' }
];

export const groups: number[] = [
    30000, 13000, 3500, 1500
  ];