/**
 * Set kintone task app id
 * @title Set kintone task app id
 * @category Task Management
 * @author Nhat Nguyen
 * @param {number} appID - The user's task app ID
 */
const setTaskAppID = async (appID) => {

  try {
    event.state.user['appID'] = appID

    const messages = [
      {
        type: 'text',
        text: `Channel **${event.channel}**`,
        markdown: true
      },
      {
        type: 'text',
        text: `User **${event.target}**`,
        markdown: true
      },
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