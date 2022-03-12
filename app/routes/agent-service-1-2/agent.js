const express = require('express')
const { getStatePensionDate } = require('get-state-pension-date')
const differenceInDays = require('date-fns/differenceInDays')
const startOfDay = require('date-fns/startOfDay')
const subMonths = require('date-fns/subMonths')
const got = require('got')
const fs = require('fs')
const {getMonth} = require('../../filters')()

const router = new express.Router()
const baseUrl = '/agent-service-1-2/agent'

function makeAStay(data) {
  const admission = new Date(`${data['admission-year']}-${data['admission-month']}-${data['admission-day']}`)
  const discharge = new Date(`${data['discharge-year']}-${data['discharge-month']}-${data['discharge-day']}`)
  const totalDays = Math.max(differenceInDays(discharge, admission) - 1, 0)
  return {admission, discharge, totalDays}
}


router.post(`${baseUrl}/login-router`, (req, res) => {
  const loginCheck = req.session.data['user-full-name']

  if (loginCheck === 'Pete Bates') {
    res.redirect(`${baseUrl}/case-load`)
  }
  else if (loginCheck === 'Admin') {
    res.redirect(`${baseUrl}/admin-case-load`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})

router.post(`${baseUrl}/system-ur-process-ab-router`, (req, res) => {
  const processAB = req.session.data['system-ur-process-ab']

  if (processAB === 'A') {
    res.redirect(`${baseUrl}/process-b-nil-task-list`)
  } else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

// TASK 1 / SUBTASK ROUTER<!>


router.post(`${baseUrl}/process-c-nil-task-1-1-router`, (req, res) => {
  const processTask_1_1 = req.session.data['process-c-nil-task-1-1']

  if (processTask_1_1 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-1-2`)
  }
  else if (processTask_1_1 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-1-2`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-1-2-router`, (req, res) => {
  const processTask_1_2 = req.session.data['process-c-nil-task-1-2']

  if (processTask_1_2 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-1-3`)
  }
  else if (processTask_1_2 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-1-3`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-1-3-router`, (req, res) => {
  const processTask_1_3 = req.session.data['process-c-nil-task-1-3']

  if (processTask_1_3 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-1-4`)
  }
  else if (processTask_1_3 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-1-4`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-1-4-router`, (req, res) => {
  const processTask_1_4 = req.session.data['process-c-nil-task-1-4']

  if (processTask_1_4 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-1-5`)
  }
  else if (processTask_1_4 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-1-5`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-1-5-router`, (req, res) => {
  const processTask_1_5 = req.session.data['process-c-nil-task-1-5']

  if (processTask_1_5 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-1-6`)
  }
  else if (processTask_1_5 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-1-6`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-1-6-router`, (req, res) => {
  const processTask_1_6 = req.session.data['process-c-nil-task-1-6']

  if (processTask_1_6 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-1-7`)
  }
  else if (processTask_1_6 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-1-7`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-1-7-router`, (req, res) => {
  const processTask_1_7 = req.session.data['process-c-nil-task-1-7']

  if (processTask_1_7 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
  else if (processTask_1_7 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

// TASK 3 / SUBTASK ROUTER<!>


router.post(`${baseUrl}/process-c-nil-task-3-1-router`, (req, res) => {
  const processTask_3_1 = req.session.data['process-c-nil-task-3-1']

  if (processTask_3_1 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-2`)
  }
  else if (processTask_3_1 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-2`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-3-2-router`, (req, res) => {
  const processTask_3_2 = req.session.data['process-c-nil-task-3-2']

  if (processTask_3_2 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-3`)
  }
  else if (processTask_3_2 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-3`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})


module.exports = router
