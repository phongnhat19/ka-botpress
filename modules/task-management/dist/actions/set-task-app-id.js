/**
 * Set kintone task app id
 * @title Set kintone task app id
 * @category Task Management
 * @author Nhat Nguyen
 * @param {number} appID - The user's task app ID
 */
const setTaskAppID = async (appID) => {

  try {
    event.state.user['taskAppID'] = appID

    const messages = [
      {
        type: 'text',
        text: `Task app ID is set to **${appID}**`,
        markdown: true
      }
    ]
    await bp.events.replyToEvent(event, messages)
  } catch (error) {
    bp.logger.error(JSON.stringify(error))
    const messages = [
      {
        type: 'text',
        text: `Sorry I can't configure your task app ID. Please contact **Admin** for more detail.`,
        markdown: true
      }
    ]
    await bp.events.replyToEvent(event, messages)
  }

}

return setTaskAppID(args.appID)