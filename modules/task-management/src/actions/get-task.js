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

  const messages = [
    {
      type: 'text',
      text: `Assignee: **${assignee}**`,
      markdown: true
    },
    {
      type: 'text',
      text: `Status: **${status}**`,
      markdown: true
    },
    {
      type: 'text',
      text: `Due date: **${dueDate.toLocaleDateString()}**`,
      markdown: true
    }
  ]

  await bp.events.replyToEvent(event, messages)

  // temp[output] = assignee
}

return getTask(args.assignee, args.status, args.dueDate)