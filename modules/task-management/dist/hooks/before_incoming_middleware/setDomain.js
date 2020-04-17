const setDomain = async () => {
  if (event.type === 'set-domain') {
    const eventData = event.payload
    const domain = eventData.payload.payload.domain
    try {

      event.state.user['domain'] = domain

      const payloads = await bp.cms.renderElement('#!builtin_text-IRmEbB', {}, event)
      await bp.events.replyToEvent(event, payloads)
    } catch (error) {
      bp.logger.error(error)
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
}

return setDomain()