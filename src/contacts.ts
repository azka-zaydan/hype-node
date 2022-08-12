import fs from 'fs'
import { validate } from 'email-validator'
import ContactsData from '../data/data.json'
// import chalk from 'chalk'

interface ContactProps {
    name:string
    email:string
    phoneNumber:string
}

export const saveContact = async (name:string | unknown,email:string | unknown,phoneNumber:string | unknown) => {
    
    const contact = {name,email,phoneNumber} as ContactProps
    if (typeof email === 'string'){
        if (!validate(email)) {
            console.log("not valid email")
            return false
        }
    }
    const duplicate = ContactsData.find((contact) => contact.name === name)
    if(duplicate) {

        console.log(('contact already exists'))
        return false
    }
    ContactsData.push(contact)
    fs.writeFile('../data/data.json',JSON.stringify(ContactsData,null,4),(() => console.log('done')))
}

export const listContacts = () => {
    console.log("Contacts: ")
    ContactsData.forEach((contact,i) => {
        console.log(`${i+1}. ${contact.name} - ${contact.phoneNumber}`)
    })
}

export const contactDetails = (name:string|unknown) => {
    if (typeof name === 'string') {
        const contact = ContactsData.find((contact) => contact.name.toLowerCase() === name.toLowerCase())
        if (contact){
            console.log(`${contact.name}'s number: ${contact.phoneNumber}`)
        }else {
            console.log(`Did not find: ${name} in contacts`)
        }
    }
}

export const deleteContact = (name: string | unknown) => {
    if (typeof name === 'string') {
        const newContacts = ContactsData.filter((contact) => contact.name.toLowerCase() !== name.toLowerCase())
        if (ContactsData.length === newContacts.length) {
            console.log(`did not found ${name} in contacts`)
        } else {
            fs.writeFile('../data/data.json',JSON.stringify(newContacts,null,4),(() => console.log('done')))
        }
    }
}