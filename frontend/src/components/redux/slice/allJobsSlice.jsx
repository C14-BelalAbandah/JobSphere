import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import { useState,useEffect,useContext } from 'react'




export const allJobsSlice= createSlice ({
 name: "allJobs",
 initialState: [
    {
        "_id": "6816789a521bc338b18843b9",
        "title": "Web Developer (WordPress & Shopify)",
        "description": "Customize and maintain WordPress websites and Shopify stores for clients. Develop themes, plugins, and integrations to enhance functionality and user experience.",
        "requirements": [
            "1-Strong knowledge of WordPress development and Shopify theming",
            "2-Experience with PHP, HTML/CSS, JavaScript",
            "3-Ability to troubleshoot and optimize website performance",
            "4-Leadership experience and ability to guide teams"
        ],
        "location": "Amman, Jordan (Hybrid)",
        "jobPoster": {
            "_id": "681505f3f0dced1106d4ab56",
            "firstName": "mohammad",
            "lastName": "ahmad",
            "email": "mohammad@gmail.com",
            "password": "$2b$05$8qBTPKMeNkacxqBEIsJMo.PktGaq/vUGU.tG4jqFOopw6tpiP/BSS",
            "role": "6814e3dd770948ef6e8a7eb0",
            "__v": 0
        },
        "applications": [
            "681678b2521bc338b18843bb",
            "68167930704c3f9947e2e9a2",
            "681679555e6998f3d87833fa",
            "6816798ae3020d9cf431bbee",
            "681679bc0426fd2ef005129c",
            "681679d6b3daa4d038291e99"
        ],
        "__v": 0
    },
    {
        "_id": "68167c5ad5b4e6e7518e8500",
        "title": "Junior Frontend Developer",
        "description": "Develop responsive and interactive user interfaces for web applications using modern frontend technologies. Collaborate with UI/UX designers and backend developers to integrate APIs and ensure cross-browser compatibility.",
        "requirements": [
            "1-Proficiency in HTML5, CSS3, JavaScript",
            "2-Experience with React.js or Vue.js",
            "3-Familiarity with Git and version control",
            "4-Leadership experience and ability to guide teams"
        ],
        "location": "Amman, Jordan (Hybrid)",
        "jobPoster": {
            "_id": "681505f3f0dced1106d4ab56",
            "firstName": "mohammad",
            "lastName": "ahmad",
            "email": "mohammad@gmail.com",
            "password": "$2b$05$8qBTPKMeNkacxqBEIsJMo.PktGaq/vUGU.tG4jqFOopw6tpiP/BSS",
            "role": "6814e3dd770948ef6e8a7eb0",
            "__v": 0
        },
        "applications": [
            "68167caed5b4e6e7518e8506",
            "681797da8d292e6e86eb34ef",
            "681797e08d292e6e86eb34f3",
            "68179e6ab03f973790114ba2",
            "68179eaefa450ed24ab124b1"
        ],
        "__v": 0
    },
    {
        "_id": "68167c71d5b4e6e7518e8502",
        "title": "Senior Web Developer (Python/Django)",
        "description": "Lead the development of data-driven web applications and dashboards. Mentor junior developers, optimize backend performance, and integrate machine learning models into web services.",
        "requirements": [
            "1-Proficiency in HTML5, CSS3, JavaScript",
            "2-Experience with React.js or Vue.js",
            "3-Familiarity with Git and version control",
            "4-Leadership experience and ability to guide teams"
        ],
        "location": "Amman, Jordan (Hybrid)",
        "jobPoster": {
            "_id": "681505f3f0dced1106d4ab56",
            "firstName": "mohammad",
            "lastName": "ahmad",
            "email": "mohammad@gmail.com",
            "password": "$2b$05$8qBTPKMeNkacxqBEIsJMo.PktGaq/vUGU.tG4jqFOopw6tpiP/BSS",
            "role": "6814e3dd770948ef6e8a7eb0",
            "__v": 0
        },
        "applications": [
            "68179f1532651a5d6117a5e7"
        ],
        "__v": 0
    }
],
reducers:{

}
});

export default allJobsSlice.reducer