export default class Template {
  getTemplateContainerTodo() {
    return `
        
            <div class="container">
      <div class="row">
        <div class="col">
          <div class="input-group mr-t">
            <div class="input-group-prepend">
              <button
                id="btnCreate"
                class="btn btn-outline-secondary btn-add"
                type="button"
                id="button-addon1"
                title="Создать новую задачу"
                disabled
              >
                <span class="material-icons">
                  note_add
                </span>
              </button>
            </div>
            <input
              id="taskInput"
              type="text"
              class="form-control"
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              placeholder="Введите новую задачу"
            />
          </div>

          <table class="mt-5 ml-auto mr-auto table-todos">
            <thead class="thead">
              <tr>
                <td>ID</td>
                <td colspan="2">Task</td>
              </tr>
            </thead>

            <tbody id="tasksContainer" class="tbody"></tbody>
          </table>
        </div>
      </div>
    </div>
        `;
  }

  getTemplateTodo() {
    return `
        <tr class="task {{isDone}}" data-id= {{id}}>
        <td class="task-id">{{id}}</td>
        <td class="task-title">{{title}}</td>
        <td class="btn-group">
          <span class="material-icons btn-delete" title="удалить задачу">
            remove_circle_outline
          </span>
        </td>
      </tr>;
        `;
  }

  getTemplateLoading() {
    return `
      <div id='loading' class="loading">
        <div  class="spinner-border text-warning" role="status">
            <span class="sr-only">Loading...</span>
         </div>
    </div>`;
  }
}
