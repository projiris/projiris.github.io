'use client';
import styles from './page.module.css'
import buttonStyles from '@/styles/buttons.module.css'
import {useState, useCallback, useMemo} from "react";
import {BaseInput} from "@/components/form/BaseInput";
import { PageContainer } from "@/components/layout/PageContainer"
import { Mail } from '@/lib/mail'
// import prefixUriIfNeeded from '../utils/prefixUriIfNeeded.js'
// import { avoidReload } from '../utils/avoidReload.js'
import debounce from '@/utils/debounce.js'
import { Spinner } from '@/components/common/Spinner'
import Link from "next/link";
import { usePathname } from 'next/navigation';

const validateEmailRegex =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
const requiredTexts = ['name', 'message']

export default function Contact () {
    const pathname = usePathname()
    console.log('pathname', pathname)
    const [isSent, setIsSent] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [sentError, setSentError] = useState('')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')

    const setText = {
        name: setName,
        company: setCompany,
        phone: setPhone,
        message: setMessage,
    }
    const texts = { name, company, phone, message }

    const [errorProperty, setErrorProperty] = useState('')
    const [formError, setFormError] = useState('')

    const validateText = useCallback(
        (property, value, isRequired) => {
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
        (event) => {
            event.preventDefault()
            event.stopPropagation()
            const property = event.target.dataset.property
            const text = event.target.value
            setText[property](text)
            const required = Boolean(event.target.required)
            validateText(property, text, required)
        },
        [validateText]
    )

    const debouncedUpdateText = useMemo(
        () => debounce(updateText, 500),
        [updateText]
    )

    const validateEmail = useCallback(
        (email) => {
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
        (event) => {
            event.preventDefault()
            event.stopPropagation()
            const email = event.target.value
            setEmail(email)
            validateEmail(email)
        },
        [validateEmail]
    )

    const debouncedUpdateEmail = useMemo(
        () => debounce(updateEmail, 500),
        [updateEmail]
    )

    const sendMessage = async (event) => {
        event.preventDefault()
        event.stopPropagation()
        const emailIsValid = validateEmail(email)
        if (!emailIsValid) {
            return
        }
        const textsProperties = Object.keys(texts)

        for (let idx = 0; idx < textsProperties.length; idx++) {
            const property = textsProperties[idx]
            const isRequired = requiredTexts.includes(property)
            const textIsValid = validateText(
                property,
                texts[property],
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
            setSentError(sendError)
        } else {
            setIsSent(true)
        }
    }

    return <PageContainer
            title="Contact"
            subtitle="Get in touch with us"
            description=""
            sidebarImage={'/assets/default-contact.jpg'}
        >
            <h3 className={styles.contactTitle}>Send us an email</h3>
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
                        Component="textarea"
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
            <footer className={styles.footer}>
                <Link
                    href={('/about')}
                    className={styles.contact}
                >
                    About
                </Link>
            </footer>
        </PageContainer>
}

const SubmitButton = ({
                          isSending,
                          isSent,
                          formError,
                          sentError,
                          sendMessage,
                      }) => {
    const isDisabled = isSending || isSent || formError || sentError
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
                stroke="#eee"
                height={18}
                width={18}
            />}{message}</button
        >{sentError &&  <span className="error"> {sentError} </span> }
    </>
}
