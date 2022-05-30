import {BaseTask} from './Tasks'

export class TaskManager {
    tasks: BaseTask[];
    finishTasks: BaseTask[];

    constructor(tasks: BaseTask[]) {
        this.tasks = tasks;
        this.finishTasks = []
    }
    get nextId(): number {
        return this.tasks.length + this.finishTasks.length + 1;
    }

    addTask(task: BaseTask) {
        const index = this.tasks.findIndex((elemet) => {
            return task.finishDate <= elemet.finishDate;
        });
        if (index === -1) {
            this.tasks.push(task);
        }
        else {
            this.tasks.splice(index, 0, task);
        }
        /*if (this.tasks.length === 0) {
            this.tasks.push(task);
        }
        else {
            let isPushed = false;
            let begin = 0;
            let end = this.tasks.length - 1;
            let centre = Math.floor((end - begin) / 2);
            while ((this.tasks[centre].finishDate != task.finishDate) && (begin < end)) {
                if (this.tasks[centre].finishDate < task.finishDate) {
                    begin = centre + 1;
                }
                else {
                    end = centre - 1;
                }
                centre = Math.floor((end - begin) / 2);
            }

            if (end - begin === 0) {
                this.tasks.splice(centre, 0, task);
                isPushed = true;
            }
        }*/
    }
}