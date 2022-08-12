import yargs from 'yargs'
import { contactDetails, deleteContact, listContacts, saveContact } from './contacts'


yargs.command({
    command:'add',
    describe: 'add new contact',
    builder:{
        name:{
            describe: 'full name',
            demandOption: true,
            type:"string"
        },
        email:{
            describe: 'email',
            demandOption: true,
            type: 'string'
        },
        phoneNumber: {
            describe: 'phone number',
            demandOption: true,
            type:'string',
        }
    },
    handler(argv){
        saveContact(argv.name,argv.email,argv.phoneNumber)
    }
}).demandCommand()

yargs.command({
    command:'list',
    describe: 'display all contacts',
    handler(){
        listContacts()
    }
})

yargs.command({
    command:'detail',
    describe: 'display info about a specific contact',
    builder:{
        name:{
            describe: 'full name',
            demandOption: true,
            type:"string"
    }},
    handler(argv){
        contactDetails(argv.name)
    }
})

yargs.command({
    command:'delete',
    describe: 'delete contact by name',
    builder:{
        name:{
            describe: 'full name',
            demandOption: true,
            type:"string"
    }},
    handler(argv){
        deleteContact(argv.name)
    }
})


yargs.parse()