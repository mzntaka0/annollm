export const requiredErr = (): string => "必須入力項目です";

// string
export const stringMinErr = (num: number): string =>
  `${num}文字以上で記入してください`;
export const stringMaxErr = (num: number): string =>
  `${num}文字以下で記入してください`;
export const stringLenErr = (num: number): string =>
  `${num}文字で記入してください`;
export const exactWordErr = (word: string): string =>
  `"${word}"を記入してください`;
export const requiredUpperCase = (): string => "大文字を使用する必要があります";
export const requiredLowerCase = (): string => "小文字を使用する必要があります";
export const requiredNumber = (): string => "数字を使用する必要があります";
export const emailErr = (): string =>
  "正しいメールアドレスの形式で記入してください";
export const requiredSpecialCharacter = (): string =>
  `特殊文字を使用する必要があります.
特殊文字: ^ $ * . [ ] { } ( ) ? " ! @ # % & /  , > < ' : ; | _ - ~ \``; // NOTE: ref: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-policies.html
export const passwordNotMatchedError = (): string => "パスワードが一致しません";

export const urlInvalidErr = (): string => "正しいURLの形式で入力してください";

// number
export const numberMinErr = (num: number): string =>
  `${num}以上で記入してください`;
export const numberMaxErr = (num: number): string =>
  `${num}以下で記入してください`;

// array
export const arrayMinErr = (num: number): string =>
  `${num}つ以上選択してください`;
export const arrayMaxErr = (num: number): string =>
  `${num}以下で選択してください`;

export const postalCodeInvalidErr = (): string =>
  "正しい郵便番号の形式XXX(-)XXXXで入力してください";
