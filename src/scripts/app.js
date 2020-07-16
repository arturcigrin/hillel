$(() => {
  const URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/todos';
  const $btnCreate = $('#btnCreate');
  const $inputTask = $('#taskInput');
  const $taskContainerEl = $('#tasksContainer');
  const taskTemplate = $('#templateTask').html();

  new TodoList(URL, taskTemplate, $btnCreate, $inputTask, $taskContainerEl);
});
