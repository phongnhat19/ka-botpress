const setDomain = async () => {
  if (event.type === 'set-domain') {
    const eventData = event.payload
    const domain = eventData.payload.domain || eventData.payload.payload.domain

    // Skip event processing
    event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, true)
    // Force persist state
    event.setFlag(bp.IO.WellKnownFlags.FORCE_PERSIST_STATE, true)

    try {
      event.state.user['domain'] = domain
      bp.logger.info(`Domain of user ${event.target} set to ${event.state.user['domain']}`);

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