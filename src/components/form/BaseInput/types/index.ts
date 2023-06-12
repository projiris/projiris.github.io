export type InputTypes = 'text' | 'textarea' | 'email'

export type BaseInputProps = {
    className: string;
    style?: object;
    name: string;
    type?: InputTypes;
    placeholder: string;
    property?: string;
    min?: number;
    step?: number;
    value: string;
    required?: boolean;
    onInput: () => {};
}