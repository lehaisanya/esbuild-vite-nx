import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      FIELD_IS_EMPTY: 'Field must not be empty',
      FIELD_IS_OUT_OF_RANGE: 'Field must be from {{from}} to {{to}}',
      FIELD_IS_TOO_LONG: 'Field must be shorter than {{maxLength}}',
      NAME_FIELD: 'Name',
      AGE_FIELD: 'Age',
      GENDER_FIELD: 'Gender',
      COMPANY_FIELD: 'Company',
      IS_ACTIVE_FIELD: 'Is Active',
      SEARCH_FIELD: 'Search',
      AGE_FROM_FIELD: 'Age from',
      AGE_TO_FIELD: 'Age to',
      COLUMNS_FIELD: 'Columns',
      RESET_FILTERS: 'Reset filters',
      APPLY_FILTERS: 'Apply filters',
      CREATE_USER: 'Create User',
      RESET: 'Reset',
      CREATE: 'Create',
      ADD_USER: 'Add User',
      MALE: 'Male',
      FEMALE: 'Female',
      ACTIVE: 'Active',
      INACTIVE: 'Inactive',
      UPDATE: 'Update',
      EDIT_USER: 'Edit User',
      USER_HAS_BEEN_DELETED: 'This user has been deleted',
    },
  },
  uk: {
    translation: {
      FIELD_IS_EMPTY: 'Поле не повинно бути пустим',
      FIELD_IS_OUT_OF_RANGE: 'Поле повинно бути від {{from}} і до {{to}}',
      FIELD_IS_TOO_LONG: 'Поле не повинно бути довше ніж {{maxLength}}',
      NAME_FIELD: "Ім'я",
      AGE_FIELD: 'Вік',
      GENDER_FIELD: 'Стать',
      COMPANY_FIELD: 'Компанія',
      IS_ACTIVE_FIELD: 'Активний',
      SEARCH_FIELD: 'Пошук',
      AGE_FROM_FIELD: 'Вік від',
      AGE_TO_FIELD: 'Вік до',
      COLUMNS_FIELD: 'Колонки',
      RESET_FILTERS: 'Очистити фільтри',
      APPLY_FILTERS: 'Примінити фільтри',
      CREATE_USER: 'Створити користувача',
      RESET: 'Очистити',
      CREATE: 'Створити',
      ADD_USER: 'Додати Користувача',
      MALE: 'Чоловік',
      FEMALE: 'Жінка',
      ACTIVE: 'Активний',
      INACTIVE: 'Неактивний',
      UPDATE: 'Оновити',
      EDIT_USER: 'Оновити Користувача',
      USER_HAS_BEEN_DELETED: 'Цей користувач був видалений',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
