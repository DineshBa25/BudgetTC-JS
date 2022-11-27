import React from "react";
import {setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { getDatabase, ref, child, get ,set, onValue} from "firebase/database";

import {db, database} from "../../configs/firebaseConfig";
import {auth} from "../../configs/firebaseConfig";
import * as today from "date-fns";


//todo make firestore database rules secure. firebase.google.com/docs/firestore/security/get-started




const dbRef = getDatabase();

export async function registerUserToFireStore(uid, info) {
    try {
        await set(ref(database, `users/${uid}`), {
                "current": {
                    "budgetCategories": {
                    },
                    "incomeCategories": {
                    }
                },
                "draft": {
                    "budgetCategories": {
                    },
                    "incomeCategories": {
                    }
                },
                "next": {
                    "budgetCategories": {
                    },
                    "incomeCategories": {
                    }
                },
                "previous": {
                    "budgetCategories": {
                    },
                    "incomeCategories": {
                    }
                },
                "unallocatedExpenses": {
                }

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

function createNewMonthlyBudget(month, year) {
    //return a new monthly budget object
    console.log("Creating new monthly budget for " + month + " " + year);

    return `Monthly Budget for ${month} ${year}`;

}

export async function  getMonthlyBudgetFromFireStore(month,year)  {


    try {
        const docRef = await getDoc(doc(db, "users", auth.currentUser.uid));
        let docData = docRef.data()
        console.log("Retrieved Document: ", docData);


        console.log("Month Checking ", month +"-"+year ,docData.monthlyBudgets[month + "-" + year] === undefined ? "No budget for this month" : "Budget for this month exists");
        //if month and year is greater than today, then create a new monthly budget
        if(docData.monthlyBudgets[month + "-" + year] === undefined && (year > new Date().getFullYear() || (year === new Date().getFullYear() && month > new Date().getMonth()))){
            let newMonthlyBudget = createNewMonthlyBudget(month, year);
            //add new monthly budget for month-year to monthlyBudgets
            await setUserDataInFireStore({monthlyBudgets: {[month + "-" + year]: newMonthlyBudget}});

            console.log("New Monthly Budget Created: ", newMonthlyBudget);
            return newMonthlyBudget;
        }
        else{
            //return monthly budget for month-year
            console.log("Monthly Budget Retrieved: ", docData.monthlyBudgets[month + "-" + year]);
            return docData.monthlyBudgets[month + "-" + year];
        }
    } catch (e) {
        console.error("Error retrieving document: ", e);
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
    let uid = auth.currentUser.uid;
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
    const docRef = doc(db, "users", auth.currentUser.uid);

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

//export auth
