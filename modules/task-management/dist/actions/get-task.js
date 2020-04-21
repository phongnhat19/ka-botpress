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

    const messages = [
      {
        type: 'text',
        text: `Task count: ${taskList.length}`,
        markdown: true
      },
    ]

    await bp.events.replyToEvent(event, messages)
  } catch (error) {
    console.log(error)
    bp.logger.error(`Task API Error: ${error.response.status} ${error.response.statusText}`)

    const messages = [
      {
        type: 'text',
        text: `*API Error*`,
        markdown: true
      },
    ]

    await bp.events.replyToEvent(event, messages)
  }
}

return getTask(args.assignee, args.status, args.dueDate)