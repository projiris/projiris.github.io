'use client'
import styles from './contactForm.module.css'
import React, {FunctionComponent, useCallback, useMemo, useState, MouseEvent, KeyboardEvent} from "react";

import debounce from "@/utils/debounce";
import {Mail} from "@/lib/mail";
import {BaseInput} from "@/components/form/BaseInput";
import buttonStyles from "@/styles/buttons.module.css";
import {Spinner} from "@/components/common/Spinner";
import {SubmitParams} from "@/components/form/Contact/types";

const validateEmailRegex =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
const requiredTexts = ['name', 'message']

enum FormProperties {
    name = "name",
    email = "email",
    company = "company",
    phone = "phone",
    message = "message",
}

interface FormTexts {
    name: string;
    email: string;
    company: string;
    phone: string;
    message: string;
}

type SetTextMap = {
    [K in FormProperties]: (value: string) => void;
};

export const ContactForm: FunctionComponent = () => {

    const [isSent, setIsSent] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [sentError, setSentError] = useState('')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')

    const setText: SetTextMap = {
        name: setName,
        company: setCompany,
        phone: setPhone,
        message: setMessage,
        email: setEmail,
    }
    const texts: FormTexts = { name, email, company, phone, message }

    const [errorProperty, setErrorProperty] = useState('')
    const [formError, setFormError] = useState('')

    const validateText = useCallback(
        (property: FormProperties, value: string, isRequired: boolean): boolean => {
            if (isRequired && value.length < 4) {
                setFormError('4 characters minimum.')
                setErrorProperty(property)
                return false
            } else if (errorProperty === property) {
                setFormError('')
                setErrorProperty('')
            }
            return true
        },
        [errorProperty]
    )

    const updateText = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            event.preventDefault()
            event.stopPropagation()

            const property = (event?.target as HTMLInputElement)?.dataset?.property as FormProperties
            const text = (event.target as HTMLInputElement).value
            setText?.[property](text)
            const required = Boolean((event.target as HTMLInputElement).required)
            validateText(property, text, required)
        },
        [validateText]
    )

    const debouncedUpdateText = useMemo(
        () => debounce(updateText, 500),
        [updateText]
    )

    const validateEmail = useCallback(
        (email: string): boolean => {
            if (email.length < 4) {
                setFormError('4 characters minimum.')
                setErrorProperty('email')
                return false
            } else if (!validateEmailRegex.test(email)) {
                setFormError('Enter valid email')
                setErrorProperty('email')
                return false
            } else if (errorProperty === 'email') {
                setFormError('')
                setErrorProperty('')
            }
            return true
        },
        [errorProperty]
    )

    const updateEmail = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            event.preventDefault()
            event.stopPropagation()
            const email = (event.target as HTMLInputElement).value
            setEmail(email)
            validateEmail(email)
        },
        [validateEmail]
    )

    const debouncedUpdateEmail = useMemo(
        () => debounce(updateEmail, 500),
        [updateEmail]
    )

    const sendMessage = async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault()
        event.stopPropagation()
        const emailIsValid = validateEmail(email)
        if (!emailIsValid) {
            return
        }
        const textsProperties = Object.keys(texts)

        for (let idx = 0; idx < textsProperties.length; idx++) {
            const property = textsProperties?.[idx] as FormProperties
            const isRequired = requiredTexts.includes(property)
            const textIsValid = validateText(
                property,
                texts?.[property],
                isRequired
            )
            if (!textIsValid) {
                return
            }
        }
        if (isSending) {
            return false
        }
        setIsSending(true)
        setTimeout(() => {
            setIsSending(false)
            setSentError('timeout error, no response from server')
        }, 10000)
        const [sendError, sent] = await Mail.send({
            name,
            email,
            company,
            phone,
            message,
        })
        setIsSending(false)
        if (sendError) {
            setSentError(String(sendError))
        } else {
            setIsSent(true)
        }
    }

    return (
        <form className={styles.form} >
            <div>
                <label htmlFor="name" className="required"> Your name </label>
                {errorProperty === 'name' &&
                    <span className="error"> {formError} </span> }
                <BaseInput
                    value={name}
                    name="name"
                    placeholder="Jack Smith"
                    onInput={debouncedUpdateText}
                    className={"input-base " + errorProperty === 'name'
                        ? 'input-error'
                        : ''}
                    required
                />
            </div>
            <div>
                <label htmlFor="email" className="required"> Your email </label>
                {errorProperty === 'email' &&
                    <span className="error"> ${formError} </span> }
                <BaseInput
                    value={email}
                    name="email"
                    placeholder="example@mail.com"
                    type="email"
                    onInput={debouncedUpdateEmail}
                    className={"input-base " + errorProperty === 'email'
                        ? 'input-error'
                        : ''}
                    required
                />
            </div>
            <div>
                <label htmlFor="company"> Company </label>
                {errorProperty === 'company' &&
                    <span className="error"> {formError} </span> }
                <BaseInput
                    value={company}
                    name="company"
                    placeholder="Example Corporation"
                    onInput={debouncedUpdateText}
                    className={"input-base " + errorProperty === 'company'
                        ? 'input-error'
                        : ''}
                />
            </div>
            <div>
                <label htmlFor="phone"> Phone number </label>
                {errorProperty === 'phone' &&
                    <span className="error"> {formError} </span> }
                <BaseInput
                    value={phone}
                    name="phone"
                    placeholder="+44778765439"
                    onInput={debouncedUpdateText}
                    className={"input-base " + errorProperty === 'phone'
                        ? 'input-error'
                        : ''}
                />
            </div>
            <div>
                <label htmlFor="message" className="required"> Your message </label>
                {errorProperty === 'message' &&
                    <span className="error"> {formError} </span> }
                <BaseInput
                    value={message}
                    name="message"
                    placeholder="Hello, let's chat!"
                    onInput={debouncedUpdateText}
                    className={"input-base " + errorProperty === 'message'
                        ? 'input-error'
                        : ''}
                    required
                />
            </div>
            <br />
            <SubmitButton
                isSending={isSending}
                isSent={isSent}
                formError={formError}
                sentError={sentError}
                sendMessage={sendMessage}
            />
        </form>
    )
}



const SubmitButton = ({
                          isSending,
                          isSent,
                          formError,
                          sentError,
                          sendMessage,
                      }: SubmitParams) => {
    const isDisabled = isSending || isSent || Boolean(formError) || Boolean(sentError)
    let message = '  Send message'
    let colorClass = ''
    if (formError) {
        message = 'Invalid form'
    } else if (isSending) {
        message = 'Sending...'
    } else if (sentError) {
        message = 'Failed to send message'
        colorClass = 'red'
    } else if (isSent) {
        message = 'Message sent!'
        colorClass = 'green'
    }
    return <><button
        className={buttonStyles.base + ' ' + colorClass}
        type="submit"
        onClick={sendMessage}
        disabled={isDisabled}
    >
        {isSending &&
            <Spinner
                height={18}
                width={18}
            />}{message}</button
    >{sentError &&  <span className="error"> {sentError} </span> }
    </>
}