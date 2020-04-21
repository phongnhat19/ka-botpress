const axios = require('axios');
const CONFIG = {
  DOMAIN: 'https://cbz-vnsc.cybozu.com',
  TASK_MANAGEMENT: {
    ASSIGNEE_FIELD_CODE: 'User_selection_3',
    STATUS_FIELD_CODE: 'Drop_down_1',
    DUE_DATE_FIELD_CODE: 'Date'
  }
}

const getTask = async (assignee, status, dueDate, user) => {
  const appID = user['taskAppID']
  const apiToken = user['taskAppAPIToken'];

  const URL = `${CONFIG.DOMAIN}/k/v1/records.json`

  const { data } = await axios({
    method: 'get',
    url: URL,
    headers: {
      'X-Cybozu-API-Token': apiToken
    },
    params: {
      app: appID,
      query: `${CONFIG.TASK_MANAGEMENT.ASSIGNEE_FIELD_CODE} in ("${assignee}")`
    }
  })

  return data.records || [];
}

module.exports = {
  getTask
}