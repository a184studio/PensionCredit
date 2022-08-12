const express = require('express')
const { getStatePensionDate } = require('get-state-pension-date')
const differenceInDays = require('date-fns/differenceInDays')
const startOfDay = require('date-fns/startOfDay')
const subMonths = require('date-fns/subMonths')
const got = require('got')
const path = require('path')
const fs = require('fs')
const {getMonth} = require('../../filters')()

const router = new express.Router()
const baseUrl = '/agent-service-1-12/agent'

function makeAStay(data) {
  const admission = new Date(`${data['admission-year']}-${data['admission-month']}-${data['admission-day']}`)
  const discharge = new Date(`${data['discharge-year']}-${data['discharge-month']}-${data['discharge-day']}`)
  const totalDays = Math.max(differenceInDays(discharge, admission) - 1, 0)
  return {admission, discharge, totalDays}
}


// PDF DOWNLOADER
router.use(`${baseUrl}/processing-screens.pdf`, express.static(path.resolve('app/views/agent-service-1-6/agent/processing-screens.pdf')))
router.use(`${baseUrl}/pc-claims-may-2022.xlsx`, express.static(path.resolve('app/views/agent-service-1-6/agent/pc-claims-may-2022.xlsx')))

// —————————————————————————————————


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

// SYSTEM ROUTER


router.post(`${baseUrl}/system-ur-process-ab-router`, (req, res) => {
  const processAB = req.session.data['system-ur-process-ab']

  if (processAB === 'A') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-9`)
  }  else if (processAB == 'B') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-9-b1`)
  }  else if (processAB == 'C') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-13`)
  } else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})


// SYSTEM ROUTER OCC


router.post(`${baseUrl}/system-ur-process-frequency-router`, (req, res) => {
  const processProcessFrequency = req.session.data['system-ur-process-frequency']

  if (processProcessFrequency === 'A') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-w`)

  }  else if (processProcessFrequency == 'B') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-fw`)

  }  else if (processProcessFrequency == 'C') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-2`)

  }  else if (processProcessFrequency == 'D') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-q`)

  }  else if (processProcessFrequency == 'E') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-t`)

  }  else if (processProcessFrequency == 'F') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-y`)

  } else {
    res.redirect(`${baseUrl}/XXX`)
  }
})


// TASK 1 / SUBTASK ROUTER<!>


router.post(`${baseUrl}/process-c-nil-task-1-1-router`, (req, res) => {
  const processTask_1_1 = req.session.data['process-c-nil-task-1-1']

  if (processTask_1_1 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-1-3`)
  }
  else if (processTask_1_1 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-1-3`)
  }
  else if (processTask_1_1 == 'Skip') {
    res.redirect(`${baseUrl}/process-c-nil-task-1-3`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

// router.post(`${baseUrl}/process-c-nil-task-1-2-router`, (req, res) => {
//   const processTask_1_2 = req.session.data['process-c-nil-task-1-2']
//
//   if (processTask_1_2 == 'Matched') {
//     res.redirect(`${baseUrl}/process-c-nil-task-1-3`)
//   }
//   else if (processTask_1_2 == 'Not matched') {
//     res.redirect(`${baseUrl}/process-c-nil-task-1-3`)
//   }
//    else {
//     res.redirect(`${baseUrl}/process-c-nil-task-list`)
//   }
// })

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
    res.redirect(`${baseUrl}/process-c-nil-task-1-6`)
  }
  else if (processTask_1_4 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-1-6`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

// router.post(`${baseUrl}/process-c-nil-task-1-5-router`, (req, res) => {
//   const processTask_1_5 = req.session.data['process-c-nil-task-1-5']
//
//   if (processTask_1_5 == 'Matched') {
//     res.redirect(`${baseUrl}/process-c-nil-task-1-6`)
//   }
//   else if (processTask_1_5 == 'Not matched') {
//     res.redirect(`${baseUrl}/process-c-nil-task-1-6`)
//   }
//    else {
//     res.redirect(`${baseUrl}/process-c-nil-task-list`)
//   }
// })

router.post(`${baseUrl}/process-c-nil-task-1-6-router`, (req, res) => {
  const processTask_1_6 = req.session.data['process-c-nil-task-1-6']

  if (processTask_1_6 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
  else if (processTask_1_6 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

// router.post(`${baseUrl}/process-c-nil-task-1-7-router`, (req, res) => {
//   const processTask_1_7 = req.session.data['process-c-nil-task-1-7']
//
//   if (processTask_1_7 == 'Matched') {
//     res.redirect(`${baseUrl}/process-c-nil-task-list`)
//   }
//   else if (processTask_1_7 == 'Not matched') {
//     res.redirect(`${baseUrl}/process-c-nil-task-list`)
//   }
//    else {
//     res.redirect(`${baseUrl}/process-c-nil-task-list`)
//   }
// })

// TASK 2 / SUBTASK ROUTER<!>


router.post(`${baseUrl}/process-c-nil-task-2-4-router`, (req, res) => {
  const processTask_2_4 = req.session.data['process-c-nil-task-2-4']

  if (processTask_2_4 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-2-1`)
  }
  else if (processTask_2_4 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-2-1`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-2-1-router`, (req, res) => {
  const processTask_2_1 = req.session.data['process-c-nil-task-2-1']

  if (processTask_2_1 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-2-2`)
  }
  else if (processTask_2_1 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-2-2`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-2-2-router`, (req, res) => {
  const processTask_2_2 = req.session.data['process-c-nil-task-2-2']

  if (processTask_2_2 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-2-3`)
  }
  else if (processTask_2_2 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-2-3`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})



router.post(`${baseUrl}/process-c-nil-task-2-3-router`, (req, res) => {
  const processTask_2_3 = req.session.data['process-c-nil-task-2-3']

  if (processTask_2_3 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
  else if (processTask_2_3 == 'Not matched') {
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
    res.redirect(`${baseUrl}/process-c-nil-task-3-9`)
  }
  else if (processTask_3_1 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-9`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

// router.post(`${baseUrl}/process-c-nil-task-3-2-router`, (req, res) => {
//   const processTask_3_2 = req.session.data['process-c-nil-task-3-2']
//
//   if (processTask_3_2 == 'Matched') {
//     res.redirect(`${baseUrl}/process-c-nil-task-3-3`)
//   }
//   else if (processTask_3_2 == 'Not matched') {
//     res.redirect(`${baseUrl}/process-c-nil-task-3-3`)
//   }
//    else {
//     res.redirect(`${baseUrl}/process-c-nil-task-list`)
//   }
// })

// router.post(`${baseUrl}/process-c-nil-task-3-3-router`, (req, res) => {
//   const processTask_3_3 = req.session.data['process-c-nil-task-3-3']
//
//   if (processTask_3_3 == 'Matched') {
//     res.redirect(`${baseUrl}/process-c-nil-task-3-4`)
//   }
//   else if (processTask_3_3 == 'Not matched') {
//     res.redirect(`${baseUrl}/process-c-nil-task-3-4`)
//   }
//    else {
//     res.redirect(`${baseUrl}/process-c-nil-task-list`)
//   }
// })

// router.post(`${baseUrl}/process-c-nil-task-3-4-router`, (req, res) => {
//   const processTask_3_4 = req.session.data['process-c-nil-task-3-4']
//
//   if (processTask_3_4 == 'Matched') {
//     res.redirect(`${baseUrl}/process-c-nil-task-3-8`)
//   }
//   else if (processTask_3_4 == 'Not matched') {
//     res.redirect(`${baseUrl}/process-c-nil-task-3-8`)
//   }
//    else {
//     res.redirect(`${baseUrl}/process-c-nil-task-list`)
//   }
// })

// router.post(`${baseUrl}/process-c-nil-task-3-8-router`, (req, res) => {
//   const processTask_3_8 = req.session.data['process-c-nil-task-3-8']
//
//   if (processTask_3_8 == 'Matched') {
//     res.redirect(`${baseUrl}/process-c-nil-task-3-9`)
//   }
//   else if (processTask_3_8 == 'Not matched') {
//     res.redirect(`${baseUrl}/process-c-nil-task-3-9`)
//   }
//    else {
//     res.redirect(`${baseUrl}/process-c-nil-task-list`)
//   }
// })

router.post(`${baseUrl}/process-c-nil-task-3-9-router`, (req, res) => {
  const processTask_3_9 = req.session.data['process-c-nil-task-3-9']

  if (processTask_3_9 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-10`)
  }
  else if (processTask_3_9 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-10`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-3-10-router`, (req, res) => {
  const processTask_3_10 = req.session.data['process-c-nil-task-3-10']

  if (processTask_3_10 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-12`)
  }
  else if (processTask_3_10 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-12`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-3-11-router`, (req, res) => {
  const processTask_3_11 = req.session.data['process-c-nil-task-3-11']

  if (processTask_3_11 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-13`)
  }
  else if (processTask_3_11 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-13`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

// router.post(`${baseUrl}/process-c-nil-task-3-12-router`, (req, res) => {
//   const processTask_3_12 = req.session.data['process-c-nil-task-3-12']
//
//   if (processTask_3_12 == 'Matched') {
//     res.redirect(`${baseUrl}/process-c-nil-task-3-13`)
//   }
//   else if (processTask_3_12 == 'Not matched') {
//     res.redirect(`${baseUrl}/process-c-nil-task-3-13`)
//   }
//    else {
//     res.redirect(`${baseUrl}/process-c-nil-task-list`)
//   }
// })

router.post(`${baseUrl}/process-c-nil-task-3-13-router`, (req, res) => {
  const processTask_3_13 = req.session.data['process-c-nil-task-3-13']

  if (processTask_3_13 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
  else if (processTask_3_13 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})


// ——————— FOUR


router.post(`${baseUrl}/process-c-nil-task-3-5-router`, (req, res) => {
  const processTask_3_5 = req.session.data['process-c-nil-task-3-5']

  if (processTask_3_5 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-6`)
  }
  else if (processTask_3_5 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-6`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-3-6-router`, (req, res) => {
  const processTask_3_6 = req.session.data['process-c-nil-task-3-6']

  if (processTask_3_6 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-7`)
  }
  else if (processTask_3_6 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-7`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-3-7-router`, (req, res) => {
  const processTask_3_7 = req.session.data['process-c-nil-task-3-7']

  if (processTask_3_7 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-14`)
  }
  else if (processTask_3_7 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-14`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})


router.post(`${baseUrl}/process-c-nil-task-3-14-router`, (req, res) => {
  const processTask_3_14 = req.session.data['process-c-nil-task-3-14']

  if (processTask_3_14 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-15`)
  }
  else if (processTask_3_14 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-15`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-3-15-router`, (req, res) => {
  const processTask_3_15 = req.session.data['process-c-nil-task-3-15']

  if (processTask_3_15 == 'Matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-16`)
  }
  else if (processTask_3_15 == 'Not matched') {
    res.redirect(`${baseUrl}/process-c-nil-task-3-16`)
  }
   else {
    res.redirect(`${baseUrl}/process-c-nil-task-list`)
  }
})




// Weekly

router.post(`${baseUrl}/process-c-nil-task-4-w-router`, (req, res) => {
  const processTask_4_w = req.session.data['process-c-nil-task-4-w']

  if (processTask_4_w == 'Yes') {
    res.redirect(`${baseUrl}/process-nil-task-list-s4`)
  }
  else if (processTask_4_w == 'No') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-w-edit`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-4-w-edit-router`, (req, res) => {
  const processTask_4_w_edit = req.session.data['process-c-nil-task-4-w-edit']

  if (processTask_4_w_edit == 'Yes') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-w-edit-review`)
  }
  else if (processTask_4_w_edit == 'No') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-w`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-4-w-edit-review-router`, (req, res) => {
  const processTask_4_w_edit_review = req.session.data['process-c-nil-task-4-w-edit-review']

  if (processTask_4_w_edit_review == 'Yes') {
    res.redirect(`${baseUrl}/process-nil-task-list-s4`)
  }
  else if (processTask_4_w_edit_review == 'No') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-w-edit`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})



// Four weekly

router.post(`${baseUrl}/process-c-nil-task-4-fw-router`, (req, res) => {
  const processTask_4_fw = req.session.data['process-c-nil-task-4-fw']

  if (processTask_4_fw == 'Yes') {
    res.redirect(`${baseUrl}/process-nil-task-list-s4`)
  }
  else if (processTask_4_fw == 'No') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-fw-edit`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-4-fw-edit-router`, (req, res) => {
  const processTask_4_fw_edit = req.session.data['process-c-nil-task-4-fw-edit']

  if (processTask_4_fw_edit == 'Yes') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-fw-edit-review`)
  }
  else if (processTask_4_fw_edit == 'No') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-fw`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-4-fw-edit-review-router`, (req, res) => {
  const processTask_4_fw_edit_review = req.session.data['process-c-nil-task-4-fw-edit-review']

  if (processTask_4_fw_edit_review == 'Yes') {
    res.redirect(`${baseUrl}/process-nil-task-list-s4`)
  }
  else if (processTask_4_fw_edit_review == 'No') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-fw-edit`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})

// Quarterly

router.post(`${baseUrl}/process-c-nil-task-4-q-router`, (req, res) => {
  const processTask_4_q = req.session.data['process-c-nil-task-4-q']

  if (processTask_4_q == 'Yes') {
    res.redirect(`${baseUrl}/process-nil-task-list-s4`)
  }
  else if (processTask_4_q == 'No') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-q-edit`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-4-q-edit-router`, (req, res) => {
  const processTask_4_q_edit = req.session.data['process-c-nil-task-4-q-edit']

  if (processTask_4_q_edit == 'Yes') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-q-edit-review`)
  }
  else if (processTask_4_q_edit == 'No') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-q`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-4-q-edit-review-router`, (req, res) => {
  const processTask_4_q_edit_review = req.session.data['process-c-nil-task-4-q-edit-review']

  if (processTask_4_q_edit_review == 'Yes') {
    res.redirect(`${baseUrl}/process-nil-task-list-s4`)
  }
  else if (processTask_4_q_edit_review == 'No') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-q-edit`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})


// Twice a year

router.post(`${baseUrl}/process-c-nil-task-4-t-router`, (req, res) => {
  const processTask_4_t = req.session.data['process-c-nil-task-4-t']

  if (processTask_4_t == 'Yes') {
    res.redirect(`${baseUrl}/process-nil-task-list-s4`)
  }
  else if (processTask_4_t == 'No') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-t-edit`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-4-t-edit-router`, (req, res) => {
  const processTask_4_t_edit = req.session.data['process-c-nil-task-4-t-edit']

  if (processTask_4_t_edit == 'Yes') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-t-edit-review`)
  }
  else if (processTask_4_t_edit == 'No') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-t`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-4-t-edit-review-router`, (req, res) => {
  const processTask_4_t_edit_review = req.session.data['process-c-nil-task-4-t-edit-review']

  if (processTask_4_t_edit_review == 'Yes') {
    res.redirect(`${baseUrl}/process-nil-task-list-s4`)
  }
  else if (processTask_4_t_edit_review == 'No') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-t-edit`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})


// Once a year

router.post(`${baseUrl}/process-c-nil-task-4-y-router`, (req, res) => {
  const processTask_4_y = req.session.data['process-c-nil-task-4-y']

  if (processTask_4_y == 'Yes') {
    res.redirect(`${baseUrl}/process-nil-task-list-s4`)
  }
  else if (processTask_4_y == 'No') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-y-edit`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-4-y-edit-router`, (req, res) => {
  const processTask_4_y_edit = req.session.data['process-c-nil-task-4-y-edit']

  if (processTask_4_y_edit == 'Yes') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-y-edit-review`)
  }
  else if (processTask_4_y_edit == 'No') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-y`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-4-y-edit-review-router`, (req, res) => {
  const processTask_4_y_edit_review = req.session.data['process-c-nil-task-4-y-edit-review']

  if (processTask_4_y_edit_review == 'Yes') {
    res.redirect(`${baseUrl}/process-nil-task-list-s4`)
  }
  else if (processTask_4_y_edit_review == 'No') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-y-edit`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})


// —————————————

router.post(`${baseUrl}/process-c-nil-task-4-1-router`, (req, res) => {
  const processTask_4_1 = req.session.data['process-c-nil-task-4-1']

  if (processTask_4_1 == 'Yes') {
    res.redirect(`${baseUrl}/process-nil-task-list-s4`)
  }
  else if (processTask_4_1 == 'No') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-1-edit`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})



router.post(`${baseUrl}/process-c-nil-task-4-2-router`, (req, res) => {
  const processTask_4_2 = req.session.data['process-c-nil-task-4-2']

  if (processTask_4_2 == 'Yes') {
    res.redirect(`${baseUrl}/process-nil-task-list-s4`)
  }
  else if (processTask_4_2 == 'No') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-2-edit`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-4-2-edit-router`, (req, res) => {
  const processTask_4_2_edit = req.session.data['process-c-nil-task-4-2-edit']

  if (processTask_4_2_edit == 'Yes') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-2-edit-review`)
  }
  else if (processTask_4_2_edit == 'No') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-2`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-4-2-edit-review-router`, (req, res) => {
  const processTask_4_2_edit_review = req.session.data['process-c-nil-task-4-2-edit-review']

  if (processTask_4_2_edit_review == 'Yes') {
    res.redirect(`${baseUrl}/process-nil-task-list-s4`)
  }
  else if (processTask_4_2_edit_review == 'No') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-2-edit`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})

router.post(`${baseUrl}/process-c-nil-task-4-3-router`, (req, res) => {
  const processTask_4_3 = req.session.data['process-c-nil-task-4-3']

  if (processTask_4_3 == 'Yes') {
    res.redirect(`${baseUrl}/process-nil-task-list-s4`)
  }
  else if (processTask_4_3 == 'No') {
    res.redirect(`${baseUrl}/process-c-nil-task-4-x-edit`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})

router.post(`${baseUrl}/query-types-router`, (req, res) => {
  const query_types = req.session.data['query-types']

  if (query_types == 'Language') {
    res.redirect(`${baseUrl}/query-phone-help`)
  }
  else {
    res.redirect(`${baseUrl}/query-search`)
  }
})




module.exports = router
