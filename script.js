

// 1. Contact class

class Contact {
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }

    toString() {
        return `${this.name} - ${this.phone}`;
    }
}


// 2. Doubly Linked List Node

class Node {
    constructor(contact) {
        this.contact = contact;
        this.prev = null;
        this.next = null;
    }
}



// 3. Doubly Linked List

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    // Add a contact at the end
    append(contact) {
        const newNode = new Node(contact);

        // Empty list
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
            return;
        }

        // Add after the current tail
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
    }

    // Display from beginning to end
    displayForward() {
        if (this.head === null) {
            console.log("No contacts available.");
            return;
        }

        let current = this.head;

        while (current !== null) {
            console.log(current.contact.toString());
            current = current.next;
        }
    }

    // Display from end to beginning
    displayBackward() {
        if (this.tail === null) {
            console.log("No contacts available.");
            return;
        }

        let current = this.tail;

        while (current !== null) {
            console.log(current.contact.toString());
            current = current.prev;
        }
    }
}



// 4. Naive String Matching

function containsSubstring(text, keyword) {

    text = text.toLowerCase();
    keyword = keyword.toLowerCase();

    const n = text.length;
    const m = keyword.length;

    if (m === 0) {
        return true;
    }

    if (m > n) {
        return false;
    }

    // Try every possible starting position
    for (let i = 0; i <= n - m; i++) {

        let match = true;

        // Compare characters
        for (let j = 0; j < m; j++) {

            if (text[i + j] !== keyword[j]) {
                match = false;
                break;
            }
        }

        if (match) {
            return true;
        }
    }

    return false;
}



// 5. Contact Manager

class ContactManager {
    constructor() {

        // Doubly Linked List
        this.contacts = new DoublyLinkedList();

        // Hash Table
        this.contactTable = new Map();
    }



    // Add Contact

    addContact(name, phone) {

        // Check if name already exists
        if (this.contactTable.has(name)) {
            console.log("A contact with this name already exists.");
            return;
        }

        // Create contact
        const contact = new Contact(name, phone);

        // Store the SAME object in both structures
        this.contacts.append(contact);
        this.contactTable.set(name, contact);

        console.log("Contact added.");
    }



    // Search by Keyword

    searchByKeyword(keyword) {

        let current = this.contacts.head;
        let found = false;

        while (current !== null) {

            const contact = current.contact;

            if (containsSubstring(contact.name, keyword)) {
                console.log(`Match found: ${contact.toString()}`);
                found = true;
            }

            current = current.next;
        }

        if (!found) {
            console.log("No matching contacts found.");
        }
    }


    // Search by Exact Name

    searchByName(name) {

        const contact = this.contactTable.get(name);

        if (contact) {
            console.log(`Contact found: ${contact.toString()}`);
        } else {
            console.log("Contact not found.");
        }
    }


    // Display Forward

    displayForward() {

        console.log("\nContacts (Forward):");
        this.contacts.displayForward();
    }


    // Display Backward
    displayBackward() {

        console.log("\nContacts (Backward):");
        this.contacts.displayBackward();
    }
}


// 6. MENU

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const manager = new ContactManager();


// Helper function for asking questions
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}


// Main Menu

async function main() {

    while (true) {

        console.log("\n==============================");
        console.log("    CONTACT MANAGEMENT");
        console.log("==============================");
        console.log("1. Add Contact");
        console.log("2. Search by Keyword");
        console.log("3. Search by Exact Name");
        console.log("4. View All (Forward)");
        console.log("5. View All (Backward)");
        console.log("6. Exit");
        console.log("==============================");

        const choice = await askQuestion("Enter option: ");


        // 1. Add Contact

        if (choice === "1") {

            const name = await askQuestion("Name: ");
            const phone = await askQuestion("Phone: ");

            if (name.trim() === "" || phone.trim() === "") {
                console.log("Name and phone cannot be empty.");
            } else {
                manager.addContact(
                    name.trim(),
                    phone.trim()
                );
            }
        }



        // 2. Search by Keyword

        else if (choice === "2") {

            const keyword = await askQuestion("Search keyword: ");

            if (keyword.trim() === "") {
                console.log("Keyword cannot be empty.");
            } else {
                manager.searchByKeyword(keyword.trim());
            }
        }



        // 3. Search by Exact Name

        else if (choice === "3") {

            const name = await askQuestion("Enter exact name: ");

            manager.searchByName(name.trim());
        }


        // 4. View Forward
        else if (choice === "4") {

            manager.displayForward();
        }


        
        // 5. View Backward
        else if (choice === "5") {

            manager.displayBackward();
        }


        
        // 6. Exit

        else if (choice === "6") {

            console.log("Goodbye!");

            rl.close();

            break;
        }


        // Invalid option

        else {

            console.log("Invalid option. Please try again.");
        }
    }
}


// Start application
main();