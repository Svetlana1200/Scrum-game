import { Advertising, Metric, Role, Status } from './Roles';
import {AdvertisingTask, BaseTask, InterviewTask, MetricTask, SimpleTask} from './Tasks'

export class TaskManager {
    tasks: BaseTask[]; // задачи в бэклоге продукта
    prevSprintTasks: BaseTask[] = []; // задачи предыдущего спринта
    nextSprintTasks: BaseTask[] = []; // задачи следующего спринта

    constructor(tasks: BaseTask[]) {
        this.tasks = tasks;
    }

    get nextId(): number {
        return this.tasks.length + 1;
    }
    // добавление новой задачи
    addTask(task: BaseTask) {
        this.tasks.unshift(task);
    }
    // добавление задачи в спринт
    addToSprint(task: SimpleTask) {
        this.nextSprintTasks.push(task)
    }
    //удалении задачи из спринта
    removeFromSprint(task: SimpleTask) {
        let i = 0;
        this.nextSprintTasks.forEach((item, index) => {
            if (item.id === task.id) {
                i = index;
            }
        })
        this.nextSprintTasks.splice(i, 1)
    }
    getAddedSP() {
        let addedSP = 0;
        this.nextSprintTasks.forEach((task) => {
            if (task.status === Status.STARTED && task instanceof SimpleTask)
                addedSP += Math.ceil(task.measuredCost / 2)
            else
                addedSP += task.measuredCost
        })
        return addedSP
    }
    // выполнить спринта
    executeSprint() {
        this.prevSprintTasks = this.nextSprintTasks;
        this.nextSprintTasks = [];

        let sp = 10;
        let i = 0;
        let diffProfitARPU = 0;
        let addARPU = false;
        let diffProfitUsers = 0;
        let RR = false;
        let countNewResults = 0;
        let countNewFeatures = 0;

        while (sp > 0 && i < this.prevSprintTasks.length) {
            const task = this.prevSprintTasks[i];
            if (task.status === Status.STARTED)
                sp -= Math.ceil(task.realCost / 2)
            else
                sp -= task.realCost
            if (task instanceof SimpleTask) {
                if (Math.floor(Math.random() * 100) + 1 < task.probabilityCompletion) {
                    task.status = Status.COMPLETED;
                    diffProfitARPU += task.profitARPU;
                    diffProfitUsers += task.profitUsers;
                }
                else
                    task.status = Status.STARTED
                task.inCurrentSprint = false
            }
            else if (task instanceof MetricTask) {
                task.status = Status.COMPLETED;
                if (task.name === Metric.ARPU)
                    addARPU = true;
                else if (task.name === Metric.RR) 
                    RR = true
                task.inCurrentSprint = false
            }
            else if (task instanceof InterviewTask) {
                task.status = Status.COMPLETED;
                countNewResults = task.countNewResults
                countNewFeatures = task.countNewFeatures
                task.inCurrentSprint = false
            }
            else if (task instanceof AdvertisingTask) {
                task.estimatingSprint --;
                if (task.estimatingSprint) {
                    task.status = Status.STARTED
                    this.nextSprintTasks.push(task)
                }
                else {
                    task.status = Status.COMPLETED;
                    task.inCurrentSprint = false;
                    diffProfitUsers += task.profitUsers;
                }
            }
            i++
        }
        for (i; i < this.prevSprintTasks.length; i++) {
            diffProfitUsers -= 1
            this.prevSprintTasks[i].inCurrentSprint = false
        }

        return {
            diffProfitARPU: addARPU ? diffProfitARPU : 0,
            diffProfitUsers: diffProfitUsers,
            RR: RR,
            countNewResults: countNewResults,
            countNewFeatures: countNewFeatures
        }
    }
}