const axios = require('axios')
const kintoneService = require('./kintone')
/**
 * Get task(s) from kintone
 * @title Get task(s) from kintone
 * @category Task Management
 * @author Nhat Nguyen
 * @param {string} assignee - The assignee (user code) of task
 * @param {string} status - The status of task
 * @param {string} dueDateString - The due date of task
 */
const getTask = async (assignee, status, dueDateString) => {

  if (event.channel != 'web') {
    return
  }

  const dueDate = new Date(dueDateString);

  if (assignee === 'me' || assignee === 'my') {
    assignee = event.target;
  }

  try {
    const taskList = await kintoneService.getTask(assignee, status, dueDate, event.state.user)
    bp.logger.info(`Task count: ${taskList.length}`)

    const SUMMARY_FIELD_CODE = kintoneService.FIELD_CODE.TASK_MANAGEMENT.SUMMARY_FIELD_CODE
    const RECORD_NUMBER_FIELD_CODE = kintoneService.FIELD_CODE.TASK_MANAGEMENT.RECORD_NUMBER_FIELD_CODE

    const messages = [
      {
        type: 'text',
        text: `There ${taskList.length > 1 ? 'are' : 'is'} **${taskList.length}** ${status !== 'All' ? status : ''} task${taskList.length > 1 ? 's' : ''}`,
        markdown: true
      },
    ]

    taskList.forEach((taskRecord) => {
      const taskURL = `${kintoneService.DOMAIN}/k/${event.state.user['taskAppID']}/show#record=${taskRecord.$id.value}`
      messages.push({
        type: 'text',
        text: `<a href="${taskURL}" target="_blank">${taskRecord[RECORD_NUMBER_FIELD_CODE].value}: ${taskRecord[SUMMARY_FIELD_CODE].value}</a>`,
        markdown: true
      })
    });

    await bp.events.replyToEvent(event, messages)
  } catch (error) {
    console.log(error)
    bp.logger.error(`Task API Error: ${error.response.status} ${error.response.statusText}`)

    const messages = [
      {
        type: 'text',
        text: `*Task API Error*: ${error.response ? error.response.status : ''} ${error.response ? error.response.statusText : ''}`,
        markdown: true
      },
    ]

    await bp.events.replyToEvent(event, messages)
  }
}

return getTask(args.assignee, args.status, args.dueDate)