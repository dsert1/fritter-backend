function getChannelModerator(fields) {
    fetch(`/api/channels/getModerator?channel=${fields.channel}`) // GET
      .then(showResponse)
      .catch(showResponse);
}
