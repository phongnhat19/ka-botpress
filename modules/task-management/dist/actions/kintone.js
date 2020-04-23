const axios = require('axios');
const CONFIG = {
  DOMAIN: 'https://cbz-vnsc.cybozu.com',
  TASK_MANAGEMENT: {
    ASSIGNEE_FIELD_CODE: 'User_selection_3',
    STATUS_FIELD_CODE: 'Drop_down_1',
    DUE_DATE_FIELD_CODE: 'Date',
    SUMMARY_FIELD_CODE: 'Text',
    RECORD_NUMBER_FIELD_CODE: 'Record_number'
  }
}
/**
 * API to get task from kintone
 * @title API to get task from kintone
 * @category Task Management
 * @author Nhat Nguyen
 * @param {string} assignee - The assignee (user code) of task
 * @param {string} status - The status of task
 * @param {Date} dueDate - The due date of task
 * @param {any} user - The due date of task
 */
const getTask = async (assignee, status, dueDate, user) => {
  const appID = user['taskAppID']
  const apiToken = user['taskAppAPIToken'];

  const URL = `${CONFIG.DOMAIN}/k/v1/records.json`
  let query = `${CONFIG.TASK_MANAGEMENT.ASSIGNEE_FIELD_CODE} in ("${assignee}")`

  if (status && status !== 'All') {
    query += ` and ${CONFIG.TASK_MANAGEMENT.STATUS_FIELD_CODE} in ("${status}")`;
  }

  if (dueDate) {
    const dateString = `${dueDate.getFullYear()}-${dueDate.getMonth() + 1}-${dueDate.getDate()}`
    query += ` and ${CONFIG.TASK_MANAGEMENT.DUE_DATE_FIELD_CODE} >= "${dateString}"`
  }

  const { data } = await axios({
    method: 'get',
    url: URL,
    headers: {
      'X-Cybozu-API-Token': apiToken
    },
    params: {
      app: appID,
      query
    }
  })

  return data.records || [];
}

module.exports = {
  getTask,
  FIELD_CODE: {
    TASK_MANAGEMENT: CONFIG.TASK_MANAGEMENT
  },
  DOMAIN: CONFIG.DOMAIN
}