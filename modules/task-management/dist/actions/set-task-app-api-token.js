/**
 * Set kintone task app API Token
 * @title Set kintone task app API Token
 * @category Task Management
 * @author Nhat Nguyen
 * @param {number} apiToken - The user's task app ID
 */
const setTaskAppAPIToken = async (apiToken) => {

  try {
    event.state.user['taskAppAPIToken'] = apiToken

    const messages = [
      {
        type: 'text',
        text: `Task app API token is set to **${apiToken}**`,
        markdown: true
      }
    ]
    await bp.events.replyToEvent(event, messages)
  } catch (error) {
    bp.logger.error(JSON.stringify(error))
    const messages = [
      {
        type: 'text',
        text: `Sorry I can't configure your task app API token. Please contact **Admin** for more detail.`,
        markdown: true
      }
    ]
    await bp.events.replyToEvent(event, messages)
  }

}

return setTaskAppAPIToken(args.apiToken)