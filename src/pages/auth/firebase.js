import React from "react";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {collection, addDoc, setDoc, doc, getDoc} from "firebase/firestore";
import {db} from "../../configs/firebaseConfig";

import {setRetirementCalcData401K} from "../../redux/slice/userDataSlice";
import {useDispatch} from "react-redux";

//todo make firestore database rules secure. firebase.google.com/docs/firestore/security/get-started

export async function firebaseTest() {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function registerUserToFireStore(uid, info) {
    try {
        const docRef = await setDoc(doc(db, "users", uid), {
            userInformation: {
                email: info.email,
                accountPicture: "https://firebasestorage.googleapis.com/v0/b/budgettc-c8e98.appspot.com/o/avatars-000313365814-bb3cvf-t240x240.jpg?alt=media&token=bd971fbb-121d-442c-be09-5a64986c4f84"
            },
            settings: {
                darkMode: true,
                gradientBackground: false,
                backgroundImage: "https://firebasestorage.googleapis.com/v0/b/budgettc-c8e98.appspot.com/o/background1.jpg?alt=media&token=4f5a8115-c455-48b7-b545-d53271d9fcac",
            },
            budget: {
                "Transportation" : {
                    fullName: "Transportation",
                    color: "#ffff00",
                    items: {
                        "Roadside Assistance" : {
                            "fullName": "AAA Roadside Assistance",
                            "amount": "undefined",

                        },
                        "Car Maintenance Fund": {
                            "fullName": "Car Maintenance Fund",
                            "amount": "undefined",

                        },
                        "Car Related Fee's (Toll, Registration, etc": {
                            "fullName": "Car Related Fee's (Toll, Registration, etc",
                            "amount": "undefined",
                        },
                        "Gasoline": {
                            "fullName": "Car Maintenance Fund",
                            "amount": "undefined",

                        },
                        "Auto Payment": {
                            "fullName": "Auto Payment",
                            "amount": "undefined",
                        },
                        "Car Insurance":{
                            "fullName": "Car Insurance",
                            "amount": "undefined",
                        }
                    }},
                "Personal and Fun Money":{
                    "Amazon Subscription":{
                        "fullName": "Amazon Subscription",
                        "amount": "undefined",
                    },
                    "Bali Vacation Fund":{
                        "fullName": "Bali Vacation Fund",
                        "amount": "undefined",
                    },
                    "Hulu Subscription":{
                        "fullName": "Hulu Subscription",
                        "amount": "undefined",
                    },
                    "LastPass Subscription":{
                        "fullName": "LastPass Subscription",
                        "amount": "undefined",
                    },
                    "Technology Fund":{
                        "fullName": "Technology Fund",
                        "amount": "undefined",
                    },
                    "Tx ->  Colorado Road Trip Fund": {
                        "fullName": "Tx ->  Colorado Road Trip Fund",
                        "amount": "undefined",
                    }
                },
                "Food" : {
                    "Food": {
                        "fullName": "Food",
                        "amount": "undefined",
                    },
                    "Coffee Shops": {
                        "fullName": "Coffee Shops",
                        "amount": "undefined",
                    },
                    "Fast Food": {
                        "fullName": "Fast Food",
                        "amount": "undefined",
                    },
                    "Groceries": {
                        "fullName": "Groceries",
                        "amount": "undefined",
                    },
                    "Restaurants": {
                        "fullName": "Restaurants",
                        "amount": "undefined",
                    },
                },
                "Clothing":{
                    "Personal Clothing": {
                        "fullName": "Personal Clothing",
                        "amount": "undefined",
                    },

                    "Dry Cleaning": {
                        "fullName": "Dry Cleaning",
                        "amount": "undefined",
                    }

                },
                "Debt": {

                    "Credit Card Debt": {
                        "fullName": "Credit Card Debt",
                        "amount": "undefined",
                    },
                    "Medical Debt": {
                        "fullName": "Medical Debt",
                        "amount": "undefined",
                    },
                    "Personal Loans": {
                        "fullName": "Personal Loans",
                        "amount": "undefined",
                    },
                    "Student Loans": {
                        "fullName": "Student Loans",
                        "amount": "undefined",
                    }

                },
                "Gift, Charity, and Donations":{

                    "American Red Cross Donation": {
                        "fullName": "American Red Cross Donation",
                        "amount": "undefined",
                    },

                    "American Society of Deaf Children": {
                        "fullName": "American Society of Deaf Children",
                        "amount": "undefined",
                    },

                    "Holiday Gift Fund": {
                        "fullName": "Holiday Gift Fund",
                        "amount": "undefined",
                    },
                    "Miscellaneous Gift Fund": {
                        "fullName": "Miscellaneous Gift Fund",
                        "amount": "undefined",
                    }
                },
                "Housing":{

                    "Home Security System": {
                        "fullName": "Home Security System",
                        "amount": "undefined",
                    },
                    "Electricity": {
                        "fullName": "Electricity",
                        "amount": "undefined",
                    },
                    "Water": {
                        "fullName": "Water",
                        "amount": "undefined",
                    },
                    "Furniture": {
                        "fullName": "Furniture",
                        "amount": "undefined",
                    },
                    "Home Insurance": {
                        "fullName": "Home Insurance",
                        "amount": "undefined",
                    },
                    "Home Maintenance/Repair Fund": {
                        "fullName": "Home Maintenance/Repair Fund",
                        "amount": "undefined",
                    },
                    "HOA Dues": {
                        "fullName": "HOA Dues",
                        "amount": "undefined",
                    },

                    "Lawn Mower Fund": {
                        "fullName": "Lawn Mower Fund",
                        "amount": "undefined",
                    },

                    "Mortgage": {
                        "fullName": "Mortgage",
                        "amount": "undefined",
                    },

                    "Natural Gas": {
                        "fullName": "Natural Gas",
                        "amount": "undefined",
                    },

                    "Lawn Care": {
                        "fullName": "Lawn Care",
                        "amount": "undefined",
                    },
                },
                "Medical":{

                    "Eye Contacts": {
                        "fullName": "Eye Contacts",
                        "amount": "undefined",
                    },
                    "Dentist, Doctor, Optometrist Visits": {
                        "fullName": "Dentist, Doctor, Optometrist Visits",
                        "amount": "undefined",
                    },
                    "Medications": {
                        "fullName": "Medications",
                        "amount": "undefined",
                    },
                }
            },
            tools: {
                retirementCalcR401K: {
                    CurrentAge: '',
                    RetirementAge: '',
                    CurrentSavings: '',
                    Salary: '',
                    SalaryIncrease: '',
                    ContributionOfSalary: '',
                    EmployerMatchPercent: '',
                    EmployerMatchUpTo: '',
                    ExpectedContribution: '',
                    ExpectedReturn: '',
                    ExpectedInflation: '',
                },
                autoAffordabilityCalc: {

                },
                loanPayoffCalculator:{

                },
                splitExpensesCalculator:{}
            }
        });
        console.log("Document written with ID: ", uid);
    }
    catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function getAndSetUserDataFromFireStore(uid) {

    try {
        const docRef = await getDoc(doc(db, "users", uid));
        let docData = docRef.data()
        console.log("Retrieved Document: ", docData);
        return docData
    }
    catch (e) {
        console.error("Error retrieving document: ", e);
    }
}
