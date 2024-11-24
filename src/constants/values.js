
const UNIT_VALUES = ['Pcs', 'Mt', 'Mt2', 'Mt3', 'Kg', 'Ton', 'Lt',]; 

const CURRENCIES = ['Rub', 'USD', 'AZN', 'TL', 'EURO'];

const USER_MESSAGES = {
    AUTHORIZATION_ERROR: 'Islem yapilmasi icin gerekli yetkiniz yok',
    SUCCESS_MESSAGE: 'Islem tamamlandi',
    ATLEAST_ONE_ROW_OPTION: 'Islem icin en az bir satir secilmeli',
    TWO_OR_MORE_ROW_OPTION: 'Islem icin iki veya daha fazla satir secilemez',
    NO_DATA_FOUND: 'Boyle bir veri bulunamadi',
    ENTERING_ZERO_VALUE_ERROR: 'Girilen deger 0 ve ya negatif deger olamaz',
    NON_VALID_NUMBER: 'Girilen deyer dogru diyil',
}

export {
    UNIT_VALUES,
    CURRENCIES,
    USER_MESSAGES
};