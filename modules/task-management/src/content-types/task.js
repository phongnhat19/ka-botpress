const base = require('./_base');

function render(data) {
  const events = [];
  return [...events, {
    type: 'custom',
    module: 'task-management',
    component: 'KintoneTask',
    text: data.text,
    response: {
      data
    }
  }]
}

function renderMessenger(data) {
  return [{
    type: 'typing',
    value: data.typing
  }, {
    text: data.text
  }];
}

function renderElement(data, channel) {
  if (channel === 'web' || channel === 'api') {
    return render(data);
  } else if (channel === 'messenger') {
    return renderMessenger(data);
  }
  return [];
}

module.exports = {
  id: 'kintone-task',
  group: 'Custom Component',
  title: 'Task',
  jsonSchema: {
    description: 'Display kintone task to user',
    type: 'object',
    required: ['taskName', 'taskID', 'taskURL'],
    properties: {
      taskName: {
        type: 'string',
        title: 'Task name'
      },
      taskID: {
        type: 'string',
        title: 'Task ID'
      },
      taskURL: {
        type: 'string',
        title: 'Task URL'
      },
      ...base.typingIndicators
    }
  },
  uiSchema: {
    taskName: {
      'ui:field': 'i18n_field',
      $subtype: 'textarea'
    },
    taskID: {
      'ui:field': 'i18n_field',
      $subtype: 'textarea'
    },
    taskURL: {
      'ui:field': 'i18n_field',
      $subtype: 'textarea'
    }
  },
  computePreviewText: formData => formData.taskName && 'Task name: ' + formData.taskName,
  renderElement: renderElement
}