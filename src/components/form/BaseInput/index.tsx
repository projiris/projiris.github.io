import capitalize from '@/utils/capitalize'
import {FunctionComponent} from "react";
import {BaseInputProps} from "@/components/form/BaseInput/types";
import styles from '@/styles/input.module.css'

export const BaseInput: FunctionComponent<BaseInputProps> = ({
    className = '',
    style = {},
    name = '',
    type = 'text',
    placeholder = '',
    property = '',
    min = 0,
    step = 1,
    value,
    required = false,
    onInput,
}) => {
    return <input
        value={value}
        onInput={onInput}
        style={style}
        className={styles.base}
        name={name}
        type={type}
        placeholder={placeholder ? placeholder : capitalize(name)}
        data-property={property ? property : name}
        min={min}
        step={step}
        required={Boolean(required)}
    />
}
