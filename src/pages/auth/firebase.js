import React from "react";
import {setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { getDatabase, ref, child, get ,set, onValue} from "firebase/database";

import {db, database} from "../../configs/firebaseConfig";


//todo make firestore database rules secure. firebase.google.com/docs/firestore/security/get-started




const dbRef = getDatabase();

export async function registerUserToFireStore(uid, info) {
    try {
        await set(ref(database, `users/${uid}`), {
            budget: {
                "Transportation": {
                    fullName: "Transportation",
                    color: "#ff0000",
                    amount: 80.96,
                    items: {
                        "Roadside Assistance": {
                            "fullName": "AAA Roadside Assistance",
                            "amount": 20.24,

                        },
                        "Car Maintenance Fund": {
                            "fullName": "Car Maintenance Fund",
                            "amount": 20.24,

                        },
                        "Car Related Fee's (Toll, Registration, etc": {
                            "fullName": "Car Related Fee's (Toll, Registration, etc",
                            "amount": 20.24,
                        },
                        "Gasoline": {
                            "fullName": "Gasoline",
                            "amount": 20.24,

                        },
                        "Auto Payment": {
                            "fullName": "Auto Payment",
                            "amount": 20.24,
                        },
                        "Car Insurance": {
                            "fullName": "Car Insurance",
                            "amount": 20.24,
                        }
                    }
                },
                "Personal and Fun Money": {
                    fullName: "Personal and Fun Money",
                    color: "#41c000",
                    amount: 121.44,
                    items: {
                        "Amazon Subscription": {
                            "fullName": "Amazon Subscription",
                            "amount": 20.24,
                        },
                        "Bali Vacation Fund": {
                            "fullName": "Bali Vacation Fund",
                            "amount": 20.24,
                        },
                        "Hulu Subscription": {
                            "fullName": "Hulu Subscription",
                            "amount": 20.24,
                        },
                        "LastPass Subscription": {
                            "fullName": "LastPass Subscription",
                            "amount": 20.24,
                        },
                        "Technology Fund": {
                            "fullName": "Technology Fund",
                            "amount": 20.24,
                        },
                        "Tx ->  Colorado Road Trip Fund": {
                            "fullName": "Tx ->  Colorado Road Trip Fund",
                            "amount": 20.24,
                        }
                    }
                },
                "Food": {
                    fullName: "Food",
                    color: "#ffff00",
                    amount: 121.44,
                    items: {
                        "Food": {
                            "fullName": "Food",
                            "amount": 20.24,
                        },
                        "Coffee Shops": {
                            "fullName": "Coffee Shops",
                            "amount": 20.24,
                        },
                        "Fast Food": {
                            "fullName": "Fast Food",
                            "amount": 20.24,
                        },
                        "Groceries": {
                            "fullName": "Groceries",
                            "amount": 20.24,
                        },
                        "Restaurants": {
                            "fullName": "Restaurants",
                            "amount": 20.24,
                        },
                    },
                    "Clothing": {
                        "Personal Clothing": {
                            "fullName": "Personal Clothing",
                            "amount": 20.24,
                        },

                        "Dry Cleaning": {
                            "fullName": "Dry Cleaning",
                            "amount": 20.24,
                        }
                    }
                },
                "Debt": {
                    fullName: "Debt",
                    color: "#4800ff",
                    amount: 80.96,
                    items: {

                        "Credit Card Debt": {
                            "fullName": "Credit Card Debt",
                            "amount": 20.24,
                        },
                        "Medical Debt": {
                            "fullName": "Medical Debt",
                            "amount": 20.24,
                        },
                        "Personal Loans": {
                            "fullName": "Personal Loans",
                            "amount": 20.24,
                        },
                        "Student Loans": {
                            "fullName": "Student Loans",
                            "amount": 20.24,
                        }
                    }
                },
                "Gift, Charity, and Donations": {
                    fullName: "Gift, Charity, and Donations",
                    color: "#003cff",
                    amount: 80.96,
                    items: {

                        "American Red Cross Donation": {
                            "fullName": "American Red Cross Donation",
                            "amount": 20.24,
                        },

                        "American Society of Deaf Children": {
                            "fullName": "American Society of Deaf Children",
                            "amount": 20.24,
                        },

                        "Holiday Gift Fund": {
                            "fullName": "Holiday Gift Fund",
                            "amount": 20.24,
                        },
                        "Miscellaneous Gift Fund": {
                            "fullName": "Miscellaneous Gift Fund",
                            "amount": 20.24,
                        }
                    }
                },
                "Housing": {
                    fullName: "Housing",
                    color: "#ff6a00",
                    amount: 222.64,
                    items: {

                        "Home Security System": {
                            "fullName": "Home Security System",
                            "amount": 20.24,
                        },
                        "Electricity": {
                            "fullName": "Electricity",
                            "amount": 20.24,
                        },
                        "Water": {
                            "fullName": "Water",
                            "amount": 20.24,
                        },
                        "Furniture": {
                            "fullName": "Furniture",
                            "amount": 20.24,
                        },
                        "Home Insurance": {
                            "fullName": "Home Insurance",
                            "amount": 20.24,
                        },
                        "HOA Dues": {
                            "fullName": "HOA Dues",
                            "amount": 20.24,
                        },

                        "Lawn Mower Fund": {
                            "fullName": "Lawn Mower Fund",
                            "amount": 20.24,
                        },

                        "Mortgage": {
                            "fullName": "Mortgage",
                            "amount": 20.24,
                        },

                        "Natural Gas": {
                            "fullName": "Natural Gas",
                            "amount": 20.24,
                        },
                        "Lawn Care": {
                            "fullName": "Lawn Care",
                            "amount": 20.24,
                        }
                    }
                },
                "Medical": {
                    fullName: "Medical",
                    color: "#bf00ff",
                    amount: 66.72,
                    items: {

                        "Eye Contacts": {
                            "fullName": "Eye Contacts",
                            "amount": 20.24,
                        },
                        "Dentist, Doctor, Optometrist Visits": {
                            "fullName": "Dentist, Doctor, Optometrist Visits",
                            "amount": 20.24,
                        },
                        "Medications": {
                            "fullName": "Medications",
                            "amount": 20.24,
                        },
                    }
                }
            },
        });
        await setDoc(doc(db, "users", uid), {
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
                "Transportation": {
                    fullName: "Transportation",
                    color: "#ff0000",
                    items: {
                        "Roadside Assistance": {
                            "fullName": "AAA Roadside Assistance",
                            "amount": 20.24,

                        },
                        "Car Maintenance Fund": {
                            "fullName": "Car Maintenance Fund",
                            "amount": 20.24,

                        },
                        "Car Related Fee's (Toll, Registration, etc": {
                            "fullName": "Car Related Fee's (Toll, Registration, etc",
                            "amount": 20.24,
                        },
                        "Gasoline": {
                            "fullName": "Car Maintenance Fund",
                            "amount": 20.24,

                        },
                        "Auto Payment": {
                            "fullName": "Auto Payment",
                            "amount": 20.24,
                        },
                        "Car Insurance": {
                            "fullName": "Car Insurance",
                            "amount": 20.24,
                        }
                    }
                },
                "Personal and Fun Money": {
                    fullName: "Personal and Fun Money",
                    color: "#41c000",
                    items: {
                        "Amazon Subscription": {
                            "fullName": "Amazon Subscription",
                            "amount": 20.24,
                        },
                        "Bali Vacation Fund": {
                            "fullName": "Bali Vacation Fund",
                            "amount": 20.24,
                        },
                        "Hulu Subscription": {
                            "fullName": "Hulu Subscription",
                            "amount": 20.24,
                        },
                        "LastPass Subscription": {
                            "fullName": "LastPass Subscription",
                            "amount": 20.24,
                        },
                        "Technology Fund": {
                            "fullName": "Technology Fund",
                            "amount": 20.24,
                        },
                        "Tx ->  Colorado Road Trip Fund": {
                            "fullName": "Tx ->  Colorado Road Trip Fund",
                            "amount": 20.24,
                        }
                    }
                },
                "Food": {
                    fullName: "Food",
                    color: "#ffff00",
                    items: {
                        "Food": {
                            "fullName": "Food",
                            "amount": 20.24,
                        },
                        "Coffee Shops": {
                            "fullName": "Coffee Shops",
                            "amount": 20.24,
                        },
                        "Fast Food": {
                            "fullName": "Fast Food",
                            "amount": 20.24,
                        },
                        "Groceries": {
                            "fullName": "Groceries",
                            "amount": 20.24,
                        },
                        "Restaurants": {
                            "fullName": "Restaurants",
                            "amount": 20.24,
                        },
                    },
                    "Clothing": {
                        "Personal Clothing": {
                            "fullName": "Personal Clothing",
                            "amount": 20.24,
                        },

                        "Dry Cleaning": {
                            "fullName": "Dry Cleaning",
                            "amount": 20.24,
                        }
                    }
                },
                "Debt": {
                    fullName: "Debt",
                    color: "#4800ff",
                    items: {

                        "Credit Card Debt": {
                            "fullName": "Credit Card Debt",
                            "amount": 20.24,
                        },
                        "Medical Debt": {
                            "fullName": "Medical Debt",
                            "amount": 20.24,
                        },
                        "Personal Loans": {
                            "fullName": "Personal Loans",
                            "amount": 20.24,
                        },
                        "Student Loans": {
                            "fullName": "Student Loans",
                            "amount": 20.24,
                        }
                    }
                },
                "Gift, Charity, and Donations": {
                    fullName: "Gift, Charity, and Donations",
                    color: "#003cff",
                    items: {

                        "American Red Cross Donation": {
                            "fullName": "American Red Cross Donation",
                            "amount": 20.24,
                        },

                        "American Society of Deaf Children": {
                            "fullName": "American Society of Deaf Children",
                            "amount": 20.24,
                        },

                        "Holiday Gift Fund": {
                            "fullName": "Holiday Gift Fund",
                            "amount": 20.24,
                        },
                        "Miscellaneous Gift Fund": {
                            "fullName": "Miscellaneous Gift Fund",
                            "amount": 20.24,
                        }
                    }
                },
                "Housing": {
                    fullName: "Housing",
                    color: "#ff6a00",
                    items: {

                        "Home Security System": {
                            "fullName": "Home Security System",
                            "amount": 20.24,
                        },
                        "Electricity": {
                            "fullName": "Electricity",
                            "amount": 20.24,
                        },
                        "Water": {
                            "fullName": "Water",
                            "amount": 20.24,
                        },
                        "Furniture": {
                            "fullName": "Furniture",
                            "amount": 20.24,
                        },
                        "Home Insurance": {
                            "fullName": "Home Insurance",
                            "amount": 20.24,
                        },
                        "Home Maintenance/Repair Fund": {
                            "fullName": "Home Maintenance/Repair Fund",
                            "amount": 20.24,
                        },
                        "HOA Dues": {
                            "fullName": "HOA Dues",
                            "amount": 20.24,
                        },

                        "Lawn Mower Fund": {
                            "fullName": "Lawn Mower Fund",
                            "amount": 20.24,
                        },

                        "Mortgage": {
                            "fullName": "Mortgage",
                            "amount": 20.24,
                        },

                        "Natural Gas": {
                            "fullName": "Natural Gas",
                            "amount": 20.24,
                        },

                        "Lawn Care": {
                            "fullName": "Lawn Care",
                            "amount": 20.24,
                        }
                    }
                },
                "Medical": {
                    fullName: "Medical",
                    color: "#bf00ff",
                    items: {

                        "Eye Contacts": {
                            "fullName": "Eye Contacts",
                            "amount": 20.24,
                        },
                        "Dentist, Doctor, Optometrist Visits": {
                            "fullName": "Dentist, Doctor, Optometrist Visits",
                            "amount": 20.24,
                        },
                        "Medications": {
                            "fullName": "Medications",
                            "amount": 20.24,
                        },
                    }
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
                autoAffordabilityCalc: {},
                loanPayoffCalculator: {},
                splitExpensesCalculator: {}
            },
            quote: "0"
        });
        console.log("Document written with ID: ", uid);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function getDataFromRealtimeDB(uid) {
    const userDataRef = ref(database, `users/${uid}`);
    let data;
    onValue(userDataRef, (snapshot) => {
        data = snapshot.val();
        //console.log(data);

    });
    return data;
}

export async function getAndSetUserDataFromFireStore(uid) {

    try {
        const docRef = await getDoc(doc(db, "users", uid));
        let docData = docRef.data()
        console.log("Retrieved Document: ", docData);
        return docData
    } catch (e) {
        console.error("Error retrieving document: ", e);
    }
}


export async function updateUserDataInFireStore(replacement) {
    let uid = "gcTHoUYGHsXbTZaNcqNKtzY7fxD3"
    const docRef = doc(db, "users", uid);

    await updateDoc(docRef,
        replacement
    )
        .then(() => {
            console.log(`Document updated Successfully `)
        })
        .catch(err => {
            console.error(err)
        });

}

export async function setUserDataInFireStore(replacement) {
    let uid = "uvMQqARvvTYNXTcv53uooInwYjt1"
    const docRef = doc(db, "users", uid);

    await setDoc(docRef,
        replacement
        , {merge: true})
        .then(() => {
            console.log(`Document updated Successfully `)
        })
        .catch(err => {
            console.error(err)
        });
}
